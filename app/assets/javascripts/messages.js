$(document).on('turbolinks:load',function () {
  if($('.users.inbox').length > 0){
    displayRequests()
    displayMessages()
    requestsReceived()
    requestsSent()
    messageReceived()
    messageSent()

  }
})

function messageReceived(){
  $('div.receivedMessages').on('submit','form',function(e){
    event.preventDefault()

    var serializedForm = JSON.stringify($(this).serializeArray())
    var message_id = JSON.parse(serializedForm)[0].value

    var requestType = $(this).attr('class')
    if (requestType == 'reply-message'){
       replyMessage(serializedForm)
    }else if(requestType == 'delete-message') {
       deleteMessage(message_id)
    }
  })
}

function messageSent(){
  $('div.sentMessages').on('submit','form',function(e){
    event.preventDefault()
    var message_id = this.message_id.value
    deleteMessage(message_id)
  })
}


function replyMessage(data){
  $.ajax({
    type: 'post',
    url: '/messages.json',
    datetype: 'json',
    data: {"data":data},
    success: function(response){
      alert('Reply Sent!')
      displayMessages()
    }
  })
}

function deleteMessage(data){
  $.ajax({
    type: 'delete',
    url: `/messages/${data}.json`,
    datetype: 'json',
    success: function(response){
      debugger;
      $(`div.sentMessages div#${response.id}`).toggle()
      $(`div.receivedMessages div#${response.id}`).toggle()
    }
  })
}

function requestsReceived(){
  $('div.receivedRequests').on('submit','form',function(e){
    event.preventDefault()
    var serializedForm = JSON.stringify($(this).serializeArray())

    var requestType = $(this).attr('class')
    if (requestType == 'reject-request'){
       handleRequest(serializedForm)
    }else if(requestType == 'accept-request') {
       handleRequest(serializedForm)
    }
  })
 }

 function requestsSent() {
   $('div.sentRequests').on('submit','form',function(e){
     event.preventDefault()
     var serializedForm = JSON.stringify($(this).serializeArray())
     var requestType = $(this).attr('class')
     if (requestType == 'retract-request') {
       handleRequest(serializedForm)
     }
   })
 }


 function handleRequest(data){
   var connection_id = JSON.parse(data)[2].value
  $.ajax({
    type: 'PATCH',
    url: `/connections/${connection_id}`,
    datatype: 'json',
    data: {"data":data},
    success: function(response){
      if (response == "") {
        alert("Request Declined")
        displayRequests()
      }else {
        alert("Request Accepted! You are now connected!")
        displayRequests()
      }
    }
  })
 }

function createMessage(){
  $.ajax({
    type: 'post',
    url: '/messages',
    datatype :'string',
    data: {"form": $('form input').serialize()},
    success: function(response){
      debugger;
    }
  })
 }


function receivedRequests(response) {
  var html = ''
  $('.receivedRequests').html('')
  for(var i=0;i<response.length;i++){

    html += `<p><img src="${response[i][0].profile_pic}"></p>`
    html += `<p>${response[i][0].name} wants to connect!</p>`

    html += `<div class="accept-request-div"><form class="accept-request">`
    html += `<input type="hidden" name="user" value="${response[i][0].id}">`
    html += `<input type="hidden" name="user2" value="${response[i][1].id}">`
    html += `<input type="hidden" name="request" value="${response[i][2].id}">`
    html += `<input type="hidden" name="status" value="true">`
    html += `<button type="submit">Accept</button>`
    html += `</form></div>`

    html += `<div class ="reject-request-div"><form class="reject-request">`
    html += `<input type="hidden" name="user" value="${response[i][0].id}">`
    html += `<input type="hidden" name="user2" value="${response[i][1].id}">`
    html += `<input type="hidden" name="request" value="${response[i][2].id}">`
    html += `<input type="hidden" name="status" value="false">`
    html += `<button type="submit">Decline</button>`
    html += `</form></div>`
  }
  $('.receivedRequests').append(html)
}

function sentRequests(response){
  var html = ''
  $('.sentRequests').html('')

  for(var i=0;i<response.length;i++){

    html += `<p>You requested to connect with ${response[i][1].name}</p>`
    html += `<p> <img src="${response[i][1].profile_pic}"></p>`
    html += `<p>${response[i][1].company}</p>`
    html += `<p>${response[i][1].position}</p>`

    html += `<div class="retract-request-div"><form class="retract-request">`
    html += `<input type="hidden" name="user" value="${response[i][0].id}">`
    html += `<input type="hidden" name="user2" value="${response[i][1].id}">`
    html += `<input type="hidden" name="request" value="${response[i][2].id}">`
    html += `<input type="hidden" name="status" value="false">`
    html += `<button type="submit">Retract</button>`
    html += `</form></div>`
  }
   $('.sentRequests').append(html)
}


 function displayRequests(){
   $.ajax({
     type: 'get',
     url: '/connections.json',
     success: function(response) {
       if (response[0] != 'Delete') {
         receivedRequests(response[0])
         sentRequests(response[1])
       } else{
         $('.sentRequests').html('')
       }
     }
   })
 }

 function receievedMessages(response) {
   var html = ''
   $('.receivedMessages').html('')

   for(var i=0;i<response.length;i++){
       html += `<div id="${response[i][2].id}"<p>You receieved a message from ${response[i][1].name}</p>`
       html += `<p> <img src="${response[i][1].profile_pic}"></p>`
       html += `<p><h4>${response[i][2].content}</h4></p>`

       html += `<div class="reply-message-div"><form class="reply-message">`
       html += `<input type="hidden" name="user" value="${response[i][0].id}">`
       html += `<input type="hidden" name="user2" value="${response[i][1].id}">`
       if (response[i][2].master_message_id == null) {
         html += `<input type="hidden" name="master_message_id" value="${response[i][2].id}">`
       }else {
         html += `<input type="hidden" name="master_message_id" value="${response[i][2].master_message_id}">`
       }
       html += `<input type="hidden" name="message_id" value="${response[i][2].id}">`
       html += `<input type="text", name="content">`
       html += `<button type="submit">Reply</button>`
       html += `</form></div>`

       html += `<div class="delete-message-div">
       <form class="delete-message">`
       html += `<input type="hidden" name="user" value="${response[i][2].id}">`
       html += `<button type="submit">delete</button>`
       html += `</form></div></div>`
   }
  $('.receivedMessages').append(html)
 }

 function sentMessages(response) {
   var html = ''
   $('.sentMessages').html('')
   for(var i=0;i<response.length;i++){
     html += `<div id="${response[i][2].id}">
              <p>You sent a message to ${response[i][1].name}</p>`
     html += `<p> <img src="${response[i][1].profile_pic}"></p>`
     html += `<p><h4>${response[i][2].content}</h4></p>`

     html += `<div class="delete-message-div"><form class="delete-message">`
     html += `<input type="hidden" id="message_id" value="${response[i][2].id}">`
     html += `<button type="submit">Delete</button>`
     html += `</form></div></div>`
   }
   $('.sentMessages').append(html)
 }

  function displayMessages() {
    $.ajax({
      type: 'get',
      url: '/messages.json',
      success: function(response) {
        receievedMessages(response[0])
        sentMessages(response[1])
        $('.receievedMessages').html('')
      }
    })
  }

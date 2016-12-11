$(document).on('turbolinks:load', function() {
  if($('.users.inbox').length > 0){
    displayReceivedRequests()
    displaySentRequests()
    displaySentMessages()
    displayReceivedMessages()
    acceptRequest()
    declineRequest()
    retractRequest()
    replyMessage()
  }
})

/*
  1) Need to make delete button for received/sent messages
  3) Need to make create message button work
*/

function deleteMessage(){
  $('.delete-message').on('click', function(event){
    event.preventDefault()
    var message_id = this.id
    $.ajax({
      type: 'delete',
      url: `/messages/${message_id}.json`,
      datatype: "json",
      success: function(response){
        $(`div#received-message-${this.id}`).toggle()
        alert('Message Deleted!')
      }
    })
  })
}

function displaySentRequests() {
  $.ajax({
    type: 'get',
    url: '/connections/sent.json',
    success: function(response) {
      sentRequests(response)
    }
  })
}

function displayReceivedRequests() {
  $.ajax({
    type: 'get',
    url: '/connections/received.json',
    success: function(response) {
      receivedRequests(response)
    }
  })
}
//
// // This function is being loaded after the html gets appeneded to the page***
function replyMessage() {
    $('.reply-message').on('click', function(event){
    event.preventDefault()
    var serializedData = $(this).parent().serialize()
    $.ajax({
      type: 'post',
      url: '/messages.json',
      datatype: "json",
      data: serializedData,
      success: function(response){
        alert('Reply Sent!')
        $(`div#received-message-${this.id}`).toggle()
      }
    })
  })
}


// Data was not coming into the params in the pry in the conenctions controller
function acceptRequest() {
  $('.accept-request').on('click', function(event){
    event.preventDefault()
    var request_id = this.id
    $.ajax({
      type: 'PATCH',
      url: `/connections/${request_id}.json`,
      dataype: 'json',
      data: {"status": true},
      success: function(response){
        alert('You are now connected!')
        $(`div#received-request-${this.id}`).toggle()
      }
    })
  })
}

function declineRequest() {
  $('.decline-request').on('click', function(event){
    event.preventDefault()
    var request_id = this.id
    $.ajax({
      type: 'PATCH',
      url: `/connections/${request_id}.json`,
      dataype: 'json',
      data: {"status": false},
      success: function(response){
        alert('Request Deleted!')
        $(`div#received-request-${this.id}`).toggle()
      }
    })
  })
}

function retractRequest(){
  $('.retract-request').on('click', function(event){
    event.preventDefault()

    var request_id = this.id
    $.ajax({
      type: 'PATCH',
      url: `/connections/${request_id}.json`,
      dataype: 'json',
      data: {"status": false},
      success: function(response){
        alert('Request Retracted!')
        $(`div#sent-request-${this.id}`).toggle()
      }
    })
  })
}

function displaySentMessages() {
  $.ajax({
    type: 'get',
    url: '/messages/sent.json',
    success: function(response) {
      sentMessages(response)
    }
  })
}

function displayReceivedMessages() {
  $.ajax({
    type: 'get',
    url: '/messages/received.json',
    success: function(response) {
      receivedMessages(response)
    }
  })
}


 function receivedMessages(response) {
   var html = ''
   $('.receivedMessages').html('')

   for(var i=0;i<response.length;i++){

     html += `<div id="received-message-${response[i].id}"<p>You receieved a message from ${response[i].user.name}</p>`
     html += `<p> <img src="${response[i].user.profile_pic}"></p>`
     html += `<p><h4>${response[i].content}</h4></p>`

     html += `<form>`
     html += `<input type="hidden" name="message_id" class="message_id" value="${response[i].id}">`
     html += `<input type="text", name="content">`
     html += `<button class="reply-message" id="${response[i].id}" type="submit">Reply</button>`
     html += `</form>`

     html += `<button type="submit" class="delete-message" id="${response[i].id}">delete</button>`

     html += `</div>`
  }
  $('.receivedMessages').append(html)
 }

 function sentMessages(response) {
   var html = ''
   $('.sentMessages').html('')
   for(var i=0;i<response.length;i++){

     html += `<div id="${response[i].id}">
              <p>You sent a message to ${response[i].user.name}</p>`
     html += `<p> <img src="${response[i].user.profile_pic}"></p>`
     html += `<p><h4>${response[i].content}</h4></p>`

     html += `<button type="submit" class="delete-message" id="${response[i].id}">delete</button>`

     html += `</div>`
   }
   $('.sentMessages').append(html)
 }

  function sentRequests(response){
    var html = ''
    $('.sentRequests').html('')

    for(var i=0;i<response.length;i++){

      html += `<div id="sent-request-${response[i].id}"<p>You requested to connect with ${response[i].receiver.name}</p>`

      html += `<p> <img src="${response[i].receiver.profile_pic}"></p>`
      html += `<p>${response[i].receiver.company}</p>`
      html += `<p>${response[i].receiver.position}</p>`

      html += `<button id="${response[i].id}" class="retract-request" type="submit">Retract</button>`

      html += `</div>`
    }
     $('.sentRequests').append(html)
  }

function receivedRequests(response) {
  var html = ''
  $('.receivedRequests').html('')

  for(var i=0;i<response.length;i++){

    html += `<div id="received-request-${response[i].id}"<p><img src="${response[i].user.profile_pic}"></p>`
    html += `<p>${response[i].user.name} wants to connect!</p>`

    html += `<button class="accept-request" id="${response[i].id}" type="submit">Accept</button>`
    html += `<button id="${response[i].id}" class="decline-request" type="submit">Decline</button>`

    html += `</div>`

  }
  $('.receivedRequests').append(html)
}

$(document).on('turbolinks:load', function() {
  searchNames()
  sendRequest()
  createMessage()
  getFriends()
  })

function getFriends(){
  $('.findMyFriends').on('click', function(event) {
    $.ajax({
      type: 'get',
      url: '/users/friends',
      dataType: 'json',
      success: function(response){
        for (var i=0;i<response.length;i++) {
          var new_friend = new Friend(response[i])
          new_friend.display()
        }
      }
    })
  })
}

function Friend(object) {
  this.name = object.name
  this.profile_pic = object.profile_pic
  this.company = object.company
  this.position = object.position
}

Friend.prototype.display = function() {
  html = ``
  html += `You are connected with ${this.name}`
  html += `<img src= ${this.profile_pic}>`
  html += `${this.company}`
  html += `${this.position}`
  $('.myFriends').append(html)
}

// ES6
// class Friend{
//   constructor(object){
//     this.name = object.name
//     this.profile_pic = object.profile_pic
//     this.company = object.company
//     this.position = object.position
//   }
//
//   display() {
//     html = ``
//     html += `You are connected with ${this.name}`
//     html += `<img src= ${this.profile_pic}>`
//     html += `${this.company}`
//     html += `${this.position}`
//     $('.myFriends').append(html)
//   }
// }


function searchNames(){
 $('.searchNames').on('submit', function(event){
   event.preventDefault()
   $('div#foundNames').html(' ')
   var inserted_name = this.user_name.value
   html = ''
   $.ajax({
     type: 'get',
     url: "/users.json",
     datatype: "json",
     data: {"inserted_name": inserted_name},
     success: function(response){
       html += `<ul>`
       for (var i=0;i<response.length;i++)
         {
           html +=  `<li>
                       <ul>
                            <div id="found-user-${response[i].id}">
                       <li> <img src =${response[i].profile_pic}> </li>
                       <li> ${response[i].name} </li>
                       <li> ${response[i].company} </li>
                       <li> ${response[i].position} </li>
                       <li> <button id="${response[i].id}" class="addConnection" type="submit">Add Connection</button></li>
                       <li>
                            <form class="createMessage" id="${response[i].id}">
                              <input name="message_content" class="message_content" type="text">
                              <button type="submit">Send Message</button></li>
                            </form></div>
                       </ul>
                     </li>`
         }
       html += `</ul>`
       $('div#foundNames').append(html)
     }
   })
 })
}

function sendRequest(){
  $(document).on('click','.addConnection',function(event){
    event.preventDefault()
    $(`div#found-user-${this.id}`).toggle()
    $.ajax({
      type: 'post',
      url: '/connections.json',
      datatype: 'json',
      data: {"receiver": this.id},
      success: function(response){
        alert("Connections request sent!")
      }
    })
  })
}

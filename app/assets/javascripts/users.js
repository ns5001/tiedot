var i = 0

function searchNames(){
 $('.searchNames').on('submit', function(event){
   event.preventDefault()
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
                            </div>
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
  $('.addConnection').on('click', function(event){
    event.preventDefault()
    debugger;
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


// $.ajax({
//   type: 'post',
//   url: "/connections.json",
//   datatype: "json",
//   data: {"user1": sender, "user2": receiver},
//   success: function(response){
//     alert("Contact Request Sent");
//   }
// })

function getGraphs(){
 var request = "Need current user";
 $.ajax({
   type: 'get',
   url: "/graphs.json",
   datatype: "json",
   data: {"request": request},
   success: function(response){
     displayGraphs(response)
   }
 })
};

function displayGraphs(data, i) {
 if ((i>data.length-1) || (i<0)){
   i = 0
 }
   // $('#displayGraph"').append(graph stuff)
}

function interate() {
 i += 1
}

function goBack(i) {
 i = i - 1
}


function inbox() {
 var request = "Need inbox of current_user";
 $.ajax({
   type: "get",
   url: "/messages.json",
   datatype: "json",
   data: {"inbox": request},
   success: function(response){
     debugger;
   }
 })
}

function outbox() {
 var request = "Need outbox of current_user";
 $.ajax({
   type: "get",
   url: "/messages.json",
   datatype: "json",
   data: {"outbox": request},
   success: function(response){
     debugger;
   }
 })
}

function bringMessage(){

}

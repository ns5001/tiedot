$(document).on('turbolinks:load', function() {
  searchNames()
  sendRequest()
})

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
       if (response.length > 0) {
         if (response[0] == "adding themself") {
           $('div#foundNames').append("You can't add yourself!")
         }else{
           for (var i=0;i<response.length;i++)
             {
               html +=  `
                           <br>
                                <div id="found-user-${response[i].id}">
                           <ul> <img class="round-image-50" src =${response[i].profile_pic}> </ul><br>
                           <ul> ${response[i].first_name} ${response[i].last_name}</ul>
                           <ul> ${response[i].company} </ul>
                           <ul> ${response[i].position} </ul>
                           <ul> <button id="${response[i].id}" class="addConnection" type="submit">Add Connection</button></ul>
                                </div>
                           </ul>
                         <br>
                         `
             }
           $('div#foundNames').append(html)}
      } else {
        $('div#foundNames').html("")
        $('div#foundNames').append(`No user found named ${inserted_name}`)
      }
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

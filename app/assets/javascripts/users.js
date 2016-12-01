function searchNames(){
  var inserted_name = $('#user_name').val()
  html = ''
  $.ajax({
    type: 'get',
    url: "/users.json",
    datatype: "json",
    data: {"inserted_name": inserted_name},
    success: function(response){
      var current_user = JSON.parse(response.current_user).id
      html += `<ul>`
      for (var i=0;i<response.found_user.length;i++)
        {
          // var cuser = JSON.stringify(current_user)
          // var test_user = JSON.stringify(response.found_user[i])
          html +=  `<li>
                      <ul>
                      <li> ${response.found_user[i].profile_pic} </li>
                      <li> ${response.found_user[i].name} </li>
                      <li> ${response.found_user[i].company} </li>
                      <li> ${response.found_user[i].position} </li>
                      <li> <a onclick="sendRequest(${current_user}, ${response.found_user[i].id})">Send Connection Request</a></li>
                      </ul>
                    </li>`
        }
      html += `</ul>`
      $('div#foundNames').append(html)
    }
  })
}

function sendRequest(sender, receiver){
  $.ajax({
    type: 'post',
    url: "/connections",
    datatype: "json",
    data: {"user1": sender, "user2": receiver},
    success: function(response){
      debugger;
    }
  })
}

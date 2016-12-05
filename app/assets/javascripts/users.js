var i = 0

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
      alert("Contact Request Sent");
    }
  })
}

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

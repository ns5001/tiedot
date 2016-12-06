$(document).ready(function () {
    $('.new-message').hide();
    $('.reply-button').on('click', function(){
      $(this).parent().children('.new-message').show()
    })
// (<%=key.receiver%>, <%=key.user_id%>)
    $('form#new-message').submit(function(event) {
      //prevent form from submitting the default way
      event.preventDefault();
      debugger;

      var values = $(this).serialize();

      // debugger;

      var posting = $.post('/messages', values);

      posting.done(function(data) {
        debugger;
      });
    });
  });

function reply(user, receiver){
  // var html = "<form id='new-message' >"
  // html += "<input name='content' type='text' />"
  // html += `<input name='receiver' type='hidden' value=${receiver} />`
  // html += `<input name='user_id' type='hidden' value=${user} />`
  // html += "<input name='submit' type='submit' />"
  // html += "</form>"
  // $('div#form').append(html)
  $('#new-message').show();
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

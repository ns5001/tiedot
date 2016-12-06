$(document).on('turbolinks:load',function(){
  if($('.users.show').length > 0){
    generateCurrentUserGraphs()
  }else if ($('.graphs.edit').length > 0){

    var graphId = $('input#graph_id').val()
    var userId = $('input#user_id').val()
    generateCurrentUserGraph_edit('bar', graphId)

    $(document).on('submit','form',function(event){
      event.preventDefault();
      var dataPoints = $( this ).serializeArray();
      updateGraphData(dataPoints, this.action)
      generateCurrentUserGraph_edit('bar', graphId)
      location.reload();
    });

    $("#email-btn").on('click', function(e){
      event.preventDefault();
      $(".email").append(
        `
        <br><br>
        <input id="recipient" type="text" name="recipient" value="">
        <input id="send-email-btn" type="submit" name="send_email"  value="Send">`
      )

    });

  }
});

function email(){
  var charNum = $("input#graph_id").val()
  var userNum = $("input#user_id").val()
  var base64Chart = $(`#myChart${charNum}`).get(0).toDataURL()
  var url = this.parentElement.action
      $.ajax({
        type: 'post',
        url: `/users/${userNum}/graphs/${charNum}/send_mail`,
        dataType: 'json',
        data: {"chart":base64Chart}
      }).done(function(data){
          debugger;
      });
}

function saveChart(){
  var charNum = $("input#graph_id").val()
  $(`#myChart${charNum}`).get(0).toBlob(function(blob) {
    saveAs(blob, "chart.png");
});
}

function sendChartToServer(){
  var canvas = $(`#myChart${charNum}`).get(0).toDataURL();

}


$(document).on('change','.target',function(){
  var value = $(this).val();
  var graphId = this.parentElement.id
  generateCurrentUserGraph(value, graphId)

})


function Graph(color, graphLabel, type, data, canvNumber){
  this.id = canvNumber;
  this.color = color;
  this.type = type;
  this.label = graphLabel;
  this.data = data;
  this.graph = '';
  this.createGraph();
}

Graph.prototype.createGraph = function(){
    JsGraph(this.id, this.type, this.label, this.data)
}

function JsGraph(id, type, label, data){
  var ctx = document.getElementById(`myChart${id}`);
  var myChart = new Chart(ctx, {

    title:{
      text:"Chart Title",
    },
      type: type,
      data: {
          labels: label,
          datasets: [{
              label: label,
              data: data,
              backgroundColor: 'rgba(255,99,132,1)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1
          }],
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          },
      }
  });
}


function generateGraphs(color, label, type, data, canvasNumber){
  var graph = new Graph(color, label, type, data, canvasNumber);
  // graph.createGraph()
}

function User (name, email){
  this.name = name;
  this.email = email;
}


function generateCurrentUserGraphs(input = 'bar'){
  var user_id = $("input#user_id").val()
    $.ajax({
    type: 'get',
    url: `/users/${user_id}/graphs.json`,
    dataType: 'json'
      }).done(function(data) {

          for(var i =0; i<data.length; i++){
            var z = data[i].id
            $('.container').append(`
              <div id="${z}">
                      <select class="target">
                        <option value="bar">Bar</option>
                        <option value="pie">Pie</option>
                        <option value="line">Line</option>
                      </select>
                <a href="/users/${user_id}/graphs/${z}/edit">Customize Graph</a>
              <canvas id="myChart${i}" max-width="400" max-height="400" height="700" width="900" style= "width: 510px; height: 500px;"></canvas>
              </div><br><br>`)
            var graphLabel = JSON.parse(data[i].labels);
            var graphData = JSON.parse(data[i].data)
            generateGraphs('red', graphLabel, input, graphData, i)

          }

      });
    }

function generateCurrentUserGraph(input, id){
  var userId = $("input#user_id").val()
  var currentGraphId = id
  $.ajax({
      type: 'get',
      url: `/users/${userId}/graphs/${currentGraphId}.json`,
      dataType: 'json',
    }).done(function(data) {

          $(`div#${currentGraphId} canvas`).replaceWith(`
            <canvas id="myChart${data.id}" max-width="400" max-height="400" height="700" width="900" style= "width: 510px; height: 500px;"></canvas>
            `)
          var graphLabel = JSON.parse(data.labels);
          var graphData = JSON.parse(data.data)
          generateGraphs('red', graphLabel, input, graphData, data.id)

    });
}


function generateCurrentUserGraph_edit(input, id){
  var userId = $("input#user_id").val()
  var currentGraphId = id
  $.ajax({
      type: 'get',
      url: `/users/${userId}/graphs/${currentGraphId}.json`,
      dataType: 'json',
    }).done(function(data) {
          $(`.edit_graph`).append(`
            <div id="${data.id}">
                    <select class="target">
                      <option value="bar">Bar</option>
                      <option value="pie">Pie</option>
                      <option value="line">Line</option>
                    </select>
            <canvas id="myChart${data.id}" max-width="400" max-height="400" height="700" width="900" style= "width: 510px; height: 500px;"></canvas>
            </div><br><br>
            `)

          var graphLabel = JSON.parse(data.labels);
          var graphData = JSON.parse(data.data)
          generateGraphs('red', graphLabel, input, graphData, data.id)

    });
}


function changeData(){

  userId = $('input#user_id').val()
  graphId = $('input#graph_id').val()

  $.ajax({
      type: 'get',
      url: `/users/${userId}/graphs/${graphId}.json`,
      dataType: 'json',
    }).done(function(data) {
        var labels = JSON.parse(data.labels)
        var data_point = JSON.parse(data.data)

        var table =  $("#table_data");
        var tableHeader = $('#header')
        var dataVals = $('#data_values')

        for(var i =0; i< labels.length; i++){
          tableHeader.append(`<td> ${labels[i]} </td>`)
        }

        for(var i=0; i<data_point.length; i++){
          dataVals.append(`
            <td><input type="text" name="${i}" value="${data_point[i]}"></td>
            `)
        }
        $('form').append('<input type="submit" name="UpdateData" value="Update Data">')
    });

}

function updateGraphData(data, url){
  $.ajax({
    type: 'patch',
    url: url,
    dataType: 'json',
    data: {"graphData":data}
  }).done(function(data){
      alert("Graph Updated!")
  })
}

$(document).on('turbolinks:load',function(){
  if($('.users.show').length > 0){

    generateCurrentUserGraphs()
    showCsv();
    changeSelector();

  }else if ($('.graphs.edit').length > 0){
    genrateGraph()
    updateData();
    emailGraph();
    changeSelector();
    getRandomColor();
  }

});


var selector = 'bar';

 function genrateGraph(tpe= 'bar'){
   var graphId = $('input#graph_id').val()
   var userId = $('input#user_id').val()
   generateCurrentUserGraph_edit(tpe, graphId);
 }

 function showCsv(){
   $('#showCsv').on('click',function(){
     document.getElementById('id02').style.display='block'
   })
 }

var charNum = '';
 function updateData(){
   $(document).on('submit','form',function(event){
     event.preventDefault();
     var dataPoints = $(this).serializeArray();
     updateGraphData(dataPoints, this.action)
     generateCurrentUserGraph_edit('bar', graphId)
     location.reload();
   });
 }

 function emailGraph(){
   $("#email-btn").on('click', function(e){
     e.preventDefault();
     var recipient = $("#recipient").val();
     var msg = $("#message").val();
     charNum = $("input#graph_id").val();
     var userNum = $("input#user_id").val();
     var base64Chart = sendChartToServer();

     var url = this.parentElement.action
     document.getElementById('id01').style.display='block'
         $.ajax({
           type: 'post',
           url: `/users/${userNum}/graphs/${charNum}/send_mail`,
           dataType: 'json',
           data: {"chart":base64Chart, "recipient":recipient, "message":msg}
         }).done(function(data){
           document.getElementById('id01').style.display='none'
           if(document.getElementById('id01').style.display='none'){
             alert("Graph sent!");
           }else{
             alert("Error");
           }
         });
   });
 }

function saveChart(){
   charNum = $("input#graph_id").val()
  $(`#myChart${charNum}`).get(0).toBlob(function(blob) {
    saveAs(blob, "chart.png");
});
}

function sendChartToServer(){
  var canvas = $(`#myChart${charNum}`).get(0).toDataURL();
  return canvas
}



function changeSelector(){
  $(document).on('change','.target',function(){
    var value = $(this).val();
    selector = value;
    var graphId = this.parentElement.id
    generateCurrentUserGraph(selector, graphId)

  })
}


function Graph(attributes){
  this.id = attributes.id;
  this.type = attributes.type
  this.label = JSON.parse(attributes.labels);
  this.data = JSON.parse(attributes.data);
  this.graph = ''; // in createGraph this gets det to the graph data
  this.createGraph();
  this.changeColor();
}


Graph.prototype.createGraph = function(){
    JsGraph(this.id, this.type, this.label, this.data)
}


Graph.prototype.changeColor = function(){
  $(`#myChart${this.id}`).click(
  function(evt){
      $(`.edit_graph`).html('')
      graphColor = getRandomColor()
      genrateGraph(selector)
  }
 );
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function JsGraph(id, type='bar', label, data, color){
  var ctx = document.getElementById(`myChart${id}`);
  myChart = new Chart(ctx, {
    title:{
     text: "Both dataSeries attached to Click events."
    },
      type: selector,
      data: {
          labels: label,
          datasets: [{
              label: label,
              data: data,
              backgroundColor: getRandomColor(),
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


function generateGraphs(data){
  graph = new Graph(data);
}


function generateCurrentUserGraphs(input = 'bar'){ // To generate all user graphs
  var user_id = $("input#user_id").val()
    $.ajax({
    type: 'get',
    url: `/users/${user_id}/graphs.json`,
    dataType: 'json'
      }).done(function(data) {
          for(var i = 0; i<data.length; i++){
            var z = data[i].id
            $('.container').append(`
              <div id="${z}">
                      <select class="target">
                        <option value="bar">Bar</option>
                        <option value="pie">Pie</option>
                        <option value="line">Line</option>
                      </select>
                <a href="/users/${user_id}/graphs/${z}/edit">Customize Graph</a>
              <canvas id="myChart${z}" max-width="400" max-height="400" height="700" width="900" style= "width: 510px; height: 500px;"></canvas>
              </div><br><br>`)
            generateGraphs(data[i])
          }
      });
    }



function generateCurrentUserGraph(input, id){ // To generate 1 graph
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

          generateGraphs(data)

    });
}
var randColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
]

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
                      <option  value="bar">Bar</option>
                      <option  value="pie">Pie</option>
                      <option  value="line">Line</option>
                    </select>
            <canvas id="myChart${data.id}" max-width="400" max-height="400" height="700" width="900" style= "width: 510px; height: 500px;"></canvas>
            </div><br><br>
            `)

          generateGraphs(data)

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
        $('.dataUpdate').append('<input type="submit" name="UpdateData" value="Update Data" style="margin-right:auto;">')
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

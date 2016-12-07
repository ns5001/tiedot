$(document).on('turbolinks:load',function(){
  if($('.users.show').length > 0){

    generateCurrentUserGraphs()
    showCsv();

  }else if ($('.graphs.edit').length > 0){
    genrateGraph()
    updateData();
    emailGraph();
  }

});


 function genrateGraph(clr,tpe= 'bar'){
   var graphId = $('input#graph_id').val()
   var userId = $('input#user_id').val()
   generateCurrentUserGraph_edit(tpe, graphId,clr);
 }

 function showCsv(){
   $('#showCsv').on('click',function(){
     document.getElementById('id02').style.display='block'
   })
 }

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
     var charNum = $("input#graph_id").val();
     var userNum = $("input#user_id").val();
    //  var base64Chart = $(`#myChart${charNum}`).get(0).toDataURL()
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
           }
         });
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
  selector = value;
  var graphId = this.parentElement.id
  generateCurrentUserGraph(value, graphId)

})


function Graph(graphLabel, type, data, canvNumber, color){
  this.id = canvNumber;
  this.color = color;
  this.type = type;
  this.label = graphLabel;
  this.data = data;
  this.graph = '';
  this.createGraph();
  this.changeColor();
}

Graph.prototype.createGraph = function(){
    JsGraph(this.id, this.type, this.label, this.data, this.color)
}

selector = 'bar';
Graph.prototype.changeColor = function(){
  $(`#myChart${this.id}`).click(
  function(evt){
      // myChart.getElementsAtEvent(evt)[0]._model.backgroundColor = 'rgba(0,0,0,0.1)';
      // graph.color = 'rgba(0,0,0,0.1)'
      $(`.edit_graph`).html('')
      var randomColor = getRandomColor()
      genrateGraph(randomColor, selector)
      console.log('clicked')
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

function JsGraph(id, type, label, data, color){
  var ctx = document.getElementById(`myChart${id}`);
  myChart = new Chart(ctx, {
    title:{
     text: "Both dataSeries attached to Click events."
    },
      type: type,
      data: {
          labels: label,
          datasets: [{
              label: label,
              data: data,
              backgroundColor: color,
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


function generateGraphs(id, label, type, data, canvasNumber){
  graph = new Graph(id, label, type, data, canvasNumber);
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
            generateGraphs(graphLabel, input, graphData, i, 'rgba(255,99,132,1)')

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
          generateGraphs(graphLabel, input, graphData, data.id,'rgba(255,99,132,1)')

    });
}


function generateCurrentUserGraph_edit(input, id,clr='rgba(255,99,132,1)'){
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
          debugger;
          generateGraphs(graphLabel, input, graphData, data.id, clr)

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

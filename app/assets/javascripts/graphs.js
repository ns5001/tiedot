$(document).ready(function(){
  generateCurrentUserGraphs()
  })

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

}

Graph.prototype.createGraph = function(){
  var ctx = document.getElementById(`myChart${this.id}`);

  var myChart = new Chart(ctx, {
      type: this.type,
      data: {
          labels: this.label,
          datasets: [{
              label: this.label,
              data: this.data,
              backgroundColor: 'rgba(255,99,132,1)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
}

Graph.prototype.createGraph_ = function(){

  var ctx = document.getElementById(`myChart${this.id}`);

  var myChart = new Chart(ctx, {
      type: this.type,
      data: {
          labels: this.label,
          datasets: [{
              label: this.label,
              data: this.data,
              backgroundColor: 'rgba(255,99,132,1)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
}

function generateGraphs(color, label, type, data, canvasNumber){

  var graph = new Graph(color, label, type, data, canvasNumber);
  graph.createGraph()
}

function generateGraph(color, label, type, data, canvasNumber){

  var graph_ = new Graph(color, label, type, data, canvasNumber);
  graph_.createGraph_()
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
              <canvas id="myChart${i}" max-width="400" max-height="400" height="700" width="900" style= "width: 510px; height: 500px;"></canvas>
              </div>`)
            var graphLabel = JSON.parse(data[i].labels);
            var graphData = JSON.parse(data[i].data)
            generateGraphs('red', graphLabel, input, graphData, i)

          }

      });
}

function generateCurrentUserGraph(input_, id){
  var userId = $("input#user_id").val()
  var currentGraphId = id
  $.ajax({
      type: 'get',
      url: `/users/${userId}/graphs/${currentGraphId}.json`,
      dataType: 'json'
    }).done(function(data) {

          $(`div#${currentGraphId}`).html('')
          $(`div#${currentGraphId}`).append(`
            <select class="target">
              <option value="bar">Bar</option>
              <option value="pie">Pie</option>
              <option value="line">Line</option>
            </select>
            <canvas id="myChart${data.id}" max-width="400" max-height="400" height="700" width="900" style= "width: 510px; height: 500px;"></canvas>
            `)

          var graph_Label = JSON.parse(data.labels);
          var graph_Data = JSON.parse(data.data)
          generateGraphs('red', graph_Label, input_, graph_Data, data.id)



    });
}
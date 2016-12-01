

$(document).ready(function(){
  fetchCurrentUserGraphs()
  })

$(document).on('click','select .option',function(e){
  debugger;
})


function Graph(color, graphLabel, type, data, canvNumber){
  this.id = canvNumber;
  this.color = color;
  this.type = type;
  this.label = graphLabel;
  this.data = data
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

function fetch_graphs(color, label, type, data, canvasNumber){
  var graph = new Graph(color, label, type, data, canvasNumber);
  graph.createGraph()
}



function User (name, email){
  this.name = name;
  this.email = email;
}


function fetchCurrentUserGraphs(input = 'bar'){
  var id = $("input#user_id").val()
    $.ajax({
    type: 'get',
    url: `/users/${id}/graphs.json`,
    dataType: 'json'
      }).done(function(data) {

          for(var i =0; i<data.length; i++){
            $('.container').append(`
              <div id="${data[i].id}">
                      <select>
                        <option value="bar">Bar</option>
                        <option value="Pie">Saab</option>
                        <option value="line">Line</option>
                      </select>
              <canvas id="myChart${i}" max-width="400" max-height="400" height="700" width="900" style= "width: 510px; height: 500px;"></canvas>
              </div>`)
            var graphLabel = JSON.parse(data[i].labels);
            var graphData = JSON.parse(data[i].data)
            fetch_graphs('red', graphLabel, input, graphData, i)
          }

      });
}

function fetchCurrentUserGraph(input){
  var user_id = $("input#user_id").val()
  var current_graph = $("div#id").val()

  $.ajax({
  type: 'get',
  url: `/users/${user_id}/graphs/${current_graph}.json`,
  dataType: 'json'
    }).done(function(data) {
        for(var i =0; i<data.length; i++){
          // $('.container').append(`<p>${data[i].id}</p>`)
          $('.container').append(`<canvas id="myChart${data[i].id}" max-width="400" max-height="400" height="700" width="900" style= "width: 510px; height: 500px;"></canvas>`)
          var graphLabel = JSON.parse(data[i].labels);
          var graphData = JSON.parse(data[i].data)
          fetch_graphs('red', graphLabel, input, graphData, data[i].id)

        }

    });
}










// $(document).ready(function(){
//   fetchCurrentUserGraphs()
//   })
//
//
// function Graph(color, graphLabel, type, data){
//   this.color = color;
//   this.type = type;
//   this.label = graphLabel;
//   this.data = data
//   this.graph = '';
//
// }
//
// Graph.prototype.createGraph = function(){
//   var ctx = document.getElementById("myChart");
//
//   var myChart = new Chart(ctx, {
//       type: this.type,
//       data: {
//           labels: this.label,
//           datasets: [{
//               label: this.label,
//               data: this.data,
//               backgroundColor: 'rgba(255,99,132,1)',
//               borderColor: 'rgba(255,99,132,1)',
//               borderWidth: 1
//           }]
//       },
//       options: {
//           scales: {
//               yAxes: [{
//                   ticks: {
//                       beginAtZero:true
//                   }
//               }]
//           }
//       }
//   });
// }
//
// function fetch_graphs(color, label, type, data){
//   var graph = new Graph(color, label, type, data);
//   graph.createGraph()
// }
//
//
//
// function User (name, email){
//   this.name = name;
//   this.email = email;
// }
//
//
// function fetchCurrentUserGraphs(){
//   var id = $("input#user_id").val()
//     $.ajax({
//     type: 'get',
//     url: `/users/${id}/graphs.json`,
//     dataType: 'json'
//       }).done(function(data) {
//
//           for(var i =0; i<data.length; i++){
//             $('.container').append(`<canvas id="myChart${i}" max-width="400" max-height="400" height="700" width="900" style= "width: 510px; height: 500px;"></canvas>`)
//             var graphLabel = JSON.parse(data[i].labels);
//             var graphData = JSON.parse(data[i].data)
//             fetch_graphs('red', graphLabel, 'bar', graphData)
//           }
//
//       });
// }

$(document).on('turbolinks:load',function(){
  if($('.users.show').length > 0){
    defaultColor();
    UsersShow.userId = $("input#user_id").val();
    UsersShow.runAll();

  }else if ($('.graphs.edit').length > 0){
    defaultColor();
    GraphsEdit.graphId = $('input#graph_id').val();
    GraphsEdit.userId = $('input#user_id').val();
    GraphsEdit.type = '';
    GraphsEdit.runAll();
  }
});
////////
  class UsersShow{
    static runAll(){
      this.generateGraphs('bar');
      this.showCsv();
      this.changeSelector();
    }
    static generateGraphs(input){
      var user_id = this.userId
        $.ajax({
        type: 'get',
        url: `/users/${user_id}/graphs`,
        dataType: 'json'
          }).done(function(data) {
            debugger;
              for(var i =0; i<data.length; i++){
                  var graph = new Graph(data[i])
                  graph.appendCanvasUsersShow();
                  graph.appendGraph();
              }

          });
    }
    static showCsv(){
      $('#showCsv').on('click',function(){
        document.getElementById('id02').style.display='block'
      })
    }
    static changeSelector(){
      $(document).on('change','.target',function(){
        var value = $(this).val();
        var graphId = this.parentElement.id
        generateCurrentUserGraph(value, graphId)

      })
    }

  }
///////////
var selector = 'bar';
  class GraphsEdit{
    static runAll(){
        this.generateGraph('red','bar');
        this.updateData();
        this.emailGraph();
        this.changeSelector();
        this.saveChart();
        this.changeData();
        this.changeColor();
    }

    static generateGraph(clr,tpe= 'bar'){
      var graphId = this.graphId
      generateCurrentUserGraphEdit(tpe, graphId,clr);
    }
    static updateData(){
      var graphId = this.graphId
      $('.graphs.edit').on('submit','form',function(event){
        event.preventDefault();
        var dataPoints = $(this).serializeArray();
        updateGraphData(dataPoints, this.action)
        generateCurrentUserGraphEdit('bar', graphId)
        location.reload();
      });
    }
    static emailGraph(){
      var userId = this.userId;
      var graphId = this.graphId;

      $("#email-btn").on('click', function(e){
        e.preventDefault();
        var recipient = $("#recipient").val();
        var msg = $("#message").val();
        var base64Chart = sendChartToServer(graphId);
        var url = this.parentElement.action
        document.getElementById('id01').style.display='block'
            $.ajax({
              type: 'post',
              url: `/users/${userId}/graphs/${graphId}/send_mail`,
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
    static changeSelector(){
      var graphId = this.graphId;
      $(document).on('change','.target',function(){
        var value = $(this).val();
        selector = value;
        generateCurrentUserGraphColor(value,graphId)
      })
    }
    static changeColor(){
      var graphId = GraphsEdit.graphId;
    $('.graphs.edit').on('click',`canvas#myChart${graphId}`,function(){
        randColors = getRandomColor();
        generateCurrentUserGraphColor(selector,graphId)
        console.log('clicked')
      })
    }
    static saveChart(){
      $('button#save-btn').on('click',function(){
        var charNum = $("input#graph_id").val()
       $(`#myChart${charNum}`).get(0).toBlob(function(blob) {
         saveAs(blob, "chart.png");
     });

      })
    }
    static changeData(){
      $('button#changeData').on('click',function(){
        var userId = $('input#user_id').val()
        var graphId = $('input#graph_id').val()

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

      })
    }
  }
/////////////
 class Graph{
   constructor(attributes){
     this.id = attributes.id;
     this.color = randColors;
     this.type = 'bar';
     this.label = JSON.parse(attributes.labels);
     this.data = JSON.parse(attributes.data);
     this.graph = '';
   }

   appendCanvasUsersShow(){
     var user_id = $("input#user_id").val()
     $('.container').append(`
       <div id="${this.id}">
               <select class="target">
                 <option value="bar">Bar</option>
                 <option value="pie">Pie</option>
                 <option value="line">Line</option>
               </select>
         <a href="/users/${user_id}/graphs/${this.id}/edit">Customize Graph</a>
       <canvas id="myChart${this.id}" max-width="400" max-height="400" height="700" width="900" style= "width: 510px; height: 500px;"></canvas>
       </div><br><br>`)
   }
   replaceCanavasUsersShow(){
     var user_id = $("input#user_id").val()
     $(`div#${this.id}`).html('');
     $(`div#${this.id}`).append(
       ` <div id="${this.id}">
                <select class="target">
                  <option value="bar">Bar</option>
                  <option value="pie">Pie</option>
                  <option value="line">Line</option>
                </select>
          <a href="/users/${user_id}/graphs/${this.id}/edit">Customize Graph</a>
        <canvas id="myChart${this.id}" max-width="400" max-height="400" height="700" width="900" style= "width: 510px; height: 500px;"></canvas>
        </div><br><br>`

     )
   }
   appendCanvasGraphsEdit(){

     $(`.edit_graph`).html('')
     $(`.edit_graph`).append(`
       <div id="${this.id}">
               <select class="target">
                 <option  value="bar">Bar</option>
                 <option  value="pie">Pie</option>
                 <option  value="line">Line</option>
               </select>
       <canvas id="myChart${this.id}" max-width="400" max-height="400" height="700" width="900" style= "width: 510px; height: 500px;"></canvas>
       </div><br><br>
       `)

   }
   replaceCanvasGraphsEdit(){
     $(`canvas#myChart${this.id}`).replaceWith(`
       <canvas id="myChart${this.id}" max-width="400" max-height="400" height="700" width="900" style= "width: 510px; height: 500px;"></canvas>
       </div><br><br>
       `)
   }

   appendGraph(){
     JsGraph(this.id, this.type, this.label, this.data, this.color)
   }
 }

/////////

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function defaultColor(){
  randColors = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
  ]
}

function sendChartToServer(graphid){
  var canvas = $(`#myChart${graphid}`).get(0).toDataURL();
  return canvas
}

function JsGraph(id, type, labels, data, colors){
  var ctx = document.getElementById(`myChart${id}`);

  myChart = new Chart(ctx, {
    title:{
     text: "Both dataSeries attached to Click events."
    },
      type: type,
      data: {
          labels: labels,
          datasets: [{
              label: labels,
              data: data,
              backgroundColor: colors,
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


function generateCurrentUserGraph(input, id){
  var userId = $("input#user_id").val()
  var currentGraphId = id
  $.ajax({
      type: 'get',
      url: `/users/${userId}/graphs/${currentGraphId}.json`,
      dataType: 'json',
    }).done(function(data) {

        var singleGraph = new Graph(data);
        singleGraph.type = input;
        singleGraph.replaceCanvasGraphsEdit()
        singleGraph.appendGraph();
    });
}


function generateCurrentUserGraphEdit(input, id,clr=randColors){
  var userId = $("input#user_id").val()
  var currentGraphId = id
  $.ajax({
      type: 'get',
      url: `/users/${userId}/graphs/${currentGraphId}.json`,
      dataType: 'json',
    }).done(function(data) {

          var editGraph = new Graph(data);
          editGraph.type = input;
          editGraph.appendCanvasGraphsEdit();
          editGraph.appendGraph();
    });
}

function generateCurrentUserGraphColor(input, id,clr=randColors){
  var userId = $("input#user_id").val()
  var currentGraphId = id
  $.ajax({
      type: 'get',
      url: `/users/${userId}/graphs/${currentGraphId}.json`,
      dataType: 'json',
    }).done(function(data) {
          var editGraph = new Graph(data);
          editGraph.type = input;
          editGraph.replaceCanvasGraphsEdit();
          editGraph.appendGraph();
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

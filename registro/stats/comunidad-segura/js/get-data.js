var SERVER = 'https://elgaragehub.com:9484/';
var COLORS = ['#f92d52', '#4ed55f', '#5ac4f6'];

var filter = filter || {
  programa: '%',
  escuela: '%',
  sexo: '%',
  edadMin: 0,
  edadMax: 99,
  programaTxt: '--Cualquier programa--',
  escuelaTxt: '--Cualquier escuela--',
  sexoTxt: '--Cualquier sexo--'
};

var ctx = document.getElementById('chart');
var chart;

function updateChart(data) {
  if(!chart) {
    chart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        title: {
          display: true,
          text: '¿Consideras que tu colonia/comunidad es segura?',
          fontSize: '30'
        }
      }
    });
  } else {
    chart.data = data;
    chart.update();
  }
}

function getStat() {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      var res = JSON.parse(request.responseText);
      var data = {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: []
        }]
      };
      var processedItems = 0;
      res.forEach(function(item, index, array) {
        data.labels.push(item.comunidadSegura);
        data.datasets[0].data.push(item.c);
        data.datasets[0].backgroundColor.push(COLORS[index]);
        processedItems++;
        if(processedItems == array.length) {
          updateChart(data);
        }
      });
      if(res.length == 0) {
        updateChart(data);
      }
    }
  }
  var uri = encodeURI(SERVER + 'get-stat?data=comunidad-segura&programa=' + filter.programa + '&escuela=' + filter.escuela + '&sexo=' + filter.sexo + '&edad-min=' + filter.edadMin + '&edad-max=' + filter.edadMax);

  request.open('GET', uri, true);
  request.send();
}
getStat();

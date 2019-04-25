var SERVER = 'https://elgaragehub.com:9484/';
var COLORS = ['#f92d52', '#f93b2f', '#f99205', '#fcc803', '#4ed55f', '#5ac4f6', '#5752d0'];
var COLORS2 = ['#f93b2f', '#4ed55f'];
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
var ctx3 = document.getElementById('chart3');
var chart, chart3;

function updateChart(data) {
  if(!chart) {
    chart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        title: {
          display: true,
          text: '¿Te consideras una persona creativa?',
          fontSize: '30'
        }
      }
    });
  } else {
    chart.data = data;
    chart.update();
  }
}

function updateChart3(data) {
  if(!chart3) {
    chart3 = new Chart(ctx3, {
      type: 'pie',
      data: data,
      options: {
        title: {
          display: true,
          text: '¿Alguna vez habías pensado en crear un robot?',
          fontSize: '30'
        }
      }
    });
  } else {
    chart3.data = data;
    chart3.update();
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
          label: 'Encuestados',
          data: [],
          backgroundColor: COLORS2
        }]
      };
      var processedItems = 0;
      res.forEach(function(item, index, array) {
        data.labels.push(item.personaCreativa);
        data.datasets[0].data.push(item.c);
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
  var uri = encodeURI(SERVER + 'get-stat?data=persona-creativa&programa=' + filter.programa + '&escuela=' + filter.escuela + '&sexo=' + filter.sexo + '&edad-min=' + filter.edadMin + '&edad-max=' + filter.edadMax);

  request.open('GET', uri, true);
  request.send();

var request3 = new XMLHttpRequest();
  request3.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      var res3 = JSON.parse(request3.responseText);
      var data3 = {
        labels: [],
        datasets: [{
          label: 'Encuestados',
          data: [],
          backgroundColor: COLORS2
        }]
      };
      var processedItems = 0;
      res3.forEach(function(item, index, array) {
        data3.labels.push(item.crearRobot);
        data3.datasets[0].data.push(item.c);
        processedItems++;
        if(processedItems == array.length) {
          updateChart3(data3);
        }
      });
      if(res3.length == 0) {
        updateChart3(data3);
      }
    }
  }
  var uri3 = encodeURI(SERVER + 'get-stat?data=crear-robot&programa=' + filter.programa + '&escuela=' + filter.escuela + '&sexo=' + filter.sexo + '&edad-min=' + filter.edadMin + '&edad-max=' + filter.edadMax);

  request3.open('GET', uri3, true);
  request3.send();
}
getStat();

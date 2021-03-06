var SERVER = 'https://elgaragehub.com:9484/';
var COLORS = ['#f92d52', '#f93b2f', '#f99205', '#fcc803', '#4ed55f', '#5ac4f6', '#5752d0'];

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
var ctx2 = document.getElementById('chart2');
var chart, chart2;

function updateChart(data) {
  if(!chart) {
    chart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        title: {
          display: true,
          text: 'Número de personas que viven en su casa',
          fontSize: '30'
        }
      }
    });
  } else {
    chart.data = data;
    chart.update();
  }
}

function updateChart2(data) {
  if(!chart2) {
    chart2 = new Chart(ctx2, {
      type: 'pie',
      data: data,
      options: {
        title: {
          display: true,
          text: 'Parentesco con las personas que viven en su casa',
          fontSize: '30'
        }
      }
    });
  } else {
    chart2.data = data;
    chart2.update();
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
          backgroundColor: '#2c395d'
        }]
      };
      var processedItems = 0;
      res.forEach(function(item, index, array) {
        data.labels.push(item.numeroFamiliares);
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
  var uri = encodeURI(SERVER + 'get-stat?data=numerofamiliares&programa=' + filter.programa + '&escuela=' + filter.escuela + '&sexo=' + filter.sexo + '&edad-min=' + filter.edadMin + '&edad-max=' + filter.edadMax);

  request.open('GET', uri, true);
  request.send();

  var request2 = new XMLHttpRequest();
  request2.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      var res2 = JSON.parse(request2.responseText);
      var data2 = {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: COLORS
        }]
      };
      var processedItems = 0;
      res2.forEach(function(item, index, array) {
        data2.labels.push(item.parentesco);
        data2.datasets[0].data.push(item.c);
        processedItems++;
        if(processedItems == array.length) {
          updateChart2(data2);
        }
      });
      if(res2.length == 0) {
        updateChart2(data2);
      }
    }
  }
  var uri2 = encodeURI(SERVER + 'get-stat?data=parentescos&programa=' + filter.programa + '&escuela=' + filter.escuela + '&sexo=' + filter.sexo + '&edad-min=' + filter.edadMin + '&edad-max=' + filter.edadMax);
  request2.open('GET', uri2, true);
  request2.send();

}
getStat();

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

var ctx2 = document.getElementById('chart2');
var ctx4 = document.getElementById('chart4');
var chart2, chart4;

function updateChart2(data) {
  if(!chart2) {
    chart2 = new Chart(ctx2, {
      type: 'bar',
      data: data,
      options: {
        title: {
          display: true,
          text: '¿Qué tipos de tecnología usas/tienes en tu casa?',
          fontSize: '30'
        }
      }
    });
  } else {
    chart2.data = data;
    chart2.update();
  }
}

function updateChart4(data) {
  if(!chart4) {
    chart4 = new Chart(ctx4, {
      type: 'bar',
      data: data,
      options: {
        title: {
          display: true,
          text: '¿Qué tipo de tecnología utilizan en tu escuela?',
          fontSize: '30'
        }
      }
    });
  } else {
    chart4.data = data;
    chart4.update();
  }
}

function getStat() {
  var request2 = new XMLHttpRequest();
  request2.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      var res2 = JSON.parse(request2.responseText);
      var data2 = {
        labels: [],
        datasets: [{
          label: 'Encuestados',
          data: [],
          backgroundColor: COLORS
        }]
      };
      var processedItems = 0;
      res2.forEach(function(item, index, array) {
        data2.labels.push(item.tecnologia);
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
  var uri2 = encodeURI(SERVER + 'get-stat?data=tecnologias-casa&programa=' + filter.programa + '&escuela=' + filter.escuela + '&sexo=' + filter.sexo + '&edad-min=' + filter.edadMin + '&edad-max=' + filter.edadMax);
  request2.open('GET', uri2, true);
  request2.send();

  var request4 = new XMLHttpRequest();
  request4.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      var res4 = JSON.parse(request4.responseText);
      var data4 = {
        labels: [],
        datasets: [{
          label: 'Encuestados',
          data: [],
          backgroundColor: COLORS
        }]
      };
      var processedItems = 0;
      res4.forEach(function(item, index, array) {
        data4.labels.push(item.tecnologia);
        data4.datasets[0].data.push(item.c);
        processedItems++;
        if(processedItems == array.length) {
          updateChart4(data4);
        }
      });
      if(res4.length == 0) {
        updateChart4(data4);
      }
    }
  }
  var uri4 = encodeURI(SERVER + 'get-stat?data=tecnologias-escuela&programa=' + filter.programa + '&escuela=' + filter.escuela + '&sexo=' + filter.sexo + '&edad-min=' + filter.edadMin + '&edad-max=' + filter.edadMax);
  request4.open('GET', uri4, true);
  request4.send();
}
getStat();

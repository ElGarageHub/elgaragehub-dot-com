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
var ctx2 = document.getElementById('chart2');
var ctx3 = document.getElementById('chart3');
var ctx4 = document.getElementById('chart4');
var chart, chart2, chart3, chart4;

function updateChart(data) {
  if(!chart) {
    chart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        title: {
          display: true,
          text: '¿Has sido víctima de algún tipo de violencia?',
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
      type: 'bar',
      data: data,
      options: {
        title: {
          display: true,
          text: '¿De qué tipo de violencia has sido víctima?',
          fontSize: '30'
        }
      }
    });
  } else {
    chart2.data = data;
    chart2.update();
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
          text: '¿Te consideras una persona violenta?',
          fontSize: '30'
        }
      }
    });
  } else {
    chart3.data = data;
    chart3.update();
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
          text: '¿Qué formas de violencia has practicado?',
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
        data.labels.push(item.victimaViolencia);
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
  var uri = encodeURI(SERVER + 'get-stat?data=victima-violencia&programa=' + filter.programa + '&escuela=' + filter.escuela + '&sexo=' + filter.sexo + '&edad-min=' + filter.edadMin + '&edad-max=' + filter.edadMax);

  request.open('GET', uri, true);
  request.send();

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
        data2.labels.push(item.tipoViolencia);
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
  var uri2 = encodeURI(SERVER + 'get-stat?data=tipo-violencia-victima&programa=' + filter.programa + '&escuela=' + filter.escuela + '&sexo=' + filter.sexo + '&edad-min=' + filter.edadMin + '&edad-max=' + filter.edadMax);
  request2.open('GET', uri2, true);
  request2.send();

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
        data3.labels.push(item.personaViolenta);
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
  var uri3 = encodeURI(SERVER + 'get-stat?data=persona-violenta&programa=' + filter.programa + '&escuela=' + filter.escuela + '&sexo=' + filter.sexo + '&edad-min=' + filter.edadMin + '&edad-max=' + filter.edadMax);

  request3.open('GET', uri3, true);
  request3.send();

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
        data4.labels.push(item.tipoViolencia);
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
  var uri4 = encodeURI(SERVER + 'get-stat?data=tipo-violencia-practicada&programa=' + filter.programa + '&escuela=' + filter.escuela + '&sexo=' + filter.sexo + '&edad-min=' + filter.edadMin + '&edad-max=' + filter.edadMax);
  request4.open('GET', uri4, true);
  request4.send();
}
getStat();

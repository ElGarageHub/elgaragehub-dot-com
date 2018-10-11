var SERVER = 'https://elgaragehub.com:9484/';

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
      type: 'bar',
      data: data,
      options: {
        title: {
          display: true,
          text: 'Nivel de estudios que esperan alcanzar (%)',
          fontSize: '30'
        },
        scales: {
          yAxes: [{
            ticks: {
              callback: function(v) {
                return v + '%';
              }
            }
          }]
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
        datasets: [
        {
          label: 'Hombres',
          data: [],
          backgroundColor: '#89CFF0'
        },
        {
          label: 'Mujeres',
          data: [],
          backgroundColor: '#F4C2C2'
        },
        {
          label: 'Otros',
          data: [],
          backgroundColor: '#C2F4C2'
        }
        ]
      };
      var processedItems = 0;
      res.forEach(function(item, index, array) {
        data.labels.push(item.nivel);
        data.datasets[0].data.push((item.m == null) ? 0 : item.m);
        data.datasets[1].data.push((item.f == null) ? 0 : item.f);
        data.datasets[2].data.push((item.o == null) ? 0 : item.o);
        processedItems++;
        if(processedItems == array.length) {
          for(var i = 0; i < 3; i++) {
            var sum = data.datasets[i].data.reduce(add, 0);
            data.datasets[i].data = data.datasets[i].data.map(function(d) {return (d / sum * 100).toFixed(2)});
          }
          updateChart(data);
        }
      });
      if(res.length == 0) {
        updateChart(data);
      }
    }
  }
  var uri = encodeURI(SERVER + 'get-stat?data=estudios&programa=' + filter.programa + '&escuela=' + filter.escuela + '&sexo=' + filter.sexo + '&edad-min=' + filter.edadMin + '&edad-max=' + filter.edadMax);

  request.open('GET', uri, true);
  request.send();
}
getStat();

function add(a, b) {
  return a + b;
}

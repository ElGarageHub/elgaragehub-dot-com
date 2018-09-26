var SERVER = 'https://elgaragehub.com:9484/';
var request = new XMLHttpRequest();
var chart;
request.onreadystatechange = function() {
  if(this.readyState == 4 && this.status == 200) {
    var ctx = document.getElementById('chart');
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
      }
    });
  }
}
request.open('GET', SERVER + 'get-stat?data=estudios', true);
request.send();

function add(a, b) {
    return a + b;
}

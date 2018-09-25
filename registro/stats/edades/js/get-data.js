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
      data.labels.push(item.edad);
      data.datasets[0].data.push((item.m == null) ? 0 : item.m);
      data.datasets[1].data.push((item.f == null) ? 0 : item.f);
      data.datasets[2].data.push((item.o == null) ? 0 : item.o);
      processedItems++;
      if(processedItems == array.length) {
        chart = new Chart(ctx, {
          type: 'bar',
          data: data,
          options: {
            title: {
              display: true,
              text: 'Edades y géneros',
              fontSize: '30'
            },
            scales: {
            xAxes: [{stacked: true}],
            yAxes: [{stacked: true}]
            }
          }
        });
      }
    });
  }
}
request.open('GET', SERVER + 'get-stat?data=edades', true);
request.send();

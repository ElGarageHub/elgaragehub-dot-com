var SERVER = SERVER ||'https://elgaragehub.com:9484/';

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

function getStat() {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      var res = JSON.parse(request.responseText);
      var processed = 0;
      var data = [];
      res.forEach(function(item, index, array) {
        data.push([item.word, item.c]);
        processed++;
        if(processed == array.length) {
          WordCloud(document.getElementById('wordcloud'), {list: data, weightFactor: 50 * 5 / array[0].c} );
        }
      });
    }
  }
  var uri = encodeURI(SERVER + 'get-stat?data=juego-favorito&programa=' + filter.programa + '&escuela=' + filter.escuela + '&sexo=' + filter.sexo + '&edad-min=' + filter.edadMin + '&edad-max=' + filter.edadMax);

  request.open('GET', uri, true);
  request.send();
}
getStat();

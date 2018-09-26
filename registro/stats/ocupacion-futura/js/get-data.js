var SERVER = 'https://elgaragehub.com:9484/';
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
        WordCloud(document.getElementById('wordcloud'), {list: data, weightFactor: 2.5} );
      }
    });
  }
}

request.open('GET', SERVER + 'get-stat?data=ocupacion-futura', true);
request.send();

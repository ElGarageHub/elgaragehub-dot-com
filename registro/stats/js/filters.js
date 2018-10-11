var SERVER = SERVER || 'https://elgaragehub.com:9484/';
var GET_DATA_SERVER = SERVER + 'get-data?';

function getJSONData(params, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', GET_DATA_SERVER + params, true);
  request.onload = function() {
    if(request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      callback(null, data);
    } else {
      callback(true, null);
    }
  }
  request.onerror = function() {
    callback(true, null);
  }
  request.send();
}

function getSelectValue(selector, i) {
  i = i || 0;
  return $(selector)[i].options[$(selector)[i].selectedIndex].value;
}

function updateStatDescription() {
  $('#stat-description-programa')[0].innerHTML = filter.programaTxt;
  $('#stat-description-escuela')[0].innerHTML = filter.escuelaTxt;
  $('#stat-description-sexo')[0].innerHTML = filter.sexoTxt;
  $('#stat-description-edades')[0].innerHTML = filter.edadMin + ' - ' +
    filter.edadMax;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      var res = JSON.parse(request.responseText);
      $('#stat-description-universo')[0].innerHTML = res[0].c;
    }
  }
  var uri = encodeURI(SERVER + 'get-stat?data=universo&programa=' + filter.programa + '&escuela=' + filter.escuela + '&sexo=' + filter.sexo + '&edad-min=' + filter.edadMin + '&edad-max=' + filter.edadMax);

  request.open('GET', uri, true);
  request.send();

}

getJSONData('data=escuelas', function(err, escuelas) {
  if(!err) {
    escuelas.forEach(function(escuela) {
      var option = document.createElement('option');
      option.text = escuela.nombre;
      option.value = escuela.id;
      $('#escuela')[0].add(option);
    });
  } else {
    //error
  }
});

getJSONData('data=programas', function(err, programas) {
  if(!err) {
    programas.forEach(function(programa) {
      var option = document.createElement('option');
      option.text = programa.nombre;
      option.value = programa.id;
      $('#programa')[0].add(option);
    });
  } else {
    //error
  }
});

for(var i = 0; i < 100; i++) {
  var option = document.createElement('option');
  option.text = '' + i + ((i == 99) ? '+' : '');
  option.value = '' + i;
  var option2 = document.createElement('option');
  option2.text = '' + i + ((i == 99) ? '+' : '');
  option2.value = '' + i;
  $('#edad-min')[0].add(option);
  $('#edad-max')[0].add(option2);
}

$('#edad-min')[0].selectedIndex = "0";
$('#edad-max')[0].selectedIndex = "99";

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

$('#filtrar')[0].onclick = function() {
  filter.programa = getSelectValue('#programa');
  filter.escuela = getSelectValue('#escuela');
  filter.sexo = getSelectValue('#sexo');
  filter.edadMin = getSelectValue('#edad-min');
  filter.edadMax = getSelectValue('#edad-max');
  filter.programaTxt = $('#programa')[0].selectedOptions[0].innerHTML;
  filter.escuelaTxt = $('#escuela')[0].selectedOptions[0].innerHTML;
  filter.sexoTxt = $('#sexo')[0].selectedOptions[0].innerHTML;
  if($('#wordcloud')[0]) $('#wordcloud')[0].getContext('2d').clearRect(0, 0, $('#wordcloud')[0].width, $('#wordcloud')[0].height);
  getStat();
  updateStatDescription();
  $('#filter-modal')[0].style.display = 'none';
}

$('#quitar-filtros')[0].onclick = function() {
  filter.programa = '%';
  filter.escuela = '%';
  filter.sexo = '%';
  filter.edadMin = 0;
  filter.edadMax = 99;
  filter.programaTxt = '--Cualquier programa--';
  filter.escuelaTxt = '--Cualquier escuela--';
  filter.sexoTxt = '--Cualquier sexo--';
  $('#programa')[0].selectedIndex = "0";
  $('#escuela')[0].selectedIndex = "0";
  $('#sexo')[0].selectedIndex = "0";
  $('#edad-min')[0].selectedIndex = "0";
  $('#edad-max')[0].selectedIndex = "99";
  getStat();
  updateStatDescription();
  $('#filter-modal')[0].style.display = 'none';
}

updateStatDescription();

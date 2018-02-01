var nFamiliares = 0;
var SERVER = 'http://localhost:9484/get-data?';

var escuelasRequest = new XMLHttpRequest();
escuelasRequest.open('GET', SERVER + 'data=escuelas', true);
escuelasRequest.onload = function() {
  if(escuelasRequest.status >= 200 && escuelasRequest.status < 400) {
    escuelas = JSON.parse(escuelasRequest.responseText);
    escuelas.forEach(function(escuela) {
      var option = document.createElement('option');
      option.text = escuela.nombre;
      option.value = escuela.id;
      $('#escuela')[0].add(option);
    });
  } else {
    //error
  }
};
escuelasRequest.onerror = function() {
  //error
};
escuelasRequest.send();

for(var i = 0; i < 100; i++) {
  var option = document.createElement('option');
  option.text = '' + i + ((i == 99) ? '+' : '');
  option.value = '' + i;
  $('#edad')[0].add(option);
}

function familiarInsertRow() {
  nFamiliares++;
  var tableFam = $('#familiares')[0];
  var row = tableFam.insertRow(tableFam.rows.length - 1);
  var cell = row.insertCell(0);
  cell.innerHTML = '<button type="button" class="table-remove" data-remove="' + (nFamiliares - 1) + '">-</button>';
  cell = row.insertCell(1);
  cell = row.insertCell(2);
  cell.appendChild(tableCreateEdadSelect());
  cell = row.insertCell(3);
}

function tableCreateEdadSelect() {
  var select = document.createElement('select');
  for(var i = -1; i < 100; i++) {
    var option = document.createElement('option');
    if(i == -1) {
      option.text = '-- Edad --';
      option.value = '';
      select.add(option);
    } else {
      option.text = '' + i + ((i == 99) ? '+' : '');
      option.value = '' + i;
      select.add(option);
    }
  }
  return select;
}

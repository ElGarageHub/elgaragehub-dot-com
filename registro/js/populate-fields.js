var nFamiliares = 0;
var GET_DATA_SERVER = 'https://elgaragehub.com:9484/get-data?';
var parentescos = null;

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

getJSONData('data=parentescos', function(err, data) {
  if(!err) {
    parentescos = data;
    if(nFamiliares > 0) {
      //populate
    }
  } else {
    //error
  }
});

getJSONData('data=niveles-estudios', function(err, niveles) {
  if(!err) {
    niveles.forEach(function(nivel) {
      var option = document.createElement('option');
      option.text = nivel.nivel;
      option.value = nivel.id;
      $('#nivel-estudios')[0].add(option);
    });
  } else {
    //error
  }
});

getJSONData('data=tipos-violencia', function(err, tipos) {
  if(!err) {
    tipos.forEach(function(tipo) {
      ['#tipos-violencia-table', '#violencia-practicada-table'].forEach(function(tableName) {
        var table = $(tableName)[0];
        var row = table.insertRow(table.rows.length);
        var cell = row.insertCell(0);
        var name = null;
        if(tableName == '#tipos-violencia-table') {
          name = 'tipos-violencia';
        } else if(tableName == '#violencia-practicada-table') {
          name = 'violencia-practicada';
        }
        cell.innerHTML = '<input type="checkbox" name="' + name + '" value="' + tipo.id + '">' + tipo.tipo;
      });
    });
  } else {
    //error
  }
});

getJSONData('data=problemas-familia', function(err, problemas) {
  if(!err) {
    problemas.forEach(function(problema) {
      var table = $('#problemas-familia-table')[0];
      var row = table.insertRow(table.rows.length);
      var cell = row.insertCell(0);
      cell.innerHTML = '<input type="checkbox" name="problemas-familia" value="' + problema.id + '">' + problema.problema;
    });
  } else {
    //error
  }
});

getJSONData('data=tecnologia-casa', function(err, tecnologias) {
  if(!err) {
    tecnologias.forEach(function(tecnologia) {
      var table = $('#tecnologias-casa-table')[0];
      var row = table.insertRow(table.rows.length);
      var cell = row.insertCell(0);
      cell.innerHTML = '<input type="checkbox" name="tecnologias-casa" value="' + tecnologia.id + '">' + tecnologia.tecnologia;
    });
  } else {
    //error
  }
});

getJSONData('data=temas-interes', function(err, temas) {
  if(!err) {
    temas.forEach(function(tema) {
      var table = $('#temas-interes-table')[0];
      var row = table.insertRow(table.rows.length);
      var cell = row.insertCell(0);
      cell.innerHTML = '<input type="checkbox" name="temas-interes" value="' + tema.id + '">' + tema.tema;
    });
  } else {
    //error
  }
});

getJSONData('data=tecnologia-escuela', function(err, tecnologias) {
  if(!err) {
    tecnologias.forEach(function(tecnologia) {
      var table = $('#tecnologias-escuela-table')[0];
      var row = table.insertRow(table.rows.length);
      var cell = row.insertCell(0);
      cell.innerHTML = '<input type="checkbox" name="tecnologias-escuela" value="' + tecnologia.id + '">' + tecnologia.tecnologia;
    });
  } else {
    //error
  }
});

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
  cell.innerHTML = '<button type="button" class="table-remove" data-remove="' + (nFamiliares - 1) + '" onclick="tableRemoveRow(this)">-</button>';
  cell = row.insertCell(1);
  cell.appendChild(tableCreateParentescoSelect());
  cell = row.insertCell(2);
  cell.appendChild(tableCreateEdadSelect());
  cell = row.insertCell(3);
  cell.appendChild(tableCreateProfesionInput());
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
  select.classList.add('familiar-edad');
  return select;
}

function tableCreateParentescoSelect() {
  var select = document.createElement('select');
  var option = document.createElement('option');
  option.text = '-- Parentesco --';
  option.value = '';
  select.add(option);
  if(parentescos) {
    parentescos.forEach(function(parentesco) {
      var option = document.createElement('option');
      option.text = parentesco.nombre;
      option.value = parentesco.id;
      select.add(option);
    });
  }
  select.classList.add('familiar-parentesco');
  return select;
}

function tableCreateProfesionInput() {
  var input = document.createElement('input');
  input.setAttribute('placeholder', 'Profesión');
  input.setAttribute('autocomplete', 'off');
  input.type = 'text';
  input.classList.add('familiar-profesion');
  return input;
}

function tableRemoveRow(clickedButton) {
  var row = clickedButton.parentElement.parentElement;
  row.parentElement.removeChild(row);
  nFamiliares--;
}

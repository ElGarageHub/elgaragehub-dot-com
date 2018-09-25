var REGISTER_SERVER = 'https://elgaragehub.com:9484/register';
function getSelectValue(selector, i) {
  i = i || 0;
  return parseInt($(selector)[i].options[$(selector)[i].selectedIndex].value);
}

function generateJSON() {
  data = {};

  [
    'escuela',
    'programa',
    'edad',
    'sexo',
    'nivel-estudios',
    'comunidad-segura',
    'victima-violencia',
    'persona-violenta',
    'persona-creativa',
    'crear-robot',
    'disminuir-violencia'
  ].forEach(function(item) {
    data[item] = getSelectValue('#' + item);
  });

  [
    'ocupacion-futura',
    'admiracion',
    'juego-favorito',
    'significado-violencia',
    'como-disminuir-violencia',
    'llave'
  ].forEach(function(item) {
    data[item] = $('#' + item)[0].value;
  });

  data.familiares = [];
  for(var i = 0; i < nFamiliares; i++) {
    data.familiares.push({});
  }
  $('.familiar-parentesco').forEach(function(el, i) {
    data.familiares[i].parentesco = getSelectValue('.familiar-parentesco', i);
  });
  $('.familiar-edad').forEach(function(el, i) {
    data.familiares[i].edad = getSelectValue('.familiar-edad', i);
  });
  $('.familiar-profesion').forEach(function(el, i) {
    data.familiares[i].profesion = el.value;
  });

  [
    'tipos-violencia',
    'problemas-familia',
    'violencia-practicada',
    'tecnologias-casa',
    'temas-interes',
    'tecnologias-escuela'
  ].forEach(function(item) {
    data[item] = [];
    $('[name="' + item + '"]').forEach(function(cb) {
      if(cb.checked) data[item].push(cb.value);
    });
  });
  return data;
}

function sendData() {
  var data = generateJSON();
  var request = new XMLHttpRequest();
  request.open('POST', REGISTER_SERVER);
  request.setRequestHeader("Content-Type", "application/json");
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var res = JSON.parse(request.responseText);
      if(res.stat == 'error') {
        if(res.message.includes('llave')) {
          $('.error-msg')[0].innerHTML = 'Error. Verifica que la "llave" proporcionada por tu instructor sea la correcta.';
        } else {
          $('.error-msg')[0].innerHTML = 'Error. Verifica que hayas llenado todos los campos correctamente.';
        }
      } else if(res.stat == 'ok') {
        $('#form')[0].style.display = 'none';
        $('#success')[0].style.display = 'block';
      }
    }
  };
  request.send(JSON.stringify(data));
}

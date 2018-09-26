var SERVER = 'https://elgaragehub.com:9484/';

function addEscuela() {
  var request = new XMLHttpRequest();
  request.open('POST', SERVER + 'add-escuela');
  request.setRequestHeader("Content-Type", "application/json");
  request.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
    }
  };
  request.send(JSON.stringify({
    nombre: $('#escuela')[0].value,
    id_token: id_token
  }));
}

function addPrograma() {
  var request = new XMLHttpRequest();
  request.open('POST', SERVER + 'add-programa');
  request.setRequestHeader("Content-Type", "application/json");
  request.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
    }
  };
  request.send(JSON.stringify({
    nombre: $('#programa')[0].value,
    id_token: id_token
  }));
}

function genLlave() {
  var request = new XMLHttpRequest();
  request.open('POST', SERVER + 'gen-llave');
  request.setRequestHeader("Content-Type", "application/json");
  request.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      $('#llave')[0].innerHTML = JSON.parse(request.response).llave;
    }
  };
  request.send(JSON.stringify({
    id_token: id_token
  }));

}

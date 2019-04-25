var SERVER = 'https://elgaragehub.com:5474/save-image';

function sendCanvasImg() {
  var dataURL = can.toDataURL();
  var req = new XMLHttpRequest();
  req.open('POST', SERVER);
  req.setRequestHeader('Content-Type', 'text/plain');
  req.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      if(req.responseText == 'OK') {
        modalOk.style.display = "block";
      } else {
        modalErr.style.display = "block";
      }
    } else if(this.readyState == 4 && this.status != 200) {
      modalErr.style.display = "block";
    }
  };
  req.send(dataURL);
}

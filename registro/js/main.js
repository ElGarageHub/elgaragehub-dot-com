document.body.onload = function() {
  var style = document.createElement('style');
  style.innerHTML = "@font-face {"
    + "  font-family: 'Xolonium';"
    + "  src: url('../font/Xolonium.woff') format('woff');"
    + "}";
  document.head.appendChild(style);
}

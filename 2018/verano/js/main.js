(function() {
	if (typeof NodeList.prototype.forEach === "undefined") {
		NodeList.prototype.forEach = Array.prototype.forEach;
	}
	if (typeof HTMLCollection.prototype.forEach === "undefined") {
		HTMLCollection.prototype.forEach = Array.prototype.forEach;
	}
})();

document.body.onload = function() {
  equalizeColH();
  var style = document.createElement('style');
  style.innerHTML = "@font-face {"
    + "  font-family: 'Xolonium';"
    + "  src: url('../../font/Xolonium.woff') format('woff');"
    + "}";
  document.head.appendChild(style);
};

window.onresize = function() {
  equalizeColH();
}

var columns = ['.column', '.column2', '.column3'];
function equalizeColH() {
  columns.forEach(function(c) {
    var cols = $(c);
    cols.forEach(function(el) {
      el.style.height = 'auto';
    });
  });
  columns.forEach(function(c) {
    var cols = $(c);
    var max = Math.max(
      removePx(window.getComputedStyle($(c)[1],null).height),
      removePx(window.getComputedStyle($(c)[0],null).height));
    cols.forEach(function(el) {
      if(window.innerWidth > 992) {
        el.style.height = max + "px";
      } else {
        el.style.height = 'auto';
      }
    });
  });
}

function removePx(str) {
  return parseInt(str.substring(0,str.length-2));
}

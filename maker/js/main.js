var maxH = 0;

(function() {
	if (typeof NodeList.prototype.forEach === "undefined") {
		NodeList.prototype.forEach = Array.prototype.forEach;
	}
	if (typeof HTMLCollection.prototype.forEach === "undefined") {
		HTMLCollection.prototype.forEach = Array.prototype.forEach;
	}
})();

document.body.onload = function() {
  equalizeHeight();

  $('.maker').forEach(function(el) {
    var img = el.querySelector('img');
    var imgel = new Image();
    imgel.src = img.src.substring(0, img.src.length - 5) + '2.jpg';
    el.onmouseover = function() {
      img.src = img.src.substring(0, img.src.length - 5) + '2.jpg';
      img.style.borderColor = '#4260AC';
    };
    el.onmouseleave = function() {
      var img = el.querySelector('img');
      img.src = img.src.substring(0, img.src.length - 5) + '1.jpg';
      img.style.borderColor = '#FFFFFF';
    }
  });

  var style = document.createElement('style');
  style.innerHTML = "@font-face {"
    + "  font-family: 'Xolonium';"
    + "  src: url('../font/Xolonium.woff') format('woff');"
    + "}";
  document.head.appendChild(style);
};

window.onresize = function(event) {
  maxH = 0;
  $('.maker').forEach(function(el) {
    el.style.height = 'auto';
  });
  equalizeHeight();
};

function equalizeHeight() {
  $('.maker').forEach(function(el) {
      maxH = Math.max(maxH, removePx(window.getComputedStyle(el, null).height));
  });
  $('.maker').forEach(function(el) {
    el.style.height = maxH + 'px';
  });
}

function removePx(str) {
  return parseInt(str.substring(0,str.length-2));
}

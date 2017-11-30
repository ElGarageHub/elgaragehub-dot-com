var maxH = 0;

document.body.onload = function() {
  equalizeHeight();

  $('.maker').forEach(function(el) {
    el.onmouseover = function() {
      var img = el.querySelector('img');
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

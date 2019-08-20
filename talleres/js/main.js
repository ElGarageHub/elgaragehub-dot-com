(function() {
	if (typeof NodeList.prototype.forEach === "undefined") {
		NodeList.prototype.forEach = Array.prototype.forEach;
	}
	if (typeof HTMLCollection.prototype.forEach === "undefined") {
		HTMLCollection.prototype.forEach = Array.prototype.forEach;
	}
})();

Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

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


var animationEnd = (function(el) {
    var animations = {
          animation: 'animationend',
          OAnimation: 'oAnimationEnd',
          MozAnimation: 'mozAnimationEnd',
          WebkitAnimation: 'webkitAnimationEnd',
        };

    for (var t in animations) {
          if (el.style[t] !== undefined) {
                  return animations[t];
                }
        }
})(document.createElement('div'));

$('.badge').forEach(function(el) {
  el.addEventListener(animationEnd, function() {el.className = 'badge'});
  el.parentElement.parentElement.onmouseenter = function() {
    el.className = 'badge animated wobble';
  };
});



var modals = [
  'makerlab',
  'applecoding',
  'cienciaespacial',
  'legoclub',
  'proyectosmaker',
  'contenidodigital'
];
modals.forEach(function(modal) {
  var div = $('#' + modal + '-modal')[0];
  var btn = $('#' + modal + '-btn')[0];
  btn.onclick = function() {
    div.style.display = 'block';
  }
});

$('.close').forEach(function(el) {
  el.onclick = function() {
    modals.forEach(function(modal) {
      $('#' + modal + '-modal')[0].style.display = 'none';
    });
  };
});

window.onclick = function(event) {
  modals.forEach(function(modal) {
    var div = $('#' + modal + '-modal')[0];
    if(event.target == div) {
      div.style.display = 'none';
    }
  });
};



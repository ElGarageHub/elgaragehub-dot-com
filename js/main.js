var educativoPos = 0;
var educativoTimeout = 0;
var industrialPos = 0;
var industrialTimeout = 0;
var eduIndImgH = 591;
var eduIndImgW = 721;

(function() {
	if (typeof NodeList.prototype.forEach === "undefined") {
		NodeList.prototype.forEach = Array.prototype.forEach;
	}
	if (typeof HTMLCollection.prototype.forEach === "undefined") {
		HTMLCollection.prototype.forEach = Array.prototype.forEach;
	}
})();

function removePx(str) {
  return parseInt(str.substring(0,str.length-2));
}

var columns = ['.column', '.column2', '.column3'];
function equalizeColH() {
  columns.forEach(function(c) {
    var cols = $(c);
    var max = Math.max(
      removePx(window.getComputedStyle($(c)[1],null).height),
      removePx(window.getComputedStyle($(c)[0],null).height));
    cols.forEach(function(el) {
      el.style.height = max + "px";
    });
  });
}

window.onresize = function(event) {
  columns.forEach(function(c) {
    $(c).forEach(function(el) {
      el.style.height = "auto";
    });
  });
  equalizeColH();
  respondLogo();
};

document.body.onload = function() {
  equalizeColH();
  respondLogo();
  var style = document.createElement('style');
  style.innerHTML = "@font-face {"
    + "  font-family: 'Xolonium';"
    + "  src: url('font/Xolonium.woff') format('woff');"
    + "}";
  document.head.appendChild(style);
};

$('.educativo')[0].onmouseover = function() {
  educativoTimeout = setTimeout(moveEducativoBG, 1);
};

$('.educativo')[0].onmouseleave = function() {
  clearTimeout(educativoTimeout);
  educativoPos = 0;
  $('.educativo')[0].style.backgroundPosition = "0 " + educativoPos + "px";
};

function moveEducativoBG() {
  if(educativoPos > -getMaxMoveEdu()) {
    educativoPos -= getMaxMoveEdu() / 50;
    $('.educativo')[0].style.backgroundPosition = "0 " + educativoPos + "px";
    educativoTimeout = setTimeout(moveEducativoBG, 1);
  }
}

$('.industrial')[0].onmouseover = function() {
  industrialTimeout = setTimeout(moveIndustrialBG, 1);
};

$('.industrial')[0].onmouseleave = function() {
  clearTimeout(industrialTimeout);
  industrialPos = 0;
  $('.industrial')[0].style.backgroundPosition = "0 " + industrialPos + "px";
};

function moveIndustrialBG() {
  if(industrialPos > -getMaxMoveInd()) {
    industrialPos -= getMaxMoveInd() / 50;
    $('.industrial')[0].style.backgroundPosition = "0 " + industrialPos + "px";
    industrialTimeout = setTimeout(moveIndustrialBG, 1);
  }
}

function getMaxMoveEdu() {
  var realH = eduIndImgH
    * (removePx(window.getComputedStyle($('.educativo')[0],null).width))
    / eduIndImgW;
  return (realH
    - (removePx(window.getComputedStyle($('.educativo')[0],null).height)
    + removePx(window.getComputedStyle($('.educativo')[0],null).paddingTop)
    + removePx(window.getComputedStyle($('.educativo')[0],null).paddingBottom)
    )) - 5;
}

function getMaxMoveInd() {
  var realH = eduIndImgH
    * (removePx(window.getComputedStyle($('.industrial')[0],null).width))
    / eduIndImgW;
  return (realH
    - (removePx(window.getComputedStyle($('.industrial')[0],null).height)
    + removePx(window.getComputedStyle($('.industrial')[0],null).paddingTop)
    + removePx(window.getComputedStyle($('.industrial')[0],null).paddingBottom)
    )) - 5;
}

var modals = ['impresion3d', 'laser', 'cnc', 'ninos', 'jovenes', 'adultos'];
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

var slideIndex = 0;
carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("slide");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none"; 
    }
    slideIndex++;
    if (slideIndex > x.length) {slideIndex = 1} 
    x[slideIndex-1].style.display = "inline-block"; 
    setTimeout(carousel, 2000);
}

function respondLogo() {
  var logo = $('.logo img')[0];
  if(innerWidth < innerHeight) {
    logo.style.width = '80%';
  } else {
    logo.style.width = '16%';
  }
  logo.style.marginTop =
    -removePx(window.getComputedStyle(logo,null).height) / 2 + 'px';
  $('.educativo svg').marginTop =
    removePx(window.getComputedStyle(logo,null).height) / 2 + 'px';
}

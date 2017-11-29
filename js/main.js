var educativoPos = 0;
var educativoTimeout = 0;
var industrialPos = 0;
var industrialTimeout = 0;
var eduIndImgH = 591;
var eduIndImgW = 721;

function removePx(str) {
  return parseInt(str.substring(0,str.length-2));
}

document.body.onload = function() {
  var cols = $('.column');
  var max = Math.max(
    removePx(window.getComputedStyle($('.column')[1],null).height),
    removePx(window.getComputedStyle($('.column')[0],null).height));
  cols.forEach(function(el) {
    el.style.height = max + "px";
  });
  cols = $('.column2');
  max = Math.max(
    removePx(window.getComputedStyle($('.column2')[1],null).height),
    removePx(window.getComputedStyle($('.column2')[0],null).height));
  cols.forEach(function(el) {
    el.style.height = max + "px";
  });
  cols = $('.column3');
  max = Math.max(
    removePx(window.getComputedStyle($('.column3')[1],null).height),
    removePx(window.getComputedStyle($('.column3')[0],null).height));
  cols.forEach(function(el) {
    el.style.height = max + "px";
  });

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

//TODO: La imagen también puede escalarse por altura.
function getMaxMoveEdu() {
  var realH = eduIndImgH
    * (removePx(window.getComputedStyle($('.educativo')[0],null).width))
    / eduIndImgW;
  return (realH
    + removePx(window.getComputedStyle($('.educativo')[0],null).paddingBottom)
    )) - 5;
}

//TODO: La imagen también puede escalarse por altura.
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
    setTimeout(carousel, 2000); // Change image every 2 seconds
}

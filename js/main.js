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
    - (removePx(window.getComputedStyle($('.educativo')[0],null).height)
    + removePx(window.getComputedStyle($('.educativo')[0],null).paddingTop)
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


var modal = document.getElementById('impresion3d-modal');
var btn = document.getElementById("impresion3d-btn");
var span = document.getElementsByClassName("impresion3d-close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
  window.location.hash = '#';
}

var modal2 = document.getElementById('laser-modal');
var btn2 = document.getElementById("laser-btn");
var span2 = document.getElementsByClassName("laser-close")[0];

btn2.onclick = function() {
  modal2.style.display = "block";
}

span2.onclick = function() {
  modal2.style.display = "none";
  window.location.hash = '#';
}

window.onclick = function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
    window.location.hash = '#';
  }
}

var modal3 = document.getElementById('cnc-modal');
var btn3 = document.getElementById("cnc-btn");
var span3 = document.getElementsByClassName("cnc-close")[0];

btn3.onclick = function() {
  modal3.style.display = "block";
}

span3.onclick = function() {
  modal3.style.display = "none";
  window.location.hash = '#';
}

var modal4 = document.getElementById('ninos-modal');
var btn4 = document.getElementById("ninos-btn");
var span4 = document.getElementsByClassName("ninos-close")[0];

btn4.onclick = function() {
  modal4.style.display = "block";
}

span4.onclick = function() {
  modal4.style.display = "none";
  window.location.hash = '#';
}

var modal5 = document.getElementById('jovenes-modal');
var btn5 = document.getElementById("jovenes-btn");
var span5 = document.getElementsByClassName("jovenes-close")[0];

btn5.onclick = function() {
  modal5.style.display = "block";
}

span5.onclick = function() {
  modal5.style.display = "none";
  window.location.hash = '#';
}

var modal6 = document.getElementById('adultos-modal');
var btn6 = document.getElementById("adultos-btn");
var span6 = document.getElementsByClassName("adultos-close")[0];

btn6.onclick = function() {
  modal6.style.display = "block";
}

span6.onclick = function() {
  modal6.style.display = "none";
  window.location.hash = '#';
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    window.location.hash = '#';
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
    window.location.hash = '#';
  }
  if (event.target == modal3) {
    modal3.style.display = "none";
    window.location.hash = '#';
  }
  if (event.target == modal4) {
    modal4.style.display = "none";
    window.location.hash = '#';
  }
  if (event.target == modal5) {
    modal5.style.display = "none";
    window.location.hash = '#';
  }
  if (event.target == modal6) {
    modal6.style.display = "none";
    window.location.hash = '#';
  }
}

/*var modals = ['impresion3d', 'laser', 'cnc', 'ninos', 'jovenes', 'adultos'];
modals.forEach(function(modal) {
  var div = $('#' + modals + '-modal');
  var btn = $('#' + modals + '-btn');
  btn.onclick = function() {
    btn.style.display = 'block';
  }
});*/

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

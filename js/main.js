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
  respondVideo();
};

document.body.onload = function() {
  equalizeColH();
  respondLogo();
  respondVideo();
  var style = document.createElement('style');
  style.innerHTML = "@font-face {"
    + "  font-family: 'Xolonium';"
    + "  src: url('font/Xolonium.woff') format('woff');"
    + "}";
  document.head.appendChild(style);
  if(!mobileCheck()) {
    $('.wa')[0].style.display = 'none';
  }
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

function respondVideo() {
  var video = $('.header-video')[0];
  if(innerHeight > innerWidth / 1920 * 1080) {
    video.style.width = (innerHeight / 1080 * 1920) + 'px';
  } else {
    video.style.width = '100vw';
  }
}

function mobileCheck() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

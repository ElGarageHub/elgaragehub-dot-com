document.body.onload = function() {
  resizeMap();
};

window.onresize = function(event) {
  resizeMap();
};

function resizeMap() {
  $('.map-impacto')[0].style.width=innerWidth + 'px';
  $('.map-impacto')[0].style.height=innerHeight + 'px';
}

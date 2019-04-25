var bg;

document.body.onload = function() {
  var xCoord,yCoord="";
  var clic=false;
  var canvas=document.getElementById("can");
  var cntx=canvas.getContext("2d");
  cntx.strokeStyle="#000";
  cntx.lineWidth=2;
  cntx.lineCap="round";

  bg = new Image();
  bg.src = 'src/assets/img/papel.png';

  drawImageProp(cntx, bg, 0, 0, canvas.width, canvas.height);

  canvas.onmousedown = canvas.ontouchstart = function(event) {
    if (event.target == canvas) {
      event.preventDefault();
    }
    clic=true;
    cntx.save();
    if(event.type == 'mousedown') {
      xCoord=event.clientX-canvas.getBoundingClientRect().left;
      yCoord=event.clientY-canvas.getBoundingClientRect().top;
    } else if(event.type == 'touchstart') {
      xCoord=event.changedTouches[0].clientX-canvas.getBoundingClientRect().left;
      yCoord=event.changedTouches[0].clientY-canvas.getBoundingClientRect().top;
    }
  };

  document.onmouseup = document.ontouchend = canvas.ontouchend= function(event) {
    if (event.target == canvas) {
      event.preventDefault();
    }
    clic=false;
  };

  canvas.onmousemove = canvas.ontouchmove = function(event){
    if (event.target == canvas) {
      event.preventDefault();
    }
    if(clic==true) {
      cntx.beginPath();
      if(event.type == 'mousemove') {
        cntx.moveTo(event.clientX-canvas.getBoundingClientRect().left,event.clientY-canvas.getBoundingClientRect().top);
      } else if(event.type == 'touchmove') {
        cntx.moveTo(event.changedTouches[0].clientX-canvas.getBoundingClientRect().left,event.changedTouches[0].clientY-canvas.getBoundingClientRect().top);
      }
      cntx.lineTo(xCoord,yCoord);
      cntx.stroke();
      cntx.closePath();
      if(event.type == 'mousemove') {
        xCoord=event.clientX-canvas.getBoundingClientRect().left;
        yCoord=event.clientY-canvas.getBoundingClientRect().top;
      } else if(event.type == 'touchmove') {
        xCoord=event.changedTouches[0].clientX-canvas.getBoundingClientRect().left;
        yCoord=event.changedTouches[0].clientY-canvas.getBoundingClientRect().top;
      }
    }
  };
}

function clearCanvas() {
  drawImageProp(can.getContext("2d"), bg, 0, 0, can.width, can.height);
}

function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }

    // default offset is center
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;

    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1;

    // decide which gap to fill    
    if (nw < w) ar = w / nw;                             
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
    nw *= ar;
    nh *= ar;

    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
}

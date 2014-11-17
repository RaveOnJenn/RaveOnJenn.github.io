//
// The CanvasManager class
//
      
     function CanvasManager(canvasId) {
            this.canvas = $('#' + canvasId);
            this.imgColor = [255, 255, 255];
            this.buttonDown = false;
            this.lastPos = [0, 0];
            this.mode;

            this.canvas.mouseup(function () {
                canvasMgr.buttonDown = false;
            });

            this.canvas.mouseout(function () {
                canvasMgr.buttonDown = false;
            });

            this.canvas.mousedown(function () {
                if (!canvasMgr.mode)
                    return;

                if (arguments.length > 0) {
                    var arg = arguments[0];
                    var ctx = canvasMgr.canvas.get(0).getContext("2d");
                    var offsets = getOffsets(arg);

                    if (canvasMgr.mode == 'dropper') {                        
                        var imgData = ctx.getImageData(offsets.offsetX, offsets.offsetY, 1, 1);

                        canvasMgr.imgColor[0] = imgData.data[0];
                        canvasMgr.imgColor[1] = imgData.data[1];
                        canvasMgr.imgColor[2] = imgData.data[2];

                        $('#dvSwatch').css('background-color', 'rgb(' + imgData.data[0] +
                            ',' + imgData.data[1] +
                            ',' + imgData.data[2] + ')');
                    }
                    else if (canvasMgr.mode == 'paint') {
                        canvasMgr.buttonDown = true;
                    }
                    else if (canvasMgr.mode == 'text') {
                        canvasMgr.lastPos[0] = offsets.offsetX;
                        canvasMgr.lastPos[1] = offsets.offsetY;
                    }
                }
            });

            this.canvas.mousemove(function (e) {
                var arg = e;
                var ctx = canvasMgr.canvas.get(0).getContext("2d");
                if (canvasMgr.mode == 'paint') {
                    if (canvasMgr.buttonDown) { //mousebutton down

                        var offsets = getOffsets(e);
                        var imgData = ctx.getImageData(offsets.offsetX - 5, offsets.offsetY - 5, 10, 10);

                        for (i = 0; i < imgData.width * imgData.height * 4; i += 4) {
                            imgData.data[i] = canvasMgr.imgColor[0];
                            imgData.data[i + 1] = canvasMgr.imgColor[1];
                            imgData.data[i + 2] = canvasMgr.imgColor[2];
                            imgData.data[i + 3] = 255;
                        }

                        ctx.putImageData(imgData, offsets.offsetX - 5, offsets.offsetY - 5);
                    }
                }
            });

            $(window).keypress(function (e) {
                if (canvasMgr.mode == 'text') {
                    var canvasDOM = canvasMgr.canvas.get(0);
                    var ctx = canvasDOM.getContext("2d");
                    ctx.font = "20pt Arial";
                    ctx.textBaseline = "bottom";
                    ctx.textAlign = "left";
                    ctx.fillStyle = 'rgb(' + canvasMgr.imgColor[0] +
                            ',' + canvasMgr.imgColor[1] +
                            ',' + canvasMgr.imgColor[2] + ')';

                    ctx.fillText(String.fromCharCode(e.which), canvasMgr.lastPos[0], canvasMgr.lastPos[1]);
                    var textMTX = ctx.measureText(String.fromCharCode(e.which));
                    canvasMgr.lastPos[0] += textMTX.width + 1;
                }
            });
        }

        CanvasManager.prototype.setMode = function (mode) {
            this.mode = mode;
            var cur;
            switch (this.mode) {
                case 'text':
                    cur = 'text';
                    break;
                case 'dropper':
                    cur = 'pointer'
                    break;
                case 'paint':
                    cur = 'crosshair';
                    break;
                default:
                    cur = 'default';
                    break;

            }
            var localCanvas = this.canvas;
            
            this.canvas.mouseover(function () {
                localCanvas.css('cursor', cur);
            });
        }

        CanvasManager.prototype.drawImage = function (image, x, y, w, h) {
            var canvas = this.canvas.get(0);
            var ctx = canvas.getContext("2d");
            ctx.drawImage(image, x, y, w, h);
        }
function getOffsets(evt) {
    var offsetX, offsetY;
    if (typeof evt.offsetX != 'undefined') {
        offsetX = evt.offsetX;
        offsetY = evt.offsetY;
    }
    else if (typeof evt.clientX != 'undefined') {
        offsetX = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        offsetY = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        offsetX -= canvasMgr.canvas.get(0).offsetLeft;
        offsetY -= canvasMgr.canvas.get(0).offsetTop;
    }
    return { 'offsetX': offsetX, 'offsetY': offsetY };
}

function CanvasManager(canvasId) {
    this.canvas = $('#' + canvasId);
    this.imgColor = [255, 255, 255];
    this.buttonDown = false;
    this.lastPos = [0, 0];
    this.firstTextPos = 0;
    this.mode;
    this.imgUrl;
    this.imgData;
    this.specialMode = false;

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

            var offsets;
            if (canvasMgr.specialMode && !arg.offsetX) {
                offsets = { 'offsetX': arg.layerX - 15 , 'offsetY': arg.layerY - 35 };
            }
            else {
                offsets = getOffsets(arg);
            }

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
                canvasMgr.firstTextPos = offsets.offsetX;
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
                var offsets;
                if (canvasMgr.specialMode && !arg.offsetX) {
                    offsets = { 'offsetX': arg.layerX - 15, 'offsetY': arg.layerY - 35 };
                }
                else {
                    offsets = getOffsets(e);
                }
                
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

    $(window).keydown(function (e) {
        //disable backspace
        if (canvasMgr.mode == 'text' && (e.which == 8)) {
            e.preventDefault();
        }
    });

    $(window).keypress(function (e) {

        if (canvasMgr.mode == 'text') {

            //if(e.which            
            var canvasDOM = canvasMgr.canvas.get(0);
            var ctx = canvasDOM.getContext("2d");
            ctx.font = "36pt Impact";
            ctx.textBaseline = "middle";
            ctx.textAlign = "left";
            ctx.fillStyle = 'rgb(' + canvasMgr.imgColor[0] +
                            ',' + canvasMgr.imgColor[1] +
                            ',' + canvasMgr.imgColor[2] + ')';
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;
            ctx.shadowBlur = 30;
            ctx.fillText(String.fromCharCode(e.which), canvasMgr.lastPos[0], canvasMgr.lastPos[1]);
            var textMTX = ctx.measureText(String.fromCharCode(e.which));
            if (e.which != 13) {
                canvasMgr.lastPos[0] += textMTX.width + 1;
            } else {
                canvasMgr.lastPos[0] = canvasMgr.firstTextPos;
                canvasMgr.lastPos[1] += textMTX.height + 1;
            }

            if (e.which == 13 || e.which == 32 || e.which == 222) {
                e.preventDefault();
            }
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
        case 'clear':
            this.reloadImageFromCache();
            cur = 'default';
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

CanvasManager.prototype.loadImage = function (imageUrl) {
    var img = new Image();
    img.src = 'img/RatTerrier.png';
    this.imgUrl = imageUrl;

    img.onload = function () {
        canvasMgr.drawImage(img, 1, 1, img.naturalWidth, img.naturalHeight);
    }
}

CanvasManager.prototype.loadImageFromServer = function (imageUrl, hostUrl) {
    $.ajax({ url: hostUrl,
        accepts: "image/png",
        data: "url=" + imageUrl,
        success: function (data, textStatus, jqXHR) {
            var img = new Image();
            canvasMgr.imgUrl = imageUrl;
            canvasMgr.imgData = data;
            img.src = "img/RatTerrier.png," + data;
            img.onload = function () {
                canvasMgr.drawImage(img, 1, 1, 500, 500);
            }
        }
    });
}

CanvasManager.prototype.reloadImageFromCache = function () {
    var img = new Image();
    img.src = "img/RatTerrier.png," + this.imgData;
    img.onload = function () {
        canvasMgr.drawImage(img, 1, 1, 500, 500);
    }
}

function centerElement(ctl) {
    var leftVal = (document.documentElement.clientWidth / 2) - (ctl.width() / 2);
    var topVal = (document.documentElement.clientHeight / 2) - (ctl.height() / 2);

    if (topVal < 10) topVal = 10;
    var scroll = $(document).scrollTop() - 20;

    topVal += scroll;
    $(ctl).css({ top: topVal + "px", left: leftVal + "px" });
}

function hexToR(h) { return parseInt((cutHex(h)).substring(0, 2), 16) }
function hexToG(h) { return parseInt((cutHex(h)).substring(2, 4), 16) }
function hexToB(h) { return parseInt((cutHex(h)).substring(4, 6), 16) }
function cutHex(h) { return (h.charAt(0) == "#") ? h.substring(1, 7) : h }

/////////////////////////////////////////////
//Ajax Buddy
var AjaxBuddy = {};
AjaxBuddy["GetAjax"] = function (action, paramArray, successFunction) {
    $.ajax({
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (typeof textStatus !== 'undefined' && textStatus !== '') {
                alert(textStatus);
            }
        },
        url: "/Home/" + action,
        type: "POST",
        cache: false,
        data: paramArray, //ex. { msg: content, examId: examGridSelectedExamId },
        success: function (data) {
            if (typeof successFunction !== 'undefined') {
                successFunction(data);
            }
        }
    });
}
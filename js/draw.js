var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
var x = 80;
var y = 90;

ctx.font = "bold 36px sans-serif";
ctx.fillStyle = "#104E8B";
$('#entertext').click(function(){
    ctx.fillText($("#words").val(), x, y);
});

    $('#clear').click(function(){
        $('#canvas1').clearCanvas();
    }); //end click-clear


    
  
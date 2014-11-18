
$(document).ready(function(){
 $('#button1').click(function(){
        $('#canvas1').drawEllipse({
  fillStyle: '#FFFF7E',
  x: 250, y: 100,
  width: 200, height: 200
});
          .drawEllipse(({
  fillStyle: '#C6E2FF',
  x: 250, y: 150,
  width: 200, height: 100
});
          .drawArc({
            fillStyle: '#345678',
            x: 300,
            y: 150,
            radius: 100
        }); //end draw arc
    }); // end circle click  


    $('#clear').click(function(){
        $('#canvas1').clearCanvas();
    }); //end click-clear


    
    }); //end ready
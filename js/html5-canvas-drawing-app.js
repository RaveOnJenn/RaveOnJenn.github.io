$(document).ready(function(){
	$('#image').change(function(){
		if($('#image').val() == 'rat1') {
			$('#canvas1').drawImage({
				source: 'img/RatTerrier.png',
				x: 365,
				y: 260
			});
		} else ($('#image').val() == 'rat2') {
			$('#canvas1').drawImage({
				source: 'img/RatTerrier2.png',
				x: 365,
				y: 260
			
		
			});
		} //end if
	}); //end change

	$('#create').click(function(){
		$('#canvas1').drawText({
			fillStyle: '#fff',
			strokeStyle: '#000',
			strokeWidth: 3,
			x: 365,
			y: 50,
			fontSize: '5em',
			fontFamily: 'Impact, sans-serif',
			text: 'Hello.'
		})
		.drawText({
			fillStyle: '#fff',
			strokeStyle: '#000',
			strokeWidth: 3,
			x: 365,
			y: 470,
			fontSize: '5em',
			fontFamily: 'Impact, sans-serif',
			text: 'This is line 2.'
		}); //end draw text

	}); //end click


}); //end ready



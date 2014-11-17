

$(document).ready(function(){
	$('#image').change(function(){
		if($('#image').val() == 'rat1') {
			$('#canvas1').drawImage({
				source: 'img/RatTerrier.png',
				
			});
		} else if($('#image').val() == 'rat2') {
			$('#canvas1').drawImage({
				source: 'img/RatTerrier2.png',
				x: 365,
				y: 260
			
		
			});
			} else  {
			$('#canvas1').drawImage({
				source: '',
				x: 365,
				y: 260
			});
		} //end if
	}); //end change
	}); //end ready
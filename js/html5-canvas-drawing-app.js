//adding image feature
$(document).ready(function(){
	$('#image').change(function(){
		if($('#image').val() == 'rat1') {
			$('#canvas1').drawImage({
				source: 'img/RatTerrier.png',
				x: 365,
				y: 260
			});
		} else if($('#image').val() == 'rat2') {
			$('#canvas1').drawImage({
				source: 'img/RatTerrier2.png',
				x: 365,
				y: 260
			});
		} else if($('#image').val() == 'clear') {
			$('#canvas1').drawImage({
				source: '',
				x: 365,
				y: 260
			});
		
			});
		} //end if

		}); //end ready
$(document).ready(function(){
	$('#create').click(function(){
		var imgsrc = $('#image').val();
		switch(imgsrc){
			case 'rat1':
				imgsrc = "img/RatTerrier.png";
				break;
			case 'rat2':
				imgsrc = "img/RatTerrier2.png";
				break;
			
			default: 
				imgsrc = "img/RatTerrier.png";
		} //end switch

		}); //end ready
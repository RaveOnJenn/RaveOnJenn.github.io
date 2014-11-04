$(document).ready(function(){
	$('#searchengine').change(function(){
		if ($('#searchengine').val() == 'Big Rat Terrier') 
		{
				$('.search-group .help-block').text('Bigger is better!');

			} 
			else if ($('#searchengine').val() == 'Medium Rat Terrier') 
			{
				$('.search-group .help-block').text('Ah just right!');
			
			} 
			else if ($('#searchengine').val() == 'Small Rat Terrier') 
			{
				$('.search-group .help-block').text('Small is still a handful!');
			} 
			else
			{
				$('.search-group .help-block').text('There are no other choices.');
			}
});


	
	$('#name').focusout(function(){
		if($('#name').val().length == 0) {
			$('.name-group .help-block').text('Please enter your name.');
			$('.name-group').attr({
				class: 'col-sm-6 form-group name-group has-error'
			}); // end attr
		} else {
			$('.name-group .help-block').text('');
			$('.name-group').attr({
				class: 'col-sm-6 form-group name-group'
			}); //end attr
		}
	}); //end focus out

	$('button').click(function(submit){
		if($('#name').val().length == 0) {
			$('.name-group .help-block').text('Please enter your name.');
			$('.name-group').attr({
				class: 'col-sm-6 form-group name-group has-error'
			}); // end attr
			submit.preventDefault();
		} else {
			$('#myModal').modal();
			submit.preventDefault();
		}
	}); //end click

 


   



}); //end ready



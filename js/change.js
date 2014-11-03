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
	}); 
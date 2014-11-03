$(document).ready(function(){
	$('#searchengine').change(function(){
		if ($('#searchengine').val() == "Big Rat Terriers") {
				$('.search-group .help-block').text('Bigger is better!');
			} else if ($('#searchengine').val() == "Any Rescue!") 
			{
				$('.search-group .help-block').text('Hurray you have a good heart!');
			else if ($('#searchengine').val() == "Medium Rat Terriers") 
			{
				$('.search-group .help-block').text('Medium is just right for us!');
			} else if ($('#searchengine').val() == "Small Rat Terriers") 
			{
				$('.search-group .help-block').text('Small is still a handful!');
			} 

	}); 
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
$(function() {
    var rules = ['q1-c']
    $('#submit').click(function() {
        $('#win,#fail').hide();
        if( $('input[name=q1]:checked').map(function(i,v) { return v.id; }).get().join(',') == rules[0] ) {
            $("#win").show();
         }
         else
        {   
            $("#fail").show();
        }
        
    });
});

 


   


$(document).ready(function(){
    console.log("Document loaded!");

$("fieldset").hide();

    

    $('.jumbotron').fadeOut(2000).fadeIn(400).css({
        color: "red"

      });
   

   
   $('footer').fadeOut(2000).fadeIn(3000).css({
        fontSize: "3px",
        
        color: "red"
      });
    

//add reset to quiz when it closes//

$( "#quiz").click(function() {

  $( "fieldset" ).toggle( "slow" );


  
});

$(document).ready(function () {

    (function ($) {

        $('#filter').keyup(function () {

            var rex = new RegExp($(this).val(), 'i');
            $('.searchable tr').hide();
            $('.searchable tr').filter(function () {
                return rex.test($(this).text());
            }).show();

        })

    }(jQuery));

});


}); //end ready



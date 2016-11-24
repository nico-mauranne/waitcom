$(document).ready(function() {
	$(".fancybox").fancybox({
		openEffect	: 'none',
		closeEffect	: 'none'
	});


	$('a[href^="#"]').click(function(){
		var the_id = $(this).attr("href");

		$('html, body').animate({
			scrollTop:$(the_id).offset().top
		}, 'slow');
		return false;
	});


	$('.navbar-collapse a').click(function(){
    	$(".navbar-collapse").collapse('hide');
	});


});

	




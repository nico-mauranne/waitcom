(function($){
	

	$.fn.backToTop = function(options){

		var defaultSettings = {
			pourcentage : 5,
			duree : 500,
			orientation : 'right'
		}

		var settings = $.extend(defaultSettings, options);

		//on va ajouter un div
		this.append('<div id="back_to_top"><i class="fa fa-caret-up" aria-hidden="true"></i></div>');
		$('#back_to_top').css(settings.orientation, '20px');

		//evt scroll
		$(window).scroll(function(){
				var hauteurDoc = $(document).height();
				var scrollPos = $(this).scrollTop();

				if((scrollPos / hauteurDoc) * 100 >= settings.pourcentage ){
					//on affiche le div back to top
					$('#back_to_top').fadeIn('slow');
				}else{
					//cache le div back to top
					$('#back_to_top').fadeOut('slow');
				}

		});

		//ajout d'un clic sur le div back to top
		$('#back_to_top').click(function(){
			$('html, body').animate({scrollTop: 0},settings.duree);
		});


		return this;
	};




}(jQuery));
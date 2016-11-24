(function($){



	$.fn.slider = function(options){

        var $bandeau;
        var $imgList;
        var largeur;
        var hauteur;
        var settings;
        var position;
        var timer;
        var me = this;

		var defaultSettings = {
			autoplay: true,
			autoplayDirection : 'right',
			controls: true,
			duration: 1000,
			displayTime: 2000,
			caption: false
		};

		settings = $.extend(defaultSettings, options);

		//recupere les images
		$imgList = this.find('img'); //on recupere les img enfants

		//si pas d'image, on arrete
		if($imgList.length==0){
			return this;
		}

		//on calcule la hauteur et la largeur de la 1ere image
		largeur = $imgList.first().width();
		hauteur = $imgList.first().height();

		//console.log(largeur + ' ' + hauteur);
		
		//console.log($imgList[0]); => renvoit un elt du DOM
		//console.log($imgList.first()); => renvoit un obj jQuery

		//on modifie this
		this.addClass('slider_container');
		this.width(largeur);
		this.height(hauteur);

		//on vide le slider_container et on ajoute un div bandeau
		this.html('<div class="slider_bandeau"></div>');
		$bandeau = this.find('.slider_bandeau');
		$bandeau.width(3 * largeur);
		$bandeau.height(hauteur);
		$bandeau.css('left', '-' + largeur + 'px');


		
		//si autoplay setInterval
		if(settings.autoplay){
			startTimer();
		}

		//affichage de controls si besoin
		if(settings.controls){
			this.append('<div class="prev_btn"></div>');
			this.append('<div class="next_btn"></div>');
		}

		//on affiche ou cache les controls au survol
		this.mouseenter(function(){
			//this => fait reference à la fonction
			//$(this) => fait reference à l'elt qui declenche le hover
			$(this).find('.prev_btn').show('fast');
			$(this).find('.next_btn').show('fast');
			clearInterval(timer);
		}).mouseleave(function(){
			$(this).find('.prev_btn').hide('fast');
			$(this).find('.next_btn').hide('fast');
			startTimer();
		});

		//event delegation
		this.on('click', '.prev_btn', function(){
			slideToRight();
		});

		this.on('click', '.next_btn', function(){
			slideToLeft();
		});

        if (settings.caption){
            this.append('<div class="slider_caption"></div>')
        }

//position à 0 et buildBandeau
        position =0;
        buildBandeau(position);

        //fonction qui construit le bandeau en fonction de la position
        function buildBandeau(pos){

            var next;
            var prev;

            if(pos==0){
                next = 1;
                prev = $imgList.length -1;
            }else if (pos == $imgList.length -1){
                next = 0;
                prev = pos - 1;
            }else{
                next = pos + 1;
                prev = pos - 1;
            }

            $bandeau.html('');
            $bandeau.css('left', '-' + largeur + 'px');
            $bandeau.append($imgList.eq(prev)); //eq => equal, permet de recuperer l'element numero tant
            $bandeau.append($imgList.eq(pos));
            $bandeau.append($imgList.eq(next));

            if ($imgList.eq(pos).attr('title')!='' && $imgList.eq(pos).attr('title')!= null ){
                me.find('.slider_caption').html($imgList.eq(pos).attr('title'));
                me.find('.slider_caption').show('fast');
            }else{
                me.find('.slider_caption').hide('fast');
            }
        }

        function slideToLeft(){

            position++;
            if(position==$imgList.length){
                position = 0;
            }

            $bandeau.animate({'left':'-='+largeur},
                settings.duration,
                function(){
                    buildBandeau(position);
                });
        }

        function slideToRight(){

            position--;
            if(position==-1){
                position = $imgList.length -1 ;
            }

            $bandeau.animate({'left':'+='+largeur},
                settings.duration,
                function(){
                    buildBandeau(position);
                });
        }

        function startTimer(){
            timer = setInterval(function(){
                if(settings.autoplayDirection == 'right'){
                    slideToRight();
                }else{
                    slideToLeft();
                }

            },settings.displayTime);
        }




		return this;
	};



}(jQuery));
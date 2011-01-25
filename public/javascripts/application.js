$(document).ready(function(ev){
   
   w =  document.body.clientWidth; /* IE only */
           if(w)
           {
              $('.panel').width(w);
           }else {
              $('.panel').width(document.width);
           }
   $('#coda-slider-1').codaSlider({
         dynamicArrowLeftText: "",
         dynamicArrowRightText: ""});

   
   if ($.browser.msie) {
            var zIndexNumber = 20;  
            $('div.panel').each(function() {  
              $(this).css('zIndex', zIndexNumber);  
              zIndexNumber -= 10;  
           });
           $('div#back_left').css('zIndex', zIndexNumber);  
           $('div#back_right').css('zIndex', zIndexNumber);  
      }      
   
  h =  document.body.clientHeight; /* IE only */
  
  
  var margin_top = 0;

  if(h)
    {
       margin_top = h / 2;
       $('.coda-slider').css('margin-top',100);
    }else {
       margin_top = document.height / 2; 
       $('.coda-slider').css('margin-top',100);
    }
    
  // Para las galerías de imágenes
  Galleria.loadTheme('/javascripts/galleria.classic.js');
  
  // Initialize Galleria
  $('div#gallery').galleria({thumbnails:'empty', preload:2,autoplay:5000,transition:'fade',show_counter:'false',max_scale_ratio:'1'});
  
  
  // To simulate hover in back (showing other styles) but not really...
  $('div#front_left').hover(function(ev){
		$('div#back_left').show();
	},
	function(ev){
		$('div#back_left').hide();
	});
   
   $('div#front_right').hover(function(ev){
		$('div#back_right').show();
   	},
   	function(ev){
         $('div#back_right').hide();
   	});

   $('.coda-nav-left a').hover(function(ev){
		$('div#back_left').show();
   	},
   	function(ev){
         $('div#back_left').hide();
   	});

   $('.coda-nav-right a').hover(function(ev){
		$('div#back_right').show();
   	},
   	function(ev){
         $('div#back_right').hide();
   	});	
   	
      window.onresize = function(event) {
          w =  document.body.clientWidth; /* IE only */
         if(w)
         {
            $('.panel').width(w);
         }else {
            $('.panel').width(document.width);
         }
               
         var panelContainerWidth = w*6;
         $(".panel-container").width(panelContainerWidth);
         var currentPanel = $('ul#menu').find('a.current').attr('id');
         var offset = - (w*(currentPanel - 1));
         
         $('.panel-container').css({ marginLeft: offset });
      }     

});

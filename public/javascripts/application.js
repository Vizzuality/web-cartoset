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
   
  setMarginTop();
    
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
          h =  document.body.clientHeight; /* IE only */
          
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
         setMarginTop();
      }     

});

function setMarginTop(){
   var documentHeightCenter; 

   if (self.innerHeight) {

      documentHeightCenter = self.innerHeight / 2;

   // Explorer 6 Strict Mode
   } else if (document.documentElement
   && document.documentElement.clientHeight) {
      documentHeightCenter = document.documentElement.clientHeight / 2;

   // other Explorers
   } else if (document.body) {
      documentHeightCenter = document.body.clientHeight / 2;
   }
   
   
   var margin_top = documentHeightCenter - 200;
   if (margin_top < 150) margin_top = 150;
   
   // console.log(parseInt(margin_top) - 50);
   
   $('div#home_index').parent().css('margin-top',margin_top+20);   
   
   $('div#slide_home').parent().css('margin-top',parseInt(margin_top)-20);            
   $('div#slide_features').parent().css('margin-top',parseInt(margin_top) - 80);            
   $('div#slide_examples').parent().css('margin-top',parseInt(margin_top) - 120);
   $('div#slide_download').parent().css('margin-top',parseInt(margin_top)+20);   
   $('div#slide_contact_us').parent().css('margin-top',parseInt(margin_top));      
   
   

   
   
}

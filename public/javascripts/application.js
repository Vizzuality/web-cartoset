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
         dynamicArrowRightText: ""  });
   
   // $('ul#menu').css('display','none');

   h =  document.body.clientHeight; /* IE only */

  var margin_top = 0;

  if(h)
  {
     margin_top = h / 2;
     $('.coda-slider').css('margin-top',margin_top+20);
  }else {
     margin_top = document.height / 2; 
     $('.coda-slider').css('margin-top',margin_top+20);
  }
  
  $('#coda-nav-left-1').css('display','none');
   
});

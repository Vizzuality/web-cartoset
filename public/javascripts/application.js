$(document).ready(function(ev){

   
   h =  document.body.clientWidth; /* IE only */
           if(h)
           {
              $('.panel').width(h);
           }else {
              $('.panel').width(document.width);
           }
           
   
   
   $('#coda-slider-1').codaSlider({
         dynamicArrowLeftText: "",
         dynamicArrowRightText: ""   
   });
});

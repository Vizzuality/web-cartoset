/*
	jQuery Coda-Slider v2.0 - http://www.ndoherty.biz/coda-slider
	Copyright (c) 2009 Niall Doherty
	This plugin available for use in all personal or commercial projects under both MIT and GPL licenses.
*/


$(function(){
	// Remove the coda-slider-no-js class from the body
	$("body").removeClass("coda-slider-no-js");
	// Preloader
	$(".coda-slider").children('.panel').hide().end().prepend('<p class="loading">Loading...<br /><img src="images/ajax-loader.gif" alt="loading..." /></p>');
	
});

var sliderCount = 1;

$.fn.codaSlider = function(settings) {

	settings = $.extend({
		autoHeight: false,
		autoHeightEaseDuration: 1000,
		autoHeightEaseFunction: "easeInOutExpo",
		autoSlide: false,
		autoSlideInterval: 7000,
		autoSlideStopWhenClicked: true,
		crossLinking: true,
		dynamicArrows: true,
		dynamicArrowLeftText: "&#171; left",
		dynamicArrowRightText: "right &#187;",
		dynamicTabs: true,
		dynamicTabsAlign: "left",
		dynamicTabsPosition: "top",
		externalTriggerSelector: "a.xtrig",
		firstPanelToLoad: 1,
		panelTitleSelector: "h5.title",
		slideEaseDuration: 1000,
		slideEaseFunction: "easeInOutExpo"
	}, settings);
	
	return this.each(function(){
		
		// Uncomment the line below to test your preloader
		// alert("Testing preloader");
		
		var slider = $(this);
		
		// If we need arrows
		if (settings.dynamicArrows) {
			slider.parent().addClass("arrows");
			slider.before('<div class="coda-nav-left" id="coda-nav-left-' + sliderCount + '"><a>' + settings.dynamicArrowLeftText + '</a></div>');
			slider.after('<div class="coda-nav-right" id="coda-nav-right-' + sliderCount + '"><a>' + settings.dynamicArrowRightText + '</a></div>');
		};
		
		var panelWidth = slider.find(".panel").width();
		var panelCount = slider.find(".panel").size();
		var panelContainerWidth = panelWidth*panelCount;
		var navClicks = 0; // Used if autoSlideStopWhenClicked = true
		// Surround the collection of panel divs with a container div (wide enough for all panels to be lined up end-to-end)
		$('.panel', slider).wrapAll('<div class="panel-container"></div>');
		// Specify the width of the container div (wide enough for all panels to be lined up end-to-end)
		$(".panel-container", slider).css({ width: panelContainerWidth });
		
		
		// If we need a dynamic menu
		if (settings.dynamicTabs) {
			var dynamicTabs = '<div class="coda-nav" id="coda-nav-' + sliderCount + '"><ul id="menu"></ul></div>';
			switch (settings.dynamicTabsPosition) {
				case "bottom":
					slider.parent().append(dynamicTabs);
					break;
				default:
					$('div#layout').append(dynamicTabs);
					break;
			};
			ul = $('#coda-nav-' + sliderCount + ' ul');
			// Create the nav items
			$('.panel', slider).each(function(n) {
            // ul.append('<li class="tab' + (n+1) + '"><a href="#' + (n+1) + '">' + $(this).find(settings.panelTitleSelector).text() + '</a></li>');                                   
            ul.append('<li class="tab' + (n+1) + '"><a id="'+ (n+1) +'" class="'+ $(this).find(settings.panelTitleSelector).text().toLowerCase().replace(" ", "_") +'" href="#' + $(this).find(settings.panelTitleSelector).text().toLowerCase().replace(" ", "_")  + '">' + $(this).find(settings.panelTitleSelector).text() + '</a></li>');                                              
			});
         // navContainerWidth = slider.width() + slider.siblings('.coda-nav-left').width() + slider.siblings('.coda-nav-right').width();
         // ul.parent().css({ width: navContainerWidth });
			switch (settings.dynamicTabsAlign) {
				case "center":
					ul.css({ width: ($("li", ul).width() + 15) * panelCount });
					break;
				case "right":
					ul.css({ float: 'left' });
					break;
			};
		};
		
		
		// Specify the current panel.
		// If the loaded URL has a hash (cross-linking), we're going to use that hash to give the slider a specific starting position...
		if (settings.crossLinking && window.location.hash && parseInt(returnSlideID(window.location.hash.slice(1),$('ul#menu'))) <= panelCount) {
			var currentPanel = returnSlideID(window.location.hash.slice(1),$('ul#menu'));
		   var offset = - (panelWidth*(parseInt(currentPanel) - 1));
			$('.panel-container', slider).css({ marginLeft: offset });
		// If that's not the case, check to see if we're supposed to load a panel other than Panel 1 initially...
		} else if (settings.firstPanelToLoad != 1 && settings.firstPanelToLoad <= panelCount) { 
			var currentPanel = settings.firstPanelToLoad;
			var offset = - (panelWidth*(parseInt(currentPanel) - 1));
			$('.panel-container', slider).css({ marginLeft: offset });
		// Otherwise, we'll just set the current panel to 1...
		} else { 
			var currentPanel = 1;
	      setArrowStyles(currentPanel,panelCount);
		};
      // setArrowStyles(currentPanel,panelCount);
		
		// Left arrow click
		$("#coda-nav-left-" + sliderCount + " a").click(function(){
		   panelWidth = slider.find(".panel").width();
   		panelCount = slider.find(".panel").size();
   		panelContainerWidth = panelWidth*panelCount;
   		
			navClicks++;
			if (currentPanel == 1) {
				offset = - (panelWidth*(panelCount - 1));
				alterPanelHeight(panelCount - 1);
				currentPanel = panelCount;
            $('ul#menu').find('a.current').removeClass('current');
            $('ul#menu').find('a#'+	currentPanel).addClass('current');
			} else {
			   currentPanel = parseInt(currentPanel) - 1;
				alterPanelHeight(parseInt(currentPanel) - 1);
				offset = - (panelWidth*(parseInt(currentPanel) - 1));
            $('ul#menu').find('a.current').removeClass('current');
            $('ul#menu').find('a#'+	currentPanel).addClass('current');            				
			};
			$('.panel-container', slider).animate({ marginLeft: offset }, settings.slideEaseDuration, settings.slideEaseFunction);

			if (settings.crossLinking) { window.location.hash = returnSlideName (currentPanel, $('ul#menu')) }; // Change the URL hash (cross-linking)
         setArrowStyles(currentPanel,panelCount);           
			return false;
		});
		
		$('div#front_left').click(function(ev){
         panelWidth = slider.find(".panel").width();
   		panelCount = slider.find(".panel").size();
   		panelContainerWidth = panelWidth*panelCount;
   		
			navClicks++;
			if (currentPanel == 1) {
				offset = - (panelWidth*(panelCount - 1));
				alterPanelHeight(panelCount - 1);
				currentPanel = panelCount;
            $('ul#menu').find('a.current').removeClass('current');
            $('ul#menu').find('a#'+	currentPanel).addClass('current');
			} else {
			   currentPanel = parseInt(currentPanel) - 1;
				alterPanelHeight(parseInt(currentPanel) - 1);
				offset = - (panelWidth*(parseInt(currentPanel) - 1));
            $('ul#menu').find('a.current').removeClass('current');
            $('ul#menu').find('a#'+	currentPanel).addClass('current');            				
			};
			$('.panel-container', slider).animate({ marginLeft: offset }, settings.slideEaseDuration, settings.slideEaseFunction);

			if (settings.crossLinking) { window.location.hash = returnSlideName (currentPanel, $('ul#menu')) }; // Change the URL hash (cross-linking)
         setArrowStyles(currentPanel,panelCount);           
			return false;
      });
      $('div#front_right').click(function(ev){
         panelWidth = slider.find(".panel").width();
     		panelCount = slider.find(".panel").size();
     		panelContainerWidth = panelWidth*panelCount;

  			navClicks++;
  			if (currentPanel == panelCount) {
  				offset = 0;
  				currentPanel = 1;
  				alterPanelHeight(0);
              $('ul#menu').find('a.current').removeClass('current');
              $('ul#menu').find('a#'+	currentPanel).addClass('current');            				
  			} else {
  				offset = - (panelWidth*currentPanel);
  				alterPanelHeight(currentPanel);
  				currentPanel = parseInt(currentPanel) + 1;
              $('ul#menu').find('a.current').removeClass('current');
              $('ul#menu').find('a#'+	currentPanel).addClass('current');            				
  			};
  			$('.panel-container', slider).animate({ marginLeft: offset }, settings.slideEaseDuration, settings.slideEaseFunction);
  			if (settings.crossLinking) { window.location.hash = returnSlideName (currentPanel, $('ul#menu')) }; // Change the URL hash (cross-linking)
           setArrowStyles(currentPanel,panelCount);
  			return false;   
      });
      
			
		// Right arrow click
		$('#coda-nav-right-' + sliderCount + ' a').click(function(){
		   panelWidth = slider.find(".panel").width();
   		panelCount = slider.find(".panel").size();
   		panelContainerWidth = panelWidth*panelCount;
		   
			navClicks++;
			if (currentPanel == panelCount) {
				offset = 0;
				currentPanel = 1;
				alterPanelHeight(0);
            $('ul#menu').find('a.current').removeClass('current');
            $('ul#menu').find('a#'+	currentPanel).addClass('current');            				
			} else {
				offset = - (panelWidth*currentPanel);
				alterPanelHeight(currentPanel);
				currentPanel = parseInt(currentPanel) + 1;
            $('ul#menu').find('a.current').removeClass('current');
            $('ul#menu').find('a#'+	currentPanel).addClass('current');            				
			};
			$('.panel-container', slider).animate({ marginLeft: offset }, settings.slideEaseDuration, settings.slideEaseFunction);
			if (settings.crossLinking) { window.location.hash = returnSlideName (currentPanel, $('ul#menu')) }; // Change the URL hash (cross-linking)
         setArrowStyles(currentPanel,panelCount);
			return false;
		});
			
		// If we need a tabbed nav
		$('#coda-nav-' + sliderCount + ' a').each(function(z) {
		   
			// What happens when a nav link is clicked
			$(this).bind("click", function() {
			   panelWidth = slider.find(".panel").width();
      		panelCount = slider.find(".panel").size();
      		panelContainerWidth = panelWidth*panelCount;
      		
				navClicks++;
				$(this).addClass('current').parents('ul').find('a').not($(this)).removeClass('current');
				offset = - (panelWidth*z);
				alterPanelHeight(z);
				currentPanel = z + 1;
				setArrowStyles(currentPanel,panelCount);
				$('.panel-container', slider).animate({ marginLeft: offset }, settings.slideEaseDuration, settings.slideEaseFunction);
				if (!settings.crossLinking) { return false }; // Don't change the URL hash unless cross-linking is specified
			});
		});
		
		// If is a own created link
		$('a.own_link').bind("click", function() {
		   panelWidth = slider.find(".panel").width();
   		panelCount = slider.find(".panel").size();
   		panelContainerWidth = panelWidth*panelCount;
		   
			var href = $(this).attr('href');
         href = href.substring(1,href.length);
			navClicks++;
			var z;
			switch (href) {
				case "cartoset":
					z = 1;
					break;
				case "features":
					z = 2;
					break;
				case "examples":
					z = 3;
					break;
				case "download":
					z = 4;
					break;
   			case "contact_us":
   				z = 5;
   				break;
				default:
					z = 1;
					break;
			};
			$('#menu').find('a.current').removeClass('current');
			$('#menu').find('a.'+href).addClass('current');
			
			// $(this).addClass('current').parents('ul').find('a').not($(this)).removeClass('current');
			offset = - (panelWidth*z);
			alterPanelHeight(z);
			currentPanel = z + 1;
			setArrowStyles(currentPanel,panelCount);
			$('.panel-container', slider).animate({ marginLeft: offset }, settings.slideEaseDuration, settings.slideEaseFunction);
		});

		
		// External triggers (anywhere on the page)
		$(settings.externalTriggerSelector).each(function() {
			// Make sure this only affects the targeted slider
			if (sliderCount == parseInt($(this).attr("rel").slice(12))) {
				$(this).bind("click", function() {
					navClicks++;
					targetPanel = parseInt($(this).attr("class").slice(1));
					offset = - (panelWidth*(targetPanel - 1));
					alterPanelHeight(targetPanel - 1);
					currentPanel = targetPanel;
					
               setArrowStyles(currentPanel,panelCount);
               
					// Switch the current tab:
					slider.siblings('.coda-nav').find('a').removeClass('current').parents('ul').find('li:eq(' + (targetPanel - 1) + ') a').addClass('current');
					// Slide
					$('.panel-container', slider).animate({ marginLeft: offset }, settings.slideEaseDuration, settings.slideEaseFunction);
					if (!settings.crossLinking) { return false }; // Don't change the URL hash unless cross-linking is specified
               
				});
			};
		});
			
		// Specify which tab is initially set to "current". Depends on if the loaded URL had a hash or not (cross-linking).
		if (settings.crossLinking && window.location.hash && parseInt(returnSlideID(window.location.hash.slice(1),$('ul#menu'))) <= panelCount) {
         setArrowStyles(currentPanel,panelCount);
			$("#coda-nav-" + sliderCount + " a:eq(" + (parseInt(returnSlideID(window.location.hash.slice(1),$('ul#menu'))) - 1) + ")").addClass("current");
			
		// If there's no cross-linking, check to see if we're supposed to load a panel other than Panel 1 initially...
		} else if (settings.firstPanelToLoad != 1 && settings.firstPanelToLoad <= panelCount) {
		   setArrowStyles(currentPanel,panelCount);
			$("#coda-nav-" + sliderCount + " a:eq(" + (settings.firstPanelToLoad - 1) + ")").addClass("current");
		// Otherwise we must be loading Panel 1, so make the first tab the current one.
		} else {
			$("#coda-nav-" + sliderCount + " a:eq(0)").addClass("current");
		};
		
		// Set the height of the first panel
		if (settings.autoHeight) {
			panelHeight = $('.panel:eq(' + (currentPanel - 1) + ')', slider).height();
			slider.css({ height: panelHeight });
		};
		
		// Trigger autoSlide
		if (settings.autoSlide) {
			slider.ready(function() {
				setTimeout(autoSlide,settings.autoSlideInterval);
			});
		};
		
		function alterPanelHeight(x) {
			if (settings.autoHeight) {
				panelHeight = $('.panel:eq(' + x + ')', slider).height()
				slider.animate({ height: panelHeight }, settings.autoHeightEaseDuration, settings.autoHeightEaseFunction);
			};
		};
		
		function autoSlide() {
			if (navClicks == 0 || !settings.autoSlideStopWhenClicked) {
				if (currentPanel == panelCount) {
					var offset = 0;
					currentPanel = 1;
				} else {
					var offset = - (panelWidth*currentPanel);
					currentPanel += 1;
				};
				// setArrowStyles(currentPanel,panelCount);
				alterPanelHeight(currentPanel - 1);
				// Switch the current tab:
				slider.siblings('.coda-nav').find('a').removeClass('current').parents('ul').find('li:eq(' + (currentPanel - 1) + ') a').addClass('current');
				// Slide:
				$('.panel-container', slider).animate({ marginLeft: offset }, settings.slideEaseDuration, settings.slideEaseFunction);
				setTimeout(autoSlide,settings.autoSlideInterval);
			};
		};
		
		// Kill the preloader
		$('.panel', slider).show().end().find("p.loading").remove();
		slider.removeClass("preload");
		
		sliderCount++;
		
	});
	
	// TO get the id value from hash location
	function returnSlideID (location, element) {
	   return element.children('li').find("a."+location).attr('id');
	}
	
	// Rreturn slide's name by id
	function returnSlideName (id, element) {
	   var href;
	   
	   var element = element.children('li');

	   if (element != undefined){
	      element = element.find("a#"+id);
	      
	      if (element != undefined){
	         href = element.attr('href');

	         href = href.replace("#", "");      
	      }
	   }
	   return href;
	}
	
	function setArrowStyles(currentPanel,panelCount){
      if (currentPanel == 1){
         $('#coda-nav-left-1').css('display','none');
         $('ul#menu').css('display','none');
         $('div#front_left').hide();
      }else{
         $('ul#menu').fadeIn();
         
         if (currentPanel == 2) {
            $('div#front_left').hide();
            $('div#front_right').show();
   	      $('#coda-nav-left-1').css('display','none');
   	      $('#coda-nav-right-1').css('display','inline');
   	   }else if (currentPanel == panelCount){
            $('div#front_left').show();
            $('div#front_right').hide();
            $('#coda-nav-left-1').css('display','inline');	      
   	      $('#coda-nav-right-1').css('display','none');
   	   }else {
   	      $('div#front_left').show();
            $('div#front_right').show();
   	      $('#coda-nav-left-1').css('display','inline');
   	      $('#coda-nav-right-1').css('display','inline');
   	   }
      }
	}
};

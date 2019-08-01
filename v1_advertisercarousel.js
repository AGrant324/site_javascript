YAHOO.namespace ("BBadvertisercorousel");


function initAdvertiserCarousel() {
	
  var carousel;
  var carousel = new YAHOO.widget.Carousel("advertisercarousel", {
                  animation: { speed: 0.5 }
  });

  carousel.addItem('<img src="../havanthockeyclub/domain_advertisers/vivomed.jpg">'); 
  carousel.addItem('<img src="../havanthockeyclub/domain_advertisers/bear.jpg">');    
  carousel.addItem('<img src="../havanthockeyclub/domain_advertisers/mercian.jpg""');    

  carousel.render(); 
  carousel.show();   
  
}

YAHOO.util.Event.addListener(window, "load", initAdvertiserCarousel);


YAHOO.namespace ("BBadvertisercorousel");

//global variables

function initAdvertiserCarousel() {
  myLogConfigs = {width: "500px", right: "10em", top: "10%", fontSize: "80%" };
  myLogContainer = null;
  // myLogReader = new YAHOO.widget.LogReader(myLogContainer, myLogConfigs);
  YAHOO.log("initAdvertiserCarousel","info");

  YAHOO.util.Event.onDOMReady(function (ev) {
      var carousel    = new YAHOO.widget.Carousel("advertisercarousel", {
                  animation: { speed: 0.5 }
          });
                  
      carousel.render(); // get ready for rendering the widget
      carousel.show();   // display the widget
  });
  
}




YAHOO.util.Event.addListener(window, "load", initAdvertiserCarousel);


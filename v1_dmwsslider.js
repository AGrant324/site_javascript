// ============ Slider =====================================																																												;	

  $( function() {
    $( ".complexityslider" ).slider({
      value:0,
      min: 0,
      max: 5,
      step: 1,
    });
 
    $( ".complexityslider" ).slider("pips", {
        rest: "label",
        labels: ["1.Little Impact","2","3","4","5","6.Major Impact"]
    });
    
    
  } );
        
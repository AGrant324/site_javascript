$(document).ready( function() { 

	closewarningrequired = "0";

	$(":checkbox").on("click", function(){
		closewarningrequired = "1";
		// alert("Checkbox Clicked");

	} );
	
	window.onbeforeunload = function(e) {
	   if (closewarningrequired == "1") {
		  return "Caution: Your squad planner updates will be lost - Do you wish to leave this page?";	       
	   } else {
	      return;
	   }
	};
	
	$('#SubmitButton').click(function () {
		closewarningrequired = "0";
		// alert("SubmitButton");
	});
	
});





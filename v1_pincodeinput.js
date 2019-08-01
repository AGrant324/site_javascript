$(document).ready( function() {
  
	
	$('#pincode').pincodeInput();
	
	
	$('#pincode').pincodeInput({

		  // 4 input boxes = code of 4 digits long
		  inputs:4,        

		  // hide digits like password input             
		  hideDigits:true,   

		  // keyDown callback             
		  keydown : function(e){},

		  // callback on every input on change (keyup event)
		  change: function(input,value,inputnumber){    
		    //input = the input textbox DOM element
		    //value = the value entered by user (or removed)
		    //inputnumber = the position of the input box (in touch mode we only have 1 big input box, so always 1 is returned here)
		  },

		  // callback when all inputs are filled in (keyup event)
		  complete : function(value, e, errorElement){
		    // value = the entered code
		    // e = last keyup event
		    // errorElement = error span next to to this, fill with html 
		    // e.g. : $(errorElement).html("Code not correct");
		  }
		  
		});
    	
});
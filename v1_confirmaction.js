$(document).ready( function() { 

	// this routine confirms back to the user whether they want to take a significant action
	// the message is not issued if they have already selected a test option.
    $("form").submit(function(){
    	if ( $('#ConfirmActionTestBox' ).is(":checked") ) {}
    	else {
	    	if (confirm(  $( "#ConfirmActionText" ).val()  )) {
	    		$( "#ConfirmActionStatus" ).val("Yes");
	    	} else {
	    		// CHECK works only for one form per page
	    		$( "#ConfirmActionStatus" ).val("No");
	    		return false;
	    	}
    	}
    });

    /*
    
    $('#ConfirmActionSubmit').click(function() {
    	if ( $('#ConfirmActionTestBox' ).is(":checked") ) {}
    	else {
	    	if (confirm(  $( "#ConfirmActionText" ).val()  )) {
	    		$( "#ConfirmActionStatus" ).val("Yes");
	    	} else {
	    		// CHECK works only for one form per page
	    		$( "#ConfirmActionStatus" ).val("No");
	            $("form").submit(function(e){
	                e.preventDefault(e);
	            });
	    	}
    	}
    });    
    
    $(form).submit(function(){
        // do stuff before submit

         if( //test for  stuff not right){

              return false; // will halt submission
        }

  	})    
    
    */
    
    
    
    
});
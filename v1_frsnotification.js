$(document).ready( function() { 

	totalnotificationa = $('#totalnotificationlist').val().split(","); 
	selectednotificationa = $('#selectednotificationlist').val().split(","); 
	
	
    $('#tick_all').click(function () {
    	// alert('#tick_all');
    	$('#tick_all').prop('checked', false);
    	$('#tick_selected').prop('checked', false);	    	
    	$('#tick_none').prop('checked', false);	
    	
    	for (var pi in totalnotificationa) {
    		if (totalnotificationa[pi] !="") {
	    		$('#tobenotified_'+totalnotificationa[pi]).prop('checked', true);
    		}
    	}
	});

    $('#tick_selected').click(function () {
    	// alert('#tick_selected');
    	$('#tick_all').prop('checked', false);
    	$('#tick_selected').prop('checked', false);	    	
    	$('#tick_none').prop('checked', false);	
    	for (var pi in totalnotificationa) {
    		if (totalnotificationa[pi] !="") {   		
    			$('#tobenotified_'+totalnotificationa[pi]).prop('checked', false);
    		}
    	}
    	for (var pi in totalnotificationa) {
    		if (totalnotificationa[pi] !="") {
    			$('#tobenotified_'+selectednotificationa[pi]).prop('checked', true);
    		}
    	}    	
	});

    $('#tick_none').click(function () {
    	// alert('#tick_none');
    	$('#tick_all').prop('checked', false);
    	$('#tick_selected').prop('checked', false);	    	
    	$('#tick_none').prop('checked', false);	
    	
    	for (var pi in totalnotificationa) {
    		if (totalnotificationa[pi] !="") {
    			$('#tobenotified_'+totalnotificationa[pi]).prop('checked', false);	
    		}
    	}
    	
    	
	});	
	
	
	
	
	
    
});
    $(document).ready( function() {
    	
    	$('*[id*=jqtab_]:visible').each(function() {
    	    $(this).tabs();
    	    var pagewidth = $( '#maincontainer' ).width();
    	    $(this).css('width',pagewidth*.97);
    	});
    	
    });
    $(document).ready( function() {
    	
    	$('*[id*=exporttable_]').each(function() {
    	    $(this).DataTable( {
    	    	scrollY:        '50vh',
    	        scrollCollapse: true,
    	        paging:         false
    	    } );
    	});
    	
    });
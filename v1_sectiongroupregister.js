    $(document).ready( function() {
    	$('*[id*=sectiongroupregistertable_]').each(function() {
    	    $(this).DataTable( {
    			searching: 		false,
    	    	scrollY:        '50vh',
    	        scrollCollapse: true,
    	        paging:         false,
    	        fixedColumns: true	        
    	    } );
    	});
    	
    	
    	
    	
    	
    });
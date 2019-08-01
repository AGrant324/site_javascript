    $(document).ready( function() {
    	
    	dtid = "";
    	
    	$('*[id*=mygrouptable_]').each(function() {
    	    var thisid = $(this).attr('id');
    	    dtid = thisid;
    	    $(this).DataTable( {
    	    	scrollY:        '50vh',
    	        scrollCollapse: true,
    	        paging:         false
    	    } );
    	});    	
    
    	setTimeout( function(){  /// This is a workaround to force the datatable to realign headngs and data
	    	// alert(dtid);  CHECK for multiple reports on a page
	    	$("#"+dtid).DataTable().search( '' ).draw();	    	
    	}, 10 ); 
    
     });   
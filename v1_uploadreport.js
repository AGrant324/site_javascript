    $(document).ready( function() {
    	
    	
    	/// Currently this routine handles a simgle report per page (ie a single reportdiv )
    	
    	var dtid = "";
    	var reportwidth = "95%";
    	var reportalign = "left";
    	if( $('#reportwidth').length )  { reportwidth = $('#reportwidth').val(); }
    	if( $('#reportalign').length )  { reportalign = $('#reportalign').val(); }  // not active yet  	
    	// $("#reportdiv").css("width", reportwidth);
    	// $("#reportdiv").css("float", reportalign);
    
    	$('*[id*=reportdiv]').each(function() {
    	    $(this).css("width", reportwidth);
    		$(this).css("float", reportalign);	
    	});     	

    	$('*[id*=reporttable_]').each(function() {
    	    var thisid = $(this).attr('id');
    	    dtid = thisid;
    	    var idbits = thisid.split("_");
    	    var sortcolid = "#"+idbits[1]+"_sortcol";
    	    var sortseqid = "#"+idbits[1]+"_sortseq"; 
    	    var thissortcol = "0";
    	    if( $("#"+idbits[1]+"_sortcol").length )  { thissortcol = $("#"+idbits[1]+"_sortcol").val(); }
    	    var thissortseq = 'asc';
    	    if( $("#"+idbits[1]+"_sortseq").length )  { thissortseq = $("#"+idbits[1]+"_sortseq").val(); }
    	    // alert(thissortcol+" "+thissortseq);
    	    var colbits = thissortcol.split(",");
    	    var seqbits = thissortseq.split(","); 
    	    // [[col,seq],[col,seq]]
    	   
    	    if (colbits.length == 1 ) {
    	    	// alert(colbits[0]+" "+seqbits[0]);
    	    	$(this).DataTable( {   	    		
	    			order: [[colbits[0],seqbits[0]]],
	    	    	scrollY:        '80vh',
	    	    	scrollCollapse: true,
	    	    	scrollX: 		true,
	    	        scrollCollapse: true,
	    	        paging:         false
    	    	});    	    	
    	    }
    	    if (colbits.length == 2 ) {
    	    	// alert(colbits[0]+" "+seqbits[0]+"|"+colbits[1]+" "+seqbits[1]);
    	    	$(this).DataTable( {
	    			order: [[colbits[0],seqbits[0]],[colbits[1],seqbits[1]]],
	    	    	scrollY:        '80vh',
	    	    	scrollCollapse: true,
	    	    	scrollX: 		true,
	    	        scrollCollapse: true,
	    	        paging:         false
    	    	});    	    	
    	    }
    	    if (colbits.length == 3 ) {
    	    	// alert(colbits[0]+" "+seqbits[0]+"|"+colbits[1]+" "+seqbits[1]+"|"+colbits[2]+" "+seqbits[2]);
    	    	$(this).DataTable( {  	    		
	    			order: [[colbits[0],seqbits[0]],[colbits[1],seqbits[1]],[colbits[2],seqbits[2]]],
	    	    	scrollY:        '80vh',
	    	    	scrollCollapse: true,
	    	    	scrollX: 		true,
	    	        scrollCollapse: true,
	    	        paging:         false
    	    	});    	    	
    	    }
    		
		    setTimeout( function(){  /// This is a workaround to force the datatable to realign headngs and data
		    	// alert(dtid);  CHECK for multiple reports on a page
		    	$("#"+dtid).DataTable().search( '' ).draw();	    	
		    }, 10 ); 
		       		
    	});
    	
    	$('.dataTables_scrollBody').css('min-height', '100px'); // Workaround to avoid horix scoller obscuring small lists
    	$('.updatelink').on('click', function(event) {		   		
    		var thistext =  $(this).text();
    		$(this).text(thistext.toUpperCase());
    	});	
    	
    	$('.deletelink').on('click', function(event) {		   		
    		var thistext =  $(this).text();
    		$(this).text(thistext.toUpperCase());
    	});
    	

    	
    });
    

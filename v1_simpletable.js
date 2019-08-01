$(document).ready( function() {
	
	// $('#simpletabletable_GRLSquadlist_'+grlhometeamid).DataTable().columns.adjust(); 
	
	var dtid = "";
	var simpletablewidth = "100%";
	var simpletablealign = "left";

	$('*[id*=simpletablediv_]').each(function() {
	    // alert($(this).attr('id'));
	    $(this).css("width", simpletablewidth);
		$(this).css("float", simpletablealign);
	});     	

	$('*[id*=simpletabletable_]').each(function() {
            // alert($(this).attr('id'));
            var thisid = $(this).attr('id');
            $(this).DataTable( {
                    scrollY:        '70vh',
                    scrollCollapse: true,
                    scrollX: 		true,
                    paging:         false,
                    bFilter: false,
                    bSort: false,
                    bInfo : false,
                    // autoWidth: false,
                    responsive : true

            });

            // This is a workaround to force the datatable to realign headngs and data
	    setTimeout( function(){
	    	// alert(dtid);  CHECK for multiple reports on a page
	    	$("#"+thisid).DataTable().search( '' ).draw();	    	
	    }, 10 ); 
	}); 
    	
	// Workaround to avoid horix scoller obscuring small lists 
	$('.dataTables_scrollBody').css('min-height', '100px');  
	
	// Workaround to align headers when switching focus on tabs 
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            // searches by div because table wrapper added after datatable instantiated  
            $('*[id*=simpletablediv_]').each(function() {	
                var thisid = $(this).attr('id');
                var ida = thisid.split("_");
                var tableid = "simpletabletable_"+ida[1];
                // alert("tableid "+tableid);
                // $("#"+tableid).DataTable().search( '' ).draw();
                $("#"+tableid).DataTable().columns.adjust();
            });
	});	
});
    

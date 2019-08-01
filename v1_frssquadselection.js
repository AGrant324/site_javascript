$(document).ready( function() { 

	closewarningrequired = "0";
	
	// this is modified by personselectionpopup whenever an add or delete to the personlist is made
	$('#squadtable_modified').change(function () {
	    // alert('XXXXX - squadtable_modified');
		closewarningrequired = "1";
	});
	
	window.onbeforeunload = function(e) {
	   if (closewarningrequired == "1") {
		  return "Caution: Your availability updates will be lost - Do you wish to leave this page?";	       
	   } else {
	      return;
	   }
	};
	
	$('#SubmitButton').click(function () {
		closewarningrequired = "0";
	});
	
	
	$('#squadtable').DataTable( {
		// seems we have to specify all columns to make each one manually sortable !!
        order: [[ 2, "asc" ],[ 1, "asc" ],[ 3, "asc" ],[ 4, "asc" ],[ 5, "asc" ],[ 6, "asc" ],[ 7, "asc" ],[ 8, "asc" ],[ 9, "asc" ]],      
    	scrollY:        '50vh',
        scrollCollapse: true,
        paging:         false
    } );
	
	
	
});





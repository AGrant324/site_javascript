$(document).ready( function() {
	
$('#simpletablediv_GRLMatches').hide();	

$('#MatchKeyEnter').on('click', function(event) {
	var thismatchkey = $('#MatchKey').val();
	if (thismatchkey == "123456") {
		$('#simpletablediv_GRLMatches').show();
		$('#simpletabletable_GRLMatches').DataTable().columns.adjust();  
		$('#GRLMatchKeyDiv').hide();
	} else {
		$.alert({
			icon: 'fa fa-lock text-danger',
			title: "Warning",
		    content: "Sorry: This is an incorrect Match Key."
		});	
	}

});		

}); 	
	

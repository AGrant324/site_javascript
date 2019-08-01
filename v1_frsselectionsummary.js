$(document).ready( function() { 
	
	$("#informationpopup").dialog({
		autoOpen: false,
		width: "50%"
	});
	
	
	$( "#informationpopup" ).dialog("close");
	$( "#ShowButton" ).click(function() {
		// alert( "ShowButton clicked." );
		var season = $('#Season').val();
		var sectionname = $('#SectionName').val();			
		var selectiondate = $('#SelectionDate').val();			
		var selectionpersonid = $('#SelectionPersonId').val();			
	
		 var uri = JSSitePHPURL()+"/v1_personplayoffstatuspopupout.php";
	 
		 $.ajax({
		     url: uri,
		     data: { 
		    	 ServiceId: JSServiceId(),	        	
		    	 DomainId: JSDomainId(),
		    	 ModeId: JSModeId(),	        	
		    	 PersonId: JSPersonId(),	
		    	 SessionId: JSSessionId(),		        	
		    	 LoginModeId: JSLoginModeId(),
		    	 MenuId: JSMenuId(), 
		    	 Season: season,		    	 
		    	 SectionName: sectionname,		    	 
		    	 SelectionDate: selectiondate,
		    	 SelectionPersonId: selectionpersonid		    	 
		    	 
		     },
		     type: "GET",
		     dataType: "text",
		     timeout: 10000,
		     success: Success,	        
		     error: Error
		 });
	});
	
	$( "#informationclosebutton" ).click(function() {
		$( "#informationpopup" ).dialog("close");
	});
    
});
	
 // Define a function to handle the response data.
 function Success(data, status) {
    // alert(data);
    $('#informationcontainer').html(data);
    $( "#informationpopup" ).dialog("open");  
 }
 
 function Error(xhr, reason, ex) {
 	// messageAlert("Error Reason="+xhr+reason+ex+"<br>url: "+uri+"?Difficulty="+difficultystring+"&LatestPuzzle="+lateststring+"&SpecificPuzzle="+specificstring);
 	messageAlert("You are not connected to the internet at this time");
 } 	
	
	
	
	
	
	
	
	
	
	
	

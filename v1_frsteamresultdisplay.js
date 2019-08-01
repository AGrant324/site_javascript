$(document).ready( function() { 
	
	var team_videostreamvisibility = $("#team_videostreamvisibility").val();
	
	if ( team_videostreamvisibility == "Members" ) {		
		if ($.cookie('MemberLevel0')) {} else {
			$("#frs_videostreamcommentary").text("Members: Login and then return to this page to view video stream");
			$("#playerElement").hide();
		}				
	}	
    
});
$(document).ready( function() { 
	
	closewarningrequired = "0";	
	
	if ($("#frs_cancellation").is(':checked')) { 
		$("#SelectionAlert").html('<span style="color:red">Match Cancelled</span>');
		$("#SelectionAlert").show();
		$("#SubmitButton").val('Confirm Cancellation');
	} else {
		$("#SelectionAlert").html('');
		$("#SelectionAlert").hide();
		$("#SubmitButton").val('Update Match Arrangements and Selection');
	}
	smsha = $("#SMSHA").val();			
	if (smsha == "H") {	
		$( "#frs_venue" ).change(function() {
			closewarningrequired = "1";
			updateSMSMessage();
		});
	}
	if (smsha == "A") {	
		$('#frs_awayvenue').on('keyup', function(e) {
			closewarningrequired = "1";			
			updateSMSMessage();
		});
	}	
	$('#frs_time').on('keyup', function(e) {
		closewarningrequired = "1";		
		updateSMSMessage();
	});	
	$('#frs_meet').on('keyup', function(e) {
		closewarningrequired = "1";		
		updateSMSMessage();
	});
	$('#frs_meettotravel').change(function() {	
		closewarningrequired = "1";		
		updateSMSMessage();
	});	
	$('#frs_cancellation').change(function() {
		if ($("#frs_cancellation").is(':checked')) { 
			$("#SelectionAlert").html('<span style="color:red">Match Cancelled</span>');
			$("#SelectionAlert").show();
			$("#SubmitButton").val('Confirm Cancellation');
		} else {
			$("#SelectionAlert").html('');
			$("#SelectionAlert").hide();
			$("#SubmitButton").val('Update Match Arrangements and Selection');
		}		
		closewarningrequired = "1";		
		updateSMSMessage();
	});	
	
	$("input[type='checkbox']").change(function() {
		closewarningrequired = "1";		
	    // alert("checkbox changed");
	});
	
	window.onbeforeunload = function(e) { 
	   if (closewarningrequired == "1") {
		  return "Caution: Your selection updates will be lost - Do you wish to leave this page?";	       
	   } else {
	      return;
	   }
	};
		
	$('#SubmitButton').click(function () {
		// alert('SubmitButton');
		closewarningrequired = "0";
	});
	
	function updateSMSMessage(  ) {
		smsalert = "";
		if ($("#frs_cancellation").is(':checked')) { smsalert = "MATCH CANCELLED - "; }
		smstitle = $("#SMSTitle").val();
		smsha = $("#SMSHA").val();			
		if (smsha == "H") {	smsvenuename = $("#frs_venue :selected").text(); }
		if (smsha == "A") {	smsvenuename = $("#frs_awayvenue").val();}	
		smstime = $("#frs_time").val();
		smsmeet = $("#frs_meet").val();
		if ($("#frs_meettotravel").is(':checked')) { smsreply = " - Reply Y (Meet), D (Direct) or N"; }
		else { smsreply = " - Reply Y or N"; }
		smsmessage = smsalert+smstitle+" ";
		smsmessage = smsmessage+smsvenuename+" ";
		if ($("#frs_cancellation").is(':checked')) {}
		else {
			smsmessage = smsmessage+smstime+" Start ";
			smsmessage = smsmessage+smsmeet;
			smsmessage = smsmessage+smsreply;
		}
		textremoved = "0";
		extra = 0;
		origmessagelength = smsmessage.length;
		if (origmessagelength > 155) {
			textremoved = "1";
			extra = smsmessage.length - 155;
			lengthmeet = smsmeet.length - extra;
			frontmeet = smsmeet.substring(0, lengthmeet);
			backmeet = smsmeet.substring(lengthmeet,origmessagelength);
			smsmessage = smstitle+" ";
			smsmessage = smsmessage+smsvenuename+" ";
			smsmessage = smsmessage+smstime+" Start ";
			if ($("#frs_cancellation").is(':checked')) {}
			else {
				smsmessage = smsmessage+frontmeet+'<span style="color:red">'+backmeet+'</span>';
				smsmessage = smsmessage+smsreply;
			}
		}
		reducedmessagelength = origmessagelength - extra;
		$("#smsview").html(smsmessage);
		smscountmessage = "";
		if ( textremoved == "1" ) { 
			smscountmessage ='<span style="color:red">Text message exceeds max 155. If you take no action, size will be reduced from '+origmessagelength+' to '+reducedmessagelength+' by removing red characters</span>';
			smscountmessage = smscountmessage+'<br>';
			if (smsha == "A") {
				smscountmessage = smscountmessage+'<span style="color:red">Suggest you shorten Meeting Arrangements or Away Venue to fit.</span>';
			} else {
				smscountmessage = smscountmessage+'<span style="color:red">Suggest you shorten Meeting Arrangements to fit.</span>';
			}		
		} else {
			smscountmessage ='<span style="color:green">Text message '+origmessagelength+' characters. (Max is 155).</span>';
		}
		$("#smscount").html(smscountmessage);
	}
	
    
});
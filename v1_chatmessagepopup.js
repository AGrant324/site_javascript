

$(document).ready( function() {
	var remote = ""; // loggedin or remote
	var chatviewerpersonid = ""; // person viewing this chat		
	var thischatmessage_threadset = ""; // appropriate tab should already be open	
	var thischatmessage_threadid = ""; // open this accordion group up if not ""
	var thischatmessage_threadtitle = "";
	var opencontentid = "";	
	
	remote = $("#remote").val();  
	chatviewerpersonid = $("#chatviewerpersonid").val();
	target_threadset = $("#target_threadset").val();
	target_threadid = $("#target_threadid").val();
	
	// alert("|"+remote+"|"+chatviewerpersonid+"|"+target_threadset+"|"+target_threadid+"|");	
	
	$("#chatmessagepopup").dialog({
		autoOpen: false,
		width: "50%"
	});
	$(".headingdivleft").css("float", "left");
	$(".headingdivright").css("float", "right");
	$('.contentdivleft').css({
		  'float' : 'left',
		  'vertical-align'  : 'top'
	});	
	$('.contentdivright').css({
		  'float' : 'left',
		  'width' : '80%',
		  'vertical-align'  : 'top',
		  'margin-left' : '15px'
	});
	$('.chatbutton').css({
		  'background-color' : '#e6f2ff',
		  'padding' : '10px',
		  'display' : 'none'
	});
	$('.chatbuttonnew').css({
		  'background-color' : '#e6f2ff',
		  'padding' : '10px',
	});
	
	$('.collapse').collapse();  // collapse all accordion groups to start with
	
	$('.chatbutton').on('click', function(event) {
	    var thisid = event.target.id;
	    var bits = thisid.split("_");  // chatmessagebutton_$threadset_$threadid
	    thischatmessage_threadset = bits[1];
	    thischatmessage_threadid = bits[2];
    	$("#chatmessagepopup").dialog("open");
    	$("#chatmessage_threadtitle").hide();
    	$("#chatmessage_threadtitlefixed").show();
    	thischatmessage_threadtitle = $("#chatmessagethreadtitle_"+thischatmessage_threadset+"_"+thischatmessage_threadid).val();	
    	$("#chatmessage_threadtitlefixed").html(thischatmessage_threadtitle);
	})

	$('.chatbuttonnew').on('click', function(event) {
	    var thisid = event.target.id;
	    var bits = thisid.split("_");  // chatmessagebutton_$threadset_new
	    thischatmessage_threadset = bits[1];
	    thischatmessage_threadid = bits[2];
    	$("#chatmessagepopup").dialog("open");
    	$("#chatmessage_threadtitle").show();
	})
	
	$('.chatopenclosebutton').on('click', function(event) {
	    var thisocid = event.target.id;
	    var ocstatus = $("#"+thisocid).html();
	    var bits = thisocid.split("_");  // chatopenclosebutton_$threadset_$threadid
	    var thisoc_threadset = bits[1];
	    var thisoc_threadid = bits[2];
	    var thiscontentid = "Content_"+thisoc_threadset+"_"+thisoc_threadid;
	    var thischatmessagebuttonid = "chatmessagebutton_"+thisoc_threadset+"_"+thisoc_threadid;
	    if (ocstatus == "Join this conversation") {
	    	if (opencontentid != "") { 
	    		// alert(opencontentid);
	    		var cbits = opencontentid.split("_");
	    		var openocid = "chatopenclosebutton_"+cbits[1]+"_"+cbits[2];
	    		var openchatmessagebuttonid = "chatmessagebutton_"+cbits[1]+"_"+cbits[2];
	    		$("#"+openocid).html("Join this conversation");
		    	$("#"+openchatmessagebuttonid).hide();
	    		$("#"+opencontentid).collapse('hide'); 		
	    	}
	    	$("#"+thisocid).html("Hide");
	    	$("#"+thischatmessagebuttonid).show();
	    	// $("#"+thiscontentid).collapse('show');	    	
	    	setTimeout(showAccordionContent, 500, thiscontentid);
		}
	    if (ocstatus == "Hide") {
			$("#"+thisocid).html("Join this conversation");
			$("#"+thischatmessagebuttonid).hide();
			// $("#"+thiscontentid).collapse('hide');
			setTimeout(hideAccordionContent, 500, thiscontentid);
		} 	

	})
	
	$('#chatsend').on('click', function() {
		$("#chatmessagepopup").dialog("close");
		if ( thischatmessage_threadid == "new" ) {
			thischatmessage_threadtitle = $("#chatmessage_threadtitle").val();
		} else {
	    	thischatmessage_threadtitle = $("#chatmessagethreadtitle_"+thischatmessage_threadset+"_"+thischatmessage_threadid).val();			
		}
		if (remote == "remote") { var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_personchatmessageremotein.php"+MINPARMS(); }
		else { var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_personchatmessagein.php"+STDPARMS(); }
		sUrl = sUrl + "&chatviewerpersonid=" + chatviewerpersonid;
		sUrl = sUrl + "&chatmessage_threadset=" + thischatmessage_threadset;
		sUrl = sUrl + "&chatmessage_threadid=" + thischatmessage_threadid;		
		sUrl = sUrl + "&chatmessage_threadtitle=" + thischatmessage_threadtitle;
		
		var chatmessage = $("#chatmessage_message").val();
		chatmessage = chatmessage.replace('&', 'and');
		sUrl = sUrl + "&chatmessage_message=" + chatmessage;
		if ($('#testchatmessage_personid').length) { // used to simulate test message generation bbonly
			if ($('#testchatmessage_personid').val() != "") {
				sUrl = sUrl + "&chatmessage_personid=" + $('#testchatmessage_personid').val();
			}
		}
		if ($('#testchatmessage_test').length) { // used to stop sending of emails bbonly
			if ($('#testchatmessage_test').is(":checked")) { sUrl = sUrl + "&chatmessage_test=Yes"; }	
			else { sUrl = sUrl + "&chatmessage_test=No"; }
		}
		window.location.href = sUrl;		
	});
	
	
	
	if ( target_threadid == "" ) {
		// open just the first accordion group
		if ($(".chatopenclosebutton")[0]){ // Check if class exists
			var firstocbuttonid = $('.chatopenclosebutton').eq(0).attr('id');
		    var firstbits = firstocbuttonid.split("_");  // chatopenclosebutton_$threadset_$threadid
		    var firstoc_threadset = firstbits[1];
		    var firstoc_threadid = firstbits[2];
		    var firstcontentid = "Content_"+firstoc_threadset+"_"+firstoc_threadid;
		    // alert(firstcontentid);
		    
		    var firstchatmessagebuttonid = "chatmessagebutton_"+firstoc_threadset+"_"+firstoc_threadid;
			$("#"+firstocbuttonid).html("Hide");
			$("#"+firstchatmessagebuttonid).show();
			// $("#"+firstcontentid).collapse('show');
			// showAccordionContent(firstcontentid);
			setTimeout(showAccordionContent, 500, firstcontentid);
		} 
	} else {
		// open the target accordion group
	    var targetcontentid = "Content_"+target_threadset+"_"+target_threadid;
	    // alert(targetcontentid);
	    var targetocbuttonid = "chatopenclosebutton_"+target_threadset+"_"+target_threadid;
	    var targetchatmessagebuttonid = "chatmessagebutton_"+target_threadset+"_"+target_threadid;
		$("#"+targetocbuttonid).html("Hide");
		$("#"+targetchatmessagebuttonid).show();
		$("#"+targetcontentid).collapse('show');
		// showAccordionContent(targetcontentid);
		setTimeout(showAccordionContent, 500, targetcontentid);
	}
		
	function showAccordionContent(contentid) {
		$("#"+contentid).collapse('show');
		opencontentid = contentid;
	}
	
	function hideAccordionContent(contentid) {
		$("#"+contentid).collapse('hide');
		opencontentid = "";
	}
	
});       
        
        
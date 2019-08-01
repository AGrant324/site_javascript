$(document).ready( function() {
	
	// alert("grlleagueofficialresults2");
	// grlmatch_hometeamplayerlist = GBen,SArg,SArg,SArg,SArg,SArg
	// grlmatch_hometeamstatslist = GBen,G,81,|SArg,G,74,|SArg,G,72,|SArg,G,54,|SArg,G,49,Pen|SArg,G,9,Pen  
    // Element      Class         id
    // Add New .hstat_addnew   hstat_G_addnew
    // Row	   .hstat_row	   hstat_G_rowseq_row
    // Stat	   .hstat_stat	   hstat_G_rowseq_playerid
    //   	   .hstat_stat	   hstat_G_rowseq_time
    //         .hstat_stat	   hstat_G_rowseq_extra
    // Delete  .hstat_delete   hstat_G_rowseq_delete	
    // Div                     hstat_G_listend	
	
	//========== Global Variables  ==========================================================	
	GLOBALS = new Array();
	updatelog = "";
	
	currperiodid = $("#currperiodid").val();
	competitionid = $("#competitionid").val();
	grlmatchid = $("#grlmatch_id").val();
	grlhometeamid = $("#grlhometeamid").val();	
	grlawayteamid = $("#grlawayteamid").val();
	grlhometeamsquadlist = $("#grlhometeamsquadlist").val();	
	grlawayteamsquadlist = $("#grlawayteamsquadlist").val();	
	
	$("#squadlistpopup_"+grlhometeamid).dialog({
		autoOpen: false,
		width: "90%",
		height: "90%",
		overflow: "auto"
	});		
	$("#squadlistpopup_"+grlhometeamid).hide();
	
	$("#squadlistpopup_"+grlawayteamid).dialog({
		autoOpen: false,
		width: "90%",
		height: "90%",
		overflow: "auto"
	});		
	$("#squadlistpopup_"+grlawayteamid).hide();	
	
	hometeamname = "";
	awayteamname = "";		

	thissimpletableid = "";
	thissimpletablerow = ""; 
	
	hrowseq = 0;
	arowseq = 0;
	
	$('#squadlistbutton_'+grlhometeamid).on('click', function(event) {
		$("#squadtitle").html(hometeamname);
		$("#squadlistpopup_"+grlhometeamid).dialog("open");
		$("#squadlistpopup_"+grlhometeamid).css({height: $(window).height()*.80, overflow:"auto"});
		$("#squadlistpopup_"+grlhometeamid).parent().css('position', 'fixed');		
		$("#squadlistpopup_"+grlhometeamid).parent().css("top", ( $(window).height() - $("#squadlistpopup_"+grlhometeamid).height() ) / 2  + "px");
		$("#squadlistpopup_"+grlhometeamid).parent().css("left", ( $(window).width() - $("#squadlistpopup_"+grlhometeamid).width() ) / 2 + "px");	
		$('#simpletabletable_GRLSquadlist_'+grlhometeamid).DataTable().columns.adjust();  
	});
	$('#squadlistpopupclosebutton_'+grlhometeamid).on('click', function(event) {
		$("#squadlistpopup_"+grlhometeamid).dialog("close");
	});
	
	$('#squadlistbutton_'+grlawayteamid).on('click', function(event) {
		$("#squadtitle").html(awayteamname);
		$("#squadlistpopup_"+grlawayteamid).dialog("open");
		$("#squadlistpopup_"+grlawayteamid).css({height: $(window).height()*.80, overflow:"auto"});
		$("#squadlistpopup_"+grlawayteamid).parent().css('position', 'fixed');		
		$("#squadlistpopup_"+grlawayteamid).parent().css("top", ( $(window).height() - $("#squadlistpopup_"+grlawayteamid).height() ) / 2  + "px");
		$("#squadlistpopup_"+grlawayteamid).parent().css("left", ( $(window).width() - $("#squadlistpopup_"+grlawayteamid).width() ) / 2 + "px");		
		$('#simpletabletable_GRLSquadlist_'+grlhometeamid).DataTable().columns.adjust();  	
	});	
	$('#squadlistpopupclosebutton_'+grlawayteamid).on('click', function(event) {
		$("#squadlistpopup_"+grlawayteamid).dialog("close");
	});	
	
	
	$('.hstat_addnew').on('click', function(event) {		
		var thisid = this.id;
		var ida = thisid.split("_");
		var grlplayerstattypecode = ida[1];
		Check_Data_Hash('grlteam',GLOBALS['grlmatch_hometeamid']);
		var hometeamplayerlist = GLOBALS['grlteam_squadlist'];
		var hometeamplayera = hometeamplayerlist.split(",");
		var grlplayerid = "";
		var time = "";
		var extra = "";
		hrowseq++;
		var idbase = "hstat_"+grlplayerstattypecode+"_"+hrowseq+"_";
		var insertmatchstat = "";
		insertmatchstat = insertmatchstat + '<div id="'+idbase+'row" class="hstat_row row row-eq-height">';
		insertmatchstat = insertmatchstat + '<div class="col-sm-6">';		
		insertmatchstat = insertmatchstat + '<select id="'+idbase+'playerid" name="'+idbase+'playerid" class="hstat_stat form-control">';		
		for (var hpi in hometeamplayera) {
			var tgrlplayerid = hometeamplayera[hpi];
			Get_Data_Hash('grlplayer', tgrlplayerid);
			var name = GLOBALS['grlplayer_fname']+" "+GLOBALS['grlplayer_sname'];
			insertmatchstat = insertmatchstat + '<option value="'+tgrlplayerid+'">'+name+'</option>';		
		}
		insertmatchstat = insertmatchstat + '<option value="" selected></option>';	
		insertmatchstat = insertmatchstat + '</select >';	
		insertmatchstat = insertmatchstat + '</div>';	
		insertmatchstat = insertmatchstat + '<div class="col-sm-2"><input id="'+idbase+'time" name="'+idbase+'time" class="hstat_stat form-control" value="'+time+'"></div>';			
		insertmatchstat = insertmatchstat + '<div class="col-sm-2"><input id="'+idbase+'extra" name="'+idbase+'extra" class="hstat_stat form-control" value="'+extra+'"></div>';					
		insertmatchstat = insertmatchstat + '<div class="col-sm-1">';
		insertmatchstat = insertmatchstat + '<button id="'+idbase+'delete" class="hstat_delete btn btn-danger" type="button" >x</button>';
		insertmatchstat = insertmatchstat + '</div>';
		insertmatchstat = insertmatchstat + '</div>';  	  
		$( "#hstat_"+grlplayerstattypecode+"_listend" ).before( insertmatchstat );  
		statdeletelistener();
	});			
	
	
	$('.astat_addnew').on('click', function(event) {
		var thisid = this.id;
		var ida = thisid.split("_");
		var grlplayerstattypecode = ida[1];
		Check_Data_Hash('grlteam',GLOBALS['grlmatch_awayteamid']);
		var awayteamplayerlist = GLOBALS['grlteam_squadlist'];
		var awayteamplayera = awayteamplayerlist.split(",");
		var grlplayerid = "";
		var time = "";
		var extra = "";
		arowseq++;
		var idbase = "astat_"+grlplayerstattypecode+"_"+arowseq+"_";
		var insertmatchstat = "";
		insertmatchstat = insertmatchstat + '<div id="'+idbase+'row" class="astat_row row row-eq-height">';
		insertmatchstat = insertmatchstat + '<div class="col-sm-6">';		
		insertmatchstat = insertmatchstat + '<select id="'+idbase+'playerid" name="'+idbase+'playerid" class="astat_stat form-control">';		
		for (var hpi in awayteamplayera) {
			var tgrlplayerid = awayteamplayera[hpi];
			Get_Data_Hash('grlplayer', tgrlplayerid);
			var name = GLOBALS['grlplayer_fname']+" "+GLOBALS['grlplayer_sname'];
			insertmatchstat = insertmatchstat + '<option value="'+tgrlplayerid+'">'+name+'</option>';	
		}
		insertmatchstat = insertmatchstat + '<option value="" selected></option>';	
		insertmatchstat = insertmatchstat + '</select >';	
		insertmatchstat = insertmatchstat + '</div>';	
		insertmatchstat = insertmatchstat + '<div class="col-sm-2"><input id="'+idbase+'time" name="'+idbase+'time" class="astat_stat form-control" value="'+time+'"></div>';			
		insertmatchstat = insertmatchstat + '<div class="col-sm-2"><input id="'+idbase+'extra" name="'+idbase+'extra" class="astat_stat form-control" value="'+extra+'"></div>';					
		insertmatchstat = insertmatchstat + '<div class="col-sm-1">';
		insertmatchstat = insertmatchstat + '<button id="'+idbase+'delete" class="astat_delete btn btn-danger" type="button" >x</button>';
		insertmatchstat = insertmatchstat + '</div>';
		insertmatchstat = insertmatchstat + '</div>';  	  
		$( "#astat_"+grlplayerstattypecode+"_listend" ).before( insertmatchstat );  
		statdeletelistener();
	});	
	
	
	$('#matchresultupdatebutton').on('click', function(event) {							
		GLOBALS['grlmatch_homegfull'] = $("#homegfull").val();
		GLOBALS['grlmatch_homeghalf'] = $("#homeghalf").val();
		GLOBALS['grlmatch_awaygfull'] = $("#awaygfull").val();
		GLOBALS['grlmatch_awayghalf'] = $("#awayghalf").val();
		GLOBALS['grlmatch_score'] = GLOBALS['grlmatch_homegfull']+" - "+GLOBALS['grlmatch_awaygfull'];
		GLOBALS['grlmatch_attendance'] = $("#attendance").val();
		GLOBALS['grlmatch_verifiedby'] = JSPersonId();
		var hometeamstatslist = ""; 
		var sep = "";	
		$('.hstat_row').each(function() {
			var thisid = this.id;
			var ida = thisid.split("_");
			var type = ida[1];
			var rowseq = ida[2];
			var playerid = $("#hstat_"+type+"_"+rowseq+"_playerid").val();
			var time = $("#hstat_"+type+"_"+rowseq+"_time").val();
			var extra = $("#hstat_"+type+"_"+rowseq+"_extra").val();			
			hometeamstatslist = hometeamstatslist + sep + playerid + "," + type + "," + time + "," + extra;	
			sep = "|";
		});	
		
		var awayteamstatslist = ""; 
		var sep = "";	
		$('.astat_row').each(function() {
			var thisid = this.id;
			var ida = thisid.split("_");
			var type = ida[1];
			var rowseq = ida[2];
			var playerid = $("#astat_"+type+"_"+rowseq+"_playerid").val();
			var time = $("#astat_"+type+"_"+rowseq+"_time").val();
			var extra = $("#astat_"+type+"_"+rowseq+"_extra").val();			
			awayteamstatslist = awayteamstatslist + sep + playerid + "," + type + "," + time + "," + extra;	
			sep = "|";
		});	
		
		// alert(hometeamstatslist+" "+awayteamstatslist);		

		GLOBALS['grlmatch_hometeamstatslist'] = hometeamstatslist;
		hgoallist = "";
        if (GLOBALS['grlmatch_hometeamstatslist'] != ""){
            hstatslista = GLOBALS['grlmatch_hometeamstatslist'].split("|");
        	for (var hsi in hstatslista) {
    			var hevent = hstatslista[hsi]+",,";           	           	
                var goaltime = "";
                var goalstatus = "";
                var playername = "";
                var heventa = hevent.split(",");
                var playerid = heventa[0];
                Check_Data_Hash('grlplayer',playerid);
                var playername = GLOBALS['grlplayer_fname']+" "+GLOBALS['grlplayer_sname'];
                if (heventa[1] == "G") {
                    goaltime = heventa[2];
                    goalstatus = " "+heventa[3];
                    if (hgoallist == ""){ hgoallist = playername+" "+goaltime+"'"+goalstatus; }
                    else{hgoallist = playername+" "+goaltime+"' "+goalstatus+"<br>"+hgoallist;}
                }
            }
        }
        GLOBALS['grlmatch_awayteamstatslist'] = awayteamstatslist;
        agoallist = "";
        if (GLOBALS['grlmatch_awayteamstatslist'] != ""){
            astatslista = GLOBALS['grlmatch_awayteamstatslist'].split("|");
        	for (var asi in astatslista) {
    			var aevent = astatslista[asi]+",,";             	           	
                var goaltime = "";
                var goalstatus = "";
                var playername = "";
                var aeventa = aevent.split(",");
                var playerid = aeventa[0];
                Check_Data_Hash('grlplayer',playerid);
                var playername = GLOBALS['grlplayer_fname']+" "+GLOBALS['grlplayer_sname'];
                if (aeventa[1] == "G") {
                    goaltime = aeventa[2];
                    goalstatus = " "+aeventa[3];
                    if (agoallist == ""){ agoallist = playername+" "+goaltime+"'"+goalstatus; }
                    else{agoallist = playername+" "+goaltime+"' "+goalstatus+"<br>"+agoallist;}
                }
            }
        }
		GLOBALS['grlmatch_awayteamstatslist'] = awayteamstatslist;		
		
		Write_Data_Hash('grlmatch[rootkey='+currperiodid+'+'+competitionid+']',grlmatchid);
		
		alert("Updates Successfully Made");
		
	});	
	
	$('#matchresultclosebutton').on('click', function(event) {
		alert("Updates Cancelled");
		
	});	
	
	
	$('#drawSignature').signature({ 
	    background: '#ffffff', // Colour of the background 
	    color: '#000000', // Colour of the signature 
	    thickness: 2, // Thickness of the lines 
	    guideline: false, // Add a guide line or not? 
	    guidelineColor: '#a0a0a0', // Guide line colour 
	    guidelineOffset: 50, // Guide line offset from the bottom 
	    guidelineIndent: 10, // Guide line indent from the edges 
	    // Error message when no canvas 
	    notAvailable: 'Your browser doesn\'t support signing', 
	    syncFormat: 'JSON', // The output respresentation: 'JSON' (default), 'SVG', 'PNG', 'JPEG' 
	    svgStyles: false, // True to use style attribute in SVG 
	    change: null // Callback when signature changed 
	});	
	
	$('#drawSignature').signature('disable');
	$('#drawSignature').css("border", "2px solid #808080");
	
	
	$('#captureSignaturePopup').signature({ 
	    background: '#ffffff', // Colour of the background 
	    color: '#000000', // Colour of the signature 
	    thickness: 2, // Thickness of the lines 
	    guideline: true, // Add a guide line or not? 
	    guidelineColor: '#a0a0a0', // Guide line colour 
	    guidelineOffset: 50, // Guide line offset from the bottom 
	    guidelineIndent: 10, // Guide line indent from the edges 
	    // Error message when no canvas 
	    notAvailable: 'Your browser doesn\'t support signing', 
	    syncField: '#mirrorsignature', // Selector for synchronised text field 
	    syncFormat: 'JSON', // The output respresentation: 'JSON' (default), 'SVG', 'PNG', 'JPEG' 
	    svgStyles: false, // True to use style attribute in SVG 
	    change: null // Callback when signature changed 
	});
	
	$("#signaturepopup").dialog({
		autoOpen: false,
		width: "500px",
		height: "300px",
		open: function (event, ui) {
	        $(".ui-widget-overlay").css({
	            opacity: 0.75,
	            filter: "Alpha(Opacity=75)",
	            backgroundColor: "black"
	        });
	    },
		modal: true	
	});
	
	// draw existing signature
	
	if ( $('#grlmatch_signature').val() != "" ) {
		$('#noSignature').hide();
		$('#drawSignature').signature('draw', $('#grlmatch_signature').val());
		$('#drawSignatureUpdate').html("Update Signature");			
	} else {
		$('#noSignature').show();
		$('#drawSignature').hide();
		$('#drawSignatureClear').hide();
		$('#drawSignatureUpdate').html("Enter Signature");			
	}
	 
	// $('#drawSignature').signature({disabled: true}); 
	
	$('#drawSignatureClear').click(function() {	
		$.confirm({
			icon: 'fa fa-pencil text-warning',
		    title: 'Signature',
		    content: 'Are you sure you want to remove this signature?',
		    buttons: {
		        somethingElse: {
		            text: 'Remove',
		            btnClass: 'btn-orange',
		            action: function(){
						$('#drawSignature').signature('clear');
						$('#mirrorsignature').val("");
						$('#grlmatch_signature').val("");
						$('#drawSignatureClear').hide();
						$('#drawSignatureUpdate').html("Enter Signature");	
						$('#noSignature').show();
						$('#drawSignature').hide();						
		            }
		        },
		        cancel: function () {  },
		    }
		});			
	});
	
	$('#drawSignatureUpdate').click(function() {
		
		var signaturewidth = $(window).width()*.7;
		var signatureheight = $(window).height()*.6;
		var signaturepopupwidth = signaturewidth + 50;
		var signaturepopupheight = signatureheight + 50;
		var signaturecontainerwidth = signaturepopupwidth + 50;
		var signaturecontainerheight = signaturepopupheight + 50;
		
		
		var signaturewidth = 450;
		var signatureheight = 450;
		var signaturepopupwidth = signaturewidth + 20;
		var signaturepopupheight = signatureheight + 90;
		var signaturecontainerwidth = signaturepopupwidth + 20;
		var signaturecontainerheight = signaturepopupheight + 50;
		
		
		$("#signaturepopup").dialog("open"); 	
		$("#signaturepopup").css('background-color', 'silver');
		$("#signaturepopup").dialog().css('width', signaturepopupwidth);	
		$("#signaturepopup").dialog().css('height', signaturepopupheight);
		$("#signaturepopup").parent().css('width', signaturecontainerwidth);
		$("#signaturepopup").parent().css('height', signaturecontainerheight);		
		$("#signaturepopup").parent().css('position', 'fixed');	
		$("#signaturepopup").parent().css("left", ( $(window).width() - signaturecontainerwidth ) / 2 + "px");				
		$("#signaturepopup").parent().css("top", ( $(window).height() - signaturecontainerheight ) / 2  + "px");
		
    	$('#captureSignaturePopup').signature('clear');
    	$("#captureSignaturePopup").css('background-color', 'white');
    	$("#captureSignaturePopup").css('width', signaturewidth);	
		$("#captureSignaturePopup").css('height', signatureheight);    	
	});	
	
	$('#signaturepopupClear').click(function() {
		$('#captureSignaturePopup').signature('clear');
		$('#mirrorsignature').val("");
	});	
	
	$('#signaturepopupSave ').click(function() {		
		if ( $('#mirrorsignature').val() == "" ) {
			$.alert({
				icon: 'fa fa-pencil text-danger',
				title: "Signature",
			    content: "No Signature Recorded."
			})							
		} else {			
			if ( $('#grlmatch_signature').val() == "" ) {
				$('#grlmatch_signature').val($('#mirrorsignature').val());
    			$('#noSignature').hide();
    			$('#drawSignature').show();
    			$('#drawSignatureClear').show();
    			$('#drawSignature').signature('draw', $('#grlmatch_signature').val());
    			$('#drawSignatureUpdate').html("Update Signature");
    			$("#signaturepopup").dialog("close"); 
			} else {
				$.confirm({
					icon: 'fa fa-pencil text-danger',
				    title: 'Signature',
				    content: 'Please confirm replacement of existing signature?',
				    buttons: {
				        somethingElse: {
				            text: 'Replace',
				            btnClass: 'btn-blue',
				            action: function(){	
				    			$('#grlmatch_signature').val($('#mirrorsignature').val());
				    			$('#noSignature').hide();
				    			$('#drawSignature').show();
				    			$('#drawSignatureClear').show();
				    			$('#drawSignature').signature('draw', $('#grlmatch_signature').val());
				    			$('#drawSignatureUpdate').html("Update Signature");	
				    			$("#signaturepopup").dialog("close");
				            }
				        },
				        cancel: function () {  },
				    }
				});			
			}			
		}		
	});	
	
	$('#signaturepopupClose ').click(function() {
		
		if ( $('#mirrorsignature').val() == "" ) {
			$("#signaturepopup").dialog("close");
		} else {			
			$.confirm({
				icon: 'fa fa-pencil text-warning',
			    title: 'Signature',
			    content: 'Did you mean to close without saving?',
			    buttons: {
			        somethingElse: {
			            text: 'Confirm',
			            btnClass: 'btn-orange',
			            action: function(){
			            	$("#signaturepopup").dialog("close");
			            }
			        },
			        cancel: function () {  },
			    }
			});			
		}		
	});	
	

	
	setupWait(); 
	
	function handleDataRequestSuccess(data, status) {
	    // alert(data);
		if(data != undefined){
			// $('#TRACETEXT').html(data); 
			Create_Hashes(data);
			Get_Data_Hash('grlmatch', grlmatchid);
			Get_Data_Hash('grlteam', GLOBALS['grlmatch_hometeamid']);
			hometeamname = GLOBALS['grlteam_name'];
			Get_Data_Hash('grlteam', GLOBALS['grlmatch_awayteamid']);
			awayteamname = GLOBALS['grlteam_name'];				
			existingStatsDisplay();		
		}
		stopWait();	 
	}
	 
	function handleDataRequestFailure(xhr, reason, ex) {
		 messageAlert("Error Reason = "+"|"+xhr+"|"+reason+"|"+ex+"|");
		 // messageAlert("You are not connected to the internet at this time");
	} 
	
	var totalplayercommalist = grlhometeamsquadlist+","+grlawayteamsquadlist;
	var totalplayerpluslist = totalplayercommalist.replace(/\,/g, "+");
	
	var datarequestlist = "";
	datarequestlist = datarequestlist + "grlmatch[rootkey="+currperiodid+"+"+competitionid+"][fieldvalue=grlmatch_id:" + grlmatchid + "]" + ",";
	datarequestlist = datarequestlist + "grlteam[rootkey="+currperiodid+"][fieldvalue=grlteam_id:" + grlhometeamid + "+" + grlawayteamid + "]" + ",";
	datarequestlist = datarequestlist + "grlplayerstattype[rootkey="+currperiodid+"]" + ",";
 	datarequestlist = datarequestlist + "grlplayer[fieldvalue=grlplayer_id:" + totalplayerpluslist + "]";

 	// CHECK Only download players for home and away teams in future versions
 	// alert(datarequestlist);
 	
	startWait("Loading");
	var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_javascriptdataprovider.php"; 
	// alert(sUrl);
	$.ajax({
	     url: sUrl,
	     data: { 
	    	 ServiceId: JSServiceId(),	        	
	    	 DomainId: JSDomainId(),
	    	 ModeId: JSModeId(),	        	
	    	 PersonId: JSPersonId(),	
	    	 SessionId: JSSessionId(),		        	
	    	 LoginModeId: JSLoginModeId(),
	    	 MenuId: JSMenuId(),
	    	 DataRequestList: datarequestlist
	     },
	     type: "GET",
	     dataType: "text",
	     timeout: 10000,
	     success: handleDataRequestSuccess,	        
	     error: handleDataRequestFailure
	});		
	

	
}); 	
	
function statdeletelistener() {	
	$('.hstat_delete').on('click', function(event) {
		var thisid = $(this).attr("id");
		/*
		var result = confirm("Do you want to delete this entry?");
		if (result) {
		    var id = $(this).attr("id");
			$(this).parent().parent().remove();	
		}
		*/
		$.confirm({
			icon: 'fa fa-question-circle text-warning',
		    title: 'Delete',
		    content: 'Do you want to delete this entry?',
		    buttons: {
		        somethingElse: {
		            text: 'Delete',
		            btnClass: 'btn-danger',
		            action: function(){
						$("#"+thisid).parent().parent().remove();	
		            }
		        },
		        cancel: function () { 			        	
		        },
		    }
		});						
	})		
	
	
	$('.astat_delete').on('click', function(event) {
		var thisid = $(this).attr("id");
		/*
		var result = confirm("Do you want to delete this entry?");
		if (result) {
		    var id = $(this).attr("id");
			$(this).parent().parent().remove();	
		}
		*/
		$.confirm({
			icon: 'fa fa-question-circle text-warning',
		    title: 'Delete',
		    content: 'Do you want to delete this entry?',
		    buttons: {
		        somethingElse: {
		            text: 'Delete',
		            btnClass: 'btn-danger',
		            action: function(){
						$("#"+thisid).parent().parent().remove();	
		            }
		        },
		        cancel: function () { 			        	
		        },
		    }
		});						
	})		
}
	
	
function existingStatsDisplay() {
	$("#homegfull").val(GLOBALS['grlmatch_homegfull']);
	$("#homeghalf").val(GLOBALS['grlmatch_homeghalf']);
	$("#awaygfull").val(GLOBALS['grlmatch_awaygfull']);
	$("#awayghalf").val(GLOBALS['grlmatch_awayghalf']);
	$("#attendance").val(GLOBALS['grlmatch_attendance']);
	$('.hstat_row').each(function() {  // clear all previous data
		$(this).remove();	
	});	
	$('.astat_row').each(function() {  // clear all previous data
		$(this).remove();	
	});		
	
	Check_Data_Hash('grlteam',GLOBALS['grlmatch_hometeamid']);
	var hometeamplayerlist = GLOBALS['grlteam_squadlist'];
	var hometeamplayera = hometeamplayerlist.split(",");
	// alert(GLOBALS['grlmatch_hometeamstatslist']);
	var hometeamstatsa = GLOBALS['grlmatch_hometeamstatslist'].split("|");
	hrowseq = 0;
	var grlplayerstattypea = Get_Array_Hash ("grlplayerstattype");
	for (var ci in grlplayerstattypea) {
		grlplayerstattypecode = grlplayerstattypea[ci];
		for (var si in hometeamstatsa) {
			var statsa = hometeamstatsa[si].split(",");
			var grlplayerid = statsa[0];
			var type = statsa[1];		
			var time = statsa[2];
			var extra = statsa[3];
			var insertmatchstat = "";
			if (type == grlplayerstattypecode ) {
				hrowseq++;
				var idbase = "hstat_"+grlplayerstattypecode+"_"+hrowseq+"_";
				insertmatchstat = insertmatchstat + '<div id="'+idbase+'row" class="hstat_row row row-eq-height">';
				insertmatchstat = insertmatchstat + '<div class="col-sm-6">';		
				insertmatchstat = insertmatchstat + '<select id="'+idbase+'playerid"  name="'+idbase+'playerid" class="hstat_stat form-control">';		
				for (var hpi in hometeamplayera) {
					var tgrlplayerid = hometeamplayera[hpi];
					Get_Data_Hash('grlplayer', tgrlplayerid);
					var name = GLOBALS['grlplayer_fname']+" "+GLOBALS['grlplayer_sname'];
					var selected = "";
					if ( tgrlplayerid == grlplayerid ) { selected = "selected"; }
					insertmatchstat = insertmatchstat + '<option value="'+tgrlplayerid+'" '+selected+'>'+name+'</option>';		
				}
				insertmatchstat = insertmatchstat + '<option value=""></option>';	
				insertmatchstat = insertmatchstat + '</select >';	
				insertmatchstat = insertmatchstat + '</div>';	
				insertmatchstat = insertmatchstat + '<div class="col-sm-2"><input id="'+idbase+'time" name="'+idbase+'time" class="hstat_stat form-control"  value="'+time+'"></div>';			
				insertmatchstat = insertmatchstat + '<div class="col-sm-2"><input id="'+idbase+'extra" name="'+idbase+'extra" class="hstat_stat form-control"  value="'+extra+'"></div>';							
				insertmatchstat = insertmatchstat + '<div class="col-sm-1">';
				insertmatchstat = insertmatchstat + '<button id="'+idbase+'delete" class="hstat_delete btn btn-danger" type="button" >x</button>';		
				insertmatchstat = insertmatchstat + '</div>';
				insertmatchstat = insertmatchstat + '</div>';  			  
				$( "#hstat_"+grlplayerstattypecode+"_listend" ).before( insertmatchstat );  
			}			
		}
	}
	Check_Data_Hash('grlteam',GLOBALS['grlmatch_awayteamid']);
	// Check_Data_Hash('grlteam[rootkey='+currperiodid+'+'+competitionid+']',GLOBALS['grlmatch_awayteamid']);
	var awayteamplayerlist = GLOBALS['grlteam_squadlist'];
	var awayteamplayera = awayteamplayerlist.split(",");
	// alert(GLOBALS['grlmatch_awayteamstatslist']);
	var awayteamstatsa = GLOBALS['grlmatch_awayteamstatslist'].split("|");
	arowseq = 0;
	var grlplayerstattypea = Get_Array_Hash ("grlplayerstattype");
	for (var ci in grlplayerstattypea) {
		grlplayerstattypecode = grlplayerstattypea[ci];
		for (var si in awayteamstatsa) {
			var statsa = awayteamstatsa[si].split(",");
			var grlplayerid = statsa[0];
			var type = statsa[1];		
			var time = statsa[2];
			var extra = statsa[3];
			var insertmatchstat = "";
			if (type == grlplayerstattypecode ) {
				arowseq++;
				var idbase = "astat_"+grlplayerstattypecode+"_"+arowseq+"_";
				insertmatchstat = insertmatchstat + '<div id="'+idbase+'row" class="astat_row row row-eq-height">';
				insertmatchstat = insertmatchstat + '<div class="col-sm-6">';		
				insertmatchstat = insertmatchstat + '<select id="'+idbase+'playerid" name="'+idbase+'playerid" class="astat_stat form-control">';		
				for (var hpi in awayteamplayera) {
					var tgrlplayerid = awayteamplayera[hpi];
					Get_Data_Hash('grlplayer', tgrlplayerid);
					var name = GLOBALS['grlplayer_fname']+" "+GLOBALS['grlplayer_sname'];
					var selected = "";
					if ( tgrlplayerid == grlplayerid ) { selected = "selected"; }
					insertmatchstat = insertmatchstat + '<option value="'+tgrlplayerid+'" '+selected+'>'+name+'</option>';		
				}
				insertmatchstat = insertmatchstat + '<option value=""></option>';	
				insertmatchstat = insertmatchstat + '</select >';	
				insertmatchstat = insertmatchstat + '</div>';	
				insertmatchstat = insertmatchstat + '<div class="col-sm-2"><input id="'+idbase+'time" name="'+idbase+'time" class="astat_stat form-control"  value="'+time+'"></div>';			
				insertmatchstat = insertmatchstat + '<div class="col-sm-2"><input id="'+idbase+'extra" name="'+idbase+'extra" class="astat_stat form-control"  value="'+extra+'"></div>';							
				insertmatchstat = insertmatchstat + '<div class="col-sm-1">';
				insertmatchstat = insertmatchstat + '<button id="'+idbase+'delete" class="astat_delete btn btn-danger" type="button" >x</button>';		
				insertmatchstat = insertmatchstat + '</div>';
				insertmatchstat = insertmatchstat + '</div>';  			  
				$( "#astat_"+grlplayerstattypecode+"_listend" ).before( insertmatchstat );  
			}			
		}
	}
	statdeletelistener();
}	

	

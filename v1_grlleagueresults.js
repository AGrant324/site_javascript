$(document).ready( function() {

	// alert("grlleagueresults");
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
	
	grlmatchid = "";	
	hometeamname = "";
	awayteamname = "";		

	thissimpletableid = "";
	thissimpletablerow = ""; 
	
	hrowseq = 0;
	arowseq = 0;
	
	$("#leagueresultspopup").dialog({
		autoOpen: false,
		width: "80%",
		height: "70%",
		overflow: "auto"
	});		
	
	$("#leagueresultspopup").hide();
	
	$('.resultsupdatebutton').on('click', function() {		
		var thismatchid = $(this).attr('id');
		grlmatchid = thismatchid.replace("_resultsupdatebutton", "");
		// simpletabletable_GRLResultsHTMLA_L-Premier_March
		thissimpletableid = $(this).closest('table').attr('id');
		// alert(thissimpletableid);
		thissimpletablerow = $(this).closest('tr');

		Get_Data_Hash('grlmatch', grlmatchid);
		Get_Data_Hash('grlteam', GLOBALS['grlmatch_hometeamid']);
		hometeamname = GLOBALS['grlteam_name'];
		Get_Data_Hash('grlteam', GLOBALS['grlmatch_awayteamid']);
		awayteamname = GLOBALS['grlteam_name'];				
		$("#matchtitle").html(hometeamname+" vs "+awayteamname);
		// alert(thismatchid+" - "+GLOBALS['grlmatch_hometeamid']+" vs "+GLOBALS['grlmatch_awayteamid']);
		existingStatsDisplay();		
		$("#leagueresultspopup").dialog("open");
		$("#leagueresultspopup").css({height: $(window).height()*.75, overflow:"auto"});
		$("#leagueresultspopup").parent().css('position', 'fixed');		
		$("#leagueresultspopup").parent().css("top", ( $(window).height() - $("#leagueresultspopup").height() ) / 2  + "px");
		$("#leagueresultspopup").parent().css("left", ( $(window).width() - $("#leagueresultspopup").width() ) / 2 + "px");
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
	
	
	$('#leagueresultspopupupdatebutton').on('click', function(event) {							
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
		
		var temparray = [];
		temparray.push('<font color="grey">'+GLOBALS['grlmatch_time']+'</font>');  
		temparray.push('<font size="3" color="darkgreen">'+"<b>"+hometeamname+"</b></font><br><font color='grey'>"+hgoallist+'</font>'); 
		temparray.push('<b>'+GLOBALS['grlmatch_score']+'</b>'); 
		temparray.push('<font size="3" color="darkgreen">'+"<b>"+awayteamname+"</b></font><br><font color='grey'>"+agoallist+'</font>'); 
		temparray.push('<font color="grey">'+"Att."+GLOBALS['grlmatch_attendance']+'</font>'); 
		temparray.push('<button id="'+grlmatchid+'" class="resultsupdatebutton btn btn-primary" type="button">Update</button>'); 
		temparray.push('<button id="'+grlmatchid+'" class="resultsverifybutton btn btn-success" type="button">Verified</button>'); 		
		// alert(thissimpletableid);
		thisdatatable = $('#'+thissimpletableid).DataTable();	
		thisdatatable.cell(thissimpletablerow, 0).data(temparray[0]);
		thisdatatable.cell(thissimpletablerow, 1).data(temparray[1]);
		thisdatatable.cell(thissimpletablerow, 2).data(temparray[2]);
		thisdatatable.cell(thissimpletablerow, 3).data(temparray[3]);
		thisdatatable.cell(thissimpletablerow, 4).data(temparray[4]);
		thisdatatable.cell(thissimpletablerow, 6).data(temparray[6]);		

		$("#leagueresultspopup").dialog("close");
		
	});	
	
	$('#leagueresultspopupclosebutton').on('click', function(event) {
		$("#leagueresultspopup").dialog("close");		
	});		
	
	setupWait(); 
	
	function handleDataRequestSuccess(data, status) {
	    // alert(data);
		if(data != undefined){
			// $('#TRACETEXT').html(data); 
			Create_Hashes(data);

		}
		stopWait();	 
	}
	 
	function handleDataRequestFailure(xhr, reason, ex) {
		 messageAlert("Error Reason = "+"|"+xhr+"|"+reason+"|"+ex+"|");
		 // messageAlert("You are not connected to the internet at this time");
	} 
	
	var datarequestlist = "";
	datarequestlist = datarequestlist + "grlmatch[rootkey="+currperiodid+"+"+competitionid+"]" + ",";
	datarequestlist = datarequestlist + "grlteam[rootkey="+currperiodid+"]" + ",";
	datarequestlist = datarequestlist + "grlplayerstattype[rootkey="+currperiodid+"]" + ",";
 	datarequestlist = datarequestlist + "grlplayer";
	
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
	



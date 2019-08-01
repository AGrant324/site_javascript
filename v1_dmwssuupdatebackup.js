$(document).ready( function() { 
	
	$('#defaultSignature').signature();
	
	$('#removeSignature').click(function() {
		var destroy = $(this).text() === 'Remove';
		$(this).text(destroy ? 'Re-attach' : 'Remove');
		$('#defaultSignature').signature(destroy ? 'destroy' : {});
	});
	
	$('#saveSignature').click(function() {
		alert("Signature Saved");
	});	
	
	
	//global variables	
	GLOBALS = new Array();	
	
	servicenewindex = 0;
	refinnewindex = 0;
	refoutnewindex = 0;	
	actionnewindex = 0;
	complexnewindex = 0;
	complexityissuecount = 0;	
	complexityscore = 0;
	progressScore = 0;
	wellbeingScore = 0;
	
	dmwsreferrerupdateida = new Array();
	dmwsreferralida = new Array();	
	dmwsactionida = new Array();
	dmwserviceprovidedida = new Array();
	
	showprevwbdatatoggle = "0";	
	showwbdatatogglea = Array();
	
	prevwbdataa = Array();
	thiswbdataa = Array();	
	
	wellbeingtopica = Array('qoptimistic','quseful','qrelaxed','qinterestedinothers','qenergy','qproblemmanagement','qthinkingclearly','qgoodaboutme','qclosetoothers','qconfident','qlovedqcheerful');
	showprevprogdatatoggle = "0";
	progresstopica = Array('treatment','health','wellbeing','family','relationships','housing','finance','work','social','activities');
	prevprogdataa = Array();
	sprevprogdataa = Array(); 
	thisprogdataa = Array();
	toggledprogbuttonsa = Array();
	var myradarchartcfg = {
	  w: w,
	  h: h,
	  maxValue: 5,
	  levels: 5,
	  ExtraWidthX: 300
	}
	complexityslidervaluea = new Array();
	
	complexitya = Array(); // [visitid or new][issuetype](score)		
	complexityweightinga = new Array(0,0.5,0.75,1,1.5,2,2.5);
	complexityextraweightinga = new Array(0,1,1.1,1.25,1.5,2,3);
	complexityscoremin = new Array(0,0,0,0,0,0,0);
	complexityscoremax = new Array(0,0,0,0,0,0,0);
	cumcomplexityweightingmin = 0;
	cumcomplexityweightingmax = 0;
	for (var issuei = 1; issuei < 7; issuei++) {
		cumcomplexityweightingmin = cumcomplexityweightingmin + complexityweightinga[1];
		cumcomplexityweightingmax = cumcomplexityweightingmax + complexityweightinga[6];
		complexityscoremin[issuei] = cumcomplexityweightingmin*complexityextraweightinga[issuei];
		complexityscoremax[issuei] = cumcomplexityweightingmax*complexityextraweightinga[issuei];
		// alert(issuei+" "+complexityscoremin[issuei]+" -> "+complexityscoremax[issuei]);
	}	
	currenttextareaopenid = "";
	
	dmwssu_id = $('#dmwssu_id').val();
	dmwsvisit_id = $('#dmwsvisit_id').val();	
	dmwsvisit_type = $('#dmwsvisit_type').val();
	person_userlevel = $('#person_userlevel').val();	
	
	document.title = $('#TabTitle').val();
	
	
	// ======== prevents navigation away from fpage without updates =====================
	$('#dmwssuupdateform').areYouSure( 
		{'message':'Are you sure you want to close this site without saving? (Updates may be lost)'} // doesnt override browser default message !!
	);

	// ======== Listeners for Save/Close Buttons =====================
	$('#Save').on('click', function(event) {
		if ( person_userlevel > "1") {
			$('[name=SubmitAction]').val('Save');		
			$("#dmwssuupdateform").submit();								
		} else {
			alert("Sorry: You are not authorised to make changes.");
		}
	});	
	
	$('#Close').on('click', function(event) {
		$('[name=SubmitAction]').val('Close');		    	
		if (confirm('Are you sure you want to close this site without saving? (Updates may be lost)')) { 
			window.close(); // CHECK - Only if updates made
		}
	});
	
	$('#SaveClose').on('click', function(event) {
		if ( person_userlevel > "1") {
			$('[name=SubmitAction]').val('SaveClose');
			$("#dmwssuupdateform").submit();								
		} else {
			alert("Sorry: You are not authorised to make changes.");
		}			
	});		

	// ======== general form update listeners =====================	
	$('input[type="text"]').keypress(function (e) {
	    var code = e.keyCode || e.which;
	    if (code === 13)
	    e.preventDefault();  // stop form submission on enter
	});
	
	$('.form-control').on('click', function(event) {		
		formChanged();
	});	
	
	$('.slimimageupdatebutton').on('click', function(event) {		
		formChanged();
	});
	$('.slimimageremovebutton').on('click', function(event) {		
		formChanged();
	});		
	
	$('.form-control').change( function() {	
		var intext = $(this).val();
		if (intext.includes('http:')){ $(this).val(intext.replace('http:', ''));}
		if (intext.includes('https:')){ $(this).val(intext.replace('https:', ''));}
	});
	
	$('.textarea').on('click', function(event) {
		currenttextareaopenid = $(this).attr("id");		
		var existingtext = $('#'+currenttextareaopenid).val();		
		$("#textareacontent").val( existingtext );
		$("#textareapopup").dialog("open");
	});	
	
	$('#textareasave').on('click', function(event) {
		if ( currenttextareaopenid != "") {	 // just to be sure	
			var popupnotescontent = $("#textareacontent").val();
			$("#"+currenttextareaopenid).val(popupnotescontent);						
		}
		$("#textareapopup").dialog("close");
		currenttextareaopenid = "";
	});	
	
	$('#textareanosave').on('click', function(event) {
		$("#textareapopup").dialog("close");
		currenttextareaopenid = "";
	});	
	
	$('.calcin').each(function() {		
		if ( $( this ).val() == "") { $( this ).val("0");  }
		if ( $( this ).val() == "NaN") { $( this ).val("0");  }	
	    var id = $(this).attr("id");
	    var ida = id.split("_");		
	    if (ida[0] == "corresi") { corresiida[ida[2]] = ida[2]; }	
	    if (ida[0] == "corcomm") { corcommida[ida[2]] = ida[2]; }	    
	    if (ida[0] == "corsurvey") { corsurveyida[ida[2]] = ida[2]; }			
	});
	
	$('.calcres').each(function() {
		if ( $( this ).val() == "") { $( this ).val("0");  }
		if ( $( this ).val() == "NaN") { $( this ).val("0");  }		
	});	
	
	// ======== new element addition listeners =====================
	$('#dmwsreferrerupdate_add_new').on('click', function(event) {
		refinnewindex++;
		var insertrefin = "";
		insertrefin = insertrefin + '<input type=hidden id="dmwsreferrerupdate_startfield_new'+actionnewindex+'" name="dmwsreferrerupdate_startfield_new'+actionnewindex+'" value="">';
		insertrefin = insertrefin + '<div class="row row-eq-height">';
		insertrefin = insertrefin + '<div class="col-sm-1"><input id="dmwsreferrerupdate_date_new'+refinnewindex+'" name="dmwsreferrerupdate_date_dmwsreferrerupdate_id" class="datepicker form-control" value=""></div>';
		insertrefin = insertrefin + '<div class="col-sm-2"><input id="dmwsreferrerupdate_personid_new'+refinnewindex+'" name="dmwsreferrerupdate_personid_new'+refinnewindex+'" class="form-control" type="text" value=""></div>';
		insertrefin = insertrefin + '<div class="col-sm-2"><input id="dmwsreferrerupdate_contactref_new'+refinnewindex+'" name="dmwsreferrerupdate_contactref_new'+refinnewindex+'" class="form-control" type="text" value=""></div>';
		insertrefin = insertrefin + '<div class="col-sm-3"><textarea id="dmwsreferrerupdate_statusupdate_new'+refinnewindex+'" name="dmwsreferrerupdate_statusupdate_new'+refinnewindex+'" class="form-control" rows="3"></textarea></div>';
		insertrefin = insertrefin + '<div class="col-sm-3"><textarea id="dmwsreferrerupdate_response_new'+refinnewindex+'" name="dmwsreferrerupdate_response_new'+refinnewindex+'" class="form-control" rows="3"></textarea></div>';		
		insertrefin = insertrefin + '<div class="col-sm-1">';
		insertrefin = insertrefin + '<button id="dmwsreferrerupdate_delete_new'+refinnewindex+'" type="button" class="dmwsreferrerupdatedelete btn btn-danger">x</button>';
		insertrefin = insertrefin + '</div>';
		insertrefin = insertrefin + '</div>';
		insertrefin = insertrefin + '<input type=hidden id="dmwsreferrerupdate_endfield_new'+actionnewindex+'" name="dmwsreferrerupdate_endfield_new'+actionnewindex+'" value="">';
		dmwsreferrerupdateida["new"+refinnewindex] = "new"+refinnewindex;
		$("#dmwsreferrerupdatelistend" ).before( insertrefin );
		dmwsreferrerupdatedeletelistener();
		formChanged();
		datepickerlistener();
	});
	
	$('#dmwsreferral_add_new').on('click', function(event) {
		refoutnewindex++;
		var insertrefout = "";	
		insertrefout = insertrefout + '<input type=hidden id="dmwsreferral_startfield_new'+actionnewindex+'" name="dmwsreferral_startfield_new'+actionnewindex+'" value="">';
		insertrefout = insertrefout + '<div class="row row-eq-height">';
		insertrefout = insertrefout + '<div class="col-sm-1"><input id="dmwsreferral_date_new'+refoutnewindex+'" name="dmwsreferral_date_dmwsreferral_id" class="datepicker form-control" value="2017-07-05">';
		insertrefout = insertrefout + '<input id="dmwsreferral_time_new'+actionnewindex+'" name="dmwsreferral_time_new'+actionnewindex+'" class="form-control" rows="1"></textarea>';
		insertrefout = insertrefout + '</div>';
		insertrefout = insertrefout + '<div class="col-sm-2">';
		insertrefout = insertrefout + '<select id="dmwsreferral_org_new'+refoutnewindex+'"  name="dmwsreferral_org_new'+refoutnewindex+'" class="form-control">';		
		var dmwsreferralorga = Get_Array_Hash('dmwsreferralorg');
		if (dmwsreferralorga.length >0) {
			for (var dmwsreferralorgi in dmwsreferralorga) {
				var dmwsreferralorgid = dmwsreferralorga[dmwsreferralorgi];
				Get_Data_Hash('dmwsreferralorg',dmwsreferralorgid);
				insertrefout = insertrefout + '<option value="'+dmwsreferralorgid+'" >'+GLOBALS['dmwsreferralorg_name']+'</option>';
			}
			insertrefout = insertrefout + '<option value="" selected></option>';
		} else {
			insertrefout = insertrefout + '<option value="" selected>No Outlet Classes Setup</option>';
		}		
		insertrefout = insertrefout + '</select >';
		insertrefout = insertrefout + '</div>';
		insertrefout = insertrefout + '<div class="col-sm-3"><textarea id="dmwsreferral_roleintervention_new'+refoutnewindex+'" name="dmwsreferral_roleintervention_new'+refoutnewindex+'" class="form-control" rows="3">intervention</textarea></div>';
		insertrefout = insertrefout + '<div class="col-sm-1">';
		insertrefout = insertrefout + '<input id="dmwsreferral_type_new'+refoutnewindex+'" name="dmwsreferral_type_new'+refoutnewindex+'" class="form-control" type="text" value="Specialist Organisation">';
		insertrefout = insertrefout + '<input id="dmwsreferral_fundingsecured_new'+refoutnewindex+'" name="dmwsreferral_fundingsecured_new'+refoutnewindex+'" class="form-control" type="text" value="£">'
		insertrefout = insertrefout + '</div>';
		insertrefout = insertrefout + '<div class="col-sm-1">';
		insertrefout = insertrefout + '<input type=hidden id="dmwsreferral_suconsent_new'+refoutnewindex+'" name="dmwsreferral_suconsent_new'+refoutnewindex+'" value="No">';
		insertrefout = insertrefout + '<div class="checkbox"><label><input type="checkbox" name="dmwsreferral_suconsent_new'+refoutnewindex+'" value="Yes" />&nbsp;</label></div>';
		insertrefout = insertrefout + '</div>';
		insertrefout = insertrefout + '<div class="col-sm-3">';
		insertrefout = insertrefout + '<select id="dmwsreferral_sufeedbacktype_new'+refoutnewindex+'"  name="dmwsreferral_sufeedbacktype_new'+refoutnewindex+'" class="form-control">';
		var dmwssufeedbacka = Get_Array_Hash('dmwssufeedbacktype');
		if (dmwssufeedbacka.length >0) {
			for (var dmwssufeedbacki in dmwssufeedbacka) {
				var dmwssufeedbackid = dmwssufeedbacka[dmwssufeedbacki];
				Get_Data_Hash('dmwssufeedbacktype',dmwssufeedbackid);
				insertrefout = insertrefout + '<option value="'+dmwssufeedbackid+'" >'+GLOBALS['dmwssufeedbacktype_name']+'</option>';
			}
			insertrefout = insertrefout + '<option value="" selected></option>';
		} else {
			insertrefout = insertrefout + '<option value="" selected>No Feedback Types Setup</option>';
		}		
		insertrefout = insertrefout + '<div class="col-sm-1">';
		insertrefout = insertrefout + '<button id="dmwsreferral_delete_new'+refoutnewindex+'" class="dmwsreferraldelete btn btn-danger" type="button" >x</button>';
		insertrefout = insertrefout + '</div>';
		insertrefout = insertrefout + '</div>';	
		insertrefout = insertrefout + '<input type=hidden id="dmwsreferral_endfield_new'+actionnewindex+'" name="dmwsreferral_endfield_new'+actionnewindex+'" value="">';
		insertrefout = insertrefout + '<hr/>';
		dmwsreferralida["new"+refoutnewindex] = "new"+refinnewindex;
		$( "#dmwsreferrallistend" ).before( insertrefout );
		dmwsreferraldeletelistener();
		formChanged();
		datepickerlistener();
	});	
	
	$('#dmwsaction_add_new').on('click', function(event) {
		actionnewindex++;
		var insertaction = "";	
		insertaction = insertaction + '<input type=hidden id="dmwsaction_startfield_new'+actionnewindex+'" name="dmwsaction_startfield_new'+actionnewindex+'" value="">';
		insertaction = insertaction + '<div class="row row-eq-height">';
		insertaction = insertaction + '<div class="col-sm-1"><input id="dmwsaction_date_new'+actionnewindex+'" name="dmwsaction_date_new'+actionnewindex+'" class="datepicker form-control" value="">';
		insertaction = insertaction + '<input id="dmwsaction_time_new'+actionnewindex+'" name="dmwsaction_time_new'+actionnewindex+'" class="form-control" rows="1"></textarea>';
		insertaction = insertaction + '</div>';
		insertaction = insertaction + '<div class="col-sm-3"><textarea id="dmwsaction_issue_new'+actionnewindex+'" name="dmwsaction_issue_new'+actionnewindex+'" class="form-control" rows="3"></textarea></div>';
		insertaction = insertaction + '<div class="col-sm-4"><textarea id="dmwsaction_action_new'+actionnewindex+'" name="dmwsaction_action_new'+actionnewindex+'" class="form-control" rows="3"></textarea></div>';
		insertaction = insertaction + '<div class="col-sm-2"><textarea id="dmwsaction_actiontakenby_new'+actionnewindex+'" name="dmwsaction_actiontakenby_new'+actionnewindex+'" class="form-control" rows="1"></textarea></div>';
		insertaction = insertaction + '<div class="col-sm-2"><input id="dmwsaction_completebydate_new'+actionnewindex+'" name="dmwsaction_completebydate_new'+actionnewindex+'" class="datepicker form-control" value=""></div>';
		insertaction = insertaction + '<div class="col-sm-2">';
		insertaction = insertaction + '<input type=hidden id="dmwsaction_consent_new'+actionnewindex+'" name="dmwsaction_consent_new'+actionnewindex+'" value="No">';
		insertaction = insertaction + '<div class="checkbox"><label><input type="checkbox" name="dmwsaction_consent_new'+actionnewindex+'" value="Yes" />&nbsp;</label></div>';
		insertaction = insertaction + '</div>';
		insertaction = insertaction + '<div class="col-sm-2">';
		insertaction = insertaction + '<select id="dmwsaction_timeband_new'+actionnewindex+'"  name="dmwsaction_timeband_new'+actionnewindex+'" class="form-control">';		
		var dmwsactiontimebanda = Get_Array_Hash('dmwstimeband');
		if (dmwsactiontimebanda.length >0) {
			for (var dmwsactiontimebandi in dmwsactiontimebanda) {
				var dmwsactiontimebandid = dmwsactiontimebanda[dmwsactiontimebandi];
				Get_Data_Hash('dmwstimeband',dmwsactiontimebandid);
				insertaction = insertaction + '<option value="'+dmwsactiontimebandid+'" >'+GLOBALS['dmwstimeband_name']+'</option>';
			}
			insertaction = insertaction + '<option value="" selected></option>';
		} else {
			insertaction = insertaction + '<option value="" selected>No Outlet Classes Setup</option>';
		}		
		insertaction = insertaction + '</select >';
		insertaction = insertaction + '</div>';
		insertaction = insertaction + '<div class="col-sm-2"><input id="dmwsaction_completiondate_new'+actionnewindex+'" name="dmwsaction_completiondate_" class="datepicker form-control" value=""></div>';
		insertaction = insertaction + '<div class="col-sm-1">';
		insertaction = insertaction + '<button id="dmwsaction_delete_new'+actionnewindex+'" class="dmwsactiondelete btn btn-danger" type="button" >x</button>';
		insertaction = insertaction + '<input type=hidden id="dmwsaction_endfield_new'+actionnewindex+'" name="dmwsaction_endfield_new'+actionnewindex+'" value="">';
		insertaction = insertaction + '</div>';
		insertaction = insertaction + '</div>';
		insertaction = insertaction + '<hr/>';
		dmwsactionida["new"+actionnewindex] = "new"+actionnewindex;
		$( "#dmwsactionlistend" ).before( insertaction );
		dmwsactiondeletelistener();
		formChanged();
		datepickerlistener();
	});			
	
	$('#dmwsserviceprovided_add_new').on('click', function(event) {
		//alert("listener active");
		servicenewindex++;
		var insertserviceprovided = "";		
		insertserviceprovided = insertserviceprovided + '<div class="row row-eq-height">';
		insertserviceprovided = insertserviceprovided + '<div class="col-sm-1"><input id="dmwsserviceprovided_date_new'+servicenewindex+'" name="dmwsserviceprovided_date_new'+servicenewindex+'" class="datepicker form-control" value=""></div>';
		insertserviceprovided = insertserviceprovided + '<div class="col-sm-2"><select id="dmwsservicetype_new'+refoutnewindex+'"  name="dmwsservicetype_new'+refoutnewindex+'" class="form-control"></div>';		
		var dmwsservicetypea = Get_Array_Hash('dmwsservicetype');
		if (dmwsservicetypea.length >0) {
			for (var dmwsservicetypei in dmwsservicetypea) {
				var dmwsservicetypeid = dmwsservicetypea[dmwsservicetypei];
				Get_Data_Hash('dmwsservicetype',dmwsservicetypeid);
				insertserviceprovided = insertserviceprovided + '<option value="'+dmwsservicetypeid+'" >'+GLOBALS['dmwsservicetype_name']+'</option>';
			}
			insertserviceprovided = insertserviceprovided + '<option value="" selected></option>';
		} else {
			insertserviceprovided = insertserviceprovided + '<option value="" selected>No Service Type Setup</option>';
		}
		insertserviceprovided = insertserviceprovided + '</select >';
		insertserviceprovided = insertserviceprovided + '</div>';
		insertserviceprovided = insertserviceprovided + '<div class="col-sm-3"><textarea id="dmwsserviceprovided_comment_new'+servicenewindex+'" name="dmwsserviceprovided_comment_new'+servicenewindex+'" class="form-control" rows="3"></textarea></div>';
		insertserviceprovided = insertserviceprovided + '<div class="col-sm-1">';
		insertserviceprovided = insertserviceprovided + '<button id="dmwsserviceprovided_delete_new'+servicenewindex+'" class="dmwsserviceprovideddelete btn btn-danger" type="button" >x</button>';
		insertserviceprovided = insertserviceprovided + '</div>';
		insertserviceprovided = insertserviceprovided + '</div>';
		insertserviceprovided = insertserviceprovided + '<hr/>';
		dmwserviceprovidedida["new"+servicenewindex] = "new"+servicenewindex;
		$( "#dmwsserviceprovidedlistend" ).before( insertserviceprovided );
		dmwsserviceprovideddeletelistener();
		formChanged();
		datepickerlistener();
	});				
	
	$('#dmwscomplexity_add_new').on('click', function(event) {
		complexnewindex++;
		var insertcomplex = "";		
		insertcomplex = insertcomplex + '<div class="row row-eq-height">';	
		insertcomplex = insertcomplex + '<div class="col-sm-2">';
		insertcomplex = insertcomplex + '<select id="dmwscomplexity_issuetype_new'+complexnewindex+'"  name="dmwsreferral_org_new'+complexnewindex+'" class="form-control">';		
		var dmwscomplexitytypea = Get_Array_Hash('dmwscomplexitytype');
		if (dmwscomplexitytypea.length >0) {
			for (var dmwscomplexitytypei in dmwscomplexitytypea) {
				var dmwscomplexitytypeid = dmwscomplexitytypea[dmwscomplexitytypei];
				Get_Data_Hash('dmwscomplexitytype',dmwscomplexitytypeid);
				insertcomplex = insertcomplex + '<option value="'+dmwscomplexitytypeid+'" >'+GLOBALS['dmwscomplexitytype_name']+'</option>';
			}
			insertcomplex = insertcomplex + '<option value="" selected></option>';
		} else {
			insertcomplex = insertcomplex + '<option value="" selected>No Complexity Types Setup</option>';
		}
		insertcomplex = insertcomplex + '</select >';
		insertcomplex = insertcomplex + '</div>';	
		
		insertcomplex = insertcomplex + '<div class="col-sm-6">';
		insertcomplex = insertcomplex + '<br><div class="complexityslider" id="dmwscomplexity_slider_new'+complexnewindex+'"></div></div>';
		insertcomplex = insertcomplex + '<div class="col-sm-1">';
		insertcomplex = insertcomplex + '<button id="dmwscomplexity_delete_new'+complexnewindex+'" class="dmwscomplexitydelete btn btn-danger" type="button" >x</button>';
		insertcomplex = insertcomplex + '</div>';
		insertcomplex = insertcomplex + '</div>';			
		insertcomplex = insertcomplex + '<input type=hidden id=dmwscomplexity_score_new'+complexnewindex +' name="dmwscomplexity_score_new'+complexnewindex +' value="">';
		insertcomplex = insertcomplex + '<hr/>';	
		dmwscomplexitytypea["new"+complexnewindex] = "new"+complexnewindex;
		$( "#dmwscomplexitylistend" ).before( insertcomplex );
	    $( '#dmwscomplexity_slider_new'+complexnewindex ).slider({
	        value:0,
	        min: 0,
	        max: 5,
	        step: 1,
	        change: function(event, ui) {         	
	        	countcomplexityscorewait(); 
	        }
	    });
	    $( '#dmwscomplexity_slider_new'+complexnewindex ).slider("pips", {
	          rest: "label",
	          labels: ["1.Little Impact","2","3","4","5","6.Major Impact"]
	    });
		dmwscomplexitydeletelistener();
		formChanged();
		countcomplexityscorewait();
	});	
	
	// ======== wellbeing tab setup =====================
	
	$('#wellbeingdatabuttons').hide();
	$('.wellbeingradio').hide();
	
	$('.wellbeingradio').on('click', function(event) {		
		var thisid = $(this).attr('id');
		$('#'+thisid+"_icon").removeClass();
		$('#'+thisid+"_icon").addClass("fa fa-check-square-o fa-2x");
		$('#'+thisid+"_icon").css("color", "red");
		countwellbeingscore();
		// currentwbarr();
	})	
	
	$('.wellbeingdatabutton').each(function () {			
		var thisid = $(this).attr('id');
		showwbdatatogglea[thisid] = "hide";
		// alert(thisid);
	});
	showwbdatatogglea[dmwsvisit_id] = "show"; 
	
	$('.wellbeingdatabutton').on('click', function(event) {	
		// id of wellbeingdatabutton is visitid.
		
		var thisid = $(this).attr('id');
		/*
		PS  This didnt work because the keys for the array are visitid - not integers.
		for ( var i = 0; i < showwbdatatogglea.length; i++) {
			showwbdatatogglea[i] = "hide";
		};
		*/
		if ( thisid != dmwsvisit_id ) {  // can only toggle previous visits			
			if ( showwbdatatogglea[thisid] == "show" ) {
				showwbdatatogglea[thisid] = "hide";  // simply toggle off 
			} else {				
				// This alternative loop  works though - by looping through the associateive array keys
				for (var visitid in showwbdatatogglea) { showwbdatatogglea[visitid] = "hide"; } // switch off all others just in case
				showwbdatatogglea[thisid] = "show";
			}
		}
		countwellbeingscore();
		
		$('.wellbeingdatabutton').each(function () {
			var thisid = $(this).attr('id');
			var ogcolour = $(this).css('border-top-color');
			$(this).css('border-bottom-width',"1px"); 
			$(this).css('border-bottom-color',ogcolour);
			if ( showwbdatatogglea[thisid] == "show" ) {
				$(this).css('border-bottom-width',"5px"); 
				$(this).css('border-bottom-color',"#f90606");
			}
		});			
	});
	
	function loadwellbeingticks() {		
		Check_Data_Hash('dmwswellbeing',dmwsvisit_id);
		if ( GLOBALS["IOWARNING"] == "0" ) {			
			$('.wellbeingradio').each(function () {			
				var thisid = $(this).attr('id');
				var fieldid = thisid.slice(0, -1);
				var thisval = parseInt($(this).val());					
				if (thisval == GLOBALS[fieldid]) {
					$('#'+thisid).click();
				}
			});
		//	$('#wellbeingdatabuttons').show();
		}
	
	}	
	
	// ======== progress tab setup =====================	

	var DMWSRadarChart = {
	  draw: function(id, tprevprogdataa, tthisprogdataa, options, showprevdata){
		  var cfg = {
			 radius: 5,
			 w: 600,
			 h: 600,
			 factor: 1,
			 factorLegend: .85,
			 levels: 3,
			 maxValue: 0,
			 radians: 2 * Math.PI,
			 opacityArea: 0.5,
			 ToRight: 5,
			 TranslateX: 80,
			 TranslateY: 30,
			 ExtraWidthX: 100,
			 ExtraWidthY: 100,
			 color: d3.scale.category10()
			};
			
			if('undefined' !== typeof options){
			  for(var i in options){
				if('undefined' !== typeof options[i]){
				  cfg[i] = options[i];
				}
			  }
			}
			cfg.maxValue = Math.max(cfg.maxValue, d3.max(tprevprogdataa, function(i){return d3.max(i.map(function(o){return o.value;}))}));
			var allAxis = (tprevprogdataa[0].map(function(i, j){return i.axis}));
			var total = allAxis.length;
			var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
			var Format = d3.format('%');
			d3.select(id).select("svg").remove();
			
			var g = d3.select(id)
					.append("svg")
					.attr("width", cfg.w+cfg.ExtraWidthX)
					.attr("height", cfg.h+cfg.ExtraWidthY)
					.append("g")
					.attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
					;
		
			var tooltip;
			
			//Circular segments
			for(var j=0; j<cfg.levels; j++){
			  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
			  g.selectAll(".levels")
			   .data(allAxis)
			   .enter()
			   .append("svg:line")
			   .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
			   .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
			   .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
			   .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
			   .attr("class", "line")
			   .style("stroke", "grey")
			   .style("stroke-opacity", "0.75")
			   .style("stroke-width", "1.3px")
			   .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
			}
		
			
			//Text indicating at what acore each level is
			for(var j=0; j<cfg.levels; j++){
			  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
			  g.selectAll(".levels")
			   .data([1]) //dummy data
			   .enter()
			   .append("svg:text")
			   .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
			   .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
			   .attr("class", "legend")
			   .style("font-family", "sans-serif")
			   .style("font-size", "10px")
			   .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
			   .attr("fill", "#737373")
		//	   .text(Format((j+1)));
			   .text(".."+(j+1));
			}
			
			series = 0;
		
			var axis = g.selectAll(".axis")
					.data(allAxis)
					.enter()
					.append("g")
					.attr("class", "axis");
		
			axis.append("line")
				.attr("x1", cfg.w/2)
				.attr("y1", cfg.h/2)
				.attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
				.attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
				.attr("class", "line")
				.style("stroke", "grey")
				.style("stroke-width", "1px");
		
			axis.append("text")
				.attr("class", "legend")
				.text(function(d){return d})
				.style("font-family", "sans-serif")
				.style("font-size", "11px")
				.attr("text-anchor", "middle")
				.attr("dy", "1.5em")
				.attr("transform", function(d, i){return "translate(0, -10)"})
				.attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-60*Math.sin(i*cfg.radians/total);})
				.attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});
		
		 
			if (showprevdata == "ShowPrevData") {
			
				tprevprogdataa.forEach(function(y, x){
				  dataValues = [];
				  g.selectAll(".nodes")
					.data(y, function(j, i){
					  dataValues.push([
						cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
						cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
					  ]);
					});
				  dataValues.push(dataValues[0]);
				  g.selectAll(".area")
								 .data([dataValues])
								 .enter()
								 .append("polygon")
								 .attr("class", "radar-chart-serie"+series)
								 .style("stroke-width", "2px")
								 .style("stroke", cfg.color(series))
								 .attr("points",function(tprevprogdataa) {
									 var str="";
									 for(var pti=0;pti<tprevprogdataa.length;pti++){
										 str=str+tprevprogdataa[pti][0]+","+tprevprogdataa[pti][1]+" ";
									 }
									 return str;
								  })
								 .style("fill", function(j, i){return cfg.color(series)})
								 .style("fill-opacity", cfg.opacityArea)
								 .on('mouseover', function (tprevprogdataa){
													z = "polygon."+d3.select(this).attr("class");
													g.selectAll("polygon")
													 .transition(200)
													 .style("fill-opacity", 0.1); 
													g.selectAll(z)
													 .transition(200)
													 .style("fill-opacity", .7);
												  })
								 .on('mouseout', function(){
													g.selectAll("polygon")
													 .transition(200)
													 .style("fill-opacity", cfg.opacityArea);
								 });
				  series++;
				});
				series=0;
				
				tprevprogdataa.forEach(function(y, x){
				  g.selectAll(".nodes")
					.data(y).enter()
					.append("svg:circle")
					.attr("class", "radar-chart-serie"+series)
					.attr('r', cfg.radius)
					.attr("alt", function(j){return Math.max(j.value, 0)})
					.attr("cx", function(j, i){
					  dataValues.push([
						cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
						cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
					]);
					return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
					})
					.attr("cy", function(j, i){
					  return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
					})
					.attr("data-id", function(j){return j.axis})
					.style("fill", cfg.color(series)).style("fill-opacity", .9)
					.on('mouseover', function (tprevprogdataa){
								newX =  parseFloat(d3.select(this).attr('cx')) - 10;
								newY =  parseFloat(d3.select(this).attr('cy')) - 5;
								
								tooltip
									.attr('x', newX)
									.attr('y', newY)
									.text(Format(tprevprogdataa.value))
									.transition(200)
									.style('opacity', 1);
									
								z = "polygon."+d3.select(this).attr("class");
								g.selectAll("polygon")
									.transition(200)
									.style("fill-opacity", 0.1); 
								g.selectAll(z)
									.transition(200)
									.style("fill-opacity", .7);
							  })
					.on('mouseout', function(){
								tooltip
									.transition(200)
									.style('opacity', 0);
								g.selectAll("polygon")
									.transition(200)
									.style("fill-opacity", cfg.opacityArea);
							  })
					.append("svg:title")
					.text(function(j){return Math.max(j.value, 0)});
			
				  series++;
				});
			}

			
			//Join up latest scores if polygon complete
			var thisdcount = 0;
			for(var ai=0; ai<10; ai++){				
				if ( tthisprogdataa[ai] >0 ) {
					thisdcount++;
				}
			}		
			
			if ( thisdcount == 10 ) {
				// alert("Complete");
				thisdataValues = [];
				for(var ai=0; ai<10; ai++){
				  // alert(tthisprogdataa[ai]);
				  thisdataValues.push([
					cfg.w/2*(1-(parseFloat(Math.max(tthisprogdataa[ai], 0))/cfg.maxValue)*cfg.factor*Math.sin(ai*cfg.radians/total)), 
					cfg.h/2*(1-(parseFloat(Math.max(tthisprogdataa[ai], 0))/cfg.maxValue)*cfg.factor*Math.cos(ai*cfg.radians/total))
				  ]);
				}  
				thisdataValues.push(thisdataValues[0]);
				// alert(thisdataValues);
				
				g.selectAll(".area")
					 .data([thisdataValues])
					 .enter()
					 .append("polygon")
					 // .attr("class", "radar-chart-serie1")
					 .style("stroke-width", "2px")
					 .style("stroke", "blue")
					.attr("points",function(tthisprogdataa) {
						 var str="";
						 for(var pti=0;pti<tthisprogdataa.length;pti++){
							 str=str+tthisprogdataa[pti][0]+","+tthisprogdataa[pti][1]+" ";
						 }
						 return str;
					  })	 
					 .style("fill", "transparent")				 
					 // .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
			}
				
			//Circular axis markers
			for(var j=0; j<cfg.levels; j++){
			  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
			  var level = j+1;
			  g.selectAll(".levels")
			  	.data(allAxis)
			  	.enter()	  
				.append("svg:circle")
				.attr("id", function(j, i){return "selectpoint_"+i+"_"+level})		
				.attr("class", "radar-chart-selectpoint")
				.attr('r', cfg.radius*2)
				.attr("alt", function(j){return Math.max(j.value, 0)})
				.attr("cx", function(j, i){return levelFactor*(1-cfg.factor*Math.sin((i)*cfg.radians/total));})
				.attr("cy", function(j, i){return levelFactor*(1-cfg.factor*Math.cos((i)*cfg.radians/total));})
				.style("fill", "#888888").style("fill-opacity", .3)
				.attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
			}
			
			for(var ai=0; ai<10; ai++){
				for(var vi=0; vi<5; vi++){			
					$('#'+"selectpoint_"+ai+"_"+(vi+1)).css({ 'fill': "#888888" });
					$('#'+"selectpoint_"+ai+"_"+(vi+1)).css({ 'fill-opacity': "0.3" });
				}				
				if ( tthisprogdataa[ai] >0 ) {
					$('#'+"selectpoint_"+ai+"_"+tthisprogdataa[ai]).css({ 'fill': "#0000FF" });
					$('#'+"selectpoint_"+ai+"_"+tthisprogdataa[ai]).css({ 'fill-opacity': "1.0" });
				}
			}
			
			$('.radar-chart-selectpoint').on('click', function(event) {
				currentselectpointid = $(this).attr("id");
				var ida = currentselectpointid.split("_");
				var thisaxis = ida[1];
				var thisvalue = ida[2];
				tthisprogdataa[thisaxis] = thisvalue;
				for(var vi=0; vi<5; vi++){			
					$('#'+"selectpoint_"+thisaxis+"_"+(vi+1)).css({ 'fill': "#888888" });
					$('#'+"selectpoint_"+thisaxis+"_"+(vi+1)).css({ 'fill-opacity': "0.3" });
				}		
				$('#'+currentselectpointid).css({ 'fill': "#0000FF" });
				$('#'+"selectpoint_"+thisaxis+"_"+thisvalue).css({ 'fill-opacity': "1.0" });
				redrawRadarChart();
				countprogressscore();
			});	
			
			//Tooltip
			tooltip = g.append('text')
					   .style('opacity', 0)
					   .style('font-family', 'sans-serif')
					   .style('font-size', '13px');
	  }
	};

	//============ Code executed on load =====================================	
	
	var w = 500,
	h = 500;
	$('.progdatabutton').each(function () {
		var thisid = $(this).attr('id');		
		toggledprogbuttonsa[thisid] = "hide";
	});
	
	var colorscale = d3.scale.category10();
	
	
	
	function loadprogressarray() {		
		
		prevprogdataa = [];
		thisprogdataa = [0,0,0,0,0,0,0,0,0,0];

		var progressvisitida = Get_Array_Hash('dmwsprogress');
		for (var pi in progressvisitida) {
			Get_Data_Hash('dmwsprogress',progressvisitida[pi]);
			// alert(progressvisitida[pi]+"  "+dmwsvisit_id);
			if (progressvisitida[pi] == dmwsvisit_id) {
				thisprogdataa[0] = GLOBALS['dmwsprogress_treatment'];
				thisprogdataa[1] = GLOBALS['dmwsprogress_health'];
				thisprogdataa[2] = GLOBALS['dmwsprogress_wellbeing'];
				thisprogdataa[3] = GLOBALS['dmwsprogress_family'];
				thisprogdataa[4] = GLOBALS['dmwsprogress_relationships'];
				thisprogdataa[5] = GLOBALS['dmwsprogress_housing'];				
				thisprogdataa[6] = GLOBALS['dmwsprogress_finance'];
				thisprogdataa[7] = GLOBALS['dmwsprogress_work'];
				thisprogdataa[8] = GLOBALS['dmwsprogress_social'];
				thisprogdataa[9] = GLOBALS['dmwsprogress_activities'];							
			} else {
				var da2 = [];
				var da3 = [];
				da3["axis"] = "Current Admission or Treatment";
				da3["value"] = GLOBALS['dmwsprogress_treatment'];
				da2.push(da3);
				var da3 = [];
				da3["axis"] = "General Health";
				da3["value"] = GLOBALS['dmwsprogress_health'];
				da2.push(da3);
				var da3 = [];
				da3["axis"] = "General Wellbeing";
				da3["value"] = GLOBALS['dmwsprogress_wellbeing'];
				da2.push(da3);		
				var da3 = [];
				da3["axis"] = "Family";
				da3["value"] = GLOBALS['dmwsprogress_family'];
				da2.push(da3);		
				var da3 = [];
				da3["axis"] = "Relationships";
				da3["value"] = GLOBALS['dmwsprogress_relationships'];
				da2.push(da3);		
				var da3 = [];
				da3["axis"] = "Housing";
				da3["value"] = GLOBALS['dmwsprogress_housing'];
				da2.push(da3);		
				var da3 = [];
				da3["axis"] = "Finance";
				da3["value"] = GLOBALS['dmwsprogress_finance'];
				da2.push(da3);
				var da3 = [];
				da3["axis"] = "Work";
				da3["value"] = GLOBALS['dmwsprogress_work'];
				da2.push(da3);	
				var da3 = [];
				da3["axis"] = "Social Life";
				da3["value"] = GLOBALS['dmwsprogress_social'];
				da2.push(da3);
				var da3 = [];
				da3["axis"] = "Activities";
				da3["value"] = GLOBALS['dmwsprogress_activities'];
				da2.push(da3);
				prevprogdataa.push(da2);
			
			}
		}				
		DMWSRadarChart.draw("#chart", prevprogdataa, thisprogdataa, myradarchartcfg, "HidePrevData");
	}
	
	$('.progdatabutton').on('click', function(event) {
		sprevprogdataa = [];
		var thisid = $(this).attr('id');
		var ogbuttoncolour = $(this).css('border-top-color'); 
		//alert ($(this).css('border-bottom-width'));
		if ( showprevprogdatatoggle == "0" ) { 
			showprevprogdatatoggle = "1";
			 $(this).css('border-bottom-width',"5px"); 
			 $(this).css('border-bottom-color',"#f90606");
			 toggledprogbuttonsa[thisid] = "show";
			 var progressvisitida = Get_Array_Hash('dmwsprogress');
			 for ( var s in progressvisitida ) {
				 var progdatavisitid = progressvisitida[s];			 
				 if (toggledprogbuttonsa[progdatavisitid] = "show") {
					Get_Data_Hash('dmwsprogress',progdatavisitid);
					var da2 = [];
					var da3 = [];
					da3["axis"] = "Current Admission or Treatment";
					da3["value"] = GLOBALS['dmwsprogress_treatment'];
					da2.push(da3);
					var da3 = [];
					da3["axis"] = "General Health";
					da3["value"] = GLOBALS['dmwsprogress_health'];
					da2.push(da3);
					var da3 = [];
					da3["axis"] = "General Wellbeing";
					da3["value"] = GLOBALS['dmwsprogress_wellbeing'];
					da2.push(da3);		
					var da3 = [];
					da3["axis"] = "Family";
					da3["value"] = GLOBALS['dmwsprogress_family'];
					da2.push(da3);		
					var da3 = [];
					da3["axis"] = "Relationships";
					da3["value"] = GLOBALS['dmwsprogress_relationships'];
					da2.push(da3);		
					var da3 = [];
					da3["axis"] = "Housing";
					da3["value"] = GLOBALS['dmwsprogress_housing'];
					da2.push(da3);		
					var da3 = [];
					da3["axis"] = "Finance";
					da3["value"] = GLOBALS['dmwsprogress_finance'];
					da2.push(da3);
					var da3 = [];
					da3["axis"] = "Work";
					da3["value"] = GLOBALS['dmwsprogress_work'];
					da2.push(da3);	
					var da3 = [];
					da3["axis"] = "Social Life";
					da3["value"] = GLOBALS['dmwsprogress_social'];
					da2.push(da3);
					var da3 = [];
					da3["axis"] = "Activities";
					da3["value"] = GLOBALS['dmwsprogress_activities'];
					da2.push(da3);
					sprevprogdataa.push(da2);		
				 }

			 }
			DMWSRadarChart.draw("#chart", prevprogdataa, thisprogdataa, myradarchartcfg, "ShowPrevData");
		} else { 
			showprevprogdatatoggle = "0";
			 $(this).css('border-bottom-width',"1px");
			 $(this).css('border-bottom-color',ogbuttoncolour);
			 toggledprogbuttonsa[thisid] = "hide";
			DMWSRadarChart.draw("#chart", prevprogdataa, thisprogdataa, myradarchartcfg, "HidePrevData");
	
		}
	})
	

	function redrawRadarChart() {		
		if ( showprevprogdatatoggle == "0" ) { 
			DMWSRadarChart.draw("#chart", prevprogdataa, thisprogdataa, myradarchartcfg, "HidePrevData");
		} else { 
			DMWSRadarChart.draw("#chart", prevprogdataa, thisprogdataa, myradarchartcfg, "ShowPrevData");
		}		
	}	
	
	// tab management.
	
    $('a[-toggle="tab"]').on('shown.bs.tab', function(e){
        var currentTab = $(e.target).attr('href'); // get current tab
        var currentTab = currentTab.replace("#", "");
        $('#CurrentTab').val(currentTab);
    });	
    
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	  var target = $(e.target).attr("href") // activated tab
	  if (target == "#COMPLEX") { countcomplexityscorewait(); }
	});
    
    // ======================== get data required by this page ================================
	setupWait(); 
	
	function handleDataRequestSuccess(data, status) {
	    // alert(data);
		if(data != undefined){
			// $('#TRACETEXT').html(data); 
			Create_Hashes(data);
			
			// Create_LocalStorage(data);
			stopWait();
			
			datepickerlistener();
			recalclistener();
			dmwsreferrerupdatedeletelistener();
			dmwsreferraldeletelistener();
			dmwsserviceprovideddeletelistener();
			dmwsactiondeletelistener();
			loadwellbeingticks();
			countwellbeingscore();
			loadprogressarray();
			countprogressscore();
			complexitysliderlistener();
			dmwscomplexitydeletelistener();
			countcomplexityscorewait();
		}
		stopWait();	 
	}
	 
	function handleDataRequestFailure(xhr, reason, ex) {
		 messagealert("Error Reason = "+"|"+xhr+"|"+reason+"|"+ex+"|");
		 // messagealert("You are not connected to the internet at this time");
	} 
	  	
	// var datarequestlist = "dmwsreferralorg,dmwscomplexitytype";
	var datarequestlist = "";
	
	datarequestlist = datarequestlist + "dmwsaction[rootkey="+dmwssu_id+"]" + ",";
	datarequestlist = datarequestlist + "dmwsadmissionreason" + ",";
	datarequestlist = datarequestlist + "dmwsadmissiontype" + ",";
	datarequestlist = datarequestlist + "dmwscomplexity[rootkey="+dmwssu_id+"]" + ",";
 	datarequestlist = datarequestlist + "dmwscomplexitytype" + ",";
 	datarequestlist = datarequestlist + "dmwscontacttype" + ",";
 	datarequestlist = datarequestlist + "dmwscontract" + ",";
 	datarequestlist = datarequestlist + "dmwsgender" + ",";
 	datarequestlist = datarequestlist + "dmwsitemprovided" + ",";
 	datarequestlist = datarequestlist + "dmwslocationtype" + ",";
 	datarequestlist = datarequestlist + "dmwsprogress[rootkey="+dmwssu_id+"]" + ",";
 	datarequestlist = datarequestlist + "dmwsreferral[rootkey="+dmwssu_id+"]" + ",";
 	datarequestlist = datarequestlist + "dmwsreferralorg" + ",";
 	datarequestlist = datarequestlist + "dmwssufeedbacktype" + ",";	
 	datarequestlist = datarequestlist + "dmwsreferrerupdate[rootkey="+dmwssu_id+"]" + ",";
 	datarequestlist = datarequestlist + "dmwsservice" + ",";
 	datarequestlist = datarequestlist + "dmwsserviceprovided[rootkey="+dmwssu_id+"]" + ",";
 	datarequestlist = datarequestlist + "dmwsservicestatus" + ",";
 	datarequestlist = datarequestlist + "dmwsservicetype" + ",";
 	datarequestlist = datarequestlist + "dmwssu" + ",";
 	datarequestlist = datarequestlist + "dmwssux" + ",";
 	datarequestlist = datarequestlist + "dmwstimeband" + ",";
 	datarequestlist = datarequestlist + "dmwstitle" + ",";
 	datarequestlist = datarequestlist + "dmwsvisit[rootkey="+dmwssu_id+"]" + ",";
 	datarequestlist = datarequestlist + "dmwsvisitlocation" + ",";
 	datarequestlist = datarequestlist + "dmwswellbeing[rootkey="+dmwssu_id+"]";
	startWait("Loading");
	var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_javascriptdataprovider.php";
	// alert(sUrl);
	// alert(datarequestlist);	
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
	     type: "POST",
	     dataType: "text",
	     timeout: 10000,
	     success: handleDataRequestSuccess,	        
	     error: handleDataRequestFailure
	});	

});

// ================ functions ========================

function BackToMenu() {
	var sUrl = JSSitePHPURL()+"/v1_personreloginin.php"+STDPARMS();	 
	window.location.replace(sUrl); 
}

function formChanged() {
	if ( person_userlevel > "1") {
		$('#dmwssuupdateform').trigger('checkform.areYouSure');
	} else {
		alert("Warning: You are not authorised to save any changes you may make.");			
	}
}	

function datepickerlistener() { 	
   	$('.datepicker').datepicker({
	    startDate: '-3d',
	    format: 'dd/mm/yyyy'
	});		
}

function complexitysliderlistener() {
	
    $( ".complexityslider" ).slider({
        value:0,
        min: 0,
        max: 5,
        step: 1,
        change: function(event, ui) {         	
        	countcomplexityscorewait(); 
        }
    });
    $( ".complexityslider" ).slider("pips", {
          rest: "label",
          labels: ["1.Little Impact","2","3","4","5","6.Major Impact"]
    });
}

function countcomplexityscorewait() {
	// this allows the slider to be drawn before processing
	setTimeout(countcomplexityscore, 100);
	
}

function recalclistener() {
	$('.calcres').on('click', function(event) {
		$(this).css('background-color', 'red');
		thisid = $(this).attr('id');
		setTimeout(
				  function() 
				  {
					  $('#'+thisid).css('background-color', 'lightgray');
				  }, 100);
	});

	$('.calcrespercent').on('click', function(event) {
		$(this).css('background-color', 'red');
		thisid = $(this).attr('id');
		setTimeout(
				  function() 
				  {
					  $('#'+thisid).css('background-color', 'lightgray');
				  }, 100);
	});
	
	
	$('.calcin').change( function() {	
		// alert("This is a input to calculation field");		
		if ( $( this ).val() == "") { $( this ).val("0");  }
		if ( $( this ).val() == "NaN") { $( this ).val("0");  }			
		
		$('.calcin').each(function() {
		    var id = $(this).attr("id");	    
		    var ida = id.split("_");
		    if (ida[0] == "corresi") { corresiida[ida[2]] = ida[2]; }
		    if (ida[0] == "corcomm") { corcommida[ida[2]] = ida[2]; } 			    
		    if (ida[0] == "corsurvey") { corsurveyida[ida[2]] = ida[2]; }			    
		});
		
		recalc();
		
	});	

	$('.calcinpercent').change( function() {	
		// alert("This is a input to calculation field");
		if ( $( this ).val() == "") { $( this ).val("0");  }
		if ( $( this ).val() == "NaN") { $( this ).val("0");  }					

		$('.calcin').each(function() {
		    var id = $(this).attr("id");			    
		    var ida = id.split("_");
		    if (ida[0] == "corresi") { corresiida[ida[2]] = ida[2]; }
		    if (ida[0] == "corcomm") { corcommida[ida[2]] = ida[2]; }			    
		    if (ida[0] == "corsurvey") { corsurveyida[ida[2]] = ida[2]; }			    
		});
		
		recalc();
		
	});								
	
	$('.rag').change( function() {			
		var thisid = $(this).attr('id');
		var backcolor = "white";
		if ($(this).val() == "Y") { var backcolor = "#b3ffd9"; }
		if ($(this).val() == "Yes") { var backcolor = "#b3ffd9"; }			
		if ($(this).val() == "Green") { var backcolor = "#b3ffd9"; }
		if ($(this).val() == "Amber") { var backcolor = "#ffd65c"; }
		if ($(this).val() == "N") { var backcolor = "#ff9999"; }
		if ($(this).val() == "No") { var backcolor = "#ff9999"; }			
		if ($(this).val() == "Red") { var backcolor = "#ff9999"; }
		$(this).css('background-color', backcolor);
	});	
}	

function dmwsreferrerupdatedeletelistener() {
	$('.dmwsreferrerupdatedelete').on('click', function(event) {			
		formChanged();
		var result = confirm("Do you want to delete this entry?");
		if (result) {
		    var id = $(this).attr("id");
			$(this).parent().parent().remove();	
		}			
	})	
}	

function dmwsreferraldeletelistener() {
	$('.dmwsreferraldelete').on('click', function(event) {			
		formChanged();
		var result = confirm("Do you want to delete this entry?");
		if (result) {
		    var id = $(this).attr("id");
			$(this).parent().parent().remove();
		}			
	})	
}		

function dmwsactiondeletelistener() {
	$('.dmwsactiondelete').on('click', function(event) {			
		formChanged();
		var result = confirm("Do you want to delete this entry?");
		if (result) {
		    var id = $(this).attr("id");
			$(this).parent().parent().remove();	
		}			
	})	
}	


function dmwsserviceprovideddeletelistener() {
	$('.dmwsserviceprovideddelete').on('click', function(event) {			
		formChanged();
		var result = confirm("Do you want to delete this entry?");
		if (result) {
		    var id = $(this).attr("id");
			$(this).parent().parent().remove();	
		}			
	})	
}


function dmwscomplexitydeletelistener() {
	$('.dmwscomplexitydelete').on('click', function(event) {			
		formChanged();
		var result = confirm("Do you want to delete this entry?");
		if (result) {
			var idbits = $(this).attr('id').split('_');
			$('#dmwscomplexity_issuescore_'+idbits[2]).remove();
			delete complexityslidervaluea['dmwscomplexity_issuescore_'+idbits[2]];			
		    var id = $(this).attr("id");
			$(this).parent().parent().remove();	
		}			
	})	
}		

// ================ CHART COUNTING ROUTINES ===========================

function countwellbeingscore() {
	wellbeingScore = 0;
	// alert("countwellbeingscore");
	
	// Step 0: identify previous wellbeing data to be  shown	
	showprevwbdatatoggle = "0";	
	for (var visitid in showwbdatatogglea) {
		if (visitid != dmwsvisit_id) {	
		    if ( showwbdatatogglea[visitid] == "show" ) {
	    		showprevwbdatatoggle = "1";
	    		Get_Data_Hash('dmwswellbeing',visitid);
		    }
		}
	}

	// Step 1: reset grid to base values plus previous values
	$('.wellbeingradio').each(function () {		
		var thisid = $(this).attr('id');
		var thisval = parseInt($(this).val());		
		if ( showprevwbdatatoggle == "0" ) { 
			var prevval = -1; 
		} else {
			var fieldid = thisid.replace(thisval, "");
			var prevval = GLOBALS[fieldid];
			// alert(thisid+" "+fieldid+" "+thisval+" "+prevval);		
		}
		$('#'+thisid+"_icon").removeClass();	
		$('#'+thisid+"_icon").css("color", "silver");
		if ( thisval == prevval ) {			
			$('#'+thisid+"_icon").addClass("fa fa-check-square-o fa-2x");
		} else {
			$('#'+thisid+"_icon").addClass("fa fa-square-o fa-2x");
		}
	});	
	
	// Step 2: Update grid with latest checked radio button	
	$('.wellbeingradio').each(function () {			
		var thisid = $(this).attr('id');
		var thisval = parseInt($(this).val());		
		if ( showprevwbdatatoggle == "0" ) { 
			var prevval = -1; 
		} else {
			var fieldid = thisid.replace(thisval, "");
			var prevval = GLOBALS[fieldid];	
		}	
		if ($(this).is(':checked')) {
			$('#'+thisid+"_icon").removeClass();
			$('#'+thisid+"_icon").addClass("fa fa-check-square-o fa-2x");								
			if (prevval == -1) {
				$('#'+thisid+"_icon").css("color", "blue");						
			} else {
				if (thisval < prevval) {
					$('#'+thisid+"_icon").css("color", "red");							
				}
				if (thisval == prevval) {
					$('#'+thisid+"_icon").css("color", "blue");							
				}					
				if (thisval > prevval) {
					$('#'+thisid+"_icon").css("color", "green");							
				}					
			}
			var thisval = parseInt($(this).val());				
			wellbeingScore = wellbeingScore + thisval;
			}
	});		

	//alert("FINAL "+wellbeingScore);//
	 if ($('input:radio:checked').length == 12) {
		 $('#dmwswellbeingmessage').hide();
		 $('#wellbeingdatabuttons').show();	 		
	 };
	
	 $('#dmwswellbeingscore').val(wellbeingScore);
	
}	

function countprogressscore() {
	progressScore = 0;
	$('.radar-chart-selectpoint').each(function () {
		var thisop = $(this).css('fill-opacity');
		if (thisop == 1) {
		var thisprogid = $(this).attr('id');
		var thisprogvals = thisprogid.split("_");
		//alert(thisprogvals[2]);
		progressScore = progressScore + parseInt(thisprogvals[2]);
		};		
	}
);		
		$('#dmwsprogress_score').val(progressScore);	
}


/*function redrawRadarChart() {
	var showdatabuttontext = $('#ShowDataButton').html();
	if (showdatabuttontext == "Show Previous Data" ) {
		DMWSRadarChart.draw("#chart", prevprogdataa, thisprogdataa, myradarchartcfg, "HidePrevData");
	} else {
		DMWSRadarChart.draw("#chart", prevprogdataa, thisprogdataa, myradarchartcfg, "ShowPrevData");
	}
};*/

function countcomplexityscore() {
	complexityissuecount = 0;
	complexityscore = 0;
	// alert("countcomplexityscore");
	
	$('.complexityslider').each(function () {
		complexityissuecount++;
		var thisval = $(this).slider("option", "value");			
		complexityscore = complexityscore + (complexityweightinga[thisval+1]);
		// alert(complexityscore);	
		var idbits = $(this).attr('id').split('_');
		$('#dmwscomplexity_issuescore_'+idbits[2]).val(thisval+1);	
		complexityslidervaluea['dmwscomplexity_slider_'+idbits[2]] = thisval+1;
		// alert('#dmwscomplexity_issuescore_'+idbits[2]+" = "+(thisval+1));
	});
	complexityscore = complexityscore * complexityextraweightinga[complexityissuecount];
	// alert("FINAL "+complexityscore);//
	$('#dmwscomplexityscore').val(complexityscore.toFixed(1));
	if (complexityscore > 0) {
	    complexitybackdropposition = $('#complexitybackdrop').offset(); 
	    
	    xmin = 140; xmax = 640; 
	    ymin = 635; 
	    yval = ymin - (complexityissuecount*100);
	    var minmaxratio = (complexityscore - complexityscoremin[complexityissuecount])/(complexityscoremax[complexityissuecount]-complexityscoremin[complexityissuecount]) ;
	    xval = xmin + ((xmax-xmin)*minmaxratio) ;
	    // alert(complexityscore+" "+complexityscoremin[complexityissuecount]+" "+complexityscoremax[complexityissuecount]+" "+minmaxratio);
	    $('#complexitymarker').css({
		    position : 'absolute',
		    top : complexitybackdropposition.top + yval,
		    left : complexitybackdropposition.left + xval,
		    width : 30,
		    height : 30,
		    "background-color" : "white",
		    "border" : "5px solid blue"	    
	    });
	    $('#complexitymarker').show();
	} else {
		$('#complexitymarker').hide();		
	}
}

// =========== LOCAL STORAGE PROCESSING ====================

function Create_LocalStorage (datastring) {
	 // alert("DATASTRING - "+datastring);
	 //	if (JSPersonId() == "bbra") { alert("Create_Hashes"); }	
	 // if (JSPersonId() == "bbra") { document.getElementById("updateLog").innerHTML = "Create_Hashes called - "+datastring; }
	 // if( $('#TRACETEXT').length ) {
	 //	 if (JSPersonId() == "bbra") { document.getElementById("TRACETEXT").innerHTML = "Create_Hashes called - "+datastring; }
	 // }
	
	localStorage.clear();
	 var dataRequestRecords = datastring.split("^");
	 var datatype = "";
	 for (var k in dataRequestRecords) {
		  var dataRequestSplit = dataRequestRecords[k].split("|");
		  var dataRequestHeaderData = dataRequestSplit[0];
		  var dataRequestData = dataRequestRecords[k].replace(dataRequestHeaderData+"|",""); 
		  if (dataRequestHeaderData.indexOf("_paired") != -1) {
		   datatype = dataRequestHeaderData.replace("_paired",""); 	  
		   GLOBALS[datatype+"^PAIRED"] = dataRequestSplit[1];
		   localStorage.setItem(datatype+"^PAIRED", dataRequestSplit[1]);
		  }
		  if (dataRequestHeaderData.indexOf("_keys") != -1) {
		   datatype = dataRequestHeaderData.replace("_keys",""); 	  
		   GLOBALS[datatype+"^KEYS"] = dataRequestSplit[1];
		   localStorage.setItem(datatype+"^KEYS", dataRequestSplit[1]);
		  }
		  if (dataRequestHeaderData.indexOf("_rootkey") != -1) {
		   datatype = dataRequestHeaderData.replace("_rootkey",""); 	  
		   GLOBALS[datatype+"^ROOTKEY"] = dataRequestSplit[1];
		   localStorage.setItem(datatype+"^ROOTKEY", dataRequestSplit[1]);
		  }
		  dataRequestSplit.shift(); // remove domainid  
		  if (dataRequestHeaderData.indexOf("_header") != -1) { 
		   datatype = dataRequestHeaderData.replace("_header","");  
		   var tstring = ""; var sep = "" ;
		   for (var i in dataRequestSplit) {	
			tstring = tstring+sep+dataRequestSplit[i]; sep = "|";	
		   }
		   GLOBALS[datatype+"^FIELDS"] = tstring;
		   localStorage.setItem(datatype+"^FIELDS", tstring);
		   if (GLOBALS[datatype+"^KEYS"] == "1") {keyindex = 0;}    
		   if (GLOBALS[datatype+"^KEYS"] == "2") {keyindex = 1;} 
		   if (GLOBALS[datatype+"^KEYS"] == "3") {keyindex = 2;} 
		   GLOBALS[datatype+"^INDEX"] = ""; indexsep="";
		  } 	
		  if (dataRequestHeaderData.indexOf("_data") != -1) { 
		   datatype = dataRequestHeaderData.replace("_data","");
		   // alert(datatype+"^"+dataRequestSplit[keyindex]+"^DATA"+ " - "+keyindex+ " - "+dataRequestData);   
		   GLOBALS[datatype+"^"+dataRequestSplit[keyindex]+"^DATA"] = dataRequestData;
		   localStorage.setItem(datatype+"^"+dataRequestSplit[keyindex]+"^DATA", dataRequestData);
		   GLOBALS[datatype+"^INDEX"] = GLOBALS[datatype+"^INDEX"]+indexsep+dataRequestSplit[keyindex]; indexsep="|";
		   localStorage.setItem(datatype+"^INDEX", GLOBALS[datatype+"^INDEX"]);
		  }
		  
		  if (dataRequestHeaderData.indexOf("trace_info") != -1) { } // no action used for trace 
	 }
	 GLOBALS["DATALOADED"] = "Yes"; 
	 // if (JSPersonId() == "bbra") { alert(GLOBALS["person^INDEX"]); }
}

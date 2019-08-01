$(document).ready( function() { 
	alert("SS");	
	var refinnewindex = 0;
	var refoutnewindex = 0;	
	var actionnewindex = 0;
	var complexnewindex = 0;
	var complexityIndexMax = 0;	
	var complexityScore = 0;
	
	var dmwsreferrerupdateida = new Array();
	var dmwsreferralida = new Array();	
	var dmwsactionida = new Array();
	var dmwscomplexityida = new Array();
	var complexityweightinga = new Array(1,1.1,1.25,1.5,2,3);
	var complexityextraweightinga = new Array(1,1.1,1.25,1.5,2,3,4,5,6);
	
	var currenttextareaopenid = "";
	
	var dmwsvisittype = $('#dmwsvisittype').val();
	var dmwsuserlevel = $('#dmwsuserlevel').val();	
	
	document.title = $('#TabTitle').val();
	
	$('#dmwssuupdateform').areYouSure( 
		{'message':'Are you sure you want to close this site without saving? (Updates may be lost)'} // doesnt override browser default message !!
	);
	

	$('#Save').on('click', function(event) {
	    alert("Save");
		if ( dmwsuserlevel > "1") {
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
	
	function BackToMenu() {
		var sUrl = JSSitePHPURL()+"/v1_personreloginin.php"+STDPARMS();	 
		window.location.replace(sUrl); 
	}		
	
	$('#SaveClose').on('click', function(event) {
		if ( dmwsuserlevel > "1") {
			$('[name=SubmitAction]').val('SaveClose');
			$("#dmwssuupdateform").submit();								
		} else {
			alert("Sorry: You are not authorised to make changes.");
		}			
	});		

	$('input[type="text"]').keypress(function (e) {
	    var code = e.keyCode || e.which;
	    if (code === 13)
	    e.preventDefault();  // stop form submission on enter
	});
	
	/*	
	
	$("#newsurveypopup").dialog({
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
		autoOpen: false,
		width: "30%",
		overflow:"auto"
	});	
	*/
	
	
	$('.form-control').on('click', function(event) {		
		formChanged();
	});	
	
	$('.slimimageupdatebutton').on('click', function(event) {		
		formChanged();
	});
	$('.slimimageremovebutton').on('click', function(event) {		
		formChanged();
	});	
	
	function formChanged() {
		if ( dmwsuserlevel > "1") {
			$('#dmwssuupdateform').trigger('checkform.areYouSure');
		} else {
			alert("Warning: You are not authorised to save any changes you may make.");			
		}
	}		
	
	$('.form-control').change( function() {	
		var intext = $(this).val();
		if (intext.includes('http:')){ $(this).val(intext.replace('http:', ''));}
		if (intext.includes('https:')){ $(this).val(intext.replace('https:', ''));}
	});				

	$('#dmwsreferrerupdate_add_new').on('click', function(event) {
		refinnewindex++;
		var insertrefin = "";
		insertrefin = insertrefin + '<div class="row row-eq-height">';
		insertrefin = insertrefin + '<div class="col-sm-1"><input id="dmwsreferrerupdate_date_new'+refinnewindex+'" name="dmwsreferrerupdate_date_new'+refinnewindex+'" class="datepicker form-control" value=""></div>';
		insertrefin = insertrefin + '<div class="col-sm-2"><input id="dmwsreferrerupdate_personid_new'+refinnewindex+'" name="dmwsreferrerupdate_personid_new'+refinnewindex+'" class="form-control" type="text" value=""></div>';
		insertrefin = insertrefin + '<div class="col-sm-2"><input id="dmwsreferrerupdate_contactref_new'+refinnewindex+'" name="dmwsreferrerupdate_contactref_new'+refinnewindex+'" class="form-control" type="text" value=""></div>';
		insertrefin = insertrefin + '<div class="col-sm-3"><textarea id="dmwsreferrerupdate_statusupdate_new'+refinnewindex+'" name="dmwsreferrerupdate_statusupdate_new'+refinnewindex+'" class="form-control" rows="3"></textarea></div>';
		insertrefin = insertrefin + '<div class="col-sm-3"><textarea id="dmwsreferrerupdate_response_new'+refinnewindex+'" name="dmwsreferrerupdate_response_new'+refinnewindex+'" class="form-control" rows="3"></textarea></div>';		
		insertrefin = insertrefin + '<div class="col-sm-1">';
		insertrefin = insertrefin + '<button id="dmwsreferrerupdate_delete_new'+refinnewindex+'" type="button" class="dmwsreferrerupdatedelete btn btn-danger">x</button>';
		insertrefin = insertrefin + '</div>';
		insertrefin = insertrefin + '</div>';
		dmwsreferrerupdateida["new"+refinnewindex] = "new"+refinnewindex;
		$( "#dmwsreferrerupdatelistend" ).before( insertrefin );
		dmwsreferrerupdatedeletelistener();
		formChanged();
	});
	
	$('#dmwsreferral_add_new').on('click', function(event) {
		refoutnewindex++;
		var insertrefout = "";	
		insertrefout = insertrefout + '<div class="row row-eq-height">';
		insertrefout = insertrefout + '<div class="col-sm-1"><input id="dmwsreferral_date_new'+refoutnewindex+'" name="dmwsreferral_date_dmwsreferral_id" class="datepicker form-control" value="2017-07-05"></div>';
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
		insertrefout = insertrefout + '<div class="col-sm-1"><input id="dmwsreferral_type_new'+refoutnewindex+'" name="dmwsreferral_type_new'+refoutnewindex+'" class="form-control" type="text" value="type"></div>';
		insertrefout = insertrefout + '<div class="col-sm-1"><input id="dmwsreferral_suconsent_new'+refoutnewindex+'" name="dmwsreferral_suconsent_new'+refoutnewindex+'" class="form-control" type="text" value="consent"></div>';
		insertrefout = insertrefout + '<div class="col-sm-3"><textarea id="dmwsreferral_sufeedback_new'+refoutnewindex+'" name="dmwsreferral_sufeedback_new'+refoutnewindex+'" class="form-control" rows="3">feedback</textarea></div>';
		insertrefout = insertrefout + '<div class="col-sm-1">';
		insertrefout = insertrefout + '<button id="dmwsreferral_delete_new'+refoutnewindex+'" class="dmwsreferraldelete btn btn-danger" type="button" >x</button>';
		insertrefout = insertrefout + '</div>';
		insertrefout = insertrefout + '</div>';	
		dmwsreferralida["new"+refoutnewindex] = "new"+refinnewindex;
		$( "#dmwsreferrallistend" ).before( insertrefout );
		dmwsreferraldeletelistener();
		formChanged();
	});	
	
	$('#dmwsaction_add_new').on('click', function(event) {
		actionnewindex++;
		var insertaction = "";		
		insertaction = insertaction + '<div class="row row-eq-height">';
		insertaction = insertaction + '<div class="col-sm-1"><input id="dmwsaction_date_new'+actionnewindex+'" name="dmwsaction_date_new'+actionnewindex+'" class="datepicker form-control" value=""></div>';
		insertaction = insertaction + '<div class="col-sm-3"><textarea id="dmwsaction_issue_new'+actionnewindex+'" name="dmwsaction_issue_new'+actionnewindex+'" class="form-control" rows="3"></textarea></div>';
		insertaction = insertaction + '<div class="col-sm-4"><textarea id="dmwsaction_action_new'+actionnewindex+'" name="dmwsaction_action_new'+actionnewindex+'" class="form-control" rows="3"></textarea></div>';
		insertaction = insertaction + '<div class="col-sm-1"><input id="dmwsaction_consent_new'+actionnewindex+'" name="dmwsaction_consent_new'+actionnewindex+'" class="form-control" type="text" value=""></div>';
		insertaction = insertaction + '<div class="col-sm-1"><input id="dmwsaction_timeband_new'+actionnewindex+'" name="dmwsaction_timeband_new'+actionnewindex+'" class="form-control" type="text" value=""></div>';
		insertaction = insertaction + '<div class="col-sm-1"><input id="dmwsaction_callout_new'+actionnewindex+'" name="dmwsaction_callout_" class="form-control" type="text" value=""></div>';
		insertaction = insertaction + '<div class="col-sm-1">';
		insertaction = insertaction + '<button id="dmwsaction_delete_new'+actionnewindex+'" class="dmwsactiondelete btn btn-danger" type="button" >x</button>';
		insertaction = insertaction + '</div>';
		insertaction = insertaction + '</div>';
		dmwsactionida["new"+actionnewindex] = "new"+actionnewindex;
		$( "#dmwsactionlistend" ).before( insertaction );
		dmwsactiondeletelistener();
		formChanged();
	});			
	
	$('#dmwsreferral_add_new').on('click', function(event) {
		refoutnewindex++;
		var insertrefout = "";	
		insertrefout = insertrefout + '<div class="row row-eq-height">';
		insertrefout = insertrefout + '<div class="col-sm-1"><input id="dmwsreferral_date_new'+refoutnewindex+'" name="dmwsreferral_date_dmwsreferral_id" class="datepicker form-control" value="2017-07-05"></div>';
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
			insertrefout = insertrefout + '<option value="" selected>No Referral Organisations Setup</option>';
		}		
		insertrefout = insertrefout + '</select >';
		insertrefout = insertrefout + '</div>';
		insertrefout = insertrefout + '<div class="col-sm-3"><textarea id="dmwsreferral_roleintervention_new'+refoutnewindex+'" name="dmwsreferral_roleintervention_new'+refoutnewindex+'" class="form-control" rows="3">intervention</textarea></div>';
		insertrefout = insertrefout + '<div class="col-sm-1"><input id="dmwsreferral_type_new'+refoutnewindex+'" name="dmwsreferral_type_new'+refoutnewindex+'" class="form-control" type="text" value="type"></div>';
		insertrefout = insertrefout + '<div class="col-sm-1"><input id="dmwsreferral_suconsent_new'+refoutnewindex+'" name="dmwsreferral_suconsent_new'+refoutnewindex+'" class="form-control" type="text" value="consent"></div>';
		insertrefout = insertrefout + '<div class="col-sm-3"><textarea id="dmwsreferral_sufeedback_new'+refoutnewindex+'" name="dmwsreferral_sufeedback_new'+refoutnewindex+'" class="form-control" rows="3">feedback</textarea></div>';
		insertrefout = insertrefout + '<div class="col-sm-1">';
		insertrefout = insertrefout + '<button id="dmwsreferral_delete_new'+refoutnewindex+'" class="dmwsreferraldelete btn btn-danger" type="button" >x</button>';
		insertrefout = insertrefout + '</div>';
		insertrefout = insertrefout + '</div>';	
		dmwsreferralida["new"+refoutnewindex] = "new"+refinnewindex;
		$( "#dmwsreferrallistend" ).before( insertrefout );
		dmwsreferraldeletelistener();
		formChanged();
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
		insertcomplex = insertcomplex + '<br><div class="complexityslider" id="dmwscomplexity_score_new'+complexnewindex+'"></div></div>';
		insertcomplex = insertcomplex + '<div class="col-sm-1">';
		insertcomplex = insertcomplex + '<button id="dmwscomplexity_delete_new'+complexnewindex+'" class="dmwscomplexitydelete btn btn-danger" type="button" >x</button>';
		insertcomplex = insertcomplex + '</div>';
		insertcomplex = insertcomplex + '</div>';
		insertcomplex = insertcomplex + '<hr/>';
		dmwscomplexityida["new"+complexnewindex] = "new"+complexnewindex;
		$( "#dmwscomplexitylistend" ).before( insertcomplex );
		complexitysliderlistener();
		dmwscomplexitydeletelistener();
		formChanged();
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
	
	datepickerlistener();
	complexitysliderlistener();
	recalclistener();
	dmwsreferrerupdatedeletelistener();
	dmwsreferraldeletelistener();
	dmwsactiondeletelistener();	
	dmwscomplexitydeletelistener();
	countcomplexityscore();
	recalc();	
	
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
	        	countcomplexityscore(); 
	        } 
	    });
	   
	    $( ".complexityslider" ).slider("pips", {
	          rest: "label",
	          labels: ["1.Little Impact","2","3","4","5","6.Major Impact"]
	    });
	    
	}
	
	function countcomplexityscore() {
		complexityIndexMax = 0;
		complexityScore = 0;
		// alert("countcomplexityscore");
		
		$('.complexityslider').each(function () {
			complexityIndexMax++;
			var thisval = $(this).slider("option", "value");			
			complexityScore = complexityScore + ((thisval+1)*complexityweightinga[thisval]);
			// alert(complexityScore);
			
		});
		complexityScore = complexityScore * complexityextraweightinga[complexityIndexMax];
		// alert("FINAL "+complexityScore);//
		$('#dmwscomplexityscore').val(complexityScore);
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

	function dmwscomplexitydeletelistener() {
		$('.dmwscomplexitydelete').on('click', function(event) {			
			formChanged();
			var result = confirm("Do you want to delete this entry?");
			if (result) {
			    var id = $(this).attr("id");
				$(this).parent().parent().remove();	
			}			
		})	
	}		
	
	function recalc() {
		// alert('recalc');
	}
	
	// special cor number formatting

	// class			Database		Display/Input	phpout		  javascript	phpin	
	// rag              tinytext		Y(colour)					
	// calcin			decimal(8)		n,nnn,nnn		D80ToN80	N80ToF	FToN80	N80ToD80					
	// calcinpercent    decimal(5,2)	nn.nn%			D52ToP82	P82ToF	FToP82	P82ToD52	
	// calcres          decimal(8)		n,nnn,nnn		D80ToN80	N80ToF	FToN80	N80ToD80
	// calcrespercent	decimal(5,2)	nn.nn%			D52ToP82	P82ToF	FToP82	P82ToD52		
	
	function FToN80(xnum) {
		var xnumint = parseInt(xnum);
		var xnumstring = xnumint.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
		if ( xnumint < 0 ) { xnumstring = "("+xnumstring+")"  }
		return xnumstring;	
	}
	function FToN82(xnum) {
		var xnumstring = xnum.toFixed(2)		
		var xnumstring = xnumstring.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");		
		if ( xnum < 0 ) { xnumstring = "("+xnumstring+")"  }
		return xnumstring;	
	}
	function FToP82(xnum) {
		var xnumstring = xnum.toFixed(2)+'%';
		if ( xnum < 0 ) { xnumstring = "("+xnumstring+")"  }
		return xnumstring;	
	}	
	function N80ToF(xstr) {
		var xstr = xstr.replace(/,/g, '');
		var xstr = xstr.replace(/\(/g, '');		
		var xstr = xstr.replace(/\}/g, '');		
		var xstr = xstr.replace(/\u00A3/g, ''); // remove £ sign
	    return parseFloat(xstr);
	}
	function N82ToF(xstr) {
		var xstr = xstr.replace(/,/g, '');
		var xstr = xstr.replace(/\(/g, '');		
		var xstr = xstr.replace(/\}/g, '');		
	    return parseFloat(xstr);
	}
	function P82ToF(xstr) {
		var xstr = xstr.replace('%', '');
		var xstr = xstr.replace(/\(/g, '');		
		var xstr = xstr.replace(/\}/g, '');	
	    return parseFloat(xstr);
	}	
	
	// tab management.
	
    $('a[-toggle="tab"]').on('shown.bs.tab', function(e){
        var currentTab = $(e.target).attr('href'); // get current tab
        var currentTab = currentTab.replace("#", "");
        $('#CurrentTab').val(currentTab);
    });	
    
    
    // ======================== get the  for selection dropdowns ================================
	setupWait(); 
	
	function handleDataRequestSuccess(data, status) {
	    // alert();
		if(data != undefined){
			// $('#TRACETEXT').html(data); 
			Create_Hashes(data);
			// Create_LocalStorage(data);
			// if (JSPersonId() == "bbra") { alert(GLOBALS["DATALOADED"]); }	  
			stopWait();
			// alert(PSP_inputsstring());
		}
		stopWait();	 
	}
	 
	function handleDataRequestFailure(xhr, reason, ex) {
		 messageAlert("Error Reason = "+"|"+xhr+"|"+reason+"|"+ex+"|");
		 // messageAlert("You are not connected to the internet at this time");
	} 
	  	
	// var datarequestlist = "dmwsreferralorg,dmwscomplexitytype";
	var datarequestlist = "";
	datarequestlist = datarequestlist + "dmwsaction" + ",";
	datarequestlist = datarequestlist + "dmwsadmissionreason" + ",";
	datarequestlist = datarequestlist + "dmwsadmissiontype" + ",";
	datarequestlist = datarequestlist + "dmwscomplexity" + ",";
 	datarequestlist = datarequestlist + "dmwscomplexitytype" + ",";
 	datarequestlist = datarequestlist + "dmwscontacttype" + ",";
 	datarequestlist = datarequestlist + "dmwscontract" + ",";
 	datarequestlist = datarequestlist + "dmwsgender" + ",";
 	datarequestlist = datarequestlist + "dmwsitemprovided" + ",";
 	datarequestlist = datarequestlist + "dmwslocationtype" + ",";
 	datarequestlist = datarequestlist + "dmwsprogress" + ",";
 	datarequestlist = datarequestlist + "dmwsreferral" + ",";
 	datarequestlist = datarequestlist + "dmwsreferralorg" + ",";
 	datarequestlist = datarequestlist + "dmwsreferrerupdate" + ",";
 	datarequestlist = datarequestlist + "dmwsservice" + ",";
 	datarequestlist = datarequestlist + "dmwsserviceprovided" + ",";
 	datarequestlist = datarequestlist + "dmwsservicestatus" + ",";
 	datarequestlist = datarequestlist + "dmwsservicetype" + ",";
 	datarequestlist = datarequestlist + "dmwssu" + ",";
 	datarequestlist = datarequestlist + "dmwssux" + ",";
 	datarequestlist = datarequestlist + "dmwstimeband" + ",";
 	datarequestlist = datarequestlist + "dmwstitle" + ",";
 	datarequestlist = datarequestlist + "dmwsvisit" + ",";
 	datarequestlist = datarequestlist + "dmwsvisitlocation" + ",";
 	datarequestlist = datarequestlist + "dmwssufeedbacktype" + ",";
  	datarequestlist = datarequestlist + "dmwswellbeing";	
	startWait("Loading");
	var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_javascriptdataprovider.php"; 		 
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
	
	
	
});


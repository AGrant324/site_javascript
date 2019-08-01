$(document).ready( function() { 
	
	var areyousurestate = "clean"; // used to control exit without data save
	

	$('#captureSignature').signature({ 
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
	
	if ( $('#dmwssux_signature').val() != "" ) {
		$('#captureSignature').signature('draw', $('#dmwssux_signature').val());
	}
	
	$('#clearSignature').click(function() {
		$('#captureSignature').signature('clear');
		$('#mirrorsignature').val("");
		$('#dmwssux_signature').val("");
	});
	
	$('#saveSignature').click(function() {
		
		if ( $('#mirrorsignature').val() == "" ) {
			$.alert({
				icon: 'fa fa-pencil text-danger',
				title: "Signature",
			    content: "No Signature Recorded."
			})				
			
		} else {			
			if ( $('#dmwssux_signature').val() == "" ) {
				$.alert({
					icon: 'fa fa-pencil text-success',
					title: "Signature",
				    content: "New Signature Recorded."
				})	
				$('#dmwssux_signature').val($('#mirrorsignature').val());
			} else {
				$.confirm({
					icon: 'fa fa-pencil text-danger',
				    title: 'Signature',
				    content: 'Did you mean to replace the existing signature?',
				    buttons: {
				        somethingElse: {
				            text: 'Replace',
				            btnClass: 'btn-blue',
				            action: function(){
				    			$.alert({
				    				icon: 'fa fa-pencil text-success',
				    				title: "Signature",
				    			    content: "Replacement Signature Recorded."
				    			})	
				    			$('#dmwssux_signature').val($('#mirrorsignature').val());
				            }
				        },
				        cancel: function () {  },
				    }
				});			
			}
			
		}
		
	});	

	 
	
	//global variables	
	GLOBALS = new Array();	

	saveenabled = "0";
	if ( $('#Save').length ) { saveenabled = "0"; }	
	changesmade = "0";
	$('#UpdatesMade').hide();
	
	servicenewindex = 0;
	consentnewindex = 0;
	refinnewindex = 0;
	refoutnewindex = 0;	
	actionnewindex = 0;
	safeguardingnewindex = 0;
	complexnewindex = 0;
	complexityissuecount = 0;	
	complexityscore = 0;
	progressScore = 0;
	wellbeingScore = 0;
	
	dmwsreferrerupdateida = new Array();
	dmwsreferralida = new Array();	
	dmwsactionida = new Array();
	safeguardingissueida = new Array();
	dmwserviceprovidedida = new Array();
	dmwsvisitbuttonsa = new Array();
	dmwssafeguardingissuetypesa = new Array();
	
	showprevwbdatatoggle = "0";	
	showwbdatatogglea = Array();
	
	prevwbdataa = Array();
	thiswbdataa = Array();	
	
	wellbeingtopica = Array('qoptimistic','quseful','qrelaxed','qinterestedinothers','qenergy','qproblemmanagement','qthinkingclearly','qgoodaboutme','qclosetoothers','qconfident','qlovedqcheerful');

	progdatabuttonseriesa = new Array(); //  key=visitid value=radarchartseries
	progresstopica = Array('treatment','health','wellbeing','family','relationships','housing','finance','work','social','activities');
	progaxislabelsa = Array("Current Admission or Treatment","Health","General Wellbeing","Family","Relationships","Housing","Finance","Work","Social Life","Activities");		
	prevprogdataa = Array();
	prevprogdatavisibilitya = Array();	
	sprevprogdataa = Array(); 
	thisprogdataa = Array();
	progpolycoloura = new Array();
	progsubpolycoloura = Array('rgb(255, 51, 0)','rgb(255, 204, 0)','rgb(255, 77, 166)','rgb(0, 0, 0)','rgb(153, 51, 0)','rgb(102, 255, 51)','rgb(0, 255, 255)');
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
	complexityissuecountweightinga = new Array(0,1,1.1,1.25,1.5,2,3);
	
	complexityscoregrid = new Array(); // matches backdrop scaling
	complexityscoregrid[6] = new Array(0,7.98,9.09,10.35,11.79,13.43,15.3,17.42,19.84,22.6,25.74,29.32,33.39,38.03,43.32,49.34,56.19,64,100);
	complexityscoregrid[5] = new Array(0,5.6,6.51,7.56,8.79,10.22,11.88,13.8,16.04,18.65,21.67,25.19,29.27,34.02,39.54,45.95,53.41,62.07,100);	
	complexityscoregrid[4] = new Array(0,3.77,4.47,5.31,6.29,7.47,8.85,10.5,12.45,14.77,17.52,20.78,24.64,29.22,34.65,41.1,48.74,57.8,100);
	complexityscoregrid[3] = new Array(0,2.38,2.88,3.49,4.22,5.11,6.19,7.49,9.06,10.97,13.28,16.07,19.44,23.53,28.47,34.46,41.7,50.46,100);	
	complexityscoregrid[2] = new Array(0,1.34,1.65,2.04,2.52,3.11,3.84,4.75,5.86,7.24,8.94,11.04,13.64,16.84,20.8,25.68,31.72,39.16,100);	
	complexityscoregrid[1] = new Array(0,0.56,0.71,0.89,1.13,1.42,1.79,2.26,2.84,3.58,4.52,5.69,7.17,9.04,11.39,14.36,18.09,22.8,100);	
		
	currenttextareaopenid = "";
	
	dmwssu_id = $('#dmwssu_id').val();
	dmwsvisit_id = $('#dmwsvisit_id').val();	
	dmwsvisit_type = $('#dmwsvisit_type').val();
	person_userlevel = $('#person_userlevel').val();	
	
	// document.title = $('#TabTitle').val();
	
    $('#dmwssuupdateform').areYouSure( {'silent':true} );
    $(window).on('beforeunload', function() {
        if ($('#dmwssuupdateform').hasClass('dirty') && (areyousurestate == "dirty")) {
            return 'Are you sure you want to close this visit without saving? (Updates may be lost)'; // doesnt override browser default message !!		
        }
    });
	
	// ======== prevents navigation away from fpage without updates =====================
	$('#dmwssuupdateform').areYouSure( 
		{'message':'Are you sure you want to close this visit without saving? (Updates may be lost)'} // doesnt override browser default message !!
	);
	
	$('.othervisit').on('click', function(event) {
		dmwsvisitbuttonsa = [];
		$('.othervisit').each(function() {
			var buttontype = $(this).attr('class');
			dmwsvisitbuttonsa.push(buttontype);
		})
		var othervisitid = $(this).attr("id");
		Get_Data_Hash('dmwsvisit',othervisitid);
		var othervisittype = GLOBALS['dmwsvisit_type'];
		//alert(othervisittype);
		if (othervisitid == 'New Visit'){
			othervisitid = 'New';
		}
		//alert("Coming soon. Watch this space for link to the other visit - "+othervisitid);
		var dmwssu_id = $('#dmwssu_id').val();
		//alert("Visit Id: "+ dmwsvisit_id + ", Visit type: "+dmwsvisit_type + ", Other Visit Type: "+ othervisittype)
		if ( changesmade == "1") {
			$.confirm({
				icon: 'fa fa-question-circle text-warning',
			    title: 'Switch to other visit',
			    content: 'Please save updates to the current visit before proceeding',
			    buttons: {
			        somethingElse: {
			            text: 'Close',
			            btnClass: 'btn-orange',
			            action: function(){
			        		var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_dmwssuupdateout.php"+STDPARMS();
			        		var dmwssu_id = $('#dmwssu_id').val();
			        		var dmwsvisit_id = $('#dmwsvisit_id').val();
			        		var dmwsvisit_type = $('#dmwsvisit_type').val();
			        		sUrl = sUrl + "&dmwssu_id="+dmwssu_id + "&VisitId="+othervisitid  + "&VisitType="+othervisittype;
			            }
			        },
			        cancel: function () { 
			        	
			        },
			    }
			});
		} else {
    		var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_dmwssuupdateout.php"+STDPARMS();	        		
		sUrl = sUrl + "&dmwssu_id="+dmwssu_id + "&VisitType="+othervisittype + "&VisitId="+othervisitid;	        		
    		sUrl = sUrl;
    		window.location.replace(sUrl);						
		}
		
			
	});		
	
	// ======== Listeners for Save/Close Buttons =====================
	if ( $('#Save').length ) {
		$('#Save').on('click', function(event) {
			areyousurestate = "clean"; // prevent areyousure from triggering
			$('[name=SubmitAction]').val('Save');		
			$("#dmwssuupdateform").submit();								
		});
	}
	
	$('#Close').on('click', function(event) {
		areyousurestate = "clean"; // prevent areyousure from triggering
		$('[name=SubmitAction]').val('Close');
		if ( changesmade == "1") {
			$.confirm({
				icon: 'fa fa-question-circle text-warning',
			    title: 'Close Visit',
			    content: 'Are you sure you want to close this visit without saving? (Updates may be lost)',
			    buttons: {
			        somethingElse: {
			            text: 'Close',
			            btnClass: 'btn-orange',
			            action: function(){
			        		var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_dmwssulistout.php"+STDPARMS();	
			        		sUrl = sUrl;
			        		window.location.replace(sUrl);
			            }
			        },
			        cancel: function () { 
			        	
			        },
			    }
			});
		} else {
    		var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_dmwssulistout.php"+STDPARMS();	
    		sUrl = sUrl;
    		window.location.replace(sUrl);						
		}
	});
	
	if ( $('#SaveClose').length ) {
		$('#SaveClose').on('click', function(event) {
			areyousurestate = "clean"; // prevent areyousure from triggering
			$('[name=SubmitAction]').val('SaveClose');
			$("#dmwssuupdateform").submit();										
		});
	}
	
	if ( $('#DeleteVisit').length ) {	
		$('#DeleteVisit').on('click', function(event) {
			$.confirm({
				icon: 'fa fa-question-circle text-danger',
			    title: 'Delete Visit',
			    content: 'Are you sure you want to delete this visit?',
			    buttons: {
			        somethingElse: {
			            text: 'Delete',
			            btnClass: 'btn-red',
			            action: function(){
			        		var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_dmwsvisitdeleteaction.php"+STDPARMS();
			        		var dmwssu_id = $('#dmwssu_id').val();
			        		var dmwsvisit_id = $('#dmwsvisit_id').val();		
			        		sUrl = sUrl + "&dmwssu_id="+dmwssu_id + "&dmwsvisit_id="+dmwsvisit_id;
			        		window.location.replace(sUrl);
			            }
			        },
			        cancel: function () { 
			        	
			        },
			    }
			});			
		});
	}

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
		var newref = TtimeStamp();
		var insertrefin = "";
		insertrefin = insertrefin + '<input type=hidden id="dmwsreferrerupdate_startfield_'+newref+'" name="dmwsreferrerupdate_startfield_'+newref+'" value="">';
		insertrefin = insertrefin + '<div class="row row-eq-height">';
		insertrefin = insertrefin + '<div class="col-sm-1"><input id="dmwsreferrerupdate_date_'+newref+'" name="dmwsreferrerupdate_date_'+newref+'_dd/mm/yyyy" class="datepicker form-control" value=""></div>';
		insertrefin = insertrefin + '<div class="col-sm-2"><input id="dmwsreferrerupdate_personid_'+newref+'" name="dmwsreferrerupdate_personid_'+newref+'" class="form-control" type="text" value=""></div>';
		insertrefin = insertrefin + '<div class="col-sm-2">';
		insertrefin = insertrefin + '<select id="dmwsreferrerupdate_dmwsreferrerorgtypeid+'+newref+'"  name="dmwsreferrerupdate_dmwsreferrerorgtypeid_'+newref+'" class="form-control">';		
		var dmwsreferrerorgtypea = Get_Array_Hash('dmwsreferrerorgtype');
		if (dmwsreferrerorgtypea.length >0) {
			for (var dmwsreferrerorgtypei in dmwsreferrerorgtypea) {
				var dmwsreferrerorgtypeid = dmwsreferrerorgtypea[dmwsreferrerorgtypei];
				Get_Data_Hash('dmwsreferrerorgtype',dmwsreferrerorgtypeid);
				insertrefin = insertrefin + '<option value="'+dmwsreferrerorgtypeid+'" >'+GLOBALS['dmwsreferrerorgtype_name']+'</option>';
			}
			insertrefin = insertrefin + '<option value="" selected></option>';
		} else {
			insertrefin = insertrefin + '<option value="" selected>No Referrer Orgs Setup</option>';
		}		
		insertrefin = insertrefin + '</select >';

		insertrefin = insertrefin + '<input id="dmwsreferrerupdate_contactref_'+newref+'" name="dmwsreferrerupdate_contactref_'+newref+'" class="form-control" type="text" value="">';
		insertrefin = insertrefin + '</div >';
		insertrefin = insertrefin + '<div class="col-sm-3"><textarea id="dmwsreferrerupdate_statusupdate_'+newref+'" name="dmwsreferrerupdate_statusupdate_'+newref+'" class="form-control" rows="3"></textarea></div>';
		insertrefin = insertrefin + '<div class="col-sm-3"><textarea id="dmwsreferrerupdate_response_'+newref+'" name="dmwsreferrerupdate_response_'+newref+'" class="form-control" rows="3"></textarea></div>';		
		insertrefin = insertrefin + '<div class="col-sm-1">';
		insertrefin = insertrefin + '<button id="dmwsreferrerupdate_delete_'+newref+'" type="button" class="dmwsreferrerupdatedelete btn btn-danger">x</button>';
		insertrefin = insertrefin + '</div>';
		insertrefin = insertrefin + '</div>';
		insertrefin = insertrefin + '<input type=hidden id="dmwsreferrerupdate_endfield_'+newref+'" name="dmwsreferrerupdate_endfield_'+newref+'" value="">';
		insertrefin = insertrefin + '<hr/>';
		dmwsreferrerupdateida["new"+refinnewindex] = "new"+refinnewindex;
		$("#dmwsreferrerupdatelistend" ).before( insertrefin );
		dmwsreferrerupdatedeletelistener();
		formChanged();
		datepickerlistener();
	});
	
	$('#dmwsreferral_add_new').on('click', function(event) {
		var newref = TtimeStamp();
		var insertrefout = "";	
		insertrefout = insertrefout + '<input type=hidden id="dmwsreferral_startfield_'+newref+'" name="dmwsreferral_startfield_'+newref+'" value="">';
		insertrefout = insertrefout + '<div class="row row-eq-height">';
		insertrefout = insertrefout + '<div class="col-sm-1"><input id="dmwsreferral_date_'+newref+'" name="dmwsreferral_date_'+newref+'_dd/mm/yyyy" class="datepicker form-control" value="2017-07-05">';
		insertrefout = insertrefout + '<input id="dmwsreferral_time_'+newref+'" name="dmwsreferral_time_'+newref+'" class="form-control" rows="1"></textarea>';
		insertrefout = insertrefout + '</div>';
		insertrefout = insertrefout + '<div class="col-sm-2">';
		
		insertrefout = insertrefout + '<select id="dmwsreferral_dmwsreferralorgid_'+newref+'"  name="dmwsreferral_dmwsreferralorgid_'+newref+'" class="form-control">';		
		var dmwsreferralorga = Get_Array_Hash('dmwsreferralorg');
		if (dmwsreferralorga.length >0) {
			for (var dmwsreferralorgi in dmwsreferralorga) {
				var dmwsreferralorgid = dmwsreferralorga[dmwsreferralorgi];
				Get_Data_Hash('dmwsreferralorg',dmwsreferralorgid);
				insertrefout = insertrefout + '<option value="'+dmwsreferralorgid+'" >'+GLOBALS['dmwsreferralorg_name']+'</option>';
			}
			insertrefout = insertrefout + '<option value="" selected></option>';
		} else {
			insertrefout = insertrefout + '<option value="" selected>No Referral Orgs Setup</option>';
		}		
		insertrefout = insertrefout + '</select >';
		
		insertrefout = insertrefout + '<select id="dmwsreferral_dmwsspecialistreferralorgid_'+newref+'"  name="dmwsreferral_dmwsspecialistreferralorgid_'+newref+'" class="form-control">';		
		var dmwsspecialistreferralorga = Get_Array_Hash('dmwsspecialistreferralorg');
		if (dmwsspecialistreferralorga.length >0) {
			for (var dmwsspecialistreferralorgi in dmwsspecialistreferralorga) {
				var dmwsspecialistreferralorgid = dmwsspecialistreferralorga[dmwsspecialistreferralorgi];
				Get_Data_Hash('dmwsspecialistreferralorg',dmwsspecialistreferralorgid);
				insertrefout = insertrefout + '<option value="'+dmwsspecialistreferralorgid+'" >'+GLOBALS['dmwsspecialistreferralorg_name']+'</option>';
			}
			insertrefout = insertrefout + '<option value="" selected></option>';
		} else {
			insertrefout = insertrefout + '<option value="" selected>No Specialist Orgs Setup</option>';
		}		
		insertrefout = insertrefout + '</select >';		
		
		insertrefout = insertrefout + '</div>';
		insertrefout = insertrefout + '<div class="col-sm-2"><textarea id="dmwsreferral_orgname_'+newref+'" name="dmwsreferral_orgname_'+newref+'" class="form-control" rows="1"></textarea></div>';
		insertrefout = insertrefout + '<div class="col-sm-3"><textarea id="dmwsreferral_roleintervention_'+newref+'" name="dmwsreferral_roleintervention_'+newref+'" class="form-control" rows="3"></textarea></div>';
		insertrefout = insertrefout + '<div class="col-sm-1">';
		insertrefout = insertrefout + '<input id="dmwsreferral_fundingsecured_'+newref+'" name="dmwsreferral_fundingsecured_'+newref+'" class="form-control" type="text" value="">'
		insertrefout = insertrefout + '<input type=hidden id="dmwsreferral_suconsent_'+newref+'" name="dmwsreferral_suconsent_'+newref+'" value="No">';	
		insertrefout = insertrefout + '<div class="checkbox"><label><input type="checkbox" name="dmwsreferral_suconsent_'+newref+'" value="Yes" />Consent to Contact</label></div>';		
		insertrefout = insertrefout + '</div>';
		insertrefout = insertrefout + '<div class="col-sm-2">';
		insertrefout = insertrefout + '<select id="dmwsreferral_sufeedback_'+newref+'"  name="dmwsreferral_sufeedback_'+newref+'" class="form-control">';
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
		insertrefout = insertrefout + '</select >';	
		insertrefout = insertrefout + '</div>';
		insertrefout = insertrefout + '<div class="col-sm-2">';
		insertrefout = insertrefout + '<input id="dmwsreferral_comment_'+newref+'" name="dmwsreferral_comment_'+newref+'" class="form-control" type="text" value="">'
		insertrefout = insertrefout + '</div>';		
		insertrefout = insertrefout + '<div class="col-sm-1">';
		insertrefout = insertrefout + '<button id="dmwsreferral_delete_'+newref+'" class="dmwsreferraldelete btn btn-danger" type="button" >x</button>';
		insertrefout = insertrefout + '</div>';
		insertrefout = insertrefout + '</div>';	
		insertrefout = insertrefout + '<input type=hidden id="dmwsreferral_endfield_'+newref+'" name="dmwsreferral_endfield_'+newref+'" value="">';
		insertrefout = insertrefout + '<hr/>';
		dmwsreferralida["new"+refoutnewindex] = "new"+refinnewindex;
		$( "#dmwsreferrallistend" ).before( insertrefout );
		dmwsreferraldeletelistener();
		formChanged();
		datepickerlistener();
	});	

	$( function() {
	    $( document ).tooltip();
	  } );
	$("#dmwssu_safeguarding").hover(function() {
        $(this).css('cursor','pointer').attr('title', '<font color="red"> RED</font>: <br> SU has disclosed/other organisation disclosed/very clear signs. <br> <font color="gray"> ACTION INFORM AUTHORITIES & record on contact log</font> <hr> <font color="orange"> AMBER</font>: <br> SU has indicated/signs of possible or potential abuse. <br> <font color="gray"> ACTION: CONTACT AUTHORITIES TO DISCUSS & record on contact log </font> <hr> <font color="green"> GREEN</font>: <br> Already known by authorities and support being provided. <br> <font color="gray"> ACTION INFORM AUTHORITIES & record on contact log</font>');
        $(document).tooltip({
        	  content: function (callback) {
        	     callback($(this).prop('title'));
        	  }
        	});
    }, function() {
        $(this).css('cursor','auto');
    });	
	
	/*$("#dmwssu_dmwssafeguardingissuelistdiv").hover(function() {
		issuedescriptiona = [];
		var safeguardingissuetypea = Get_Array_Hash('dmwssafeguardingissuetype');
		for (var $issue in safeguardingissuetypea){
			var safeguardingissueid = safeguardingissuetypea[$issue];
			Get_Data_Hash('dmwssafeguardingissuetype',safeguardingissueid);
			var issuedescription = GLOBALS['dmwssafeguardingissuetype_description'];
			$("#dmwssu_dmwssafeguardingissuelist_"+safeguardingissueid+",label[for='dmwssu_dmwssafeguardingissuelist_"+safeguardingissueid+"']").hover(function() {
				alert(safeguardingissueid);
				$(this).css('cursor','pointer').attr('title',issuedescription);
		        $(document).tooltip({
		        	  content: function (callback) {
		        	     callback($(this).prop('title'));
		        	  }
		        	});
		    }, function() {
		        $(this).css('cursor','auto');
    });	

		}
	});*/
	
	function showhidesafegaurdingextras() {
		$('#dmwssafeguardingextras').hide();
		$('.susafeguardingissuebox').each(function () {
			if ($(this).is(':checked')){
				// alert("#dmwssafeguardingextras working");
				$('#dmwssafeguardingextras').show();
			}
		})
	}
	
	$('.susafeguardingissuebox').on('click', function(event) {
		showhidesafegaurdingextras();
	})
	
	/*
		$('.susafeguardingissuebox').each(function () {
			var thisid = $(this).attr('id');
			$('#'+thisid,"label[for='"+thisid+"']").hover(function() {
				$(this).css('cursor','pointer').attr('title',"tooltip");
		        $(document).tooltip({
		        	  content: function (callback) {
		        	     callback($(this).prop('title'));
		        	  }
		        	});
		    }, function() {
		        $(this).css('cursor','auto');
			})
		})
	*/
	
	$("#dmwssu_dmwssafeguardingissuelist_Discrimination,label[for='dmwssu_dmwssafeguardingissuelist_Discrimination']").hover(function() {
		$(this).css('cursor','pointer').attr('title',"Abuse of or being treated differently because of race, gender, sexual orientation, disability, religion or belief, pregnancy or maternity, marriage/civil partnership, gender reassignment, age.");
        $(document).tooltip({
        	  content: function (callback) {
        	     callback($(this).prop('title'));
        	  }
        	});
    }, function() {
        $(this).css('cursor','auto');
});	
	
	$("#dmwssu_dmwssafeguardingissuelist_DomesticAbuse,label[for='dmwssu_dmwssafeguardingissuelist_DomesticAbuse']").hover(function() {
		$(this).css('cursor','pointer').attr('title',"Controlling/coercive/threatening behaviours/violence/abuse of partners or family members.");
        $(document).tooltip({
        	  content: function (callback) {
        	     callback($(this).prop('title'));
        	  }
        	});
    }, function() {
        $(this).css('cursor','auto');
});	
	
	$("#dmwssu_dmwssafeguardingissuelist_InstitutionalAbuse,label[for='dmwssu_dmwssafeguardingissuelist_InstitutionalAbuse']").hover(function() {
		$(this).css('cursor','pointer').attr('title',"Neglect or poor professional practice/ medicine misuse/use of restraint/poor care,/lack of choice. Isolated or repeated instances by those who are delivering services or care to the individual.");
        $(document).tooltip({
        	  content: function (callback) {
        	     callback($(this).prop('title'));
        	  }
        	});
    }, function() {
        $(this).css('cursor','auto');
});	
	
	$("#dmwssu_dmwssafeguardingissuelist_Neglect,label[for='dmwssu_dmwssafeguardingissuelist_Neglect']").hover(function() {
		$(this).css('cursor','pointer').attr('title',"Failure to meet basic physical or emotional needs/access to health, social care, education/withholding necessities eg medication, food, heating. Be aware of self neglect.");
        $(document).tooltip({
        	  content: function (callback) {
        	     callback($(this).prop('title'));
        	  }
        	});
    }, function() {
        $(this).css('cursor','auto');
});	
	
	$("#dmwssu_dmwssafeguardingissuelist_PhysicalAbuse,label[for='dmwssu_dmwssafeguardingissuelist_PhysicalAbuse']").hover(function() {
		$(this).css('cursor','pointer').attr('title',"Any contact intended to intimidate/injury/physical suffering/bodily harm.");
        $(document).tooltip({
        	  content: function (callback) {
        	     callback($(this).prop('title'));
        	  }
        	});
    }, function() {
        $(this).css('cursor','auto');
});	

	$("#dmwssu_dmwssafeguardingissuelist_ProfessionalAbuse,label[for='dmwssu_dmwssafeguardingissuelist_ProfessionalAbuse']").hover(function() {
		$(this).css('cursor','pointer').attr('title',"Misuse of professional power or trust/acts of omission/failure to follow professional codes of practice/inappropriate behaviour with SU/inappropriate relationships/sharing information for personal gain/denying access to health or social care.");
        $(document).tooltip({
        	  content: function (callback) {
        	     callback($(this).prop('title'));
        	  }
        	});
    }, function() {
        $(this).css('cursor','auto');
});	
	
	$("#dmwssu_dmwssafeguardingissuelist_PsychAbuse,label[for='dmwssu_dmwssafeguardingissuelist_PsychAbuse']").hover(function() {
		$(this).css('cursor','pointer').attr('title',"Emotional abuse/bullying/verbal abuse/shouting/threats of harm, abandonment/coercion/humiliation.");
        $(document).tooltip({
        	  content: function (callback) {
        	     callback($(this).prop('title'));
        	  }
        	});
    }, function() {
        $(this).css('cursor','auto');
});	
	
	$("#dmwssu_dmwssafeguardingissuelist_SexualAbuse,label[for='dmwssu_dmwssafeguardingissuelist_SexualAbuse']").hover(function() {
		$(this).css('cursor','pointer').attr('title',"SU not consented/pressured to consent/incapacity to consent/signs of abuse.");
        $(document).tooltip({
        	  content: function (callback) {
        	     callback($(this).prop('title'));
        	  }
        	});
    }, function() {
        $(this).css('cursor','auto');
});	
	
	$('#dmwsaction_add_new').on('click', function(event) {
		var newref = TtimeStamp();
		var insertaction = "";	
		insertaction = insertaction + '<input type=hidden id="dmwsaction_startfield_'+newref+'" name="dmwsaction_startfield_'+newref+'" value="">';
		insertaction = insertaction + '<div class="row row-eq-height">';
		insertaction = insertaction + '<div class="col-sm-1"><input id="dmwsaction_date_'+newref+'" name="dmwsaction_date_'+newref+'_dd/mm/yyyy" class="datepicker form-control" value="">';
		insertaction = insertaction + '<input id="dmwsaction_time_'+newref+'" name="dmwsaction_time_'+newref+'" class="form-control" rows="1"></textarea>';
		insertaction = insertaction + '</div>';
		insertaction = insertaction + '<div class="col-sm-3"><textarea id="dmwsaction_issue_'+newref+'" name="dmwsaction_issue_'+newref+'" class="form-control" rows="3"></textarea></div>';
		insertaction = insertaction + '<div class="col-sm-4"><textarea id="dmwsaction_action_'+newref+'" name="dmwsaction_action_'+newref+'" class="form-control" rows="3"></textarea></div>';
		insertaction = insertaction + '<div class="col-sm-2"><textarea id="dmwsaction_takenby_'+newref+'" name="dmwsaction_takenby_'+newref+'" class="form-control" rows="1"></textarea></div>';
		insertaction = insertaction + '<div class="col-sm-2"><input id="dmwsaction_completebydate_'+newref+'" name="dmwsaction_completebydate_'+newref+'_dd/mm/yyyy" class="datepicker form-control" value=""></div>';
		insertaction = insertaction + '<div class="col-sm-2">';
		insertaction = insertaction + '<input type=hidden id="dmwsaction_consent_'+newref+'" name="dmwsaction_consent_'+newref+'" value="No">';
		insertaction = insertaction + '<div class="checkbox"><label><input type="checkbox" name="dmwsaction_consent_'+newref+'" value="Yes" />&nbsp;</label></div>';
		insertaction = insertaction + '</div>';
		insertaction = insertaction + '<div class="col-sm-2">';
		insertaction = insertaction + '<select id="dmwsaction_dmwstimebandid_'+newref+'"  name="dmwsaction_dmwstimebandid_'+newref+'" class="form-control">';		
		var dmwsactiontimebanda = Get_Array_Hash('dmwstimeband');
		if (dmwsactiontimebanda.length >0) {
			for (var dmwsactiontimebandi in dmwsactiontimebanda) {
				var dmwsactiontimebandid = dmwsactiontimebanda[dmwsactiontimebandi];
				Get_Data_Hash('dmwstimeband',dmwsactiontimebandid);
				Get_Data_Hash('dmwssu',dmwssu_id);
				if (GLOBALS['dmwssu_dmwscontractid'] == GLOBALS['dmwstimeband_dmwscontracttypeid']){
				insertaction = insertaction + '<option value="'+dmwsactiontimebandid+'" >'+GLOBALS['dmwstimeband_name']+" "+GLOBALS['dmwstimeband_start']+"-"+GLOBALS['dmwstimeband_end']+'</option>';
				}
			}
			insertaction = insertaction + '<option value="" selected></option>';
		} else {
			insertaction = insertaction + '<option value="" selected>No Outlet Classes Setup</option>';
		}		
		insertaction = insertaction + '</select >';
		insertaction = insertaction + '</div>';
		insertaction = insertaction + '<div class="col-sm-2"><input id="dmwsaction_completiondate_'+newref+'" name="dmwsaction_completiondate_'+newref+'_dd/mm/yyyy" class="datepicker form-control" value=""></div>';
		insertaction = insertaction + '<div class="col-sm-1">';
		insertaction = insertaction + '<button id="dmwsaction_delete_'+newref+'" class="dmwsactiondelete btn btn-danger" type="button" >x</button>';
		insertaction = insertaction + '<input type=hidden id="dmwsaction_endfield_'+newref+'" name="dmwsaction_endfield_'+newref+'" value="">';
		insertaction = insertaction + '</div>';
		insertaction = insertaction + '</div>';
		insertaction = insertaction + '<hr/>';
		dmwsactionida["new"+actionnewindex] = "new"+actionnewindex;
		$( "#dmwsactionlistend" ).before( insertaction );
		dmwsactiondeletelistener();
		formChanged();
		datepickerlistener();
	});			
	
	$('#dmwssafeguardingissuetype_add_new').on('click', function(event) {
		var newref = TtimeStamp();
		var insertsafeguardingissuetype = "";	
		insertsafeguardingissuetype = insertsafeguardingissuetype + '<input type=hidden id="dmwssafeguardingissuetype_startfield_new'+safeguardingnewindex+'" name="dmwssafeguardingissuetype_startfield_new'+safeguardingnewindex+'" value="">';
		insertsafeguardingissuetype = insertsafeguardingissuetype + '<div class="row row-eq-height">';
		insertsafeguardingissuetype = insertsafeguardingissuetype + '<div class="col-sm-2">';
		var safeguardingissuetypea = Get_Array_Hash('dmwssafeguardingissuetype');
		if (safeguardingissuetypea.length >0) {
			for (var safeguardingissuetypei in safeguardingissuetypea) {
				var dmwssafeguardingissuetypeid = safeguardingissuetypea[safeguardingissuetypei];
				Get_Data_Hash('dmwssafeguardingissuetype',dmwssafeguardingissuetypeid);
				insertsafeguardingissuetype = insertsafeguardingissuetype + '<option value="'+dmwssafeguardingissuetypeid+'" >'+GLOBALS['dmwssaeguardingissuetype_name']+'</option>';
			}
			insertsafeguardingissuetype = insertsafeguardingissuetype + '<option value="" selected></option>';
		} else {
			insertsafeguardingissuetype = insertsafeguardingissuetype + '<option value="" selected>No Outlet Classes Setup</option>';
		}		
		insertsafeguardingissuetype = insertsafeguardingissuetype + '</select >';
		insertsafeguardingissuetype = insertsafeguardingissuetype + '</div>';
		insertsafeguardingissuetype = insertsafeguardingissuetype + '<div class="col-sm-1">';
		insertsafeguardingissuetype = insertsafeguardingissuetype + '<button id="dmwssafeguardingissuetype_delete_new'+safeguardingnewindex+'" class="dmwssafeguardingissuetypedelete btn btn-danger" type="button" >x</button>';
		insertsafeguardingissuetype = insertsafeguardingissuetype + '<input type=hidden id="dmwssafeguardingissuetype_endfield_new'+safeguardingnewindex+'" name="dmwssafeguardingissuetype_endfield_new'+safeguardingnewindex+'" value="">';
		insertsafeguardingissuetype = insertsafeguardingissuetype + '</div>';
		insertsafeguardingissuetype = insertsafeguardingissuetype + '</div>';
		insertsafeguardingissuetype = insertsafeguardingissuetype + '<hr/>';
		alert("listener active");
		safeguardingissueida["new"+safeguardingnewindex] = "new"+safeguardingnewindex;
		$( "#dmwssafeguardingissuetypelistend" ).before( insertsafeguardingissuetype );
		dmwssafeguardingissuedeletelistener();
		formChanged();

	});			
	
	$('#dmwsserviceprovided_add_new').on('click', function(event) {
		//alert("listener active");
		var newref = TtimeStamp();
		var insertserviceprovided = "";	
		insertserviceprovided = insertserviceprovided + '<input type=hidden id="dmwsserviceprovided_startfield_'+newref+'" name="dmwsserviceprovided_startfield_'+newref+'" value="">';
		insertserviceprovided = insertserviceprovided + '<div class="row row-eq-height">';
		insertserviceprovided = insertserviceprovided + '<div class="col-sm-1"><input id="dmwsserviceprovided_date_'+newref+'" name="dmwsserviceprovided_date_'+newref+'_dd/mm/yyyy" class="datepicker form-control" value=""></div>';
		insertserviceprovided = insertserviceprovided + '<div class="col-sm-2"><select id="dmwsserviceprovided_dmwsservicetypeid_'+newref+'"  name="dmwsserviceprovided_dmwsservicetypeid_'+newref+'" class="form-control"></div>';		
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
		insertserviceprovided = insertserviceprovided + '<div class="col-sm-3"><textarea id="dmwsserviceprovided_comment_'+newref+'" name="dmwsserviceprovided_comment_'+newref+'" class="form-control" rows="3"></textarea></div>';
		insertserviceprovided = insertserviceprovided + '<div class="col-sm-1">';
		insertserviceprovided = insertserviceprovided + '<button id="dmwsserviceprovided_delete_'+newref+'" class="dmwsserviceprovideddelete btn btn-danger" type="button" >x</button>';
		insertserviceprovided = insertserviceprovided + '<input type=hidden id="dmwsserviceprovided_endfield_'+newref+'" name="dmwsserviceprovided_endfield_'+newref+'" value="">';
		insertserviceprovided = insertserviceprovided + '</div>';
		insertserviceprovided = insertserviceprovided + '</div>';
		insertserviceprovided = insertserviceprovided + '<hr/>';
		dmwserviceprovidedida["new"+servicenewindex] = "new"+servicenewindex;
		$( "#dmwsserviceprovidedlistend" ).before( insertserviceprovided );
		dmwsserviceprovideddeletelistener();
		formChanged();
		datepickerlistener();
	});	
	
	$('#dmwsconsentwithdrawal_add_new').on('click', function(event) {
		//alert("listener active");
		var newref = TtimeStamp();
		var insertdmwsconsentwithdrawal = "";	
		insertdmwsconsentwithdrawal = insertdmwsconsentwithdrawal + '<input type=hidden id="dmwsconsentwithdrawal_startfield_'+newref+'" name="dmwsconsentwithdrawal_startfield_'+newref+'" value="">';
		insertdmwsconsentwithdrawal = insertdmwsconsentwithdrawal + '<div class="row row-eq-height">';
		insertdmwsconsentwithdrawal = insertdmwsconsentwithdrawal + '<div class="col-sm-2"><select id="dmwsconsentwithdrawal_dmwsconsentwithdrawaltypeid '+newref+'"  name="dmwsconsentwithdrawal_dmwsconsentwithdrawaltypeid '+newref+'" class="form-control"></div>';		
		var dmwsconsentwithdrawaltypea = Get_Array_Hash('dmwsconsentwithdrawaltype');
		if (dmwsconsentwithdrawaltypea.length >0) {
			for (var dmwsconsentwithdrawaltypei in dmwsconsentwithdrawaltypea) {
				var dmwsconsentwithdrawaltypeid = dmwsconsentwithdrawaltypea[dmwsconsentwithdrawaltypei];
				Get_Data_Hash('dmwsconsentwithdrawaltype',dmwsconsentwithdrawaltypeid);
				insertdmwsconsentwithdrawal = insertdmwsconsentwithdrawal + '<option value="'+dmwsconsentwithdrawaltypeid+'" >'+GLOBALS['dmwsconsentwithdrawaltype_name']+'</option>';
			}
			insertdmwsconsentwithdrawal = insertdmwsconsentwithdrawal + '<option value="" selected></option>';
		} else {
			insertdmwsconsentwithdrawal = insertdmwsconsentwithdrawal + '<option value="" selected>No Withdrawal Type Setup</option>';
		}
		insertdmwsconsentwithdrawal = insertdmwsconsentwithdrawal + '</select >';
		insertdmwsconsentwithdrawal = insertdmwsconsentwithdrawal + '</div>';
		insertdmwsconsentwithdrawal = insertdmwsconsentwithdrawal + '<div class="col-sm-3"><textarea id="dmwsconsentwithdrawal_comment_'+newref+'" name="dmwsconsentwithdrawal_comment_'+newref+'" class="form-control" rows="3"></textarea></div>';
		insertdmwsconsentwithdrawal = insertdmwsconsentwithdrawal + '<div class="col-sm-1"><input id="dmwsconsentwithdrawal_date_'+newref+'" name="dmwsconsentwithdrawal_date_'+newref+'_dd/mm/yyyy" class="datepicker form-control" value=""></div>';
		insertdmwsconsentwithdrawal = insertdmwsconsentwithdrawal + '<div class="col-sm-1">';
		insertdmwsconsentwithdrawal = insertdmwsconsentwithdrawal + '<button id="dmwsconsentwithdrawal_delete_'+newref+'" class="dmwsconsentwithdrawaldelete btn btn-danger" type="button" >x</button>';
		insertdmwsconsentwithdrawal = insertdmwsconsentwithdrawal + '<input type=hidden id="dmwsconsentwithdrawal_endfield_'+newref+'" name="dmwsconsentwithdrawal_endfield_'+newref+'" value="">';
		insertdmwsconsentwithdrawal = insertdmwsconsentwithdrawal + '</div>';
		insertdmwsconsentwithdrawal = insertdmwsconsentwithdrawal + '</div>';
		insertdmwsconsentwithdrawal = insertdmwsconsentwithdrawal + '<hr/>';
		dmwsconsentwithdrawaltypea["new"+consentnewindex] = "new"+consentnewindex;
		$( "#dmwsconsentwithdrawallistend" ).before( insertdmwsconsentwithdrawal );
		dmwsconsentwithdrawaldeletelistener();
		formChanged();
		datepickerlistener();
	});		
	
	$('#dmwscomplexity_add_new').on('click', function(event) {
		var newref = TtimeStamp();
		var insertcomplex = "";		
		insertcomplex = insertcomplex + '<div class="row row-eq-height">';	
		insertcomplex = insertcomplex + '<div class="col-sm-2">';
		insertcomplex = insertcomplex + '<select id="dmwscomplexity_issuetype_'+newref+'"  name="dmwscomplexity_issuetype_'+newref+'" class="dmwscomplexityissuetype form-control">';		
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
		
		insertcomplex = insertcomplex + '<div class="col-sm-1">';
		insertcomplex = insertcomplex + '<div id="dmwscomplexitytype_weighting_'+newref+'"></div>';
		insertcomplex = insertcomplex + '</div>';	
		
		insertcomplex = insertcomplex + '<div class="col-sm-6">';
		insertcomplex = insertcomplex + '<br><div class="complexityslider" id="dmwscomplexity_slider_'+newref+'"></div></div>';
		insertcomplex = insertcomplex + '<div class="col-sm-1">';
		insertcomplex = insertcomplex + '<button id="dmwscomplexity_delete_'+newref+'" class="dmwscomplexitydelete btn btn-danger" type="button" >x</button>';
		insertcomplex = insertcomplex + '</div>';
		insertcomplex = insertcomplex + '</div>';			
		insertcomplex = insertcomplex + '<input type=hidden id=dmwscomplexity_issuescore_'+newref+' name="dmwscomplexity_issuescore_'+newref+' value="">';
		insertcomplex = insertcomplex + '<input type=hidden id=dmwscomplexity_issueweight_'+newref+' name="dmwscomplexity_issueweight_'+newref+' value="">';		
		insertcomplex = insertcomplex + '<hr/>';	
		dmwscomplexitytypea[newref] = newref;
		$( "#dmwscomplexitylistend" ).before( insertcomplex );
	    $( '#dmwscomplexity_slider_'+newref ).slider({
	        value:0,
	        min: 0,
	        max: 5,
	        step: 1,
	        change: function(event, ui) {         	
	        	countcomplexityscorewait(); 
	        }
	    });
	    $( '#dmwscomplexity_slider_'+newref ).slider("pips", {
	          rest: "label",
	          labels: ["1.Little Impact","2","3","4","5","6.Major Impact"]
	    });
		dmwscomplexitydeletelistener();
		dmwscomplexityissuetypelistener();		
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
	$('#chart').attr('height',"800");
	var DMWSRadarChart = {
	  // ========= draw method for DMWSRadarChart O ject =================
	  draw: function(id, options, allAxis, tthisprogdataa, prevprogdataa, prevprogdatavisibilitya){

		  var cfg = {
			 radius: 5,
			 w: 600,
			 h: 600,
			 factor: 1,
			 factorLegend: .85,
			 levels: 3,
			 maxValue: 5,
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

			var total = allAxis.length;
			var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
			var Format = d3.format('%');
			d3.select(id).select("svg").remove();
			
			var g = d3.select(id)
					.append("svg")
					.attr("width", cfg.w+cfg.ExtraWidthX)
					.attr("height", cfg.h+cfg.ExtraWidthY +100)
					.append("g")
					.attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
					;
		
			var tooltip;
			
			// === draw the Circular segments of the chart =======================
			for(var j=0; j<6; j++){
			  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
			  g.selectAll(".levels")
			   .data(allAxis)
			   .enter()
			   .append("svg:line")
			   .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
			   .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total)) + 40;})
			   .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
			   .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total)) + 40;})
			   .attr("class", "line")
			   .style("stroke", "grey")
			   .style("stroke-opacity", "0.75")
			   .style("stroke-width", "1.3px")
			   .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
			}
		
			
			// ======== Text indicating at what score each level is ===============
			for(var j=0; j<6; j++){
			  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
			  g.selectAll(".levels")
			   .data([1]) //dummy data
			   .enter()
			   .append("svg:text")
			   .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
			   .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0)) + 40;})
			   .attr("class", "legend")
			   .style("font-family", "sans-serif")
			   .style("font-size", "10px")
			   .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
			   .attr("fill", "#737373")
		//	   .text(Format((j+1)));
			   .text(".."+(j));
			}
			
			var axis = g.selectAll(".axis")
					.data(allAxis)
					.enter()
					.append("g")
					.attr("class", "axis");
		
			axis.append("line")
				.attr("x1", cfg.w/2)
				.attr("y1", cfg.h/2 + 40)
				.attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
				.attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total)) + 40 ;})
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
				.attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total) + 40 ;});
		
			// ======== Draw polygons for previous data ===============
		
			series=0;
			prevprogdataa.forEach(function(y, x){
				
				if (prevprogdatavisibilitya[series] == "show") {	
					 if (progpolycoloura[series] == 'rgb(40, 115, 143)') {
				
				  dataValues = [];
				  g.selectAll(".nodes")
					.data(y, function(j, i){
					  dataValues.push([
						cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
						cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total)) + 40
					  ]);
					});
				  dataValues.push(dataValues[0]);
				  g.selectAll(".area")
								 .data([dataValues])
								 .enter()
								 .append("polygon")
								 .attr("class", "radar-chart-serie"+series)
								 .style("stroke-width", "4px")				 
								 .style("stroke", progsubpolycoloura[series])
								 .attr("points",function(prevprogdataa) {
									 var str="";
									 for(var pti=0;pti<prevprogdataa.length;pti++){
										 str=str+prevprogdataa[pti][0]+","+prevprogdataa[pti][1]+" ";
									 }
									 return str;
								  })
								 .style("fill", function(j, i){return progpolycoloura[series]})
								 .style("fill-opacity", cfg.opacityArea)
								 .on('mouseover', function (prevprogdataa){
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
				}
					 else {dataValues = [];
				  g.selectAll(".nodes")
					.data(y, function(j, i){
					  dataValues.push([
						cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
						cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total)) + 40
					  ]);
					});
				  dataValues.push(dataValues[0]);
				  g.selectAll(".area")
								 .data([dataValues])
								 .enter()
								 .append("polygon")
								 .attr("class", "radar-chart-serie"+series)
								 .style("stroke-width", "2px")				 
								 .style("stroke", progpolycoloura[series])
								 .attr("points",function(prevprogdataa) {
									 var str="";
									 for(var pti=0;pti<prevprogdataa.length;pti++){
										 str=str+prevprogdataa[pti][0]+","+prevprogdataa[pti][1]+" ";
									 }
									 return str;
								  })
								 .style("fill", function(j, i){return progpolycoloura[series]})
								 .style("fill-opacity", cfg.opacityArea)
								 .on('mouseover', function (prevprogdataa){
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
								 });}
				  }
				  series++;
				  //alert(dataValues.toString());
				
			});
			
			// === draw the circular axis markers ===============
			for(var j=0; j<6; j++){
			  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
			  var level = j+1;
			  var level2 = level-1;
			  g.selectAll(".levels")
			  	.data(allAxis)
			  	.enter()	  
				.append("svg:circle")
				.attr("id", function(j, i){return "selectpoint_"+i+"_"+level2})		
				.attr("class", "radar-chart-selectpoint")
				.attr('r', cfg.radius*2)
				.attr("alt", function(j){return Math.max(j.value, 0)})
				.attr("cx", function(j, i){return levelFactor*(1-cfg.factor*Math.sin((i)*cfg.radians/total));})
				.attr("cy", function(j, i){return levelFactor*(1-cfg.factor*Math.cos((i)*cfg.radians/total)) + 40;})
				.style("fill", "#888888").style("fill-opacity", .3)
				.attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
			  
			  
			}
		
			// === mark the dots for the current datapoints ===============
			for(var ai=0; ai<10; ai++){
				for(var vi=0; vi<6; vi++){
					if (vi == "0"){
					$('#'+"selectpoint_"+ai+"_"+(vi)).css({ 'fill': "#ff0000" });
					$('#'+"selectpoint_"+ai+"_"+(vi)).css({ 'fill-opacity': "0.3" });			
					}
					else{
					$('#'+"selectpoint_"+ai+"_"+(vi)).css({ 'fill': "#888888" });
					$('#'+"selectpoint_"+ai+"_"+(vi)).css({ 'fill-opacity': "0.3" });
					}
				}				
					$('#'+"selectpoint_"+ai+"_"+tthisprogdataa[ai]).css({ 'fill': "#990099" });
					$('#'+"selectpoint_"+ai+"_"+tthisprogdataa[ai]).css({ 'fill-opacity': "1.0" });
				
			}
			
			//Join up latest scores if polygon complete
			var thisdcount = 0;
			for(var ai=0; ai<10; ai++){				
				if ( tthisprogdataa[ai] >=0 ) {
					thisdcount++;
				}
			}		
			// alert("thisdcount "+thisdcount);
			if ( thisdcount == 10 ) {
				// alert("Complete");
				thisdataValues = [];
				// alert(tthisprogdataa[0].toString()+tthisprogdataa[1].toString()+tthisprogdataa[2].toString()+tthisprogdataa[9].toString());
				for(var ai=0; ai<10; ai++){
				  thisdataValues.push([
					cfg.w/2*(1-(parseFloat(Math.max((+tthisprogdataa[ai]+1), 0))/cfg.maxValue)*cfg.factor*Math.sin(ai*cfg.radians/total)), 
					cfg.h/2*(1-(parseFloat(Math.max((+tthisprogdataa[ai]+1), 0))/cfg.maxValue)*cfg.factor*Math.cos(ai*cfg.radians/total)) + 40
				  ]);
				}				
				thisdataValues.push(thisdataValues[0]);  // complete the loop of joining lines
				// alert(print_r(thisdataValues));
				
				g.selectAll(".area")
					 .data([thisdataValues])
					 .enter()
					 .append("polygon")
					 // .attr("class", "radar-chart-serie1")
					 .style("stroke-width", "2px")
					 .style("stroke", "#990099")
					.attr("points",function(tthisprogdataa) {
						 var str="";
						 for(var pti=0;pti<tthisprogdataa.length;pti++){
							 str=str+tthisprogdataa[pti][0]+","+tthisprogdataa[pti][1]+" ";
						 }
						 return str;
					  })	 
					 .style("fill", "none")				 
					 // .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
			}
			
			// ====  reset radar chart listeners after redrawing chart =====================
			$('.radar-chart-selectpoint').on('click', function(event) {
				
				    // in safari fill capacity was showing  0.30000001192092896  not 0.3 !!
					currentselectpointid = $(this).attr("id");
					var ida = currentselectpointid.split("_");
					var thisaxis = ida[1];
					var thisvalue = ida[2];
					//alert(thisvalue);
					tthisprogdataa[thisaxis] = thisvalue;		
					DMWSRadarChart.draw("#chart", myradarchartcfg, progaxislabelsa, tthisprogdataa, prevprogdataa, prevprogdatavisibilitya);
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
	/*$('.progdatabutton').each(function() {
		var thisid = $(this).attr('id');
		if (thisid == dmwsvisit_id){
			
		}
		else {
			if($(this).css('opacity') == '1'){
			progpolycoloura.push($(this).css('background-color'));
			}
		}
	
		
		//progpolycoloura.push($(this).attr('class'));	

	})*/
	//alert(progpolycoloura.toString());
	//alert(dmwsvisit_id);

	showhidesafegaurdingextras();
	
	function loadprogressarray() {	

		prevprogdataa = [];
		thisprogdataa = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
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
				da3["value"] = +GLOBALS['dmwsprogress_treatment']+1;
				da2.push(da3);
				var da3 = [];
				da3["value"] = +GLOBALS['dmwsprogress_health']+1;
				da2.push(da3);
				var da3 = [];
				da3["value"] = +GLOBALS['dmwsprogress_wellbeing']+1;
				da2.push(da3);		
				var da3 = [];
				da3["value"] = +GLOBALS['dmwsprogress_family']+1;
				da2.push(da3);		
				var da3 = [];
				da3["value"] = +GLOBALS['dmwsprogress_relationships']+1;
				da2.push(da3);		
				var da3 = [];
				da3["value"] = +GLOBALS['dmwsprogress_housing']+1;
				da2.push(da3);		
				var da3 = [];
				da3["value"] = +GLOBALS['dmwsprogress_finance']+1;
				da2.push(da3);
				var da3 = [];
				da3["value"] = +GLOBALS['dmwsprogress_work']+1;
				da2.push(da3);	
				var da3 = [];
				da3["value"] = +GLOBALS['dmwsprogress_social']+1;
				da2.push(da3);
				var da3 = [];
				da3["value"] = +GLOBALS['dmwsprogress_activities']+1;
				da2.push(da3);
				prevprogdataa.push(da2);
				prevprogdatavisibilitya.push("hide");
			}
		}	
	

		//alert(+GLOBALS['dmwsprogress_treatment'] + 1);
		DMWSRadarChart.draw("#chart", myradarchartcfg, progaxislabelsa, thisprogdataa, prevprogdataa, prevprogdatavisibilitya);
		/*if (thisprogdataa.length == '10') {
			$('.progdatabutton').each(function() {
				$(this).show();
			})
		}*/
		radarseriescounter = 0;		
		$('.progdatabutton').each(function() {
			ccounter = 0;
			// grey out buttons for which there is no progress data
			$(this).css('opacity',"0.6");
			var thisid = $(this).attr('id');
			for (var si in progressvisitida) {
				if (progressvisitida[si] == thisid){
					//$('#' + thisid).css('opacity',"0.6");
					//alert(thisid);
					$(this).css('opacity',"1");
				}
				progdatabuttonseriesa[thisid] = -1; 
			} 
			
			// set the listeners for each relevant progress button
			if ($(this).css('opacity') == "1") {				
				if (thisid == dmwsvisit_id) {  // current visit id is always shown 
					// No listener			
				} else { // previous visit id can be toggled to show or hide 
					progpolycoloura.push($(this).css('background-color'));
					progdatabuttonseriesa[thisid] = radarseriescounter;
					radarseriescounter++;
					$(this).on('click', function(event) {
						var thisid = $(this).attr('id');
						//alert(radarseriescounter);
						// $('.radar-chart-serie'+counter).toggle();
						var ogbtncolour = $(this).css('color');
						if ($(this).css('border-bottom-width') == "1px"){
							$(this).css('border-bottom-width',"5px");
							//$(this).css('border-bottom-color',progsubpolycoloura[radarseriescounter]);
					
							prevprogdatavisibilitya[progdatabuttonseriesa[thisid]] = "show";
						} else {
							$(this).css('border-bottom-width',"1px");
							$(this).css('border-bottom-color',ogbtncolour);
							prevprogdatavisibilitya[progdatabuttonseriesa[thisid]] = "hide";							
						}
						DMWSRadarChart.draw("#chart", myradarchartcfg, progaxislabelsa, thisprogdataa, prevprogdataa, prevprogdatavisibilitya);
						if (prevprogdatavisibilitya[progdatabuttonseriesa[thisid]] == "show"){
						var polycolour = $('.radar-chart-serie'+progdatabuttonseriesa[thisid]).css('stroke');	
						// alert("progdatabuttonseriesa[thisid]: "+progdatabuttonseriesa[thisid]+"; colour: "+polycolour);
						$(this).css('border-bottom-color',polycolour);
					
						//alert(polycolour);
						}
					});														
				}
			}
			if (thisid == "New"){
				$(this).css('opacity',"0.6");
			}
			ccounter++;
		});
		
		if (thisprogdataa.length > 0){
			$('#'+dmwsvisit_id).css('opacity',"1");
		}
	}	

	// ======================== tab management ================================
	
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
			
			stopWait();	
			initialformatter();
			datepickerlistener();
			doblistener();
			// modspecificlistener();
			// equalityformlistener();
			recalclistener();
			dmwsreferrerupdatedeletelistener();
			dmwsreferraldeletelistener();
			dmwsserviceprovideddeletelistener();
			dmwsconsentwithdrawaldeletelistener();			
			dmwsactiondeletelistener();
			dmwssafeguardingissuedeletelistener();
			loadwellbeingticks();
			countwellbeingscore();
			loadprogressarray();
			countprogressscore();
			complexitysliderlistener();
			dmwscomplexitydeletelistener();
			dmwscomplexityissuetypelistener();	
			loadcomplexityslider();
			countcomplexityscorewait();
		}
		stopWait();	 
	}
	 
	function handleDataRequestFailure(xhr, reason, ex) {
		 alert("Error Reason = "+"|"+xhr+"|"+reason+"|"+ex+"|");
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
 	datarequestlist = datarequestlist + "dmwsspecialistreferralorg" + ","; 	
 	datarequestlist = datarequestlist + "dmwssufeedbacktype" + ",";	
 	datarequestlist = datarequestlist + "dmwsconsentwithdrawal[rootkey="+dmwssu_id+"]" + ","; 	
	datarequestlist = datarequestlist + "dmwsconsentwithdrawaltype" + ",";	 	
 	datarequestlist = datarequestlist + "dmwsreferrerupdate[rootkey="+dmwssu_id+"]" + ",";
 	datarequestlist = datarequestlist + "dmwsreferrerorgtype" + ",";	
 	datarequestlist = datarequestlist + "dmwsservice" + ",";
 	datarequestlist = datarequestlist + "dmwsserviceprovided[rootkey="+dmwssu_id+"]" + ",";
 	datarequestlist = datarequestlist + "dmwsservicestatus" + ",";
 	datarequestlist = datarequestlist + "dmwsservicetype" + ",";
 	datarequestlist = datarequestlist + "dmwssu" + ",";
 	datarequestlist = datarequestlist + "dmwssux" + ",";
 	datarequestlist = datarequestlist + "dmwstimeband" + ",";
 	datarequestlist = datarequestlist + "dmwssafeguardingissuetype" + ","; 	
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
	areyousurestate = "dirty";
	$('#dmwssuupdateform').trigger('checkform.areYouSure');
	$('#UpdatesMade').show();
	changesmade = "1";
}	

function initialformatter() {

	$('.rag').each(function() {
		var thisid = $(this).attr('id');
		var backcolor = "white";
		if ($(this).val() == "Y") { var backcolor = "#b3ffd9"; }
		if ($(this).val() == "Yes") { var backcolor = "#b3ffd9"; }			
		if ($(this).val() == "Green") { var backcolor = "#b3ffd9"; }
		if ($(this).val() == "Completed") { var backcolor = "#b3ffd9"; }		
		if ($(this).val() == "Amber") { var backcolor = "#ffd65c"; }
		if ($(this).val() == "Open") { var backcolor = "#ffd65c"; }		
		if ($(this).val() == "N") { var backcolor = "#ff9999"; }
		if ($(this).val() == "No") { var backcolor = "#ff9999"; }			
		if ($(this).val() == "Red") { var backcolor = "#ff9999"; }
		$(this).css('background-color', backcolor);	    
	});
	
	/*
	if ($('#dmwssu_dmwscontractid').val() != "MOD") {
		$('#MODSPECIFIC_header').hide();
		$('#MODSPECIFIC').hide();
	}

	if ( $('input[name="dmwssu_equalityforminterest"]').is(':checked') ) { } 
	else {
		$('#EQUALITY_header').hide();
		$('#EQUALITY').hide();
	}
	*/
}

function datepickerlistener() { 	
   	$('.datepicker').datepicker({
	    startDate: '-3d',
	    format: 'dd/mm/yyyy'
	});		
}

function doblistener() { 	
	/*
	$('#dmwssu_dob').datepicker()
	.on('changeDate', function(e){
		var intext = $(this).val();
		alert(intext);
		// $('#dmwssu_age').val(AgeYr(DDsMMsYYYYtoYYYY_MM_DD(intext)));
	});
	*/
	
	$('#dmwssu_dob').change( function() {
		var intext = $(this).val();
		$('#dmwssu_age').val(AgeYr(DDsMMsYYYYtoYYYY_MM_DD(intext)));				
	});	
}

function modspecificlistener() { 	
	$('#dmwssu_dmwscontractid').change( function() {
		var intext = $(this).val();
		if (intext == "MOD") {
			$('#MODSPECIFIC_header').show();
			$('#MODSPECIFIC').show();
		} else {
			$('#MODSPECIFIC_header').hide();
			$('#MODSPECIFIC').hide();
		}				
	});		
}

function equalityformlistener() { 	
	$('input[name="dmwssu_equalityforminterest"]').click( function() {	
		if ( $('input[name="dmwssu_equalityforminterest"]').is(':checked') ) {
			$('#EQUALITY_header').show();
			$('#EQUALITY').show();
		} else {
			$('#EQUALITY_header').hide();
			$('#EQUALITY').hide();
		}				
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
		if ($(this).val() == "Completed") { var backcolor = "#b3ffd9"; }		
		if ($(this).val() == "Amber") { var backcolor = "#ffd65c"; }
		if ($(this).val() == "Open") { var backcolor = "#ffd65c"; }		
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


function dmwssafeguardingissuedeletelistener() {
	$('.dmwssafegaurdingissuetypedelete').on('click', function(event) {			
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

function dmwsconsentwithdrawaldeletelistener() {
	$('.dmwsconsentwithdrawaldelete').on('click', function(event) {			
		formChanged();
		var result = confirm("Do you want to delete this entry?");
		if (result) {
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
				$('#'+thisid+"_icon").css("color", "#990099");						
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
			// alert(thisprogvals[2]);
			progressScore = progressScore + parseInt(thisprogvals[2]);
			// alert('#dmwsprogress_'+progresstopica[thisprogvals[1]]);
			$('#dmwsprogress_'+progresstopica[thisprogvals[1]]).val(parseInt(thisprogvals[2]));	
		}
		$(this).css("z-index", "1500");			
	});	
	$('#dmwsprogress_score').val(progressScore);	
}



// ================= Complexity Tab Routines =========================



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

function dmwscomplexityissuetypelistener() {
	$('.dmwscomplexityissuetype').on('change', function(event) {
		Check_Data_Hash('dmwscomplexitytype',$(this).val());
		var idbits = $(this).attr('id').split('_');
		if ( GLOBALS["IOWARNING"] == "0" ) {
			// alert(GLOBALS['dmwscomplexitytype_weighting']);
			$('#dmwscomplexitytype_weighting_'+idbits[2]).html(GLOBALS['dmwscomplexitytype_weighting']);
		}
		countcomplexityscore();
	})	
}

function loadcomplexityslider() {		
	Check_Data_Hash('dmwscomplexity',dmwsvisit_id);
	if ( GLOBALS["IOWARNING"] == "0" ) {			
		for(var ci=1; ci<9; ci++){			
			if ( GLOBALS['dmwscomplexity_issuetype'+ci] != "" ) {
				$('#dmwscomplexity_slider_'+ci).slider('value',GLOBALS['dmwscomplexity_issuescore'+ci]-1);
			}
		}
	}
}

function countcomplexityscore() {
	complexityissuecount = 0;
	complexityscore = 0;
	// alert("countcomplexityscore");
	
	$('.complexityslider').each(function () {
		var idbits = $(this).attr('id').split('_');
		complexityissuecount++;
		var thisval = $(this).slider("option", "value");
		var weighting = $('#dmwscomplexitytype_weighting_'+idbits[2]).html();
		// alert('#dmwscomplexity_weighting_'+idbits[2]+" | "+weighting);
		complexityscore = complexityscore + ((complexityweightinga[thisval+1])*weighting);
		// alert(complexityscore);	
		$('#dmwscomplexity_issuescore_'+idbits[2]).val(thisval+1);	
		$('#dmwscomplexity_issueweight_'+idbits[2]).val(weighting);	
		complexityslidervaluea['dmwscomplexity_slider_'+idbits[2]] = thisval+1;
		// alert('#dmwscomplexity_issuescore_'+idbits[2]+" = "+(thisval+1));
	});
	complexityscore = complexityscore * complexityissuecountweightinga[complexityissuecount];
	// alert("FINAL "+complexityscore); 
	$('#dmwscomplexity_score').val(complexityscore.toFixed(1));
	if (complexityscore > 0) {
	    complexitybackdropposition = $('#complexitybackdrop').offset(); 	    
	    var xmin = 100; xmax = 700; 
	    var xinc = (xmax - xmin)/18;
	    var xval = xmin;
	    var ymin = 635; 
	    var yval = ymin - (complexityissuecount*100);	    
	    var gridscore = 0;
	    var gridindex = 1;
	    var minmaxratio = 0;
	    var thisgrid = "0";
	    while ((complexityscore >= complexityscoregrid[complexityissuecount][gridindex-1])&&(gridindex <= 18)) {
	    	if (gridindex == 18) {  // last grid
	    		thisgrid = "1";
	    		if ( complexityscore > complexityscoregrid[complexityissuecount][18] ) {	    			
	    			minmaxratio = 1;
	    		}
	    	} else {
	    		if ( complexityscore >= complexityscoregrid[complexityissuecount][gridindex] ) {
	    			thisgrid = "0";
	    		} else { 
	    			thisgrid = "1";
	    			var gmax = complexityscoregrid[complexityissuecount][gridindex];
	    			var gmin = complexityscoregrid[complexityissuecount][gridindex-1];
	    			minmaxratio = (complexityscore - gmin)/(gmax-gmin) ;
	    		}
	    	}
	    	if ( thisgrid == "1" ) { 
	    		xval = xval + (xinc*minmaxratio); 
	    		// alert(gridindex+" "+minmaxratio);
	    	} 
	    	else { xval = xval + xinc; }	
	    	gridindex++;
	    }
	    // alert(complexityscore+" "+complexityscoremin[complexityissuecount]+" "+complexityscoremax[complexityissuecount]+" "+minmaxratio);
	    $('#complexitymarker').css({
		    position : 'absolute',
		    top : complexitybackdropposition.top + yval ,
		    left : complexitybackdropposition.left + xval -15,
		    width : 30,
		    height : 30,
		    "background-color" : "white",
		    "border" : "5px solid #990099"	    
	    });
	    $('#complexitymarker').show();
	} else {
		$('#complexitymarker').hide();		
	}
}


//================= Actions Tab Routines =========================

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



$(document).ready( function() { 
	
	// version  dated 20th June 2018
	
	var areyousurestate = "clean"; // used to control exit without data save
	var commnewindex = 0;
	
	var commnewindex = 0;
	var resinewindex = 0;
	var outletcommsnewindex = 0;	
	var surveynewindex = 0;	

	var corcommida = new Array();
	var corresiida = new Array();
	var outletcorcommsida = new Array();
	var corsurveyida = new Array();
	
	var currenttextareaopenid = "";
	var currentquotedatemarkeractiveid = "";
	
	var modelbuttonpressed = "";	
	
	var corsite_id = $('#corsite_id').val();
	var corsite_version = $('#corsite_version').val();
	var corsite_corprogramme = $('#corsite_corprogramme').val();
	var corprogramme_customtablist = $('#corprogramme_customtablist').val() + ",";	
	var coruserlevel = $('#coruserlevel').val();	
	if (corsite_version != "Live") { $('.nav-tabs').css('background-color', NameToSwatch(corsite_version)) }
	
	document.title = $('#TabTitle').val();
	// alert(areyousurestate);
    /*	
	$('#corsiteupdateform').areYouSure( 		
		{'message':'Are you sure you want to close this site without saving? (Updates may be lost)'} // doesnt override browser default message !!		
	);
	*/

    $('#corsiteupdateform').areYouSure( {'silent':true} );
    $(window).on('beforeunload', function() {
        if ($('#corsiteupdateform').hasClass('dirty') && (areyousurestate == "dirty")) {
            return 'Are you sure you want to close this site without saving? (Updates may be lost)'; // doesnt override browser default message !!		
        }
    });

	$('#SaveLock').on('click', function(event) {
		if ( coruserlevel > "2") {
			areyousurestate = "clean"; // prevent areyousure from triggering
			$('[name=SubmitAction]').val('SaveLock');		
			if ( $('#locked').attr('src') == "../site_assets/LockedByOther.png") {
				var corsite_lockedpersonid = $('#corsite_lockedpersonid').val();
				alert("This site is currently locked by "+corsite_lockedpersonid+" You are not authorised to make changes.");
				e.preventDefault();
			} else {
				$("#corsiteupdateform").submit();								
			}
		} else {
			alert("Sorry: You are not authorised to make changes.");
		}
	});		

	$('#SaveUnlock').on('click', function(event) {
		if ( coruserlevel > "2") {
			areyousurestate = "clean"; // prevent areyousure from triggering
			$('[name=SubmitAction]').val('SaveUnlock');		
			if ( $('#locked').attr('src') == "../site_assets/LockedByOther.png") {
				var corsite_lockedpersonid = $('#corsite_lockedpersonid').val();
				alert("This site is currently locked by "+corsite_lockedpersonid+" You are not authorised to make changes.");
				e.preventDefault();
			} else {
				$("#corsiteupdateform").submit();								
			}
		} else {
			alert("Sorry: You are not authorised to make changes.");
		}
	});		
	
	$('#CloseSite').on('click', function(event) {
		areyousurestate = "clean"; // prevent areyousure from triggering
		$('[name=SubmitAction]').val('Close');		
    	if ( $('#locked').attr('src') == "../site_assets/LockedByMe.png") {		    	
			$.confirm({
				icon: 'fa fa-question-circle text-warning',
			    title: 'Close',
			    content: 'Are you sure you want to close this site without saving? (Any updates will be lost)',
			    buttons: {
			        somethingElse: {
			            text: 'Close',
			            btnClass: 'btn-blue',
			            action: function(){
							$('#corsiteupdateform').trigger('reinitialize.areYouSure'); // prevent double warning				
							$("#corsiteupdateform").submit();
			            }
			        },
			        cancel: function () { 
			        	
			        },
			    }
			});
    	} else {
    		// BackToMenu();
    		window.close();
    	}
	});
	
	function BackToMenu() {
		var sUrl = JSSitePHPURL()+"/v1_personreloginin.php"+STDPARMS();	 
		window.location.replace(sUrl); 
	}		
	
	$('#SaveClose').on('click', function(event) {
		areyousurestate = "clean"; // prevent areyousure from triggering
		if ( coruserlevel > "2") {
			$('[name=SubmitAction]').val('SaveClose');
			if ( $('#locked').attr('src') == "../site_assets/LockedByOther.png") {
				var corsite_lockedpersonid = $('#corsite_lockedpersonid').val();
				alert("This site is currently locked by "+corsite_lockedpersonid+" You are not authorised to make changes.");
				e.preventDefault();
			} else {
				$("#corsiteupdateform").submit();								
			}
		} else {
			alert("Sorry: You are not authorised to make changes.");
		}			
	});		

	$('input[type="text"]').keypress(function (e) {
	    var code = e.keyCode || e.which;
	    if (code === 13)
	    e.preventDefault();  // stop form submission on enter
	});
	
	$('.datepicker').keypress(function (e) {
	    var code = e.keyCode || e.which;
	    if (code === 13) {
	    	e.preventDefault();  // stop form submission on enter
	    	$(this).datepicker('hide');	
	    }
	});
	
	$("#notespopup").dialog({
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
		autoOpen: false,
		width: "80%",
		overflow:"auto"
	});		
	
	$("#textareapopup").dialog({
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
		autoOpen: false,
		width: "20%",
		overflow:"auto"
	});				
	
	$("#quotedatemarkerpopup").dialog({
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
		autoOpen: false,
		width: "20%",
		overflow:"auto"
	});	
	
	$("#newsurveypopup").dialog({
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
		autoOpen: false,
		width: "30%",
		overflow:"auto"
	});	
	
	$("#newoutletclasspopup").dialog({
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
		autoOpen: false,
		width: "30%",
		overflow:"auto"
	});	
	
	$("#newoutletcopopup").dialog({
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
		autoOpen: false,
		width: "30%",
		overflow:"auto"
	});	
	
	$('.form-control').on('click', function(event) { 
		var thistab = $(this).closest('.tab-pane').attr('id');
		formChanged(thistab);
	});
	$( ".form-control" ).change(function() {
		formChanged();
	});
	$('.form-control').on('keydown', function(event) {	// deleted text	
		if ((event.keyCode == 8)||(event.keyCode == 46)) {
			formChanged();
		}
	});		
	
	$('.slimimageupdatebutton').on('click', function(event) {		
		formChanged();
	});
	$('.slimimageremovebutton').on('click', function(event) {		
		formChanged();
	});	
	
	function formChanged(thistab) {
		// alert(thistab);
		areyousurestate = "dirty";
		if ( coruserlevel > "2") {
			if (corsite_id != "new") {
				$allowchange = "1";
				if ( coruserlevel == "3") {
					if (thistab == "PLNG") { $allowchange = "0"; }
					if (thistab == "PLNS") { $allowchange = "0"; }					
				}
				if ( $allowchange == "1" ) {
					$('#corsiteupdateform').trigger('checkform.areYouSure');
					if ( $('#locked').attr('src') == "../site_assets/UnLocked.png") {
		    			$.confirm({
		    				icon: 'fa fa-lock text-info',
		    			    title: 'Commencing Update',
		    			    content: 'Lock site whilst you are making updates?',
		    			    buttons: {
		    			        somethingElse: {
		    			            text: 'Lock Site',
		    			            btnClass: 'btn-blue',
		    			            action: function(){
		    			            	LockRequest("LockRequest");
		    			            }
		    			        },
		    			        cancel: function () {  },
		    			    }
		    			});
					}
					if ( $('#locked').attr('src') == "../site_assets/LockedByOther.png") {
						var corsite_lockedpersonid = $('#corsite_lockedpersonid').val();
		    			$.confirm({
		    				icon: 'fa fa-lock text-info',
		    			    title: 'Commencing Update',
		    			    content: 'Check site to see if it is still locked?',
		    			    buttons: {
		    			        somethingElse: {
		    			            text: 'Check',
		    			            btnClass: 'btn-blue',
		    			            action: function(){
		    			            	LockRequest("LockRequest");
		    			            }
		    			        },
		    			        cancel: function () {  },
		    			    }
		    			});
					}
				} else {
		    		$.alert({
		    			icon: 'fa fa-lock text-danger',
		    			title: "Warning",
		    		    content: "Sorry: You are not authorised to make changes."
		    		});	
				}
			}
		} else {
    		$.alert({
    			icon: 'fa fa-lock text-danger',
    			title: "Warning",
    		    content: "Sorry: You are not authorised to make changes."
    		});			
		}
	}		
	
	$('.form-control').change( function() {	
		var intext = $(this).val();
		// if (intext.includes('https:')){ $(this).val(intext.replace('https:', ''));}
		// if (intext.includes('http:')){ $(this).val(intext.replace('http:', ''));}		
	});				
	
	$('#todolist').on('click', function(event) {
		var corsite_notes = $("#corsite_notes").val();
		$("#notescontent").val(corsite_notes);
		$("#notespopup").dialog("open");  
    	$("#notespopup").width("80%");
    	$("#notespopup").height("60%");	   	
	})
	
	$('#notessave').on('click', function(event) {
		$("#corsite_notes").val($("#notescontent").val());
		$("#notespopup").dialog("close");   	
	})	
		
	$('#notesnosave').on('click', function(event) {
		$("#notespopup").dialog("close");   	
	})			
	
	$('#googlemaps').on('click', function(event) {
		var corsite_googlemapslink = outLink($('#corsite_googlemapslink').val(),"http:");
		if ( corsite_googlemapslink != "" ) {
			window.open(corsite_googlemapslink,'GoogleMapsWindow', 'top=100, left=100, width=800, height=600');			
		} else {
			alert("No Google Maps Link available for this site");		
		}	
	})	
	
	$('#dropbox').on('click', function(event) {
		var corsite_dropboxmasterfolder = outLink($('#corsite_dropboxmasterfolder').val(),"http:");
		if ( corsite_dropboxmasterfolder != "" ) {
			window.open(corsite_dropboxmasterfolder,'DropboxWindow', 'top=100, left=100, width=800, height=600');			
		} else {
			alert("No Dropbox Link available for this site");		
		}	
	})

	$('#planningportal').on('click', function(event) {
		var corsite_planningportallink = outLink($('#corsite_planningportallink').val(),"http:");
		if ( corsite_planningportallink != "" ) {
			window.open(corsite_planningportallink,'PlanningPortalWindow', 'top=100, left=100, width=800, height=600');			
		} else {
			alert("No Planning Portal Link available for this site");			
		}		
	})	
	
	$('#landregistry').on('click', function(event) {
		var corsite_landregistrylink = outLink($('#corsite_landregistrylink').val(),"http:");
		if ( corsite_landregistrylink != "" ) {
			window.open(corsite_landregistrylink,'LandRegistryWindow', 'top=100, left=100, width=800, height=600');			
		} else {
			alert("No Land Registry Link available for this site");			
		}		
	})	
	
	function outLink(inlink,prelink) {
		if ( inlink[0]+inlink[1] == "//" ) {
			inlink = inlink.replace("//", prelink+"//");	``
		}
		return inlink;
	}
	
	
	
	
	$('#mpdfreports').on('click', function(event) {
		var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_mpdfrelevantreportlist.php"+STDPARMS();
		// var corsite_id = $('#corsite_id').val();
		sUrl = sUrl + "&keynamelist=corsite_id,corsite_version"+ "&keyvaluelist=" + corsite_id + "," + corsite_version;
		// window.location.href = sUrl;
    	if ( $('#locked').attr('src') == "../site_assets/LockedByMe.png") {		    	
			$.confirm({
				icon: 'fa fa-question-circle text-warning',
			    title: 'Report',
			    content: 'Are you sure you want to generate the PDF report without your latest updates. Please Save before creating the report.',
			    buttons: {
			        somethingElse: {
			            text: 'Generate PDF Report',
			            btnClass: 'btn-orange',
			            action: function(){
							$('#corsiteupdateform').trigger('reinitialize.areYouSure'); // prevent double warning				
							window.open (sUrl,"PDF reports");
			            }
			        },
			        cancel: function () {  },
			    }
			});			
    	} else {
    		window.open (sUrl,"PDF reports");
    	}
	})
	
	$('#versioning').on('click', function(event) {
		var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_corsiteversioningout.php"+STDPARMS();
		// var corsite_id = $('#corsite_id').val();
		var corsite_version = $('#corsite_version').val();
		sUrl = sUrl + "&corsite_id="+corsite_id + "&corsite_version="+corsite_version;
		// alert(sUrl);
		// window.location.href = sUrl;
		// window.open (sUrl,"Modelling Centre");
		window.location.replace(sUrl);
	})	
	
	$('#locked').on('click', function(event) {
		if ( coruserlevel > "2") {				
			LockRequest("QueryLockStatus");			
		} else {
			alert("Warning: You are not authorised to save any changes you may make.");		
		}			
	})	
	
	$('#corsite_status').on('click', function(event) {
	    var optionSelected = $('#corsite_status').find("option:selected");
	    var soptionSelected = $('#corsite_salestatus').find("option:selected");
	    var valueSelected  = optionSelected.val(); 
	    var svalueSelected  = soptionSelected.val(); 
		if (valueSelected == "Pending Review") { $('#Pending_Review').attr('class', 'btn btn-success'); }
		else { $('#Pending_Review').attr('class', 'btn btn-secondary'); }			
		if (valueSelected == "Assessment") { $('#Assessment').attr('class', 'btn btn-success'); }
		else { $('#Assessment').attr('class', 'btn btn-secondary'); }				
		if (valueSelected == "Neg-PrePlanning") { $('#Neg-PrePlanning').attr('class', 'btn btn-success'); }
		else { $('#Neg-PrePlanning').attr('class', 'btn btn-secondary'); }				
		if (valueSelected == "Planning") { $('#Planning').attr('class', 'btn btn-success'); }
		else { $('#Planning').attr('class', 'btn btn-secondary'); }						
		if (valueSelected == "Construction") { $('#Construction').attr('class', 'btn btn-success'); }
		else { $('#Construction').attr('class', 'btn btn-secondary'); }	
		if ((valueSelected == "Sale")||(svalueSelected == "On Market")) { $('#Sale').attr('class', 'btn btn-success'); }
		else { $('#Sale').attr('class', 'btn btn-secondary'); }
		if ((valueSelected == "Legals")||(svalueSelected == "Legals")||(svalueSelected == "Exchanged")) { $('#Legals').attr('class', 'btn btn-success'); }
		else { $('#Legals').attr('class', 'btn btn-secondary'); }
		if ((valueSelected == "Sold")||(svalueSelected == "Completed")) { $('#Sold').attr('class', 'btn btn-success'); }
		else { $('#Sold').attr('class', 'btn btn-secondary'); }				
		if (valueSelected == "Shelved") { $('#Shelved').attr('class', 'btn btn-success'); }
		else { $('#Shelved').attr('class', 'btn btn-secondary'); }				
		if (valueSelected == "Dropped") { $('#Dropped').attr('class', 'btn btn-success'); }
		else { $('#Dropped').attr('class', 'btn btn-secondary'); }

	})	
	
	
	$('#corsite_salestatus').on('click', function(event) {
	    var optionSelected = $('#corsite_status').find("option:selected");
	    var soptionSelected = $('#corsite_salestatus').find("option:selected");
	    var valueSelected  = optionSelected.val(); 
	    var svalueSelected  = soptionSelected.val(); 
		if (valueSelected == "Pending Review") { $('#Pending_Review').attr('class', 'btn btn-success'); }
		else { $('#Pending_Review').attr('class', 'btn btn-secondary'); }			
		if (valueSelected == "Assessment") { $('#Assessment').attr('class', 'btn btn-success'); }
		else { $('#Assessment').attr('class', 'btn btn-secondary'); }				
		if (valueSelected == "Neg-PrePlanning") { $('#Neg-PrePlanning').attr('class', 'btn btn-success'); }
		else { $('#Neg-PrePlanning').attr('class', 'btn btn-secondary'); }				
		if (valueSelected == "Planning") { $('#Planning').attr('class', 'btn btn-success'); }
		else { $('#Planning').attr('class', 'btn btn-secondary'); }						
		if (valueSelected == "Construction") { $('#Construction').attr('class', 'btn btn-success'); }
		else { $('#Construction').attr('class', 'btn btn-secondary'); }	
		if ((valueSelected == "Sale")||(svalueSelected == "On Market")) { $('#Sale').attr('class', 'btn btn-success'); }
		else { $('#Sale').attr('class', 'btn btn-secondary'); }
		if ((valueSelected == "Legals")||(svalueSelected == "Legals")||(svalueSelected == "Exchanged")) { $('#Legals').attr('class', 'btn btn-success'); }
		else { $('#Legals').attr('class', 'btn btn-secondary'); }
		if ((valueSelected == "Sold")||(svalueSelected == "Completed")) { $('#Sold').attr('class', 'btn btn-success'); }
		else { $('#Sold').attr('class', 'btn btn-secondary'); }				
		if (valueSelected == "Shelved") { $('#Shelved').attr('class', 'btn btn-success'); }
		else { $('#Shelved').attr('class', 'btn btn-secondary'); }				
		if (valueSelected == "Dropped") { $('#Dropped').attr('class', 'btn btn-success'); }
		else { $('#Dropped').attr('class', 'btn btn-secondary'); }
		$("#salestatuscopy").html(svalueSelected);
	})	
	
	
	$('#wklysummary_add_new').on('click', function(event) {
		var wklysummary_personid = $("#wklysummary_personid").val();
		var wklysummary_ddmm = $("#wklysummary_ddmm").val();
		var wklysummary_action = $("#wklysummary_action").val();				
		var corsite_wklysummary = $("#corsite_wklysummary").val();
		corsite_wklysummary = wklysummary_ddmm+" "+wklysummary_personid+": "+wklysummary_action+"\n"+corsite_wklysummary;
		$("#corsite_wklysummary").val(corsite_wklysummary);
		$("#wklysummary_action").val("");
		formChanged();
	})
	
	
	
	
	$('#corsite_proposalnewrag').on('click', function(event) {
	    var optionSelected = $('#corsite_proposalnewrag').find("option:selected");
	    var valueSelected  = optionSelected.val();     
	    var newclass = 'btn-default';
	    if (valueSelected == "Green") { newclass = 'btn-success'; }
	    if (valueSelected == "Amber") { newclass = 'btn-warning'; }
	    if (valueSelected == "Red") { newclass = 'btn-danger'; }
	    $('#RAGButton').text("Assessment - "+valueSelected); 
	    $('#RAGButton').removeClass( "btn-default btn-success btn-warning btn-danger" ).addClass( newclass ); 
	})
	
	$("#corsite_quoteready").on('focus', function () {
        previous = this.value;
    }).change(function() {    	
    	if ( coruserlevel == 5 ) {
    		recalc(); // change colours of buttons
    	} else {
	    	if (this.value == "Y") {
	    		$.confirm({
					icon: 'fa fa-lock text-info',
				    title: 'Quotation Lock',
				    content: 'This will lock the quotations - are you sure?',
				    buttons: {
				        somethingElse: {
				            text: 'Lock Site',
				            btnClass: 'btn-blue',
				            action: function(){
				            	$("#corsite_quoteready").val("Y");
				            	recalc();
				            }
				        },
				        cancel: function () { 
				        	$("#corsite_quoteready").val("N");
				        	recalc();
				        },
				    }
				});   		
	    	}   	
	    	if ((this.value == "N")||(this.value == "")) {
	    		if (previous == "Y") {
		    		$.alert({
		    			icon: 'fa fa-lock text-danger',
		    			title: "Warning",
		    		    content: 'You are not allowed to perform this action.'
		    		});	    			
		    		$("#corsite_quoteready").val("Y");
	    		}
	    	}
    	}
    });

	$('#corresi_add_new').on('click', function(event) {
		resinewindex++;
		var insertresi = "";
		insertresi = insertresi + '<div class="row row-eq-height">';
		insertresi = insertresi + '<div class="col-sm-2"><input id="corresi_class_new'+resinewindex+'" name="corresi_class_new'+resinewindex+'" class="form-control" type="text" value=""></div>';
		insertresi = insertresi + '<div class="col-sm-1"><input id="corresi_quantity_new'+resinewindex+'" name="corresi_quantity_new'+resinewindex+'" class="calcin form-control" style="background-color: MintCream; color: black; text-align: right;" type="text" value="0"></div>';
		insertresi = insertresi + '<div class="col-sm-1"><input id="corresi_area_new'+resinewindex+'" name="corresi_area_new'+resinewindex+'" class="calcin form-control" style="background-color: MintCream; color: black; text-align: right;" type="text" value="0"></div>';
		insertresi = insertresi + '<div class="col-sm-1"><input id="corresi_beds_new'+resinewindex+'" name="corresi_beds_new'+resinewindex+'" class="form-control" type="text" value="0"></div>';
		insertresi = insertresi + '<div class="col-sm-1"><input id="corresi_value_new'+resinewindex+'" name="corresi_value_new'+resinewindex+'" class="calcin form-control" style="background-color: MintCream; color: black; text-align: right;" type="text" value="0"></div>';
		insertresi = insertresi + '<div class="col-sm-1"><input id="corresi_prediscountcalc_new'+resinewindex+'" name="corresi_prediscountcalc_new'+resinewindex+'" class="calcres form-control" type="text" value="0"  style="background-color: lightgray; color: black; text-align: right;"  ></div>';
		insertresi = insertresi + '<div class="col-sm-1"><input id="corresi_discountpercent_new'+resinewindex+'" name="corresi_discountpercent_new'+resinewindex+'" class="calcinpercent form-control" style="background-color: MintCream; color: black; text-align: right;" type="text" value="0.00%"></div>';
		insertresi = insertresi + '<div class="vcenter col-sm-1">&nbsp;</div>';
		insertresi = insertresi + '<div class="col-sm-1"><input id="corresi_postdiscountcalc_new'+resinewindex+'" name="corresi_postdiscountcalc_new'+resinewindex+'" class="calcres formcalc form-control" type="text" value="0"  style="background-color: lightgray; color: black; text-align: right;"  ></div>';
		insertresi = insertresi + '<div class="col-sm-1">';
		insertresi = insertresi + '<button id="corresi_delete_new'+resinewindex+'" type="button" class="residelete btn btn-danger">x</button>';
		insertresi = insertresi + '</div>';
		insertresi = insertresi + '<div class="vcenter col-sm-1">&nbsp;</div>';
		insertresi = insertresi + '</div>';
		corresiida["new"+resinewindex] = "new"+resinewindex;
		$( "#resilistend" ).before( insertresi );
		recalclistener();
		resideletelistener();
		formChanged();
		recalc();
	})
	
	$('#corcomm_add_new').on('click', function(event) {
		commnewindex++;
		var insertcomm = "";

		insertcomm = insertcomm + '<div id="corcommsection'+commnewindex+'">';		
		insertcomm = insertcomm + '<div class="row row-eq-height">';
		insertcomm = insertcomm + '<div class="col-sm-2"><input id="corcomm_tenantname_new'+commnewindex+'" name="corcomm_tenantname_new'+commnewindex+'" class=" form-control"  type="text" value=""></div>';
		insertcomm = insertcomm + '<div class="col-sm-1"><input id="corcomm_area_new'+commnewindex+'" name="corcomm_area_new'+commnewindex+'" class="calcin form-control" style="background-color: MintCream; color: black; text-align: right;" type="text" value="0"></div>';
		insertcomm = insertcomm + '<div class="col-sm-1"><input id="corcomm_rentpersqftcalc_new'+commnewindex+'" name="corcomm_rentpersqftcalc_new'+commnewindex+'" class="calcres form-control" style="background-color: lightgray; color: black; text-align: right;" type="text" value="0"></div>';
		insertcomm = insertcomm + '<div class="col-sm-1"><input id="corcomm_rentperannum_new'+commnewindex+'" name="corcomm_rentperannum_new'+commnewindex+'" class="calcin form-control" style="background-color: MintCream; color: black; text-align: right;" type="text" value="0"></div>';
		insertcomm = insertcomm + '<div class="col-sm-1"><input id="corcomm_yieldpercent_new'+commnewindex+'" name="corcomm_yieldpercent_new'+commnewindex+'" class="calcinpercent form-control" style="background-color: MintCream; color: black; text-align: right;" type="text" value="0"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="col-sm-1"><input id="corcomm_tenantgdvcalc_new'+commnewindex+'" name="corcomm_tenantgdvcalc_new'+commnewindex+'" class="calcres form-control" style="background-color: lightgray; color: black; text-align: right;" type="text" value="0"></div>';
		insertcomm = insertcomm + '<div class="col-sm-1">';
		insertcomm = insertcomm + '<button id="corcomm_delete_new'+commnewindex+'" class="commdelete btn btn-danger" type="button" >x</button>';
		insertcomm = insertcomm + '</div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1">&nbsp;</div>';
		insertcomm = insertcomm + '</div>';
		insertcomm = insertcomm + '<div class="row row-eq-height">';
		insertcomm = insertcomm + '<div class="vcenter col-sm-2">Purchasers Costs</div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="col-sm-1"><input id="corcomm_purchaserscostpercent_new'+commnewindex+'" name="corcomm_purchaserscostpercent_new'+commnewindex+'" class="calcinpercent form-control" style="background-color: MintCream; color: black; text-align: right;" type="text" value="0"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="col-sm-1"><input id="corcomm_purchaserscostgdvcalc_new'+commnewindex+'" name="corcomm_purchaserscostgdvcalc_new'+commnewindex+'" class="calcres form-control" style="background-color: lightgray; color: black; text-align: right;" type="text" value="0"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-2"></div>';
		insertcomm = insertcomm + '</div>';
		
		insertcomm = insertcomm + '<div class="row row-eq-height" style="padding-top: 6px" >';
		insertcomm = insertcomm + '<div class="vcenter col-md-7" style="background-color:white; color:black;"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-md-2" style="background-color:#f2d30c; color:black;"><b>Net Capital Value</b></div>';
		insertcomm = insertcomm + '<div class="col-md-1" style="background-color:#f2d30c;">';
		insertcomm = insertcomm + '<input id="corcomm_netcapitalvaluecalc_new'+commnewindex+'" name="corcomm_netcapitalvaluecalc_new'+commnewindex+'" class="calcres form-control" style="background-color: lightgray; color: black; text-align: right;" type="text" value="0">';
		insertcomm = insertcomm + '</div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-2">&nbsp;<br>&nbsp;</div>';
		insertcomm = insertcomm + '</div>';		
		
		insertcomm = insertcomm + '<div class="row row-eq-height">';
		insertcomm = insertcomm + '<div class="vcenter col-sm-2">Rent Free</div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="col-sm-1"><input id="corcomm_rentfreemths_new'+commnewindex+'" name="corcomm_rentfreemths" class="calcin form-control" style="background-color: MintCream; color: black; text-align: right;" type="text" value="0"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="col-sm-1"><input id="corcomm_rentfreegdvcalc_new'+commnewindex+'" name="corcomm_rentfreegdvcalc" class="calcres form-control" style="background-color: lightgray; color: black; text-align: right;" type="text" value="0"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-2"></div>';
		insertcomm = insertcomm + '</div>';
		insertcomm = insertcomm + '<div class="row row-eq-height">';
		insertcomm = insertcomm + '<div class="vcenter col-sm-2">Cap Con</div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="col-sm-1"><input id="corcomm_capcon_new'+commnewindex+'" name="corcomm_capcon_new'+commnewindex+'" class="calcin form-control" style="background-color: MintCream; color: black; text-align: right;" type="text" value="0"></div>';
		insertcomm = insertcomm + '<div class="col-sm-1"><input id="corcomm_capcongdvcalc_new'+commnewindex+'" name="corcomm_capcongdvcalc_new'+commnewindex+'" class="calcres form-control" style="background-color: lightgray; color: black; text-align: right;" type="text" value="0"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-2"></div>';
		insertcomm = insertcomm + '</div>';
		insertcomm = insertcomm + '<div class="row row-eq-height">';
		insertcomm = insertcomm + '<div class="vcenter col-sm-2">Surrender Cost</div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-1"></div>';
		insertcomm = insertcomm + '<div class="col-sm-1"><input id="corcomm_surrendercost_new'+commnewindex+'" name="corcomm_surrendercost_new'+commnewindex+'" class="calcin form-control" style="background-color: MintCream; color: black; text-align: right;" type="text" value="0"></div>';
		insertcomm = insertcomm + '<div class="col-sm-1"><input id="corcomm_surrendercostgdvcalc_new'+commnewindex+'" name="corcomm_surrendercostgdvcalc_new'+commnewindex+'" class="calcres form-control" style="background-color: lightgray; color: black; text-align: right;" type="text" value="0"></div>';
		insertcomm = insertcomm + '<div class="vcenter col-sm-2"></div>';
		insertcomm = insertcomm + '</div>';
		insertcomm = insertcomm + '</div>';		
		corcommida["new"+commnewindex] = "new"+commnewindex;
		$( "#commlistend" ).before( insertcomm );
		recalclistener();
		commdeletelistener();
		formChanged();
		recalc();
	})	
	
	
	$('#corsurvey_add_new').on('click', function(event) {
		$("#newsurveypopup").dialog("open"); 
		$("input[name='newcorsurveycategorylist[]']").each(function() { this.checked = false;} );
    	$("#newsurveypopup").width("80%");
    	$("#newsurveypopup").height("60%");	
	})	
	
	$('#newsurveyselect').on('click', function(event) {
		// alert('#newsurveyselect');		
		$("#newsurveypopup").dialog("close");  
		// var newsurveycategory_id = $("input[name='newcorsurveycategory_id']:checked").val();
		var items = new Array();
		$("input[name='newcorsurveycategorylist[]']:checked").each(function(){items.push($(this).val());});
		insertsurvey = "";
		var addedsuffixa = new Array();
		for (var itemi in items) {
			newsurveycategory_id = items[itemi];
			// alert(newsurveycategory_id);
			surveynewindex++;
			insertsurvey = insertsurvey + '<input type="hidden" name="corsurvey_surveycategoryid_new'+surveynewindex+'" value="'+newsurveycategory_id+'">';
			insertsurvey = insertsurvey + '<div class="row row-eq-height">';
			insertsurvey = insertsurvey + '<div class="vcenter col-sm-1"><img id="corsurvey_delete_new'+surveynewindex+'" src="../site_assets/minidelete.png" class="surveydelete" />'+newsurveycategory_id+'</div>';
			// insertsurvey = insertsurvey + '<div class="col-sm-1"><input id="corsurvey_supplier_new'+surveynewindex+'" name="corsurvey_supplier_new'+surveynewindex+'" class=" form-control"  type="text" value=""></div>';
			// insertsurvey = insertsurvey + '<div class="col-sm-1"><input id="corsurvey_account_new'+surveynewindex+'" name="corsurvey_account_new'+surveynewindex+'" class=" form-control"  type="text" value=""></div>';
			
			insertsurvey = insertsurvey + '<div class="col-sm-1">';			
			insertsurvey = insertsurvey + '<select id="corsurvey_supplier_new'+surveynewindex+'" name="corsurvey_supplier_new'+surveynewindex+'" class="form-control">';
			var corsuppliera = Get_Array_Hash('corsupplier');
			if (corsuppliera.length >0) {
				for (var corsupplieri in corsuppliera) {
					var corsupplierid = corsuppliera[corsupplieri];
					Get_Data_Hash('corsupplier',corsupplierid);
					insertsurvey = insertsurvey + '<option value="'+corsupplierid+'" >'+GLOBALS['corsupplier_name']+'</option>';
				}
				insertsurvey = insertsurvey + '<option value="" selected></option>';
			} else {
				insertsurvey = insertsurvey + '<option value="" selected>No Survey Categories Setup</option>';
			}			
			insertsurvey = insertsurvey + '</select >';
			insertsurvey = insertsurvey + '</div>';
			
			insertsurvey = insertsurvey + '<div class="col-sm-1">';			
			insertsurvey = insertsurvey + '<select id="corsurvey_account_new'+surveynewindex+'" name="corsurvey_account_new'+surveynewindex+'" class="form-control">';
			var coraccounta = Get_Array_Hash('coraccount');
			if (coraccounta.length >0) {
				for (var coraccounti in coraccounta) {
					var coraccountid = coraccounta[coraccounti];
					Get_Data_Hash('coraccount',coraccountid);
					insertsurvey = insertsurvey + '<option value="'+coraccountid+'" >'+GLOBALS['coraccount_name']+'</option>';
				}
				insertsurvey = insertsurvey + '<option value="" selected></option>';
			} else {
				insertsurvey = insertsurvey + '<option value="" selected>No Accounts Setup</option>';
			}			
			insertsurvey = insertsurvey + '</select >';
			insertsurvey = insertsurvey + '</div>';						
			insertsurvey = insertsurvey + '<div class="col-sm-1"><input id="corsurvey_description_new'+surveynewindex+'" name="corsurvey_description_new'+surveynewindex+'" class="textarea form-control"  type="text" value=""></div>';				
			insertsurvey = insertsurvey + '<div class="col-sm-1">';			
			insertsurvey = insertsurvey + '<input id="corsurvey_ph1quote_new'+surveynewindex+'" name="corsurvey_ph1quote_new'+surveynewindex+'" class="calcin quoteval form-control" style="background-color: MintCream; color: black; text-align: right;" type="text" value="0">';
			insertsurvey = insertsurvey + '<button id="corsurvey_ph1quoteinvrecddate_marker_new'+surveynewindex+'" type="button" class="quotedatemarker btn btn-secondary"><span><i class="fa fa-refresh fa-file-text-o"></i></span></button>';
			insertsurvey = insertsurvey + '<input type=hidden id="corsurvey_ph1quoteinvrecddate_new'+surveynewindex+'" name="corsurvey_ph1quoteinvrecddate_new'+surveynewindex+' value="">';			
			insertsurvey = insertsurvey + '</div>';					
			insertsurvey = insertsurvey + '<div class="col-sm-1">';			
			insertsurvey = insertsurvey + '<input id="corsurvey_adhocquote_new'+surveynewindex+'" name="corsurvey_adhocquote_new'+surveynewindex+'" class="calcin quoteval form-control" style="background-color: MintCream; color: black; text-align: right;" type="text" value="0">';
			insertsurvey = insertsurvey + '<button id="corsurvey_adhocquoteinvrecddate_marker_new'+surveynewindex+'" type="button" class="quotedatemarker btn btn-secondary"><span><i class="fa fa-refresh fa-file-text-o"></i></span></button>';
			insertsurvey = insertsurvey + '<input type=hidden id="corsurvey_adhocquoteinvrecddate_new'+surveynewindex+'" name="corsurvey_adhocquoteinvrecddate_new'+surveynewindex+' value="">';			
			insertsurvey = insertsurvey + '</div>';								
			insertsurvey = insertsurvey + '<div class="col-sm-1">';			
			insertsurvey = insertsurvey + '<input id="corsurvey_successfee_new'+surveynewindex+'" name="corsurvey_successfee_new'+surveynewindex+'" class="calcin quoteval form-control" style="background-color: MintCream; color: black; text-align: right;" type="text" value="0">';
			insertsurvey = insertsurvey + '<button id="corsurvey_successfeeinvrecddate_marker_new'+surveynewindex+'" type="button" class="quotedatemarker btn btn-secondary"><span><i class="fa fa-refresh fa-file-text-o"></i></span></button>';
			insertsurvey = insertsurvey + '<input type=hidden id="corsurvey_successfeeinvrecddate_new'+surveynewindex+'" name="corsurvey_successfeeinvrecddate_new'+surveynewindex+' value="">';			
			insertsurvey = insertsurvey + '</div>';					
//			insertsurvey = insertsurvey + '<div class="col-sm-1"><input id="corsurvey_adhocquote_new'+surveynewindex+'" name="corsurvey_adhocquote_new'+surveynewindex+'" class="calcin form-control" style="background-color: MintCream; color: black; text-align: right;" type="text" value="0"></div>';
//			insertsurvey = insertsurvey + '<div class="col-sm-1"><input id="corsurvey_successfee_new'+surveynewindex+'" name="corsurvey_successfee_new'+surveynewindex+'" class="calcin form-control" style="background-color: MintCream; color: black; text-align: right;" type="text" value="0"></div>';
			insertsurvey = insertsurvey + '<div class="col-sm-1"><input id="corsurvey_totalquotecalc_new'+surveynewindex+'" name="corsurvey_totalquotecalc_new'+surveynewindex+'" class="calcres form-control" style="background-color: lightgray; color: black; text-align: right;" type="text" value="0"></div>';
			insertsurvey = insertsurvey + '<div class="col-sm-1"><input id="corsurvey_bookeddate_new'+surveynewindex+'" name="corsurvey_bookeddate_new'+surveynewindex+'" class="datepicker form-control" value=""></div>';	
			insertsurvey = insertsurvey + '<div class="col-sm-1"><input id="corsurvey_completed_new'+surveynewindex+'" name="corsurvey_completed_new'+surveynewindex+'" class="rag form-control" style="background-color:white" type="text" value=""></div>';
			insertsurvey = insertsurvey + '<div id="corsurvey_costexvatsagecalc_new'+surveynewindex+'" class="vcenter  col-sm-1">0</div>';
			insertsurvey = insertsurvey + '<div class="col-sm-1"><input id="corsurvey_costvsquotevarcalc_new'+surveynewindex+'" name="corsurvey_costvsquotevarcalc_new'+surveynewindex+'" class=" form-control"  type="text" value="0"></div>';
			insertsurvey = insertsurvey + '</div>';			
			corsurveyida["new"+surveynewindex] = "new"+surveynewindex;
			addedsuffixa.push("new"+surveynewindex);
		}
		$( "#surveylistend" ).before( insertsurvey );
		for (var addedsuffixi in addedsuffixa) {
			$( "#corsurvey_bookeddate_"+addedsuffixa[addedsuffixi] ).datepicker();
		}
		// datepickerlistener();
		recalclistener();
		surveydeletelistener();
		surveyquotedatemarkerlistener();
		surveyquotevallistener();
		formChanged();
		recalc();	
	})	
	
	$('#newsurveynoselect').on('click', function(event) {
		$("#newsurveypopup").dialog("close");   	
	})	

	
	$('#corsitecomms_add_new').on('click', function(event) {
		var commsdatetime = "T"+timeStamp();
		var insertcomms = "";	
		insertcomms = insertcomms + '<div class="row row-eq-height">';
		insertcomms = insertcomms + '<div class="col-sm-1"><input id="corsitecomms_date_'+commsdatetime+'" name="corsitecomms_date_'+commsdatetime+'" class="datepicker form-control" value=""></div>';
		insertcomms = insertcomms + '<div class="col-sm-1"><input id="corsitecomms_time_'+commsdatetime+'" name="corsitecomms_time_'+commsdatetime+'" class="form-control" type="text" value=""></div>';
		insertcomms = insertcomms + '<div class="col-sm-1"><input id="corsitecomms_corperson_'+commsdatetime+'" name="corsitecomms_corperson_'+commsdatetime+'" class="form-control" type="text" value=""></div>';
		insertcomms = insertcomms + '<div class="col-sm-2"><input id="corsitecomms_person_'+commsdatetime+'" name="corsitecomms_person_'+commsdatetime+'" class="form-control" type="text" value=""></div>';		
		insertcomms = insertcomms + '<div class="col-sm-1">';
		insertcomms = insertcomms + '<select id="corsitecomms_type_'+commsdatetime+'" name="corsitecomms_type_'+commsdatetime+'" class="form-control">';
		insertcomms = insertcomms + '<option value="Phone" >Phone</option>';
		insertcomms = insertcomms + '<option value="Email" >Email</option>';
		insertcomms = insertcomms + '<option value="Text" >Text</option>';
		insertcomms = insertcomms + '<option value="Visit" >Visit</option>';		
		insertcomms = insertcomms + '<option value="Other" >Other</option>';
		insertcomms = insertcomms + '</select >';
		insertcomms = insertcomms + '</div>';
		insertcomms = insertcomms + '<div class="col-sm-5"><textarea id="corsitecomms_message_'+commsdatetime+'" name="corsitecomms_message_'+commsdatetime+'" class="form-control" rows="3"></textarea></div>';
		insertcomms = insertcomms + '<div class="col-sm-1">';
		insertcomms = insertcomms + '<button id="corsitecomms_delete_'+commsdatetime+'" class="corsitecommsdelete btn btn-danger" type="button" >x</button>';
		insertcomms = insertcomms + '</div>	';	
		$("#corsitecommslistend").before( insertcomms );
	   	$('#corsitecomms_date_'+commsdatetime).datepicker({
    	    startDate: '-3d',
    	    format: 'dd/mm/yyyy'
    	});		
		corsitecommsdeletelistener();
		formChanged();
	})

	$('#coroutletcomms_add_new').on('click', function(event) {
		outletcommsnewindex++;
		var insertoutletcomms = "";	
		insertoutletcomms = insertoutletcomms + '</div>';
		insertoutletcomms = insertoutletcomms + '<div class="row row-eq-height">';
		insertoutletcomms = insertoutletcomms + '<div class="col-sm-1">';
		insertoutletcomms = insertoutletcomms + '<select id="coroutletcomms_coroutletclassid_new'+outletcommsnewindex+'"  name="coroutletcomms_coroutletclassid_new'+outletcommsnewindex+'" class="form-control">';		
		var coroutletclassa = Get_Array_Hash('coroutletclass');
		if (coroutletclassa.length >0) {
			for (var coroutletclassi in coroutletclassa) {
				var coroutletclassid = coroutletclassa[coroutletclassi];
				Get_Data_Hash('coroutletclass',coroutletclassid);
				// alert(coroutletclassid+" "+GLOBALS['coroutletclass_name']);
				insertoutletcomms = insertoutletcomms + '<option value="'+coroutletclassid+'" >'+GLOBALS['coroutletclass_name']+'</option>';
			}
			insertoutletcomms = insertoutletcomms + '<option value="" selected></option>';
		} else {
			insertoutletcomms = insertoutletcomms + '<option value="" selected>No Outlet Classes Setup</option>';
		}
		insertoutletcomms = insertoutletcomms + '</select >';
		insertoutletcomms = insertoutletcomms + '</div>';
		insertoutletcomms = insertoutletcomms + '<div class="col-sm-1">';
		insertoutletcomms = insertoutletcomms + '<select id="coroutletcomms_coroutletconame_new'+outletcommsnewindex+'"  name="coroutletcomms_coroutletconame_new'+outletcommsnewindex+'" class="form-control">';
		var coroutletcoa = Get_Array_Hash('coroutletco');
		if (coroutletcoa.length >0) {
			for (var coroutletcoi in coroutletcoa) {
				var coroutletcoid = coroutletcoa[coroutletcoi];
				Get_Data_Hash('coroutletco',coroutletcoid);
				// alert(coroutletcoid+" "+GLOBALS['coroutletco_name']);
				insertoutletcomms = insertoutletcomms + '<option value="'+coroutletcoid+'" >'+GLOBALS['coroutletco_name']+'</option>';
			}
			insertoutletcomms = insertoutletcomms + '<option value="" selected></option>';
		} else {
			insertoutletcomms = insertoutletcomms + '<option value="" selected>No Outlet Companies Setup</option>';
		}
		insertoutletcomms = insertoutletcomms + '</select >';
		insertoutletcomms = insertoutletcomms + '</div>';
		insertoutletcomms = insertoutletcomms + '<div class="col-sm-2"><input id="coroutletcomms_new'+outletcommsnewindex+'" name="coroutletcomms_outletname_new'+outletcommsnewindex+'" class="form-control" type="text" value=""></div>';
		insertoutletcomms = insertoutletcomms + '<div class="col-sm-1"><input id="coroutletcomms_new'+outletcommsnewindex+'" name="coroutletcomms_contact_new'+outletcommsnewindex+'" class="form-control" type="text" value=""></div>';
		insertoutletcomms = insertoutletcomms + '<div class="col-sm-1">';
		insertoutletcomms = insertoutletcomms + '<select id="coroutletcomms_interest_new'+outletcommsnewindex+'" name="coroutletcomms_interest_new'+outletcommsnewindex+'" style="background-color: white; color: black; text-align: right;" class="rag form-control">';
		insertoutletcomms = insertoutletcomms + '<option value="Y" >Yes</option>';
		insertoutletcomms = insertoutletcomms + '<option value="N" >No</option>';
		insertoutletcomms = insertoutletcomms + '<option value="N/A" >N/A</option>';
		insertoutletcomms = insertoutletcomms + '<option value="" selected></option>';		
		insertoutletcomms = insertoutletcomms + '</select >';
		insertoutletcomms = insertoutletcomms + '</div>';
		insertoutletcomms = insertoutletcomms + '<div class="col-sm-4"><textarea id="coroutletcomms_comment_new'+outletcommsnewindex+'" name="coroutletcomms_comment_new'+outletcommsnewindex+'" class="form-control" rows="2"></textarea></div>';
		insertoutletcomms = insertoutletcomms + '<div class="col-sm-1"><input id="coroutletcomms_date_new'+outletcommsnewindex+'" name="coroutletcomms_date_new'+outletcommsnewindex+'" class="datetimepicker form-control" value=""></div>';
		insertoutletcomms = insertoutletcomms + '<div class="col-sm-1">';
		insertoutletcomms = insertoutletcomms + '<button id="coroutletcomms_delete_new'+outletcommsnewindex+'" class="coroutletcommsdelete btn btn-danger" type="button" >x</button>';
		insertoutletcomms = insertoutletcomms + '</div>';
		insertoutletcomms = insertoutletcomms + '</div>';		
		
		$("#coroutletcommslistend").before( insertoutletcomms );
	   	$('#coroutletcomms_date_new'+outletcommsnewindex).datepicker({
    	    startDate: '-3d',
    	    format: 'dd/mm/yyyy'
    	});	
		coroutletcommsdeletelistener();
		recalclistener();
		formChanged();
	})	
	
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
	
	$('#quotedatemarkersave').on('click', function(event) {
		if ( currentquotedatemarkeractiveid != "") {	 // just to be sure	
			formChanged();
			var hiddenfield = currentquotedatemarkeractiveid.replace("_marker", "");
			var quotedatemarkercontent = $("#quotedatemarkercontent").val();
			$("#"+hiddenfield).val(quotedatemarkercontent);		
			$("#"+currentquotedatemarkeractiveid).removeClass();
			if ( quotedatemarkercontent == "" ) {
				$("#"+currentquotedatemarkeractiveid).addClass( "quotedatemarker btn btn-secondary" );
			} else {
				$("#"+currentquotedatemarkeractiveid).addClass( "quotedatemarker btn btn-success" );
			}
		}
		$("#quotedatemarkerpopup").dialog("close");
		currentquotedatemarkeractiveid = "";
	});	
	
	$('#quotedatemarkernosave').on('click', function(event) {
		$("#quotedatemarkerpopup").dialog("close");
		currentquotedatemarkeractiveid = "";
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
	
	function datepickerlistener() { 	
	   	$('.datepicker').datepicker({
    	    startDate: '-3d',
    	    format: 'dd/mm/yyyy'
    	});		
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
		
		$('.modelinpercent').change( function() {
			var invalue = P82ToF($(this).val());
			$(this).val( FToP82(invalue) );	
		});	
		
		$('#modelbutton').on('click', function(event) {
			formChanged();
			modelbuttonpressed = "1";	
			recalc(); // to get the starting position correct
			remodel();
			modelbuttonpressed = "";
			recalc();	
		})			
		
		$('.rag').change( function() {			
			var thisid = $(this).attr('id');
			var backcolor = "white";
			if ($(this).val() == "Y") { var backcolor = "#b3ffd9"; }
			if ($(this).val() == "Yes") { var backcolor = "#b3ffd9"; }			
			if ($(this).val() == "Green") { var backcolor = "#b3ffd9"; }
			if ($(this).val() == "Amber") { var backcolor = "#ffd65c"; }
			if ($(this).val() == "Review") { var backcolor = "#ffd65c"; }			
			if ($(this).val() == "N") { var backcolor = "#ff9999"; }
			if ($(this).val() == "No") { var backcolor = "#ff9999"; }			
			if ($(this).val() == "Red") { var backcolor = "#ff9999"; }
			if ($(this).val() == "NA") { var backcolor = "white"; }
			$(this).css('background-color', backcolor);
		});	
	}	

	$( "#corsite_proposaltype" ).change(function() {
		recalc();
	});	
	
	// Financial Classification
	$( "#corsite_status" ).change(function() {
		reclassify();
	});		
	
	$( "#corsite_shelvedreasoncode" ).change(function() {
		reclassify();
	});		
	
	$( "#corsite_plgdeterminationresult" ).change(function() {
		reclassify();
	});
	
	$( "#corsite_salestatus" ).change(function() {
		reclassify();
	});	
	
	function commdeletelistener() {
		$('.commdelete').on('click', function(event) {			
			formChanged();
			var thisid = $(this).attr("id");
			var thisida = thisid.split("_");
			$.confirm({
				icon: 'fa fa-question-circle text-warning',
			    title: 'Commercial',
			    content: 'Do you want to delete this entry?',
			    buttons: {
			        somethingElse: {
			            text: 'Delete',
			            btnClass: 'btn-orange',
			            action: function(){
						    delete corcommida[thisida[2]];
							$("#"+thisid).parent().parent().parent().remove();	
							recalc();	
			            }
			        },
			        cancel: function () {  },
			    }
			});						
		})	
	}		
	
	function resideletelistener() {
		$('.residelete').on('click', function(event) {			
			formChanged();
			var thisid = $(this).attr("id");
			var thisida = thisid.split("_");
			$.confirm({
				icon: 'fa fa-question-circle text-warning',
			    title: 'Residential Element',
			    content: 'Do you want to delete this entry?',
			    buttons: {
			        somethingElse: {
			            text: 'Delete',
			            btnClass: 'btn-orange',
			            action: function(){
						    delete corresiida[thisida[2]];
							$("#"+thisid).parent().parent().remove();	
							recalc();	
			            }
			        },
			        cancel: function () {  },
			    }
			});				
		})	
	}	
	
	function coroutletcommsdeletelistener() {
		$('.coroutletcommsdelete').on('click', function(event) {			
			formChanged();
			var thisid = $(this).attr("id");
			var thisida = thisid.split("_");
			$.confirm({
				icon: 'fa fa-question-circle text-warning',
			    title: 'Outlet Communication',
			    content: 'Do you want to delete this entry?',
			    buttons: {
			        somethingElse: {
			            text: 'Delete',
			            btnClass: 'btn-orange',
			            action: function(){
							$("#"+thisid).parent().parent().remove();	
			            }
			        },
			        cancel: function () {  },
			    }
			});				
		})	
	}	
	
	function surveydeletelistener() {
		$('.surveydelete').on('click', function(event) {			
			// alert("surveydeletelistener");
			formChanged();
			var thisid = $(this).attr("id");
			var thisida = thisid.split("_");
			$.confirm({
				icon: 'fa fa-question-circle text-warning',
			    title: 'Survey',
			    content: 'Do you want to delete this entry?',
			    buttons: {
			        somethingElse: {
			            text: 'Delete',
			            btnClass: 'btn-orange',
			            action: function(){
							$("#"+thisid).parent().parent().remove();
							recalc();
			            }
			        },
			        cancel: function () {  },
			    }
			});				
		})	
	}
	
	function surveyquotedatemarkerlistener() {
		$('.quotedatemarker').on('click', function(event) {
			var thisclass = $(this).attr("class");
			var allowed = "1";
			if ( (thisclass.indexOf("danger") !=-1)||(thisclass.indexOf("warning") !=-1)) { allowed = "0"; }
			if ( coruserlevel == 5 ) { allowed = "1"; }	
			if ( allowed == "1" ) {	
				currentquotedatemarkeractiveid = $(this).attr("id");	
				var titlestring = "Date";
				if (currentquotedatemarkeractiveid.indexOf("ph1quoteinvrecddate") >= 0 ) { titlestring = "Ph1 Invoice Received"; }		
				if (currentquotedatemarkeractiveid.indexOf("adhocquoteinvrecddate") >= 0 ) { titlestring = "Extra Invoice Received"; }		
				if (currentquotedatemarkeractiveid.indexOf("successfeeinvrecddate") >= 0 ) { titlestring = "Success Fee Invoice Received"; }				
				$("#quotedatemarkerpopup").dialog("open");
				$("#quotedatemarkerpopup").dialog('option', 'title', titlestring);
				var hiddenfield = currentquotedatemarkeractiveid.replace("_marker", "");
				var existingdate = $('#'+hiddenfield).val();		
				$("#quotedatemarkercontent").val( existingdate );
			}			
		})	
	}	
	
	function surveyquotevallistener() {
		// corsurvey_ph1quote_SU02556	
		// corsurvey_ph1quoteinvrecddate_marker_SU02556		
		$('.quoteval').on('click', function(event) {
			var thisid = $(this).attr("id");
			var tbits = thisid.split("_");
			var markerid = tbits[0]+'_'+tbits[1]+"invrecddate_marker_"+tbits[2];
			var markerclass = $("#"+markerid).attr("class");
			if ( (markerclass.indexOf("danger") !=-1)||(markerclass.indexOf("warning") !=-1)) {
				if ( coruserlevel < 5 ) {
					$.alert({
		    			icon: 'fa fa-lock text-danger',
		    			title: "Quote Locked",
		    		    content: 'This quotation has now been locked'
		    		});	
					$(this).attr('disabled','disabled');
				}
			}
		})	
	}	
	
	function corsitecommsdeletelistener() {
		$('.corsitecommsdelete').on('click', function(event) {			
			formChanged();
			var thisid = $(this).attr("id");
			var thisida = thisid.split("_");
			$.confirm({
				icon: 'fa fa-question-circle text-warning',
			    title: 'Communications',
			    content: 'Do you want to delete this entry?',
			    buttons: {
			        somethingElse: {
			            text: 'Delete',
			            btnClass: 'btn-orange',
			            action: function(){
							$("#"+thisid).parent().parent().remove();
			            }
			        },
			        cancel: function () {  },
			    }
			});	
		})	
	}
	
	$('#corsite_buildresiinternally').on('click', function(event) {			
		recalc();
	})
	
	$('#corsite_buildcomminternally').on('click', function(event) {			
		recalc();
	})	
	
	$('#corsite_quoteready').on('click', function(event) {			
		recalc();
	})
	
	
	function reclassify() {	
		if ( coruserlevel > "2") {
			var corsite_status = $('#corsite_status').val();
			var corsite_shelvedreasoncode = $('#corsite_shelvedreasoncode').val();
			var corsite_plgdeterminationresult = $('#corsite_plgdeterminationresult').val();
			var corsite_salestatus = $('#corsite_salestatus').val();			
			
		    var classification = "";
		    if ((corsite_status == "Shelved")&&(classification == "")) {
		        if (corsite_shelvedreasoncode == "Cancelled") {
		            classification = "Cancelled";
		        }
		    }
		    if ((corsite_status == "Sold")&&(classification == "")) {
		        classification = "Completed";
		    }
		    if ((corsite_salestatus == "Exchanged")&&(classification == "")) {
		        classification = "Exchanged";
		    }
		    if ((corsite_status == "Neg-PrePlanning")&&(classification == "")) {
		        classification = "Neg PrePlanning";
		    }
		    if ((corsite_status == "Planning")&&(classification == "")) {
		        if (corsite_plgdeterminationresult != "Approved") {
		            classification = "Planning";
		        }
		    }
		    if (((corsite_status == "Planning")||(corsite_status == "Sale")(corsite_status == "Legals"))&&(classification == "")) {
		        if (corsite_plgdeterminationresult == "Approved") {
		            classification = "Planning Obtained";
		        }
		    }
		    if ((corsite_status == "Pending Review")&&(classification == "")) {
		        classification = "Pending Review";
		    }
		    if ((corsite_status == "Assessment")&&(classification == "")) {
		        classification = "Under Assessment";
		    }
		    if ((corsite_status == "Shelved")&&(classification == "")) {
		        if (corsite_shelvedreasoncode == "Long Term") {
		            classification = "Long Term";
		        }
		    }
		    if ((corsite_status == "Shelved")&&(classification == "")) {
		        if (corsite_shelvedreasoncode == "No HAUV") {
		            classification = "No HAUV";
		        }
		    }
		    if (classification == "") {
		        classification = "TBC";
		    }	
		    $('#corsite_classification').val( classification );
		    $('#classificationtext').html( classification );
		}
	}
	
	function recalc() {	
		if ( coruserlevel > "3") {	
			// ==== Specification Page===============
			if (( $( "#corsite_proposalphasestatus" ).val() == "Ph1InProgress" )||( $( "#corsite_proposalphasestatus" ).val() == "Ph1Completed" )) {
				// alert("Ph1");
				$('#SpecPh1View').show(); 
				$('#SpecPh2View').hide();
			} else {
				// alert("Ph2");
				$('#SpecPh1View').hide(); 
				$('#SpecPh2View').show();
			}
			var corsite_arkgva = N80ToF( $('#corsite_arkgva').val() );
			$("#corsite_arkgva").val( FToN80(corsite_arkgva) );	
			
			// ==== Financial Appraisal 3 =======================================
			// Calculates Other GDV
			if (corprogramme_customtablist.indexOf("FA3") !=-1) {
				var corsite_app2roomqty = N80ToF($('#corsite_app2roomqty').val());
				var corsite_app2roomdailyrate = N80ToF($('#corsite_app2roomdailyrate').val());	
				var corsite_app2roomdailyrevenuecalc = corsite_app2roomqty * corsite_app2roomdailyrate;
				$("#corsite_app2roomdailyrevenuecalc").val( FToN80(corsite_app2roomdailyrevenuecalc) );	
				var corsite_app2roomoccupancypercent = N82ToF($('#corsite_app2roomoccupancypercent').val());
				$("#corsite_app2roomoccupancypercent").val( FToP82(corsite_app2roomoccupancypercent) );		
				var corsite_app2roomoccupancycalc = corsite_app2roomdailyrevenuecalc * corsite_app2roomoccupancypercent / 100;
				$("#corsite_app2roomoccupancycalc").val( FToN80(corsite_app2roomoccupancycalc) );					
				var corsite_app2roommarginpercent = N82ToF($('#corsite_app2roommarginpercent').val());	
				$("#corsite_app2roommarginpercent").val( FToP82(corsite_app2roommarginpercent) );						
				var corsite_app2roommargincalc = corsite_app2roomoccupancycalc * corsite_app2roommarginpercent / 100;
				$("#corsite_app2roommargincalc").val( FToN80(corsite_app2roommargincalc) );	
				var corsite_app2roommaintenancepercent = N82ToF($('#corsite_app2roommaintenancepercent').val());
				$("#corsite_app2roommaintenancepercent").val( FToP82(corsite_app2roommaintenancepercent) );					
				var corsite_app2roommaintenancecalc = corsite_app2roommargincalc * corsite_app2roommaintenancepercent /100;
				$("#corsite_app2roommaintenancecalc").val( FToN80(corsite_app2roommaintenancecalc) );					
				var corsite_app2roomdailyprofitcalc = corsite_app2roommargincalc - corsite_app2roommaintenancecalc;				
				$("#corsite_app2roomdailyprofitcalc").val( FToN80(corsite_app2roomdailyprofitcalc) );
				var corsite_app2roomannualprofitpercent = N82ToF($('#corsite_app2roomannualprofitpercent').val());
				$("#corsite_app2roomannualprofitpercent").val( FToP82(corsite_app2roomannualprofitpercent) );					
				var corsite_app2roomannualprofitcalc = (corsite_app2roomdailyprofitcalc * 365) * corsite_app2roomannualprofitpercent / 100;
				$("#corsite_app2roomannualprofitcalc").val( FToN80(corsite_app2roomannualprofitcalc) );
				var corsite_app2roomebitdamultiple = N80ToF($('#corsite_app2roomebitdamultiple').val());
				$("#corsite_app2roomebitdamultiple").val( FToN80(corsite_app2roomebitdamultiple) );	

				var corsite_app2roomebitdacalc = corsite_app2roomannualprofitcalc * corsite_app2roomebitdamultiple;				
				$("#corsite_app2roomebitdacalc").val( FToN80(corsite_app2roomebitdacalc) );
				
				$("#corsite_dispresiothergdvcalc").val( FToN80(corsite_app2roomebitdacalc) );
			}
	
			// ==== FA1 Commercial ===============	
			var corsite_dispcommtotalsqftcalc = 0;
			var corsite_dispcommtotalbuildcostcalc = 0;
			var corsite_dispcommgdvsubtotalcalc = 0;
			for (var key in corcommida) {
				var corcomm_area = N80ToF($('#corcomm_area_'+key).val());
				$('#corcomm_area_'+key).val( FToN80(corcomm_area) );	
				var corcomm_rentperannum = N80ToF($('#corcomm_rentperannum_'+key).val());
				$('#corcomm_rentperannum_'+key).val( FToN80(corcomm_rentperannum) );			
				if ((corcomm_area != "")&&(corcomm_area != "0")) {
					var corcomm_rentpersqftcalc = corcomm_rentperannum / corcomm_area;
				} else {
					var corcomm_rentpersqftcalc = 0;
				}
				$('#corcomm_rentpersqftcalc_'+key).val( FToN80(corcomm_rentpersqftcalc) );	
				corsite_dispcommtotalsqftcalc = corsite_dispcommtotalsqftcalc + corcomm_area;
				var corcomm_yieldpercent = P82ToF($('#corcomm_yieldpercent_'+key).val());
				$('#corcomm_yieldpercent_'+key).val( FToP82(corcomm_yieldpercent) );			
				if ((corcomm_yieldpercent != "")&&(corcomm_yieldpercent != "0")) {
					var corcomm_tenantgdvcalc = (corcomm_rentperannum / corcomm_yieldpercent) *100;	
				} else {
					var corcomm_tenantgdvcalc = 0;
				}
				$('#corcomm_tenantgdvcalc_'+key).val( FToN80(corcomm_tenantgdvcalc) );
				var corcomm_purchaserscostpercent = P82ToF($('#corcomm_purchaserscostpercent_'+key).val());	
				$('#corcomm_purchaserscostpercent_'+key).val( FToP82(corcomm_purchaserscostpercent) );			
				var corcomm_purchaserscostgdvcalc = (-1) * corcomm_tenantgdvcalc * corcomm_purchaserscostpercent / 100;	
				$('#corcomm_purchaserscostgdvcalc_'+key).val( FToN80(corcomm_purchaserscostgdvcalc) );					
				var corcomm_netcapitalvaluecalc = corcomm_tenantgdvcalc + corcomm_purchaserscostgdvcalc;	
				$('#corcomm_netcapitalvaluecalc_'+key).val( FToN80(corcomm_netcapitalvaluecalc) );									
				var corcomm_rentfreemths = N80ToF($('#corcomm_rentfreemths_'+key).val());
				$('#corcomm_rentfreemths_'+key).val( FToN80(corcomm_rentfreemths) );
				var corcomm_rentfreegdvcalc = (-1) * corcomm_rentperannum * corcomm_rentfreemths / 12;			
				$('#corcomm_rentfreegdvcalc_'+key).val( FToN80(corcomm_rentfreegdvcalc) );		
				var corcomm_capcon = N80ToF($('#corcomm_capcon_'+key).val());
				$('#corcomm_capcon_'+key).val( FToN80(corcomm_capcon) );
				$('#corcomm_capcongdvcalc_'+key).val( FToN80(corcomm_capcon) )
				var corcomm_surrendercost = N80ToF($('#corcomm_surrendercost_'+key).val());
				$('#corcomm_surrendercost_'+key).val( FToN80(corcomm_surrendercost) )			
				$('#corcomm_surrendercostgdvcalc_'+key).val( FToN80(corcomm_surrendercost) );	
				corsite_dispcommgdvsubtotalcalc = corsite_dispcommgdvsubtotalcalc + corcomm_tenantgdvcalc + corcomm_purchaserscostgdvcalc +		
				corcomm_rentfreegdvcalc + corcomm_capcon +	corcomm_surrendercost;				
			}
			$('#corsite_dispcommtotalsqftcalc').val( FToN80(corsite_dispcommtotalsqftcalc) );	
			$('#corsite_dispcommgdvsubtotalcalc').val( FToN80(corsite_dispcommgdvsubtotalcalc) );						
			
			// ==== FA1 Residential ===============
			var corsite_dispresitotalunitscalc = 0;
			var corsite_dispresitotalsqftcalc = 0;
			var corsite_dispresigdvsubtotalcalc = 0;
			for (var key in corresiida) {
				var corresi_quantity = N80ToF($("#corresi_quantity_"+key).val());
				$("#corresi_quantity_"+key).val( FToN80(corresi_quantity) );			
				var corresi_area = N80ToF($("#corresi_area_"+key).val());			
				var corresi_value = N80ToF($("#corresi_value_"+key).val());
				$("#corresi_value_"+key).val( FToN80(corresi_value) );
				var corresi_prediscountcalc = corresi_quantity * corresi_value;
				$("#corresi_prediscountcalc_"+key).val( FToN80(corresi_prediscountcalc) );
				var corresi_discountpercent = P82ToF($("#corresi_discountpercent_"+key).val());
				$("#corresi_discountpercent_"+key).val( FToP82(corresi_discountpercent) );
				var corresi_postdiscountcalc = corresi_prediscountcalc * (100 - corresi_discountpercent)/100;
				$("#corresi_postdiscountcalc_"+key).val( FToN80(corresi_postdiscountcalc) );
				corsite_dispresitotalunitscalc = corsite_dispresitotalunitscalc + corresi_quantity;
				corsite_dispresitotalsqftcalc = corsite_dispresitotalsqftcalc + ( corresi_quantity * corresi_area);
				corsite_dispresigdvsubtotalcalc = corsite_dispresigdvsubtotalcalc + corresi_postdiscountcalc;
			}
			$("#corsite_dispresitotalunitscalc").val( FToN80(corsite_dispresitotalunitscalc) );
			$("#corsite_dispresitotalsqftcalc").val( FToN80(corsite_dispresitotalsqftcalc) );
			$("#corsite_dispresigdvsubtotalcalc").val( FToN80(corsite_dispresigdvsubtotalcalc) );
			
			var corsite_dispresiothergdvcalc = N80ToF($('#corsite_dispresiothergdvcalc').val());
			var corsite_disptotsitegdvcalc = corsite_dispcommgdvsubtotalcalc + corsite_dispresigdvsubtotalcalc + corsite_dispresiothergdvcalc;
			$("#corsite_disptotsitegdvcalc").val( FToN80(corsite_disptotsitegdvcalc) );
	
			// ==== FA1 Development ===============
			var corsite_buildingdvtotcalc = 0;
			var corsite_buildoutgdvtotcalc = 0;
			if ( $( "#corsite_buildcomminternally" ).val() == "Y" ) { corsite_buildingdvtotcalc = corsite_buildingdvtotcalc + corsite_dispcommgdvsubtotalcalc; }
			else { corsite_buildoutgdvtotcalc = corsite_buildoutgdvtotcalc + corsite_dispcommgdvsubtotalcalc; }
			if ( $( "#corsite_buildresiinternally" ).val() == "Y" ) { corsite_buildingdvtotcalc = corsite_buildingdvtotcalc + corsite_dispresigdvsubtotalcalc + corsite_dispresiothergdvcalc; } 
			else { corsite_buildoutgdvtotcalc = corsite_buildoutgdvtotcalc + corsite_dispresigdvsubtotalcalc + corsite_dispresiothergdvcalc;; }
			$("#corsite_buildingdvtotcalc").val( FToN80(corsite_buildingdvtotcalc) );
			$("#corsite_buildoutgdvtotcalc").val( FToN80(corsite_buildoutgdvtotcalc) );
			
			// ==== Internal Build Perspective ===============
			
			if (( $( "#corsite_buildcomminternally" ).val() == "Y" )||( $( "#corsite_buildresiinternally" ).val() == "Y" )) { 
				$('#InternalBuildDiv').show();		
				if (( $( "#corsite_buildcomminternally" ).val() == "Y" )&&( $( "#corsite_buildresiinternally" ).val() == "Y" )) {
					$( "#InternalBuildHeader" ).html("Internal Build Summary (Commercial and Residential Parts)");
					var corsite_buildintotalsqftcalc = corsite_dispcommtotalsqftcalc + corsite_dispresitotalsqftcalc;
				}
				if (( $( "#corsite_buildcomminternally" ).val() == "Y" )&&( $( "#corsite_buildresiinternally" ).val() != "Y" )) {
					$( "#InternalBuildHeader" ).html("Internal Build Summary (Commercial Part)");
					var corsite_buildintotalsqftcalc = corsite_dispcommtotalsqftcalc;
				}			
				if (( $( "#corsite_buildcomminternally" ).val() != "Y" )&&( $( "#corsite_buildresiinternally" ).val() == "Y" )) {
					$( "#InternalBuildHeader" ).html("Internal Build Summary (Residential Part)");
					var corsite_buildintotalsqftcalc = corsite_dispresitotalsqftcalc;
				}	
				// calculate internal build costs if any internal build
				var corsite_buildincoststotcalc = 0;
				var corsite_buildinlandpurchase = N80ToF( $('#corsite_buildinlandpurchase').val() );
				var corsite_buildinagentsalepercent = P82ToF( $('#corsite_buildinagentsalepercent').val() );				
				var corsite_buildinagentsalecalc = (corsite_buildingdvtotcalc * corsite_buildinagentsalepercent) / 100;						
				var tranche1 = 0; var tranche2 = 0;
				if (corsite_buildinlandpurchase >= 250000) {
						tranche1 = 100000;
						tranche2 = corsite_buildinlandpurchase - 249999;				
				} else {
					if (corsite_buildinlandpurchase >= 150000) {
						tranche1 = corsite_buildinlandpurchase - 149999;		
					}
				}
				var corsite_buildinsdltcalc = (tranche1 * 0.02) + (tranche2 * 0.05) ;
				if ( corsite_buildinlandpurchase == 0 ) { var corsite_buildinsdltpercentcalc = 0; }
				else { var corsite_buildinsdltpercentcalc = (corsite_buildinsdltcalc / corsite_buildinlandpurchase)*100; }		
				var corsite_buildinlegals = N80ToF($('#corsite_buildinlegals').val());
				var corsite_buildinagentpurchasepercent = P82ToF( $('#corsite_buildinagentpurchasepercent').val() );
				var corsite_buildinagentpurchasecalc = (corsite_buildinlandpurchase * corsite_buildinagentpurchasepercent) / 100;	
				var corsite_buildinproffees = N80ToF($('#corsite_buildinproffees').val());
				var corsite_buildincilsqmcalc = corsite_buildintotalsqftcalc / 10.764;
				var corsite_buildincilcostpersqm = N80ToF( $('#corsite_buildincilcostpersqm').val() );
				var corsite_buildincilpercent = P82ToF( $('#corsite_buildincilpercent').val() );
				var corsite_buildincilcalc = corsite_buildincilsqmcalc * corsite_buildincilcostpersqm * corsite_buildincilpercent / 100;					
				var corsite_buildincil = N80ToF($('#corsite_buildincil').val());
				var corsite_buildin106 = N80ToF($('#corsite_buildin106').val());				
				var corsite_buildinother = N80ToF($('#corsite_buildinother').val());			
				var corsite_buildincostpersqft = N80ToF( $('#corsite_buildincostpersqft').val() );
				var corsite_buildinextrasqftpercent = P82ToF( $('#corsite_buildinextrasqftpercent').val() );			
				var corsite_buildintotalbuildcostcalc = corsite_buildintotalsqftcalc * corsite_buildincostpersqft * ( 100 + corsite_buildinextrasqftpercent ) / 100;				
				var corsite_buildincoststotcalc = corsite_buildinlandpurchase+corsite_buildinagentsalecalc+corsite_buildinsdltcalc+corsite_buildinlegals+corsite_buildinagentpurchasecalc+corsite_buildinproffees+corsite_buildincilcalc+corsite_buildincil+corsite_buildin106+corsite_buildinother+corsite_buildintotalbuildcostcalc;
				var corsite_buildinnpcalc = corsite_buildingdvtotcalc-corsite_buildincoststotcalc;
			} else {
				$('#InternalBuildDiv').hide();
				// zero internal build costs if no internal build
				var corsite_buildinlandpurchase = 0;
				var corsite_buildintotalsqftcalc = 0;
				var corsite_buildincoststotcalc = 0;
				var corsite_buildinagentpurchasepercent = P82ToF( $('#corsite_buildinagentpurchasepercent').val() );
				var corsite_buildinagentpurchasecalc = 0;					
				var corsite_buildinsdltcalc = 0 ;
				var corsite_buildinsdltpercentcalc = 0;
				var corsite_buildinlegals = 0;	
				var corsite_buildinagentsalepercent = P82ToF( $('#corsite_buildinagentsalepercent').val() );
				var corsite_buildinagentsalecalc = 0;			
				var corsite_buildinproffees = 0;
				var corsite_buildincilcostpersqm = N80ToF( $('#corsite_buildincilcostpersqm').val() );
				var corsite_buildincilpercent = 0;			
				var corsite_buildincilcalc = 0;
				var corsite_buildincil = 0;
				var corsite_buildin106 = 0;
				var corsite_buildinother = 0;			
				var corsite_buildincostpersqft = N80ToF( $('#corsite_buildincostpersqft').val() );
				var corsite_buildinextrasqftpercent = 0;			
				var corsite_buildintotalbuildcostcalc = 0;
				var corsite_buildincoststotcalc = 0;
				var corsite_buildinnpcalc = 0;
			}
			// reset input fields with values
			$('#corsite_buildinlandpurchase').val( FToN80(corsite_buildinlandpurchase) );
			$("#corsite_buildinagentsalepercent").val( FToP82(corsite_buildinagentsalepercent) );
			$("#corsite_buildinagentsalecalc").val( FToN80(corsite_buildinagentsalecalc) );			
			$("#corsite_buildinsdltcalc").val( FToN80(corsite_buildinsdltcalc) );
			$("#corsite_buildinsdltpercentcalc").val( FToP82(corsite_buildinsdltpercentcalc) );
			$("#corsite_buildinlegals").val( FToN80(corsite_buildinlegals) );	
			$("#corsite_buildinagentpurchasepercent").val( FToP82(corsite_buildinagentpurchasepercent) );
			$("#corsite_buildinagentpurchasecalc").val( FToN80(corsite_buildinagentpurchasecalc) );
			$("#corsite_buildinproffees").val( FToN80(corsite_buildinproffees) );
			$("#corsite_buildincilsqmcalc").val( FToN80(corsite_buildincilsqmcalc) );				
			$("#corsite_buildincilpercent").val( FToP82(corsite_buildincilpercent) );				
			$("#corsite_buildincilcalc").val( FToN80(corsite_buildincilcalc) );	
			$("#corsite_buildincil").val( FToN80(corsite_buildincil) );
			$("#corsite_buildin106").val( FToN80(corsite_buildin106) );
			$("#corsite_buildinother").val( FToN80(corsite_buildinother) );		
			$("#corsite_buildintotalsqftcalc").val( FToN80(corsite_buildintotalsqftcalc) );				
			$("#corsite_buildinextrasqftpercent").val( FToP82(corsite_buildinextrasqftpercent) );				
			$("#corsite_buildintotalbuildcostcalc").val( FToN80(corsite_buildintotalbuildcostcalc) );			
			$("#corsite_buildincoststotcalc").val( FToN80(corsite_buildincoststotcalc) );		
			$("#corsite_buildinnpcalc").val( FToN80(corsite_buildinnpcalc) );
			
			// ==== Developer Build Perspective ===============
			
			if (( $( "#corsite_buildcomminternally" ).val() == "N" )||( $( "#corsite_buildresiinternally" ).val() == "N" )) { 
				$('#DeveloperBuildDiv').show(); 
				if (( $( "#corsite_buildcomminternally" ).val() == "N" )&&( $( "#corsite_buildresiinternally" ).val() == "N" )) {
					$( "#DeveloperBuildHeader" ).html("Developer Build Summary (Commercial and Residential Parts)");
					var corsite_buildouttotalsqftcalc = corsite_dispcommtotalsqftcalc + corsite_dispresitotalsqftcalc;
				}
				if (( $( "#corsite_buildcomminternally" ).val() == "N" )&&( $( "#corsite_buildresiinternally" ).val() != "N" )) {
					$( "#DeveloperBuildHeader" ).html("Developer Build Summary (Commercial Part)");
					var corsite_buildouttotalsqftcalc = corsite_dispcommtotalsqftcalc;
				}			
				if (( $( "#corsite_buildcomminternally" ).val() != "N" )&&( $( "#corsite_buildresiinternally" ).val() == "N" )) {
					$( "#DeveloperBuildHeader" ).html("Developer Build Summary (Residential Part)");
					var corsite_buildouttotalsqftcalc = corsite_dispresitotalsqftcalc;
				}
				// calculate developer build costs if any developer build
		
				var corsite_buildoutagentsalepercent = P82ToF( $('#corsite_buildoutagentsalepercent').val() );
				var corsite_buildoutagentsalecalc = (corsite_buildoutgdvtotcalc * corsite_buildoutagentsalepercent) / 100;
				var corsite_salelandvalue = N80ToF($('#corsite_salelandvalue').val());
				if ( corsite_buildoutgdvtotcalc == 0 ) { var corsite_salelandvaluepercentcalc = 0; }
				else { var corsite_salelandvaluepercentcalc = (corsite_salelandvalue / corsite_buildoutgdvtotcalc)*100; }					
				var tranche1 = 0; var tranche2 = 0;
				if (corsite_salelandvalue >= 250000) {
						tranche1 = 100000;
						tranche2 = corsite_salelandvalue - 249999;				
				} else {
					if (corsite_salelandvalue >= 150000) {
						tranche1 = corsite_salelandvalue - 149999;		
					}
				}
				var corsite_buildoutsdltcalc = (tranche1 * 0.02) + (tranche2 * 0.05) ;
				if ( corsite_salelandvalue == 0 ) { var corsite_buildoutsdltpercentcalc = 0; }
				else { var corsite_buildoutsdltpercentcalc = (corsite_buildoutsdltcalc / corsite_salelandvalue)*100; }				
				var corsite_buildoutlegals = N80ToF($('#corsite_buildoutlegals').val());
				var corsite_buildoutagentpurchasepercent = P82ToF( $('#corsite_buildoutagentpurchasepercent').val() );
				var corsite_buildoutagentpurchasecalc = (corsite_salelandvalue * corsite_buildoutagentpurchasepercent)/100;
				// var corsite_buildouttenantsurrender = N80ToF($('#corsite_buildouttenantsurrender').val());
				var corsite_buildoutother = N80ToF($('#corsite_buildoutother').val());
				var corsite_buildoutproffees = N80ToF($('#corsite_buildoutproffees').val());				
				var corsite_buildoutcilsqmcalc = corsite_buildouttotalsqftcalc / 10.764;
				var corsite_buildoutcilcostpersqm = N80ToF( $('#corsite_buildoutcilcostpersqm').val() );
				var corsite_buildoutcilpercent = P82ToF( $('#corsite_buildoutcilpercent').val() );	
				var corsite_buildoutcilcalc = corsite_buildoutcilsqmcalc * corsite_buildoutcilcostpersqm * corsite_buildoutcilpercent / 100;								
				var corsite_buildoutcil = N80ToF($('#corsite_buildoutcil').val());	
				var corsite_buildout106 = N80ToF($('#corsite_buildout106').val());					
				var corsite_buildoutcostpersqft = N80ToF( $('#corsite_buildoutcostpersqft').val() );
				var corsite_buildoutextrasqftpercent = P82ToF( $('#corsite_buildoutextrasqftpercent').val() );	
				var corsite_buildouttotalbuildcostcalc = corsite_buildouttotalsqftcalc * corsite_buildoutcostpersqft * ( 100 + corsite_buildoutextrasqftpercent ) / 100;			
				
				var corsite_buildouttotaldealcostbeforeintcalc = corsite_buildoutagentsalecalc + corsite_salelandvalue + corsite_buildoutsdltcalc + corsite_buildoutlegals + corsite_buildoutagentpurchasecalc + corsite_buildoutother + corsite_buildoutcilcalc + corsite_buildoutcil + corsite_buildout106 + corsite_buildoutproffees + corsite_buildouttotalbuildcostcalc;
				
				// Net Profit before Interest		
				var corsite_buildoutgpbeforeintcalc = corsite_buildoutgdvtotcalc - corsite_buildouttotaldealcostbeforeintcalc;	
				var corsite_buildoutgpbeforeintpercentcalc = (corsite_buildoutgpbeforeintcalc / corsite_buildouttotaldealcostbeforeintcalc)*100;
				
				var corsite_buildoutvatablepercent = P82ToF( $('#corsite_buildoutvatablepercent').val() );
				var corsite_buildoutvatratepercent = P82ToF( $('#corsite_buildoutvatratepercent').val() );
				var corsite_buildoutvatcalc = (corsite_salelandvalue * corsite_buildoutvatablepercent * corsite_buildoutvatratepercent)/10000;
				
				var corsite_buildoutfinancingltvpercent = P82ToF( $('#corsite_buildoutfinancingltvpercent').val() );		
				var corsite_buildoutfinancingnetborrowingcalc = (corsite_buildouttotaldealcostbeforeintcalc * corsite_buildoutfinancingltvpercent)/100;						
				var corsite_buildoutfinancingintratepercent = P82ToF( $('#corsite_buildoutfinancingintratepercent').val() );
				var corsite_buildoutfinancingduration = N80ToF( $('#corsite_buildoutfinancingduration').val() );
				var corsite_buildoutfinancingcostscalc = (corsite_buildouttotaldealcostbeforeintcalc * corsite_buildoutfinancingltvpercent * corsite_buildoutfinancingintratepercent) * corsite_buildoutfinancingduration / 120000;		
				
				var corsite_buildouttotaldealcostafterintcalc = corsite_buildouttotaldealcostbeforeintcalc + corsite_buildoutfinancingcostscalc;
				
				// Net Profit after Interest
				var corsite_buildoutnpafterintcalc = corsite_buildoutgdvtotcalc - corsite_buildouttotaldealcostafterintcalc;
				var corsite_buildoutnpafterintpercentcalc = (corsite_buildoutnpafterintcalc / corsite_buildouttotaldealcostbeforeintcalc)*100;
	
				// alert if this is not within target range
				var targetnp = P82ToF( $('#corsite_buildoutbuilderroipercent').val() );
				var lowertargetnp = targetnp - 0.1;
				var uppertargetnp = targetnp + 0.1;
				
				if (targetnp > 0) {
					if ((corsite_buildoutnpafterintpercentcalc < lowertargetnp)||(corsite_buildoutnpafterintpercentcalc > uppertargetnp)) {
						if (modelbuttonpressed == "") { // Dont check before remodel request
							$.alert({
								icon: 'fa fa-lock text-warning',
								title: "Warning",
								content: 'You may need to re-claculate the Deveoper Build ROI. ('+FToP82(corsite_buildoutnpafterintpercentcalc)+" vs "+FToP82(targetnp)+")"
							});	
						}
					}
				}

				// Net Profit after Interest and tax
				var corsite_buildouttaxratepercent = P82ToF( $('#corsite_buildouttaxratepercent').val() );
				var tax = (corsite_buildoutnpafterintcalc * corsite_buildouttaxratepercent)/100;
				
				var corsite_buildoutnpafterintandtaxcalc = corsite_buildoutnpafterintcalc - tax;
				var corsite_buildoutnpafterintandtaxpercentcalc = (corsite_buildoutnpafterintandtaxcalc / corsite_buildouttotaldealcostbeforeintcalc)*100;
				var corsite_buildoutnpcalc = corsite_salelandvalue;
					
			} else { 
				$('#DeveloperBuildDiv').hide(); 
				// zero developer build costs if no developer build
				var corsite_buildouttotalsqftcalc = 0;
				var corsite_buildoutagentsalepercent = P82ToF( $('#corsite_buildoutagentsalepercent').val() );
				var corsite_buildoutagentsalecalc = 0;
				var corsite_salelandvalue = 0;
				var corsite_salelandvaluepercentcalc = 0;
				var corsite_buildoutsdltcalc = 0 ;
				var corsite_buildoutsdltpercentcalc = 0;
				var corsite_buildoutlegals = 0;
				var corsite_buildoutagentpurchasepercent = P82ToF( $('#corsite_buildoutagentpurchasepercent').val() );
				var corsite_buildoutagentpurchasecalc = 0;
				// var corsite_buildouttenantsurrender = 0);
				var corsite_buildoutother = 0;
				var corsite_buildoutproffees = 0;
				var corsite_buildoutcilcostpersqm = N80ToF( $('#corsite_buildoutcilcostpersqm').val() );
				var corsite_buildoutcilpercent = 0;									
				var corsite_buildoutcilcalc = 0;
				var corsite_buildoutcil = 0;				
				var corsite_buildout106 = 0;				
				var corsite_buildoutcostpersqft = N80ToF( $('#corsite_buildoutcostpersqft').val() );
				var corsite_buildoutextrasqftpercent = 0;	
				var corsite_buildouttotalbuildcostcalc = 0;			
				
				var corsite_buildouttotaldealcostbeforeintcalc = 0;
				
				// Net Profit before Interest		
				var corsite_buildoutgpbeforeintcalc = 0;	
				var corsite_buildoutgpbeforeintpercentcalc = 0;
				
				var corsite_buildoutvatablepercent = P82ToF( $('#corsite_buildoutvatablepercent').val() );
				var corsite_buildoutvatratepercent = P82ToF( $('#corsite_buildoutvatratepercent').val() );
				var corsite_buildoutvatcalc = 0;
				
				var corsite_buildoutfinancingltvpercent = P82ToF( $('#corsite_buildoutfinancingltvpercent').val() );		
				var corsite_buildoutfinancingnetborrowingcalc = 0;						
				var corsite_buildoutfinancingintratepercent = P82ToF( $('#corsite_buildoutfinancingintratepercent').val() );
				var corsite_buildoutfinancingduration = N80ToF( $('#corsite_buildoutfinancingduration').val() );
				var corsite_buildoutfinancingcostscalc = 0;		
				
				var corsite_buildouttotaldealcostafterintcalc = 0;
				
				// Net Profit after Interest
				var corsite_buildoutnpafterintcalc = 0;
				var corsite_buildoutnpafterintpercentcalc = 0;
	
				// Net Profit after Interest and tax
				var corsite_buildouttaxratepercent = P82ToF( $('#corsite_buildouttaxratepercent').val() );
				var tax = 0;
				
				var corsite_buildoutnpafterintandtaxcalc = 0;
				var corsite_buildoutnpafterintandtaxpercentcalc = 0;
				var corsite_buildoutnpcalc = 0;
			}
			
			// reset input fields with values
			$("#corsite_buildoutagentsalepercent").val( FToP82(corsite_buildoutagentsalepercent) );
			$("#corsite_buildoutagentsalecalc").val( FToN80(corsite_buildoutagentsalecalc) );
			$("#corsite_salelandvalue").val( FToN80(corsite_salelandvalue) );
			// $("#corsite_proposallandvalue").val( FToN80(corsite_salelandvalue) );			
			$("#corsite_salelandvaluepercentcalc").val( FToP82(corsite_salelandvaluepercentcalc) );			
			$("#corsite_buildoutsdltcalc").val( FToN80(corsite_buildoutsdltcalc) );
			$("#corsite_buildoutsdltpercentcalc").val( FToP82(corsite_buildoutsdltpercentcalc) );
			$("#corsite_buildoutlegals").val( FToN80(corsite_buildoutlegals) );		
			$("#corsite_buildoutagentpurchasepercent").val( FToP82(corsite_buildoutagentpurchasepercent) );
			$("#corsite_buildoutagentpurchasecalc").val( FToN80(corsite_buildoutagentpurchasecalc) );
			// $("#corsite_buildouttenantsurrender").val( FToN80(corsite_buildouttenantsurrender) );
			$("#corsite_buildoutother").val( FToN80(corsite_buildoutother) );	
			$("#corsite_buildoutproffees").val( FToN80(corsite_buildoutproffees) );			
			$("#corsite_buildoutcilsqmcalc").val( FToN80(corsite_buildoutcilsqmcalc) );				
			$("#corsite_buildoutcilpercent").val( FToP82(corsite_buildoutcilpercent) );			
			$("#corsite_buildoutcilcalc").val( FToN80(corsite_buildoutcilcalc) );								
			$("#corsite_buildoutcil").val( FToN80(corsite_buildoutcil) );			
			$("#corsite_buildout106").val( FToN80(corsite_buildout106) );			
			$("#corsite_buildouttotalsqftcalc").val( FToN80(corsite_buildouttotalsqftcalc) );				
			$("#corsite_buildoutextrasqftpercent").val( FToP82(corsite_buildoutextrasqftpercent) );			
			$("#corsite_buildouttotalbuildcostcalc").val( FToN80(corsite_buildouttotalbuildcostcalc) );				
	
			$("#corsite_buildouttotaldealcostbeforeintcalc").val( FToN80(corsite_buildouttotaldealcostbeforeintcalc) );	
			// Net Profit before Interest		
			$("#corsite_buildoutgpbeforeintcalc").val( FToN80(corsite_buildoutgpbeforeintcalc) );		
			$("#corsite_buildoutgpbeforeintpercentcalc").val( FToP82(corsite_buildoutgpbeforeintpercentcalc) );
			
			$("#corsite_buildoutvatablepercent").val( FToP82(corsite_buildoutvatablepercent) );	
			$("#corsite_buildoutvatratepercent").val( FToP82(corsite_buildoutvatratepercent) );	
			$("#corsite_buildoutvatcalc").val( FToN80(corsite_buildoutvatcalc) );	
			
			$("#corsite_buildoutfinancingltvpercent").val( FToP82(corsite_buildoutfinancingltvpercent) );			
			$("#corsite_buildoutfinancingnetborrowingcalc").val( FToN80(corsite_buildoutfinancingnetborrowingcalc) );							
			$("#corsite_buildoutfinancingintratepercent").val( FToP82(corsite_buildoutfinancingintratepercent) );
			$("#corsite_buildoutfinancingduration").val( FToN80(corsite_buildoutfinancingduration) );		
			$("#corsite_buildoutfinancingcostscalc").val( FToN80(corsite_buildoutfinancingcostscalc) );			
			
			$("#corsite_buildouttotaldealcostafterintcalc").val( FToN80(corsite_buildouttotaldealcostafterintcalc) );	
			
			// Net Profit after Interest
			$("#corsite_buildoutnpafterintcalc").val( FToN80(corsite_buildoutnpafterintcalc) );		
			$("#corsite_buildoutnpafterintpercentcalc").val( FToP82(corsite_buildoutnpafterintpercentcalc) );	
	
			// Net Profit after Interest and tax
			$("#corsite_buildouttaxratepercent").val( FToP82(corsite_buildouttaxratepercent) );	
			
			$("#corsite_buildoutnpafterintandtaxcalc").val( FToN80(corsite_buildoutnpafterintandtaxcalc) );		
			$("#corsite_buildoutnpafterintandtaxpercentcalc").val( FToP82(corsite_buildoutnpafterintandtaxpercentcalc) );
			$("#corsite_buildoutnpcalc").val( FToN80(corsite_buildoutnpcalc) );	
			
			var corsite_buildtotalgpcalc = corsite_buildinnpcalc + corsite_buildoutnpcalc;
			$("#corsite_buildtotalgpcalc").val( FToN80(corsite_buildtotalgpcalc) );		
			$("#corsite_buildtotalgpcalccopy").val( FToN80(corsite_buildtotalgpcalc) ); // sales page
			// ==== Finance and Operations ===============
			
			// ==== Surveys ========================================
			var corsite_plgsurveytotalph1quotecalc = 0;
			var corsite_plgsurveytotaladhocquotecalc = 0;
			var corsite_plgsurveytotalsuccessfeecalc = 0;					
			var corsite_plgsurveytotalquotecalc = 0;
			var corsite_plgsurveytotalcostexvatsagecalc = 0;
			var corsite_plgsurveytotalcostvsquotevarcalc = 0;
			
			var corsite_buildtotalplanningsubmissionfees = 0;
			var corsite_buildtotalplanningproffees = 0;
	
			var corsite_quoteready = $('#corsite_quoteready').val();
			
			for (var key in corsurveyida) {
				var corsurvey_ph1quote = N80ToF($("#corsurvey_ph1quote_"+key).val());
				$("#corsurvey_ph1quote_"+key).val( FToN80(corsurvey_ph1quote) );
				var corsurvey_ph1quoteinvrecddate = $("#corsurvey_ph1quoteinvrecddate_"+key).val();
				$("#corsurvey_ph1quoteinvrecddate_marker_"+key).removeClass();
				if ( corsite_quoteready != "Y") { 
					if ( corsurvey_ph1quoteinvrecddate == "" ) { $("#corsurvey_ph1quoteinvrecddate_marker_"+key).addClass( "quotedatemarker btn btn-secondary" ); } 
					else { $("#corsurvey_ph1quoteinvrecddate_marker_"+key).addClass( "quotedatemarker btn btn-success" ); }
				} else {
					if ( corsurvey_ph1quoteinvrecddate == "" ) { $("#corsurvey_ph1quoteinvrecddate_marker_"+key).addClass( "quotedatemarker btn btn-warning" ); } 
					else { $("#corsurvey_ph1quoteinvrecddate_marker_"+key).addClass( "quotedatemarker btn btn-danger" ); }
				}
				
				var corsurvey_adhocquote = N80ToF($("#corsurvey_adhocquote_"+key).val());
				$("#corsurvey_adhocquote_"+key).val( FToN80(corsurvey_adhocquote) );
				var corsurvey_adhocquoteinvrecddate = $("#corsurvey_adhocquoteinvrecddate_"+key).val();
				$("#corsurvey_adhocquoteinvrecddate_marker_"+key).removeClass();
				if ( corsite_quoteready != "Y") { 
					if ( corsurvey_adhocquoteinvrecddate == "" ) { $("#corsurvey_adhocquoteinvrecddate_marker_"+key).addClass( "quotedatemarker btn btn-secondary" ); } 
					else { $("#corsurvey_adhocquoteinvrecddate_marker_"+key).addClass( "quotedatemarker btn btn-success" ); }
				} else {					
					if ( corsurvey_adhocquoteinvrecddate == "" ) { $("#corsurvey_adhocquoteinvrecddate_marker_"+key).addClass( "quotedatemarker btn btn-warning" ); } 
					else { $("#corsurvey_adhocquoteinvrecddate_marker_"+key).addClass( "quotedatemarker btn btn-danger" ); }
				}						
					
				var corsurvey_successfee = N80ToF($("#corsurvey_successfee_"+key).val());
				$("#corsurvey_successfee_"+key).val( FToN80(corsurvey_successfee) );
				var corsurvey_successfeeinvrecddate = $("#corsurvey_successfeeinvrecddate_"+key).val();
				$("#corsurvey_successfeeinvrecddate_marker_"+key).removeClass();
				if ( corsite_quoteready != "Y") { 				
					if ( corsurvey_successfeeinvrecddate == "" ) { $("#corsurvey_successfeeinvrecddate_marker_"+key).addClass( "quotedatemarker btn btn-secondary" ); } 
					else { $("#corsurvey_successfeeinvrecddate_marker_"+key).addClass( "quotedatemarker btn btn-success" ); }
				} else {						
					if ( corsurvey_successfeeinvrecddate == "" ) { $("#corsurvey_successfeeinvrecddate_marker_"+key).addClass( "quotedatemarker btn btn-warning" ); } 
					else { $("#corsurvey_successfeeinvrecddate_marker_"+key).addClass( "quotedatemarker btn btn-danger" ); }				
				}
				
				var corsurvey_totalquotecalc = corsurvey_ph1quote + corsurvey_adhocquote + corsurvey_successfee;
				$("#corsurvey_totalquotecalc_"+key).val(  FToN80(corsurvey_totalquotecalc) );	
				var corsurvey_costexvatsagecalc = N80ToF($("#corsurvey_costexvatsagecalc_"+key).html());
				var corsurvey_costvsquotevarcalc = corsurvey_totalquotecalc - corsurvey_costexvatsagecalc;
				$("#corsurvey_costvsquotevarcalc_"+key).val(  FToN80(corsurvey_costvsquotevarcalc) );							
				corsite_plgsurveytotalph1quotecalc = corsite_plgsurveytotalph1quotecalc + corsurvey_ph1quote;
				corsite_plgsurveytotaladhocquotecalc = corsite_plgsurveytotaladhocquotecalc + corsurvey_adhocquote;
				corsite_plgsurveytotalsuccessfeecalc = corsite_plgsurveytotalsuccessfeecalc + corsurvey_successfee;			
				corsite_plgsurveytotalquotecalc = corsite_plgsurveytotalquotecalc + corsurvey_totalquotecalc;
				corsite_plgsurveytotalcostexvatsagecalc = corsite_plgsurveytotalcostexvatsagecalc + corsurvey_costexvatsagecalc;
				corsite_plgsurveytotalcostvsquotevarcalc = corsite_plgsurveytotalcostvsquotevarcalc + corsurvey_costvsquotevarcalc;	
				var corsurvey_corsurveycategoryid = $("#corsurvey_corsurveycategoryid_"+key).val();
				if (corsurvey_corsurveycategoryid == "AppSubmission") { corsite_buildtotalplanningsubmissionfees = corsite_buildtotalplanningsubmissionfees + corsurvey_ph1quote; }
				else { corsite_buildtotalplanningproffees = corsite_buildtotalplanningproffees + corsurvey_ph1quote; }
			}		
			var corsite_buildtotalplanningsuccessfees = corsite_plgsurveytotalsuccessfeecalc;
			
			$("#corsite_plgsurveytotalph1quotecalc").val(  FToN80(corsite_plgsurveytotalph1quotecalc) );	
			$("#corsite_plgsurveytotaladhocquotecalc").val(  FToN80(corsite_plgsurveytotaladhocquotecalc) );			
			$("#corsite_plgsurveytotalsuccessfeecalc").val(  FToN80(corsite_plgsurveytotalsuccessfeecalc) );			
			$("#corsite_plgsurveytotalquotecalc").val(  FToN80(corsite_plgsurveytotalquotecalc) );	
			$("#corsite_plgsurveytotalcostexvatsagecalc").val( FToN80(corsite_plgsurveytotalcostexvatsagecalc) );			
			$("#corsite_plgsurveytotalcostvsquotevarcalc").val( FToN80(corsite_plgsurveytotalcostvsquotevarcalc) );	
				
			
			// ==== Proceeds and Uplift on Financial Appraisal 1 ===========================================				
			var corsite_buildtotalgrossproceeds = corsite_buildtotalgpcalc;
			$("#corsite_buildtotalgrossproceeds").val( FToN80(corsite_buildtotalgrossproceeds) );	
			var corsite_proposalphasestatus = $('#corsite_proposalphasestatus').val();
			var corsite_proposalnewrag = $('#corsite_proposalnewrag').val();
			if ( corsite_quoteready != "Y") { // override with default values
				// if ( corsite_proposalphasestatus == "Ph2Completed") {
					// if (( corsite_proposalnewrag == "Green")||( corsite_proposalnewrag == "Amber" )) {						
						Get_Data_Hash('cordefaultvalue',"corsite_buildtotalplanningproffees");
						if (GLOBALS["IOERROR"] == "1") { corsite_buildtotalplanningproffees = 0; } else { corsite_buildtotalplanningproffees = parseFloat(GLOBALS['cordefaultvalue_value']); }
						Get_Data_Hash('cordefaultvalue',"corsite_buildtotalplanningsubmissionfees");
						if (GLOBALS["IOERROR"] == "1") { corsite_buildtotalplanningsubmissionfees = 0; } else { corsite_buildtotalplanningsubmissionfees = parseFloat(GLOBALS['cordefaultvalue_value']); }
						Get_Data_Hash('cordefaultvalue',"corsite_buildtotalplanningsuccessfees");
						if (GLOBALS["IOERROR"] == "1") { corsite_buildtotalplanningsuccessfees = 0; } else { corsite_buildtotalplanningsuccessfees = parseFloat(GLOBALS['cordefaultvalue_value']); }	
					// }							
				// }
			}
			$("#corsite_buildtotalplanningproffees").val( FToN80(corsite_buildtotalplanningproffees) );	
			$("#corsite_buildtotalplanningsubmissionfees").val( FToN80(corsite_buildtotalplanningsubmissionfees) );	
			$("#corsite_buildtotalplanningsuccessfees").val( FToN80(corsite_buildtotalplanningsuccessfees) );			
			var corsite_buildtotallegalcosts = N80ToF( $('#corsite_buildtotallegalcosts').val() );
			$("#corsite_buildtotallegalcosts").val( FToN80(corsite_buildtotallegalcosts) );	
			var corsite_buildtotalothercosts = N80ToF( $('#corsite_buildtotalothercosts').val() );
			$("#corsite_buildtotalothercosts").val( FToN80(corsite_buildtotalothercosts) );	
			var corsite_buildtotalothercosts = N80ToF( $('#corsite_buildtotalothercosts').val() );
			$("#corsite_buildtotalothercosts").val( FToN80(corsite_buildtotalothercosts) );			
			var corsite_buildtotalcapex = N80ToF( $('#corsite_buildtotalcapex').val() );
			$("#corsite_buildtotalcapex").val( FToN80(corsite_buildtotalcapex) );			
			var corsite_buildtotallossofebitda = N80ToF( $('#corsite_buildtotallossofebitda').val() );
			$("#corsite_buildtotallossofebitda").val( FToN80(corsite_buildtotallossofebitda) );
			var corsite_buildtotalnetproceeds = corsite_buildtotalgrossproceeds - corsite_buildtotalplanningproffees - corsite_buildtotalplanningsubmissionfees - corsite_buildtotalplanningsuccessfees - corsite_buildtotallegalcosts - corsite_buildtotalothercosts - corsite_buildtotalcapex - corsite_buildtotallossofebitda;
			$("#corsite_buildtotalnetproceeds").val( FToN80(corsite_buildtotalnetproceeds) );
			
			var corsite_currfinlatestebitda = N80ToF( $('#corsite_currfinlatestebitda').val() );
			$("#corsite_currfinlatestebitda").val( FToN80(corsite_currfinlatestebitda) );
			if ( $( "#corsite_proposaltype" ).val() == "Full Site" ) {
				$("#corsite_currfinlatestebitdacopy").val( FToN80(corsite_currfinlatestebitda) ); // synch with Specification Tab				
				var corsite_predictedebitdapercent = 100;
				$("#corsite_predictedebitdapercent").val( FToP82(corsite_predictedebitdapercent) );			
				var corsite_predictedebitdacalc = corsite_currfinlatestebitda;
				var corsite_ebitdamultiple = N82ToF( $('#corsite_ebitdamultiple').val() );
				$("#corsite_ebitdamultiple").val( FToN82(corsite_ebitdamultiple) );			
				var corsite_capvalebitdaimpactcalc = 0;
				$("#corsite_capvalebitdaimpactcalc").val( FToN80(corsite_capvalebitdaimpactcalc) );	
				var corsite_upliftcalc = corsite_buildtotalnetproceeds - corsite_arkgva
				$("#corsite_upliftcalc").val( FToN80(corsite_upliftcalc) );
				$("#corsite_upliftcalcexplanation").html("Full Site</br>Uplift = Net Proceeds - GVA");
				$('#EBITDAReduction').hide(); 
			}			
			if ( $( "#corsite_proposaltype" ).val() == "Part Site" ) {
				$("#corsite_currfinlatestebitdacopy").val( FToN80(corsite_currfinlatestebitda) ); // synch with Specification Tab				
				var corsite_predictedebitdapercent = 100;
				$("#corsite_predictedebitdapercent").val( FToP82(corsite_predictedebitdapercent) );			
				var corsite_predictedebitdacalc = corsite_currfinlatestebitda;
				var corsite_ebitdamultiple = N82ToF( $('#corsite_ebitdamultiple').val() );
				$("#corsite_ebitdamultiple").val( FToN82(corsite_ebitdamultiple) );			
				var corsite_capvalebitdaimpactcalc = 0;
				$("#corsite_capvalebitdaimpactcalc").val( FToN80(corsite_capvalebitdaimpactcalc) );	
				var corsite_upliftcalc = corsite_buildtotalnetproceeds;
				$("#corsite_upliftcalc").val( FToN80(corsite_upliftcalc) );
				$("#corsite_upliftcalcexplanation").html("Part Site</br>Uplift = Net Proceeds");
				$('#EBITDAReduction').hide(); 
			}		
			if ( $( "#corsite_proposaltype" ).val() == "Split Site" ) {
				
				$("#corsite_currfinlatestebitdacopy").val( FToN80(corsite_currfinlatestebitda) ); // synch with Specification Tab				
				var corsite_predictedebitdapercent = P82ToF( $('#corsite_predictedebitdapercent').val() );
				$("#corsite_predictedebitdapercent").val( FToP82(corsite_predictedebitdapercent) );			
				var corsite_predictedebitdacalc = corsite_currfinlatestebitda * corsite_predictedebitdapercent / 100;
				$("#corsite_predictedebitdacalc").val( FToN80(corsite_predictedebitdacalc) );	
				var corsite_ebitdamultiple = N82ToF( $('#corsite_ebitdamultiple').val() );
				$("#corsite_ebitdamultiple").val( FToN82(corsite_ebitdamultiple) );			
				var corsite_capvalebitdaimpactcalc = (corsite_currfinlatestebitda - corsite_predictedebitdacalc) * corsite_ebitdamultiple;
				$("#corsite_capvalebitdaimpactcalc").val( FToN80(corsite_capvalebitdaimpactcalc) );	
				var corsite_upliftcalc = corsite_buildtotalnetproceeds - corsite_capvalebitdaimpactcalc ;
				$("#corsite_upliftcalc").val( FToN80(corsite_upliftcalc) );
				$("#corsite_upliftcalcexplanation").html("Split Site</br>Uplift = Net Proceeds - CapVal EBITDA Impact");
				$('#EBITDAReduction').show(); 
			}
			var corsite_upliftclientsharepercent = P82ToF( $('#corsite_upliftclientsharepercent').val() );
			var corsite_upliftclientsharecalc = corsite_upliftcalc*corsite_upliftclientsharepercent/100;		
			$("#corsite_upliftclientsharecalc").val( FToN80(corsite_upliftclientsharecalc) );		
			var corsite_upliftcorsharepercent = P82ToF( $('#corsite_upliftcorsharepercent').val() );
			var corsite_upliftcorsharecalc = corsite_upliftcalc*corsite_upliftcorsharepercent/100;		
			$("#corsite_upliftcorsharecalc").val( FToN80(corsite_upliftcorsharecalc) );	
			// alert(corsite_upliftcalc+" "+corsite_upliftclientsharecalc+" "+corsite_upliftcorsharecalc);
			
			// ==== Financial Appraisal 2 =======================================
			if (corprogramme_customtablist.indexOf("FA2") !=-1) {
				var corsite_appltmebitdafull = N80ToF($('#corsite_appltmebitdafull').val());
				$("#corsite_appltmebitdafull").val( FToN80(corsite_appltmebitdafull) );		
				var corsite_appltmebitdapart = N80ToF($('#corsite_appltmebitdapart').val());
				$("#corsite_appltmebitdapart").val( FToN80(corsite_appltmebitdapart) );		
				var corsite_appcapexoppfull = $('#corsite_appcapexoppfull').val();
				var corsite_appcapexopppart = $('#corsite_appcapexopppart').val();		
				var corsite_appcapexspendfull = N80ToF($('#corsite_appcapexspendfull').val());
				$("#corsite_appcapexspendfull").val( FToN80(corsite_appcapexspendfull) );		
				var corsite_appcapexspendpart = N80ToF($('#corsite_appcapexspendpart').val());
				$("#corsite_appcapexspendpart").val( FToN80(corsite_appcapexspendpart) );			
				var corsite_appfwdebitdafull = N80ToF($('#corsite_appfwdebitdafull').val());
				$("#corsite_appfwdebitdafull").val( FToN80(corsite_appfwdebitdafull) );		
				var corsite_appfwdebitdapart = N80ToF($('#corsite_appfwdebitdapart').val());
				$("#corsite_appfwdebitdapart").val( FToN80(corsite_appfwdebitdapart) );
				// --------		
				if ( corsite_appfwdebitdafull  > corsite_appltmebitdafull  ) {
					var corsite_appbaseebitdafullcalc = Math.max(corsite_appfwdebitdafull,corsite_appltmebitdafull);
				} else {
					var corsite_appbaseebitdafullcalc = Math.min(corsite_appfwdebitdafull,corsite_appltmebitdafull);
				}
				$("#corsite_appbaseebitdafullcalc").val( FToN80(corsite_appbaseebitdafullcalc) );
				if ( corsite_appfwdebitdapart  > corsite_appltmebitdapart  ) {
					var corsite_appbaseebitdapartcalc = Math.max(corsite_appfwdebitdapart,corsite_appltmebitdapart);
				} else {
					var corsite_appbaseebitdapartcalc = Math.min(corsite_appfwdebitdapart,corsite_appltmebitdapart);
				}
				$("#corsite_appbaseebitdapartcalc").val( FToN80(corsite_appbaseebitdapartcalc) );
				// --------		
				var corsite_appebitdamultiplefull = N82ToF($('#corsite_appebitdamultiplefull').val());
				$("#corsite_appebitdamultiplefull").val( FToN82(corsite_appebitdamultiplefull) );		
				var corsite_appebitdamultiplepart = N82ToF($('#corsite_appebitdamultiplepart').val());
				$("#corsite_appebitdamultiplepart").val( FToN82(corsite_appebitdamultiplepart) );
				// --------		
				if ( corsite_appcapexoppfull == "No" ) {
					var corsite_appimpliedvalfullcalc = corsite_appbaseebitdafullcalc * corsite_appebitdamultiplefull;		
				} else {
					var corsite_appimpliedvalfullcalc = (corsite_appbaseebitdafullcalc * corsite_appebitdamultiplefull) + corsite_appcapexspendfull ;	
				}
				$("#corsite_appimpliedvalfullcalc").val( FToN80(corsite_appimpliedvalfullcalc) );
				if ( corsite_appcapexopppart == "No" ) {
					var corsite_appimpliedvalpartcalc = corsite_appbaseebitdapartcalc * corsite_appebitdamultiplepart;		
				} else {
					var corsite_appimpliedvalpartcalc = (corsite_appbaseebitdapartcalc * corsite_appebitdamultiplepart) + corsite_appcapexspendpart ;	
				}
				$("#corsite_appimpliedvalpartcalc").val( FToN80(corsite_appimpliedvalpartcalc) );
				// --------
				var corsite_appgvavalfull = N80ToF($('#corsite_appgvavalfull').val());
				$("#corsite_appgvavalfull").val( FToN80(corsite_appgvavalfull) );			
				var corsite_appgvavalpart = N80ToF($('#corsite_appgvavalpart').val());
				$("#corsite_appgvavalpart").val( FToN80(corsite_appgvavalpart) );
				// --------
				var corsite_appbasevalfullcalc = Math.max(corsite_appimpliedvalfullcalc,corsite_appgvavalfull);
				$("#corsite_appbasevalfullcalc").val( FToN80(corsite_appbasevalfullcalc) );	
				var corsite_appbasevalpartcalc = Math.max(corsite_appimpliedvalpartcalc,corsite_appgvavalpart);
				$("#corsite_appbasevalpartcalc").val( FToN80(corsite_appbasevalpartcalc) );
				// --------
				var corsite_appgdprocfull = N80ToF($('#corsite_appgdprocfull').val());
				$("#corsite_appgdprocfull").val( FToN80(corsite_appgdprocfull) );	
				var corsite_appgdprocpart = N80ToF($('#corsite_appgdprocpart').val());
				$("#corsite_appgdprocpart").val( FToN80(corsite_appgdprocpart) );	
				var corsite_appplanningcostsfull = N80ToF($('#corsite_appplanningcostsfull').val());
				$("#corsite_appplanningcostsfull").val( FToN80(corsite_appplanningcostsfull) );	
				var corsite_appplanningcostspart = N80ToF($('#corsite_appplanningcostspart').val());
				$("#corsite_appplanningcostspart").val( FToN80(corsite_appplanningcostspart) );			
				var corsite_applegalcostsfull = N80ToF($('#corsite_applegalcostsfull').val());
				$("#corsite_applegalcostsfull").val( FToN80(corsite_applegalcostsfull) );				
				var corsite_applegalcostspart = N80ToF($('#corsite_applegalcostspart').val());
				$("#corsite_applegalcostspart").val( FToN80(corsite_applegalcostspart) );			
				var corsite_appothercostsfull = N80ToF($('#corsite_appothercostsfull').val());
				$("#corsite_appothercostsfull").val( FToN80(corsite_appothercostsfull) );			
				var corsite_appothercostspart = N80ToF($('#corsite_appothercostspart').val());
				$("#corsite_appothercostspart").val( FToN80(corsite_appothercostspart) );
				// --------		
				var corsite_appnprocfullcalc = corsite_appgdprocfull + corsite_appplanningcostsfull + corsite_applegalcostsfull + corsite_appothercostsfull;		
				$("#corsite_appnprocfullcalc").val( FToN80(corsite_appnprocfullcalc) );	
				var corsite_appnprocpartcalc = corsite_appgdprocpart + corsite_appplanningcostspart + corsite_applegalcostspart + corsite_appothercostspart;		
				$("#corsite_appnprocpartcalc").val( FToN80(corsite_appnprocpartcalc) );	
				// --------	
				var corsite_appnprocvsbasevalfullcalc = corsite_appnprocfullcalc - corsite_appbasevalfullcalc;
				$("#corsite_appnprocvsbasevalfullcalc").val( FToN80(corsite_appnprocvsbasevalfullcalc) );	
				var corsite_appnprocvsbasevalpartcalc = corsite_appnprocpartcalc - corsite_appbasevalpartcalc;
				$("#corsite_appnprocvsbasevalpartcalc").val( FToN80(corsite_appnprocvsbasevalpartcalc) );
				// --------
				if (corsite_appbasevalfullcalc == 0 ) { var corsite_appnprocvsbasevalfullpercentcalc = 0; }
				else { var corsite_appnprocvsbasevalfullpercentcalc = ((corsite_appnprocfullcalc/corsite_appbasevalfullcalc)-1)*100; }
				$("#corsite_appnprocvsbasevalfullpercentcalc").val( FToP82(corsite_appnprocvsbasevalfullpercentcalc) );	
				if (corsite_appbasevalpartcalc == 0 ) { var corsite_appnprocvsbasevalpartpercentcalc = 0; }
				else { var corsite_appnprocvsbasevalpartpercentcalc = ((corsite_appnprocpartcalc/corsite_appbasevalpartcalc)-1)*100; }
				$("#corsite_appnprocvsbasevalpartpercentcalc").val( FToP82(corsite_appnprocvsbasevalpartpercentcalc) );
				// --------		
				if ( corsite_appnprocvsbasevalfullcalc > 0 ) {
					var corsite_appdisposalstrategyfullcalc = "Dispose";		
				} else {
					var corsite_appdisposalstrategyfullcalc = "Retain";
				}		
				$("#corsite_appdisposalstrategyfullcalc").val( corsite_appdisposalstrategyfullcalc );		
				if ( corsite_appnprocvsbasevalpartcalc > 0 ) {
					var corsite_appdisposalstrategypartcalc = "Dispose";		
				} else {
					var corsite_appdisposalstrategypartcalc = "Retain";
				}	
				$("#corsite_appdisposalstrategypartcalc").val( corsite_appdisposalstrategypartcalc );
				// --------		
				if ( corsite_appbaseebitdafullcalc == 0 ) { corsite_appimpliedmultiplefullcalc = 0; }
				else { corsite_appimpliedmultiplefullcalc = corsite_appnprocfullcalc / corsite_appbaseebitdafullcalc; }
				$("#corsite_appimpliedmultiplefullcalc").val( FToN82(corsite_appimpliedmultiplefullcalc) );					
				if ( corsite_appbaseebitdapartcalc == 0 ) { corsite_appimpliedmultiplepartcalc = 0; }
				else { corsite_appimpliedmultiplepartcalc = corsite_appnprocpartcalc / corsite_appbaseebitdapartcalc; }
				$("#corsite_appimpliedmultiplepartcalc").val( FToN82(corsite_appimpliedmultiplepartcalc) );	
			}
	
			// ==== Calculated Financials (on Specification Page)===============
					
			if (( $("#corsite_buildcomminternally").val() == "Y" )||( $("#corsite_buildresiinternally").val() == "Y" )) { 
				// This is a build internally situation
				$("#corsite_proposalgdv").val( FToN80(corsite_disptotsitegdvcalc) );
				$("#corsite_proposallandpurchasevalue").val( FToN80(corsite_buildinlandpurchase+corsite_buildinsdltcalc) );
				$("#corsite_proposalbuildcost").val( FToN80(corsite_buildintotalbuildcostcalc) );				
				$("#corsite_proposalnetproceeds").val( FToN80(corsite_buildtotalnetproceeds) );
				$("#corsite_proposaluplift").val(0);
			} else {
				// all other cases (may refine this later)
				$("#corsite_proposalgdv").val( FToN80(corsite_disptotsitegdvcalc) );
				$("#corsite_proposallandpurchasevalue").val(0);
				$("#corsite_proposalbuildcost").val( FToN80(corsite_buildouttotalbuildcostcalc) );	// nasty		
				$("#corsite_proposalnetproceeds").val( FToN80(corsite_buildtotalnetproceeds) );
				$("#corsite_proposaluplift").val( FToN80(corsite_upliftcalc) );
			}
			
			$("#corsite_proposalsubmissionfee").val( FToN80(corsite_buildtotalplanningsubmissionfees) );
			$("#corsite_proposalplanningfee").val( FToN80(corsite_buildtotalplanningproffees+corsite_buildtotalplanningsuccessfees) );
			$("#corsite_proposallegalcosts").val( FToN80(corsite_buildinlegals+corsite_buildtotallegalcosts) );
			$("#corsite_proposalcil106").val( FToN80(corsite_buildincil+corsite_buildincilcalc+corsite_buildin106) );
			$("#corsite_proposalothercosts").val( FToN80(corsite_buildinagentpurchasecalc+corsite_buildinagentsalecalc+corsite_buildinproffees+corsite_buildinother+corsite_buildtotalothercosts+corsite_buildtotalcapex+corsite_buildtotallossofebitda) );				
				
			if( $("#copy_corsite_arkgva").length ) { $("#copy_corsite_arkgva").val( FToN80(corsite_arkgva) ); }
			
			// Custom Financials
		
			if (corprogramme_customtablist.indexOf("FA2") !=-1) {
				var corsite_currfinbarrelvol = N80ToF( $('#corsite_currfinbarrelvol').val() );
				$("#corsite_currfinbarrelvol").val( FToN80(corsite_currfinbarrelvol) );				
				var corsite_currfinpassingrent = N80ToF( $('#corsite_currfinpassingrent').val() );
				$("#corsite_currfinpassingrent").val( FToN80(corsite_currfinpassingrent) );			
				$('#resiothergdvdiv').hide();
			}
			if (corprogramme_customtablist.indexOf("FA3") !=-1) {
				$('#resiothergdvdiv').show();
			}			
			
		}
	}
	
	function remodel() {
				
		var targetnp = P82ToF( $('#corsite_buildoutbuilderroipercent').val() );
		// alert(targetnp);
		
		// ==== Get Relevant Input Parameters ===============
		var corsite_buildoutgdvtotcalc = N80ToF($('#corsite_buildoutgdvtotcalc').val());
		var corsite_buildoutagentsalecalc = N80ToF($('#corsite_buildoutagentsalecalc').val());			
		var corsite_salelandvalue = N80ToF($('#corsite_salelandvalue').val());
		var corsite_buildoutlegals = N80ToF($('#corsite_buildoutlegals').val());
		var corsite_buildoutagentpurchasepercent = P82ToF( $('#corsite_buildoutagentpurchasepercent').val() );
		// var corsite_buildouttenantsurrender = N80ToF($('#corsite_buildouttenantsurrender').val());
		var corsite_buildoutcilcalc = N80ToF($('#corsite_buildoutcilcalc').val());	
		var corsite_buildoutcil = N80ToF($('#corsite_buildoutcil').val());	
		var corsite_buildout106 = N80ToF($('#corsite_buildout106').val());			
		var corsite_buildoutproffees = N80ToF($('#corsite_buildoutproffees').val());
		var corsite_buildoutother = N80ToF($('#corsite_buildoutother').val());
		var corsite_buildouttotalbuildcostcalc = N80ToF($('#corsite_buildouttotalbuildcostcalc').val());		
		var corsite_buildoutvatablepercent = P82ToF( $('#corsite_buildoutvatablepercent').val() );
		var corsite_buildoutvatratepercent = P82ToF( $('#corsite_buildoutvatratepercent').val() );
		var corsite_buildoutfinancingltvpercent = P82ToF( $('#corsite_buildoutfinancingltvpercent').val() );	
		var corsite_buildoutfinancingintratepercent = P82ToF( $('#corsite_buildoutfinancingintratepercent').val() );
		var corsite_buildoutfinancingduration = N80ToF( $('#corsite_buildoutfinancingduration').val() );
		var corsite_buildoutnpafterintpercentcalc = P82ToF( $('#corsite_buildoutnpafterintpercentcalc').val() );					
	
		// ==== Iterate to get answers ===============
		var maxiterations = 500000; 
		var iteration = 0;
		var cumsaleincrement = 0;
		var resultfound = "0";
		var saleincrement = 100;		
		if (corsite_buildoutnpafterintpercentcalc < targetnp) { saleincrement = -100; }
		
		while ((resultfound == "0")&&(iteration < maxiterations))  {
			iteration++;
			corsite_salelandvalue = corsite_salelandvalue + saleincrement;
			var tranche1 = 0; var tranche2 = 0;
			if (corsite_salelandvalue >= 250000) {
					tranche1 = 100000;
					tranche2 = corsite_salelandvalue - 249999;				
			} else {
				if (corsite_salelandvalue >= 150000) {
					tranche1 = corsite_salelandvalue - 149999;		
				}
			}
			var corsite_buildoutsdltcalc = (tranche1 * 0.02) + (tranche2 * 0.05) ;		
			
			corsite_buildoutagentpurchasecalc = (corsite_salelandvalue * corsite_buildoutagentpurchasepercent)/100;
			corsite_buildouttotaldealcostbeforeintcalc = corsite_buildoutagentsalecalc + corsite_salelandvalue + corsite_buildoutsdltcalc + corsite_buildoutlegals 
			+ corsite_buildoutagentpurchasecalc + corsite_buildoutother + corsite_buildoutcilcalc  + corsite_buildoutcil + corsite_buildout106 + corsite_buildoutproffees + corsite_buildouttotalbuildcostcalc;
			corsite_buildoutvatcalc = (corsite_salelandvalue * corsite_buildoutvatablepercent * corsite_buildoutvatratepercent)/10000;
			corsite_buildoutfinancingcostscalc = (corsite_buildouttotaldealcostbeforeintcalc * corsite_buildoutfinancingltvpercent * corsite_buildoutfinancingintratepercent) * corsite_buildoutfinancingduration / 120000;				
			corsite_buildouttotaldealcostafterintcalc = corsite_buildouttotaldealcostbeforeintcalc + corsite_buildoutfinancingcostscalc;
			corsite_buildoutnpafterintcalc = corsite_buildoutgdvtotcalc - corsite_buildouttotaldealcostafterintcalc;
			corsite_buildoutnpafterintpercentcalc = (corsite_buildoutnpafterintcalc / corsite_buildouttotaldealcostbeforeintcalc)*100;			
			
			if ( saleincrement < 0 ) {		
				if ( corsite_buildoutnpafterintpercentcalc >= targetnp  ) { resultfound = "1"; }
			} else {
				if ( corsite_buildoutnpafterintpercentcalc <= targetnp  ) { resultfound = "1"; }
			}
		}
		
		if ( resultfound == "1" ) {
			// ==== Redisplay Sale Land Value Result  (Recalc is called afterwards) ===============
			// alert( "Result found after "+iteration+" iterations" );		
			$("#corsite_salelandvalue").val( FToN80(corsite_salelandvalue) );
			// alert("Finished Re-Model - "+corsite_salelandvalue+" "+corsite_buildoutnpafterintpercentcalc+" "+iteration+" "+maxiterations);
		} else {
			alert( "No result found after "+iteration+" iterations" );			
		}
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
		var xnumstring = xnum.toFixed(2);		
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
            if (typeof xstr !== 'undefined') {
		var xstr = xstr.replace(/,/g, '');
		var xstr = xstr.replace(/\(/g, '');		
		var xstr = xstr.replace(/\}/g, '');		
		var xstr = xstr.replace(/\u00A3/g, ''); // remove � sign
            } else {
                xstr = "0";
            }
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

	function LockRequest(lockrequest) {
		startWait("Loading");		
		// var corsite_id = $('#corsite_id').val();
		var corsite_version = $('#corsite_version').val();
		var corsite_lastupdatetimestamp = $('#corsite_lastupdatetimestamp').val();		
		var corsite_lastupdatepersonid = $('#corsite_lastupdatepersonid').val();			
		 var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_corsitelock.php"; 		 
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
		    	 corsite_id: corsite_id,
		    	 corsite_version: corsite_version,
		    	 corsite_lastupdatetimestamp: corsite_lastupdatetimestamp,
		    	 corsite_lastupdatepersonid: corsite_lastupdatepersonid,		    		 		    		     	 	    	 
		     	 CorLockRequest: lockrequest		    	 		    	 
		     },
		     type: "GET",
		     dataType: "text",
		     timeout: 10000,
		     success: LockSuccess,	        
		     error: LockFailure  
		 });
		 // Define a function to handle the response data.
		 function LockSuccess(data, status) {
			// data
			// 0 $incorsite_id 1 $incorsite_version 2 $incorlockrequest 3 $lockrequestresult 4 $lockrequestresultreason
			// 5 $GLOBALS{'corsite_lockedtimestamp'} 6 $GLOBALS{'corsite_lockedpersonid'} 7 $lockstatus
			// 8 $GLOBALS{'corsite_lastupdatetimestamp'} 9 $GLOBALS{'corsite_lastupdatepersonid'} 10 $GLOBALS{'corsite_lastupdatetype'}		 

		    var databits = data.split("|");
		    stopWait(); 
		    // alert(data);
		    
		    var existingsrc = $('#locked').attr('src');
		    var sbits1 = existingsrc.split("/");
		    var sbits2 = sbits1[2].split(".");
		    var existinglockstatus = sbits2[0];
		    // alert(existinglockstatdatabitsatabits[7]);
		    
			var lastupdatemessage = "";	
			if (databits[5] != "") {		
				if (databits[10] == "Upload" ){
					lastupdatemessage = "<hr>Note: Last Updated by an Upload File generated by "+databits[9]+" on "+TimestamptoDDMMMbHHcMM (databits[8])+".";		
				}
				if (databits[10] == "MassUpdate" ){
					lastupdatemessage = "<hr>Note: Last Updated by a Mass Update generated by "+databits[9]+" on "+TimestamptoDDMMMbHHcMM (databits[8])+".";		
				}
				if (databits[10] == "Update" ){
					lastupdatemessage = "<hr>Note: Last Updated by "+databits[9]+" on "+TimestamptoDDMMMbHHcMM (databits[8])+".";		
				}		
			}
			var lockedsince = TimestamptoDDMMMbHHcMM(databits[5]);
		    
		    if ( databits[2] == "LockRequest" ) {
		    	if (databits[3] == "Accepted") {		    				    		
		    		$("#locked").attr('src',"../site_assets/LockedByMe.png");
		    		/*
		    		$.alert({
		    			icon: 'fa fa-lock text-success',
		    			title: "Success",
		    		    content: 'This site has now been locked'
		    		});
		    		*/
		    	}
		    	if (databits[3] == "Rejected") {
		    		if (databits[4] == "AlreadyLocked") {
			    		$("#locked").attr('src',"../site_assets/LockedByOther.png");
			    		$.alert({
			    			icon: 'fa fa-lock text-danger',
			    			title: "Warning",
			    		    content: 'This site remains locked by '+databits[6]+' since '+lockedsince+'.'
			    		});
		    		}
		    		if (databits[4] == "TimestampError") {
			    		$("#locked").attr('src',"../site_assets/LockedByOther.png");
		    			$.confirm({
		    				icon: 'fa fa-unlock text-warning',
		    			    title: 'Warning',
		    			    content: 'This site has now been Unlocked.'+lastupdatemessage+'.<hr>However you will need to reload the site to pick up the latest updates.',
		    			    buttons: {
		    			        somethingElse: {
		    			            text: 'Reload',
		    			            btnClass: 'btn-blue',
		    			            action: function(){
		    			            	ReloadSite();		    			            }
		    			        },
		    			        cancel: function () {  },
		    			    }
		    			});			    			    		
		    		}
		    	}
		    }
		    if ( databits[2] == "UnLockRequest" ) {
		    	if (databits[3] == "Accepted") {		    				    		
		    		$("#locked").attr('src',"../site_assets/UnLocked.png");
		    		$.alert({
		    			icon: 'fa fa-unlock text-success',
		    			title: "Success",
		    		    content: 'This site has now been Unlocked.'+lastupdatemessage,
		    		});
		    	}		    	
		    	if (databits[3] == "Rejected") { // should never happen		    				    		
		    		$.alert({
		    			icon: 'fa fa-unlock text-danger',
		    			title: "Error",
		    		    content: 'Error code 301.',
		    		});    		
		    	}
		    }
		    if ( databits[2] == "QueryLockStatus" ) {
		    	QueryLockStatusAction(existinglockstatus,databits[7],databits,lastupdatemessage,lockedsince);
			}
		}
		function LockFailure(xhr, reason, ex) {
			messageAlert("Error");
		} 
	} 			
		
	function QueryLockStatusAction(existinglockstatus,serverlockstatus,databits,lastupdatemessage,lockedsince) {		

		$("#locked").attr('src',"../site_assets/"+serverlockstatus+".png");
			
    	if ( existinglockstatus == "UnLocked" ) {
    		if (serverlockstatus == "UnLocked") {
    			// alert("Central Site UnLocked. Do you want to Lock2U?.");
    			$.confirm({
    				icon: 'fa fa-unlock text-success',
    			    title: 'Current Status',
    			    content: 'The site is currently Unlocked. Do you want to Lock it for your updates?'+lastupdatemessage,
    			    buttons: {
    			        somethingElse: {
    			            text: 'Lock Site',
    			            btnClass: 'btn-blue',
    			            action: function(){
    			            	LockRequest("LockRequest");
    			            }
    			        },
    			        cancel: function () {  },
    			    }
    			});	
    		}
    		if (serverlockstatus == "LockedByMe") {
    			// alert("Central Site Locked2U. Do you want to UnLock?. Warning")
    			$.confirm({
    				icon: 'fa fa-lock text-primary',
    			    title: 'Current Status',
    			    content: '<b>This site was in fact already locked by you!</b>Are you sure you want to now unlock this site and allow others to make updates?'+lastupdatemessage,
    			    buttons: {
    			        somethingElse: {
    			            text: 'Unlock Site',
    			            btnClass: 'btn-blue',
    			            action: function(){
    			            	LockRequest("UnLockRequest");
    			            }
    			        },
    			        cancel: function () {  },
    			    }
    			});
    		}
    		if (serverlockstatus == "LockedByOther") {
    			// alert("Central Site Locked2Other. Do you want to Lock2U or Unlock?. Warning");			
    			$.confirm({
    				icon: 'fa fa-lock text-danger',
    			    title: 'Current Status',
    			    content: 'This site has now been locked by '+databits[6]+' since '+lockedsince+'. Do you want to remove this lock?'+lastupdatemessage,
    			    buttons: {
    			        somethingElse: {
    			            text: 'Remove Lock !',
    			            btnClass: 'btn-orange',
    			            action: function(){
    			            	LockRequest("UnLockRequest");
    			            }
    			        },
    			        cancel: function () {  },
    			    }
    			});		
    		}
    	}
    	if ( existinglockstatus == "LockedByMe" ) {
    		if (serverlockstatus == "UnLocked") {
    			// alert("Central Site UnLocked. Do you want to Lock2U?.");
    			$.confirm({
    				icon: 'fa fa-unlock text-secondary',
    			    title: 'Current Status',
    			    content: '<b>Someone has removed the Lock!</b> Do you want to lock this site anyway for updates?'+lastupdatemessage,
    			    buttons: {
    			        somethingElse: {
    			            text: 'Lock Site',
    			            btnClass: 'btn-blue',
    			            action: function(){
    			            	LockRequest("LockRequest");
    			            }
    			        },    			        
    			        cancel: function () { },
    			    }
    			});				
    		}
    		if (serverlockstatus == "LockedByMe") {
    			// alert("Central Site Locked2U. Do you want to UnLock?. Warning ");
    			$.confirm({
    				icon: 'fa fa-lock text-primary',
    			    title: 'Current Status',
    			    content: 'Are you sure you want to unlock this site and allow others to make updates? (Any updates in progress will be lost)'+lastupdatemessage,
    			    buttons: {
    			        somethingElse: {
    			            text: 'Unlock Site',
    			            btnClass: 'btn-blue',
    			            action: function(){
    			            	LockRequest("UnLockRequest");
    			            }
    			        },   			        
    			        cancel: function () {  },
    			    }
    			});				
    		}
    		if (serverlockstatus == "LockedByOther") {
    			// alert("Central Site Locked2Other. Do you want to Lock2U or Unlock?.");
    			$.confirm({
    				icon: 'fa fa-lock text-danger',
    			    title: 'Current Status',
    			    content: 'This site has been locked by '+databits[6]+' since '+lockedsince+'. Do you want to remove this lock?'+lastupdatemessage,
    			    buttons: {
    			        somethingElse: {
    			            text: 'Remove Lock !',
    			            btnClass: 'btn-orange',
    			            action: function(){
    			            	LockRequest("UnLockRequest");
    			            }
    			        },
    			        cancel: function () {  },
    			    }
    			});		
    		}
    	}
    	if ( existinglockstatus == "LockedByOther" ) {
    		if (serverlockstatus == "UnLocked") {
    			// alert("Central Site UnLocked. Do you want to Lock2U?.");
    			$.confirm({
    				icon: 'fa fa-unlock text-success',
    			    title: 'Current Status',
    			    content: 'This site has now freed up by '+databits[6]+'. Do you want to lock this site?'+lastupdatemessage,
    			    buttons: {
    			        somethingElse: {
    			            text: 'Lock Site',
    			            btnClass: 'btn-blue',
    			            action: function(){
    			            	LockRequest("LockRequest");
    			            }
    			        },       			        
    			        cancel: function () {  },
    			    }
    			});				
    		}
    		if (serverlockstatus == "LockedByMe") {
    			// alert("Central Site Locked2U. Do you want to UnLock?.");
    			$.confirm({
    				icon: 'fa fa-lock text-warning',
    			    title: 'Current Status',
    			    content: '<b>This site was in fact already locked by you!</b>Are you sure you want to unlock this site and allow others to make updates?'+lastupdatemessage,
    			    buttons: {
    			        somethingElse: {
    			            text: 'Unlock Site',
    			            btnClass: 'btn-orange',
    			            action: function(){
    			            	LockRequest("UnLockRequest");
    			            }
    			        },     			        
    			        cancel: function () {  },
    			    }
    			});
    		}
    		if (serverlockstatus == "LockedByOther") {
    			// alert("Central Site Locked2Other. Do you want to Lock2U or Unlock?. Warning ");
    			$.confirm({
    				icon: 'fa fa-lock text-danger',
    			    title: 'Current Status',
    			    content: 'This site has been locked by '+databits[6]+' since '+lockedsince+'. Do you want to remove this lock?'+lastupdatemessage,
    			    buttons: {
    			        somethingElse: {
    			            text: 'Remove Lock !',
    			            btnClass: 'btn-orange',
    			            action: function(){
    			            	LockRequest("UnLockRequest");
    			            }
    			        },
    			        cancel: function () {  },
    			    }
    			});
    		}
    	}
		
	}	
	
	function ReloadSite() {
		// startWait("Loading");		
		var corsite_id = $('#corsite_id').val();
		var corsite_version = $('#corsite_version').val();
		var corsite_corprogramme = $('#corsite_corprogramme').val();
		var corprogramme_customtablist = $('#corprogramme_customtablist').val();		
		dataparms = "&corsite_id="+corsite_id+"&corsite_version="+corsite_version+"&corsite_corprogramme="+corsite_corprogramme;
		var rUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_corsiteupdateout.php"+STDPARMS()+dataparms;
		window.location = rUrl;
	} 			
		
	function NameToSwatch($name) {		
		chash = {
			Gold: 'GoldenRod',
			Silver: 'Silver',
			Bronze: 'DarkGoldenRod',
			Green: 'Green',				
			Amber: 'Orange',
			Red: 'Red',				
			Navy: 'Navy',				
			Magenta: 'Magenta',
			Indigo: 'Indigo',
			Backup: 'Black'
		};
		return chash[$name];		
	}

	// tab management.
	
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e){
        var currentTab = $(e.target).attr('href'); // get current tab
        var currentTab = currentTab.replace("#", "");
        $('#CurrentTab').val(currentTab);
        // alert(currentTab);
    });	
    
    
    // ======================== get the data for selection dropdowns ================================
	setupWait(); 
	
	function handleDataRequestSuccess(data, status) {
	    // alert(data);
		if(data != undefined){
			// $('#TRACETEXT').html(data); 
			Create_Hashes(data);
			// if (JSPersonId() == "bbra") { alert(GLOBALS["DATALOADED"]); }	  
			datepickerlistener();	
			recalclistener();
			commdeletelistener();		
			resideletelistener();
			coroutletcommsdeletelistener();	
			surveydeletelistener();
			surveyquotedatemarkerlistener();
			surveyquotevallistener();
			corsitecommsdeletelistener();	
			recalc();	
			stopWait();
		}
		stopWait();	 
	}
	 
	function handleDataRequestFailure(xhr, reason, ex) {
		 messageAlert("Error Reason = "+"|"+xhr+"|"+reason+"|"+ex+"|");
		 // messageAlert("You are not connected to the internet at this time");
	} 
	
	var datarequestlist = "corsurveycategory,coroutletclass,coroutletco,corsupplier,coraccount,cordefaultvalue";
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

});


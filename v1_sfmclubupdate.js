$(document).ready( function() { 
	
	// == bootstrap colour palette =============
	
	primaryback = "#327AF6";
	primarytext = "white";
	secondaryback = "#6E757C";
	secondarytext = "white";
	successback = "#51A451";
	successtext = "white";
	dangerback = "#CB444A";
	dangertext = "white";
	warningback = "#F6C343";
	warningtext = "black";
	infoback = "#49A0B5";
	infotext = "white";
	lightback = "#49A0B5";
	lighttext = "black";
	darkback = "#black";
	darktext = "white";
	linkback = "white";
	linktext = "#317BF5";
	
	sfmset_id = $('#sfmset_id').val();
	sfmclub_id = $('#sfmclub_id').val();
	sfmfacility_id = $('#sfmfacility_id').val();
	
	var sfmclubpersonnewindex = 0;
	var sfmclubpersonida = new Array();
	
	// alert(sfmset_id+" "+sfmclub_id+" "+sfmfacility_id);
	
    $('#sfmclubupdateform').areYouSure( {'silent':true} );
    $(window).on('beforeunload', function() {
        if ($('#sfmclubupdateform').hasClass('dirty') && (areyousurestate == "dirty")) {
            return 'Are you sure you want to close without saving? (Updates may be lost)'; // doesnt override browser default message !!		
        }
    });
	
	// ======== prevents navigation away from fpage without updates =====================
	$('#sfmclubupdateform').areYouSure( 
		{'message':'Are you sure you want to close without saving? (Updates may be lost)'} // doesnt override browser default message !!
	);
		
	// ======== Listeners for Save/Close Buttons =====================
	if ( $('#SaveTop').length ) {
		$('#SaveTop').on('click', function(event) { SaveAction(); });
	}
	if ( $('#SaveBottom').length ) {
		$('#SaveBottom').on('click', function(event) { SaveAction(); });
	}
	function SaveAction() {	
		areyousurestate = "clean"; // prevent areyousure from triggering
		$('[name=SubmitAction]').val('Save');		
		$("#sfmclubupdateform").submit();
	}
	// ======== Listeners for Close Buttons =====================	
	$('#CloseTop').on('click', function(event) { CloseAction(); });
	$('#CloseBottom').on('click', function(event) { CloseAction(); });
        function CloseAction() {	
		areyousurestate = "clean"; // prevent areyousure from triggering
		$('[name=SubmitAction]').val('Close');
		changesmade = "0";
		if ( changesmade == "1") {
			$.confirm({
				icon: 'fa fa-question-circle text-warning',
			    title: 'Close',
			    content: 'Are you sure you want to close without saving? (Updates may be lost)',
			    buttons: {
			        somethingElse: {
			            text: 'Close',
			            btnClass: 'btn-orange',
			            action: function(){
                                        if ( JSOrgTypeId() == "Club" ) { 
                                            var returnUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_sfmdashboardout.php"+STDPARMS();
                                            window.location.replace(returnUrl);
                                        } else {
                                            window.close ();       
                                        }            
			            }
			        },
			        cancel: function () { 
			        	
			        },
			    }
			});
		} else {		
                    if ( JSOrgTypeId() == "Club" ) { 
                        var returnUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_sfmdashboardout.php"+STDPARMS();
                        window.location.replace(returnUrl);
                    } else {
                        window.close ();     
                    }    
		}
	}
	
	$('#website').on('click', function(event) {
		var sfmclub_website = outLink($('#websitelink').val(),"http:");
		if ( sfmclub_website != "" ) {
			window.open(sfmclub_website,'WebsiteWindow', 'top=100, left=100, width=800, height=600');			
		} else {
			alert("No Website Link available for this club");		
		}	
	})
	
	$('#googlemaps').on('click', function(event) {
		var sfmclub_googlemapslink = outLink($('#googlemapslink').val(),"http:");
		if ( sfmclub_googlemapslink != "" ) {
			window.open(sfmclub_googlemapslink,'GoogleMapsWindow', 'top=100, left=100, width=800, height=600');			
		} else {
			alert("No Google Maps Link available for this club");		
		}	
	})
	
	$('#pitchfinder').on('click', function(event) {
		var sfmclub_pitchfinderlink = outLink($('#pitchfinderlink').val(),"http:");
		if ( sfmclub_pitchfinderlink != "" ) {
			window.open(sfmclub_pitchfinderlink,'GoogleMapsWindow', 'top=100, left=100, width=800, height=600');			
		} else {
			alert("No Pitchfinder Link available for this club");		
		}	
	})	
	
	$('#mpdfreports').on('click', function(event) {
		var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_mpdfrelevantreportlist.php"+STDPARMS();
		// var corsite_id = $('#corsite_id').val();
		sUrl = sUrl + "&keynamelist=sfmclub_id"+ "&keyvaluelist=" + sfmclub_id;
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
	
	$('#GroundGrading').on('click', function(event) {
		$('[name=SubmitAction]').val('GroundGrading');	
		$("#sfmclubupdateform").submit();								
	});	
	
	// $('#sfmfacility_gradingtarget').on('click', function(event) {
        $('#sfmfacility_gradingtarget').change(function(){
            $.alert({
                icon: 'fa fa-question-circle text-warning',
                title: "Information",
                content: "If you change the target Ground Grading Level then this will initiate the creation of a new Self Assessment checklist for the new level.You can carry forward previous responses from the existing level if required."
            });								
	});
        
	$('#FloodlightSpecification').on('click', function(event) {
		$('[name=SubmitAction]').val('FloodlightSpecification');	
		$("#sfmclubupdateform").submit();								
	});		
	
	function outLink(inlink,prelink) {
		if ( inlink[0]+inlink[1] == "//" ) {
			inlink = inlink.replace("//", prelink+"//");	``
		}
		return inlink;
	}
	
	$('.rag').each(function() {
		backcolor = "white"; textcolor = "black";
		if ($(this).val() == "Y") { backcolor = successback; textcolor = successtext; }
		if ($(this).val() == "Yes") { backcolor = successback; textcolor = successtext; }			
		if ($(this).val() == "Green") { backcolor = successback; textcolor = successtext; }
		if ($(this).val() == "Pass") { backcolor = successback; textcolor = successtext; }	
		if ($(this).val() == "Amber") { backcolor = warningback; textcolor = warningtext; }
		if ($(this).val() == "Review") { backcolor = warningback; textcolor = warningtext; }			
		if ($(this).val() == "N") { backcolor = dangerback; textcolor = dangertext; }
		if ($(this).val() == "No") { backcolor = dangerback; textcolor = dangertext; }			
		if ($(this).val() == "Red") { backcolor = dangerback; textcolor = dangertext; }
		if ($(this).val() == "Fail") { backcolor = dangerback; textcolor = dangertext; }
		if ($(this).val() == "NA") { backcolor = lightback; textcolor = "white"; }	
		$(this).css('background-color', backcolor);
		$(this).css('color', textcolor);
	});	
	
	$('.rag').change( function() {			
		backcolor = "white"; textcolor = "black";
		if ($(this).val() == "Y") { backcolor = successback; textcolor = successtext; }
		if ($(this).val() == "Yes") { backcolor = successback; textcolor = successtext; }			
		if ($(this).val() == "Green") { backcolor = successback; textcolor = successtext; }
		if ($(this).val() == "Pass") { backcolor = successback; textcolor = successtext; }	
		if ($(this).val() == "Amber") { backcolor = warningback; textcolor = warningtext; }
		if ($(this).val() == "Review") { backcolor = warningback; textcolor = warningtext; }			
		if ($(this).val() == "N") { backcolor = dangerback; textcolor = dangertext; }
		if ($(this).val() == "No") { backcolor = dangerback; textcolor = dangertext; }			
		if ($(this).val() == "Red") { backcolor = dangerback; textcolor = dangertext; }
		if ($(this).val() == "Fail") { backcolor = dangerback; textcolor = dangertext; }
		if ($(this).val() == "NA") { backcolor = lightback; textcolor = "white"; }	
		$(this).css('background-color', backcolor);
		$(this).css('color', textcolor);
	});	
	
	// tab management
	
	
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e){
        var currentTab = $(e.target).attr('href'); // get current tab
        var currentTab = currentTab.replace("#", "");
        $('#CurrentTab').val(currentTab);
        // alert(currentTab);
    });	
    
	$('#sfmclubperson_add_new').on('click', function(event) {
		sfmclubpersonnewindex++;
		var insertaction = "";			
		insertaction = insertaction + '<div class="row row-eq-height">';
		insertaction = insertaction + '<input type=hidden id="sfmclubperson_startfield_NEW'+sfmclubpersonnewindex+'" name="sfmclubperson_startfield_NEW'+sfmclubpersonnewindex+'" value="">';
		insertaction = insertaction + '<div class="vcenter col-md-1"></div>';
		insertaction = insertaction + '<div id="sfmclubperson_personid_NEW'+sfmclubpersonnewindex+'" class="vcenter  col-md-1">new</div>';
		insertaction = insertaction + '<div class="col-md-2"><input id="sfmclubperson_fname_NEW'+sfmclubpersonnewindex+'" name="sfmclubperson_fname_NEW'+sfmclubpersonnewindex+'" class="form-control" type="text" value=""></div>';
		insertaction = insertaction + '<div class="col-md-2"><input id="sfmclubperson_sname_NEW'+sfmclubpersonnewindex+'" name="sfmclubperson_sname_NEW'+sfmclubpersonnewindex+'" class="form-control" type="text" value=""></div>';
		insertaction = insertaction + '<div class="col-md-3"><input id="sfmclubperson_email1_NEW'+sfmclubpersonnewindex+'" name="sfmclubperson_email1_NEW'+sfmclubpersonnewindex+'" class="form-control" type="text" value=""></div>';		
		insertaction = insertaction + '<div class="col-md-2">';
		insertaction = insertaction + '<select id="sfmclubperson_authority__NEW'+sfmclubpersonnewindex+'" name="sfmclubperson_authority__NEW'+sfmclubpersonnewindex+'" class="form-control">';
		insertaction = insertaction + '<option value="" >?</option>';
		insertaction = insertaction + '<option value="Administrator">Administrator</option>';
		insertaction = insertaction + '<option value="ReadOnly" >ReadOnly</option>';
		insertaction = insertaction + '</select>';
		insertaction = insertaction + '</div>';
		insertaction = insertaction + '<div class="col-md-1">';
		insertaction = insertaction + '<button id="sfmclubperson_delete_" class="sfmclubpersondelete btn btn-danger" type="button" >x</button>';
		insertaction = insertaction + '</div>';
		insertaction = insertaction + '<input type=hidden id="sfmclubperson_endfield_NEW'+sfmclubpersonnewindex+'" name="sfmclubperson_endfield_NEW'+sfmclubpersonnewindex+'" value="">';
		insertaction = insertaction + '</div>';		
		sfmclubpersonida["new"+sfmclubpersonnewindex] = "new"+sfmclubpersonnewindex;
		$( "#sfmclubpersonlistend" ).before( insertaction );
		sfmclubpersondeletelistener();
	});		
 
	sfmclubpersondeletelistener();	
	
	function sfmclubpersondeletelistener() {
		$('.sfmclubpersondelete').on('click', function(event) {			
			var result = confirm("Do you want to delete this entry?");
			if (result) {
			    var id = $(this).attr("id");
				$(this).parent().parent().remove();	
			}			
		})	
	}	
	
});



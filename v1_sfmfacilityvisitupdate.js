$(document).ready( function() { 
	
    thisselectid = "";
    selectidvalues = new Array();

    sfmclub_id = $('#sfmclub_id').val();
    sfmfacilityvisit_sfmfacilityid = $('#sfmfacilityvisit_sfmfacilityid').val();
    sfmfacilityvisit_id = $('#sfmfacilityvisit_id').val();	

    $('#NewVisit').on('click', function(event) { 
            $("#NewVisit").submit();
    });   
	
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
		$("#sfmfacilityvisitupdateform").submit();
	}
	// ======== Listeners for Close Buttons =====================	
	$('#CloseTop').on('click', function(event) { CloseAction(); });
	$('#CloseBottom').on('click', function(event) { CloseAction(); });        
	function CloseAction() {	
		areyousurestate = "clean"; // prevent areyousure from triggering
		$('[name=SubmitAction]').val('Close');
		var changesmade = "0";
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
                                    var liststatus = "Open";	
                                    var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_sfmclubupdateout.php"+STDPARMS();
                                    sUrl = sUrl + "&sfmclub_id="+sfmclub_id;
                                    sUrl = sUrl + "&sfmfacility_id="+sfmfacilityvisit_sfmfacilityid;
                                    sUrl = sUrl + "&CurrentTab="+"FLOODSTATUS";
                                }
                            },
                            cancel: function () { 

                            },
                        }
                    });
		} else {		
                    var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_sfmclubupdateout.php"+STDPARMS();
                    sUrl = sUrl + "&sfmclub_id="+sfmclub_id;
                    sUrl = sUrl + "&sfmfacility_id="+sfmfacilityvisit_sfmfacilityid;
                    sUrl = sUrl + "&CurrentTab="+"FLOODSTATUS";    		
                    window.location.replace(sUrl);						
		}
	}
	
	$('#mpdfreports').on('click', function(event) {
		// alert(sfmfacilityvisit_sfmfacilityid + "," + sfmfacilityvisit_id);
		var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_mpdfrelevantreportlist.php"+STDPARMS();
		sUrl = sUrl + "&keynamelist=sfmfacilityvisit_sfmfacilityid,sfmfacilityvisit_id"+ "&keyvaluelist=" + sfmfacilityvisit_sfmfacilityid + "," + sfmfacilityvisit_id;
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
	
	$('.static').each(function() {
		$(this).css('background-color', '#EBF5FB');	
	});
	
	$('.static').on('click', function(event) {
		$(this).css('background-color', 'red');
		thisid = $(this).attr('id');
		setTimeout(
				  function() 
				  {
					  $('#'+thisid).css('background-color', '#EBF5FB');
				  }, 100);
	});
	
	$('.static').each(function() {
		$(this).css('background-color', '#FDEDEC');	
		thisselectid = $(this).attr("id");
		selectidvalues[thisselectid] = $(this).val();
	});
	
	$('.static').on('click', function(event) {   // text input elements	
		if ($("#SpecificationChanged").val() == "Yes") {} else {
			$.confirm({
				icon: 'fa fa-question-circle text-warning',
			    title: 'Update',
			    content: 'This will change the specification. Do you want to continue ?',
			    buttons: {
			        somethingElse: {
			            text: 'Continue',
			            btnClass: 'btn-green',
			            action: function(){
			            	$("#SpecificationChanged").val("Yes");	
			            	$('.static').each(function() {
			            		$(this).css('background-color', '#EAFAF1');	
			            		thisselectid = $(this).attr("id");
			            		selectidvalues[thisselectid] = $(this).val();
			            	});
			            }
			        },
			        cancel: function () { },
			    }
			});
		}
	});
	
	$('.static' ).change(function() {   // select elements	
		thisselectid = $(this).attr("id");
		if ($("#SpecificationChanged").val() == "Yes") {} else {
			$.confirm({
				icon: 'fa fa-question-circle text-warning',
			    title: 'Update',
			    content: 'This will change the specification. Do you want to continue ?',
			    buttons: {
			        somethingElse: {
			            text: 'Continue',
			            btnClass: 'btn-green',
			            action: function(){
			            	$("#SpecificationChanged").val("Yes");
			            	$("#"+thisselectid).prop("disabled", false); 
			            	$('.static').each(function() {
			            		$(this).css('background-color', '#EAFAF1');	
			            	});
			            }
			        },
			        cancel: function () {  
			        	$("#"+thisselectid).val(selectidvalues[thisselectid]).prop('selected', true);
			        },
			    }
			});
		}
	});
	
	// tab management.
	
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e){
        var currentTab = $(e.target).attr('href'); // get current tab
        var currentTab = currentTab.replace("#", "");
        $('#CurrentTab').val(currentTab);
    });	
    
    RefreshRectifications();
    
    $("#GroundGradingChanged").val("Yes");
    $("#GroundGradingScheme").val("FAGroundGradingG");    

});

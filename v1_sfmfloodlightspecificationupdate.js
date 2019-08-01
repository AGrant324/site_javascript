$(document).ready( function() { 

    sfmclub_id = $('#sfmclub_id').val();	
    sfmfacility_id = $('#sfmfacility_id').val();	

    $(".form-control").css('padding', '4px');

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
	$('#sfmfloodlightspecificationupdateform').areYouSure( 
		{'message':'Are you sure you want to close without saving? (Updates may be lost)'} // doesnt override browser default message !!
	);
		
	// ======== Listeners for Save/Close Buttons =====================
	if ( $('#Save').length ) {
		$('#Save').on('click', function(event) { SaveAction(); });
	}	
	function SaveAction() {	
		areyousurestate = "clean"; // prevent areyousure from triggering
		$('[name=SubmitAction]').val('Save');		
		$("#sfmfloodlightspecificationupdateform").submit();
	}
	// ======== Listeners for Close Buttons =====================	
	$('#Close').on('click', function(event) { CloseAction(); });
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
                                        sUrl = sUrl + "&sfmfacility_id="+sfmfaciity_id;
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
                    sUrl = sUrl + "&sfmfacility_id="+sfmfaciity_id;
                    sUrl = sUrl + "&CurrentTab="+"FLOODSTATUS";    		
                    window.location.replace(sUrl);					
		}
	}
	
	$('#ReplicateSpec').on('click', function(event) {
		$.confirm({
			icon: 'fa fa-pencil text-warning',
		    title: 'Replicate',
		    content: 'Are you sure you want to replicate this specification?',
		    buttons: {
		        somethingElse: {
		            text: 'Confirm',
		            btnClass: 'btn-orange',
		            action: function(){
		        		$('[name=SubmitAction]').val('ReplicateSpec');	
		        		$("#sfmfloodlightspecificationupdateform").submit();				
		            }
		        },
		        cancel: function () {  },
		    }
		});					
	});	
	
	$('#DeReplicateSpec').on('click', function(event) {
		$.confirm({
			icon: 'fa fa-pencil text-warning',
		    title: 'De-Replicate',
		    content: 'Are you sure you want to de-replicate this specification?',
		    buttons: {
		        somethingElse: {
		            text: 'Confirm',
		            btnClass: 'btn-orange',
		            action: function(){
		        		$('[name=SubmitAction]').val('DeReplicateSpec');	
		        		$("#sfmfloodlightspecificationupdateform").submit();			
		            }
		        },
		        cancel: function () {  },
		    }
		});									
	});	
	
	$('.lampconfig').on('change', function(event) {		
		var lampconfiga = new Array();	
		$('.lampconfig').each(function() {			
		    var thisid = $(this).attr("id");
		    var thisval = $(this).val();		    
		    var colid = thisid.replace("ColC", "");
		    lampconfiga[colid] = thisval;
		});
		var lampconfigstr = "";
		var sep = "";
		for (var ci=1; ci<9; ci++) {
			if( lampconfiga[ci.toString()] != undefined ) {
				lampconfigstr = lampconfigstr + sep + ci + "[" + lampconfiga[ci.toString()] + "]";
				sep = ",";
			}
		}
		$('#sfmfloodlightcolumn_lampconfig_0').val(lampconfigstr);
	});	
	
	$('.xconfig').on('change', function(event) {
		var xconfiga = new Array();	
		var yconfiga = new Array();			
		$('.xconfig').each(function() {			
		    var thisid = $(this).attr("id");
		    var thisval = $(this).val();		    
		    var colid = thisid.replace("ColX", "");
		    xconfiga[colid] = thisval;
		});
		$('.yconfig').each(function() {			
		    var thisid = $(this).attr("id");
		    var thisval = $(this).val();		    
		    var colid = thisid.replace("ColY", "");
		    yconfiga[colid] = thisval;
		});		
		var xyconfigstr = "";
		var sep = "";
		for (var ci=1; ci<9; ci++) {
			if( xconfiga[ci.toString()] != undefined ) {
				xyconfigstr = xyconfigstr + sep + ci + "[" + xconfiga[ci.toString()] + "-" + yconfiga[ci.toString()] + "]";
				sep = ",";
			}
		}
		$('#sfmfloodlightcolumn_xyconfig_0').val(xyconfigstr);
	});	
	
	$('.yconfig').on('change', function(event) {
		var xconfiga = new Array();	
		var yconfiga = new Array();			
		$('.xconfig').each(function() {			
		    var thisid = $(this).attr("id");
		    var thisval = $(this).val();		    
		    var colid = thisid.replace("ColX", "");
		    xconfiga[colid] = thisval;
		});
		$('.yconfig').each(function() {			
		    var thisid = $(this).attr("id");
		    var thisval = $(this).val();		    
		    var colid = thisid.replace("ColY", "");
		    yconfiga[colid] = thisval;
		});		
		var xyconfigstr = "";
		var sep = "";
		for (var ci=1; ci<9; ci++) {
			if( xconfiga[ci.toString()] != undefined ) {
				xyconfigstr = xyconfigstr + sep + ci + "[" + xconfiga[ci.toString()] + "-" + yconfiga[ci.toString()] + "]";
				sep = ",";
			}
		}
		$('#sfmfloodlightcolumn_xyconfig_0').val(xyconfigstr);
	});		
	
	
	
});

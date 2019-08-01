$(document).ready( function() {
	
	var thishref = window.location.href;
	var thisclientupdatetimestampid  = "";
	var thisclientupdatetimestampval  = "";
	var thisdmwssu_id  = "";
	var thisdmwssu_clientupdatetimestamp  = "";	
	
	if ( $( "#synchronise" ).length ) {  // only for client 
		setupWait(); 
			
		var prodonlineurl = "https://www.dmwsportal.org.uk/site_php/v1_javascriptonline.php";
		var testonlineurl = "http://localhost/site_php/v1_javascriptonline.php";
		
		$("#statusonoffline").attr('src',"../site_assets/spinner.gif");
		$("#synchronise").hide();
		
		$.ajax({
		     url: prodonlineurl,
		     data: { 
		    	 ServiceId: "dmws",	        	
		    	 DomainId: "dmwsportal",
		    	 ModeId: "1",	        	
		    	 PersonId: "",	
		    	 SessionId: "",		        	
		    	 LoginModeId: "",
		    	 MenuId: "Classic"
		     },
		     dataType: 'jsonp',
		     timeout : 10000,
		     success:function(json){
		    	 $("#statusonoffline").attr('src',"../site_assets/StatusOnline.png");
		    	 $("#synchronise").show();
		     },
		     error:function(){
		    	 $("#statusonoffline").attr('src',"../site_assets/StatusOffline.png");
		    	 $("#synchronise").hide();
		    	 $.alert({
		    			icon: 'fa fa-lock text-danger',
		    			title: "Warning",
		    		    content: "You don't currently have an internet connection to the server."
		    		});		    	 
		     }      
		});
		
		$('#statusonoffline').on('click', function(event) {	
			startWait("Checking");
			$.ajax({
			     url: prodonlineurl,
			     data: { 
			    	 ServiceId: "dmws",	        	
			    	 DomainId: "dmwsportal",
			    	 ModeId: "1",	        	
			    	 PersonId: "",	
			    	 SessionId: "",		        	
			    	 LoginModeId: "",
			    	 MenuId: "Classic"
			     },			     
			     dataType: 'jsonp',
			     timeout : 10000,
			     success:function(json){
			    	 stopWait();
			    	 $("#statusonoffline").attr('src',"../site_assets/StatusOnline.png");
			    	 $("#synchronise").show();
			    	 $.alert({
		    			icon: 'fa fa-lock text-success',
		    			title: "Success",
		    		    content: "You currently have an internet connection to the server."
		    		});	
			     },
			     error:function(){
			    	 stopWait();
			    	 $("#statusonoffline").attr('src',"../site_assets/StatusOffline.png");	
			    	 $("#synchronise").hide();
			    	 $.alert({
		    			icon: 'fa fa-lock text-danger',
		    			title: "Warning",
		    		    content: "You don't currently have an internet connection to the server."
		    		});	
			     }      
			});
		}); 			
		
			
		$('#synchronise').on('click', function(event) {		
			var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_dmwsclientsynchroniseout.php"+STDPARMS();
			window.location.replace(sUrl);						
		}); 
	
	}
	
	$('.clientupdatetimestamp').on('click', function(event) {
		thisclientupdatetimestampid = $(this).attr("id");
		
		var ida = thisclientupdatetimestampid.split("_");
		thisdmwssu_id = ida[2];
		thisclientupdatetimestampval = $(this).html();
		if (thisclientupdatetimestampval.includes(' (No Synch)')) {
			$.confirm({
				icon: 'fa fa-refresh text-success',
			    title: 'Re-enable Synchronisation',
			    content: 'Are you sure that you now want to allow this offline version to be synchronised back to the DMWS Portal?',
			    buttons: {
			        somethingElse: {
			            text: 'Confirm',
			            btnClass: 'btn-blue',
			            action: function(){
			            	thisclientupdatetimestampval = thisclientupdatetimestampval.replace(" (No Synch)", "");
			            	CUpdate(thisdmwssu_id,thisclientupdatetimestampval);				
			            }
			        },
			        cancel: function () {  },
			    }
			});	
		} else {
			$.confirm({
				icon: 'fa fa-refresh text-danger',
			    title: 'Suppress Synchronisation',
			    content: 'Are you sure you want to prevent this offline version from being synchronised back to the DMWS Portal? (After synchronisation, the offline version would be replaced by the DMWS Portal version)',
			    buttons: {
			        somethingElse: {
			            text: 'Confirm',
			            btnClass: 'btn-blue',
			            action: function(){
			            	thisclientupdatetimestampval = thisclientupdatetimestampval+" (No Synch)";
			            	CUpdate(thisdmwssu_id,thisclientupdatetimestampval);				
			            }
			        },
			        cancel: function () {  },
			    }
			});	
			
		}
		

	});	
	    	 
	function handleCUpdateSuccess(data, status) {
	     // alert(data);
	     var da = data.split("|");
	     if ( da[0] == "0" ) {
	    	 $('#'+thisclientupdatetimestampid).html(da[1]);
	     } else {
	    	 alert("Synchronisation Exclusion Error");
	     }	
	     stopWait();
	}
	 
	function handleCUpdateFailure(xhr, reason, ex) {
		 alert("Error Reason = "+"|"+xhr+"|"+reason+"|"+ex+"|");
		 // messagealert("You are not connected to the internet at this time");
		 stopWait();
	} 
	
	function CUpdate(cdmwssu_id,cdmwssu_clientupdatetimestamp) {
		startWait("Updating");
		var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_dmwssusynchroniseexclude.php";
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
		    	 dmwssu_id: cdmwssu_id,
		    	 dmwssu_clientupdatetimestamp: cdmwssu_clientupdatetimestamp
		     },
		     type: "POST",
		     dataType: "text",
		     timeout: 10000,
		     success: handleCUpdateSuccess,	        
		     error: handleCUpdateFailure
		});	
	}
	
	
	
	
});


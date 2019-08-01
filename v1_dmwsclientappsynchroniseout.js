$(document).ready( function() {
	
	var thishref = window.location.href;
	
	if ( $( "#synchronise" ).length ) {  // only for client 
		setupWait(); 
			
		var prodonlineurl = "https://www.dmwsportal.org.uk/site_php/v1_javascriptonline.php";
		var testonlineurl = "http://localhost/site_php/v1_javascriptonline.php";
		
		$("#statusonoffline").attr('src',"../site_assets/spinner.gif");

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
		     },
		     error:function(){
		    	 $("#statusonoffline").attr('src',"../site_assets/StatusOffline.png");
		    	 $.alert({
		    			icon: 'fa fa-lock text-danger',
		    			title: "Warning",
		    		    content: "You don't currently have an internet connection to the server."
		    		});		    	 
		     }      
		});
	}	

	
});


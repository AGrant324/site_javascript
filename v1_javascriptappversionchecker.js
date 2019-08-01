$(document).ready( function() {
	
	
	var prodonlineurl = "https://www.dmwsportal.org.uk/site_php/v1_javascriptonline.php";
	var testonlineurl = "http://localhost/site_php/v1_javascriptonline.php";	
		
	var thishref = window.location.href;
	if ( $( "#APPSYNCH" ).length ) {  // only if icon exists 
		setupWait(); 
		var sUrl = prodonlineurl; 		
		$.ajax({
		     url: prodonlineurl,
		     dataType: 'jsonp',
		     data: { 
		    	 ServiceId: "dmws",	        	
		    	 DomainId: "dmwsportal",
		    	 ModeId: JSModeId(),	        	
		    	 PersonId: "",	
		    	 SessionId: "",		        	
		    	 LoginModeId: JSLoginModeId(),
		    	 MenuId: JSMenuId()
		     }, 
		     timeout : 10000,
		     success:function(appversion){
		    	 // alert($("#site_synchroniseappversion").val()+" vs "+appversion);
		    	 if ($("#site_synchroniseappversion").val() != appversion) {
			    	 $.alert({
		    			icon: 'fa fa-lock text-info',
		    			title: "Information",
		    		    content: "New Application Updates are available. Please install when you get a convenient opportunity.<br><br>Your current Version is "+$("#site_synchroniseappversion").val()+"<br><br>Version "+appversion+" is now available."
		    		 });
		     	 }
		     },
		     error:function(){
		    	 $.alert({
	    			icon: 'fa fa-lock text-danger',
	    			title: "Warning",
	    		    content: "No Server Connection."
	    		 });
		     }      
		});
	}	 
});

// This replaces the previous menu dynamic load script

$(document).ready( function() {
	
	
	
	
	
	if (JSSessionId()!="") { // someone logged in
	   	 var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_personlogoutin.php"+STDPARMS();
	   	 // alert(JSSessionId()+" - "+JSSitePHPURL()+" - "+sUrl);
	   	 $("#nav_Login").attr("href", sUrl);
	   	 $("#nav_Login").html("Logout");	 
	   	 resetTimeoutHandle(JSPersonId());	 
	} else { // noone logged in
		 $("#nav_Login").html("Login");
	}
	
	
	
	
	
	
});


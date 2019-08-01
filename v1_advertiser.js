$(document).ready( function() { 
	

	if ( $( "#composerpreviewbutton" ).length ) {}
	else {	
		$('.AdBanner').each(function() {
			// <p id="fwparms_3" class="AdBanner" style="word-break: break-all;"><img src="../site_assets/Plugin_AdBanner.png" width="100%">[AdBanner:Category=AdvertiserClass1;]</p>
			var parmstring = $(this).html();
			var pbits = parmstring.split("[");
			var qbits = pbits[1].split("=");
			var rbits = qbits[1].split(";");
			var advertisercategory = rbits[0];
			// alert(advertisercategory);
			$(this).hide();
			advertiserSelect ($(this),advertisercategory);
		});				
	}

	function advertiserSelect (thisdomobject,advertisercategory) {
		 // alert("advertiserSelect called - "+advertisercategory);
		 
		 var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_advertiserselect.php"; 
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
		    	 AdvertiserCategory: advertisercategory,
		    	 ForceRefresh: new Date().getTime() 	 		    	 
		     },
		     type: "GET",
		     dataType: 'jsonp',
		     timeout: 5000,
		     success:function(data){
				 // alert(data[0]);
				 // $error|$message|$advertisername|$advertiserimagesrc|$advertiserlink|$advertisertext
				 if(data[0] != undefined){
				  var responsea = new Array(5);
				  responsea = data[0].split("|");
				  advertisername = responsea[2];		  
				  advertiserimagesrc = responsea[3];
				  advertiserlink = responsea[4];
				  advertisertext = responsea[5];
				  if (responsea[0] == "0") {
					// <a href="http://localhost/site_php/v1_advertiserclickin.php?ServiceId=ocz&DomainId=havanthockeyclub&PersonId=&ModeId=2&LoginModeId=Domain&SessionId=&AdvertiserClass=1&AdvertiserName=mercian" target="_blank">
					// <img src="http://localhost/havanthockeyclub/domain_advertisers/mercian_banner.jpg" border=0/></a>
					// <a class="linkcue" href="http://localhost/site_php/v1_advertiserclickin.php?ServiceId=ocz&DomainId=havanthockeyclub&PersonId=&ModeId=2&LoginModeId=Domain&SessionId=&AdvertiserClass=1&AdvertiserName=mercian">
					// <img class="linkcue" src="http://localhost/site_assets/linkcue.gif"/></a>			  
					imagestring	='<a href="../site_php/v1_advertiserclickin.php'+MINPARMS()+'&AdvertiserClass='+advertisercategory+'&AdvertiserName='+advertisername+'" target="_blank">'
						+'<img id="'+advertisercategory+'Image" src="'+advertiserimagesrc+'" width=100% border=0/></a>';	  
					cuestring ='<a class="linkcue" href="../site_php/v1_advertiserclickin.php'+MINPARMS()+'&AdvertiserClass='+advertisercategory+'&AdvertiserName='+advertisername+'">'
					    +'<img class="linkcue" src="../site_assets/linkcue.gif"/></a>';				  
					thisdomobject.replaceWith(imagestring);
					imgidstring = "#"+advertisercategory+"Image";
		//			$(imgidstring).hide(); 		
					$(imgidstring).load(function() {
						$(imgidstring).hide(); 					
						$(imgidstring).fadeIn(1000);
					});
		//			$(imgidstring).show(); 				
				   }
				 }	
		     },       
		     error:function(){
		     }      
		 });
		 
	}

});
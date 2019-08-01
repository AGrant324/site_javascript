// JavaScript Document 

$(document).ready(function() {
 // urlstring = String(window.location);
 // http://localhost/site_php/v1_personreloginin.php?ServiceId=cw&DomainId=connectivesolutions&PersonId=bbra&ModeId=2&LoginModeId=Domain&SessionId=RPCZQQ&MenuId=Dashboard 

 cmglobalmyname = document.getElementById("MyName").value;
 cmglobalmyroles = document.getElementById("MyRoles").value; 
 
 var iconid = "";
 

 $("[id^=textlink_]").each(function(){ $("#"+this.id).bind("click",actOnClick); }); 
 $("[id^=imagelink_]").each(function(){ $("#"+this.id).hide(); $("#"+this.id).bind("click",actOnClick); });
 $("#namelink").html("My Name"); 
 
 var uri = JSSitePHPURL()+"/v1_javascriptdashboardprovider.php";
 
 $.ajax({
     url: uri,
     data: { 
    	 ServiceId: JSServiceId(),	        	
    	 DomainId: JSDomainId(),
    	 ModeId: JSModeId(),	        	
    	 PersonId: JSPersonId(),	
    	 SessionId: JSSessionId(),		        	
    	 LoginModeId: JSLoginModeId(),
    	 MenuId: JSMenuId()       	
     },
     type: "GET",
     dataType: "text",
     timeout: 10000,
     success: Success,	        
     error: Error
 });	     
  
 // Define a function to handle the response data.
 function Success(data, status) {
    // alert(data);
	var dbitsa0 = data.split("^");
	var name = dbitsa0[0];
	$("#namelink").html(name);
	var dbitsa = dbitsa0[1].split(","); 
	for (i in dbitsa) {	
		// alert(dbitsa[i]);
		var dbitsa1 = dbitsa[i].split("[");
		var dbitsa2 = dbitsa1[1].split("]");
		var iconname = dbitsa1[0];
		var displaystatus = dbitsa2[0];

		// alert(iconid+" "+displaystatus);
		if ( displaystatus == "Yes" ) { 
			iconid = "#imagelink_"+iconname+"_php";
			if ($(iconid).length) { $(iconid).show(); }
			else {
				iconid = "#imagelink_"+iconname+"_perl";
				if ($(iconid).length) { $(iconid).show(); }
			}
		}
	}	 
 }
 
 function Error(xhr, reason, ex) {
	 messageAlert("You are not connected to the internet at this time");
 } 

 
 
 // $("[id^=rolelink_]").each(function(){ $("#"+this.id).bind("click",actOnClick); }); 

 
 // $(".rssfeed").each(function(){
 //  	 alert(this.html());	 
//	 var rssurl = this.html();
//	 this.html() = "";
//	 $("#"+this.id).FeedEk({
//	     FeedUrl: rssurl,
//	     MaxCount: 5
//	  });
// });  
 
 
 //

 // $('#rssfeed').FeedEk({ 
// 	 FeedUrl: 'http://feeds.bbci.co.uk/news/video_and_audio/business/rss.xml?edition=uk',
//   MaxCount: 5
// });

 
$(".rssfeed").each(function(){
  // alert(this.innerHTML); 
 
  $("#"+this.id).FeedEk({ 
//   FeedUrl: 'http://feeds.bbci.co.uk/news/video_and_audio/business/rss.xml?edition=uk',
   FeedUrl: this.innerHTML,   
   MaxCount: 5
  });
}) 
 
})


function actOnClick(event) {
 // http://localhost/site_php/v1_personloginselectin.php?ServiceId=cw&DomainId=connectivesolutions&PersonId=bbra&ModeId=2&LoginModeId=Domain&SessionId=RPCZQQ&MenuId=Classic&SelectId=UPLOADBANK	
 // alert(event.target.id);
 // textlink_XXXX_php  or textlink_XXXX_cgi
 var idbits = event.target.id.split("_");
 dataparms = "&SelectId="+idbits[1];
 if (idbits[2] == "php") { 
  var sUrl = EscapeSpecials(JSSitePHPURL()+"/"+JSCodeVersion()+"_personloginselectin.php"+STDPARMS()+dataparms);
 } else {
  var sUrl = EscapeSpecials(JSSitePHPURL()+"/"+JSCodeVersion()+"_personloginselectin.cgi"+STDPARMS()+dataparms);	 
 }
 window.location = sUrl;
}
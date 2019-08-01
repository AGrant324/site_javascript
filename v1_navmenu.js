// YAHOO.namespace("BBnavmenu");
var thisplace = "";
$(function() {
 if (document.getElementById("navigationtopinsert")) {		
   thisplace = $("#navigationtopinsert");
   parentplace = $("#navigationtopinsert").parent();   
   var thiscontenturl = thisplace.text();
   // alert("BBnavtopmenu "+thiscontenturl);
   thisplace.hide();
   $.ajax({
    type: "GET",
    url: thiscontenturl,
    success: inserttopnavigation	
   });
 }

 if (document.getElementById("navigationleftinsert")) {	
  var thisplace = $("#navigationleftinsert");
  parentplace = $("#navigationleftinsert").parent();     
  var thiscontenturl = thisplace.text();
   // alert("BBnavleftmenu "+thiscontenturl);
  thisplace.hide();
  $.ajax({
	    type: "GET",
	    url: thiscontenturl,
	    success: insertleftnavigation	    
  });
 }   
});
function inserttopnavigation(data, status) {
 $(parentplace).html(data);	
 var navtopmenu = new YAHOO.widget.MenuBar("navtopmenu", {
        autosubmenudisplay: true, 
        hidedelay: 750,
        minscrollheight: 150,
        maxheight: 300,
        lazyload: true });
 /*
  Call the "render" method with no arguments since the 
  markup for this Menu instance is already exists in the page.
 */
 navtopmenu.render();
 if ($("#JSSessionId").length > 0) { // someone logged in
   	 var service_id = document.getElementById("JSServiceId").value;
   	 var domain_id = document.getElementById("JSDomainId").value; 
   	 var mode_id = document.getElementById("JSModeId").value; 
   	 var person_id = document.getElementById("JSPersonId").value;
   	 var session_id = document.getElementById("JSSessionId").value; 
   	 var loginmode_id = document.getElementById("JSLoginModeId").value;
   	 var phpurl = document.getElementById("JSSitePHPurl").value;
   	 var globalcodeversion = "v1";   	 
   	 stdparms = "?ServiceId="+service_id+"&DomainId="+domain_id+"&ModeId="+mode_id+"&PersonId="+person_id+"&SessionId="+session_id+"&LoginModeId="+loginmode_id;
   	 var sUrl = phpurl+"/"+globalcodeversion+"_personlogoutin.php"+stdparms;	 
   	 $("#nav_Login").attr("href", sUrl);
   	 $("#nav_Login").html("Logout");	 
   	 // <a id="nav_Login" class="yuimenubaritemlabel" href="http://localhost/site_php/v1_personloginout.php?ServiceId=ocz&DomainId=havanthockeyclub&ModeId=2&LoginModeId=2">Login</a>
   	 resetTimeoutHandle(person_id);
} else { // noone logged in
	 $("#nav_Login").html("Login");
}
}
function insertleftnavigation(data, status) { 
 $(parentplace).html(data);
 var navleftmenu = new YAHOO.widget.Menu("navleftmenu", { 
	           position: "static", 
	           hidedelay:  750, 
	           lazyload: true });
 /*
 Call the "render" method with no arguments since the 
 markup for this Menu instance is already exists in the page.
 */
 navleftmenu.render();	 
}

var thisnavtopplace = "";
var thisfooter1place = "";
var thisfooter2place = "";
var thisfooter3place = "";
var thisfooter4place = "";

$(function() {
	
 var currentURLs = String(window.location);
 var JSActualURLs = JSActualURL();
 var currentURLx = currentURLs.split('/').join('_');
 var JSActualURLx = JSActualURLs.split('/').join('_');
 
 if (document.getElementById("navtopmenuinsert")) {		
   thisnavtopplace = $("#navtopmenuinsert");
   parentnavtopplace = $("#navtopmenuinsert").parent();   
   var thisnavtopcontenturl = thisnavtopplace.text();
   // alert("BBnavtopmenu "+thisnavtopcontenturl+" vs "+currentURL+" | "+JSActualURL());  
   if ( JSActualURLs != "" ) { 
	   if (currentURLx.indexOf(JSActualURLx) >= 0) { 
		   thisnavtopcontenturl = "http://"+JSActualURLs+"/domain_style/NavTopMenu.html"; 
	   }
   }
   thisnavtopplace.hide();
   $.ajax({
    type: "GET",
    url: thisnavtopcontenturl,
    success: insertnavtopmenu	
   });
 }

 if (document.getElementById("footermenu1insert")) {		
   thisfooter1place = $("#footermenu1insert");
   parentfooter1place = $("#footermenu1insert").parent();   
   var thisfooter1contenturl = thisfooter1place.text();
   // alert("BBnavtopmenu "+thisfooter1contenturl);
   if ( JSActualURLs != "" ) { 
	   if (currentURLx.indexOf(JSActualURLx) >= 0) { 
		   thisfooter1contenturl = "http://"+JSActualURL()+"/domain_style/FooterMenu1.html"; 
	   }
   }
   thisfooter1place.hide();
   $.ajax({
    type: "GET",
    url: thisfooter1contenturl,
    success: insertfootermenu1	
   });
 }

 if (document.getElementById("footermenu2insert")) {		
	   thisfooter2place = $("#footermenu2insert");
	   parentfooter2place = $("#footermenu2insert").parent();   
	   var thisfooter2contenturl = thisfooter2place.text();
	   // alert("BBnavtopmenu "+thisfooter2contenturl);
	   if ( JSActualURLs != "" ) { 
		   if (currentURLx.indexOf(JSActualURLx) >= 0) { 
			   thisfooter2contenturl = "http://"+JSActualURL()+"/domain_style/FooterMenu2.html";
		   }
	   }
	   thisfooter2place.hide();
	   $.ajax({
	    type: "GET",
	    url: thisfooter2contenturl,
	    success: insertfootermenu2	
	   });
 }
 
 if (document.getElementById("footermenu3insert")) {		
	   thisfooter3place = $("#footermenu3insert");
	   parentfooter3place = $("#footermenu3insert").parent();   
	   var thisfooter3contenturl = thisfooter3place.text();
	   // alert("BBnavtopmenu "+thisfooter3contenturl);
	   if ( JSActualURLs != "" ) { 
		   if (currentURLx.indexOf(JSActualURLx) >= 0) { 
			   thisfooter3contenturl = "http://"+JSActualURL()+"/domain_style/FooterMenu3.html"; 
		   }
	   }
	   thisfooter3place.hide();
	   $.ajax({
	    type: "GET",
	    url: thisfooter3contenturl,
	    success: insertfootermenu3	
	   });
 }
 
 if (document.getElementById("footermenu4insert")) {		
	   thisfooter4place = $("#footermenu4insert");
	   parentfooter4place = $("#footermenu4insert").parent();   
	   var thisfooter4contenturl = thisfooter4place.text();
	   // alert("BBnavtopmenu "+thisfooter4contenturl);
	   if ( JSActualURLs != "" ) { 
		   if (currentURLx.indexOf(JSActualURLx) >= 0) { 
			   thisfooter4contenturl = "http://"+JSActualURL()+"/domain_style/FooterMenu4.html";
		   }
	   }
	   thisfooter4place.hide();
	   $.ajax({
	    type: "GET",
	    url: thisfooter4contenturl,
	    success: insertfootermenu4	
	   });
 }
 
});

function insertnavtopmenu(data, status) {
	$(parentnavtopplace).html(data);	
	if (JSSessionId()!="") { // someone logged in
	   	 var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_personlogoutin.php"+STDPARMS();
	   	 // alert(JSSessionId()+" - "+JSSitePHPURL()+" - "+sUrl);
	   	 $("#nav_Login").attr("href", sUrl);
	   	 $("#nav_Login").html("Logout");	 
	   	 resetTimeoutHandle(JSPersonId());	 
	} else { // noone logged in
		 $("#nav_Login").html("Login");
	}
}

function insertfootermenu1(data, status) {
	$(parentfooter1place).html(data);	
}

function insertfootermenu2(data, status) {
	$(parentfooter2place).html(data);	
}

function insertfootermenu3(data, status) {
	$(parentfooter3place).html(data);	
}

function insertfootermenu4(data, status) {
	$(parentfooter4place).html(data);	
}
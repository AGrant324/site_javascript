YAHOO.namespace("BBnavleftmenu");

var thisplace = "";

$(function() {
	
 if (document.getElementById("navigationleftinsert")) {	
   var thisplace = $("#navigationleftinsert");
   parentplace = $("#navigationleftinsert").parent();     
   var thiscontenturl = thisplace.text();
   // alert("BBnavleftmenu "+thiscontenturl);
   thisplace.hide();
   $.ajax({
    type: "GET",
    url: thiscontenturl,
    success: insertnavigation	    
   });
 }  
	         
});

function insertnavigation(data, status) { 
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

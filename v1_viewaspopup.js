function viewaspopup(myurl,myheight,mywidth) {
	var spec = "height = "+myheight+", width = "+mywidth+", resizable = 1, scrollbars = 1,toolbar = 1,left=300";
	// alert(spec);
	window.open( myurl, "myWindow", spec )
}

function popitup( url,title,top,left,height,width ) {
	 window.clearTimeout(timeoutHandle);
	 var timeoutHandle = window.setTimeout(function() {
		 alert("Warning - This session will expire in 2 minutes time.");
	 }, 780000);
	
	var viewportwidth;
	 var viewportheight;
	 // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
	 if (typeof window.innerWidth != 'undefined') {
	  viewportwidth = window.innerWidth,
	  viewportheight = window.innerHeight
	 }
	 // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
	 else if (typeof document.documentElement != 'undefined'
	  && typeof document.documentElement.clientWidth !=
	  'undefined' && document.documentElement.clientWidth != 0) {
	  viewportwidth = document.documentElement.clientWidth,
	  viewportheight = document.documentElement.clientHeight
	 } else { // older versions of IE
	  viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
	  viewportheight = document.getElementsByTagName('body')[0].clientHeight
	 }
	 	 
	 if (height == "autofit") {height = "600"; }
	 if (height.includes("%")) {
		 var hpercent = height.replace("%", "");
		 var hnum = viewportheight * parseFloat(hpercent) / 100;
		 height = hnum.toString(); 
	 }
	 if (width == "autofit") {width = "600"; } 
	 if (width.includes("%")) {
		 var wpercent = width.replace("%", "");
		 var wnum = viewportwidth * parseFloat(wpercent) / 100;
		 width = wnum.toString(); 
	 }
	 if (top == "center") {top = ((viewportheight)-height)/2;} // automatically centralise
	 if (left == "center") {left = ((viewportwidth)-width)/2;} // automatically centralise
	 posstring = 'top='+top+',left='+left+',height='+height+',width='+width+',resizable=yes,scrollbars=yes,directories=no,location=no,menubar=no,status=no,toolbar=no';

	 newwindow = window.open(url,title,posstring);
	 // alert(title+" "+posstring); 	 	 
	 if (window.focus) {newwindow.focus();}

	 return false;
}
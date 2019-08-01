
//global variables
// GLOBALS = new Array();

function List2Hash (parm0) { 
// string returns hash 
 var txhash = new Array();
 tarray = parm0.split(",");
 for (tarrayindex in tarray) {
  tkey = tarray[tarrayindex];
  txhash[tkey] = tkey;
 }
 return txhash; 
}

function Lists2Hash (parm0, parm1) { 
// strings returns hash - keyarray textarray 
 var txhash = new Array();
 tkarray = parm0.split(",");
 ttarray = parm1.split(","); 
 for (tkarrayindex in tkarray) {
  tkey = tkarray[tkarrayindex];
  txhash[tkey] = ttarray[tkarrayindex];
 }
 return txhash; 
}


function Array2List (parm0) { 
// array returns list (comma separated)
var tlist = "";
var lsep = "";
for (aindex in parm0) {
	tlist = tlist + lsep + parm0[aindex];	
	lsep = ",";
}
return tlist;
}

function AddToList (list,addition) {
	// removes duplicates and null entries
	// alert("AddToList "+list+" "+addition);
	var outlist = "";
	list = list+","+addition;
	var lista = list.split(",");
	var sep = "";
	var addtolist = "0";
	for (listi in lista) {
		addtolist = "1";
		if (lista[listi] == "") { addtolist = "0"; }
		for (var i = 0; i < listi; i++) { 
			if (lista[listi] == lista[i]) { addtolist = "0"; } 
		}
		if (addtolist == "1") { outlist = outlist + sep + lista[listi]; sep = ","; }		
	}
	return outlist;
}

function RemoveFromList (list,removal) {
	// removes duplicates and null entries
	// alert("RemoveFromList "+list+" "+removal);
	var outlist = "";
	var lista = list.split(",");
	var sep = ""; 
	for (listi in lista) {
		if ((lista[listi] != "")&&(lista[listi] != removal)) {
			outlist = outlist + sep + lista[listi]; sep = ",";	
		}
	}
	return outlist;
}

function KeysToValuesList(thash,tkeylist) {
 if (tkeylist == "") { return "";  }
 var tkeya = tkeylist.split(',');
 var tlist = ""; 
 var tsep = "";
 var tvalue = ""; 
 for (var tkeyaindex in tkeya) {	
  tvalue = thash[tkeya[tkeyaindex]];
  tlist = tlist + tsep + tvalue;  
  tsep = ",";
 }
 return tlist; 
}

function SyntaxListToHash(parm0) {
// xk+yk OR xk[xt]+yk[yt] 	
 tsyntax1a = parm0.split('+');
 sep = ""; tklist = ""; ttlist = "";
 for (var si in tsyntax1a) {
  if (tsyntax1a[si].indexOf('[') != -1) {
   tsyntax2a = tsyntax1a[si].split('[');
   tsyntax3a = tsyntax2a[1].split(']');
   tklist = tklist + sep + tsyntax2a[0];		
   ttlist = ttlist + sep + tsyntax3a[0]; 
  } else {
   tklist = tklist + sep + tsyntax1a[si];		
   ttlist = ttlist + sep + tsyntax1a[si];    
  }
  sep = ",";
 }
 temphash = Lists2Hash(tklist,ttlist);
 return temphash;
}

function SyntaxKeyToValue(tablename,keyfieldname,textfieldname,keyvalue) {
// tablename keyfieldname textfieldname keyvalue
if (keyvalue != "") {
	Get_Data_Hash(tablename,keyvalue);
	if (GLOBALS["IOERROR"] == "0") {
	 return GLOBALS[textfieldname];
	} else {
	 return keyvalue+" - Not Found";	
	}
} else {return "";}
}

function getCheckboxGroupValueList(buttonGroupName) {
var selectedValues  = new Array();
var jqstring = "input[name='"+buttonGroupName+"[]']:checked";
$(jqstring).each(function() {
 selectedValues.push($(this).val());
});
return Array2List(selectedValues);
}

function getRadioGroupValue(buttonGroupName) {
var selectedValue  = "";
var selectedValue = $('input[name='+buttonGroupName+']:checked').val();
// alert(buttonGroupName+"---->"+selectedValue);
return selectedValue;
}

function JSINSELECTHASH(parm0,parm1,parm2,parm3,parm4,parm5){
// hash id/name value showcode shownone showcustom
if (parm4 == "Yes") {parm0[""] = "none";}
if (parm5 == "Yes") {parm0["custom"] = "custom";}
var tstate = false;
var valueVar = "";
var optionsIndex = 0;
parm1.options.length=0;
for ( keyVar in parm0 ) {
 if (parm3 == "Yes") {valueVar = "("+keyVar+") - "+parm0[keyVar];} else  {valueVar = parm0[keyVar];} 
 valueVar = valueVar.replace("() - ",""); // remove untidy text
 valueVar = valueVar.replace("(custom) - ",""); // remove untidy text
 if (keyVar == parm2) { tstate = true;} else {tstate = false;}
 optionsIndex = parm1.options.length;
 parm1.options[parm1.options.length] = new Option(valueVar, keyVar, tstate, tstate);
 if (valueVar.indexOf("-----") !== -1) {	 
  parm1.options[optionsIndex].disabled = true; 
 }
// if (parm0[keyVar].indexof("-----") !=-1) {	parm1.options[parm1.options.length].setAttribute("color","navy"); } 
} 
}

function JSINCHECKBOXHASH(parm0,parm1,parm2,parm3,parm4,parm5){
// keyhash name valuelist(a,c) showcode shownone showcustom
if (parm4 == "Yes") {parm0[""] = "none";}
if (parm5 == "Yes") {parm0["custom"] = "custom";}
var tstate = "";
var valueVar = "";
var checkboxdiv = "#"+parm1+"_inputdiv";
$(checkboxdiv).empty();
for ( keyVar in parm0 ) {
 if (parm3 == "Yes") {valueVar = "("+keyVar+") - "+parm0[keyVar];} else  {valueVar = parm0[keyVar];} 
 valueVar = valueVar.replace("() - ",""); // remove untidy text
 valueVar = valueVar.replace("(custom) - ",""); // remove untidy text
 if (FoundInCommaList(keyVar,parm2)) { tstate = 'checked="checked"';} else {tstate = "";} 
 var el = $('<input type="checkbox" name="'+parm1+'_input[]"  '+tstate+' value="'+keyVar+'" />'+valueVar+'</br>');
 $(checkboxdiv).append(el);
}
}

function JSINRADIOHASH(parm0,parm1,parm2,parm3,parm4,parm5){
// keyhash name value showcode shownone showcustom
if (parm4 == "Yes") {parm0[""] = "none";}
if (parm5 == "Yes") {parm0["custom"] = "custom";}
var tstate = "";
var valueVar = "";
var radiodiv = "#"+parm1+"_inputdiv";
$(radiodiv).empty();
for ( keyVar in parm0 ) {
 if (parm3 == "Yes") {valueVar = "("+keyVar+") - "+parm0[keyVar];} else  {valueVar = parm0[keyVar];} 
 valueVar = valueVar.replace("() - ",""); // remove untidy text
 valueVar = valueVar.replace("(custom) - ",""); // remove untidy text
 if (keyVar == parm2) { tstate = "checked";} else {tstate = "";} 
 var el = $('<input type="radio" name="'+parm1+'_input" '+tstate+' value="'+keyVar+'" >'+valueVar+'</input></br>');
 $(radiodiv).append(el);
}
}

function FoundInCommaList(parm0,parm1){
// key list 
var ffound = "0";
// alert(parm0+"|"+parm1+"|"+ffound);
if (parm1 != "") {
 farray = parm1.split(","); 
 for (farrayindex in farray) {		
  if (parm0 == farray[farrayindex]) {ffound = "1"; }
 }
 // alert(parm0+"|"+parm1+"|"+ffound);
}
if (ffound == "1") {return true;} else {return false;}
// return false;
}

function EscapeSpecials(parm0){
	$output = parm0; 
	$output = $output.replace(/\+/g,"%2B"); 
	// $output = encodeURIComponent(parm0);	
	return $output;	
}

function print_r(theObj){
 document.write("<h2>Array Print</h2>")	
 if(theObj.constructor == Array ||
  theObj.constructor == Object){
  document.write("<ul>")
  for(var p in theObj){
    if(theObj[p].constructor == Array||theObj[p].constructor == Object){
      document.write("<li>["+p+"] => "+typeof(theObj)+"</li>");
      document.write("<ul>")
      print_r(theObj[p]);
      document.write("</ul>")
    } else {
      document.write("<li>["+p+"] => "+theObj[p]+"</li>");
    }
  }
  document.write("</ul>");
 }
}

function popitupXX( url,title,top,left,height,width ) {	
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
 var autofit = "0";
 if (height == "autofit") {height = "600"; autofit = "1";} 
 if (width == "autofit") {width = "600"; autofit = "1";}  
 if (top == "center") {top = ((viewportheight)-height)/2;} // automatically centralise
 if (left == "center") {left = ((viewportwidth)-width)/2;} // automatically centralise
 posstring = 'top='+top+',left='+left+',height='+height+',width='+width+',resizable=yes,scrollbars=yes,directories=no,location=no,menubar=no,status=no,toolbar=no';
 newwindow = window.open(url,title,posstring);
 if (window.focus) {newwindow.focus();}
 return false;
}

function sleep(milliseconds) {
 var start = new Date().getTime();
 for (var i = 0; i < 1e7; i++) {
  if ((new Date().getTime() - start) > milliseconds){ break;}
 }
}

function FormatTextDateEffective($input) {
 mergedkeyseparator = '+';;
 var bits = $input.split(mergedkeyseparator);
 var dbits = bits[1].split("-"); 
 return bits[0]+"  ("+dbits[2]+"-"+dbits[1]+"-"+dbits[0]+")";	
}	

function setupWait() {
 // check that setupWait has not already been initialised (in the case of multiple js routines)
 if ($('#waitBackground').length){ 
	 // alert("setupWait already initialised");
 } else {
	 // alert("setupWait initialised");
	 // create a background area
	 var $div = $('<div />').appendTo('body');
	 $div.attr('id', 'waitBackground'); 
	 $("#waitBackground").css({ 	 
	  position: "fixed",
	  "z-index" : "98",  
	  background: "#000",
	  opacity: 0.3,
	  top: "0",
	  left: "0",
	  width: "100%",
	  height: "100%",
	  display: "none"  
	 });
	 // create a spinner
	 var $sdiv = $('<div />').appendTo('body');
	 $sdiv.attr('id', 'waitSpinner');  	  
	 $("#waitSpinner").css({ 	 
	  position: "fixed",
	  "z-index" : "99",    
	  'background-image': 'url(../site_assets/spinner.gif)', 
	  top: "50%",
	  left: "50%",
	  width: "120px",
	  height: "120px",
	  display: "none"    
	 });
	 // create a message	 
	 $("#waitSpinner").append("<div id=waitMessage></div>");
	 $("#waitMessage").css({ 	 
	  position: "absolute",
	  "z-index" : "99",    
	  width: "120px",
	  height: "120px", 
	  textAlign: "center",
	  top: "45%",
	  fontSize:  "12px",  
	  color: "white"
	 }); 
 }	 
}

function startWait(waitmessage) {
 // alert("StartWait");
 $('#waitBackground').css({ display: "block"}); 
 $('#waitSpinner').css({ display: "block"});
 $("#waitMessage").html = waitmessage;   
}

function stopWait() {
 // alert("StopWait");	
 $('#waitBackground').css({ display: "none"}); 
 $('#waitSpinner').css({ display: "none"});
 $("#waitMessage").html = "";  
}


function loadImage(src, callback) {
 var image = new Image();
 image.onerror = callback("error"); // CHECK - a bit crude just ignores image not existing
 image.onload = callback("");
 image.src = src; 
}

function removeNamePrefixes(xfilename) {
	 // remove prefixes to get back to original file name - including case when filename contains underscores
	var fnbitsa = xfilename.split("_");
	if (fnbitsa[0] == "temp") { fnbitsa.shift(); }
	if (fnbitsa[0] == "tempc") { fnbitsa.shift(); }
	if (fnbitsa[0] == "tempf") { fnbitsa.shift(); }	
	fnbitsa.shift();
	fnbitsa.shift();
	var xoutname = "";
	var xsep = "";
	for (var xi in fnbitsa) {
		xoutname = xoutname + xsep + fnbitsa[xi];
		xsep = "_";  
	}
	return xoutname; 
}

function timeStamp(){
	var now = new Date();
	var yyyy = now.getFullYear().toString();
	var mm = ('0' + (now.getMonth() + 1)).slice(-2); //January is 0!
	var dd = ('0' + now.getDate()).slice(-2);
	var hh = ('0' + now.getHours()).slice(-2);
	var ii = ('0' + now.getMinutes()).slice(-2);
	var ss = ('0' + now.getSeconds()).slice(-2);
	return yyyy+mm+dd+hh+ii+ss;
} 

function TtimeStamp(){
	return "T"+timeStamp();
} 

function Age (dob, agelimit) {
	var today = new Date();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var age = "";	
	if  ((dob == "")||(dob == "0000-00-00")) {}
	else {
		var dbits = dob.split("-");
		yearoffset = yyyy - dbits[0];
		monthoffset = mm - dbits[1];
		if ( monthoffset < 0 ) {
			monthoffset = 12 + monthoffset;
			yearoffset = yearoffset - 1;
		}
		if (yearoffset >= agelimit) {age = ""; }
		else { age = yearoffset+":"+monthoffset; }
	}
	return age;
}

function AgeYr (dob) {
	var today = new Date();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var age = "";	
	if  ((dob == "")||(dob == "0000-00-00")) {}
	else {
		var dbits = dob.split("-");
		yearoffset = yyyy - dbits[0];
		monthoffset = mm - dbits[1];
		if ( monthoffset < 0 ) {
			monthoffset = 12 + monthoffset;
			yearoffset = yearoffset - 1;
		}
		age = yearoffset;
	}
	return age;
}

function days_between(fromdate, todate) {
	var validfromdate = "1";
	var validtodate = "1";
	if (fromdate == "") { validfromdate = "0"; }
	if (isNaN(new Date(fromdate))) { validfromdate = "0"; }
	if (todate == "") { validfromdate = "0"; }	
	if (isNaN(new Date(todate))) { validtodate = "0"; }	
	if ((validfromdate == "1")&&(validfromdate == "1")) {
		var date1 = new Date(fromdate);
		var date2 = new Date(todate);	
	    // The number of milliseconds in one day
	    var ONE_DAY = 1000 * 60 * 60 * 24;
	    // Convert both dates to milliseconds
	    var date1_ms = date1.getTime();
	    var date2_ms = date2.getTime();
	    // Calculate the difference in milliseconds
	    var difference_ms = Math.abs(date1_ms - date2_ms);
	    // Convert back to days and return
	    // alert(fromdate+"|"+todate+"|"+Math.round(difference_ms/ONE_DAY));
	    return Math.round(difference_ms/ONE_DAY);				
	} else {
		return 0;	
	}
}

function DDsMMsYYYYtoYYYY_MM_DD ( ddsmmsyyyya ) {
    if ((ddsmmsyyyya == "00/00/0000")||(ddsmmsyyyya == "")) { return ""; }
    else {
         var dd = ddsmmsyyyya[0] + ddsmmsyyyya[1];
         var mm = ddsmmsyyyya[3] + ddsmmsyyyya[4];
         var yyyy = ddsmmsyyyya[6] + ddsmmsyyyya[7] + ddsmmsyyyya[8] + ddsmmsyyyya[9];
         return yyyy+"-"+mm+"-"+dd;
    }
}

function YYYY_MM_DDtoDDsMMsYYYY ( yyyyummudda) {
    if ( yyyyummudda == "0000-00-00") { return ""; }
    else {
         var dd= yyyyummudda[8] + yyyyummudda[9];
         var mm= yyyyummudda[5] + yyyyummudda[6];
         var yyyy= yyyyummudda[0] + yyyyummudda[1] + yyyyummudda[2] + yyyyummudda[3];
         return  dd +"/" + mm+"/" + yyyy;
    }
}

function TimestamptoDDMMMbHHcMM (timestamp) {
	
	if (timestamp != "") {
		if (timestamp.charAt(0) != "T") { timestamp = "T"+timestamp; }     
	    var Monthmmm = Array("","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
	    // TYYYYMMDDHHMMSS
	    var dd=timestamp.charAt(7)+timestamp.charAt(8);
	    var momo=timestamp.charAt(5)+timestamp.charAt(6);
	    var hh=timestamp.charAt(9)+timestamp.charAt(10);
	    var mimi=timestamp.charAt(11)+timestamp.charAt(12);
	    return dd+Monthmmm[parseInt(momo)]+" "+hh+":"+mimi;
	} else {
		return "?";
	}
}

function expandSymbolicURL (url) {
	// This is part of a mechanism to get relative path info through mod security eg ../
	url = url.replace("GLOBALDOMAINWWWURL", JSDomainWWWURL());
	url = url.replace("GLOBALSITEWWWURL", JSSiteWWWURL());	
	return url;
}

function fileSizeText (latestselectedfilesize, maxuploadfilesize) {
	var filesizenum = parseInt(latestselectedfilesize);
	if (filesizenum < 1000000) {
		filesizenum = filesizenum / 1000;
		filesizenum = Math.round(filesizenum);
		var sizesuffix = "KB";
	}
	if ((filesizenum >= 1000000)&&(filesizenum < 3000000)) {
		filesizenum = filesizenum / 100000;
		filesizenum = Math.round(filesizenum);
		filesizenum = filesizenum/10;
		var sizesuffix = "MB";
	}			
	if ((filesizenum >= 3000000)&&(filesizenum < maxuploadfilesize)) {
		filesizenum = filesizenum / 100000;
		filesizenum = Math.round(filesizenum);
		filesizenum = filesizenum/10;
		var sizesuffix = "MB - Warning: this is a large file - Upload may take some time";
	}
	if ((filesizenum > maxuploadfilesize)) {
		filesizenum = filesizenum / 100000;
		filesizenum = Math.round(filesizenum);
		filesizenum = filesizenum/10;
		var sizesuffix = "MB - This file is too large for the server";
	}	
	
	return filesizenum+" "+sizesuffix;	
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') { c = c.substring(1); }
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie(cookiename,cookievalue) {
    var user = getCookie(cookiename);
    if (user == cookievalue) { return true; }
    else { return false; }
}

function messageAlert(tmessagetext) {
	/*
    $("#messagePopup").popup("open", { positionTo: 'window' });
    var expandedtextstring = SParseHTML(tmessagetext);
	XHTML("#messageText",expandedtextstring);
	*/
	alert(tmessagetext);
}

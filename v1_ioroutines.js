
function Create_Hashes (datastring) {

 /*
 var hexstring = "";
 for (var i=0; i<30; i++) { 
	 hexstring = hexstring+" "+datastring[i]+datastring.charCodeAt(i); 
 }
 alert(hexstring);
 */
		
 var recsep = "^"; var fieldsep = String.fromCharCode(126);  //  tilde
 
 var rootkeyseparator = '+';
 var dataRequestRecords = datastring.split(recsep);
 var datatype = "";
 for (var k in dataRequestRecords) {
  var dataRequestSplit = dataRequestRecords[k].split(fieldsep);
  var dataRequestHeaderData = dataRequestSplit[0];
  var dataRequestData = dataRequestRecords[k].replace(dataRequestHeaderData+fieldsep,""); 
  if (dataRequestHeaderData.indexOf("_keys") != -1) {
   datatype = dataRequestHeaderData.replace("_keys",""); 	  
   GLOBALS[datatype+"^KEYS"] = dataRequestSplit[1];
  }
  if (dataRequestHeaderData.indexOf("_rootkey") != -1) {
   datatype = dataRequestHeaderData.replace("_rootkey",""); 	  
   GLOBALS[datatype+"^ROOTKEY"] = dataRequestSplit[1]; // could be multiple rootkeys
  }
  dataRequestSplit.shift(); // remove domainid  
  if (dataRequestHeaderData.indexOf("_header") != -1) { 
   datatype = dataRequestHeaderData.replace("_header","");  
   var tstring = ""; var sep = "" ;
   for (var i in dataRequestSplit) {	
	tstring = tstring+sep+dataRequestSplit[i]; sep = fieldsep;	
   }
   GLOBALS[datatype+"^FIELDS"] = tstring;
   // alert(GLOBALS[datatype+"^FIELDS"]+" "+GLOBALS[datatype+"^KEYS"]);
   if (GLOBALS[datatype+"^KEYS"] == "1") {keyindex = 0;}    
   if (GLOBALS[datatype+"^KEYS"] == "2") {keyindex = 1;} 
   if (GLOBALS[datatype+"^KEYS"] == "3") {keyindex = 2;} 
   if (GLOBALS[datatype+"^KEYS"] == "4") {keyindex = 3;} 
   if (GLOBALS[datatype+"^KEYS"] == "5") {keyindex = 4;}    
   GLOBALS[datatype+"^INDEX"] = ""; indexsep="";
  } 	
  if (dataRequestHeaderData.indexOf("_data") != -1) { 
   datatype = dataRequestHeaderData.replace("_data","");
   // alert(datatype+"^"+dataRequestSplit[keyindex]+"^DATA"+ " - "+keyindex+ " - "+dataRequestData);   
   GLOBALS[datatype+"^"+dataRequestSplit[keyindex]+"^DATA"] = dataRequestData;
   GLOBALS[datatype+"^INDEX"] = GLOBALS[datatype+"^INDEX"]+indexsep+dataRequestSplit[keyindex]; indexsep=fieldsep;
  }
  if (dataRequestHeaderData.indexOf("trace_info") != -1) { } // no action used for trace 
 }
 GLOBALS["DATALOADED"] = "Yes"; 
 // if (JSPersonId() == "bbra") { alert(GLOBALS["person^INDEX"]); }
}

function Add_Array_Index (pdatatype, tkey) {
 // datatype[rootkey] tkey
 tdatatype = pdatatype.split("[")[0];	
 var iarray  = Array ();
 if (GLOBALS[tdatatype+"^INDEX"] != "") {iarray = GLOBALS[tdatatype+"^INDEX"].split(fieldsep);}
 iarray.push(tkey);
 iarray.sort();
 GLOBALS[tdatatype+"^INDEX"] = ""; indexsep=""; 
 for (var k in iarray) { 
  GLOBALS[tdatatype+"^INDEX"] = GLOBALS[tdatatype+"^INDEX"]+indexsep+iarray[k]; indexsep=fieldsep;
 }
}

function Delete_Array_Index (pdatatype, tkey) {   // Is this still required ?? 
 var recsep = "^"; var fieldsep = String.fromCharCode(126);  //  tilde  
 // datatype[rootkey] tkey
 tdatatype = pdatatype.split("[")[0];	
 var iarray = GLOBALS[tdatatype+"^INDEX"].split(fieldsep);
 delete iarray[tkey];
 iarray.sort();
 GLOBALS[tdatatype+"^INDEX"] = ""; indexsep=""; 
 for (var k in iarray) { 
  if (iarray[k] != tkey) {GLOBALS[tdatatype+"^INDEX"] = GLOBALS[tdatatype+"^INDEX"]+indexsep+iarray[k]; indexsep=fieldsep; }
 }
}

function Get_Array_Hash (pdatatype) {
 var recsep = "^"; var fieldsep = String.fromCharCode(126);  //  tilde
 // datatype[rootkey] - returns array
 tdatatype = pdatatype.split("[")[0];	
 // alert("Get_Array_Hash - "+tdatatype+"^INDEX","info"); 
 // alert(GLOBALS[tdatatype+"^INDEX"]);
 var tresult = GLOBALS[tdatatype+"^INDEX"].split(fieldsep);
 if (tresult[0] == "") {tresult = Array ();} 
 return tresult; 
}

function Get_Array_Hash_DateEffective (pdatatype, pdateeffective) {
 var recsep = "^"; var fieldsep = String.fromCharCode(126);  //  tilde 
 // datatype[rootkey] dateeffective - returns array with basekeys
 var tresult  = Array ();	
 tdatatype = pdatatype.split("[")[0];		
 var tdatatypea = Get_Array_Hash (tdatatype);
 var mergedkeyseparator = '+';;
 var dateeffectivekeyfound = "";
 var kdata  = Array ();
 var okdata  = Array ();
 var oldbasekey = "";
 for (var tdatatypei in tdatatypea) {
  kdata = tdatatypea[tdatatypei].split(mergedkeyseparator); 
  if ((kdata[0] == oldbasekey)||(oldbasekey == "")) {
   if (pdateeffective >= kdata[1]) { dateeffectivekeyfound = tdatatypea[tdatatypei]; }	    	  
   oldbasekey = kdata[0]; 
  }    
  if ((kdata[0] != oldbasekey)) {
   if (dateeffectivekeyfound != "") { okdata = dateeffectivekeyfound.split(mergedkeyseparator); tresult.push(okdata[0]); }
   dateeffectivekeyfound = "";    
   if (pdateeffective >= kdata[1]) { dateeffectivekeyfound = tdatatypea[tdatatypei]; }	    
   oldbasekey = kdata[0];    
  }     
 } 
 if (dateeffectivekeyfound != "") { okdata = dateeffectivekeyfound.split(mergedkeyseparator); tresult.push(okdata[0]); }
 return tresult; 
}

function Get_Hash_Hash (pdatatype, tvaluefield) {
 var recsep = "^"; var fieldsep = String.fromCharCode(126);  //  tilde
 // datatype[rootkey] valuefield - returns hash -> tablekey[value] 
 var tresult = Array ();	
 var tdatatype = pdatatype.split("[")[0];		
 var tkeyarray = GLOBALS[tdatatype+"^INDEX"].split(fieldsep);
 if (tkeyarray[0] != "") {
  for (var ki in tkeyarray) {
   Get_Data_Hash(tdatatype,tkeyarray[ki]);	  
   tresult[tkeyarray[ki]] = GLOBALS[tvaluefield];
  }	  
 }
 return tresult; 
}

function Initialise_Data (pdatatype) {
 var recsep = "^"; var fieldsep = String.fromCharCode(126);  //  tilde
 // datatype[rootkey]
 tdatatype = pdatatype.split("[")[0];	
 var tstring = GLOBALS[tdatatype+"^FIELDS"]; 
 var tfields = tstring.split(fieldsep);
 for (var fi in tfields) {	
  var tfieldelement = tfields[fi];
  GLOBALS[tfieldelement] = "";	 
 }
 GLOBALS[tfields[0]] = document.getElementById("JSDomainId").value;  
 if (GLOBALS[tdatatype+"^ROOTKEY"] == undefined) {} else { GLOBALS[tfields[1]] = GLOBALS[tdatatype+"^ROOTKEY"]; } 
}

function Get_Data_Hash (pdatatype, tkey) {
 var recsep = "^"; var fieldsep = String.fromCharCode(126);  //  tilde
 // datatype[rootkey] key
 tdatatype = pdatatype.split("[")[0];
 if( GLOBALS[tdatatype+"^FIELDS"] === undefined ) {
  // alert("HASH NOT YET LOADED "+pdatatype+"  "+tkey);   CHECK
  alert("LOAD INCOMPLETE "+pdatatype);	 
 }
 var tstring = GLOBALS[tdatatype+"^FIELDS"];
 var tfields = tstring.split(fieldsep);
 GLOBALS["IOERROR"] = "0";
 if(GLOBALS[tdatatype+"^"+tkey+"^DATA"] == undefined){ 
  GLOBALS["IOERROR"] = "1"; 
  // alert("here");
 } else {
  tdata = GLOBALS[tdatatype+"^"+tkey+"^DATA"].split(fieldsep);
  for (var fi in tfields) {	
   GLOBALS[tfields[fi]] = tdata[fi];
  }
 }
}	

function Get_Data_Hash_DateEffective (pdatatype, pbasekey, pdateeffective) {
 var recsep = "^"; var fieldsep = String.fromCharCode(126);  //  tilde
 // datatype[rootkey] basekey dateeffective    --> returns a GLOBALS value for the basekey as well
 tdatatype = pdatatype.split("[")[0];		
 // alert("Get_Data_Hash_DateEffective - "+tdatatype+" "+pbasekey+" "+pdateeffective);
 var pdatatypea = Get_Array_Hash (pdatatype);
 var mergedkeyseparator = '+';;
 var dateeffectivekeysought = pbasekey + mergedkeyseparator + pdateeffective;
 var dateeffectivekeyfound = ""; 
 for (var pdatatypei in pdatatypea) {		 
  if (dateeffectivekeysought >= pdatatypea[pdatatypei]) { dateeffectivekeyfound = pdatatypea[pdatatypei]; }
 }	 
 Get_Data_Hash (pdatatype, dateeffectivekeyfound);
 var tstring = GLOBALS[tdatatype+"^FIELDS"]; 
 var tfields = tstring.split(fieldsep); 
 var mergedkeyfieldname  = tfields[1];
 var kbits = mergedkeyfieldname.split(mergedkeyseparator);	
 var basekeyfieldname = kbits[0];
 GLOBALS[basekeyfieldname] = pbasekey;
}


function Check_Data_Hash (pdatatype, tkey) {
 var recsep = "^"; var fieldsep = String.fromCharCode(126);  //  tilde
 // datatype[rootkey] key
 tdatatype = pdatatype.split("[")[0];		
 if( GLOBALS[tdatatype+"^FIELDS"] === undefined ) {
  // alert("HASH NOT YET LOADED "+pdatatype+"  "+tkey);   CHECK
  alert("LOAD INCOMPLETE "+pdatatype);	 
 }
 var tstring = GLOBALS[tdatatype+"^FIELDS"];
 var tfields = tstring.split(fieldsep);
 GLOBALS["IOWARNING"] = "0";
 if(GLOBALS[tdatatype+"^"+tkey+"^DATA"] == undefined){ 
  GLOBALS["IOWARNING"] = "1"; 
  // alert("here");
 } else {
  tdata = GLOBALS[tdatatype+"^"+tkey+"^DATA"].split(fieldsep);
  for (var fi in tfields) {	
   GLOBALS[tfields[fi]] = tdata[fi];
  }
 }
}	


function Delete_Data_Hash (pdatatype, tkey) {
 var recsep = "^"; var fieldsep = String.fromCharCode(126);  //  tilde
 //  datatype[rootkey] key
 tdatatype = pdatatype.split("[")[0];		
 // alert("Delete_Data_Hash - "+tdatatype+" "+tkey);
 delete GLOBALS[tdatatype+"^"+tkey+"^DATA"];
 // update local hash index
 var iarray = GLOBALS[tdatatype+"^INDEX"].split(fieldsep);
 delete iarray[tkey];
 iarray.sort();
 GLOBALS[tdatatype+"^INDEX"] = ""; indexsep=""; 
 for (var k in iarray) { 
  if (iarray[k] != tkey) {GLOBALS[tdatatype+"^INDEX"] = GLOBALS[tdatatype+"^INDEX"]+indexsep+iarray[k]; indexsep=fieldsep; }
 }  
 // setup data delete
 function handleDataDeleteSuccess(data, status) {
	  // alert(o.responseText);
	  if(data != undefined){  }
	  updatelog = data+"<br>"+updatelog;
	  document.getElementById("updateLog").innerHTML = updatelog;
 }
 function handleDataDeleteFailure(xhr, reason, ex) {
		 messageAlert("Error Reason = "+"|"+xhr+"|"+reason+"|"+ex+"|");
	 // messageAlert("You are not connected to the internet at this time");
 } 
 /*
 var dataDeleteCallback =
		{
		  success: handleDataDeleteSuccess,
		  failure: handleDataDeleteFailure,
		  timeout: 30000
 };
 */
 // var dataparms = "&DT="+pdatatype+"&DK="+tkey;
 // var sUrl = EscapeSpecials(JSSitePHPURL()+"/"+JSCodeVersion()+"_javascriptdatadelete.php"+STDPARMS()+dataparms);
 var sUrl = EscapeSpecials(JSSitePHPURL()+"/"+JSCodeVersion()+"_javascriptdatadelete.php"); 
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
    	 DT: pdatatype,
    	 DK: tkey,   	 
     },
     type: "GET",
     dataType: "text",
     timeout: 10000,
     success: handleDataDeleteSuccess,	        
     error: handleDataDeleteFailure
 });	 
 
}

function Write_Data_Hash (pdatatype, tkey) {
 var recsep = "^"; var fieldsep = String.fromCharCode(126);  //  tilde
 // datatype[rootkey] key
 tdatatype = pdatatype.split("[")[0];		
 var tstring = GLOBALS[tdatatype+"^FIELDS"];
 var tfields = tstring.split(fieldsep);
 var twstring = ""; var thstring = ""; var sepw = ""; var seph = "";
 for (var fi in tfields) {	
  twstring = twstring + sepw + tfields[fi] +fieldsep+ GLOBALS[tfields[fi]];
  thstring = thstring + seph + GLOBALS[tfields[fi]];    
  sepw = recsep; seph = fieldsep; 
 }
 GLOBALS[tdatatype+"^"+tkey+"^DATA"] = thstring;
 thstring = ""; seph = ""; 

 // update local hash index
 var keyarray = GLOBALS[tdatatype+"^INDEX"].split(fieldsep);
 var keyexists = "0";
 for(i=0; i<keyarray.length; i++) { if (keyarray[i] == tkey) {keyexists = "1";} }
 if (keyexists == "0") {
  keyarray.push(tkey);
  var newkeyarray = keyarray.sort();
  GLOBALS[tdatatype+"^INDEX"] = ""; 
  var indexsep="";
  for(i=0; i<newkeyarray.length; i++) {
   GLOBALS[tdatatype+"^INDEX"] = GLOBALS[tdatatype+"^INDEX"]+indexsep+newkeyarray[i]; indexsep=fieldsep;
  }
 }
 
 // setup data write back to server
 function handleDataWriteSuccess(data, status) {	 
	 // alert(data);
	 if(data != undefined){  }
	  updatelog = data+"<br>"+updatelog;
	  document.getElementById("updateLog").innerHTML = updatelog;
 }
 function handleDataWriteFailure(xhr, reason, ex) {
	messageAlert("Error Reason = "+"|"+xhr+"|"+reason+"|"+ex+"|");
	 // messageAlert("You are not connected to the internet at this time");
 } 

 var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_javascriptdatawrite.php"; 
 // alert( sUrl );
 // alert( pdatatype+" "+tkey+" "+twstring+" "+Write_Encode(twstring) );
 // updatelog = pdatatype+" "+tkey+" "+twstring+"<br>"+updatelog;
 // document.getElementById("updateLog").innerHTML = updatelog;
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
    	 DT: pdatatype,
    	 DK: tkey,
    	 DS: Write_Encode(twstring),   	 
     },
     type: "POST",
     dataType: "text",
     timeout: 10000,
     success: handleDataWriteSuccess,	        
     error: handleDataWriteFailure
 });	
}

function Write_Encode(instring) {
	// This is a way of getting html through mod_security and avoid issues with post string
	outstring = instring;
	outstring = outstring.replaceAll('<', '^LT^');
	outstring = outstring.replaceAll('>', '^GT^');
	outstring = outstring.replaceAll('&', '^AND^');
// 	outstring = outstring.replaceAll(String.fromCharCode(126), '^TILDE^');	
	reverseoutstring = outstring.split('').reverse().join('');
	return reverseoutstring;
}

String.prototype.replaceAll = function(search, replace)
{
    //if replace is not sent, return original string otherwise it will
    //replace search string with 'undefined'.
    if (replace === undefined) {
        return this.toString();
    }

    return this.replace(new RegExp('[' + search + ']', 'g'), replace);
};


function Get_SelectArrays_Hash (pdatatype, tkeyfield, ttextfield) {
 // datatype[rootkey] keyfieldname textfieldname dateeffective
 tdatatype = pdatatype.split("[")[0];
 var thash = new Array();
 var tarray = Get_Array_Hash(tdatatype);
 for (var tarrayindex in tarray) {
  var tkey = tarray[tarrayindex];
  Get_Data_Hash(tdatatype,tkey);
  if (GLOBALS["IOERROR"] == "0"){ 
   $prefix = "";	   
   $subheaderfieldname = pdatatype+"_subheader";
   if( GLOBALS[$subheaderfieldname] === undefined ) {}
   else { if (GLOBALS[$subheaderfieldname] == "Yes") { $prefix = "--------- "; } }
   thash[GLOBALS[tkeyfield]] = $prefix+GLOBALS[ttextfield]; 		  
  }
  else {

  }
 }
 return thash;
}


function Get_SelectArrays_Hash_DateEffective (pdatatype, tkeyfield, ttextfield, tdateeffectivefield) {
 // datatype[rootkey] keyfieldname textfieldname dateeffective
 tdatatype = pdatatype.split("[")[0];
 var tdateeffective = ""; 
 if (tdateeffectivefield == "currentdate") {tdateeffective = thisYYYY_MM_DD;} else {tdateeffective = GLOBALS[tdateeffectivefield];}
 if (tdateeffective == "") {tdateeffective = thisYYYY_MM_DD;}
 // alert("Get_SelectArrays_Hash_DateEffective - "+tdatatype+" "+tkeyfield+" "+ttextfield+" "+tdateeffectivefield+"==>"+tdateeffective);
 var thash = new Array();
 var tarray = Get_Array_Hash_DateEffective(tdatatype,tdateeffective);
 for (var tarrayindex in tarray) {
  var tkey = tarray[tarrayindex];
  Get_Data_Hash_DateEffective(tdatatype,tkey,tdateeffective);
  if (GLOBALS["IOERROR"] == "0"){ 
   thash[GLOBALS[tkeyfield]] = GLOBALS[ttextfield]; 
   // alert(tkeyfield+"==>"+GLOBALS[tkeyfield]+"==>"+GLOBALS[ttextfield]);
  }
  else {

  }
 }
 return thash;
}


function genericFileUtility(taction,tfilepath,tfilepathto,tfilename1,tfilename2,tfilename3,nextaction) { 
  // alert("genericFileUtility "+displayfiletype);     
  function handleFileUtilitySuccess(data, status) {	  
	  // alert(o.responseText);
	  // $error|$message
	  if(data != undefined){
	   var responsea = new Array(2);
	   responsea = data.split("|");
	   if (responsea[0] == "0") {  }			  
	   else {  }	
	  }
	  stopWait();    
	  if (nextaction == "displayImage2") { displayImage2(); }
	  if (nextaction == "displayFile2") { displayFile2(); }
 }
 function handleFileUtilityFailure(xhr, reason, ex) {
	 messageAlert("Error Reason = "+"|"+xhr+"|"+reason+"|"+ex+"|");
	 // messageAlert("You are not connected to the internet at this time");
 } 
 var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_fileutility.php"; 
 // alert("sendFileUtility - "+sUrl);    
 startWait("Loading"); 
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
    	 Action: taction,
    	 FilePath: tfilepath,    	 
    	 FilePathTo: tfilepathto,    	 
    	 FileName1: tfilename1,
    	 FileName2: tfilename2,    	 
    	 FileName3: tfilename3
     },
     type: "GET",
     dataType: "text",
     timeout: 10000,
     success: handleFileUtilitySuccess,	        
     error: handleFileUtilityFailure
 });	
 
 
}



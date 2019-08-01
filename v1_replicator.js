$(document).ready( function() { 
	
	/*
	var myString   = "https://www.titanesmedellin.com/";
	var myPassword = "myPassword";
	// PROCESS
	var encrypted = CryptoJS.AES.encrypt(myString, myPassword);
	var decrypted = CryptoJS.AES.decrypt(encrypted, myPassword);
	alert(myString);
	alert(encrypted);
	alert(decrypted);
	alert(decrypted.toString(CryptoJS.enc.Utf8));
	*/
	
	myPassword = "myPassword";
	
    // ======================== get data required by this page ================================
	setupWait(); 
	
	function handleDataRequestSuccess(data, status) {
	    // alert(data);
		if(data != undefined){
			// $('#TRACETEXT').html(data); 
			Create_LocalStorage(data);		
		}
		stopWait();	 
	}
	 
	function handleDataRequestFailure(xhr, reason, ex) {
		 messagealert("Error Reason = "+"|"+xhr+"|"+reason+"|"+ex+"|");
		 // messagealert("You are not connected to the internet at this time");
	} 
	  
	var dmwssu_id = "SU00004";
	
	// var datarequestlist = "dmwsreferralorg,dmwscomplexitytype";
	var datarequestlist = "";
	
	datarequestlist = datarequestlist + "dmwsaction" + ",";
	datarequestlist = datarequestlist + "dmwsadmissionreason" + ",";
	datarequestlist = datarequestlist + "dmwsadmissiontype" + ",";
	datarequestlist = datarequestlist + "dmwscomplexity" + ",";
 	datarequestlist = datarequestlist + "dmwscomplexitytype" + ",";
 	datarequestlist = datarequestlist + "dmwscontacttype" + ",";
 	datarequestlist = datarequestlist + "dmwscontract" + ",";
 	datarequestlist = datarequestlist + "dmwsgender" + ",";
 	datarequestlist = datarequestlist + "dmwsitemprovided" + ",";
 	datarequestlist = datarequestlist + "dmwslocationtype" + ",";
 	datarequestlist = datarequestlist + "dmwsprogress" + ",";
 	datarequestlist = datarequestlist + "dmwsreferral" + ",";
 	datarequestlist = datarequestlist + "dmwsreferralorg" + ",";
 	datarequestlist = datarequestlist + "dmwsspecialistreferralorg" + ","; 	
 	datarequestlist = datarequestlist + "dmwssufeedbacktype" + ",";	
 	datarequestlist = datarequestlist + "dmwsreferrerupdate" + ",";
 	datarequestlist = datarequestlist + "dmwsservice" + ",";
 	datarequestlist = datarequestlist + "dmwsserviceprovided" + ",";
 	datarequestlist = datarequestlist + "dmwsservicestatus" + ",";
 	datarequestlist = datarequestlist + "dmwsservicetype" + ",";
 	datarequestlist = datarequestlist + "dmwssu" + ",";
 	datarequestlist = datarequestlist + "dmwssux" + ",";
 	datarequestlist = datarequestlist + "dmwstimeband" + ",";
 	datarequestlist = datarequestlist + "dmwstitle" + ",";
 	datarequestlist = datarequestlist + "dmwsvisit" + ",";
 	datarequestlist = datarequestlist + "dmwsvisitlocation" + ",";
 	datarequestlist = datarequestlist + "dmwswellbeing";
	startWait("Loading");
	var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_javascriptdataprovider.php";
	// alert(sUrl);
	// alert(datarequestlist);	
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
	    	 DataRequestList: datarequestlist
	     },
	     type: "POST",
	     dataType: "text",
	     timeout: 10000,
	     success: handleDataRequestSuccess,	        
	     error: handleDataRequestFailure
	});	

	// =========== LOCAL STORAGE PROCESSING ====================
	
	function Create_LocalStorage (datastring) {
		
		localStorage.clear();
		 var dataRequestRecords = datastring.split("^");
		 var datatype = "";
		 for (var k in dataRequestRecords) {
			  var dataRequestSplit = dataRequestRecords[k].split("|");
			  var dataRequestHeaderData = dataRequestSplit[0];
			  var dataRequestData = dataRequestRecords[k].replace(dataRequestHeaderData+"|",""); 
			  if (dataRequestHeaderData.indexOf("_keys") != -1) {
			   datatype = dataRequestHeaderData.replace("_keys",""); 	  
			   GLOBALS[datatype+"^KEYS"] = dataRequestSplit[1];
			   localStorage.setItem("LDB"+contentEncrypt(datatype+"^KEYS"), contentEncrypt(dataRequestSplit[1]));
			  }
			  if (dataRequestHeaderData.indexOf("_rootkey") != -1) {
			   datatype = dataRequestHeaderData.replace("_rootkey",""); 	  
			   GLOBALS[datatype+"^ROOTKEY"] = dataRequestSplit[1];
			   localStorage.setItem("LDB"+contentEncrypt(datatype+"^ROOTKEY"), contentEncrypt(dataRequestSplit[1]));
			  }
			  dataRequestSplit.shift(); // remove domainid  
			  if (dataRequestHeaderData.indexOf("_header") != -1) { 
			   datatype = dataRequestHeaderData.replace("_header","");  
			   var tstring = ""; var sep = "" ;
			   for (var i in dataRequestSplit) {	
				tstring = tstring+sep+dataRequestSplit[i]; sep = "|";	
			   }
			   GLOBALS[datatype+"^FIELDS"] = tstring;
			   localStorage.setItem("LDB"+contentEncrypt(datatype+"^FIELDS"), contentEncrypt(tstring));
			   if (GLOBALS[datatype+"^KEYS"] == "1") {keyindex = 0;}    
			   if (GLOBALS[datatype+"^KEYS"] == "2") {keyindex = 1;} 
			   if (GLOBALS[datatype+"^KEYS"] == "3") {keyindex = 2;} 
			   GLOBALS[datatype+"^INDEX"] = ""; indexsep="";
			  } 	
			  if (dataRequestHeaderData.indexOf("_data") != -1) { 
			   datatype = dataRequestHeaderData.replace("_data","");
			   // alert(datatype+"^"+dataRequestSplit[keyindex]+"^DATA"+ " - "+keyindex+ " - "+dataRequestData);   
			   GLOBALS[datatype+"^"+dataRequestSplit[keyindex]+"^DATA"] = dataRequestData;
			   localStorage.setItem("LDB"+contentEncrypt(datatype+"^"+dataRequestSplit[keyindex]+"^DATA"), contentEncrypt(dataRequestData));
			   GLOBALS[datatype+"^INDEX"] = GLOBALS[datatype+"^INDEX"]+indexsep+dataRequestSplit[keyindex]; indexsep="|";
			   localStorage.setItem("LDB"+contentEncrypt(datatype+"^INDEX"), contentEncrypt(GLOBALS[datatype+"^INDEX"]));
			  }
			  
			  if (dataRequestHeaderData.indexOf("trace_info") != -1) { } // no action used for trace 
		 }
		 // if (JSPersonId() == "bbra") { alert(GLOBALS["person^INDEX"]); }
		 
		 
		 alert(getUsedLocalStorageSpace());
		 
		 function getUsedLocalStorageSpace() {
			  return Object.keys(window.localStorage).map(function(key) { return localStorage[key].length;}).reduce(function(a,b) { return a+b;});
		 };
		 
		 function contentEncrypt(content) {
			  return CryptoJS.AES.encrypt(content, myPassword);
			  // return content;
		 };
	}

});

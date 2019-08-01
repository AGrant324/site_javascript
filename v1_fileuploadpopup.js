YAHOO.namespace ("BBfileuploadpopup");

//global variables
filesrcurl = "UNKNOWNSRC";
filefilepath = "UNKNOWNDIR";
filename = "UNKNOWN.xxx";
filetype = "xxx";
fileprefix1 = "";
fileprefix2 = "";
fieldselected = "";
fileutilitycompleted = "";
displayfilesrc = "";
finaldisplayfilesrc = "";

xy = Array ( );

function initFile() {
  myLogConfigs = {width: "500px", right: "10em", top: "10%", fontSize: "80%" };
  myLogContainer = null;
  // myLogReader = new YAHOO.widget.LogReader(myLogContainer, myLogConfigs);
  YAHOO.log("initFile called","info");
  // alert("fileuploadpopup called");
  
  
//initialise
  document.getElementById("genericFileMessage").innerHTML = ""   
  document.getElementById("filebrowse_button").value = "";
  setupWait();  

// Define Dialogue Window and Actions
  var handleFileDialogFinalise = function(e) { fileFinalise1(); };
  var handleFileDialogCancel = function() { fileCancel(); };
  genericFileDialogObject = new YAHOO.widget.Dialog("genericFileDialog", 
      { width : "525px",
        // fixedcenter : true,
        zindex : 22,									  
        visible : false, 
		constraintoviewport : true,
		buttons : [ { text:"Finalise File Upload", handler:handleFileDialogFinalise, isDefault:true },
					{ text:"Cancel", handler:handleFileDialogCancel } ]
	   });
  genericFileDialogObject.render();	 
  genericFileDialogObject.hide();
  $('#genericFileDialogouter').appendTo('body');  
  
// Add Listeners   
  var xa=document.getElementsByTagName("button"); 
  for (var ti=0; ti<xa.length; ti++) {	
   var buttonId = xa[ti].id; 
   if(buttonId.search("_filebutton") != -1) {
     // alert(buttonId+" listener added");
	 YAHOO.util.Event.addListener(buttonId,"click",filePopUp1);
   }
  }
  
  YAHOO.util.Event.addListener("fileupload_button", "click", function () {
	  fileUpload();
  },true);  
  
setupWait();
}
   
YAHOO.util.Event.addListener(window, "load", initFile);

// How this works
//
// "fieldname_filebutton" press is detected
// "filepopup" - updates control fields and copies file on server with "tempc" pre-prefix (WAIT) - next routine "filepopup2" 
//                                     or displays a nofile image - next routine "filepopup3"
// "filepopup2" - calls "filedisplay" to display image 
// "filedisplay" - copies file to "domain_temp" if file in "cgi-files" (WAIT) - next routine "filedisplay2" 
//               - or identifies file in existing location if file in "www" - next routine "filedisplay2" 
// "filedisplay2" - chooses what type of display to make depending on file type - next routine "filepopup3" 
// "filepopup3" - shows and positions popup

function filePopUp1(e) { 
 // alert("filePopUp1");	
 var buttonselected = YAHOO.util.Event.getTarget(e);
 fieldselected = buttonselected.id.replace("_filebutton","");	  
 // alert(fieldselected);
 filename = document.getElementById(fieldselected+"_input").value;
 // alert(filename);
 var ipartsa = filename.split(".");
 var filetype = ipartsa.slice(-1)[0]; // Last element
 filesrcurl = document.getElementById(fieldselected+"_filesrcurl").value;   
 filefilepath = document.getElementById(fieldselected+"_filefilepath").value; 
 fileprefix1 = document.getElementById(fieldselected+"_fileprefix1").value; 
 fileprefix2 = document.getElementById(fieldselected+"_fileprefix2").value;
 var fnbitsa = filename.split("_");     
 document.getElementById("filename").innerHTML = fnbitsa[fnbitsa.length - 1];
 document.getElementById("FileUploadPath").value = filefilepath;
 // document.getElementById("FileReplaced").value = filename; 
 document.getElementById("AllowedFileUploadTypes").value = "all"; 
 document.getElementById("TempPrefix").value = "tempc_";      
 document.getElementById("Prefix").value = fileprefix1+"_"+fileprefix2+"_";    
 var filefound = "0";
 if (filename != "") { filefound = "1" } else {filefound = "0"; }
 if (filefound == "1") {
  if (filename.indexOf('tempf_') != -1) {
   oldfilename = filename;     	
   filename = filename.replace('tempf_',""); 
   filepopupFileUtility("Copy",filefilepath,filefilepath,oldfilename,"tempc_"+filename,"filePopUp2");  
  } else {  
   filepopupFileUtility("Copy",filefilepath,filefilepath,filename,"tempc_"+filename,"filePopUp2");    		
  }
 } else {
  document.getElementById("FileReplaced").value = "";	   
  document.getElementById("genericImage").src = "../site_assets/nofile.gif";
  document.getElementById("genericImage").style.width = "50px"; 
  document.getElementById("filename").innerHTML = "No File"; 
  $("#genericImage").show();    
  $("#genericObject").hide();  
  filePopUp3();   
 }
}

function filePopUp2() { 
 // alert("filePopUp2");	
 fileDisplay1();
}

function filePopUp3() {
 //alert("filePopUp3");		
	  genericFileDialogObject.render();
	  genericFileDialogObject.show();
	  genericDialogObject.hide(); 
	  xy = YAHOO.util.Dom.getXY("genericDialog");
	  xy[0] = xy[0] + 0;      
	  xy[1] = xy[1] + 0;
	  YAHOO.util.Dom.setXY("genericFileDialog_c", xy);      
}

function fileUpload() {
 // alert("fileUpload called - "+filefilepath+" -  "+filename);
 var handleFileUploadSuccess = function(o){
  // YAHOO.		 log("The DataWriteSuccess handler was called; this transaction did not abort.  tId: " + o.tId + ".", "info");
  if(o.responseText != undefined){
   // Return string - Error(1/0)|Message|filename|added/updated|filesize|width|height
   // alert(o.responseText);
   responseparms = o.responseText.split("|");		  
   filename = responseparms[2];
   var ipartsa = filename.split(".");
   var filetype = ipartsa.slice(-1)[0]; // Last element
   actfilesize = responseparms[4];		  
   if (responseparms[0] == "0") {
    document.getElementById("filename").innerHTML = removeNamePrefixes(filename);		   
    document.getElementById("genericFileMessage").innerHTML = responseparms[1];		  
    document.getElementById("FileReplaced").value = "/tempc_"+filename;
    fileDisplay1();
   }
   // stopWait();		  
   } 	  
 }
 var handleFileUploadFailure = function(o){	 
		  YAHOO.log("The DataWriteFailure handler was called; this transaction aborted.  tId: " + o.tId + ".", "info", "example");
		  response = "";  
		  response += "<li>Transaction id: " + o.tId + "</li>";
		  response += "<li>HTTP status: " + o.status + "</li>";
		  response += "<li>Status code message: " + o.statusText + "</li>";
		  document.getElementById("genericFileMessage").innerHTML = response;
          stopWait();			  
 }	 
 var uploadFileCallback =
				{
				  upload: handleFileUploadSuccess,
				  failure: handleFileUploadFailure,
				  timeout: 50000			  
 };

 var formObject = document.getElementById('fileuploadform');	 	   
 YAHOO.util.Connect.setForm(formObject, true); // the second argument is true to indicate file upload. 
 var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_fileupload.php"; 	 	 
 // alert("fileUpload - "+sUrl);
 // YAHOO.log("fileUpload - "+sUrl");
 startWait("Loading");  
 YAHOO.util.Connect.asyncRequest('POST', sUrl, uploadFileCallback);	
}

function fileCancel() { 
 // alert("fileCancel called - ");
 filepopupFileUtility("Delete",filefilepath,filefilepath,"tempc_"+filename,"","fileCancel2");	
}

function fileCancel2() { 
 // alert("fileCancel called - ");
 stopWait();  
 genericFileDialogObject.hide(); 
 genericDialogObject.show();  
}

function fileFinalise1() {
 // alert("fileFinalise1 - "+filename);	
 filepopupFileUtility("Copy",filefilepath,filefilepath,"tempc_"+filename,"tempf_"+filename,"fileFinalise2");
} 
 
function fileFinalise2() {
 // alert("fileFinalise2 - "+filename);		
 if ((filesrcurl.indexOf("domain_temp") > -1)&&(filename != "")) {		 
  var fromfilepath = filefilepath;
  var fromfilename = "tempf_"+filename; 
  var tempfilepath = JSDomainWWWPath()+"/domain_temp";   
  var tempfilename = "temp_"+new Date().getTime()+"."+filetype;
  finaldisplayfilesrc = JSDomainWWWURL()+"/domain_temp/"+tempfilename;   
  filepopupFileUtility("Copy",fromfilepath,tempfilepath,fromfilename,tempfilename,"fileFinalise3");
 } else {
  finaldisplayfilesrc = filesrcurl+"/"+"tempf_"+filename+"?ForceRefresh="+new Date().getTime(); // forces cache refresh
  fileFinalise3();
 }
}
 
function fileFinalise3() {
 // alert("fileFinalise3 - "+filename+" - "+finaldisplayfilesrc);		
 var filetypeidentified = "0";
 document.getElementById(fieldselected+"_input").value = "tempf_"+filename;
 document.getElementById(fieldselected+"_image").src = "";	 	
 document.getElementById(fieldselected+"_image").style.width = "";    
 tidname = "#"+fieldselected+"_image"; $(tidname).hide();
 document.getElementById(fieldselected+"_object").data = ""; 	
 document.getElementById(fieldselected+"_object").style.width = "";    
 tidname = "#"+fieldselected+"_object"; $(tidname).hide();
 document.getElementById(fieldselected+"_filename").innerHTML = removeNamePrefixes(filename);

 if ((filetype == "pdf")||(filetype == "PDF")) {
	 filetypeidentified = "1";
	 document.getElementById(fieldselected+"_object").data = finaldisplayfilesrc;	 	
	 document.getElementById(fieldselected+"_object").style.width = "300px";   
     $tidname = "#"+fieldselected+"_object"; $($tidname).show();   	 
 }
 if ((filetype == "jpg")||(filetype == "JPG")||
	     (filetype == "jpeg")||(filetype == "JPEG")||		  
	     (filetype == "gif")||(filetype == "GIF")||	  
	     (filetype == "png")||(filetype == "PNG")) {
   filetypeidentified = "1";	 
   document.getElementById(fieldselected+"_image").src = finaldisplayfilesrc;	 	
   document.getElementById(fieldselected+"_image").style.width = "300px";   
   $tidname = "#"+fieldselected+"_image"; $($tidname).show();	 
 }
 if ((filetype == "docx")||(filetype == "DOCX")||
     (filetype == "doc")||(filetype == "DOC")) {
  filetypeidentified = "1";
  document.getElementById(fieldselected+"_image").src = "../site_assets/WordIcon.jpg";
  document.getElementById(fieldselected+"_image").style.width = "50px"; 	 
  $tidname = "#"+fieldselected+"_image"; $($tidname).show();   	 
 }
 if ((filetype == "pptx")||(filetype == "PPTX")||
     (filetype == "ppt")||(filetype == "PPT")) {
  filetypeidentified = "1";
  document.getElementById(fieldselected+"_image").src = "../site_assets/PowerpointIcon.jpg";
  document.getElementById(fieldselected+"_image").style.width = "50px"; 	 
  $tidname = "#"+fieldselected+"_image"; $($tidname).show();   	 
 }
 if ((filetype == "xlsx")||(filetype == "XLSX")||
     (filetype == "xls")||(filetype == "XLS")) {
  filetypeidentified = "1";
  document.getElementById(fieldselected+"_image").src = "../site_assets/ExcelIcon.jpg";
  document.getElementById(fieldselected+"_image").style.width = "50px"; 	 
  $tidname = "#"+fieldselected+"_image"; $($tidname).show();   	 
 } 
 if (filetypeidentified == "0") {
 } 
 genericFileDialogObject.hide();
 genericDialogObject.show();  
}



function filepopupFileUtility(taction,tfilepath,tfilepathto,tfilename1,tfilename2,nextaction) { 
 // alert("filepopupFileUtility called - "+nextaction);
 fileutilitycompleted = "0";	
 var handleFileUtilitySuccess = function(o){
  // YAHOO.log("The DataWriteSuccess handler was called; this transaction did not abort.  tId: " + o.tId + ".", "info");
  // alert(o.responseText);
  // $error|$message
  if(o.responseText != undefined){
   var responsea = new Array(2);
   responsea = o.responseText.split("|");
   if (responsea[0] == "0") {  }			  
   else {  }
  }
  stopWait();	  
  if (taction == "Copy") { document.getElementById("FileReplaced").value = tfilename2; }
  if (taction == "Delete") { document.getElementById("FileReplaced").value = ""; } 
  if (nextaction == "filePopUp2") { filePopUp2(); }   
  if (nextaction == "fileDisplay2") { fileDisplay2(); }
  if (nextaction == "fileFinalise2") { fileFinalise2(); }  
  if (nextaction == "fileFinalise3") { fileFinalise3(); } 
  if (nextaction == "fileCancel2") { fileCancel2(); }   
 }
 var handleFileUtilityFailure = function(o){
  YAHOO.log("The DataWriteFailure handler was called; this transaction aborted.  tId: " + o.tId + ".", "info", "example");
  response = "";  
  response += "<li>Transaction id: " + o.tId + "</li>";
  response += "<li>HTTP status: " + o.status + "</li>";
  response += "<li>Status code message: " + o.statusText + "</li>";
  document.getElementById("genericFileMessage").innerHTML = response;
  stopWait();
 }
 var fileUtilityCallback =  {
  success: handleFileUtilitySuccess,
  failure: handleFileUtilityFailure,
  timeout: 5000
 };
 dataparms = "&Action=" + taction + "&FilePath=" + tfilepath + "&FilePathTo=" + tfilepathto + "&FileName1=" + tfilename1 + "&FileName2=" + tfilename2; 
 var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_fileutility.php"+STDPARMS()+dataparms; 
 // alert("sendFileUtility - "+sUrl);    
 YAHOO.log("sendFileUtility - "+sUrl,"info");
 startWait("Loading"); 
 YAHOO.util.Connect.asyncRequest('GET', sUrl, fileUtilityCallback);
}

function fileDisplay1() {
 // alert("fileDisplay1 "+filename+" "+filetype);
 var filetyperecognised = "0";
 $("#genericImage").hide();  
 $("#genericObject").hide();
 document.getElementById("filename").innerHTML = removeNamePrefixes(filename);
 if ((filesrcurl == "domain_temp")&&(filename != "")) { 
  var fromfilepath = filefilepath;
  var fromfilename = "tempc_"+filename; 
  var tempfilepath = JSDomainWWWPath()+"/domain_temp";   
  var tempfilename = "temp_"+new Date().getTime()+"."+filetype;
  displayfilesrc = JSDomainWWWURL()+"/domain_temp/"+tempfilename; 
  filepopupFileUtility("Copy",fromfilepath,tempfilepath,fromfilename,tempfilename,"fileDisplay2");
 } else {
  displayfilesrc = filesrcurl+"/"+filename+"?ForceRefresh="+new Date().getTime(); 
  fileDisplay2();
 } 
}

function fileDisplay2() {
 // alert("fileDisplay2");
 if ((filetype == "pdf")||(filetype == "PDF")) {
	 startWait("Loading");
	 loadImage(displayfilesrc, function(status) {		 
		  filetyperecognised = "1";	 
		  document.getElementById("genericObject").data = displayfilesrc;	 
		  document.getElementById("genericObject").style.width = "490px";   
		  $("#genericObject").show();
	      stopWait();	  
	 });		  
 }
 if ((filetype == "jpg")||(filetype == "JPG")||
		     (filetype == "jpeg")||(filetype == "JPEG")||		  
		     (filetype == "gif")||(filetype == "GIF")||	  
		     (filetype == "png")||(filetype == "PNG")) {
	 startWait("Loading");
	 loadImage(displayfilesrc, function(status) {
		  document.getElementById("genericImage").src = displayfilesrc;	 
		  document.getElementById("genericImage").style.width = "490px";   
		  $("#genericImage").show();
	      stopWait();	  
	 });				  
 }
 if ((filetype == "docx")||(filetype == "DOCX")||
		     (filetype == "doc")||(filetype == "DOC")) {
		  document.getElementById("genericImage").src = "../site_assets/WordIcon.jpg";
		  document.getElementById("genericImage").style.width = "50px"; 	 
		  $("#genericImage").show();   	 
 }
 if ((filetype == "pptx")||(filetype == "PPTX")||
		     (filetype == "ppt")||(filetype == "PPT")) {
		  document.getElementById("genericImage").src = "../site_assets/PowerpointIcon.jpg";
		  document.getElementById("genericImage").style.width = "50px"; 	 
		  $("#genericImage").show();  	 
 }
 if ((filetype == "xlsx")||(filetype == "XLSX")||
		     (filetype == "xls")||(filetype == "XLS")) {
		  document.getElementById("genericImage").src = "../site_assets/ExcelIcon.jpg";
		  document.getElementById("genericImage").style.width = "50px"; 	 
		  $("#genericImage").show();   	 
 }
 filePopUp3();	
}
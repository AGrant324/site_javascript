YAHOO.namespace ("BBimagepopup");

//global variables
imagesrcurl = "UNKNOWNSRC";
expimagesrcurl = "UNKNOWNSRC";
imagefilepath = "UNKNOWNDIR";
imagename = "UNKNOWN.jpg";
imagetype = "jpg";
imageprefix1 = "";
imageprefix2 = "";
reqdimagewidth = "flex";
reqdimageheight = "flex";
actimagewidth = "";
actimageheight = "";
actimagesize = "";
imagescaling = 1;
fieldselected = "";
fileutilitycompleted = "";
displayimagesrc = "";
finaldisplayimagesrc = "";
buttonselectedid = "";

cropwrap = "";
cropmask = "";
cropresizeknob = "";
cropresizemask = "";
crop = "";

xy = Array ( );

function initImage() {
  myLogConfigs = {width: "500px", right: "10em", top: "10%", fontSize: "80%" };
  myLogContainer = null;
  // myLogReader = new YAHOO.widget.LogReader(myLogContainer, myLogConfigs);
  YAHOO.log("initImage called","info");
  // alert("imagePopUp ");	  

  document.getElementById("genericImageMessage").innerHTML = "";

// Define Dialogue Window and Actions
  var handleImageDialogFinalise = function(e) { imageFinalise0(crop); };
  var handleImageDialogCancel = function() { imageCancelButton(); };
  genericImageDialogObject = new YAHOO.widget.Dialog("genericImageDialog", 
       { width : "525px",
        // fixedcenter : true,
        zindex : 30,									  
        visible : false, 
		// constraintoviewport : true,
		buttons : [ { text:"Finalise Image Upload", handler:handleImageDialogFinalise, isDefault:true },
					{ text:"Cancel", handler:handleImageDialogCancel } ]
	   });
  genericImageDialogObject.center(); 
  genericImageDialogObject.render();	 
  genericImageDialogObject.hide();
  // $('#genericImageDialogouter').appendTo('main');  
  var crop = new YAHOO.widget.ImageCropper('genericImage', {
      initialXY: [10, 10],
      initWidth: 30,
      initHeight: 30,
      minWidth: 10,
      minHeight: 10,     
      keyTick: 5,
      zindex : 40,
      close: false,         
      shiftKeyTick: 60
  });
//Find Crop Controls 
//  <div id="genericImage_wrap" class="yui-crop" style="width: 498px; height: 375px;">
//  <img id="genericImage" border="0" src="http://localhost/havanthockeyclub/domain_advertisers/tempc_DSC00116.JPG?ForceRefresh=1326384725708" style="width: 498px; height: 375px;">
//  <div class="yui-crop-mask"></div>
//  <div id="yui-gen17" class="yui-draggable yui-resize-knob yui-resize" style="position: absolute; top: 0px; left: 59px; width: 439px; height: 324px;">
//  <div class="yui-crop-resize-mask" style="height: 324px; width: 439px; background-image: url("http://localhost/havanthockeyclub/domain_advertisers/tempc_DSC00116.JPG"); background-position: -60px -1px;"></div>
  
  var da=document.getElementsByTagName("div"); 
  for (var ti=0; ti<da.length; ti++) {	
   var divclass = da[ti].className;
   var divid = da[ti].id;
   if (divid == "genericImage_wrap") {cropwrap = da[ti]; }   
   if (divclass == "yui-crop-mask") {cropmask = da[ti]; }
   if (divclass == "yui-resize yui-draggable yui-resize-knob") {cropresizeknob = da[ti]; }
   if (divclass == "yui-crop-resize-mask") {cropresizemask = da[ti]; }   
   // YAHOO.log(divid+"--->"+divclass,"info");
  }  
  
  
// Add Listeners   
  var xa=document.getElementsByTagName("button"); 
  for (var ti=0; ti<xa.length; ti++) {	
   var buttonId = xa[ti].id; 
   if(buttonId.search("_imagebutton") != -1) {
     // alert(buttonId+" listener added");
	 YAHOO.util.Event.addListener(buttonId,"click",imagePopUp1);
   }
   if(buttonId.search("_imagedeletebutton") != -1) {
     // alert(buttonId+" listener added");	  
	 YAHOO.util.Event.addListener(buttonId,"click",imageDelete);
   }
  }
  YAHOO.util.Event.addListener("imagecrop_button", "click", function () {
	  imageCrop1(crop);
  },true);
  YAHOO.util.Event.addListener("imageupload_button", "click", function () {
	  imageUpload();
  },true);
  
setupWait();
}

YAHOO.util.Event.addListener(window, "load", initImage);

function imagePopUp1(e) { 
 // alert("imagePopUp1 ");		
 var buttonselected = YAHOO.util.Event.getTarget(e);
 buttonselectedid = buttonselected.id;
 // alert(buttonselectedid);
 fieldselected = buttonselected.id.replace("_imagebutton","");	  
 // alert(fieldselected);
 imagename = document.getElementById(fieldselected+"_input").value;
 var ipartsa = imagename.split(".");
 imagetype = ipartsa.slice(-1)[0]; // Last element
 actimagewidth = document.getElementById(fieldselected+"_imagewidth").value;
 actimageheight = document.getElementById(fieldselected+"_imageheight").value;
 reqdimagewidth = document.getElementById(fieldselected+"_reqdimagewidth").value;
 reqdimageheight = document.getElementById(fieldselected+"_reqdimageheight").value; 
 imagesrcurl = document.getElementById(fieldselected+"_imagesrcurl").value; 
 expimagesrcurl = expandSymbolicURL(imagesrcurl); 
 imagefilepath = document.getElementById(fieldselected+"_imagefilepath").value;
 imageprefix1 = document.getElementById(fieldselected+"_imageprefix1").value; 
 imageprefix2 = document.getElementById(fieldselected+"_imageprefix2").value;
 document.getElementById("FileUploadPath").value = imagefilepath;
 // document.getElementById("FileReplaced").value = imagename;	 
 document.getElementById("AllowedFileUploadTypes").value = "images"; 
 document.getElementById("TempPrefix").value = "tempc_";      
 document.getElementById("Prefix").value = imageprefix1+"_"+imageprefix2+"_";    
 var imagefound = "0";
 if (imagename != "") { imagefound = "1" } else {imagefound = "0"; }
 if (imagefound == "1") {
  if (imagename.indexOf('tempf_') != -1) {
   oldimagename = imagename;     	
   imagename = imagename.replace('tempf_',""); 
   imagepopupFileUtility("Copy",imagefilepath,imagefilepath,oldimagename,"tempc_"+imagename,"imagePopUp2");  
  } else {  
   imagepopupFileUtility("Copy",imagefilepath,imagefilepath,imagename,"tempc_"+imagename,"imagePopUp2");  	
  }
 } else {
  document.getElementById("FileReplaced").value = "";	   
  document.getElementById("genericImage").src = "../site_assets/noimage.gif";
  document.getElementById("genericImage").style.width = "50px"; 
  document.getElementById("genericImage").style.height = "50px"; 
  cropwrap.style.width = "50px";   
  cropwrap.style.height = "50px";
  cropresizeknob.style.left = "0px"; 
  cropresizeknob.style.top = "0px";
  cropresizeknob.style.width = "50px";   
  cropresizeknob.style.height = "50px"; 
  cropresizemask.style.width = "50px"; 
  cropresizemask.style.height = "50px"; 
  document.getElementById("imagename").value = "No Image";
  document.getElementById("actimagewidth").value = "50px";
  document.getElementById("actimageheight").value = "50px";
  // genericImageDialogObject.render();	
  // genericImageDialogObject.show();
  $("#genericObject").hide();  
  imagePopUp3();   
 }
}

function imagePopUp2(e) { 
  // alert("imagePopUp2 ");		
  imageDisplay1();
}  
  
function imagePopUp3() {
  // alert("imagePopUp3 ");	
  // alert(buttonselectedid);	
  genericImageDialogObject.render();
  genericImageDialogObject.show();
  // genericDialogObject.hide(); 
  
  /*
  var top = Math.max($(window).height() / 2 - $("#genericImageDialog_c")[0].offsetHeight / 2, 0);
  var left = Math.max($(window).width() / 2 - $("#genericImageDialog_c")[0].offsetWidth / 2, 0);
  $("#genericImageDialog_c").css('top', top + "px");
  $("#genericImageDialog_c").css('left', left + "px");
  // $("#genericImageDialog_c").css('position', 'fixed');
  */
  
  xy = YAHOO.util.Dom.getXY(buttonselectedid);
  xy[0] = xy[0] + 0;      
  xy[1] = xy[1] + 0; 
  YAHOO.util.Dom.setXY("genericImageDialog_c", xy);

  /*
  $('#genericImageDialog_c').css({
	  'position' : 'absolute',
	  'left' : ($(window).innerWidth() / 2) - ($('#genericImageDialog_c').width() / 2),
	  'top' : ($(window).innerHeight() / 2) - ($('#genericImageDialog_c').height() / 2)
  })
  */

}

function imageCrop1(tcrop) {
	// alert("imageCrop1 ");			
	var tleft = cropresizeknob.style.left;	
	var ttop = cropresizeknob.style.top;	
	var twidth = cropresizeknob.style.width;		
	var theight = cropresizeknob.style.height;
    // alert("imageCrop1 called - "+tleft+"_"+ttop+"_"+twidth+"_"+theight);			
	sendCropInfo(tleft,ttop,twidth,theight,"CropOnly","imageCrop2");
}

function imageCrop2() {
 //	 alert("imageCrop2 ");		
 imageDisplay1();
}

function imageUpload(crop) {
 // alert("imageUpload called - "+imagefilepath+" -  "+imagename);
 var handleImageUploadSuccess = function(o){
  // YAHOO.		 log("The DataWriteSuccess handler was called; this transaction did not abort.  tId: " + o.tId + ".", "info");
  if(o.responseText != undefined){
   // Return string - Error(1/0)|Message|filename|added/updated|filesize|width|height
   // alert(o.responseText);
   responseparms = o.responseText.split("|");		  
   imagename = responseparms[2];
   var ipartsa = imagename.split(".");
   imagetype = ipartsa.slice(-1)[0]; // Last element
   actimagesize = responseparms[4];		  
   actimagewidth = responseparms[5];
   actimageheight = responseparms[6];	  
   if (responseparms[0] == "0") {
    document.getElementById("genericImageMessage").innerHTML = responseparms[1];	
    document.getElementById("FileReplaced").value = "/tempc_"+imagename;
    imageDisplay1();
   }
   // stopWait();		  
   } 	  
 }
 var handleImageUploadFailure = function(o){	 
		  YAHOO.log("The DataWriteFailure handler was called; this transaction aborted.  tId: " + o.tId + ".", "info", "example");
		  response = "";  
		  response += "<li>Transaction id: " + o.tId + "</li>";
		  response += "<li>HTTP status: " + o.status + "</li>";
		  response += "<li>Status code message: " + o.statusText + "</li>";
		  document.getElementById("genericImageMessage").innerHTML = response;
          stopWait();			  
 }	 
 var uploadImageCallback =
				{
				  upload: handleImageUploadSuccess,
				  failure: handleImageUploadFailure,
				  timeout: 50000			  
 };
 var formObject = document.getElementById('imageuploadform');	 	   
 YAHOO.util.Connect.setForm(formObject, true); // the second argument is true to indicate file upload. 
 var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_fileupload.php"; 	 	 
 // alert("imageUpload - "+sUrl);
 // YAHOO.log("imageUpload - "+sUrl");
 startWait("Loading");  
 YAHOO.util.Connect.asyncRequest('POST', sUrl, uploadImageCallback);	
}

function imageCancelButton() { 
 // alert("imageCancel called - ");
 imagepopupFileUtility("Delete",imagefilepath,imagefilepath,"tempc_"+imagename,"","imageCancelButton2");	
}

function imageCancelButton2() { 
 // alert("imageCancel2 called - ");
 stopWait();    
 genericImageDialogObject.hide();
 genericImageObject.show();
}

function imageFinalise0() {
	// alert("imageFinalise0 - ");
 if ((imagetype == "jpg")||(imagetype == "JPG")||
		     (imagetype == "jpeg")||(imagetype == "JPEG")||		  
		     (imagetype == "gif")||(imagetype == "GIF")||	  
		     (imagetype == "png")||(imagetype == "PNG")) {	
	tleft = cropresizeknob.style.left;	
	ttop = cropresizeknob.style.top;	
	twidth = cropresizeknob.style.width;		
	theight = cropresizeknob.style.height;		
    // alert("imageFinalise0 called - "+tleft+"_"+ttop+"_"+twidth+"_"+theight);	
	sendCropInfo(tleft,ttop,twidth,theight,"CropOnly","imageFinalise1");
 } else {
  imageFinalise1();	 
 }
} 

function imageFinalise1() {
 // alert("imageFinalise1 - ");	
 imagepopupFileUtility("Copy",imagefilepath,imagefilepath,"tempc_"+imagename,"tempf_"+imagename,"imageFinalise2");
} 

function imageFinalise2() {
	 // alert("imageFinalise2 - "+imagename);		
	 if ((imagesrcurl.indexOf("domain_temp") > -1)&&(imagename != "")) { 
	  var fromimagepath = imagefilepath;
	  var fromimagename = "tempf_"+imagename; 
	  var tempimagepath = JSDomainWWWPath()+"/domain_temp";   
	  var tempimagename = "temp_"+new Date().getTime()+"."+imagetype;
	  finaldisplayimagesrc = JSDomainWWWURL()+"/domain_temp/"+tempimagename;   
	  imagepopupFileUtility("Copy",fromimagepath,tempimagepath,fromimagename,tempimagename,"imageFinalise3");
	 } else {
	  finaldisplayimagesrc = expimagesrcurl+"/"+"tempf_"+imagename+"?ForceRefresh="+new Date().getTime(); // forces cache refresh
	  imageFinalise3();
	 }
}

function imageFinalise3() {
	 // alert("imageFinalise3 - "+imagename+" - "+finaldisplayimagesrc);		
	 var imagetypeidentified = "0";
	 document.getElementById(fieldselected).value = imagename;	 
	 document.getElementById(fieldselected+"_input").value = "tempf_"+imagename;
	 document.getElementById(fieldselected+"_image").src = "";	 	
	 document.getElementById(fieldselected+"_image").style.width = "";
	 document.getElementById(fieldselected+"_imagewidth").value = ""; 
	 document.getElementById(fieldselected+"_imageheight").value = "";   	 
	 tidname = "#"+fieldselected+"_image"; $(tidname).hide();
	 document.getElementById(fieldselected+"_object").data = ""; 	
	 document.getElementById(fieldselected+"_object").style.width = "";    
	 tidname = "#"+fieldselected+"_object"; $(tidname).hide();
	 document.getElementById(fieldselected+"_imagename").innerHTML = removeNamePrefixes(imagename);

	 if ((imagetype == "pdf")||(imagetype == "PDF")) {
        startWait("Loading");			 
		loadImage(displayimagesrc, function(status) {
		 imagetypeidentified = "1";
		 document.getElementById(fieldselected+"_object").data = finaldisplayimagesrc;	 	
		 document.getElementById(fieldselected+"_object").style.width = "300px";   
	     $tidname = "#"+fieldselected+"_object"; $($tidname).show(); 
		});
		stopWait();
	 }
	 if ((imagetype == "jpg")||(imagetype == "JPG")||
		     (imagetype == "jpeg")||(imagetype == "JPEG")||		  
		     (imagetype == "gif")||(imagetype == "GIF")||	  
		     (imagetype == "png")||(imagetype == "PNG")) {
	  startWait("Loading");			 
      loadImage(displayimagesrc, function(status) {		 
	   imagetypeidentified = "1";	 
	   document.getElementById(fieldselected+"_image").src = finaldisplayimagesrc;
	   var displayimagewidth = "200";
	   if (reqdimagewidth != "flex") {displayimagewidth = reqdimagewidth; }
	   if (Number(displayimagewidth) > 200) {displayimagewidth = "200"; }
	   document.getElementById(fieldselected+"_image").style.width = displayimagewidth+"px";;   
	   $tidname = "#"+fieldselected+"_image"; $($tidname).show();
      });
      stopWait(); 
	 }
	 if ((imagetype == "docx")||(imagetype == "DOCX")||
	     (imagetype == "doc")||(imagetype == "DOC")) {
	  imagetypeidentified = "1";
	  document.getElementById(fieldselected+"_image").src = "../site_assets/WordIcon.jpg";
	  document.getElementById(fieldselected+"_image").style.width = "50px"; 	 
	  $tidname = "#"+fieldselected+"_image"; $($tidname).show();   	 
	 }
	 if ((imagetype == "pptx")||(imagetype == "PPTX")||
	     (imagetype == "ppt")||(imagetype == "PPT")) {
	  imagetypeidentified = "1";
	  document.getElementById(fieldselected+"_image").src = "../site_assets/PowerpointIcon.jpg";
	  document.getElementById(fieldselected+"_image").style.width = "50px"; 	 
	  $tidname = "#"+fieldselected+"_image"; $($tidname).show();   	 
	 }
	 if ((imagetype == "xlsx")||(imagetype == "XLSX")||
	     (imagetype == "xls")||(imagetype == "XLS")) {
	  imagetypeidentified = "1";
	  document.getElementById(fieldselected+"_image").src = "../site_assets/ExcelIcon.jpg";
	  document.getElementById(fieldselected+"_image").style.width = "50px"; 	 
	  $tidname = "#"+fieldselected+"_image"; $($tidname).show();   	 
	 } 
	 if (imagetypeidentified == "0") {
	 } 
	 genericImageDialogObject.hide();
	 // genericDialogObject.show();  
}

function sendCropInfo(tl,tt,tw,th,taction,nextaction) {	
 // alert("sendCropInfo called - "+tl+"-"+tt+"-"+tw+"-"+th);
 var handleImageCropSuccess = function(o){
     // YAHOO.log("The DataWriteSuccess handler was called; this transaction did not abort.  tId: " + o.tId + ".", "info");
	 // alert(o.responseText);
	 // $error|$message|$cropwidth|$cropheight|$action|$cropscaling
	 if(o.responseText != undefined){
	  var responsea = new Array(4);
	  responsea = o.responseText.split("|");
	  actimagewidth = responsea[2];
	  actimageheight = responsea[3];
	  document.getElementById("genericImageMessage").innerHTML = "Image cropped to "+actimagewidth+" x "+actimageheight;	  
//	  if (responsea[0] == "0") {
//	   if (responsea[4] == "Finalise") {
//        imageFinalise()		
//	   } 
//	   if (responsea[4] == "CropOnly") {
//	    document.getElementById("genericImageMessage").innerHTML = "Image cropped to "+actimagewidth+" x "+actimageheight;
//	    imageDisplay1();  
//	   }
//      }
     }
     stopWait();
     if (nextaction == "imageCrop2") { imageCrop2(); } 
     if (nextaction == "imageFinalise1") { imageFinalise1(); } 
 }
 var handleImageCropFailure = function(o){
	  YAHOO.log("The DataWriteFailure handler was called; this transaction aborted.  tId: " + o.tId + ".", "info", "example");
	  response = "";  
	  response += "<li>Transaction id: " + o.tId + "</li>";
	  response += "<li>HTTP status: " + o.status + "</li>";
	  response += "<li>Status code message: " + o.statusText + "</li>";
	  document.getElementById("genericImageMessage").innerHTML = response;
	  stopWait();		  
 }
 var cropImageCallback =
			{
			  success: handleImageCropSuccess,
			  failure: handleImageCropFailure,
			  timeout: 5000
 };
 dataparms = '&Action=' + taction +'&CropImagePath=' + imagefilepath + '&CropImageName=tempc_' + imagename+ '&CropImageFinalName=tempf_' + imagename;; 
 dataparms = dataparms+'&CropTop=' + tt + '&CropLeft=' + tl + '&CropHeight=' + th + '&CropWidth=' + tw;
 dataparms = dataparms+'&CropScaling=' + imagescaling;
 dataparms = dataparms+'&ReqdImageHeight=' + reqdimageheight + '&ReqdImageWidth=' + reqdimagewidth; 
 var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_imagecrop.php"+STDPARMS()+dataparms; 
 // alert("sendCropInfo - "+sUrl);    
 YAHOO.log("sendCropInfo - "+sUrl,"info");
 YAHOO.util.Connect.asyncRequest('GET', sUrl, cropImageCallback);
 startWait("Loading");
}

function imagepopupFileUtility(taction,tfilepath,tfilepathto,tfilename1,tfilename2,nextaction) { 
 // alert("imagepopupFileUtility called - ");
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
  if (taction == "Copy") { document.getElementById("FileReplaced").value = tfilename2; }
  if (taction == "Delete") { document.getElementById("FileReplaced").value = ""; } 
  if (nextaction == "imagePopUp2") { imagePopUp2(); }   
  if (nextaction == "imageDisplay2") { imageDisplay2(); }
  if (nextaction == "imageFinalise2") { imageFinalise2(); }  
  if (nextaction == "imageFinalise3") { imageFinalise3(); } 
  if (nextaction == "imageCancelButton2") { imageCancelButton2(); }   
  // stopWait();	
 }
 var handleFileUtilityFailure = function(o){
  YAHOO.log("The DataWriteFailure handler was called; this transaction aborted.  tId: " + o.tId + ".", "info", "example");
  response = "";  
  response += "<li>Transaction id: " + o.tId + "</li>";
  response += "<li>HTTP status: " + o.status + "</li>";
  response += "<li>Status code message: " + o.statusText + "</li>";
  document.getElementById("genericImageMessage").innerHTML = response;
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

function imageDisplay1() {
 // alert("imageDisplay1 "+imagename+" "+imagetype);
 var filetyperecognised = "0";	
 $("#genericImage_wrap").hide();  
 $("#genericObject").hide();
 document.getElementById("imagename").innerHTML = removeNamePrefixes(imagename);
 if (imagesrcurl.indexOf("domain_temp") > -1) {  
  var fromimagepath = imagefilepath;
  var fromimagename = "tempc_"+imagename; 
  var tempimagepath = JSDomainWWWPath()+"/domain_temp";   
  var tempimagename = "temp_"+new Date().getTime()+"."+imagetype;
  displayimagesrc = JSDomainWWWURL()+"/domain_temp/"+tempimagename+"?ForceRefresh="+new Date().getTime();  
  imagepopupFileUtility("Copy",fromimagepath,tempimagepath,fromimagename,tempimagename,"imageDisplay2"); 
 } else {
  displayimagesrc = expimagesrcurl+"/tempc_"+imagename+"?ForceRefresh="+new Date().getTime();
  // alert(displayimagesrc);
  imageDisplay2();  
 }
}
 
function imageDisplay2() {
 // alert("imageDisplay2 ");		
 var handleGetImageSizeSuccess = function(o){
	   // YAHOO.log("The GetImageSizeSuccess handler was called; this transaction did not abort.  tId: " + o.tId + ".", "info");
	   if(o.responseText != undefined){  }
	   // imagegetsize.php returns "$error|$message|$width|$height"

	   // alert(o.responseText);
	   var responsea = new Array(4);
	   responsea = o.responseText.split("|");
	   if (responsea[0] == "0") {
			   actimagewidth = responsea[2];
	           actimageheight = responsea[3];	
	           imageDisplay3()
	   } else {
		       // document.getElementById(genericImageMessage).innerHTML = o.responseText;
		   	   alert("Error - Image not found - Please Delete and Reload to fix.. "+o.responseText);
	   }
	   stopWait();
 }
 var handleGetImageSizeFailure = function(o){
	  YAHOO.log("The DataWriteFailure handler was called; this transaction aborted.  tId: " + o.tId + ".", "info", "example");
	  response = "";  
	  response += "<li>Transaction id: " + o.tId + "</li>";
	  response += "<li>HTTP status: " + o.status + "</li>";
	  response += "<li>Status code message: " + o.statusText + "</li>";
	  document.getElementById("genericImageMessage").innerHTML = response;
    stopWait();		  
 }
 var getImageSizeCallback =
			{
			  success: handleGetImageSizeSuccess,
			  failure: handleGetImageSizeFailure,
			  timeout: 5000
 };
 dataparms = '&ImageFile=' + imagefilepath+"/"+"tempc_"+imagename; 
 var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_imagegetsize.php"+STDPARMS()+dataparms; 
 // alert("sendgetImageSize - "+sUrl);    
 YAHOO.log("sendgetImageSize - "+sUrl,"info");
 startWait("Loading");
 YAHOO.util.Connect.asyncRequest('GET', sUrl, getImageSizeCallback);
}

function imageDisplay3() { 
 // alert("imageDisplay3 "+displayimagesrc);	
 if ((imagetype == "pdf")||(imagetype == "PDF")) {
  // document.getElementById("genericObject").data = expimagesrcurl+"/tempc_"+imagename+"?ForceRefresh="+new Date().getTime(); // forces cache refresh
  startWait("Loading");
  loadImage(displayimagesrc, function(status) {	  
   document.getElementById("genericObject").data = displayimagesrc;  
   document.getElementById("genericObject").style.width = "500px";
   var fnbitsa = imagename.split("_");
   document.getElementById("genericImageProperties").innerHTML = fnbitsa[fnbitsa.length - 1];	   
   $("#imagecrop_button").hide();   
   $("#genericObject").show();
   stopWait();	  
  });	 
 } else {
  startWait("Loading");
  loadImage(displayimagesrc, function(status) {	  	 
   document.getElementById("genericImage").src = displayimagesrc;
   imagescaling = 1; 
   if (actimagewidth > 500) {imagescaling = 500/actimagewidth; displayimageheight = imagescaling*actimageheight; displayimagewidth = 500;}
   else {displayimagewidth = actimagewidth*1; displayimageheight = actimageheight*1;}
   document.getElementById("genericImage").style.width = (displayimagewidth.toFixed(0))+"px";
   document.getElementById("genericImage").style.height = (displayimageheight.toFixed(0))+"px";  
   // document.getElementById("genericImage_wrap").style.width = (displayimagewidth.toFixed(0))+"px";   
   // document.getElementById("genericImage_wrap").style.height = (displayimageheight.toFixed(0))+"px";   
   cropwrap.style.width = (displayimagewidth.toFixed(0))+"px";   
   cropwrap.style.height = (displayimageheight.toFixed(0))+"px";   
   cropresizeknob.style.left = "0px"; 
   cropresizeknob.style.top = "0px";
   cropresizeknob.style.width = (displayimagewidth.toFixed(0))+"px"; 
   cropresizeknob.style.height = (displayimageheight.toFixed(0))+"px";
   // cropresizemask.style.backgroundImage="url('"+imagefilepath+"/tempc_"+imagename+"?ForceRefresh="+new Date().getTime();+"')";
   // cropresizemask.style.left = "0px"; 
   // cropresizemask.style.top = "0px";
   cropresizemask.style.width = (displayimagewidth.toFixed(0))+"px"; 
   cropresizemask.style.height = (displayimageheight.toFixed(0))+"px";
   document.getElementById("imagename").value = imagename;
   document.getElementById("reqdimagewidth").value = reqdimagewidth;
   document.getElementById("reqdimageheight").value = reqdimageheight; 
   document.getElementById("actimagewidth").value = actimagewidth;
   document.getElementById("actimageheight").value = actimageheight;
   document.getElementById("imagescaling").value = ((imagescaling*100).toFixed(0))+"%";
   document.getElementById("genericImageProperties").innerHTML = removeNamePrefixes(imagename)+" ("+actimagewidth+"w x "+actimageheight+"h)";
   $("#imagecrop_button").show();     
   $("#genericImage_wrap").show(); 
   stopWait();	  
  });	    
 }
 imagePopUp3();
}

function imageDelete(e) {
 var tfieldname = e.target.id.replace("_imagedeletebutton","");	
 // alert("deleteImage "+tfieldname);
 if (confirm('Are you sure you want to delete this image')) { 
		  document.getElementById(tfieldname+"_input").value = ""; 
		  document.getElementById(tfieldname+"_imagename").innerHTML = "";  
		  document.getElementById(tfieldname+"_image").src = "../site_assets/nofile.gif";
		  document.getElementById(tfieldname+"_image").style.width = "50px";
		  document.getElementById(tfieldname+"_imagebutton").innerHTML = "Upload New Image";	
		  var objectfield = "#"+tfieldname+"_object"; $(objectfield).hide();	  
		  var imagefield = "#"+tfieldname+"_image"; $(imagefield).show();
 } else {
			 	 
 }
}	
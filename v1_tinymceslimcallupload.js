function tinyMCESlimCallUpload(field_name, url, type, win) {
	

	
var outURL = document.getElementById("JSSitePHPURL").value;
var uploadTo = document.getElementById("TinyMCEUploadTo").value;
var uploadId = document.getElementById("TinyMCEUploadId").value;

if (type == "image") {  // this is an image upload 

	var uploadWidth = "800"; // default
	var uploadHeight = "flex"; // default
	var uploadFixedSize = ""; // default
	var specifiedwidth = $("[aria-label='Width']").first().val(); 
	var specifiedheight = $("[aria-label='Height']").first().val();
	// alert(specifiedwidth+" "+specifiedheight);	

	if ((specifiedwidth != "")&&(specifiedheight != "")) {
		uploadWidth = specifiedwidth;
		uploadHeight = specifiedheight;
		uploadFixedSize = specifiedwidth+"x"+specifiedheight;		
	}
	if ((specifiedwidth != "")&&(specifiedheight == "")) {
		uploadWidth = specifiedwidth;
		uploadHeight = "flex";
		uploadFixedSize = "";		
	}	
	if ((specifiedwidth == "")&&(specifiedheight != "")) {
		uploadWidth = "flex";
		uploadHeight = specifiedheight;
		uploadFixedSize = "";		
	}
		
	// ../site_assets/750x450.png
	if (url.indexOf('/site_assets/') !=-1) {	// this must be a formatted section
		bitsa = url.split('/');	
		bitsb = bitsa[bitsa.length - 1].split('.');
		if (bitsb[0].indexOf('flex') !=-1) {
			bitsc = bitsb[0].split('x');
			uploadWidth = bitsc[0];
			uploadHeight = bitsc[1];
			uploadFixedSize = "";
		} else {		
			bitsc = bitsb[0].split('x');
			uploadWidth = bitsc[0];
			uploadHeight = bitsc[1];
			uploadFixedSize = uploadWidth+'x'+uploadHeight;		
		}
	}
	// ../xxxxx/domain_media/Webpage_Home_126_0219_FixedSize_750x450.JPG
	if (url.indexOf('_FixedSize_') !=-1) {	// this must be a formatted section
		bitsa = url.split('_');	
		bitsb = bitsa[bitsa.length - 1].split('.');
		if (bitsb[0].indexOf('flex') !=-1) {
			bitsc = bitsb[0].split('x');
			uploadWidth = bitsc[0];
			uploadHeight = bitsc[1];
			uploadFixedSize = "";
		} else {		
			bitsc = bitsb[0].split('x');
			uploadWidth = bitsc[0];
			uploadHeight = bitsc[1];
			uploadFixedSize = uploadWidth+'x'+uploadHeight;		
		}	
	}
	// alert(uploadWidth+" "+uploadHeight+" "+uploadFixedSize);
	// alert("Field_Name: " + field_name + "\nURL: " + url + "\nType: " + type + "\nWin: " + win +  "\nuploadTo: " + uploadTo + "\nuploadId: " + uploadId + "\nuploadWidth: " + uploadWidth + "\nuploadHeight: " + uploadHeight); // debug/testing
	
	var uploadroutine = '_tinyslimimageuploadout.php?';
	outURL = outURL+"/"+document.getElementById("JSCodeVersion").value+uploadroutine;
	outURL = outURL+'ServiceId='+document.getElementById("JSServiceId").value;
	outURL = outURL+'&DomainId='+document.getElementById("JSDomainId").value;
	outURL = outURL+'&PersonId='+document.getElementById("JSPersonId").value;
	outURL = outURL+'&ModeId='+document.getElementById("JSModeId").value;
	outURL = outURL+'&LoginModeId='+document.getElementById("JSLoginModeId").value;
	outURL = outURL+'&TinyMCEUploadTo='+uploadTo;
	outURL = outURL+'&TinyMCEUploadId='+uploadId;
	outURL = outURL+'&TinyMCEUploadWidth='+uploadWidth;
	outURL = outURL+'&TinyMCEUploadHeight='+uploadHeight;
	outURL = outURL+'&TinyMCEUploadFixedSize='+uploadFixedSize;
	
	tinyMCE.activeEditor.windowManager.open({
	        file : outURL,
	        title : 'Image Upload',
	        width : uploadWidth,  // Your dimensions may differ - toy around with them!
	//        height : (150+(uploadHeight*1.5)),
	        height : (500),
	        resizable : "yes",
	        inline : "yes",  // This parameter only has an effect if you use the inlinepopups plugin!
	        close_previous : "yes"
	}, {
	        window : win,
	        input : field_name
	});
	return false;
	
} else { // File upload
	
	var uploadroutine = '_tinyfileuploadout.php?';
	outURL = outURL+"/"+document.getElementById("JSCodeVersion").value+uploadroutine;
	outURL = outURL+'ServiceId='+document.getElementById("JSServiceId").value;
	outURL = outURL+'&DomainId='+document.getElementById("JSDomainId").value;
	outURL = outURL+'&PersonId='+document.getElementById("JSPersonId").value;
	outURL = outURL+'&ModeId='+document.getElementById("JSModeId").value;
	outURL = outURL+'&LoginModeId='+document.getElementById("JSLoginModeId").value;
	outURL = outURL+'&TinyMCEUploadTo='+document.getElementById("TinyMCEUploadTo").value;
	outURL = outURL+'&TinyMCEUploadId='+document.getElementById("TinyMCEUploadId").value;

	tinyMCE.activeEditor.windowManager.open({
	        file : outURL,
	        title : 'File Upload',
	        width : 620,  // Your dimensions may differ - toy around with them!
	        height : 400,
	        resizable : "yes",
	        inline : "yes",  // This parameter only has an effect if you use the inlinepopups plugin!
	        close_previous : "yes"
	}, {
	        window : win,
	        input : field_name
	});
	return false;

}	
	
}


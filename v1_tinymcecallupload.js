function tinyMCECallUpload(field_name, url, type, win) {
	
var outURL = document.getElementById("JSSitePHPURL").value;
var uploadTo = document.getElementById("TinyMCEUploadTo").value;
var uploadId = document.getElementById("TinyMCEUploadId").value;
// alert("Field_Name: " + field_name + "\nURL: " + url + "\nType: " + type + "\nWin: " + win +  "\nuploadTo: " + uploadTo); // debug/testing
var uploadroutine = '_tinyfileuploadout.php?';
outURL = outURL+"/"+document.getElementById("JSCodeVersion").value+uploadroutine;
outURL = outURL+'ServiceId='+document.getElementById("JSServiceId").value;
outURL = outURL+'&DomainId='+document.getElementById("JSDomainId").value;
outURL = outURL+'&PersonId='+document.getElementById("JSPersonId").value;
outURL = outURL+'&ModeId='+document.getElementById("JSModeId").value;
outURL = outURL+'&LoginModeId='+document.getElementById("JSLoginModeId").value;
outURL = outURL+'&TinyMCEUploadTo='+document.getElementById("TinyMCEUploadTo").value;
outURL = outURL+'&TinyMCEUploadId='+document.getElementById("TinyMCEUploadId").value;
// myRef = window.open(outURL,"mywin","left=300,top=300,width=600,height=300,toolbar=0,resizable=0");

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


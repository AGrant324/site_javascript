$(document).ready( function() {
	$("#FinishUpload").click(function() {
	    // alert("FinishUpload");
		var URL = document.getElementById("uploadURL").value;
		// alert(URL);
	    var args = top.tinymce.activeEditor.windowManager.getParams();	
        var win = args.window;
        var input = args.input;
        // alert(URL+"|"+win+"|"+input+"|");

        if (URL != "UPLOADERROR") {      
	         // insert information now
	         win.document.getElementById(input).value = URL;
	         urla = URL.split("/");
	         var mediafilename = urla[(urla.length)-1];
	         // alert(mediafilename);       
	         // are we an image browser
	         if (typeof(win.ImageDialog) != "undefined")
	         {
	            // we are, so update image dimensions and preview if necessary
	            if (win.ImageDialog.getImageData) win.ImageDialog.getImageData();
	            if (win.ImageDialog.showPreviewImage) win.ImageDialog.showPreviewImage(URL);
	         }
        
        } else {
        	
        	
        }

        // close popup window
        top.tinymce.activeEditor.windowManager.close();	
	});

});	

$(document).ready( function() {
	
	// alert("tinyslimimagepopup");
	
	var reqdtinyimagewidth = $('#TinyMCEUploadWidth').val();
	var reqdtinyimageheight = $('#TinyMCEUploadHeight').val();
	var reqdtinyimagefixedsize = $('#TinyMCEUploadFixedSize').val();
	var maxuploadfilesize = $('#MaxUploadFileSize').val();	
	var reqdtinyimageratio = "free";
	if ( reqdtinyimagefixedsize != "" ) {
		reqdtinyimageratio = reqdtinyimagewidth+':'+reqdtinyimageheight;
	}	
	var existingtinyimagename = "";	
	var existingtinyimagechanged = "0";	
	var latesttinyselectedfile = "";		
	var latesttinyselectedfilename = "";
	var latestselectedfilesize = 0;

	
	var $cropper = $('#myTinyImageCropper').slim({
	    ratio: reqdtinyimageratio,    
	    minSize: {
	        width: 50,
	        height: 50,
	    },
	    post: "input, actions",
	    crop: {
	        x: 0,
	        y: 0,
	        width: 100,
	        height: 100
	    },
	    download: false,    
	    willSave: function(data, ready) {
	        // alert('saving!');
	        ready(data);
	    },
	    // label: 'Drop your new image here - or click to browse..',
	    label: 'Click to add image..',
	    buttonConfirmLabel: 'Ok',
	    meta: {
	        userId:'1234'
	    }
	});
	
	$('#tinyimage_upload_button').on('click', function(event) {
		// alert('upload_button clicked');
        $('#tinyimage_upload_button').hide();
        $('#tinyimage_cancel_button').hide();            
        $('#tinyimage_loading_button').show();	
        
        var filesizetext = "Loading "+fileSizeText(latestselectedfilesize,maxuploadfilesize);
        $('#tinyimage_imagesizemesssage').html(filesizetext);		
		var myformdata = new FormData($("#tinyslimform")[0]);
		myformdata.append("ExistingTinyImageChanged", existingtinyimagechanged);
		if ( existingtinyimagechanged == "1" ) {  
			myformdata.append("myTinyImage", latesttinyselectedfile, latesttinyselectedfilename); 	
		} else {		
			myformdata.append("ExistingTinyImageName", existingtinyimagename);
		}
		var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_tinyslimimageuploadin.php";
		// alert(sUrl);
		// setupWait(); 
	    $.ajax({
	        type: "POST",
	        url: sUrl,
	        data: myformdata,
	        processData: false,
	        contentType: false,
	        dataType: "text",
	        success: function(data, textStatus, jqXHR) {
	           // alert(data);
	           // document.getElementById("updateLog").innerHTML = data;
	           // Return string - Error(1/0)|Message|outfilename|added/updated|filesize|width|height
	        	// stopWait(); 
	            var databits = data.split('|');
	        	var fnbits = databits[2].split('_');
	        	var uploadto = fnbits[0];
	        	var uploaddir = "domain_media";
        		if (uploadto == "TemplateElement") { uploaddir = "domain_style"; }
        		if (uploadto == "FRS") { uploaddir = "domain_frs"; }
	           var returnedimageurl = JSDomainWWWURL()+'/'+uploaddir+'/'+databits[2];
	           // alert(returnedimageurl);
	
		   	   var args = top.tinymce.activeEditor.windowManager.getParams();	
	           var win = args.window;
	           var input = args.input;
	           // alert(returnedimageurl+"|"+win+"|"+input+"|");
	
	           if (returnedimageurl != "UPLOADERROR") {      
		   	         // insert information now
	        	     d = new Date();
		   	         win.document.getElementById(input).value = returnedimageurl+"?"+d.getTime();
		   	         urla = returnedimageurl.split("/");
		   	         var mediafilename = urla[(urla.length)-1];
		   	         // alert(mediafilename);       
		   	         // are we an image browser
		   	         if (typeof(win.ImageDialog) != "undefined") {
		   	            // we are, so update image dimensions and preview if necessary
		   	            if (win.ImageDialog.getImageData) win.ImageDialog.getImageData();
		   	            if (win.ImageDialog.showPreviewImage) win.ImageDialog.showPreviewImage(URL);
		   	         }
	           } else {
	        	   // stopWait(); 
	           }
	           // close popup window
	           top.tinymce.activeEditor.windowManager.close();		           
	        },
	        error: function(data, textStatus, jqXHR) {
	           //process error msg
	        	alert("error - "+jqXHR);
	        },
	    });
	    
	})	
	
	
	$('#tinyimage_cancel_button').on('click', function(event) {
		top.tinymce.activeEditor.windowManager.close();
	})		


	$('#myTinyImageCropper').on('change', function(event) {
	    // alert('#'+imagefieldname+'_myTinyImageCropper - changed');
		existingtinyimagechanged = "1";	
		// event.preventDefault();  
	    // event.stopPropagation();
		latesttinyselectedfile = event.target.files[0];
		latesttinyselectedfilename = event.target.files[0].name;
	    latestselectedfilesize = event.target.files[0].size;
		var filesizetext = "This image is "+fileSizeText(latestselectedfilesize,maxuploadfilesize);			
        $('#tinyimage_imagesizemesssage').html(filesizetext);
	})
	
	$('#myTinyImageCropper').parent().on("drop", function(event) {	
		// alert("drop");
		existingtinyimagechanged = "1";	
		event.preventDefault();  
	    event.stopPropagation();
	    latesttinyselectedfile = event.originalEvent.dataTransfer.files[0];
	    latesttinyselectedfilename = event.originalEvent.dataTransfer.files[0].name; 
	    latestselectedfilesize = event.target.files[0].size;
		var filesizetext = "This image is "+fileSizeText(latestselectedfilesize,maxuploadfilesize);			
        $('#tinyimage_imagesizemesssage').html(filesizetext);	    
	});	
	
	$('.slim-btn-remove').on('click', function(event) {
		$('#tinyimage_imagesizemesssage').html("");
	})	
	
	
});    

$(document).ready( function() {

	// alert("dropzonefileuploadpopup");
	
	var filefieldname = "";
	var existingfilename = "";
	var existingfilechanged = "0";	
	var latestselectedfile = "";		
	var latestselectedfilename = "";
	var latestselectedfilesize = 0;	
	var maxuploadfilesize = "";
	var myDropzone = "";
	
	Dropzone.autoDiscover = false;
	
	$('.dropzone').each(function() {
	    var thisid = $(this).attr('id');
	    myDropzone = new Dropzone("#"+thisid, { 
	    	maxFiles: 1,
	        autoProcessQueue:false
	    });	
	});	

	
	$('.dropzonefilepopup').each(function() {
		   
	    var bits = this.id.split("_");  // filefieldname_dropzonefilepopup
	    filefieldname = bits[0]+"_"+bits[1];
	    
	    $('#'+filefieldname+'_FileUploadName').hide();  //  had to include input in order for server to receive $_FILES
	    
		if ( $("#"+filefieldname+"_dropzonefileupdatebutton").html() == "Add File" ) {
			$("#"+filefieldname+"_dropzonefileremovebutton").hide();		
		}
		
		$("#"+filefieldname+"_dropzonefilepopup").dialog({
			autoOpen: false,
			width: "500",
			height: "370",
			overflow:"auto",
		    buttons: {
		        "Cancel": function() { $("#"+filefieldname+"_dropzonefilepopup").dialog("close"); }
		    }			
		});	
		
	    $('#'+filefieldname+'_clear_button').on('click', function(event) {
			myDropzone.removeAllFiles(true);
		})	
		
		$('#'+filefieldname+'_upload_button').on('click', function(event) {
			
			// alert(filefieldname+'_FileUploadName');
			// alert($('#'+filefieldname+'_FileUploadName')[0].files[0]['name']);
			
			myDropzone.processQueue();
			// alert('upload_button clicked - '+this.id+" - "+latestselectedfilename);				
            $('#'+filefieldname+'_upload_button').hide();
            $('#'+filefieldname+'_cancel_button').hide();            
            $('#'+filefieldname+'_loading_button').show();
            
            var input = document.querySelector('input[type=file]'),
            file = input.files[0];
            
			var form = document.getElementById('dropzoneform');            
            // var form = $('form')[0]; // You need to use standard javascript object here
			var myformData = new FormData(form); 
			// myformData.append('FileUploadName', $('#'+filefieldname+'_FileUploadName')[0].files[0]); 
			myformData.append('FileUploadName', file);
			
			var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_dropzonefileupload.php";
			// alert(sUrl);
		    $.ajax({
		        type: "POST",
		        url: sUrl,
		        data: myformData,
		        processData: false,
		        contentType: false,
		        dataType: "text",
		        success: function(data, textStatus, jqXHR) {
		           // alert("("+data+")");
		           document.getElementById("updateLog").innerHTML = data;
		           // Return string - Error(1/0)|Message|outfilename|added/updated|filesize|width|height	
		           var databits = data.split('|');
		           var errorcode = databits[0].replace(" ", ""); // Nasty - removes leading  blank
		           if (errorcode == "0") {
		        	   $("#"+filefieldname+"_upload_message").val(databits[1]);
		        	   var returnedfileurl = JSDomainWWWURL()+'/domain_temp/'+databits[2];          	           
			           // alert(returnedfileurl);
			           d = new Date();
			           $("#"+filefieldname+"_imageview").attr("src",returnedfileurl+"?"+d.getTime());
			           $("#"+filefieldname+"_imageview").show(); 
			           $("#"+filefieldname+"_filename").val(databits[2]);
			           $('#'+filefieldname+'_dropzonefilepopup').dialog("close");
			           $("#"+filefieldname+"_dropzonefileupdatebutton").html("Update File");
			           $("#"+filefieldname+"_dropzonefileremovebutton").show();		        	   
		           } else {
		        	   alert("error - "+data);
		           }
		        },
		        error: function(data, textStatus, jqXHR) {
		           //process error msg
		        	alert("error - "+jqXHR);
		        },
		    });
		    
		})	
		
		$('.dropzonefileupdatebutton').on('click', function(event) {
			var thisid = event.target.id;
		    var bits = thisid.split("_");  // filefieldname_dropzonefilebutton
		    filefieldname = bits[0]+"_"+bits[1];
		   
	        $('#'+filefieldname+'_upload_button').show();
	        $('#'+filefieldname+'_loading_button').hide();
	        $('#'+filefieldname+'_cancel_button').show();
	        
	        $("#"+filefieldname+"_upload_message").val("");
	       
	    	$("#"+filefieldname+"_dropzonefilepopup").dialog("open");    		    	
		})
		
		$('.dropzonefileremovebutton').on('click', function(event) {
			var thisid = event.target.id;
		    var bits = thisid.split("_");  // filefieldname_dropzonefilebutton
		    if (confirm('Are you sure you want to remove this file.')) { 
			    filefieldname = bits[0]+"_"+bits[1];
		        $("#"+filefieldname+"_imageview").attr("src","../site_assets/nofile.gif");
		        $("#"+filefieldname).val("");
		        $("#"+filefieldname+"_filename").val("");
		        $("#"+filefieldname+"_dropzonefileupdatebutton").html("Add File");
		        $("#"+filefieldname+"_dropzonefileremovebutton").hide();
		    }
		})		
		
	
	});	
	
	
});
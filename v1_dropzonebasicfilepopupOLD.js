
$(document).ready( function() {

	// alert("dropzonebasicfileuploadpopup");
	
	var filefieldname = "";
	var existingfilename = "";
	var existingfilechanged = "0";	
	var latestselectedfile = "";		
	var latestselectedfilename = "";
	var latestselectedfilesize = 0;	
	var maxuploadfilesize = "";
	var myDropzone = "";
	
	var displayfilesrc = "";
	var displayfilename = "";	
	var displayfiletype = "";	
	
	setupWait();
	
	$('.dropzonebasicfilepopup').each(function() {
		   
	    var bits = this.id.split("_");  // filefieldname_dropzonebasicfilepopup
	    filefieldname = bits[0]+"_"+bits[1];
	    
		if ( $("#"+filefieldname+"_dropzonefileupdatebutton").html() == "Add File" ) {
			$("#"+filefieldname+"_dropzonefileremovebutton").hide();
			$("#"+filefieldname+"_imageview").show();
			$("#"+filefieldname+"_objectview").hide();
			$("#"+filefieldname+"_downloadlink").hide();
		}
		
		$("#"+filefieldname+"_dropzonebasicfilepopup").dialog({
			autoOpen: false,
			width: "400",
			height: "200",
			overflow:"auto",
		    buttons: {
		        "Cancel": function() { $("#"+filefieldname+"_dropzonebasicfilepopup").dialog("close"); }
		    }			
		});	
		
		$('#'+filefieldname+'_upload_button').on('click', function(event) {
			// alert('upload_button clicked - '+this.id+" - "+latestselectedfilename);				
            // $('#'+filefieldname+'_upload_button').hide();           
			if ( JSDomainId() == "dmwsclient" ) { // local client
		        var sUrl = "https://www.dmwsportal.org.uk/site_php/v1_dropzonefileupload.php"; 
		        alert(sUrl);
	        } else { //  cemntral server
	        	var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_dropzonefileupload.php";
	        	// alert(sUrl);
	        }			
			var form = document.getElementById('dropzoneform');
			var myformData = new FormData(form);
			
		   $.ajax({
			   // crossOrigin: true,
			   url: sUrl,
		        type: 'POST',
		        data: myformData,
		        async: false,
		        success: function (data) {
			           // alert("("+data+")");
		        	   if ( $( "#updateLog" ).length ) { document.getElementById("updateLog").innerHTML = data; }			           
			           // Return string - Error(1/0)|Message|outfilename|added/updated|filesize|width|height	
			           var databits = data.split('|');
			           var errorcode = databits[0].replace(" ", ""); // Nasty - removes leading  blank
			           if (errorcode == "0") {
			        	   var tfieldname = filefieldname;
			        	   var tfilename = databits[2];
			        	   $("#"+filefieldname+"_filename").val(databits[2]);
			        	   if (tfilename.indexOf("Attachment_") >= 0) {
			        		   // alert("Downloadable file only");
				        	   var tsrcurldir = "";
				        	   var tfilepath = "GLOBALDOMAINFILEPATH/assets";
				        	   var tfileprefix1 = $( "#"+tfieldname+"_FileUploadTo").val();
				        	   var tfileprefix2 = $( "#"+tfieldname+"_FileUploadId").val(); 			        	   
				        	   displayFile1(tfieldname,tfilename,tsrcurldir,tfilepath,tfileprefix1,tfileprefix2);
			        	   } else {
				        	   var tsrcurldir = JSDomainWWWURL()+'/domain_temp';
				        	   var tfilepath = "GLOBALDOMAINFILEPATH/assets";
				        	   var tfileprefix1 = $( "#"+tfieldname+"_FileUploadTo").val();
				        	   var tfileprefix2 = $( "#"+tfieldname+"_FileUploadId").val(); 			        	   
				        	   displayFile1(tfieldname,tfilename,tsrcurldir,tfilepath,tfileprefix1,tfileprefix2);
			        	   } 
				           $('#'+filefieldname+'_dropzonebasicfilepopup').dialog("close");
				           $("#"+filefieldname+"_dropzonefileremovebutton").show();	
				                	   
			           } else {
			        	   alert("error - "+data);
			           }
		        },
		        error: function(data, textStatus, jqXHR) {
			           //process error msg
			        	alert("error - "+jqXHR);
			    },		        
		        cache: false,
		        contentType: false,
		        processData: false
		    });
		    
		})	
		
		$('.dropzonefileupdatebutton').on('click', function(event) {
			var thisid = event.target.id;
		    var bits = thisid.split("_");  // filefieldname_dropzonefilebutton
		    filefieldname = bits[0]+"_"+bits[1];
		   
	        $('#'+filefieldname+'_upload_button').show();
	        $('#'+filefieldname+'_loading_button').hide();
	        $('#'+filefieldname+'_cancel_button').show();
	       
	    	$("#"+filefieldname+"_dropzonebasicfilepopup").dialog("open");    		    	
		})
		
		$('.dropzonefileremovebutton').on('click', function(event) {
			var thisid = event.target.id;
		    var bits = thisid.split("_");  // filefieldname_dropzonefileremovebutton
		    if (confirm('Are you sure you want to remove this file.')) { 
			    filefieldname = bits[0]+"_"+bits[1];
		        $("#"+filefieldname+"_imageview").attr("src","../site_assets/nofile.gif");
		        $("#"+filefieldname+"_imageview").width("50px");
		        $("#"+filefieldname+"_objectview").hide();
		        $("#"+filefieldname+"_downloadlink").hide();
		        $("#"+filefieldname).val("");
		        $("#"+filefieldname+"_filename").val("");
		        $("#"+filefieldname+"_dropzonefileupdatebutton").html("Upload New File");
		        $("#"+filefieldname+"_dropzonefileremovebutton").hide();
		    }
		})
	
	});	
	
	
});


function displayFile1(tfieldname,tfilename,tsrcurldir,tfilepath,tfileprefix1,tfileprefix2) {
	 // fieldname,filename,srcpath,filepath,fileprefix1,fileprefix2	
	 // alert("displayFile1: | "+tfieldname+" | "+tfilename+" | "+tsrcurldir+" | "+tfilepath+" | "+tfileprefix1+" | "+tfileprefix2);
	 // NEW displayFile1 | personqualification_certificate | tempf_Qualification_bbra_A_SWNPCCRT-3.pdf | //localhost/havanthockeyclub/domain_temp | GLOBALDOMAINFILEPATH/assets | Qualification | bbra
	 // document.getElementById(tfieldname+"_input").value = tfilename; 
	 document.getElementById(tfieldname+"_filename").innerHTML = removeNamePrefixes(tfilename);	
	 // document.getElementById(tfieldname+"_filesrcurl").value = tsrcurldir;           
	 // document.getElementById(tfieldname+"_filefilepath").value = tfilepath;  
	 // document.getElementById(tfieldname+"_fileprefix1").value = tfileprefix1;           
	 // document.getElementById(tfieldname+"_fileprefix2").value = GLOBALS[tfileprefix2];
	 document.getElementById(tfieldname+"_imageview").src = "";
	 var imagefield = "#"+tfieldname+"_imageview"; $(imagefield).hide();  	  
	 document.getElementById(tfieldname+"_objectview").data = ""; 
	 var objectfield = "#"+tfieldname+"_objectview"; $(objectfield).hide();
	 displayfieldname = tfieldname;
	 displayfilename = tfilename;
	 displayfiletype = "";
	 if (tfilename != "") {
	  var ipartsa = tfilename.split("."); 
	  displayfiletype = ipartsa.slice(-1)[0]; // Last element
	 }
	 
		// ========== setup upload area =====================	
	 $('#'+tfieldname+"_FileUploadId").val(tfileprefix2);	 
	 tsrcurldir
	 if (tsrcurldir == "") { // downloadable only
		 displayfilesrc = "";
		 displayFile2();   
	 } else { // viewable file - view via domain_temp folder		 
		 if ((tsrcurldir.indexOf("domain_temp") > -1)&&(tfilename != "")) { // temporarily viewable
			 var fromfilepath = tfilepath;
			 var fromfilename = tfilename; 
			 var tempfilepath = JSDomainWWWPath()+"/domain_temp";
			 var tempfilename = "temp_"+new Date().getTime()+"."+displayfiletype; 
			 displayfilesrc = JSDomainWWWURL()+"/domain_temp/"+tempfilename;
			 // alert("NEW Copy"+" | "+fromfilepath+" | "+tempfilepath+" | "+fromfilename+" | "+tempfilename);
			 startWait("Loading");  
			 genericFileUtility("Copy",fromfilepath,tempfilepath,fromfilename,tempfilename,"","displayFile2");
		 } else {
			 displayfilesrc = tsrcurldir+"/"+tfilename+"?ForceRefresh="+new Date().getTime(); // forces cache refresh
			 displayFile2();  
		 }
	 }
}

function displayFile2() {
	 // alert("displayFile2: "+displayfilesrc+" | "+displayfilename+" | "+displayfiletype); 
	 var displayfiletypeidentified = "0";
	
	 if ((displayfiletype == "pdf")||(displayfiletype == "PDF")) {
		 displayfiletypeidentified = "1";	
		 if (displayfilesrc != "") { // viewable
			 loadImage(displayfilesrc, function(status) {	 				  		 
				  document.getElementById(displayfieldname+"_objectview").data = displayfilesrc;
				  document.getElementById(displayfieldname+"_objectview").style.width = "400px";
				  $("#"+displayfieldname+"_objectview").show();
				  $("#"+displayfieldname+"_imageview").hide();
			 });
			 stopWait();
		 } else { // downloadable only
			 document.getElementById(displayfieldname+"_imageview").src = "../site_assets/PDFIcon.png";
			 document.getElementById(displayfieldname+"_imageview").style.width = "50px"; 
			 $("#"+displayfieldname+"_objectview").hide();
			 $("#"+displayfieldname+"_imageview").show();
		 }
		 var lUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_assetfiledownloadin.php"+STDPARMS();
		 lUrl = lUrl + "&AssetFileName="+encodeURI(displayfilename);
		 // alert(lUrl);
		 $("#"+displayfieldname+"_downloadlink").attr("href", lUrl);
		 $("#"+displayfieldname+"_downloadlink").html(removeNamePrefixes(displayfilename));
		 $("#"+displayfieldname+"_downloadlink").show();
		 $("#"+displayfieldname+"_dropzonefileupdatebutton").html("Upload Replacement File");
		 $("#"+displayfieldname+"_dropzonefileremovebutton").show();
	 } 
	 if ((displayfiletype == "jpg")||(displayfiletype == "JPG")||
		     (displayfiletype == "jpeg")||(displayfiletype == "JPEG")|| 	
		     (displayfiletype == "gif")||(displayfiletype == "GIF")|| 	
		     (displayfiletype == "png")||(displayfiletype == "PNG")) {
		 displayfiletypeidentified = "1";	
		 if (displayfilesrc != "") { // viewable
			 loadImage(displayfilesrc, function(status) {	 				  		 
				  document.getElementById(displayfieldname+"_objectview").data = displayfilesrc;
				  document.getElementById(displayfieldname+"_objectview").style.width = "400px";
				  $("#"+displayfieldname+"_objectview").show();
				  $("#"+displayfieldname+"_imageview").hide();
			 });
			 stopWait();
		 } else { // downloadable only
			 document.getElementById(displayfieldname+"_imageview").src = "../site_assets/ImgIcon.png";
			 document.getElementById(displayfieldname+"_imageview").style.width = "50px"; 			 
			  $("#"+displayfieldname+"_objectview").hide();
			  $("#"+displayfieldname+"_imageview").show();
		 }
		 var lUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_assetfiledownloadin.php"+STDPARMS();
		 lUrl = lUrl + "&AssetFileName="+encodeURI(displayfilename);
		 // alert(lUrl);
		 $("#"+displayfieldname+"_downloadlink").attr("href", lUrl);
		 $("#"+displayfieldname+"_downloadlink").html(removeNamePrefixes(displayfilename));
		 $("#"+displayfieldname+"_downloadlink").show();
		 
		 document.getElementById(displayfieldname+"_dropzonefileupdatebutton").innerHTML = "Upload Replacement File";
		 $("#"+displayfieldname+"_dropzonefileremovebutton").show();	
	 } 
	 if ((displayfiletype == "docx")||(displayfiletype == "DOCX")||
	      (displayfiletype == "doc")||(displayfiletype == "DOC")) {
		 displayfiletypeidentified = "1";	
		 document.getElementById(displayfieldname+"_imageview").src = "../site_assets/WordIcon.jpg";
		 document.getElementById(displayfieldname+"_imageview").style.width = "50px"; 
		 $("#"+displayfieldname+"_objectview").hide();
		 $("#"+displayfieldname+"_imageview").show();  
		 var lUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_assetfiledownloadin.php"+STDPARMS();
		 lUrl = lUrl + "&AssetFileName="+encodeURI(displayfilename);
		 // alert(lUrl);
		 $("#"+displayfieldname+"_downloadlink").attr("href", lUrl);
		 $("#"+displayfieldname+"_downloadlink").html(removeNamePrefixes(displayfilename));
		 $("#"+displayfieldname+"_downloadlink").show();
		 
		 document.getElementById(displayfieldname+"_dropzonefileupdatebutton").innerHTML = "Upload Replacement File";
		 $("#"+displayfieldname+"_dropzonefileremovebutton").show();		      	      
	 }
	 if ((displayfiletype == "pptx")||(displayfiletype == "PPTX")||
		     (displayfiletype == "ppt")||(displayfiletype == "PPT")) {
	      displayfiletypeidentified = "1";
		  document.getElementById(displayfieldname+"_imageview").src = "../site_assets/PowerpointIcon.jpg";
		  document.getElementById(displayfieldname+"_imageview").style.width = "50px"; 
		  $("#"+displayfieldname+"_objectview").hide();
		  $("#"+displayfieldname+"_imageview").show();  
		  var lUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_assetfiledownloadin.php"+STDPARMS();
		  lUrl = lUrl + "&AssetFileName="+encodeURI(displayfilename);
		  // alert(lUrl);
		  $("#"+displayfieldname+"_downloadlink").attr("href", lUrl);
		  $("#"+displayfieldname+"_downloadlink").html(removeNamePrefixes(displayfilename));
		  $("#"+displayfieldname+"_downloadlink").show();
		 
		  document.getElementById(displayfieldname+"_dropzonefileupdatebutton").innerHTML = "Upload Replacement File";
		  $("#"+displayfieldname+"_dropzonefileremovebutton").show();	
	 }
	 if ((displayfiletype == "xlsx")||(displayfiletype == "XLSX")||
		     (displayfiletype == "xls")||(displayfiletype == "XLS")) {
	      displayfiletypeidentified = "1";
		  document.getElementById(displayfieldname+"_imageview").src = "../site_assets/ExcelIcon.jpg";
		  document.getElementById(displayfieldname+"_imageview").style.width = "50px"; 	
		  $("#"+displayfieldname+"_objectview").hide();
		  $("#"+displayfieldname+"_imageview").show();  
		  var lUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_assetfiledownloadin.php"+STDPARMS();
		  lUrl = lUrl + "&AssetFileName="+encodeURI(displayfilename);
		  // alert(lUrl);
		  $("#"+displayfieldname+"_downloadlink").attr("href", lUrl);
		  $("#"+displayfieldname+"_downloadlink").html(removeNamePrefixes(displayfilename));
		  $("#"+displayfieldname+"_downloadlink").show();
		 
		  document.getElementById(displayfieldname+"_dropzonefileupdatebutton").innerHTML = "Upload Replacement File";
		  $("#"+displayfieldname+"_dropzonefileremovebutton").show();	
	 }  
	 if (displayfiletypeidentified == "0") {
		  if (displayfiletype == "") {
		   document.getElementById(displayfieldname+"_imageview").src = "../site_assets/nofile.gif";
		   document.getElementById(displayfieldname+"_imageview").style.width = "50px";
		   // document.getElementById(displayfieldname+"_fileuploadbutton").innerHTML = "Upload New File";	   
		   $("#"+displayfieldname+"_imageview").show();
		   $("#"+displayfieldname+"_objectview").hide();
		   $("#"+filefieldname+"_downloadlink").hide();
		   document.getElementById(displayfieldname+"_dropzonefileupdatebutton").innerHTML = "Upload New File"; 
		   $("#"+displayfieldname+"_dropzonefileremovebutton").hide();		   
		  } else {
		   // alert("file type cannot be displayed");
		   document.getElementById(displayfieldname+"_dropzonefileupdatebutton").innerHTML = "Upload New File";
		   $("#"+displayfieldname+"_dropzonefileremovebutton").hide();
		  }
	 }
}

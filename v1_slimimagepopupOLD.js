
$(document).ready( function() {
	
	// alert("slimimagepopup");
	// alert(JSCanvasId());
	
	var imagefieldname = "";
	var reqdimagewidth = "";	
	var reqdimageheight = "";	
	var reqdimagefixedsize = "";
	var reqdtinyimageratio = "16:9";		
	var existingimagename = "";
	var existingimagechanged = "0";	
	var latestselectedfile = "";		
	var latestselectedfilename = "";
	var latestselectedfilesize = 0;	
	var maxuploadfilesize = "";
	
	$('.slimimagepopup').each(function() {		   
	    var bits = this.id.split("_");  // imagefieldname_slimimagepopup
	    if (bits.length == 3) { imagefieldname = bits[0]+"_"+bits[1]; }
	    if (bits.length == 4) { imagefieldname = bits[0]+"_"+bits[1]+"_"+bits[2]; }	     
		if ( $("#"+imagefieldname+"_slimimageupdatebutton").html() == "Add Image" ) {
			$("#"+imagefieldname+"_slimimageremovebutton").hide();		
		}
		
		var dwidth = "90%";
		// if ( JSCanvasId() == "M") { dwidth = "95%"; }
		
		$("#"+imagefieldname+"_slimimagepopup").dialog({
			autoOpen: false,
			width: dwidth,
			height: "500px",
			overflow:"auto"
		});	
		
		var $cropper = $('#'+imagefieldname+'_mySlimImageCropper').slim({
		    ratio: "16:9",    
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
		    label: 'Drop your new image here - or click to browse..',
		    buttonConfirmLabel: 'Ok',
		    meta: {
		        userId:'1234'
		    }
		});
		
		$('#'+imagefieldname+'_upload_button').on('click', function(event) {
			// alert('upload_button clicked - '+this.id+" - "+latestselectedfilename);				
            $('#'+imagefieldname+'_upload_button').hide();
            $('#'+imagefieldname+'_cancel_button').hide();            
            $('#'+imagefieldname+'_loading_button').show();	      
            var filesizetext = "Loading "+fileSizeText(latestselectedfilesize,maxuploadfilesize);
            $('#'+imagefieldname+'_imagesizemesssage').html("");
			// var bits = this.id.split("_");  // imagefieldname_slimimagepopup
		    // imagefieldname = bits[0]+"_"+bits[1];
			var myformdata = new FormData($("#"+imagefieldname+"_slimform")[0]);
			myformdata.append("ExistingImageChanged", existingimagechanged);
			if ( existingimagechanged == "1" ) { 
				myformdata.append(imagefieldname, latestselectedfile, latestselectedfilename); 	
			} else {		
				myformdata.append("ExistingImageName", existingimagename);
			}
			var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_slimimageupload.php";
			// alert(sUrl);
		    $.ajax({
		        type: "POST",
		        url: sUrl,
		        data: myformdata,
		        processData: false,
		        contentType: false,
		        dataType: "text",
		        success: function(data, textStatus, jqXHR) {
		           // alert("("+data+")");
		           // document.getElementById("updateLog").innerHTML = data;
		           // Return string - Error(1/0)|Message|outfilename|added/updated|filesize|width|height	
		           var databits = data.split('|');
		           var errorcode = databits[0].replace(" ", ""); // Nasty - removes leading  blank
		           if (errorcode == "0") {
		        	   var returnedimageurl = JSDomainWWWURL()+'/domain_media/'+databits[2];
			           if (databits[2].indexOf("Advertiser_") >= 0) { returnedimageurl = JSDomainWWWURL()+'/domain_advertisers/'+databits[2]; }		        	   
			           if (databits[2].indexOf("Carousel_") >= 0) { returnedimageurl = JSDomainWWWURL()+'/domain_style/'+databits[2]; }
			           if (databits[2].indexOf("Plugin_") >= 0) { returnedimageurl = JSDomainWWWURL()+'/domain_style/'+databits[2]; }
			           if (databits[2].indexOf("TemplateElement_") >= 0) { returnedimageurl = JSDomainWWWURL()+'/domain_style/'+databits[2]; }		           
			           if (databits[2].indexOf("FRS_") >= 0) { returnedimageurl = JSDomainWWWURL()+'/domain_frs/'+databits[2]; }
			           if (databits[2].indexOf("PersonPhoto_") >= 0) { returnedimageurl = JSDomainWWWURL()+'/domain_temp/'+databits[2]; }
			           // alert(returnedimageurl);
			           d = new Date();
			           $("#"+imagefieldname+"_view").attr("src",returnedimageurl+"?"+d.getTime());
			           $("#"+imagefieldname+"_imagename").val(databits[2]);
			           $('#'+imagefieldname+'_slimimagepopup').dialog("close");
			           $("#"+imagefieldname+"_slimimageupdatebutton").html("Update Image");
			           $("#"+imagefieldname+"_slimimageremovebutton").show();		        	   
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
		
		
		$('#'+imagefieldname+'_cancel_button').on('click', function(event) {
			$('#'+imagefieldname+'_slimimagepopup').dialog("close");
		})		


		$('#'+imagefieldname+'_mySlimImageCropper').on('change', function(event) {
		    // alert('#'+imagefieldname+'_mySlimImageCropper - changed');
			existingimagechanged = "1";	
			// event.preventDefault();  
		    // event.stopPropagation();
		    latestselectedfile = event.target.files[0];
		    latestselectedfilename = event.target.files[0].name;
		    latestselectedfilesize = event.target.files[0].size;
			var filesizetext = "This image is "+fileSizeText(latestselectedfilesize,maxuploadfilesize);			
            $('#'+imagefieldname+'_imagesizemesssage').html(filesizetext);
		})
		
		$('#'+imagefieldname+'_mySlimImageCropper').parent().on("drop", function(event) {	
			// alert("drop");
			existingimagechanged = "1";	
			event.preventDefault();  
		    event.stopPropagation();
		    latestselectedfile = event.originalEvent.dataTransfer.files[0];
		    latestselectedfilename = event.originalEvent.dataTransfer.files[0].name; 
		    latestselectedfilesize = event.originalEvent.dataTransfer.files[0].size;
			var filesizetext = "This image is "+fileSizeText(latestselectedfilesize,maxuploadfilesize);			
            $('#'+imagefieldname+'_imagesizemesssage').html(filesizetext);		    
		});		
	
	});
	

	$('.slimimageupdatebutton').on('click', function(event) {
		var thisid = event.target.id;
	    var bits = thisid.split("_");  // imagefieldname_slimimagebutton
	    if (bits.length == 3) { imagefieldname = bits[0]+"_"+bits[1]; }
	    if (bits.length == 4) { imagefieldname = bits[0]+"_"+bits[1]+"_"+bits[2]; }	
		reqdimagewidth = $('#'+imagefieldname+'_ImageUploadWidth').val();
		reqdimageheight = $('#'+imagefieldname+'_ImageUploadHeight').val();
		reqdimagefixedsize = $('#'+imagefieldname+'_ImageUploadFixedSize').val();		
		// alert(reqdimagewidth+" "+reqdimageheight+" "+reqdimagefixedsize);		
		$lookupsize = "0";
		if (reqdimagewidth.indexOf("_") !=-1) { // size specified by another field	
			// eg advertisercategory_imagewidth[advertiser_category_input]
			$lookupsize = "1";
			var fbits = reqdimagewidth.split('_');
			var gbits = reqdimagewidth.split('[');
			var hbits = gbits[1].split(']');
			var rkey = $("#"+hbits[0]).val();
			// alert("width "+hbits[0]+" "+fbits[0]+" "+rkey);
			if ( rkey == "" ) {
				var kbits = hbits[0].split('_');
				$.alert({
					icon: 'fa fa-pencil text-danger',
					title: "Warning",
				    content: "Please enter a "+kbits[1]+" and try again."
				})	
				return;
			}
			Get_Data_Hash(fbits[0],rkey);
			reqdimagewidth = GLOBALS[gbits[0]];
			$("#"+imagefieldname+"_ImageUploadWidth").val(GLOBALS[gbits[0]]);	
		}			
		if (reqdimageheight.indexOf("_") !=-1) { // size specified by another field	
			$lookupsize = "1";
			var fbits = reqdimageheight.split('_');
			var gbits = reqdimageheight.split('[');
			var hbits = gbits[1].split(']');
			var rkey = $("#"+hbits[0]).val();
			// alert("height "+hbits[0]+" "+fbits[0]+" "+rkey);
			if ( rkey == "" ) {
				alert("Please enter a value for "+hbits[0]);
				 return;
			}
			// Get_Data_Hash(fbits[0],rkey);
			reqdimageheight = GLOBALS[gbits[0]];
			$("#"+imagefieldname+"_ImageUploadHeight").val(GLOBALS[gbits[0]]);	
		}
		if ( $lookupsize == "1" ) { 
			reqdimagefixedsize = reqdimagewidth+"x"+reqdimageheight; 
			$("#"+imagefieldname+"_ImageUploadFixedSize").val(reqdimagefixedsize);
		}		
		// alert(reqdimagewidth+" "+reqdimageheight+" "+reqdimagefixedsize);				
		existingimageurl = $("#"+imagefieldname+"_view").attr("src");
		existingimagename = $('#'+imagefieldname+"_imagename").val();
		existingimagechanged = "0";	
		// alert(imagefieldname+"  "+existingimagename);
		thisimageratio = "16:9";
		if (reqdimagefixedsize != "") {
			var bits = reqdimagefixedsize.split("x");
			thisimageratio = bits[0]+':'+bits[1];
			var imgrqmttext = "Image Cropper - "+bits[0]+"W x "+bits[1]+"H";
		} else {
			thisimageratio = "free";
			var imgrqmttext = "Image Cropper - "+reqdimagewidth+"W x "+reqdimageheight+"H";			
		}
		maxuploadfilesize = $('#'+imagefieldname+"_MaxUploadFileSize").val();
		// alert("slimimageupdatebutton1 "+imagefieldname+"_mySlimImageCropper"+" "+thisimageratio+" "+existingimageurl);
    	$("#"+imagefieldname+"_mySlimImageCropper").slim('ratio', thisimageratio);
    	if (existingimagename != "") {
			$('#'+imagefieldname+'_mySlimImageCropper').slim('load', existingimageurl,  function(error, data) {
				// image load done!
			});
		} else {
			$('#'+imagefieldname+'_mySlimImageCropper').slim('remove');
		}
        $('#'+imagefieldname+'_upload_button').show();
        $('#'+imagefieldname+'_loading_button').hide();
        $('#'+imagefieldname+'_cancel_button').show();
        
        $('#'+imagefieldname+'_imagereqmts').html(imgrqmttext);                    
        $('#'+imagefieldname+'_imagesizemesssage').html("");
        
    	$("#"+imagefieldname+"_slimimagepopup").dialog("open");    	  	
    	var thisdwidth = "90%";
    	if ( reqdimagewidth < 600 ) { thisdwidth = "70%"; }    	
    	if ( reqdimagewidth < 400 ) { thisdwidth = "50%"; }
    	if ( reqdimagewidth < 200 ) { thisdwidth = "30%"; }    	
    	$("#"+imagefieldname+"_slimimagepopup").dialog( "option", "width", thisdwidth );
    	var thisdheight = "600px";
    	$("#"+imagefieldname+"_slimimagepopup").height(thisdheight);
       
    	/*
    	$("#"+imagefieldname+"_slimimagepopup").parent().css({
            top: ($(window).height()  - $("#"+imagefieldname+"_slimimagepopup").parent().outerHeight()) / 2,
            left: ($(window).width() - $("#"+imagefieldname+"_slimimagepopup").parent().outerWidth()) / 2
        });
    	*/
    	$("#"+imagefieldname+"_slimimagepopup").parent().center();
    	
    	$(".slim-btn").css("color", "transparent");  // Makes titles transparent
    	
	})
	
	$('.slimimageremovebutton').on('click', function(event) {
		var thisid = event.target.id;
	    var bits = thisid.split("_");  // imagefieldname_slimimagebutton
	    if (bits.length == 3) { imagefieldname = bits[0]+"_"+bits[1]; }
	    if (bits.length == 4) { imagefieldname = bits[0]+"_"+bits[1]+"_"+bits[2]; }	   
		$.confirm({
			icon: 'fa fa-question-circle text-warning',
		    title: 'Remove Image',
		    content: 'Are you sure you want to remove this image?',
		    buttons: {
		        somethingElse: {
		            text: 'Remove',
		            btnClass: 'btn-red',
		            action: function(){
		    		    imagefieldname = bits[0]+"_"+bits[1];
		    	        $("#"+imagefieldname+"_view").attr("src","../site_assets/NoImage_800x500.png");
		    	        $("#"+imagefieldname).val("");
		    	        $("#"+imagefieldname+"_imagename").val("");
		    	        $("#"+imagefieldname+"_slimimageupdatebutton").html("Add Image");
		    	        $("#"+imagefieldname+"_slimimageremovebutton").hide();
		            }
		        },
		        cancel: function () { 
		        	
		        },
		    }
		});
	})

	$('.slim-btn-remove').on('click', function(event) {
		$('#'+imagefieldname+'_imagesizemesssage').html("");
	})	
	
}); 

function displayImage1(tfieldname,timagename,tsrcurl,timagepath,treqdimagewidth,treqdimageheight,timageprefix1,timageprefix2) {	
	// fieldname,imagename,srcpath,filepath,reqdimagewidth,reqdimageheight,imageprefix1,imageprefix2	
	// alert("displayImage1 "+tfieldname);
	
	// ========== setup edit area =====================
	$('#'+tfieldname+"_imagename").val(timagename);
	if ( timagename != "" ) {
		$('#'+tfieldname+"_view").attr("src", expandSymbolicURL(tsrcurl)+"/"+timagename);
	} else {
		$('#'+tfieldname+"_view").attr("src", "../site_assets/NoImage_800x500.png");
	}
	if (timagename == "") { 
		$('#'+tfieldname+"_slimimageupdatebutton").html("Add Image");
		$("#"+tfieldname+"_slimimageremovebutton").hide();		     
	} else { 
		$('#'+tfieldname+"_slimimageupdatebutton").html("Update Image"); 
		$("#"+tfieldname+"_slimimageremovebutton").show();		     
	}	
	// ========== setup cropping area =====================	
	$('#'+tfieldname+"_ImageUploadId").val(activeGenericDataKey);
}

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
    this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
    return this;
}


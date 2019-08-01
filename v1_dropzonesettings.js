    $(document).ready( function() {

    	Dropzone.autoDiscover = false;
    	
    	$('.dropzone').each(function() {
    	    var thisid = $(this).attr('id');
    	    var myDropzone = new Dropzone("#"+thisid, { 
    	    	maxFiles: 1,
    	        autoProcessQueue:false
    	    });
    	    
    	    $('#dropzonesubmit').click(function(){           
    	    	  myDropzone.processQueue();
    	    	  $("#fileUploadDialog").dialog("close"); 
   	    	  
    	    });
    	    
    	    $("#dropzoneBrowse").hide();  // CHECK - had to include input in order for server to receive $_FILES
    	    
    	});
    	
    	
    });
    

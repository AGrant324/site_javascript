
$(document).ready( function() {

	// alert("tinydropzonepopup");
	
	Dropzone.options.myDropzone = {

	  // Prevents Dropzone from uploading dropped files immediately
	  autoProcessQueue: false,
	
	  init: function() {
		var submitButton = document.querySelector("#submit-upload")
			myDropzone = this; // closure
	
		submitButton.addEventListener("click", function() {
			alert("submit clicked");
		  myDropzone.processQueue(); // Tell Dropzone to process all queued files.
		});
	
	
	  },
	  
      success: function(file, response){
          alert(response);
      }
	  
	  
	};


	
}); 

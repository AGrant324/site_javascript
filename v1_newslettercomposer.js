$(document).ready( function() {
	
	$('#copynewsletter').on('click', function() {		
		CopyToClipboard ('newslettercontent');
		$.alert({
			icon: 'fa fa-pencil text-info',
			title: "Copy",
		    content: 'The newsletter contents have now been copied to the clipboard.<br><br>Select the "Source" button "&lt;&gt;" in the MailChimp editor and paste the content at the appropriate point'
		});
		// Remove the textarea
		var textarea = document.createElement('textarea');
		document.body.removeChild(textarea);
	});
});  


function CopyToClipboard (containerid) {
	  // Create a new textarea element and give it id='temp_element'
	  var textarea = document.createElement('textarea');
	  textarea.id = 'temp_element';
	  // Optional step to make less noise on the page, if any!
	  textarea.style.height = 0;
	  // Now append it to your page somewhere, I chose <body>
	  document.body.appendChild(textarea);
	  // Give our textarea a value of whatever inside the div of id=containerid
	  textarea.value = document.getElementById(containerid).innerHTML;
	  // Now copy whatever inside the textarea to clipboard
	  var selector = document.querySelector('#temp_element');
	  selector.select();
	  document.execCommand('copy');	  
}

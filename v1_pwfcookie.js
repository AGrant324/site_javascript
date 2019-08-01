    $(document).ready( function() {
    	if (getCookie("ViewEmail") != "")  {  
    		alert("This machine has been specially configured to show you your email on the screen. This would not normally happen.");
    		$('#VE').val(getCookie("ViewEmail"));
    	}
    });
    
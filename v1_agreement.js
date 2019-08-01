$(document).ready( function() { 
	
    $("#AgreementSubmit").attr("disabled", "disabled");

    var agreementchecked = "0";

    $('#AgreementCheckbox').click(function () {
	    if (agreementchecked == "0") { 
	    	$("#AgreementSubmit").removeAttr("disabled");
	    	agreementchecked = "1"; 
	    }
	    else {
	    	$("#AgreementSubmit").attr("disabled", "disabled");
	    	agreementchecked = "0"; 
	    }
	});

});
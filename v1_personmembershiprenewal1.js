$(document).ready( function() { 
	
	paymentgroup = "";
	
	$('.inputmain').on('change', function() {
		var id = $(this).attr("id");
		updatePaymentGroup();		
	});
	
	
	function updatePaymentGroup() {
		paymentgroup = "";
		var sep = "";
		$('.inputmain').each(function () {			
			var thisid = $(this).attr('id');
			if ( thisid.includes("PaymentGroup") ) {
				paymentgroup = paymentgroup + sep + $(this).val();
				sep = ",";
			}
		});	
		$('#PaymentGroup').val(paymentgroup);
		// alert(paymentgroup);
	}
	

});


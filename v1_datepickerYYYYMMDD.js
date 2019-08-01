$(document).ready( function() {
	
	var latestidvisited = "";

	$('.datepicker').datepicker({
	    startDate: '-3d',
	    format: 'dd/mm/yyyy',
	    autoClose: true
	});
	
	$('.datepicker').on('changeDate', function(e) {
		// alert($(this).val());
		latestidvisited = $(this).attr("id");
		datesplitter($(this).attr("id"),$(this).val());
		// $(this).datepicker('setDate', 'now');
		$(this).datepicker('hide');
	});
	
	$('.datepicker').on('change', function(e) {
		// alert($(this).val());
		latestidvisited = $(this).attr("id"); 
		datesplitter($(this).attr("id"),$(this).val());
		// $(this).datepicker('setDate', 'now');
		$(this).datepicker('hide');			
	});  	
	
	$('.datepicker').keypress(function (e) {
	    var code = e.keyCode || e.which;
	    if (code === 13) {
	    	e.preventDefault();  // stop form submission on enter
	    	$(this).datepicker('hide');	
	    }
	});
	
	function datesplitter(id,val) {
	    if (val == "") {
	    	
	    	
	    } else {
	    	var dbits = id.split("_");
	    	var vbits = val.split("/");
	    	var name = id.replace("_DateInput", "");
    	    if (vbits.length == 3) {    	    
    	    	// alert(vbits[0]);
    	    	$('#'+name+"_DDpart").val(vbits[0]);
    	    	$('#'+name+"_MMpart").val(vbits[1]);    	    	
    	    	$('#'+name+"_YYYYpart").val(vbits[2]);   	    	   	    	
    	    } else { 
    	    	alert("invalid date")
    	    }	
	    	
	    }
		

	};    	
	
});
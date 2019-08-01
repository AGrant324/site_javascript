$(document).ready( function() {
	var wellbeingScore = 0;	
	$('#wellbeingdatabuttons').hide();
	 countwellbeingscore();	
	$('.wellbeingradio').on('click', function(event) {		
		// var thisid = $(this).attr('id');		
		countwellbeingscore();
		currentwbarr();
	})	
	
	
	
	function countwellbeingscore() {
		wellbeingScore = 0;
		// alert("countwellbeingscore");
		$('.wellbeingradio').each(function () {
			if ($(this).is(':checked')) { 
				var thisval = parseInt($(this).val());				
				wellbeingScore = wellbeingScore + thisval;
				
				
			}
		});
		//alert("FINAL "+wellbeingScore);//
		 if ($('input:radio:checked').length == 12) {
			 $('#dmwswellbeingmessage').hide();
			 $('#wellbeingdatabuttons').show();
			 
			
		 };
		
		 $('#dmwswellbeingscore').val(wellbeingScore);
		
	}	
var buttonname = [];
	buttonname.push("dmwswellbeing_qoptimistic");
	buttonname.push("dmwswellbeing_quseful");
	buttonname.push("dmwswellbeing_qrelaxed");
	buttonname.push("dmwswellbeing_qinterestedinothers");
	buttonname.push("mwswellbeing_qenergy");
	buttonname.push("dmwswellbeing_qproblemmanagement");
	buttonname.push("dmwswellbeing_qthinkingclearly");
	buttonname.push("dmwswellbeing_qgoodaboutme");
	buttonname.push("dmwswellbeing_qclosetoothers");
	buttonname.push("dmwswellbeing_qconfident");
	buttonname.push("dmwswellbeing_qloved");
	buttonname.push("dmwswellbeing_qcheerful");
	
	function currentwbarr() {
		var currentwbarray = [];
		$('.wellbeingradio').each(function () {
			if ($(this).is(':checked')) { 
				var thisval = parseInt($(this).val());
				currentwbarray.push(thisval);
				
			}});
		if ($('input:radio:checked').length == 12) {
		alert(currentwbarray.join("\n"));
		
		}
			
		
	}
	
	
	
	
	
	
	function comparewbarrs() {
		currentwbarr();
		for (i=0; i < length.currentwbarray; i++) {
			if (currentwbarray[i] < prevwbarray[i]) {
				$("#" + buttonname[i] + currentwbarray[i] + "_div").removeClass();     
				$("#" + buttonname[i] + currentwbarray[i] + "_div").addClass('radio-warning');

			}
			
			if (currentwbarray[i] < prevwbarray[i]){
				$("#" + buttonname[i] + currentwbarray[i] + "_div").removeClass();     
				$("#" + buttonname[i] + currentwbarray[i] + "_div").addClass('radio-success');

			}
			
			else {
				$("#" + buttonname[i] + currentwbarray[i] + "_div").removeClass();     
				$("#" + buttonname[i] + currentwbarray[i] + "_div").addClass('radio-warning');
				
			}
			
			
			
		}
	}
	
	$('.wellbeingdatabutton').on('click', function(event) {	
					//alert("data button clicked")
					var thisid = $(this).attr('id');
					var prevwbarray = Get_Data_Hash('dmwswellbeing', dmwssu_id, thisid);
					comparewbarrs();
				});
	
});







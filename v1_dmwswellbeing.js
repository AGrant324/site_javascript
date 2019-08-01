$(document).ready( function() {
	
	var dmwssu_id = $('#dmwssu_id').val();
	
	
	var wellbeingScore = 0;	
	$('#wellbeingdatabuttons').hide();
	// $('.wellbeingradio').hide();
	alert(dmwssu_id);
	var dmwswellbeinga = Get_Array_Hash("dmwswellbeing");
	alert(dmwswellbeinga.length);
	
	for (var wi in dmwswellbeinga) {
		 alert(dmwssu_id+" "+dmwswellbeinga[wi]);
		 // Get_Data_Hash('dmwswellbeing',dmwssu_id,dmwswellbeinga[wi]);	
		 // alert(GLOBALS['dmwswellbeing_date']);
	}

	 countwellbeingscore();
	 
	 
	 
	$('.wellbeingradio').on('click', function(event) {		
		var thisid = $(this).attr('id');
		$('#'+thisid+"_icon").removeClass();
		$('#'+thisid+"_icon").addClass("fa fa-check-square-o fa-2x");
		$('#'+thisid+"_icon").css("color", "red");
		countwellbeingscore();
		currentwbarr();
	})	
	
	
	
	function countwellbeingscore() {
		wellbeingScore = 0;
		// alert("countwellbeingscore");
		
		// Step 1: reset grid to base values plus previous values
		$('.wellbeingradio').each(function () {
			var prevval = -1; // If no prevval
			var prevval = 3;
			var thisid = $(this).attr('id');
			var thisval = parseInt($(this).val());
			$('#'+thisid+"_icon").removeClass();	
			$('#'+thisid+"_icon").css("color", "silver");
			// alert(thisid+" "+thisval+" "+prevval);
			if ( thisval == prevval ) {			
				$('#'+thisid+"_icon").addClass("fa fa-check-square-o fa-2x");
			} else {
				$('#'+thisid+"_icon").addClass("fa fa-square-o fa-2x");
			}
		});	
		
		// Step 2: Update grid with latest checked radio button	
		$('.wellbeingradio').each(function () {			
			var prevval = -1; // If no prevval
			var prevval = 3;
			var thisid = $(this).attr('id');
			var thisval = parseInt($(this).val());			
			if ($(this).is(':checked')) {
				$('#'+thisid+"_icon").removeClass();
				$('#'+thisid+"_icon").addClass("fa fa-check-square-o fa-2x");								
				if (prevval == -1) {
					$('#'+thisid+"_icon").css("color", "blue");						
				} else {
					if (thisval < prevval) {
						$('#'+thisid+"_icon").css("color", "red");							
					}
					if (thisval == prevval) {
						$('#'+thisid+"_icon").css("color", "blue");							
					}					
					if (thisval > prevval) {
						$('#'+thisid+"_icon").css("color", "green");							
					}					
				}
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
		/*if ($('input:radio:checked').length == 12) {
		alert(currentwbarray.join("\n"));
		
		}*/
			
		
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
					var thisid = $(this).attr('id');
					var prevwbarray = Get_Data_Hash('dmwswellbeing', dmwssu_id, thisid);
					alert(thisid);
					alert(prevwbarray.join("\n"));
					//comparewbarrs();
				});
	
});







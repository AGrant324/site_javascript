$(document).ready( function() { 

	/*
	Parameters
	
	maxformseq	
	allavailable - sets all unassigned dates and matches to available
	allnotavailable - sets all unassigned dates and matches to unavailable	
	$formseq_frsdate	
	$formseq_dateavailable - sets all matches to available	
	$formseq_datenotavailable - sets all matches to unavailable
	$formseq_datecomments		
	$formseq_maxmatchseq
	$formseq_$matchseq_frsid
	$formseq_$matchseq_matchavailable - sets matche to available
	$formseq_$matchseq_matchnotavailable - sets matche to unavailable	
	*/

	maxformseq = $('#maxformseq').val();
	
	// Initialise all checkboxes
	$('#allavailable').prop('checked', false);
	$('#allnotavailable').prop('checked', false);
	// UnTickAllAvailableBoxes();
	// UnTickAllNotAvailableBoxes();
	
	
	customCheckboxRefresh ();
	closewarning = "0";
	
	// Respond to Checkbox actions
	
	$('#allavailable').click(function () {
		// alert('#allavailable switched on');
		if (confirm('Are you sure you want to make yourself "available" for all matches.')) { TickAllAvailableBoxes (); } 
    	$('#allavailable').prop('checked', false);
    	customCheckboxRefresh();
	});
	
	$('#allnotavailable').click(function () {
		// alert('#allnotavailable switched on'); 
		if (confirm('Are you sure you want to make yourself "unavailable" for all matches.')) { TickAllNotAvailableBoxes (); }  		
		$('#allnotavailable').prop('checked', false);
		customCheckboxRefresh();
	});
	
	for (var fi = 1; fi <= maxformseq; fi++) {
		$('#'+fi+'_dateavailable').click(function () {
			var idbitsa = this.id.split("_");
			var thisfi = idbitsa[0];
			// alert('#'+thisfi+'_dateavailable clicked');			
			$('#'+thisfi+'_datenotavailable').prop('checked', false);
			if ($('#'+thisfi+'_dateavailable').is(":checked")) { 
				TickFormseqAvailableBoxes(thisfi);
				UnTickFormseqNotAvailableBoxes(thisfi);
			} else { 
				UnTickFormseqAvailableBoxes(thisfi); 
			}
			customCheckboxRefresh();
		});
		$('#'+fi+'_datenotavailable').click(function () {
			var idbitsa = this.id.split("_");
			var thisfi = idbitsa[0];
			// alert('#'+thisfi+'_datenotavailable clicked'); 
			$('#'+thisfi+'_dateavailable').prop('checked', false);
			if ($('#'+thisfi+'_datenotavailable').is(":checked")) { 
				TickFormseqNotAvailableBoxes(thisfi);
				UnTickFormseqAvailableBoxes(thisfi); 
			}
			else { 
				UnTickFormseqNotAvailableBoxes(thisfi); 
			}
			customCheckboxRefresh();
		});
		
		maxmatchseq = $('#'+fi+'_maxmatchseq').val();
		for (var mi = 1; mi <= maxmatchseq; mi++) {
			$('#'+fi+'_'+mi+'_matchavailable').click(function () {
				var idbitsa = this.id.split("_");
				var thisfi = idbitsa[0];
				var thismi = idbitsa[1];
				// alert('#'+thisfi+'_'+thismi+'_matchavailable clicked');			
				$('#'+thisfi+'_'+thismi+'_matchnotavailable').prop('checked', false); 
				customCheckboxRefresh();
			});
			$('#'+fi+'_'+mi+'_matchnotavailable').click(function () {
				var idbitsa = this.id.split("_");
				var thisfi = idbitsa[0];
				var thismi = idbitsa[1];
				// alert('#'+thisfi+'_'+thismi+'_matchnotavailable clicked'); 
				$('#'+thisfi+'_'+thismi+'_matchavailable').prop('checked', false);
				customCheckboxRefresh();
			});
		}
	}				
/*
	window.addEventListener("beforeunload", function (e) {
		  var confirmationMessage = "Check";

		  e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
		  return confirmationMessage;              // Gecko, WebKit, Chrome <34
	});
*/	
	window.onbeforeunload = function(e) { 
	   if (closewarning == "1") {
		       return "Caution: Your availability updates will be lost - Do you wish to leave this page?";	       
	   } else {
	      return;
	   }
	};
	
	$('#SubmitButton').click(function () {
		// alert('SubmitButton');
		closewarning = "0";
	});
	
});


function CountAllTickBoxes () { 
	var checkedcount = 0;
	for (var fi = 1; fi <= maxformseq; fi++) {
		if ($('#'+fi+'_dateavailable').is(":checked")) { checkedcount++; }
		if ($('#'+fi+'_datenotavailable').is(":checked")) { checkedcount++; }		
		maxmatchseq = $('#'+fi+'_maxmatchseq').val();
    	for (var mi = 1; mi <= maxmatchseq; mi++) {
    		if (('#'+fi+'_'+mi+'_matchavailable').is(":checked")) { checkedcount++; }
    		if (('#'+fi+'_'+mi+'_matchnotavailable').is(":checked")) { checkedcount++; }	    		
    	} 	
	}
	return checkedcount; 
}

function TickAllAvailableBoxes () { 
	for (var fi = 1; fi <= maxformseq; fi++) {
		$('#'+fi+'_dateavailable').prop('checked', true);
		$('#'+fi+'_datenotavailable').prop('checked', false);	
		maxmatchseq = $('#'+fi+'_maxmatchseq').val();
    	for (var mi = 1; mi <= maxmatchseq; mi++) {
    		$('#'+fi+'_'+mi+'_matchavailable').prop('checked', true);
    		$('#'+fi+'_'+mi+'_matchnotavailable').prop('checked', false);
    	} 	
	}
	closewarning = "1";
}

function UnTickAllAvailableBoxes () { 
	for (var fi = 1; fi <= maxformseq; fi++) {
		$('#'+fi+'_dateavailable').prop('checked', false);
		maxmatchseq = $('#'+fi+'_maxmatchseq').val();
    	for (var mi = 1; mi <= maxmatchseq; mi++) {
    		$('#'+fi+'_'+mi+'_matchavailable').prop('checked', false);
    	}
	}
	closewarning = "1";
}

function TickAllNotAvailableBoxes () { 
	for (var fi = 1; fi <= maxformseq; fi++) {
		$('#'+fi+'_datenotavailable').prop('checked', true);
		$('#'+fi+'_dateavailable').prop('checked', false);
		maxmatchseq = $('#'+fi+'_maxmatchseq').val();
    	for (var mi = 1; mi <= maxmatchseq; mi++) {
    		$('#'+fi+'_'+mi+'_matchnotavailable').prop('checked', true);
    		$('#'+fi+'_'+mi+'_matchavailable').prop('checked', false);
    	} 		
	}
	closewarning = "1";
}

function UnTickAllNotAvailableBoxes () { 
	for (var fi = 1; fi <= maxformseq; fi++) {
		$('#'+fi+'_datenotavailable').prop('checked', false);
		maxmatchseq = $('#'+fi+'_maxmatchseq').val();
    	for (var mi = 1; mi <= maxmatchseq; mi++) {
    		$('#'+fi+'_'+mi+'_matchnotavailable').prop('checked', false);
    	} 		
	}
	closewarning = "1";
}

function TickFormseqAvailableBoxes (fi) { 
	// alert('TickFormseqAvailableBoxes '+fi);
	maxmatchseq = $('#'+fi+'_maxmatchseq').val();
	for (var mi = 1; mi <= maxmatchseq; mi++) {
		$('#'+fi+'_'+mi+'_matchavailable').prop('checked', true);
	}
	closewarning = "1";
}

function UnTickFormseqAvailableBoxes (fi) { 
	maxmatchseq = $('#'+fi+'_maxmatchseq').val();
	for (var mi = 1; mi <= maxmatchseq; mi++) {
		$('#'+fi+'_'+mi+'_matchavailable').prop('checked', false);
	}
	closewarning = "1";
}

function TickFormseqNotAvailableBoxes (fi) { 
	maxmatchseq = $('#'+fi+'_maxmatchseq').val();
	for (var mi = 1; mi <= maxmatchseq; mi++) {
		$('#'+fi+'_'+mi+'_matchnotavailable').prop('checked', true);
	} 
	closewarning = "1";
}

function UnTickFormseqNotAvailableBoxes (fi) { 
	maxmatchseq = $('#'+fi+'_maxmatchseq').val();
	for (var mi = 1; mi <= maxmatchseq; mi++) {
		$('#'+fi+'_'+mi+'_matchnotavailable').prop('checked', false);
	} 
	closewarning = "1";
}

function customCheckboxRefresh () { 
	customCheckboxDisplay('allavailable',"green");
	customCheckboxDisplay('allnotavailable',"red");
	for (var fi = 1; fi <= maxformseq; fi++) {
		customCheckboxDisplay(fi+'_dateavailable',"green");
		customCheckboxDisplay(fi+'_datenotavailable',"red");		
		maxmatchseq = $('#'+fi+'_maxmatchseq').val();
		for (var mi = 1; mi <= maxmatchseq; mi++) {
			customCheckboxDisplay(fi+'_'+mi+'_matchavailable',"green");
			customCheckboxDisplay(fi+'_'+mi+'_matchnotavailable',"red");
		}
	}
}

function customCheckboxDisplay(checkboxId,color){
    var checkboxIdTxt = "#"+checkboxId; 
    if ( $(checkboxIdTxt).parent().is( "span" ) ) {  $(checkboxIdTxt).unwrap(); } // prevent double wrapping
    $(checkboxIdTxt).wrap( "<span class='custom-checkbox-"+color+"'></span>" );
    if($(checkboxIdTxt).is(':checked')){
        $(checkboxIdTxt).parent().addClass("selected");
    }
}


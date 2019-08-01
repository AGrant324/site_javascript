// formchecker.js
// ----------------------------
// SubmitId - id of form submit button
// WarningMessageId - id of warning message
// ----------------------------
// Editenabled = Yes   - this enables the mandatory field/field editing logic
// EditFields =  fieldname1|fieldtype1|labelid1|highlighttype1|highlightid1|mandatory1|editrule1
// 		fieldname = id of input field name
//		fieldtype = INTXT,INDATE etc
// 		labelid = id of label text - marked in red if error
// 		highlighttype = TD,INTXT,INDATE etc - marked in red if error
// 		highlightid = id of highlighted element - marked in red if error
// 		mandatory = Yes if mandatory
// 		editrule = Alpha,Numeric or null	
// EditWarningMessageId - id of element where warning message is posted
// ----------------------------
// AgreementEnabled = Yes   - This enables a checkbox to confirm Ts&Cs etc
// AgreementCheckbox - form element to confirm Ts&Cs
// ----------------------------
// ConfirmSubmitEnabled = Yes   - This forces a confirmation popup before submission
// ConfirmActionTestBox - id of checkbox that allows submission of form for special treatment eg display and not send emails 
// ConfirmActionText - Text to show up in confirm box
// ConfirmActionStatus = CHECK if required - confirm status to be passed to php routine
//
submitid = "";
warningmessageid = "";
editfieldtypea = new Array();
editlabelida = new Array();
edithighlighttypea = new Array();
edithighlightida = new Array();
editmandatorya = new Array();
editrulea = new Array();
editerrors = "No";
agreementgiven = "Yes";

$(document).ready( function() { 
	submitid = $("#SubmitId").val();
	warningmessageid = $("#WarningMessageId").val();
	// ===========  Perform mandatory field and edit checks =========================================
	if ( $("#EditEnabled").length ) {
		if ( $("#EditEnabled").val() == "Yes" ) {			
			var editfieldslist = $("#EditFields").val();				
			var teditfieldsa = editfieldslist.split("^");			
			for (var ei in teditfieldsa) {
				var editbits = teditfieldsa[ei].split("|");
				// alert(editbits[0]+" "+editbits[1]+" "+editbits[2]+" "+editbits[3]+" "+editbits[4]+" "+editbits[5]);
				editfieldtypea[editbits[0]] = editbits[1];		
				editlabelida[editbits[0]] = editbits[2];
				edithighlighttypea[editbits[0]] = editbits[3];	
				edithighlightida[editbits[0]] = editbits[4];
				editmandatorya[editbits[0]] = editbits[5];
				editrulea[editbits[0]] = editbits[6];
				if (editbits[1] == "INTXT") {
					$("#"+editbits[0]).on('keyup', function() {				
						editerrors = checkFields();
						setSubmitButtonVisibility();
					});
				}
				if (editbits[1] == "INDATE") {
					$("#"+editbits[0]+"_DateInput").on('change', function() {				
						editerrors = checkFields();
						setSubmitButtonVisibility();
					});		
				}
				if (editbits[1] == "INTEL") {
					$("#"+editbits[0]+"_CODEpart").on('keyup', function() {				
						editerrors = checkFields();
						setSubmitButtonVisibility();
					});
					$("#"+editbits[0]+"_NUMpart").on('keyup', function() {				
						editerrors = checkFields();
						setSubmitButtonVisibility();
					});					
				}
				if (editbits[1] == "INSELECT") {
					$("#"+editbits[0]).on('change', function() {				
						editerrors = checkFields();
						setSubmitButtonVisibility();
					});		
				}
				if (editbits[1] == "INCHECKBOX") {
					var jstxt = "input[name='"+editbits[0]+"[]']";
					$(jstxt).on('click', function() {
						editerrors = checkFields();
						setSubmitButtonVisibility();
					});		
				}
				if (editbits[1] == "INRADIO") {
					var jstxt = "input[name="+editbits[0]+"]";				
					$(jstxt).on('click', function() {
						editerrors = checkFields();
						setSubmitButtonVisibility();
					});		
				}
			}	
			editerrors = checkFields();	
		}
	}
	
	// ===========  Prevent submission unless terms complied with =========================================	
	if ( $( "#AgreementEnabled" ).length ) {
		if ( $("#AgreementEnabled").val() == "Yes" ) {
			$("#"+submitid).attr("disabled", "disabled");
			agreementgiven = "No";
		    $('#AgreementCheckbox').click(function () {
				if ( $('#AgreementCheckbox').is(":checked") ) { agreementgiven = "Yes"; }	
				else { agreementgiven = "No"; }	
				setSubmitButtonVisibility();
			});
		}
	}
	
	setSubmitButtonVisibility();
	
	$("#"+submitid).click(function() {		
		if( $("#"+submitid).attr('disabled') ) {}
		else {
			// ===========  Force a double check before form can vbe submitted ==========
			if ( $( "#ConfirmSubmitEnabled" ).length ) {
				if ( $("#ConfirmSubmitEnabled").val() == "Yes" ) {
			    	if ( $('#ConfirmActionTestBox' ).is(":checked") ) {}
			    	else {
				    	if (confirm(  $( "#ConfirmActionText" ).val()  )) {
				    		$( "#ConfirmActionStatus" ).val("Yes");
				    	} else {
				    		// CHECK works only for one form per page
				    		$( "#ConfirmActionStatus" ).val("No");
				    		return false;
				    	}
			    	}
				}
			}
		}		
		
	});
	
	
});


function setSubmitButtonVisibility() {	
	var submitbuttonreqmt = "enabled";
	var warningmessage = "";
	var sep = "";
	if ( editerrors == "Yes" ) { 
		submitbuttonreqmt = "disabled";
		warningmessage = warningmessage + "Mandatory Field errors"
		sep = " & ";
	}
	if ( agreementgiven == "No" ) { 
		submitbuttonreqmt = "disabled";
		warningmessage = warningmessage + sep + "Agreement Required"
	}		
	if ( submitbuttonreqmt == "enabled" ) {
		if( $("#"+submitid).attr('disabled') ) { $("#"+submitid).removeAttr("disabled"); }
	}
	if ( submitbuttonreqmt == "disabled" ) {
		if( $("#"+submitid).attr('disabled') ) {} 
		else { $("#"+submitid).attr("disabled", "disabled"); }
	}
	
	if ( warningmessage != "" ) {
		$("#"+warningmessageid).html(warningmessage);
		$("#"+warningmessageid).css("color", "red");
	} else {
		$("#"+warningmessageid).html("OK");
		$("#"+warningmessageid).css("color", "green");		
	}
	
}



function checkFields() {	
	// this version doesnt have different highlighttype
	var errorsfound = "No";
	for (var ei in editfieldtypea) {	
		if (editfieldtypea[ei] == "INTXT") {
			// alert(ei+" "+editfieldtypea[ei]+" "+$("#"+ei).val());	
			if (($("#"+ei).val() == "")||($("#"+ei).val() === undefined)) {		
				$("#"+editlabelida[ei]).css('color', 'red');
				$("#"+edithighlightida[ei]).css("border", "solid red 1px");
				errorsfound = "Yes";
			} else {
				$("#"+editlabelida[ei]).removeAttr("style");
				$("#"+edithighlightida[ei]).removeAttr("style");	
			}
		}
		if (editfieldtypea[ei] == "INDATE") {
			if (($("#"+ei+"_DateInput").val() == "")||($("#"+ei+"_DateInput").val() == "00/00/0000")) {		// CHECK	
				$("#"+editlabelida[ei]).css('color', 'red');
				$("#"+edithighlightida[ei]+"_DDpart").css("border", "solid red 1px");
				$("#"+edithighlightida[ei]+"_MMpart").css("border", "solid red 1px");				
				$("#"+edithighlightida[ei]+"_YYYYpart").css("border", "solid red 1px");	
				errorsfound = "Yes";				
			} else {
				$("#"+editlabelida[ei]).removeAttr("style");
				$("#"+edithighlightida[ei]+"_DDpart").removeAttr("style");	
				$("#"+edithighlightida[ei]+"_MMpart").removeAttr("style");				
				$("#"+edithighlightida[ei]+"_YYYYpart").removeAttr("style");		
			}
		}
		
		if (editfieldtypea[ei] == "INTEL") {
			// alert(ei+" "+editfieldtypea[ei]+" "+$("#"+ei).val());	
			if (($("#"+ei+"_CODEpart").val() == "")||($("#"+ei+"_CODEpart").val() === undefined)||	
				($("#"+ei+"_NUMpart").val() == "")||($("#"+ei+"_NUMpart").val() === undefined)) {	
				$("#"+editlabelida[ei]).css('color', 'red');
				$("#"+edithighlightida[ei]+"_CODEpart").css("border", "solid red 1px");
				$("#"+edithighlightida[ei]+"_NUMpart").css("border", "solid red 1px");
				errorsfound = "Yes";
			} else {
				$("#"+editlabelida[ei]).removeAttr("style");
				$("#"+edithighlightida[ei]+"_CODEpart").removeAttr("style");
				$("#"+edithighlightida[ei]+"_NUMpart").removeAttr("style");				
			}
		}
		
		if (editfieldtypea[ei] == "INSELECT") {
			if (($("#"+ei).val() == "")||($("#"+ei).val() == "")||($("#"+ei).val() === "?")) {	
				$("#"+editlabelida[ei]).css('color', 'red');
				$("#"+edithighlightida[ei]).css("border", "solid red 1px");
				errorsfound = "Yes";
			} else {
				$("#"+editlabelida[ei]).removeAttr("style");
				$("#"+edithighlightida[ei]).removeAttr("style");			
			}
		}
		
		if (editfieldtypea[ei] == "INCHECKBOX") {
			var jstxt = ":checkbox[name='"+ei+"[]'], form";
			// alert(jstxt);
			if ($(jstxt).is(":checked")) {
			    // alert("one or more checked");
				$("#"+editlabelida[ei]).removeAttr("style");
				$("#"+edithighlightida[ei]).removeAttr("style");
			} else {
				// alert("nothing checked");
				$("#"+editlabelida[ei]).css('color', 'red');
				$("#"+edithighlightida[ei]).css("border", "solid red 1px");
				errorsfound = "Yes";				
			}
		}
		
		if (editfieldtypea[ei] == "INRADIO") {
			var jstxt = "input[name="+ei+"]:checked";
			// alert(ei+" "+jstxt+" "+$(jstxt).val());
			if (($(jstxt).val() == "")||($(jstxt).val() === undefined)) {
				$("#"+editlabelida[ei]).css('color', 'red');
				$("#"+edithighlightida[ei]).css("border", "solid red 1px");
				errorsfound = "Yes";
			} else {
				$("#"+editlabelida[ei]).removeAttr("style");
				$("#"+edithighlightida[ei]).removeAttr("style");			
			}
		}		
		
	}
	return errorsfound;
}
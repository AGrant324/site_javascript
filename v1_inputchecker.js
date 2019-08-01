
editfieldtypea = new Array();
editlabelida = new Array();
edithighlighttypea = new Array();
edithighlightida = new Array();
editmandatorya = new Array();
editrulea = new Array();
submitid = "";
editwarningmessageid = "";

$(document).ready( function() { 
		
	// mandatory fieldslist =  fieldname1|fieldtype1|labelid1|highlighttype1|highlightid1|mandatory1|editrule1
	// fieldname = input field name
	// labelid = id of label text
	// highlighttype = td for table cell
	// highlightid = id of highlighted area.
	// mandatory = Yes if mandatory
	// editrule = Alpha,Numeric	
	
	var editfieldslist = $("#EditFields").val();			
	submitid = $("#SubmitId").val();
	editwarningmessageid = $("#EditWarningMessageId").val();
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
				markupMandatoryFields();
			});
		}
		if (editbits[1] == "INDATE") {
			$("#"+editbits[0]+"_DDpart").on('change', function() {				
				markupMandatoryFields();
			});
			$("#"+editbits[0]+"_MMpart").on('change', function() {				
				markupMandatoryFields();
			});			
			$("#"+editbits[0]+"_YYYYpart").on('change', function() {				
				markupMandatoryFields();
			});			
		}
	}
	markupMandatoryFields();
    
});

function markupMandatoryFields() {	
	// this version doesnt have different highlighttype
	var errorsfound = "0";
	for (var ei in editfieldtypea) {	
		if (editfieldtypea[ei] == "INTXT") {
			// alert(ei+" "+editfieldtypea[ei]+" "+$("#"+ei).val());	
			if (($("#"+ei).val() == "")||($("#"+ei).val() === undefined)) {		
				$("#"+editlabelida[ei]).css('color', 'red');
				$("#"+edithighlightida[ei]).css("border", "solid red 1px");
				errorsfound = "1";
			} else {
				$("#"+editlabelida[ei]).removeAttr("style");
				$("#"+edithighlightida[ei]).removeAttr("style");	
			}
		}
		if (editfieldtypea[ei] == "INDATE") {
			if (($("#"+ei+"_DDpart").val() == "")||($("#"+ei+"_DDpart").val() == "00")||($("#"+ei+"_DDpart").val() === undefined)||
				($("#"+ei+"_MMpart").val() == "")||($("#"+ei+"_MMpart").val() == "00")||($("#"+ei+"_MMpart").val() === undefined)||					
				($("#"+ei+"_YYYYpart").val() == "")||($("#"+ei+"_YYYYpart").val() == "0000")||($("#"+ei+"_YYYYpart").val() === undefined)) {	
				$("#"+editlabelida[ei]).css('color', 'red');
				$("#"+edithighlightida[ei]+"_DDpart").css("border", "solid red 1px");
				$("#"+edithighlightida[ei]+"_MMpart").css("border", "solid red 1px");				
				$("#"+edithighlightida[ei]+"_YYYYpart").css("border", "solid red 1px");	
				errorsfound = "1";
				
			} else {
				$("#"+editlabelida[ei]).removeAttr("style");
				$("#"+edithighlightida[ei]+"_DDpart").removeAttr("style");	
				$("#"+edithighlightida[ei]+"_MMpart").removeAttr("style");				
				$("#"+edithighlightida[ei]+"_YYYYpart").removeAttr("style");		
			}
		}
		if ( errorsfound == "1" ) {
			$("#"+editwarningmessageid).html("Errors Found - please correct");
			$("#"+editwarningmessageid).css("color", "red");
			$("#"+submitid).attr("disabled", "disabled");
		} else {
			$("#"+editwarningmessageid).html("No errors found");
			$("#"+editwarningmessageid).css("color", "green");		
		}
		
	}
}
$(document).ready( function() {

	// alert("frsresults");
	//global variables	
	GLOBALS = new Array();

	stattypeCodeArray = Array ( );   
	stattypeNameArray = Array ( );  
	stattypeValuesArray = Array ( ); 
	 
	 currperiodid = document.getElementById("currperiodid").value;
	 sectionname = document.getElementById("section_name").value;
	 
	 //======= setup the listeners for buttons etc ====================================================================  
	 
	 $('#AddStatSubmit').click(addNewStat);
	 $('#AddSquadPersonId').change( function() { updatePersonFromSquad( this.value ); });
	 
	setupWait(); 
	
	function handleDataRequestSuccess(data, status) {
	    // alert(data);
		if(data != undefined){
			// $('#TRACETEXT').html(data); 
			Create_Hashes(data);
			initialiseStattypeArrays();
			clearAddStatArea();
			updateStatsTableFromString();
			// alert(PSP_inputsstring());
		}
		stopWait();	 
	}
	 
	function handleDataRequestFailure(xhr, reason, ex) {
		 messageAlert("Error Reason = "+"|"+xhr+"|"+reason+"|"+ex+"|");
		 // messageAlert("You are not connected to the internet at this time");
	} 
	
	var datarequestlist = "frspersonstattype[rootkey="+currperiodid+"],person[returnedfields=person_domainid+person_id+person_sname+person_fname+person_section]";
	startWait("Loading");
	var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_javascriptdataprovider.php"; 
	// alert(sUrl);
	$.ajax({
	     url: sUrl,
	     data: { 
	    	 ServiceId: JSServiceId(),	        	
	    	 DomainId: JSDomainId(),
	    	 ModeId: JSModeId(),	        	
	    	 PersonId: JSPersonId(),	
	    	 SessionId: JSSessionId(),		        	
	    	 LoginModeId: JSLoginModeId(),
	    	 MenuId: JSMenuId(),
	    	 DataRequestList: datarequestlist
	     },
	     type: "GET",
	     dataType: "text",
	     timeout: 10000,
	     success: handleDataRequestSuccess,	        
	     error: handleDataRequestFailure
	});		
}); 

function addNewStat() {	
	 // alert("addNewStat");
	 updateStatsList();
	 updateStatsTableFromString();
	 clearAddStatArea();	 
}

function updateStatsList() {	
	// alert("updateStatsList");
	var chosenpersonid = $('#AddStatPersonId').val();
	var frspersonstattypea = Get_Array_Hash('frspersonstattype');
	var statsadded = "0";	
	for (var fi in frspersonstattypea) {
		Get_Data_Hash('frspersonstattype',frspersonstattypea[fi]);
		if (FoundInCommaList(sectionname,GLOBALS['frspersonstattype_sectionlist'])) { 	
			var jqselectvaluetext = '#'+"AddStatValue_"+GLOBALS['frspersonstattype_code'];
			if (GLOBALS['frspersonstattype_values'] == "Numeric" ) {
				if ($(jqselectvaluetext).val() != "") {
					addToStatsList(chosenpersonid,GLOBALS['frspersonstattype_code'],$(jqselectvaluetext).val());
					statsadded = "1";
				}	
			}
			if (GLOBALS['frspersonstattype_values'] == "Checkbox" ) {
				if($(jqselectvaluetext).is(":checked")) { 
					addToStatsList(chosenpersonid,GLOBALS['frspersonstattype_code'],$(jqselectvaluetext).val());
					statsadded = "1";
				}
			}
		 }
	}
	if (statsadded == "0") {  alert("No statistics entered - please retry"); }	
}

function updateStatsTableFromString() {	
	// alert("updateStatsTableFromString");

	var jqselecttext = 'tr[id^="'+'matchstats_row_"]' 		
    $(jqselecttext).remove(); // remove all rows in table xa[0]
	
	var appendrowtext = '<tr id="matchstats_row_header">';
	appendrowtext = appendrowtext+'<th>Person</th>'; 
	var frspersonstattypea = Get_Array_Hash('frspersonstattype');
	for (var fi in frspersonstattypea) {
		Get_Data_Hash('frspersonstattype',frspersonstattypea[fi]);
		if (FoundInCommaList(sectionname,GLOBALS['frspersonstattype_sectionlist'])) { 
			 appendrowtext = appendrowtext+'<th>'+GLOBALS['frspersonstattype_name']+'</th>';
		} 
	}
	appendrowtext = appendrowtext+'<th></th>';  	
	
    var latestStatsList = document.getElementById('frs_statslist').value;
    var latestStatsListArray = Array();
    if ( latestStatsList != "" ) {
	    latestStatsArray = latestStatsList.split("|");
	    var rowclass = "odd";
	    for (sn in latestStatsArray) {
	    	// alert(latestStatsArray[pn]);
	    	var statsbits = latestStatsArray[sn].split(",");
	    	Get_Data_Hash('person',statsbits[0]);
	    	if (rowclass == "odd") {rowclass = "even";} else {rowclass = "odd";}
	    	appendrowtext = appendrowtext+'<tr class="'+rowclass+'" id="matchstats_row_'+statsbits[0]+'_'+statsbits[1]+'">';
	    	appendrowtext = appendrowtext+'<td>'+GLOBALS['person_fname']+" "+GLOBALS['person_sname']+'</td>';
	    	for (var fi in frspersonstattypea) {
	    		 Get_Data_Hash('frspersonstattype',frspersonstattypea[fi]);
	    		 if (FoundInCommaList(sectionname,GLOBALS['frspersonstattype_sectionlist'])) { 
		    		 if (statsbits[1]  == GLOBALS['frspersonstattype_code']) {
		    			 appendrowtext = appendrowtext+'<td>'+statsbits[2]+'</td>';	 
		    		 } else {
		    			 appendrowtext = appendrowtext+'<td></td>';	
		    		 }
	    		 }
	    	}	    	
	    	appendrowtext = appendrowtext+'<td><a id="delete_'+statsbits[0]+'_'+statsbits[1]+'">delete</a></td>'; 
	       	appendrowtext = appendrowtext+'</tr>';       	
	    }
    }	 
	 
   	var jqselecttext = '#matchstats_table'; 
	$(jqselecttext).append(appendrowtext);	
	
    $('a[id^="delete_"]').click(function( event ) {
    	  // alert(event.target.id);
    	  var rowidentifierbits = event.target.id.split("_");
    	  deleteFromStatsList(rowidentifierbits[1],rowidentifierbits[2]);
    	  updateStatsTableFromString();
    });	 	
}

function clearAddStatArea() {	
	 // alert("clearAddStatArea");
	 $('#AddSquadPersonId').val("");
	 $('#AddStatPersonName').html("............");
	 $('#AddStatPersonId').val("");		 
	 var frspersonstattypea = Get_Array_Hash('frspersonstattype');
	 for (var fi in frspersonstattypea) {
		 Get_Data_Hash('frspersonstattype',frspersonstattypea[fi]);
		 if (FoundInCommaList(sectionname,GLOBALS['frspersonstattype_sectionlist'])) { 
			var typefound = "0";
			var jqselecttext = '#'+"AddStatValue_"+GLOBALS['frspersonstattype_code']; 
			if (GLOBALS['frspersonstattype_values'] == "Numeric" ) {
				$(jqselecttext).val("");	
			}
			if (GLOBALS['frspersonstattype_values'] == "Checkbox" ) {
				$(jqselecttext).removeAttr('checked');
			}
		 }
	 }
}

function initialiseStattypeArrays() {	
	 // alert("initialiseStattypeArrays");
	 var frspersonstattypea = Get_Array_Hash('frspersonstattype');
	 for (var fi in frspersonstattypea) {
		Get_Data_Hash('frspersonstattype',frspersonstattypea[fi]); 
		if (FoundInCommaList(sectionname,GLOBALS['frspersonstattype_sectionlist'])) { 
			 stattypeCodeArray[GLOBALS['frspersonstattype_code']] = GLOBALS['frspersonstattype_code'];   
			 stattypeNameArray[GLOBALS['frspersonstattype_code']] = GLOBALS['frspersonstattype_name'];  
			 stattypeValuesArray[GLOBALS['frspersonstattype_code']] = GLOBALS['frspersonstattype_values']; 
			 // alert("HHHH "+stattypeCodeArray[GLOBALS['frspersonstattype_code']]+" "+stattypeNameArray[GLOBALS['frspersonstattype_code']]+" "+stattypeValuesArray[GLOBALS['frspersonstattype_code']]);		 
		}
	}
}

 
function updatePersonFromSquad(tpersonid) {	
	// alert("updatePersonFromSquad");
	Get_Data_Hash('person',tpersonid); 
	$('#AddStatPersonName').html(GLOBALS['person_fname']+" "+GLOBALS['person_sname']);	
	$('#AddStatPersonId').val(tpersonid);	

}


function addToStatsList (personid,statscode,statsvalue) {
	var latestStatsList = document.getElementById('frs_statslist').value;
	if (latestStatsList == "|") { latestStatsList = ""; } // just to be sure	
	// alert('BEFOREADD "'+latestStatsList+'"');	
    var latestStatsListArray = Array();
    var updatedStatsList = ""; 
    var sep = "";
    if (latestStatsList != "") {
	    latestStatsArray = latestStatsList.split("|");
	    for (sn in latestStatsArray) {
	    	// alert('"'+latestStatsArray[sn]+'"');
	    	var statsbits = latestStatsArray[sn].split(",");
	    	if ((personid == statsbits[0])&&(statscode == statsbits[1])) {} // ignore existing stat
	    	else { updatedStatsList = updatedStatsList + sep + statsbits[0] +','+ statsbits[1] +','+ statsbits[2]; sep = "|"; }
	    }
	}	
	// alert('MIDDLE "'+updatedStatsList+'"'); 
	 
    if ( updatedStatsList == "") { sep = ""; }
    updatedStatsList = updatedStatsList + sep + personid +','+ statscode +','+ statsvalue;
	if (updatedStatsList == "|") { updatedStatsList = ""; } // just to be sure    
	document.getElementById('frs_statslist').value = updatedStatsList;
	// alert('AFTERADD "'+document.getElementById('frs_statslist').value + '"');	
}


function deleteFromStatsList (personid,statscode) {
	var latestStatsList = document.getElementById('frs_statslist').value;
	if (latestStatsList == "|") { latestStatsList = ""; } // just to be sure
	// alert('BEFOREDELETE "'+latestStatsList+'"');		
    var latestStatsListArray = Array();
    var updatedStatsList = ""; 
    var sep = "";
    if (latestStatsList != "") {    
	    latestStatsArray = latestStatsList.split("|");
	    for (sn in latestStatsArray) {
	    	// alert(latestStatsArray[sn]);
	    	if (statsbits != "") {
		    	var statsbits = latestStatsArray[sn].split(",");
		    	if ((personid == statsbits[0])&&(statscode == statsbits[1])) {}
		    	else { updatedStatsList = updatedStatsList + sep + statsbits[0] +','+ statsbits[1] +','+ statsbits[2]; sep = "|"; }
	    	}
	    }
    }
	if (updatedStatsList == "|") { updatedStatsList = ""; } // just to be sure
	document.getElementById('frs_statslist').value = updatedStatsList;
	// alert('AFTERDELETE "'+document.getElementById('frs_statslist').value + '"');	
}



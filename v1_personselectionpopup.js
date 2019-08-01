 
//global variables
GLOBALS = new Array();

personFieldNameArray = Array ();
personShowFieldNameArray = Array ();
personShowFieldTitleArray = Array ();
personShowFieldWidthArray = Array ();
targetButtonIdArray = Array ();
selectButtonLabelArray = Array ();
selectButtonTypeArray = Array ();
selectButtonShowArray = Array (); // show-hide - initiated on showdialogue
selectButtonLinkArray = Array (); // program-field - initiated on showdialogue
targetFieldOrProgramArray = Array ();
targetFieldUpdateModeArray = Array ();
targetPersonListArray = Array ();
targetPersonListFieldsArray = Array ();
selectButtonWidthArray = Array ();

fieldOutType = "";

multiButtonShow = ""; 
personSearchFieldDataArray = Array (); // text to be searched for

personIdArray = Array ();
personTableArray = Array ();

activeTargetButtonId = "";
activeButton = "";
activeButtonIndex = 0;
activePersonId = "";
sep = "";
searchinprogress = "0";
firstdatatable = "1";
xy = Array ( );

viewchange = "";
selectionmode = ""; 

initialpersonlistload = "1";

 
$(document).ready( function() {
	
	 // prevent form submission on enter - eg to view names	
	 $(document).on('keyup keypress', 'form input[type="textbox"]', function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			return false;
		}
	 });
	 
	$('#personSearchTable').DataTable( { 
		searching: 		false,
		bInfo: 			false,
        paging:         false
    } );	 
	 
	$('#personSelectTable').DataTable( {
		scrollY:        '40vh',
        scrollCollapse: true,
		searching: 		false,
        paging:         false 
    } );
	
	setupWait();
	$("#search_button_spinner").hide();
	
	 parm0 = document.getElementById("PSP_parm0").value;
	 parm1 = document.getElementById("PSP_parm1").value;
	 parm2 = document.getElementById("PSP_parm2").value;
	 parm3 = document.getElementById("PSP_parm3").value;
	 parm4 = document.getElementById("PSP_parm4").value;
	 parm5 = document.getElementById("PSP_parm5").value;
	 parm6 = document.getElementById("PSP_parm6").value;
	 parm7 = document.getElementById("PSP_parm7").value; 
	 // $parm0 = Fields to download - this/other,person_id|person_fname|person_sname|person_email1
	 // $parm1 = Fields to show in search list - person_sname,SurName,70|persons_fname,FirstName,90|person_id,Id,90|person_email1,Email,90
	 // $parm2 = Buttons Id � field,To,To..,ToPersonIdList,ToPersonNameList,70|field,Cc,CC..,CcDistList,CcPersonList,70
	 // $parm2 = Buttons Id � program,View,View..,,personLUin.php,70 
	 // $parm2 = Buttons Id � rows,Squad,Add_To_Squad,person_squadlist(replace/addto),persontable(field1+field2[AgeFilter=18]+field3+remove),70
	 // $parm2 = Buttons Id � datatablerows,Squad,Add_To_Squad,person_squadlist(replace/addto),persontable(field1+field2[AgeFilter=18]+field3+remove),70	 
	 // $parm3 = Output Field Name,parameter - e.g person_id or person_email1 (parameter optional)
	 // $parm4 = Buttons to show on output - "all" or "active"
	 // $parm5 = New Window positioning name|topx|topy|width|height
	 // $parm6 = view/change -  e.g authority to handle data returned
	 // $parm7 = buildfulllist/singleaddtolist/singlereplacelist/multiprogramlinks - build a list of results/close after each selection/keepopen after each program link 
	 dataprovidedby = "this";
	 parm0a = parm0.split(",");
	 if (parm0a[0] == "other") { dataprovidedby = "other"; }
	 if ((parm0a[0] == "this")||(parm0a[0] == "other")) { parm0 = parm0a[1]; }
	 // alert(parm0); 
	 parm0a = parm0.split("|");
	 for (i in parm0a) {	
	  personFieldNameArray[i] = parm0a[i];
	  // alert(personFieldNameArray[i]);
	 } 
	 parm1a = parm1.split("|");
	 for (i in parm1a) {	
	  xa = parm1a[i].split(",");   
	  personShowFieldNameArray[i] = xa[0];	  
	  personShowFieldTitleArray[i] = xa[1];
	  personShowFieldWidthArray[i] = xa[2];
	  personSearchFieldDataArray[i] = "";	    
	 }
	 buttonsa = parm2.split("|");
	 for (i in buttonsa) {
	  xa = buttonsa[i].split(",");
	  selectButtonTypeArray[i] = xa[0];  
	  targetButtonIdArray[i] = xa[1];
	  selectButtonLabelArray[i] = xa[2]; 
	  targetFieldOrProgramArray[i] = xa[3];
	  if (targetFieldOrProgramArray[i].indexOf("(") !=-1) {
		  ya = targetFieldOrProgramArray[i].split("(");
		  za = ya[1].split(")");
		  targetFieldOrProgramArray[i] = ya[0];
		  targetFieldUpdateModeArray[i] = za[0];	  
	  } else {
		  targetFieldUpdateModeArray[i] = "replace";	  
	  }
	  
	  targetPersonListArray[i] = xa[4];
	  if (targetPersonListArray[i].indexOf("(") !=-1) {
		  ya = targetPersonListArray[i].split("(");
		  za = ya[1].split(")");
		  targetPersonListArray[i] = ya[0];
		  targetPersonListFieldsArray[i] = za[0];	  
	  } else {
		  targetPersonListArray[i] = xa[4];	  
	  }  
	
	  selectButtonWidthArray[i] = xa[5];
	 }
	 if (parm3.indexOf(",") !=-1) {
		 parm3a = parm3.split(",");	 
		 fieldOutType = parm3a[0];
		 fieldOutParameter = parm3a[1];
	 } else {
		 fieldOutType = parm3;
		 fieldOutParameter = "";	 
	 }
			 
	 multiButtonShow = parm4; 
	 wdimsa = parm5.split(",");
	 winn = wdimsa[0]; 
	 winx = wdimsa[1];
	 winy = wdimsa[2];
	 winw = wdimsa[3]; 
	 winh = wdimsa[4];
	 viewchange = parm6;
	 selectionmode = parm7; 
	 
	 //setup dialogue popup
	 var PSP_handleDialogBuildListComplete = function() {
	  // alert("PSP_handleDialogSubmit");
	  for (fn in targetButtonIdArray) {
	   if (selectButtonShowArray[fn] == "show") {
	    if ((selectButtonTypeArray[fn] == "field")||(selectButtonTypeArray[fn] == "rows")||(selectButtonTypeArray[fn] == "divs")) {  
	     document.getElementById(targetFieldOrProgramArray[fn]).value = document.getElementById(targetButtonIdArray[fn]+"_result").value;
	    }
	   }
	  }
	  PSP_personListCompleter();
	  $("#personSelectDialog").dialog("close");   
	 };
	 var PSP_handleDialogCancel = function() { $("#personSelectDialog").dialog("close"); };
	 var PSP_handleDialogClose = function() { $("#personSelectDialog").dialog("close"); }; 

	 if (selectionmode == "buildfulllist") {
		 $("#personSelectDialog").dialog({
				autoOpen: false,
				width: "90%",
			    buttons: {
			        "OK": function() { PSP_handleDialogBuildListComplete(); },
			        "Cancel": function() { PSP_handleDialogCancel(); }
			    }
		});	 
	 } else {
		 $("#personSelectDialog").dialog({
				autoOpen: false,
				width: "90%",
			    buttons: {
			        "Close": function() { PSP_handleDialogClose(); }
			    }
		});	 	 
	 }
	 $("#personSelectDialog").dialog("close");
	 
	 // add listeners to all buttons and text input boxes
	 for (fn in targetButtonIdArray) {
		 $("#"+targetButtonIdArray[fn]).on('click', function(event) { PSP_showDialogue(event); })
		 if (selectButtonTypeArray[fn] == "field") {	 
			  $("#"+targetFieldOrProgramArray[fn]).on('change', function(event) { PSP_personListCompleter(); })
		 }
	 }
	 for (var fi in personShowFieldNameArray) {; 
	  var presearchstr = ""; 
	  try { presearchstr = document.getElementById(personShowFieldNameArray[fi]+"_presearch").value;}
	  catch (err) {presearchstr = "ERROR";}
	  if (presearchstr != "ERROR") {
	   // alert(personShowFieldNameArray[fi]+"_presearch");		  
	   $("#"+personShowFieldNameArray[fi]+"_presearch").on('change', function(event) { PSP_showDialogue(event); })
	  }
	 }
	 
	 
	 if (dataprovidedby == "this") { // get person data - N0te if Parm0 = "" then it has laready been loaded by another routine eg generic.js
		 startWait();
		 // setup the local hash databases	 
		 personfieldsrequired = ""; var sep = "";
		 for (i in personFieldNameArray) {
			 personfieldsrequired = personfieldsrequired + sep + personFieldNameArray[i];	 
			 sep = "|";
		 }	  
		 personselectioncriteria = ""; 
		 var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_javascriptpersonprovider.php"; 		 
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
		    	 PersonViewChange: viewchange,
		    	 PersonFieldsRequired: personfieldsrequired,
		    	 PersonSelectionCriteria: personselectioncriteria
		     },
		     type: "GET",
		     dataType: "text",
		     timeout: 10000,
		     success: PSP_handleDataRequestSuccess,	        
		     error: PSP_handleDataRequestFailure
		 });	     
		  
		 // Define a function to handle the response data.
		 function PSP_handleDataRequestSuccess(data, status) {
		    // alert(data);
			  if(data != undefined){
				   // alert(data);
				   // $('#TRACETEXT').html(data); 
				   Create_Hashes(data);
				   // if (JSPersonId() == "bbra") { alert(GLOBALS["DATALOADED"]); }	  
				   PSP_personListCompleter();
				   // alert(PSP_inputsstring());
			  }
			  stopWait();	 
		 }
		 
		 function PSP_handleDataRequestFailure(xhr, reason, ex) {
			messageAlert("Error Reason = "+"|"+xhr+"|"+reason+"|"+ex+"|");
		 	// messageAlert("You are not connected to the internet at this time");
		 } 
	 } else {
		// load data using generic.js wait until this is finished  
		if (GLOBALS["DATALOADED"] == "Yes") { PSP_personListCompleter(); }
		 else {
			 setTimeout( function() {
				 if (GLOBALS["DATALOADED"] == "Yes") {  PSP_personListCompleter();}
				 else {
					 setTimeout( function() {
						 if (GLOBALS["DATALOADED"] == "Yes") { PSP_personListCompleter();}
						 else {
							 setTimeout( function() {
								 if (GLOBALS["DATALOADED"] == "Yes") {  PSP_personListCompleter();}
								 else {
									 setTimeout( function() {
										 if (GLOBALS["DATALOADED"] == "Yes") { PSP_personListCompleter();}
									 }, 3000);
								 }								 
							 }, 3000);
						 }						 
					 }, 3000);
				 }			 
			 }, 3000);
		 } 
	
	 }
}); 

function PSP_showDialogue(e) {
 activeTargetButtonId = e.target.id
 // alert("PSP_showDialogue called"+activeTargetButtonId);

 for (fn in targetButtonIdArray) {
	  var showbutton = "0";
	  if (multiButtonShow == "all") { showbutton = "1"; }
	  if ((multiButtonShow == "active")&&(targetButtonIdArray[fn] == activeTargetButtonId)) { showbutton = "1"; }	  
	  if (showbutton == "1") {
	   selectButtonShowArray[fn] = "show";
	   if (selectionmode == "buildfulllist") {
	    document.getElementById(targetButtonIdArray[fn]+"_row").style.display = "table-row";
	    document.getElementById(targetButtonIdArray[fn]+"_result").value = document.getElementById(targetFieldOrProgramArray[fn]).value;  
	   }
	  } else {
	   selectButtonShowArray[fn] = "hide";
	   if (selectionmode == "buildfulllist") {	   
		   if ((selectButtonTypeArray[fn] == "field")||(selectButtonTypeArray[fn] == "rows")||(selectButtonTypeArray[fn] == "datatablerows")||(selectButtonTypeArray[fn] == "divs")) {
		    document.getElementById(targetButtonIdArray[fn]+"_row").style.display = 'none';
		   }
	   }
	  }	  
 }
 for (var fi in personShowFieldNameArray) {
  var presearchstr = ""; 
  try { presearchstr = document.getElementById(personShowFieldNameArray[fi]+"_presearch").value;}
  catch (err) {presearchstr = "";}
  document.getElementById(personShowFieldNameArray[fi]+"_search").value = presearchstr;
  personSearchFieldDataArray[fi] = presearchstr; 
  $("#"+personShowFieldNameArray[fi]+"_search").on('keydown', function(event) { PSP_searchOnEnter(event); }) 
  
 }
 $("#"+"search_button").on('click', function(event) { PSP_search(); }) 
 $("#"+"searchclear_button").on('click', function(event) { PSP_searchclear(); })  
 PSP_populatePersonDataTable();
 $("#personSelectDialog").dialog("open");
 $("#personSelectDialog").dialog( "option", "modal", true );
}

function PSP_searchOnEnter(e) {	
 if( e.keyCode == 13){PSP_search(e);}	  
}

function PSP_hideDialogue(e) {
	$("#personSelectDialog").dialog("close");
}

function PSP_populatePersonDataTable( ) {
	// alert("PSP_populatePersonDataTable called "+activeTargetButtonId);
	selectdatatable = $('#personSelectTable').DataTable();
	selectdatatable.clear().draw();		
	var searchfieldfound = "0";
	
	for (var fi in personShowFieldNameArray) {
	    if (personSearchFieldDataArray[fi] != "") {
	    	searchfieldfound = "1";	
	    }    
	}	
	// alert("searchfieldfound = "+searchfieldfound);
	if ( searchfieldfound == "1" ) {	
		$("#personSelectTableContainer").show();
		$("#emptyPersonSelectTableContainer").hide();
		personIdArray = Get_Array_Hash('person');
		var lastelement = personTableArray.length;
		personTableArray.splice(0,lastelement);
		// alert("PSP_populatePersonDataTable called - "+personIdArray.length+ " "+personTableArray.length,"info"); 
		if (personIdArray.length >0) {
			  var foundindex = 0;
			  for (var personindex in personIdArray) {
				   tpersonId = personIdArray[personindex]; 
				   Get_Data_Hash('person',tpersonId);
				   var selectedPersonId = "1";
				   var outrowarray = Array ();
				   for (var fi in personShowFieldNameArray) {
						listtext = GLOBALS[personShowFieldNameArray[fi]];
					    if (personSearchFieldDataArray[fi] != "") {
						     var searchlen = personSearchFieldDataArray[fi].length;
						     var searchlowertext = personSearchFieldDataArray[fi].toLowerCase();
						     var targetlowertext = listtext.toLowerCase();
						     // +" "+searchlowertext+" "+targetlowertext,"info");
						     if (targetlowertext.substring(0, searchlen) != searchlowertext) { selectedPersonId = "0"; }	
					    }
					    outrowarray.push(listtext); 	    
				   }
				   if (selectedPersonId == "1") {
					    for (fn in targetButtonIdArray) {					    	
						     var showbutton = "0";
						     if (multiButtonShow == "all") { showbutton = "1";}
						     if ((multiButtonShow == "active")&&(targetButtonIdArray[fn] == activeTargetButtonId)) {showbutton = "1";}  
						     if (showbutton == "1") {
						    	 if ( selectButtonTypeArray[fn] == "program" ) {
						    		var listtext = selectButtonLabelArray[fn];
						    		var dataparms = "&ActionPersonId="+tpersonId;
						    		if (fieldOutParameter != "") {
						    			dataparms = dataparms+"&ActionParameter="+fieldOutParameter;	    
						    		}						    		
						    		var pgmpath = JSSitePHPURL();  
						    		var sUrl = pgmpath+"/"+JSCodeVersion()+"_"+targetFieldOrProgramArray[activeButtonIndex]+STDPARMS()+dataparms;
						    		// alert(sUrl);
						    		var sq = "'";
						    		var $innerhtmltext = '<button onclick="return popitup('+sq+sUrl+sq+','+sq+winn+sq+','
						    		+sq+winy+sq+','+sq+winx+sq+','+sq+winh+sq+','+sq+winw+sq+')">'+selectButtonLabelArray[activeButtonIndex]+'</button>'; 	
						    		outrowarray.push($innerhtmltext);
						    	 } else {
						    		var listtext = 'Add to "'+selectButtonLabelArray[fn]+'" List';
						    		outrowarray.push('<button type="button" id="SelectButton_'+tpersonId+"_"+targetButtonIdArray[fn]+'">'+listtext+'</button>'); 	 
						    	 }
						     }
					    }
					    personTableArray[foundindex] = outrowarray;
					    selectdatatable.row.add( outrowarray ).draw( false );
					    foundindex++;
				   }
			  }
		}
		
	    setTimeout( function(){  /// This is a workaround to force the datatable to realign headngs and data
	    	$('#personSelectTable').DataTable().search( '' ).draw();
	    }, 10 );

	} else {
		$("#personSelectTableContainer").hide();
		$("#emptyPersonSelectTableContainer").show();
	}
	
    $('button[id^="SelectButton_"]').click(function( event ) {
	  	// alert(event.target.id);
    	var xa = event.target.id.split("_");
    	var personid = xa[1];
    	if (xa.length == 3 ) { var button = xa[2]; }
    	if (xa.length == 4 ) { var button = xa[2]+"_"+xa[3]; }    	
  	  	PSP_buttonClicked(personid,button); 	  
    });	  
	// if (JSPersonId() == "bbra" ) { print_r(personTableArray); }
}

function PSP_buttonClicked(activePersonId, activeButton){
	
 // alert("PSP_buttonClicked"+" "+activePersonId+" "+activeButton);
 activePersonTableIndex = -1;     
 tactivePersonTableIndex = -1;
 for (personId in personIdArray) {
  tactivePersonTableIndex++; 
  if (activePersonId == personIdArray[personId]) {
   activePersonTableIndex = tactivePersonTableIndex;
  }
 } 
 for (fn in targetButtonIdArray) {
  if (selectButtonShowArray[fn] == "show") {
   if (activeButton == targetButtonIdArray[fn]) { 
	activeButtonIndex = fn;	
   } 	
  }  
 }

 Get_Data_Hash('person',activePersonId);
 if (selectionmode == "buildfulllist") {
	 var resultText = document.getElementById(activeButton+"_result").value;
	 if (resultText == "") {sep = "";} else {sep = ",";}
	 resultText = resultText+sep+activePersonId;	 
	 document.getElementById(activeButton+"_result").value = resultText;	 
 }
 if (selectionmode == "singleaddtolist") {
	 var originalText = document.getElementById(targetFieldOrProgramArray[activeButtonIndex]).value;
	 document.getElementById(targetFieldOrProgramArray[activeButtonIndex]).value = AddToList(originalText,activePersonId);		 
	 // alert("Added - "+document.getElementById(targetFieldOrProgramArray[fn]).value);
	 PSP_personListCompleter();
	 $("#personSelectDialog").dialog("close");
 }
 if (selectionmode == "singlereplacelist") {
	 document.getElementById(targetFieldOrProgramArray[activeButtonIndex]).value = activePersonId;		 
	 // alert("Replaced - "+document.getElementById(targetFieldOrProgramArray[fn]).value);
	 PSP_personListCompleter();
	 $("#personSelectDialog").dialog("close");
 }
 if (selectionmode == "multiprogramlinks") {
	 // alert("multiprogramlinks TBC - "+activePersonId); 
 }
}

function PSP_search() {
  // alert("PSP_search called "+searchinprogress);
 $("#search_button").hide();	
 $("#search_button_spinner").show();
 setTimeout(PSP_search2, 50);
}


function PSP_search2() {
 if ( searchinprogress == "0") { 
  searchinprogress = "1";		
  personSearchFieldDataArray = Array ();
  for (var fn in personShowFieldNameArray) {
   try { ts = document.getElementById(personShowFieldNameArray[fn]+"_search").value; }
   catch (err) {ts = "ERROR";}  	 
   if (ts != "ERROR"){personSearchFieldDataArray[fn]=document.getElementById(personShowFieldNameArray[fn]+"_search").value; }
   else {personSearchFieldDataArray[fn]="";}
  }
  PSP_populatePersonDataTable(); 
  $("#personSelectDialog").dialog("open");
  searchinprogress = "0";
 } 
 $("#search_button").show();	
 $("#search_button_spinner").hide();
}




function PSP_searchclear() {
 if ( searchinprogress == "0") { 
  searchinprogress = "1";	
  personSearchFieldDataArray = Array ();
  for (var fn in personShowFieldNameArray) {
   document.getElementById(personShowFieldNameArray[fn]+"_search").value = "";
   personSearchFieldDataArray[fn]="";
  }
  PSP_populatePersonDataTable();
  $("#personSelectDialog").dialog("open");
  searchinprogress = "0";
 }
} 

function PSP_personListCompleter () {
 // alert("PSP_personListCompleter called ");
 // This routine assumes that the target list has been previuosly updated
 //	 Get_Data_Hash('person',"bbra");
 //	 alert(GLOBALS["person_section"]);	
	
 for (fn in targetButtonIdArray) {
	 
  if (selectButtonTypeArray[fn] == "field") {
   try { ts = document.getElementById(targetPersonListArray[fn]).innerHTML; }
   catch (err) {ts = "ERROR";}
   if (ts != "ERROR"){
    tpida = document.getElementById(targetFieldOrProgramArray[fn]).value.split(",");   
    tpersonlist = "";
    for (tpindex in tpida) {
     tpid = tpida[tpindex];
     var tpidc = tpid.replace(/ /g,"");
     Get_Data_Hash('person',tpidc);
     // alert(tpidc+"  "+GLOBALS["IOERROR"]+" "+GLOBALS['person_fname']+" "+GLOBALS['person_sname'])
     if (GLOBALS["IOERROR"] == "0") {
      tpersonlist = tpersonlist+GLOBALS['person_fname']+" "+GLOBALS['person_sname']+"<br>";
     } else {
      if (tpidc != "") { tpersonlist = tpersonlist+"<b>|"+tpidc+"| - unknown"+"</b><br>"; }    	 
     }
    }
    document.getElementById(targetPersonListArray[fn]).innerHTML = tpersonlist;    	 
   }
  }
  
  if (selectButtonTypeArray[fn] == "rows") {
	var jqselecttext = 'tr[id^="'+targetPersonListArray[fn]+'_row_"]' 		
    $(jqselecttext).remove(); // remove all rows in table xa[0]    	
    var latestPersonList = document.getElementById(targetFieldOrProgramArray[fn]).value;
    var latestPersonListArray = Array();
    if ( latestPersonList != "" ) {
	    latestPersonListArray = latestPersonList.split(",");
	    var rowclass = "odd";
	    for (pn in latestPersonListArray) { 
	    	// alert(latestPersonListArray[pn]);
	    	Get_Data_Hash('person',latestPersonListArray[pn]);
	    	if (GLOBALS["IOERROR"] == "0") { // person exists
		    	if (rowclass == "odd") {rowclass = "even";} else {rowclass = "odd";}
		    	var appendrowtext = '<tr class="'+rowclass+'" id="'+targetPersonListArray[fn]+'_row_'+latestPersonListArray[pn]+'">';
		    	fa = targetPersonListFieldsArray[fn].split("+");
		    	for (fi in fa) {
		        	appendrowtext = appendrowtext+'<td>';           	
		        	if ((fa[fi] == "remove")||(fa[fi] == "update")) {
			        	if (fa[fi] == "remove") {	        		
			        		appendrowtext = appendrowtext+'<a id="remove_'+fn+"_"+latestPersonListArray[pn]+'">remove</a>';
			        	}
			        	if (fa[fi] == "update") {
			        		dataparms = "&ActionPersonId="+latestPersonListArray[pn];
			        		var uUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_personCHANGEpopupout.php"+STDPARMS()+dataparms; 		        		
			        		appendedtext = '<a onclick="return popitup(' + "'" + uUrl + "','updateperson','center','center','800','800')" + '"' + ' href="'+uUrl+'">update</a>';
			        		// alert(appendedtext);
			        		appendrowtext = appendrowtext+appendedtext;
			        	}
		        	} else {
		        		if ( fa[fi].indexOf(']') > -1) {  // special formatting	        		
		        			xxa = fa[fi].split("[");
			        		yya = xxa[1].split("]");
			        		zza = yya[0].split("=");		        		
			        		var functionname = zza[0];
			        		var parametervalue = zza[1];
			        		if ( functionname == "AgeFilter" ) { var listtext = Age(GLOBALS[xxa[0]],parametervalue); }
			        		if ( functionname == "RAGCompare" ) { 
			        			if ( GLOBALS[xxa[0]] == parametervalue ) {
			        				var listtext = '<span style="color:green">'+GLOBALS[xxa[0]]+'</span>';
			        			} else {
			        				var listtext = '<span style="color:red">'+GLOBALS[xxa[0]]+'</span>';
			        			}
			        		}			        		
		        		} else {
		        			var listtext = GLOBALS[fa[fi]];	        			
		        		}	
		        		if (listtext == "0000-00-00") { listtext = ""; } 
		        		appendrowtext = appendrowtext+listtext;            		
		        	}
		        	appendrowtext = appendrowtext+'</td>';            
		        }
		       	appendrowtext = appendrowtext+'</tr>';
			   	var jqselecttext = '#'+targetPersonListArray[fn]; 
				$(jqselecttext).append(appendrowtext);
	    	}
	    }
    } else {
    	var appendrowtext = '<tr class="odd" id="'+targetPersonListArray[fn]+'_row_0"><td>Nothing selected so far</td></tr>';
	   	var jqselecttext = '#'+targetPersonListArray[fn]; 
		$(jqselecttext).append(appendrowtext);	     	
    }
  }


  if (selectButtonTypeArray[fn] == "datatablerows") {
	  var rowarray = Array(targetPersonListFieldsArray[fn].length);
	  thisdatatable = $('#'+targetPersonListArray[fn]).DataTable();
	  thisdatatable.clear().draw();	 
	  var latestPersonList = document.getElementById(targetFieldOrProgramArray[fn]).value;
	  var latestPersonListArray = Array();
	  if ( latestPersonList != "" ) {
	    latestPersonListArray = latestPersonList.split(",");
	    for (pn in latestPersonListArray) { 
	    	// alert(latestPersonListArray[pn]);
	    	Get_Data_Hash('person',latestPersonListArray[pn]);
	    	if (GLOBALS["IOERROR"] == "0") { // person exists
	    		rowarray.length = 0; // clear atrray
		    	fa = targetPersonListFieldsArray[fn].split("+");
		    	for (fi in fa) { 
		    		var listtext = "";
		        	if ((fa[fi] == "remove")||(fa[fi] == "update")) {
			        	if (fa[fi] == "remove") {	        		
			        		listtext = '<a id="remove_'+fn+"_"+latestPersonListArray[pn]+'">remove</a>';
			        	}
			        	if (fa[fi] == "update") {
			        		dataparms = "&ActionPersonId="+latestPersonListArray[pn];
			        		var uUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_personCHANGEpopupout.php"+STDPARMS()+dataparms; 		        		
			        		listtext = '<a onclick="return popitup(' + "'" + uUrl + "','updateperson','center','center','800','800')" + '"' + ' href="'+uUrl+'">update</a>';
			        	}
		        	} else {
		        		if ( fa[fi].indexOf(']') > -1) {  // special formatting	        		
		        			xxa = fa[fi].split("[");
			        		yya = xxa[1].split("]");
			        		zza = yya[0].split("=");		        		
			        		var functionname = zza[0];
			        		var parametervalue = zza[1];
			        		if ( functionname == "AgeFilter" ) { var listtext = Age(GLOBALS[xxa[0]],parametervalue); }
			        		if ( functionname == "RAGCompare" ) { 
			        			if ( GLOBALS[xxa[0]] == parametervalue ) {
			        				var listtext = '<span style="color:green">'+GLOBALS[xxa[0]]+'</span>';
			        			} else {
			        				var listtext = '<span style="color:red">'+GLOBALS[xxa[0]]+'</span>';
			        			}
			        		}			        		
		        		} else {
		        			var listtext = GLOBALS[fa[fi]];
		        		}	
		        		if (listtext == "0000-00-00") { listtext = ""; }            		
		        	} 
		        	rowarray.push(listtext); 
		        }
		    	thisdatatable.row.add( rowarray ).draw( false );
	    	}  else {  // person does not exist
	    		rowarray.length = 0; // clear atrray
		    	fa = targetPersonListFieldsArray[fn].split("+");
		    	for (fi in fa) { 
		    		var listtext = "";
		        	if (fa[fi] == "remove") {	        		
		        		listtext = '<a id="remove_'+fn+"_"+latestPersonListArray[pn]+'">remove</a>';
		        	} else {
			        	if (fa[fi] == "person_id") {	        		
			        		listtext = latestPersonListArray[pn];
			        	} else {
		        			listtext = "?????";
		        		}
		        	} 
		        	rowarray.push(listtext); 
		        }
		    	thisdatatable.row.add( rowarray ).draw( false );
	    	}
	    }
	  } else {
		  alert("Nothing selected so far"); 
	  }
	  thisdatatable.columns.adjust().draw();
	  // there is still a problem with maintaining manual sort capability after adding extra rows after a previous sort
  }    
  
  if (selectButtonTypeArray[fn] == "divs") {

  } 
  
  // add listeners for deletions   
  if ((selectButtonTypeArray[fn] == "rows")||(selectButtonTypeArray[fn] == "datatablerows")) {
	// add listeners for deletions
	var xa = targetPersonListArray[fn].split("(");
    $('a[id^="remove_"]').click(function( event ) {
    	  if (selectButtonTypeArray[fn] == "rows") {
    		  // remove_1_bbra
    		  // alert(event.target.id);
	    	  xxa = event.target.id.split("_");
    		  var targetfield = targetFieldOrProgramArray[xxa[1]];	    	  
	    	  PSP_personRowListDeleter(targetfield,xxa[2]);    		    
    	  }
    	  if (selectButtonTypeArray[fn] == "datatablerows") {
    		  // remove_1_bbra
    		  // alert(event.target.id);
	    	  xxa = event.target.id.split("_");
    		  var targetfield = targetFieldOrProgramArray[xxa[1]];	    	    	  
	    	  var thisdatatablerow = thisdatatable.row( $(this).parents('tr') );
	    	  PSP_personDataTableRowListDeleter(thisdatatable,thisdatatablerow,targetfield,xxa[2]);    		    
    	  }    	
    });	  
  }
  

  if (selectButtonTypeArray[fn] == "divs") {
		alert("divs TBC");
  }
  
  // record target list as being updated if required (eg to warn against unsaved updates)   
  var jqselecttext = '#'+targetPersonListArray[fn]+'_modified'; 
  if($(jqselecttext).length != 0) {
	  if (initialpersonlistload != "1") {  // not for initial load of personlist
		  $(jqselecttext).val('Yes').trigger('change');
		  // alert(jqselecttext);
	  }
  }
 }
 initialpersonlistload = "0";
} 
 
function PSP_personRowListDeleter (targetfield,personid) {
	 Get_Data_Hash('person',personid);
	 if (confirm('Are you sure you want to remove '+GLOBALS['person_fname']+" "+GLOBALS['person_sname']+' from the list '+activeButtonIndex)) { 
		var jqselecttext = 'tr[id="'+targetPersonListArray[activeButtonIndex]+'_row_'+personid+'"]'
	    $(jqselecttext).remove();
		
		var originalText = document.getElementById(targetfield).value;
		document.getElementById(targetfield).value = RemoveFromList(originalText,personid);
		// alert("Removed - "+document.getElementById(targetFieldOrProgramArray[fn]).value);
		  
		var jqselecttext = '#'+targetPersonListArray[0]+'_modified'; 
		if($(jqselecttext).length != 0) {
			$(jqselecttext).val('Yes').trigger('change');
			  // alert(jqselecttext);
		}
	 }
}

function PSP_personDataTableRowListDeleter (datatable,datatablerow,targetfield,personid) {
	Get_Data_Hash('person',personid);
	if (GLOBALS["IOERROR"] == "0") { // person exists	
		 if (confirm('Are you sure you want to remove '+GLOBALS['person_fname']+" "+GLOBALS['person_sname']+' from the list '+targetfield)) { 
			datatable.row(datatablerow).remove().draw();
			var originalText = document.getElementById(targetfield).value;
			document.getElementById(targetfield).value = RemoveFromList(originalText,personid);
			// alert("Datatable Row Removed - "+document.getElementById(targetFieldOrProgramArray[fn]).value);
			  
			var jqselecttext = '#'+targetPersonListArray[0]+'_modified'; 
			if($(jqselecttext).length != 0) {
				$(jqselecttext).val('Yes').trigger('change');
				  // alert(jqselecttext);
			}
			datatable.columns.adjust().draw(); 
		 }
	} else {
		datatable.row(datatablerow).remove().draw();
		var originalText = document.getElementById(targetfield).value;
		document.getElementById(targetfield).value = RemoveFromList(originalText,personid);
		// alert("Datatable Row Removed - "+document.getElementById(targetFieldOrProgramArray[fn]).value);
		  
		var jqselecttext = '#'+targetPersonListArray[0]+'_modified'; 
		if($(jqselecttext).length != 0) {
			$(jqselecttext).val('Yes').trigger('change');
			  // alert(jqselecttext);
		}
		datatable.columns.adjust().draw(); 
	}
}

function PSP_personDivListDeleter (div,personid) {

	alert("divs deletion TBC");
}
YAHOO.namespace ("BBpersonselectpopup");

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

function PSP_initPage() {
//   myLogConfigs = {width: "700px", right: "10em", top: "10%", fontSize: "100%" };
//   myLogContainer = null;
//   myLogReader = new YAHOO.widget.LogReader(myLogContainer, myLogConfigs);
//   YAHOO.log("init called","info");	

 // prevent form submission on enter - eg to view names	
 $(document).on('keyup keypress', 'form input[type="textbox"]', function(e) {
	if(e.keyCode == 13) {
		e.preventDefault();
		return false;
	}
 });	
 parm0 = document.getElementById("PSP_parm0").value;
 parm1 = document.getElementById("PSP_parm1").value;
 parm2 = document.getElementById("PSP_parm2").value;
 parm3 = document.getElementById("PSP_parm3").value;
 parm4 = document.getElementById("PSP_parm4").value;
 parm5 = document.getElementById("PSP_parm5").value;
 parm6 = document.getElementById("PSP_parm6").value;
 parm7 = document.getElementById("PSP_parm7").value; 
 // $parm0 = Fields to download - this/other,person_id|persons_fname|person_sname|person_email1
 // $parm1 = Fields to show in search list - person_sname,SurName,70|persons_fname,FirstName,90|person_id,Id,90|person_email1,Email,90
 // $parm2 = Buttons Id – field,To,To..,ToPersonIdList,ToPersonNameList,70|field,Cc,CC..,CcDistList,CcPersonList,70
 // $parm2 = Buttons Id – program,View,View..,,personLUin.php,70 
 // $parm2 = Buttons Id – rows,Squad,Add_To_Squad,person_squadlist(replace/addto),persontable(field1+field2[AgeFilter=18]+field3+delete),70
 // $parm3 = Output Field Name,parameter - e.g person_id or person_email1 (parameter optional)
 // $parm4 = Buttons to show on output - "all" or "active"
 // $parm5 = New Window positioning name|topx|topy|width|height
 // $parm6 = view/change -  e.g authority to handle data returned
 // $parm7 = buildfulllist/singleaddtolist/singlereplacelist/multiprogramlinks - build a list of results/close after each selection/keepopen after each selection 
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
  personSelectDialogObject.hide();   
 };
 var PSP_handleDialogCancel = function() {	this.cancel(); };
 var PSP_handleDialogClose = function() {	this.cancel(); }; 

 if (selectionmode == "buildfulllist") {
	 personSelectDialogObject = new YAHOO.widget.Dialog("personSelectDialog", 
	 	{ width : "950px",
		  zIndex: 60,
		  iframe : true,
	 	  fixedcenter : true,
	 	  visible : false, 
	 	  constraintoviewport : false,
	 	  buttons : [ { text:"OK", handler:PSP_handleDialogBuildListComplete, isDefault:true },
	 			      { text:"Cancel", handler:PSP_handleDialogCancel } ]
	 });
 } else {
	 personSelectDialogObject = new YAHOO.widget.Dialog("personSelectDialog", 
	 	{ width : "950px",
		  zIndex: 60,
		  iframe : true,
	 	  fixedcenter : true,
	 	  visible : false, 
	 	  constraintoviewport : false,
	 	  buttons : [ { text:"Close", handler:PSP_handleDialogClose, isDefault:true } ]
	 });
 }
 
 personSelectDialogObject.render();
 $('#personSelectDialogouter').appendTo('body'); 
 // add listeners to all buttons and text input boxes
 for (fn in targetButtonIdArray) {
	 YAHOO.util.Event.addListener(targetButtonIdArray[fn],"click",PSP_showDialogue);	 
	 if (selectButtonTypeArray[fn] == "field") {	 
		  YAHOO.util.Event.addListener(targetFieldOrProgramArray[fn],"change",PSP_personListCompleter);
	 }
 }
 for (var fi in personShowFieldNameArray) {
  var presearchstr = ""; 
  try { presearchstr = document.getElementById(personShowFieldNameArray[fi]+"_presearch").value;}
  catch (err) {presearchstr = "ERROR";}
  if (presearchstr != "ERROR") {
   // alert(personShowFieldNameArray[fi]+"_presearch");	  
   YAHOO.util.Event.addListener(personShowFieldNameArray[fi]+"_presearch","change",PSP_showDialogue);
  }
 }

if (dataprovidedby == "this") { // get person data - NOte if Parm0 = "" then it has laready been loaded by another routine eg generic.js
	 setupWait(); 
	 // setup the local hash databases
	 var PSP_handleDataRequestSuccess = function(o){
	  // YAHOO.log("The DataRequestSuccess handler was called; this transaction did not abort.  tId: " + o.tId + ".", "info");
	  if(o.responseText != undefined){
	   // alert(o.responseText);
	   // $('#TRACETEXT').html(o.responseText); 
	   Create_Hashes(o.responseText);
	   // if (JSPersonId() == "bbra") { alert(GLOBALS["DATALOADED"]); }	  
	   PSP_personListCompleter();
	   // alert(PSP_inputsstring());
	  }
	  stopWait();
	 }
	 var PSP_handleDataRequestFailure = function(o){
	  // YAHOO.log("The DataRequestFailure handler was called; this transaction aborted.  tId: " + o.tId + ".", "info", "example");
	  // response = "";  
	  // response += "<li>Transaction id: " + o.tId + "</li>";
	  // response += "<li>HTTP status: " + o.status + "</li>";
	  // response += "<li>Status code message: " + o.statusText + "</li>";
	  alert("Error: "+o.statusText);
	  stopWait();
	 }
	 var dataRequestCallback =
	 {
	 success: PSP_handleDataRequestSuccess,
	 failure: PSP_handleDataRequestFailure,
	 timeout: 80000
	 };
	 personfieldsrequired = ""; var sep = "";
	 for (i in personFieldNameArray) {
	 personfieldsrequired = personfieldsrequired + sep + personFieldNameArray[i];	 
	 sep = "|";
	 }	  
	 personselectioncriteria = ""; 
	 dataparms = "&PersonViewChange="+viewchange+"&PersonFieldsRequired="+personfieldsrequired+"&PersonSelectionCriteria="+personselectioncriteria;
	 var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_javascriptpersonprovider.php"+STDPARMS()+dataparms; 
	 // YAHOO.log("makeDataRequest - "+sUrl,"info");
	 // alert(sUrl);
	 startWait("");  
	
	 YAHOO.util.Connect.asyncRequest('GET', sUrl, dataRequestCallback);
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

}

function PSP_showDialogue(e) {
 var selEl = YAHOO.util.Event.getTarget(e);
 activeTargetButtonId = selEl.id;
 // YAHOO.log("PSP_showDialogue called","info");
 // alert("PSP_showDialogue called");
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
		   if ((selectButtonTypeArray[fn] == "field")||(selectButtonTypeArray[fn] == "rows")||(selectButtonTypeArray[fn] == "divs")) {
		    document.getElementById(targetButtonIdArray[fn]+"_row").style.display = 'none';
		   }
	   }
	  }	  
 }
 for (var fi in personShowFieldNameArray) {
  var presearchstr = ""; 
  // YAHOO.log(personShowFieldNameArray[fi]+"_presearch","info");
  try { presearchstr = document.getElementById(personShowFieldNameArray[fi]+"_presearch").value;}
  catch (err) {presearchstr = "";}
  document.getElementById(personShowFieldNameArray[fi]+"_search").value = presearchstr;
  personSearchFieldDataArray[fi] = presearchstr;
  YAHOO.util.Event.addListener(personShowFieldNameArray[fi]+"_search","keydown",PSP_searchOnEnter);  
 }
 YAHOO.util.Event.addListener("search_button","click",PSP_search);
 YAHOO.util.Event.addListener("searchclear_button","click",PSP_searchclear); 
 PSP_createPersonTableArray();
 PSP_populatePersonTable();
 personSelectDialogObject.show();

}

function PSP_searchOnEnter(e) {
 // YAHOO.log("PSP_searchOnEnter called","info");		
 if( e.keyCode == 13){PSP_search(e);}	  
}

function PSP_hideDialogue(e) {
 // YAHOO.log("PSP_hideDialogue called","info");	
 personSelectDialogObject.hide();
}

function PSP_createPersonTableArray( ) {
 // YAHOO.log("PSP_createPersonTableArray called "+activeTargetButtonId,"info");
 // alert("PSP_createPersonTableArray called "+activeTargetButtonId);	
 personIdArray = Get_Array_Hash('person');
 var lastelement = personTableArray.length;
 personTableArray.splice(0,lastelement);
 // YAHOO.log("PSP_createPersonTableArray called - "+personIdArray.length+ " "+personTableArray.length,"info"); 
 // alert("PSP_createPersonTableArray called - "+personIdArray.length+ " "+personTableArray.length,"info"); 
 if (personIdArray.length >0) {
  var foundindex = 0;
  for (var personindex in personIdArray) {
   tpersonId = personIdArray[personindex];
   // YAHOO.log(tpersonId,"info");    
   Get_Data_Hash('person',tpersonId);
   var selectedPersonId = "1";
   var temparray = Array ();
   for (var fi in personShowFieldNameArray) {
	listtext = GLOBALS[personShowFieldNameArray[fi]];
    if (personSearchFieldDataArray[fi] != "") {
     var searchlen = personSearchFieldDataArray[fi].length;
     var searchlowertext = personSearchFieldDataArray[fi].toLowerCase();
     var targetlowertext = listtext.toLowerCase();
     // YAHOO.log(personShowFieldNameArray[fi]+" "+personSearchFieldDataArray[fi]+" "+listtext+" "+searchlen
     // +" "+searchlowertext+" "+targetlowertext,"info");
     if (targetlowertext.substring(0, searchlen) != searchlowertext) { selectedPersonId = "0"; }	
    }
	temparray.push(listtext); 	    
   }
   if (selectedPersonId == "1") {
    // YAHOO.log(tpersonId+" FOUND","info");
    for (fn in targetButtonIdArray) {
     var showbutton = "0";
     if (multiButtonShow == "all") { showbutton = "1"; }
     if ((multiButtonShow == "active")&&(targetButtonIdArray[fn] == activeTargetButtonId)) { showbutton = "1"; }  
     if (showbutton == "1") {
      listtext = selectButtonLabelArray[fn];  
      temparray.push(listtext);
     }
    }
    personTableArray[foundindex] = temparray;
    foundindex++;
   }
  }
 }
 // if (JSPersonId() == "bbra" ) { print_r(personTableArray); }
 // YAHOO.log("PSP_createPersonTableArray finished - "+personIdArray.length+ " "+personTableArray.length,"info");   
}

function PSP_populatePersonTable() {
 // YAHOO.log("PSP_populatePersonTable called "+searchinprogress,"info");
 // Override the built-in formatter to create the program link 
 // alert("PSP_populatePersonTable called "+searchinprogress);	
 YAHOO.widget.DataTable.formatLink  = function(elLiner, oRecord, oColumn, oData) {   
  var oColumnname = oColumn.getKey();
  activePersonTableRow = oRecord;
  activePersonId = oRecord.getData("person_id");
  activePersonTableIndex = -1;     
  tactivePersonTableIndex = -1;
  for (personId in personIdArray) {
   tactivePersonTableIndex++; 
   if (activePersonId == personIdArray[personId]) {
    activePersonTableIndex = tactivePersonTableIndex;
   }
  }
  // alert("PSP_populatePersonTable - b");	  
  for (fn in targetButtonIdArray) {
   if (selectButtonShowArray[fn] == "show") {
    if (oColumnname == targetButtonIdArray[fn]+"_select") {  
	 activeButtonIndex = fn;
    } 	
   }   
  }
  // alert("PSP_populatePersonTable - c");	
  dataparms = "&ActionPersonId="+activePersonId;
  if (fieldOutParameter != "") {
	  dataparms = dataparms+"&ActionParameter="+fieldOutParameter;	    
  }
  var pgmpath = JSSitePHPURL();
  if (targetFieldOrProgramArray[activeButtonIndex].indexOf(".cgi") != -1) { pgmpath = JSSitePerlURL(); }  
  var sUrl = pgmpath+"/"+JSCodeVersion()+"_"+targetFieldOrProgramArray[activeButtonIndex]+STDPARMS()+dataparms;
  // alert(sUrl);
  var sq = "'";
  var $innerhtmltext = '<a href="'+sUrl+'" onclick="return popitup('+sq+sUrl+sq+','+sq+winn+sq+','
  +sq+winy+sq+','+sq+winx+sq+','+sq+winh+sq+','+sq+winw+sq+')">'+selectButtonLabelArray[activeButtonIndex]+'</a>'; 
  elLiner.innerHTML = $innerhtmltext;   
 };   

 // myColumnDefs ========================================================================== 
 var myColumnDefsstring = "";
 myColumnDefsstring = myColumnDefsstring + "var myColumnDefs = ["; 
 bigsep = "";
 for (var fn in personShowFieldNameArray) {
   myColumnDefsstring = myColumnDefsstring + bigsep + '{'
    + 'key:"'+ personShowFieldNameArray[fn] + '", '
    + 'label:"' + personShowFieldTitleArray[fn] + '", '   
    + 'width:' + personShowFieldWidthArray[fn] + ', '   
    + 'resizeable:true,sortable:true'   
    + '}';
   bigsep = ',';   
 } 
 for (fn in targetButtonIdArray) {
	//  YAHOO.log(targetButtonIdArray[fn]+"---"+selectButtonShowArray[fn],"info");	 
  if (selectButtonShowArray[fn] == "show") {
   if ((selectButtonTypeArray[fn] == "field")||(selectButtonTypeArray[fn] == "rows")||(selectButtonTypeArray[fn] == "divs")) {
    myColumnDefsstring = myColumnDefsstring + bigsep + '{'
	 + 'key:"'+ targetButtonIdArray[fn] + '_select", '
	 + 'label:"' + selectButtonLabelArray[fn] + '", '   
	 + 'width:' + selectButtonWidthArray[fn] + ', '   
	 + 'formatter:YAHOO.widget.DataTable.formatButton'   
	 + '}';
   } 
   if (selectButtonTypeArray[fn] == "program") { // a program
    myColumnDefsstring = myColumnDefsstring + bigsep + '{'
	 + 'key:"'+ targetButtonIdArray[fn] + '_select", '
	 + 'label:"' + selectButtonLabelArray[fn] + '", '   
	 + 'width:' + selectButtonWidthArray[fn] + ', '   
	 + 'formatter:YAHOO.widget.DataTable.formatLink'   
	 + '}';
   }
  } 
 }
 myColumnDefsstring = myColumnDefsstring + ']';
 // YAHOO.log(myColumnDefsstring,"info");
 // alert(myColumnDefsstring);
 // end myColumnDefs ==========================================================================  
 eval(myColumnDefsstring);
 
 var personSource = new YAHOO.util.DataSource(personTableArray);
 personSource.responseType = YAHOO.util.XHRDataSource.TYPE_JSARRAY;
 // personSource.responseSchema ========================================================== 
 var responseSchemastring = "";
 responseSchemastring = responseSchemastring + "personSource.responseSchema = { fields: ["; 
 bigsep = "";
 for (var fn in personShowFieldNameArray) {
  responseSchemastring = responseSchemastring + bigsep + '"' + personShowFieldNameArray[fn] + '"';
  bigsep = ",";
 }
 for (fn in targetButtonIdArray) {
  if (selectButtonShowArray[fn] == "show") {
   responseSchemastring = responseSchemastring + bigsep + '"' + targetButtonIdArray[fn] + '_select"';   
  }    
 } 
 responseSchemastring = responseSchemastring + "]}";
 // YAHOO.log(responseSchemastring,"info");
 // alert(responseSchemastring);
 // end responseSchema ======================================================================   
 eval(responseSchemastring);
 // myConfigs ====================================================================== 
 var myConfigsstring = "";
 myConfigsstring = myConfigsstring + 'var myConfigs = {'; 
 myConfigsstring = myConfigsstring + ' sortedBy:{key:"'+personShowFieldNameArray[0]+'",dir:"asc"},';
  myConfigsstring = myConfigsstring + ' paginator: new YAHOO.widget.Paginator({';
  myConfigsstring = myConfigsstring + '   rowsPerPage: 10,';
  myConfigsstring = myConfigsstring + '   template: YAHOO.widget.Paginator.TEMPLATE_ROWS_PER_PAGE,';
  myConfigsstring = myConfigsstring + '   rowsPerPageOptions: [5,10,15,20],';
  myConfigsstring = myConfigsstring + '   pageLinks: 5';
  myConfigsstring = myConfigsstring + ' }),';
 myConfigsstring = myConfigsstring + ' draggableColumns:true';
 myConfigsstring = myConfigsstring + '}';
 // YAHOO.log(myConfigsstring,"info");
 // alert(myConfigsstring);
 // end myConfigs ======================================================================  
 eval(myConfigsstring);
 
// personSelectTableObject = new YAHOO.widget.ScrollingDataTable("personSelectTable", myColumnDefs, personSource, {   
//	    height: "400px" // height as a string value
//	});
 // alert("there4");
 if (firstdatatable == "1") {firstdatatable = "0";}
 else {
  personSelectTableObject.destroy();	  
  // alert("datatable destroyed");
 }
 personSelectTableObject = new YAHOO.widget.DataTable("personSelectTable", myColumnDefs, personSource, myConfigs);
 // alert("there5");	 
 personSelectTableObject.subscribe("buttonClickEvent", PSP_buttonClicked);
}

function PSP_buttonClicked(oArgs){
 var oRecord = this.getRecord(oArgs.target);
 var oColumn = this.getColumn(oArgs.target);
 var oColumnname = oColumn.getKey();
 activePersonTableRow = oRecord;
 activePersonId = oRecord.getData("person_id");
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
   if (oColumnname == targetButtonIdArray[fn]+"_select") { 
	activeButton = targetButtonIdArray[fn];
	activeButtonIndex = fn;	
   } 	
  }  
 }

 Get_Data_Hash('person',activePersonId);
 var resultelement = GLOBALS[fieldOutType];
 if (selectionmode == "buildfulllist") {
	 var resultText = document.getElementById(activeButton+"_result").value;
	 if (resultText == "") {sep = "";} else {sep = ",";}
	 resultText = resultText+sep+resultelement;	 
	 document.getElementById(activeButton+"_result").value = resultText;	 
 }
 if (selectionmode == "singleaddtolist") {
	 var originalText = document.getElementById(targetFieldOrProgramArray[activeButtonIndex]).value;
	 document.getElementById(targetFieldOrProgramArray[activeButtonIndex]).value = AddToList(originalText,resultelement);		 
	 // alert("Added - "+document.getElementById(targetFieldOrProgramArray[fn]).value);
	 PSP_personListCompleter();
	 personSelectDialogObject.hide();   
 }
 if (selectionmode == "singlereplacelist") {
	 document.getElementById(targetFieldOrProgramArray[activeButtonIndex]).value = resultelement;		 
	 // alert("Replaced - "+document.getElementById(targetFieldOrProgramArray[fn]).value);
	 PSP_personListCompleter();
	 personSelectDialogObject.hide();   
 }
 if (selectionmode == "multiprogramlinks") {
	 alert("multiprogramlinks TBC - "+resultelement);
	 
 }
 return {
  oDS: genericSourceObject,
  oDT: genericTableObject
 };
}

function PSP_search() {
 // YAHOO.log("PSP_search called "+searchinprogress,"info");
 // alert("PSP_search called "+searchinprogress);	
 if ( searchinprogress == "0") { 
  searchinprogress = "1";		
  personSearchFieldDataArray = Array ();
  for (var fn in personShowFieldNameArray) {
   try { ts = document.getElementById(personShowFieldNameArray[fn]+"_search").value; }
   catch (err) {ts = "ERROR";}  	 
   if (ts != "ERROR"){personSearchFieldDataArray[fn]=document.getElementById(personShowFieldNameArray[fn]+"_search").value; }
   else {personSearchFieldDataArray[fn]="";}
  }
  PSP_createPersonTableArray(); 
  PSP_populatePersonTable();
  personSelectDialogObject.show();
  searchinprogress = "0";
 } 
}

function PSP_searchclear() {
 // YAHOO.log("PSP_searchclear called "+searchinprogress,"info");
 if ( searchinprogress == "0") { 
  searchinprogress = "1";	
  personSearchFieldDataArray = Array ();
  for (var fn in personShowFieldNameArray) {
   document.getElementById(personShowFieldNameArray[fn]+"_search").value = "";
   personSearchFieldDataArray[fn]="";
  }
  PSP_createPersonTableArray();
  PSP_populatePersonTable();
  personSelectDialogObject.show();
  searchinprogress = "0";
 }
} 

function PSP_personListCompleter () {
 // YAHOO.log("PSP_personListCompleter called ","info")
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
			        		appendrowtext = appendrowtext+'<a id="delete_'+fn+"_"+latestPersonListArray[pn]+'">remove</a>';
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
  if (selectButtonTypeArray[fn] == "divs") {
	  
	  
  } 
  
  // add listeners for deletions   
  if (selectButtonTypeArray[fn] == "rows") {
	// add listeners for deletions
	var xa = targetPersonListArray[fn].split("(");
    $('a[id^="delete_"]').click(function( event ) {
    	  // alert(event.target.id);
    	  // delete_1_bbra
    	  xxa = event.target.id.split("_");
    	  PSP_personRowListDeleter(xxa[1],xxa[2]);
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
 
function PSP_personRowListDeleter (buttonindex,personid) {
 Get_Data_Hash('person',personid);	
 if (confirm('Are you sure you want to remove '+GLOBALS['person_fname']+" "+GLOBALS['person_sname']+' from the list '+buttonindex)) { 
	var jqselecttext = 'tr[id="'+targetPersonListArray[buttonindex]+'_row_'+personid+'"]'
    $(jqselecttext).remove();
	var originalText = document.getElementById(targetFieldOrProgramArray[buttonindex]).value;
	document.getElementById(targetFieldOrProgramArray[buttonindex]).value = RemoveFromList(originalText,personid);
	// alert("Removed - "+document.getElementById(targetFieldOrProgramArray[fn]).value);
	  
	var jqselecttext = '#'+targetPersonListArray[0]+'_modified'; 
	if($(jqselecttext).length != 0) {
		$(jqselecttext).val('Yes').trigger('change');
		  // alert(jqselecttext);
	}
 }
}

function PSP_personDivListDeleter (div,personid) {

	alert("divs deletion TBC");
}

YAHOO.util.Event.addListener(window, "load", PSP_initPage);
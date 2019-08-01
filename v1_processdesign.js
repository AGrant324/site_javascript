YAHOO.namespace ("BBprocessdesign");

//global variables

GLOBALS = new Array();

tasktemplate_id = "";
process_seq = "";
processSeqArray = Array ( );
processTableArray = Array ( );
activeMode = "";
activeProcessSeq = "";
activeProcessTableIndex = -1;
updatelog = "";

function initPage() {
// initialise logger
 myLogConfigs = {width: "500px", right: "10em", top: "10%", fontSize: "80%" };
 myLogContainer = null;
 myLogReader = new YAHOO.widget.LogReader(myLogContainer, myLogConfigs);
// YAHOO.log("init called","info");

 processtemplate_id = document.getElementById("processtemplate_id").value;
 
//setup dialogue popup
 var handleDialogSubmit = function() { 
  setupProcessDialogObject.hide();  
  if (activeMode == "update") {updateFinalise();}
  if (activeMode == "add") {addFinalise();}
//  if (activeProcessTableIndex != -1) {processTable.selectRow(processTable.getTrEl(activeProcessTableIndex));}

 };
 var handleDialogCancel = function() {	this.cancel(); };
 setupProcessDialogObject = new YAHOO.widget.Dialog("setupProcessDialog", 
							{ width : "500px",
							  fixedcenter : true,
							  visible : false, 
							  constraintoviewport : true,
							  buttons : [ { text:"Update", handler:handleDialogSubmit, isDefault:true },
								      { text:"Cancel", handler:handleDialogCancel } ]
 });
 setupProcessDialogObject.render();
 $('#setupProcessDialogouter').appendTo('body');
 // setup the add button
 var addButton = document.getElementById('addprocesstaskbutton');
 addButton.addEventListener('click',function (e) {
	 activeMode = "add";
	 Initialise_Data("tasktemplate");
	 GLOBALS[tasktemplate_id] = processtemplate_id+"-"+document.getElementById('addprocesstask').value;
	 activeProcessSeq = document.getElementById('addprocesstask').value;
	 prepareInput("add");
	 setupProcessDialogObject.show(); 
 },true);
 
 // setup the local hash databases
 var handleDataRequestSuccess = function(o){
//	  YAHOO.log("The DataRequestSuccess handler was called; this transaction did not abort.  tId: " + o.tId + ".", "info");
	  if(o.responseText != undefined){ Create_Hashes(o.responseText); }
	  createTableArray()
	  populateTable();
 }
 var handleDataRequestFailure = function(o){
//	  YAHOO.log("The DataRequestFailure handler was called; this transaction aborted.  tId: " + o.tId + ".", "info", "example");
	  response = "";  
	  response += "<li>Transaction id: " + o.tId + "</li>";
	  response += "<li>HTTP status: " + o.status + "</li>";
	  response += "<li>Status code message: " + o.statusText + "</li>";
	  updatelog = response+"<br>"+updatelog;
	  document.getElementById("updateLog").innerHTML = updatelog;		
 }
 var dataRequestCallback =
		{
		  success: handleDataRequestSuccess,
		  failure: handleDataRequestFailure,
		  timeout: 5000
 };
 tasktemplatecriteria = "tasktemplate[fieldvalue=tasktemplate_processtemplateid:"+processtemplate_id+"]";
 dataparms = "&DataRequestList=processrole,"+tasktemplatecriteria;
 var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_javascriptdataprovider.php"+STDPARMS()+dataparms; 
 YAHOO.log("makeDataRequest - "+sUrl,"info");
 YAHOO.util.Connect.asyncRequest('GET', sUrl, dataRequestCallback);
};

YAHOO.util.Event.addListener(window, "load", initPage);

function createTableArray() {
// YAHOO.log("createTableArray called - "+processtemplate_id,"info");
 tasktemplatearray = Get_Array_Hash('tasktemplate');
 if (tasktemplatearray.length >0) {
  for (tasktemplateindex in tasktemplatearray) {
   ttasktemplate_id = tasktemplatearray[tasktemplateindex];
//   YAHOO.log("ttasktemplate_id - "+ttasktemplate_id,"info");
   Get_Data_Hash('tasktemplate',ttasktemplate_id);
   process_seq = GLOBALS['tasktemplate_id'].replace(GLOBALS['tasktemplate_processtemplateid']+"-",""); 
   processSeqArray.push(process_seq);
//   YAHOO.log("process_seq - "+process_seq,"info");
   processTableArray[tasktemplateindex] = Array ( 
    process_seq,
    GLOBALS['tasktemplate_description'],
    GLOBALS['tasktemplate_processroleid'],
    GLOBALS['tasktemplate_duration'],
    GLOBALS['tasktemplate_dateflexibility'],
    GLOBALS['tasktemplate_eventtype'],
    GLOBALS['tasktemplate_evidenceassetcode'],
    "Update",
    "Delete"
   );
  }
 }
}

function populateTable() {
// YAHOO.log("populateTable called","info");		
 myColumnDefs = [
  {key:"process_seq",label:"Step",width:40,resizeable:true,sortable:true},
  {key:"tasktemplate_description",label:"Description",width:90,resizeable:true,sortable:true},
  {key:"tasktemplate_processroleid",label:"Role",width:60,resizeable:true,sortable:true},
  {key:"tasktemplate_duration",label:"Duration",width:60,resizeable:true,sortable:true},
  {key:"tasktemplate_dateflexibility",label:"Flexibility",width:60,resizeable:true,sortable:true},
  {key:"tasktemplate_eventtype",label:"Type",width:70,resizeable:true,sortable:true},
  {key:"tasktemplate_evidenceassetcode",label:"Evidence",width:70,resizeable:true,sortable:true},
  {key:"generic_updatebutton",label:"Update",width:70,formatter:YAHOO.widget.DataTable.formatButton}, 
  {key:"generic_deletebutton",label:"Delete",width:70,formatter:YAHOO.widget.DataTable.formatButton} 
 ];
 processSource = new YAHOO.util.DataSource(processTableArray);
 processSource.responseType = YAHOO.util.XHRDataSource.TYPE_JSARRAY;
 processSource.responseSchema = {
  fields: ["process_seq","tasktemplate_description","tasktemplate_processroleid",
           "tasktemplate_duration","tasktemplate_dateflexibility","tasktemplate_eventtype",
           "tasktemplate_evidenceassetcode","generic_updatebutton","generic_deletebutton"]
 };
 myConfigs = {
    sortedBy:{key:"process_seq",dir:"asc"},
	draggableColumns:true
 } 
 processTable = new YAHOO.widget.DataTable("setupProcessTable", myColumnDefs, processSource, myConfigs);
 processTable.subscribe("buttonClickEvent", buttonClicked);
 return {
  oDS: processSource,
  oDT: processTable
 };
}


function rePopulateTable() {
// YAHOO.log("rePopulateTable called","info");
 createTableArray();
 processTable = new YAHOO.widget.DataTable("setupProcessTable", myColumnDefs, processSource, myConfigs);
 processTable.subscribe("buttonClickEvent", buttonClicked);
 return {
  oDS: processSource,
  oDT: processTable
 };
}

function buttonClicked(oArgs){
 var oRecord = this.getRecord(oArgs.target);
 var oColumn = this.getColumn(oArgs.target);
 var oColumnname = oColumn.getKey();
 activeProcessTableRow = oRecord;
 activeProcessSeq = oRecord.getData("process_seq");
 activeProcessTableIndex = -1;     
 tactiveProcessTableIndex = -1;
 for (tprocess_seq in processSeqArray) {
  tactiveProcessTableIndex++; 
  if (activeProcessSeq == processSeqArray[tprocess_seq]) {activeProcessTableIndex = tactiveProcessTableIndex;}
 }
 if (oColumnname == "generic_deletebutton") {
  var answer = confirm ("Do you wish to delete step "+activeProcessSeq+"?")
  if (answer) {
   activeMode = "delete";  
   alert ('Record "'+activeProcessSeq+'" will now be deleted');
   setupProcessDialogObject.hide();
   deleteFinalise();
  } 
 }
 if (oColumnname == "generic_updatebutton") {
  Get_Data_Hash("tasktemplate",processtemplate_id+"-"+activeProcessSeq);      
  activeMode = "update";
  prepareInput("update");
  setupProcessDialogObject.show();
 }
 return {
  oDS: processSource,
  oDT: processTable
 };
}

function prepareInput(mode) {
// YAHOO.log("prepareInputcalled - " + activeProcessSeq,"info");
 document.getElementById("seqtext").innerHTML = activeProcessSeq;
 document.getElementById("descriptioninput").value = GLOBALS['tasktemplate_description'];  
 JSINSELECTHASH(Get_SelectArrays_Hash("processrole","processrole_id","processrole_title"),
          document.processinputform.processroleidinput,GLOBALS['tasktemplate_processroleid'],"Yes","","");
 document.getElementById("durationinput").value = GLOBALS['tasktemplate_duration'];  
 JSINSELECTHASH(List2Hash("fixed-date,flexible-date"),
		  document.processinputform.dateflexibilityinput,GLOBALS['tasktemplate_dateflexibility'],"","","");
 JSINSELECTHASH(List2Hash("Phone,Email,Document,None"),
		  document.processinputform.eventtypeinput,GLOBALS['tasktemplate_eventtype'],"","","");
 document.getElementById("evidenceassetcodeinput").value = GLOBALS['tasktemplate_evidenceassetcode'];   
}

function updateFinalise() {
// YAHOO.log("updateFinalise -" + activeProcessSeq,"info");
 Get_Data_Hash("tasktemplate",processtemplate_id+"-"+activeProcessSeq);
 ts = document.getElementById("descriptioninput").value;
 if (ts != undefined){ GLOBALS['tasktemplate_description'] = document.getElementById("descriptioninput").value;}
 else { GLOBALS['tasktemplate_description'] = "";} 
 ts = document.getElementById("processroleidinput").value;
 if (ts != undefined){ GLOBALS['tasktemplate_processroleid'] = document.getElementById("processroleidinput").value;}
 else { GLOBALS['tasktemplate_processroleid'] = "";}  
 ts = document.getElementById("durationinput").value;
 if (ts != undefined){ GLOBALS['tasktemplate_duration'] = document.getElementById("durationinput").value;}
 else { GLOBALS['tasktemplate_duration'] = "";} 
 ts = document.getElementById("dateflexibilityinput").value;
 if (ts != undefined){ GLOBALS['tasktemplate_dateflexibility'] = document.getElementById("dateflexibilityinput").value;}
 else { GLOBALS['tasktemplate_dateflexibility'] = "";}  
 ts = document.getElementById("eventtypeinput").value;
 if (ts != undefined){ GLOBALS['tasktemplate_eventtype'] = document.getElementById("eventtypeinput").value;}
 else { GLOBALS['tasktemplate_eventtype'] = "";}  
 ts = document.getElementById("evidenceassetcodeinput").value;
 if (ts != undefined){ GLOBALS['tasktemplate_evidenceassetcode'] = document.getElementById("evidenceassetcodeinput").value;}
 else { GLOBALS['tasktemplate_evidenceassetcode'] = "";}   
 Write_Data_Hash("tasktemplate",processtemplate_id+"-"+activeProcessSeq);

 processTable.updateCell(activeProcessTableRow, processTable.getColumn('process_seq'), activeProcessSeq); 
 processTable.updateCell(activeProcessTableRow, processTable.getColumn('tasktemplate_description'), GLOBALS['tasktemplate_description']); 
 processTable.updateCell(activeProcessTableRow, processTable.getColumn('tasktemplate_processroleid'), GLOBALS['tasktemplate_processroleid']);  
 processTable.updateCell(activeProcessTableRow, processTable.getColumn('tasktemplate_duration'), GLOBALS['tasktemplate_duration']); 
 processTable.updateCell(activeProcessTableRow, processTable.getColumn('tasktemplate_dateflexibility'), GLOBALS['tasktemplate_dateflexibility']); 
 processTable.updateCell(activeProcessTableRow, processTable.getColumn('tasktemplate_eventtype'), GLOBALS['tasktemplate_eventtype']); 
 processTable.updateCell(activeProcessTableRow, processTable.getColumn('tasktemplate_evidenceassetcode'), GLOBALS['tasktemplate_evidenceassetcode']);   
 activeMode = ""; 

}
 
function addFinalise() {
// YAHOO.log("addFinalise - " + processtemplate_id+"-"+activeProcessSeq,"info"); 
 GLOBALS['tasktemplate_id'] = processtemplate_id+"-"+activeProcessSeq; 
 GLOBALS['tasktemplate_processtemplateid'] = processtemplate_id;
 ts = document.getElementById("descriptioninput").value;
 if (ts != undefined){ GLOBALS['tasktemplate_description'] = document.getElementById("descriptioninput").value;}
 else { GLOBALS['tasktemplate_description'] = "";} 
 ts = document.getElementById("processroleidinput").value;
 if (ts != undefined){ GLOBALS['tasktemplate_processroleid'] = document.getElementById("processroleidinput").value;}
 else { GLOBALS['tasktemplate_processroleid'] = "";}  
 ts = document.getElementById("durationinput").value;
 if (ts != undefined){ GLOBALS['tasktemplate_duration'] = document.getElementById("durationinput").value;}
 else { GLOBALS['tasktemplate_duration'] = "";} 
 ts = document.getElementById("dateflexibilityinput").value;
 if (ts != undefined){ GLOBALS['tasktemplate_dateflexibility'] = document.getElementById("dateflexibilityinput").value;}
 else { GLOBALS['tasktemplate_dateflexibility'] = "";}  
 ts = document.getElementById("eventtypeinput").value;
 if (ts != undefined){ GLOBALS['tasktemplate_eventtype'] = document.getElementById("eventtypeinput").value;}
 else { GLOBALS['tasktemplate_eventtype'] = "";}  
 ts = document.getElementById("evidenceassetcodeinput").value;
 if (ts != undefined){ GLOBALS['tasktemplate_evidenceassetcode'] = document.getElementById("evidenceassetcodeinput").value;}
 else { GLOBALS['tasktemplate_evidenceassetcode'] = "";}
 Write_Data_Hash("tasktemplate",processtemplate_id+"-"+activeProcessSeq);
 // Add_Array_Index ("tasktemplate", processtemplate_id+"-"+activeProcessSeq);
 rePopulateTable();
 document.getElementById('addprocesstask').value = "";
 activeMode = "";
}

function deleteFinalise() {
// YAHOO.log("deleteFinalise -" + activeProcessSeq,"info");
 var ttasktemplate_id = processtemplate_id+"-"+activeProcessSeq;
 Delete_Data_Hash("tasktemplate",ttasktemplate_id);
 // Delete_Array_Index ("tasktemplate", ttasktemplate_id); Function now added to Delete_Data_Hash
 processTable.deleteRow(activeProcessTableRow);
 activeMode = ""; 
}

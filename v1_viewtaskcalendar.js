YAHOO.namespace ("BBviewtaskcalendar");

//global variables

GLOBALS = new Array();

task_id = "";
taskIdArray = Array ( );
taskTableArray = Array ( );
activeMode = "";
activeTaskId = "";
activeTaskTableRow = ""; // CHECK other versions
activeTaskTableIndex = -1;
updatelog = "";

function initPage() {
// initialise logger
 myLogConfigs = {width: "500px", right: "10em", top: "10%", fontSize: "80%" };
 myLogContainer = null;
 myLogReader = new YAHOO.widget.LogReader(myLogContainer, myLogConfigs);
// YAHOO.log("init called","info");

 globalcurrentYYYYMMDD = document.getElementById("CurrentYYYYMMDD").value; 
 globalcurrentYYYYMMDD = "20100325";
//setup dialogue popup
 var handleDialogSubmit = function() { 
  viewTaskDialogObject.hide();  
  if (activeMode == "update") {updateFinalise();}
  if (activeTaskTableIndex != -1) {taskTable.selectRow(taskTable.getTrEl(activeTaskTableIndex));}

 };
 var handleDialogCancel = function() {	this.cancel(); };
 viewTaskDialogObject = new YAHOO.widget.Dialog("viewTaskDialog", 
							{ width : "500px",
							  fixedcenter : true,
							  visible : false, 
							  constraintoviewport : true,
							  buttons : [ { text:"Update", handler:handleDialogSubmit, isDefault:true },
								      { text:"Cancel", handler:handleDialogCancel } ]
 });
 viewTaskDialogObject.render();
 $('#viewTaskDialogouter').appendTo('body');
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
 if (JSModeId() == "0") { dataparms = "&DataRequestList=task[site=all],tasktemplate"; }
 else { dataparms = "&DataRequestList=task,tasktemplate"; }
 var sUrl = JSSitePerlURL()+"/"+JSCodeVersion()+"_javascriptdataprovider.php"+STDPARMS()+dataparms; 
 YAHOO.log("makeDataRequest - "+sUrl,"info");
 YAHOO.util.Connect.asyncRequest('GET', sUrl, dataRequestCallback);
};

YAHOO.util.Event.addListener(window, "load", initPage);

function createTableArray() {
// YAHOO.log("createTableArray called,"info");
 temptaskarray2 = Array ( );
 temptaskarray1 = Get_Array_Hash('task');
 if (temptaskarray1.length >0) {
  for (taskindex in temptaskarray1) {
   task_id = temptaskarray1[taskindex];
//   YAHOO.log("task_id - "+task_id,"info");
   Get_Data_Hash('task',task_id);
   if (GLOBALS['task_datedue'] < globalcurrentYYYYMMDD) {$astring = "Action Overdue"} else {$astring = "Action"}
   tstring =
	GLOBALS['task_datedue']+"|"+             //0
	GLOBALS['task_domainid']+"|"+            //1	 	
	task_id+"|"+                             //2   
    GLOBALS['task_tasktemplateid']+"|"+      //3    
    GLOBALS['task_description']+"|"+         //4    
    GLOBALS['task_processroleid']+"|"+       //5
    GLOBALS['task_datedue']+"|"+             //6   
    GLOBALS['task_datecompleted']+"|"+       //7   
    GLOBALS['task_dateflexibility']+"|"+     //8
    GLOBALS['task_eventtype']+"|"+           //9
    GLOBALS['task_evidenceassetcode']+"|"+   //10
    GLOBALS['task_comment']+"|"+             //11
    $astring;                                //12   
   temptaskarray2.push(tstring);
  }
  temptaskarray2.sort();
  for (taskindex in temptaskarray2) {
   tstring = temptaskarray2[taskindex];
//   YAHOO.log("task_id - "+task_id,"info");
   tbits = tstring.split("|");
   taskIdArray.push(tbits[1]);
//   YAHOO.log("task_id - "+task_id,"info");
   taskTableArray[taskindex] = Array ( 
	 tbits[1],tbits[2],tbits[3],tbits[4],tbits[5],tbits[6],
	 tbits[7],tbits[8],tbits[9],tbits[10],tbits[11],tbits[12] 
   );
  }
 }
}

function populateTable() {
// YAHOO.log("populateTable called","info");		
 myColumnDefs = [
  {key:"task_domainid",label:"Client",width:130,resizeable:true,sortable:true},                 
  {key:"task_id",label:"Task Id",width:60,resizeable:true,sortable:true},
  {key:"task_tasktemplateid",label:"Template Id",width:40,resizeable:true,sortable:true},
  {key:"task_description",label:"Description",width:90,resizeable:true,sortable:true},
  {key:"task_processroleid",label:"Role",width:60,resizeable:true,sortable:true}, 
  {key:"task_datedue",label:"Date Due",width:60,resizeable:true,sortable:true},  
  {key:"task_datecompleted",label:"Date Completed",width:90,resizeable:true,sortable:true},  
  {key:"task_dateflexibility",label:"Flexibility",width:60,resizeable:true,sortable:true},
  {key:"task_eventtype",label:"Type",width:70,resizeable:true,sortable:true},
  {key:"task_evidenceassetcode",label:"Evidence",width:70,resizeable:true,sortable:true},
  {key:"task_comment",label:"Comment",width:70,resizeable:true,sortable:true},
  {key:"generic_updatebutton",label:"Action",width:90,formatter:YAHOO.widget.DataTable.formatButton}, 
 ];
 taskSource = new YAHOO.util.DataSource(taskTableArray);
 taskSource.responseType = YAHOO.util.XHRDataSource.TYPE_JSARRAY;
 taskSource.responseSchema = {
  fields: ["task_domainid","task_id","task_tasktemplateid","task_description","task_processroleid",
           "task_datedue","task_datecompleted","task_dateflexibility","task_eventtype",
           "task_evidenceassetcode","task_comment","generic_updatebutton"]
 };
 myConfigs = {
  sortedBy:{key:"task_datedue",dir:"asc"},
  paginator: new YAHOO.widget.Paginator({
   rowsPerPage: 10,
   template: YAHOO.widget.Paginator.TEMPLATE_ROWS_PER_PAGE,
   rowsPerPageOptions: [5,10,15,20],
   pageLinks: 5
  }),  
  draggableColumns:true
 }
 taskTable = new YAHOO.widget.DataTable("viewTaskTable", myColumnDefs, taskSource, myConfigs);
 taskTable.subscribe("buttonClickEvent", buttonClicked);
 return {
  oDS: taskSource,
  oDT: taskTable
 };
}


function rePopulateTable() {
// YAHOO.log("rePopulateTable called","info");
 createTableArray();
 taskTable = new YAHOO.widget.DataTable("viewTaskTable", myColumnDefs, taskSource, myConfigs);
 taskTable.subscribe("buttonClickEvent", buttonClicked);
 return {
  oDS: taskSource,
  oDT: taskTable
 };
}

function buttonClicked(oArgs){
 var oRecord = this.getRecord(oArgs.target);
 var oColumn = this.getColumn(oArgs.target);
 var oColumnname = oColumn.getKey();
 activeTaskTableRow = oRecord;
 activeTaskId = oRecord.getData("task_id");
 activeTaskTableIndex = -1;     
 tactiveTaskTableIndex = -1;
 for (task_id in taskIdArray) {
  tactiveTaskTableIndex++; 
  if (activeTaskId == taskIdArray[task_id]) {activeTaskTableIndex = tactiveTaskTableIndex;}
 }
 if (oColumnname == "generic_updatebutton") {
  Get_Data_Hash("task",activeTaskId);      
  activeMode = "update";
  prepareInput("update");
  viewTaskDialogObject.show();
 }
 return {
  oDS: taskSource,
  oDT: taskTable
 };
}

function prepareInput(mode) {
 YAHOO.log("prepareInputcalled - " + activeTaskId,"info");
 document.getElementById("idtext").innerHTML = activeTaskId;
 document.getElementById("templateidtext").innerHTML = GLOBALS['task_tasktemplateid'];  
 document.getElementById("descriptiontext").innerHTML = GLOBALS['task_description'];
 document.getElementById("processroleidtext").innerHTML = GLOBALS['task_processroleid']; 
 document.getElementById("dateduetext").innerHTML = GLOBALS['task_datedue']; 
 document.getElementById("datecompletedinput").value = globalcurrentYYYYMMDD;  
 document.getElementById("dateflexibilitytext").innerHTML = GLOBALS['task_dateflexibility'];
 document.getElementById("eventtypetext").innerHTML = GLOBALS['task_eventtype'];
 document.getElementById("evidenceassetcodeinput").value = GLOBALS['task_evidenceassetcode'];
 document.getElementById("commentinput").value = GLOBALS['task_comment']; 
}

function updateFinalise() {
 YAHOO.log("updateFinalise -" + activeTaskId,"info");
 Get_Data_Hash("task",activeTaskId);
 ts = document.getElementById("datecompletedinput").value;
 if (ts != undefined){ GLOBALS['task_datecompleted'] = document.getElementById("datecompletedinput").value;}
 else { GLOBALS['task_datecompleted'] = "";}
 ts = document.getElementById("evidenceassetcodeinput").value;
 if (ts != undefined){ GLOBALS['task_evidenceassetcode'] = document.getElementById("evidenceassetcodeinput").value;}
 else { GLOBALS['task_evidenceassetcode'] = "";} 
 ts = document.getElementById("commentinput").value;
 if (ts != undefined){ GLOBALS['task_comment'] = document.getElementById("commentinput").value;}
 else { GLOBALS['task_comment'] = "";}   
 Write_Data_Hash("task",activeTaskId);
 taskTable.updateCell(activeTaskTableRow, taskTable.getColumn('task_datecompleted'), GLOBALS['task_datecompleted']); 
 taskTable.updateCell(activeTaskTableRow, taskTable.getColumn('task_evidenceassetcode'), GLOBALS['task_evidenceassetcode']);  
 taskTable.updateCell(activeTaskTableRow, taskTable.getColumn('task_comment'), GLOBALS['task_comment']); 
 activeMode = ""; 

}


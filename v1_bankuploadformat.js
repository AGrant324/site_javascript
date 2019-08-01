YAHOO.namespace ("BBtestoutput");

//========== Global Variables  ==========================================================

GLOBALS = new Array();
bankuploadarray = Array ( );
bankuploadtablerowarray = Array ( );
bankuploadtablearray = Array ( );
activebankuploadtableindex = -1;
activebankuploadtableid = "";
testinputarray = Array ( );
testinputtablearray = Array ( );
testinputtablestatus = "initialload";
maxtestinputcolindex = 0;
activetestinputtableindex = -1;
updatelog = "";
montommarray = Array ();
montommarray["Jan"] = "01";
montommarray["Feb"] = "02";
montommarray["Mar"] = "03";
montommarray["Apr"] = "04";
montommarray["May"] = "05";
montommarray["Jun"] = "06";
montommarray["Jul"] = "07";
montommarray["Aug"] = "08";
montommarray["Sep"] = "09";
montommarray["Oct"] = "10";
montommarray["Nov"] = "11";
montommarray["Dec"] = "12";

//========== Main Routine  ==========================================================

function initPage() {
	
// initialise logger
// myLogConfigs = {width: "500px", right: "10em", top: "10%", fontSize: "80%" };
// myLogContainer = null;
// myLogReader = new YAHOO.widget.LogReader(myLogContainer, myLogConfigs);	
// var myLogReader = new YAHOO.widget.LogReader();
// YAHOO.log("init called","info");

// YAHOO.log(range,"info");
 
 setupWait(); 

//--------- setup bankupload popup ---------------------------------------

 var handleBankuploadDialogClose = function() { 
  bankuploadDialogObject.hide();
 };
 bankuploadDialogObject = new YAHOO.widget.Dialog("bankuploadDialog", { 
    // width : "800px",
    fixedcenter : true,
    close: false,    	 
    visible : false, 
    constraintoviewport : true,
    buttons : [ { text:"Close", handler:handleBankuploadDialogClose } ]
 });
 bankuploadDialogObject.render();
 bankuploadDialogObject.hide();
 $('#bankuploadDialogouterouter').appendTo('body');
//--------- setup new bankupload popup ---------------------------------------
 var handleNewBankuploadDialogSubmit = function() { 
  newBankuploadFinalise();
  newBankuploadDialogObject.hide();
 };
 var handleNewBankuploadDialogCancel = function() { 
  newBankuploadDialogObject.hide();
 };
 newBankuploadDialogObject = new YAHOO.widget.Dialog("newBankuploadDialog", { 
    // width : "800px",
    fixedcenter : true,
    close: false,    	 
    visible : false, 
    constraintoviewport : true,
    buttons : [ { text:"Create New Format", handler:handleNewBankuploadDialogSubmit, isDefault:true },
              { text:"Cancel", handler:handleNewBankuploadDialogCancel } ]
 });
 newBankuploadDialogObject.render();
 newBankuploadDialogObject.hide(); 
 $('#newBankuploadDialogouter').appendTo('body'); 
//--------- setup update bankupload popup ---------------------------------------
 var handleUpdateBankuploadDialogSubmit = function() { 
  updateBankuploadFinalise();
  updateBankuploadDialogObject.hide();
 };
 var handleUpdateBankuploadDialogCancel = function() { 
	 updateBankuploadDialogObject.hide();
 };
 updateBankuploadDialogObject = new YAHOO.widget.Dialog("updateBankuploadDialog", { 
    // width : "800px",
    fixedcenter : true,
    close: false,    	 
    visible : false, 
    constraintoviewport : true,
    buttons : [ { text:"Confirm Update", handler:handleUpdateBankuploadDialogSubmit, isDefault:true },
              { text:"Cancel", handler:handleUpdateBankuploadDialogCancel } ]
 });
 updateBankuploadDialogObject.render();
 updateBankuploadDialogObject.hide(); 
 $('#updateBankuploadDialogouter').appendTo('body');  
 //--------- setup delete bankupload popup ---------------------------------------
 var handleDeleteBankuploadDialogSubmit = function() { 
  deleteBankuploadFinalise();
  deleteBankuploadDialogObject.hide();
 };
 var handleDeleteBankuploadDialogCancel = function() { 
	 deleteBankuploadDialogObject.hide();
 };
 deleteBankuploadDialogObject = new YAHOO.widget.Dialog("deleteBankuploadDialog", { 
    // width : "800px",
    fixedcenter : true,
    close: false,    	 
    visible : false, 
    constraintoviewport : true,
    buttons : [ { text:"Confirm Delete", handler:handleDeleteBankuploadDialogSubmit, isDefault:true },
              { text:"Cancel", handler:handleDeleteBankuploadDialogCancel } ]
 });
 deleteBankuploadDialogObject.render();
 deleteBankuploadDialogObject.hide(); 
 $('#deleteBankuploadDialogouter').appendTo('body'); 
 document.getElementById("filebrowse_button").value = "";
 document.getElementById('ViewInput').style.visibility = 'hidden'; 
 document.getElementById('Format').style.visibility = 'hidden';  
 document.getElementById('Output').style.visibility = 'hidden';  
 document.getElementById('Save').style.visibility = 'hidden';
 document.getElementById('bankuploadupdate_button').disabled = true;
 
 //--------- add the dynamic listeners ---------------------------------------  
 YAHOO.util.Event.addListener("fileupload_button", "click", function () {  
  var tfilename = document.getElementById('filebrowse_button').value;
  if ( tfilename != "" ) { uploadTestinput(); }	
  else { alert("No bank test file selected - please browse to select file and retry"); }  
 },true);
 YAHOO.util.Event.addListener("TryExisting", "click", function () { bankuploadDialogObject.show();  },true);
 YAHOO.util.Event.addListener("bankuploadupdate_button", "click", function () {  updateBankupload(); },true);
 YAHOO.util.Event.addListener("bankuploadnew_button", "click", function () { newBankupload(); },true);
 YAHOO.util.Event.addListener("bankuploadcancel_button", "click", function () { cancelBankupload(); },true);

 for (var i=0;i<9;i++) {	 
  var ffieldid = "#Format"+i;
  $(ffieldid).change(function() {
    outputReset();	  
    outputVerification();
  }); 
 } 
 
 uploadBankupload();

};


//========== Functions  ==========================================================

//========== Bank Upload Format Table Routines  ==========================================================

function uploadBankupload() {
 var handleDataRequestSuccess = function(o){
	 //	  YAHOO.log("The DataRequestSuccess handler was called; this transaction did not abort.  tId: " + o.tId + ".", "info");
	  if(o.responseText != undefined){ Create_Hashes(o.responseText); }
	  createBankuploadTableArray();
	  populateBankuploadTable();
	  stopWait();
	 }
	 var handleDataRequestFailure = function(o){
	  YAHOO.log("The DataRequestFailure handler was called; this transaction aborted.  tId: " + o.tId + ".", "info", "example");
	  response = "";  
	  response += "<li>Transaction id: " + o.tId + "</li>";
	  response += "<li>HTTP status: " + o.status + "</li>";
	  response += "<li>Status code message: " + o.statusText + "</li>";
	  updatelog = response+"<br>"+updatelog;
	  document.getElementById("updateLog").innerHTML = updatelog;
	  stopWait();
	 }
	 var dataRequestCallback = {
	  success: handleDataRequestSuccess,
	  failure: handleDataRequestFailure,
	  timeout: 50000
	 }; 
			 
	 dataparms = "&DataRequestList=bankupload[fieldvalue=bankupload_filetype:csv]";
	 var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_javascriptdataprovider.php"+STDPARMS()+dataparms; 
	 // YAHOO.log("makeDataRequest - "+sUrl,"info");
	 YAHOO.util.Connect.asyncRequest('GET', sUrl, dataRequestCallback);
	 startWait("Loading"); 
}

function createBankuploadTableArray() {
	// YAHOO.log("createBankuploadTableArray called","info");
	 bankuploadtablearray = Array ( );
	 bankuploadtablerowarray = Array ( );
	 bankuploadarray = Get_Array_Hash('bankupload');  
	 if (bankuploadarray.length >0) {
	  for (bankuploadindex in bankuploadarray) {
	   tbankupload_id = bankuploadarray[bankuploadindex];
	   Get_Data_Hash('bankupload',tbankupload_id);
	   bankuploadtablerowarray[bankuploadindex] = tbankupload_id;	   
	   bankuploadtablearray[bankuploadindex] = Array ( GLOBALS['bankupload_id'], GLOBALS['bankupload_name'], "Use This", "Delete");   
	  }
	 }
}

function populateBankuploadTable() {
 // YAHOO.log("populatebankuploadTable called "+bankuploadtablestatus,"info");
 // alert("populatebankuploadTable called "+bankuploadtablestatus);
 var bankuploadColumnDefs = [
	    {key:"bankupload_id",label:"Id",width:70,resizeable:true,sortable:true},
	    {key:"bankupload_name",label:"Description",width:150,resizeable:true,sortable:true},
	    {key:"bankupload_action",label:"",width:150,formatter:YAHOO.widget.DataTable.formatButton},
	    {key:"bankupload_delete",label:"",width:70,formatter:YAHOO.widget.DataTable.formatButton}	    
 ];
 
 var bankuploadSource = new YAHOO.util.DataSource(bankuploadtablearray);
 bankuploadSource.responseType = YAHOO.util.XHRDataSource.TYPE_JSARRAY;
 bankuploadSource.responseSchema = {
      fields: ["bankupload_id","bankupload_name","bankupload_action","bankupload_delete"]
 }; 
 var bankuploadConfigs = {
      sortedBy:{key:"bankupload_id",dir:"asc"},
//	    paginator: new YAHOO.widget.Paginator({
//	      rowsPerPage: 25,
//	      template: YAHOO.widget.Paginator.TEMPLATE_ROWS_PER_PAGE,
//	      rowsPerPageOptions: [10,25,50,100],
//	      pageLinks: 5
//	    }),
	    draggableColumns:true
 }
 // bankuploadTableObject = new YAHOO.widget.DataTable("bankuploadtable", bankuploadColumnDefs, bankuploadSource, bankuploadConfigs); 
 bankuploadTableObject = new YAHOO.widget.ScrollingDataTable("bankuploadtable", bankuploadColumnDefs, bankuploadSource, {height:"250px"});
 bankuploadTableObject.subscribe("rowMouseoverEvent",  bankuploadTableObject.onEventHighlightRow); 
 bankuploadTableObject.subscribe("rowMouseoutEvent",  bankuploadTableObject.onEventUnhighlightRow); 
 bankuploadTableObject.subscribe("rowClickEvent",  bankuploadTableObject.onEventSelectRow); 
 bankuploadTableObject.selectRow( bankuploadTableObject.getTrEl(0)); 
 bankuploadTableObject.focus();  
 bankuploadTableObject.subscribe("cellClickEvent", bankuploadCellClicked);
 bankuploadtablestatus = "reload";	
 return {
	    wDS: bankuploadSource,
	    wDT: bankuploadTableObject
 };
}
 
function bankuploadCellClicked(oArgs){
 var oRecord = this.getRecord(oArgs.target);
 var oColumn = this.getColumn(oArgs.target);
 var oColumnname = oColumn.getKey(); 
 activebankuploadtableindex = bankuploadTableObject.getRecordIndex(oRecord);
 activebankuploadtableid = bankuploadtablerowarray[activebankuploadtableindex]; 
 if (oColumnname == "bankupload_action") {
  // alert("Action "+activebankuploadtableid); 
  bankuploadDialogObject.hide();
  document.getElementById('bankuploadupdate_button').disabled = false;
  document.getElementById('bankuploadupdate_button').innerHTML = 'Update existing "'+activebankuploadtableid+'" format';  
  formatReset();
  outputReset();  
  outputVerification();
 }
 if (oColumnname == "bankupload_delete") {
  // alert("Delete "+activebankuploadtableid);
  // bankuploadDialogObject.hide();	 
  deleteBankupload();
 } 
}


function repopulateBankuploadTable() {
 // YAHOO.log repopulatebankuploadTable called "+bankuploadtablestatus);
 deletemax = bankuploadtablerowarray.length;
 // alert("repopulateBankuploadTable "+deletemax);
 for (di=0; di < deletemax; di++) {		 
  bankuploadTableObject.deleteRow(0);
 }
 bankuploadtablearray = Array ( );
 bankuploadtablerowarray = Array ( ); 
 bankuploadarray = Get_Array_Hash('bankupload');
 if (bankuploadarray.length >0) {
  for (bankuploadindex in bankuploadarray) {
   tbankupload_id = bankuploadarray[bankuploadindex];
   Get_Data_Hash('bankupload',tbankupload_id);
   datastring =  "var data = {"; 
   datastring =  datastring+'bankupload_id:"'+tbankupload_id+'", ';	  
   datastring =  datastring+'bankupload_name:"'+GLOBALS['bankupload_name']+'", ';	  	  
   datastring =  datastring+'bankupload_action:"'+"Use This"+'", ';	  	  
   datastring =  datastring+'bankupload_delete:"'+"Delete"+'"}';
   eval(datastring);
   var newrecord = YAHOO.widget.DataTable._cloneObject(data);   
   bankuploadTableObject.addRow(newrecord);
   bankuploadtablerowarray[bankuploadindex] = tbankupload_id;	      
  }
 }
}

//========== Test File Input  ==========================================================

function uploadTestinput() {
 // alert("uploadTestinput");
 var handleTestinputRequestSuccess = function(o){
     //	  YAHOO.log("The DataRequestSuccess handler was called; this transaction did not abort.  tId: " + o.tId + ".", "info");  
	 if(o.responseText != undefined){ 
	  // alert(o.responseText);
      stopWait();
      var uploadedfilename = document.getElementById("filebrowse_button").value;
      document.getElementById("bankupload_filename").innerHTML = 'Select a record to convert from <b>"'+uploadedfilename+'"</b>';		
      document.getElementById('ViewInput').style.visibility = 'visible';   
	  createTestinputTableArray(o.responseText);
	  showTestinputTable();
	  activebankuploadtableid = "createnewbankupload";
	  formatReset();
	  outputReset();	  
	  outputVerification();	  
     }
 }
 var handleTestinputRequestFailure = function(o){
		  YAHOO.log("The TestinputRequestFailure handler was called; this transaction aborted.  tId: " + o.tId + ".", "info", "example");
		  response = "";  
		  response += "<li>Transaction id: " + o.tId + "</li>";
		  response += "<li>HTTP status: " + o.status + "</li>";
		  response += "<li>Status code message: " + o.statusText + "</li>";
		  updatelog = response+"<br>"+updatelog;
		  document.getElementById("updateLog").innerHTML = updatelog;
	      stopWait();		  
 }
 var testinputCallback = {
		  upload: handleTestinputRequestSuccess,
		  failure: handleTestinputRequestFailure,
		  timeout: 50000
 }; 
  var formObject = document.getElementById('fileuploadform');	 	   
  YAHOO.util.Connect.setForm(formObject, true); // the second argument is true to indicate file upload. 
  var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_javascriptcsvfileprovider.php"; 	 	 
  // alert("testUpload - "+sUrl);
  // YAHOO.log("imageUpload - "+sUrl");
  YAHOO.util.Connect.asyncRequest('POST', sUrl, testinputCallback);
  startWait("Loading");
}

function createTestinputTableArray(testinputstring) {
 // YAHOO.log("createBankuploadTableArray called","info");
 testinputtablearray = Array ( );
 testinputarray = testinputstring.split("^");
 var maxindex = 50;
 if (testinputarray.length >0) {
  for (testinputindex in testinputarray) {
   if (testinputindex <= maxindex) {
    var tbits = (testinputarray[testinputindex]+"|||||||||||||||").split("|");
    testinputtablearray[testinputindex] = Array ( tbits[0], tbits[1], 
	   tbits[2],tbits[3],tbits[4],tbits[5],tbits[6],tbits[7],tbits[8],tbits[9] );
    for (var i=0;i<10;i++) {	 
     if (tbits[i] != "") {
      if ( i > maxtestinputcolindex ) { maxtestinputcolindex = i;}       	 
     }	  
    }
   }
  }
 }
}

function showTestinputTable() {
 if (testinputtablestatus == "initialload") { populateTestinputTable(); } else { repopulateTestinputTable(); }
}

function populateTestinputTable() {
 // YAHOO.log("populatetestinputTable called ","info");
 // alert("populateTestinputTable called ");
 var testinputColumnDefs = [
	    {key:"testinput_col0",label:"A",maxAutoWidth:300,resizeable:true,sortable:true},
	    {key:"testinput_col1",label:"B",maxAutoWidth:300,resizeable:true,sortable:true},	    
	    {key:"testinput_col2",label:"C",maxAutoWidth:300,resizeable:true,sortable:true},	    
	    {key:"testinput_col3",label:"D",maxAutoWidth:300,resizeable:true,sortable:true},	    
	    {key:"testinput_col4",label:"E",maxAutoWidth:300,resizeable:true,sortable:true},	    
	    {key:"testinput_col5",label:"F",maxAutoWidth:300,resizeable:true,sortable:true},	    
	    {key:"testinput_col6",label:"G",maxAutoWidth:300,resizeable:true,sortable:true},	    
	    {key:"testinput_col7",label:"H",maxAutoWidth:300,resizeable:true,sortable:true},
	    {key:"testinput_col8",label:"I",maxAutoWidth:300,resizeable:true,sortable:true},	    
	    {key:"testinput_col9",label:"J",maxAutoWidth:300,resizeable:true,sortable:true}	    
 ];
 
 var testinputSource = new YAHOO.util.DataSource(testinputtablearray);
 testinputSource.responseType = YAHOO.util.XHRDataSource.TYPE_JSARRAY;
 testinputSource.responseSchema = {
      fields: ["testinput_col0","testinput_col1","testinput_col2","testinput_col3","testinput_col4","testinput_col5",            
               "testinput_col6","testinput_col7","testinput_col8","testinput_col9"]
 }; 
 testinputTableObject = new YAHOO.widget.ScrollingDataTable("testinputtable", testinputColumnDefs,testinputSource, {height:"10em"});
 
 testinputTableObject.subscribe("rowMouseoverEvent", testinputTableObject.onEventHighlightRow); 
 testinputTableObject.subscribe("rowMouseoutEvent", testinputTableObject.onEventUnhighlightRow); 
 testinputTableObject.subscribe("rowClickEvent", testinputTableObject.onEventSelectRow); 
 testinputTableObject.selectRow(testinputTableObject.getTrEl(0)); 
 testinputTableObject.focus();  
 testinputTableObject.subscribe("cellClickEvent", testinputCellClicked);
 for (var i=0;i<10;i++) {
  var tcolkey = "testinput_col"+i;  
  if ( i < maxtestinputcolindex+1 ) { testinputTableObject.showColumn(tcolkey); } 
  else { testinputTableObject.hideColumn(tcolkey); }      	 
 } 
 testinputtablestatus = "reload";	
 return {
	    wDS: testinputSource,
	    wDT: testinputTableObject
 };
}

function testinputCellClicked(oArgs){
 var oRecord = this.getRecord(oArgs.target);
 activetestinputtableindex = testinputTableObject.getRecordIndex(oRecord);
 document.getElementById('Output').style.visibility = 'visible';
 document.getElementById('Format').style.visibility = 'visible';   
 document.getElementById('Save').style.visibility = 'visible';
 // formatReset();  
 outputReset(); 
 outputVerification();
}
 
function repopulateTestinputTable() {
 // YAHOO.log repopulatetestinputTable called "+testinputtablestatus);
 deletemax = testinputtablearray.length;
 // alert("DELETEWIZARDMAX "+deletemax);
 for (di=0; di < deletemax; di++) {		 
  testinputTableObject.deleteRow(0);
 }
 var maxindex = 50;
 if (testinputarray.length >0) {
  for (testinputindex in testinputarray) {
   if (testinputindex <= maxindex) {
    var tbits = (testinputarray[testinputindex]+"|||||||||||||||").split("|"); 
    datastring =  "var data = {"; 
    datastring =  datastring+'testinput_col0:"'+tbits[0]+'", ';	  
    datastring =  datastring+'testinput_col1:"'+tbits[1]+'", ';	  
    datastring =  datastring+'testinput_col2:"'+tbits[2]+'", ';	  
    datastring =  datastring+'testinput_col3:"'+tbits[3]+'", ';	  
    datastring =  datastring+'testinput_col4:"'+tbits[4]+'", ';	  
    datastring =  datastring+'testinput_col5:"'+tbits[5]+'", ';	    
    datastring =  datastring+'testinput_col6:"'+tbits[6]+'", ';	  
    datastring =  datastring+'testinput_col7:"'+tbits[7]+'", ';
    datastring =  datastring+'testinput_col8:"'+tbits[8]+'", ';    
    datastring =  datastring+'testinput_col9:"'+tbits[9]+'"}';      
    eval(datastring);
    var newrecord = YAHOO.widget.DataTable._cloneObject(data);   
    //  newrecord.genericPrimeKeyFieldName = activeGenericId;
    testinputTableObject.addRow(newrecord);
    // testinputDialogObject.render();  
   }
  }   
 }
 for (var i=0;i<10;i++) {
  var tcolkey = "testinput_col"+i;  
  if ( i < maxtestinputcolindex+1 ) { testinputTableObject.showColumn(tcolkey); } 
  else { testinputTableObject.hideColumn(tcolkey); }      	 
 } 
}

//========== Output / Format Reset Routines==========================================================

function inputReset() {
 // YAHOO.log inputReset called "+activetestinputtableindex);
 // alert("inputReset called "+activetestinputtableindex);
 var tbits = (testinputarray[activetestinputtableindex]+"|||||||||||||||").split("|");
 testinputtablearray[testinputindex] = Array ( tbits[0], tbits[1], 
				   tbits[2],tbits[3],tbits[4],tbits[5],tbits[6],tbits[7],tbits[8],tbits[9] ); 
 for (var i=0;i<10;i++) {
  var column = i+2;	 
  if ( i < maxtestinputcolindex+1 ) { $('#InputTable tr td:nth-child('+ column +')').show(); $('#InputTable tr th:nth-child('+ column +')').show();} 
  else { $('#InputTable tr td:nth-child('+ column +')').hide(); $('#InputTable tr th:nth-child('+ column +')').hide();}      	 
 }  
 for (var i=0;i<maxtestinputcolindex+1;i++) {	 
  var ifieldid = "InCol"+i;
  document.getElementById(ifieldid).innerHTML = tbits[i]; 
 }
}
 
function formatReset() {
 // YAHOO.log formatReset called "+activebankuploadtableid);
 // alert("formatReset called "+activebankuploadtableid); 
 if (activebankuploadtableid == "createnewbankupload" ) {
  document.getElementById("bankuploadid").innerHTML =  '<font color="blue"><b>' + "New Format" + '</b></font>';   	 
  Initialise_Data ("bankupload"); 
 } else {
  document.getElementById("bankuploadid").innerHTML =  '<font color="blue"><b>' + activebankuploadtableid + '</b></font>'; 
  Get_Data_Hash("bankupload",activebankuploadtableid);	  
 } 
 if ( GLOBALS['bankupload_header'] == "Yes" ) { document.getElementById("bankuploadheader").checked = true; }
 else { document.getElementById("bankuploadheader").checked = false; } 
 for (var i=0;i<maxtestinputcolindex+1;i++) {	 
  var ffieldid = "Format"+i;
  var dfield = "bankupload_col"+i;
  document.getElementById(ffieldid).value = GLOBALS[dfield];
 } 
}

function outputReset() {
 // YAHOO.log outputReset called "+activebankuploadtableid);
 // alert("outputReset called "+activebankuploadtableid); 
 document.getElementById("OutCol0").innerHTML = '<font color="red"><b>??????</b></font>';	   
 document.getElementById("OutCol1").innerHTML = '<font color="red"><b>???????</b></font>';		 
 document.getElementById("OutCol2").innerHTML = '<font color="red"><b>????-??-??</b></font>';		
 document.getElementById("OutCol3").innerHTML = '<font color="red"><b>???</b></font>';		 
 document.getElementById("OutCol4").innerHTML = '<font color="red"><b>??????????</b></font>';		 
 document.getElementById("OutCol5").innerHTML = '<font color="red"><b>??.??</b></font>';		 
 document.getElementById("OutCol6").innerHTML = '<font color="red"><b>??.??</b></font>';	
 document.getElementById("OutCol7").innerHTML = '';
 document.getElementById("OutResult").innerHTML = '';
}
	  
 //========== Output Verification ==========================================================
 function outputVerification() {
 // YAHOO.log outputVerification called "+activetestinputtableindex);
 // alert("outputVerificationt called "+activetestinputtableindex);
 var tbits = (testinputarray[activetestinputtableindex]+"|||||||||||||||").split("|");
 testinputtablearray[testinputindex] = Array ( tbits[0], tbits[1], 
			   tbits[2],tbits[3],tbits[4],tbits[5],tbits[6],tbits[7],tbits[8],tbits[9] ); 
 for (var i=0;i<10;i++) {
  var column = i+2;	 
   if ( i < maxtestinputcolindex+1 ) { $('#InputTable tr td:nth-child('+ column +')').show(); $('#InputTable tr th:nth-child('+ column +')').show();} 
   else { $('#InputTable tr td:nth-child('+ column +')').hide(); $('#InputTable tr th:nth-child('+ column +')').hide();}      	 
 }  
 for (var i=0;i<maxtestinputcolindex+1;i++) {	 
  var ifieldid = "InCol"+i;
  document.getElementById(ifieldid).innerHTML = tbits[i]; 
 }
 var darray = Array();
 var dd = ""; var mm = ""; var yyyy = "";
 for (var i=0;i<maxtestinputcolindex+1;i++) {	 
  var ffieldid = "Format"+i;
  if (document.getElementById(ffieldid).value == "Sort" ) {
   document.getElementById("OutCol0").innerHTML = IntegerDisplay(tbits[i],6);
  }
  if (document.getElementById(ffieldid).value == "Account" ) {
   document.getElementById("OutCol1").innerHTML = IntegerDisplay(tbits[i],8);
  }
  if (document.getElementById(ffieldid).value == "Sort_Account" ) {
   var tarray = stringSplit(tbits[i]);
   document.getElementById("OutCol0").innerHTML = IntegerDisplay(tarray[0],6);	   	  
   document.getElementById("OutCol1").innerHTML = IntegerDisplay(tarray[1],8);
  }  
  if (document.getElementById(ffieldid).value ==  "DD.MM.YY" ) {
   darray = dateStringToArray(tbits[i]);
   dd = stringToIntLength(darray[0],2);
   mm = stringToIntLength(darray[1],2);   
   yyyy = "20"+darray[2];        
   document.getElementById("OutCol2").innerHTML = DateDisplay(yyyy+"-"+mm+"-"+dd);
  }
  if (document.getElementById(ffieldid).value == "DD.MM.YYYY" ) {
   darray = dateStringToArray(tbits[i]);
   dd = stringToIntLength(darray[0],2);
   mm = stringToIntLength(darray[1],2);   
   yyyy = darray[2];        
   document.getElementById("OutCol2").innerHTML = DateDisplay(yyyy+"-"+mm+"-"+dd);
  }
  if (document.getElementById(ffieldid).value == "DD.Mon.YY" ) {
   darray = dateStringToArray(tbits[i]);
   dd = stringToIntLength(darray[0],2);
   mm = montommarray[darray[1]];   
   yyyy = "20"+darray[2];        
   document.getElementById("OutCol2").innerHTML = DateDisplay(yyyy+"-"+mm+"-"+dd);
  }
  if (document.getElementById(ffieldid).value == "MM.DD.YY" ) {
   darray = dateStringToArray(tbits[i]);
   dd = stringToIntLength(darray[1],2);
   mm = stringToIntLength(darray[0],2);   
   yyyy = darray[2];     
   document.getElementById("OutCol2").innerHTML = DateDisplay(yyyy+"-"+mm+"-"+dd);
  }    
  if (document.getElementById(ffieldid).value == "Txn Type" ) {
   document.getElementById("OutCol3").innerHTML = TextDisplay(tbits[i]); 
  }
  if (document.getElementById(ffieldid).value == "Description" ) {
   document.getElementById("OutCol4").innerHTML = TextDisplay(tbits[i]);
  }
  if (document.getElementById(ffieldid).value == "Debit" ) {
   document.getElementById("OutCol5").innerHTML = AmountDisplay(stringToDec2(tbits[i])); 
  }     
  if (document.getElementById(ffieldid).value == "Credit" ) {
   document.getElementById("OutCol6").innerHTML = AmountDisplay(stringToDec2(tbits[i]));
  }  
  if (document.getElementById(ffieldid).value == "Debit/Credit" ) {
   if (tbits[i].indexOf("-") !=-1) { 
    document.getElementById("OutCol5").innerHTML = AmountDisplay(stringToDec2(tbits[i]));  
    document.getElementById("OutCol6").innerHTML = "";    
  } else {
   document.getElementById("OutCol5").innerHTML = "";    	  
   document.getElementById("OutCol6").innerHTML = AmountDisplay(stringToDec2(tbits[i]));
  }  
  }    
  if (document.getElementById(ffieldid).value == "Balance" ) {  
    if (tbits[i].indexOf("-") !=-1) { document.getElementById("OutCol7").innerHTML = AmountDisplay("-"+stringToDec2(tbits[i])); }	  
    else { document.getElementById("OutCol7").innerHTML = AmountDisplay(stringToDec2(tbits[i])); } 
  }    
 }
 var recorderror = "0";
 for (var i=0;i<8;i++) {	 
  var ofieldid = "OutCol"+i;
  var outstr = document.getElementById(ofieldid).innerHTML;
  if (outstr.indexOf('color="red"') !=-1) { recorderror = "1"; }	  
 }  
 if (recorderror == "0") { document.getElementById("OutResult").innerHTML = '<font color="green"><b>OK</b></font>'; }
 if (recorderror == "1") { document.getElementById("OutResult").innerHTML = '<font color="red"><b>ERROR</b></font>'; } 
}	 
//========== String Manipulation Routines ========================================================== 
 
function stringSplit(tstring) {
var xstring = tstring.replace("'", "");
var ssep = "";
if (tstring.indexOf("-") !=-1) { ssep = "-"; }		
if (tstring.indexOf("/") !=-1) { ssep = "/"; }
if (tstring.indexOf("_") !=-1) { ssep = "_"; }
if (tstring.indexOf(" ") !=-1) { ssep = " "; }
if (ssep != "") { return xstring.split(ssep); }
else { var nullarray = Array("",""); return nullarray; }
}
 
function stringToIntLength(instring,length) { 
 var m_strOut = new String(instring); 
 m_strOut = m_strOut.replace(/[^0-9]/g, '');
 var minuslength = 0 - length;
 if (m_strOut != "") { return ("0000000000"+m_strOut).substr(minuslength); }
 else { return ("????????"+m_strOut).substr(minuslength); }
}
 
function stringToDec2(tstring) {
if ( tstring == "" ) {
 return "";	
} else {
 var xstring = tstring.replace("-", "");
 var floatnum = parseFloat(xstring);
 var decnum = floatnum.toFixed(2);
 return decnum.toString();
}
}

function dateStringToArray(datestring) {
var tdarray = Array();
if (datestring.indexOf("-") !=-1) { tdarray = datestring.split("-"); }
if (datestring.indexOf("_") !=-1) { tdarray = datestring.split("_"); }
if (datestring.indexOf("/") !=-1) { tdarray = datestring.split("/"); }
if (datestring.indexOf(" ") !=-1) { tdarray = datestring.split(""); }
return tdarray;
}

//========== Output Field Display Routines ========================================================== 

function IntegerDisplay(dstring,dlength) {
 var xstring = dstring.replace(/\-/g, '');
 var xstring = xstring.replace(/\'/g, ""); 
 var tdarray = xstring.split("");
 var result = true;
 for (var tdindex in tdarray) {
  var char = tdarray[tdindex];
  if (char < "0") { result = false; }  
  if (char > "9") { result = false; }  
 }
 if ( result ) { 
  var minuslength = 0 - dlength;
  var ystring = ("0000000000"+xstring).substr(minuslength);
  return '<font color="' + "green" + '"><b>' + ystring + '</b></font>';    
 } 
 else {
  return '<font color="' + "red" + '"><b>' + dstring + '</b></font>';
 } 

}

function DateDisplay(dstring) {
 var tdarray = dstring.split("");
 var result = true;
 var postpoint = "0"; 
 var deccount = 0;
 if ((tdarray[0] < "0")||(tdarray[0] > "9")) { result = false; }  
 if ((tdarray[1] < "0")||(tdarray[1] > "9")) { result = false; }   
 if ((tdarray[2] < "0")||(tdarray[2] > "9")) { result = false; }   
 if ((tdarray[3] < "0")||(tdarray[3] > "9")) { result = false; }
 var floatnum = parseFloat(tdarray[0]+tdarray[1]+tdarray[2]+tdarray[3]);
 if ((floatnum < 2000)||(floatnum >2025)) { result = false; }  
 if (tdarray[4] != "-") { result = false; }  
 if ((tdarray[5] < "0")||(tdarray[5] > "9")) { result = false; }   
 if ((tdarray[6] < "0")||(tdarray[6] > "9")) { result = false; }
 var floatnum = parseFloat(tdarray[5]+tdarray[6]);
 if ((floatnum < 1)||(floatnum >12)) { result = false; }   
 if (tdarray[7] != "-") { result = false; }   
 if ((tdarray[8] < "0")||(tdarray[8] > "9")) { result = false; }   
 if ((tdarray[9] < "0")||(tdarray[9] > "9")) { result = false; }
 var floatnum = parseFloat(tdarray[8]+tdarray[9]);
 if ((floatnum < 1)||(floatnum >31)) { result = false; }   
 if (tdarray.length != 10) { result = false; }  
 if ( result ) { return '<font color="green"><b>' + dstring + '</b></font>'; }
 else { return '<font color="red"><b>' + "??????" + '</b></font>'; }

}

function TextDisplay(dstring) {
 return '<font color="' + "green" + '"><b>' + dstring + '</b></font>';
}

function AmountDisplay(dstring) {
 var result = true;
 if (dstring != "") {
  var tdarray = dstring.split("");
  var postpoint = "0"; 
  var deccount = 0;
  for (var tdindex in tdarray) {
   var char = tdarray[tdindex];
   if ((char >= "0")&&(char <= "9")&&(postpoint == "1")) { deccount++; }    
   if (char < "0") { if ((char == ".")||(char == "-")||(char == ",")) {} else { result = false; } } 
   if (char > "9") { if ((char == ".")||(char == "-")||(char == ",")) {} else { result = false; } } 
   if (char == ".") { postpoint = "1"; }
   if ((char == "-")&&(tdindex != 0)) { result = false; }   
  }
  if (deccount != 2) { result = false; }  
 }
 if ( result ) { resultcolor = "green"; } else { resultcolor = "red"; } 
 return '<font color="' + resultcolor + '"><b>' + dstring + '</b></font>';
}


//========== Bank Upload Maintenance ========================================================== 

function newBankupload() {
 // YAHOO.log newBankupload called ");
 // alert("newBankUpload called ");
 document.getElementById("nbankuploadidinput").value = "";
 document.getElementById("nbankuploadnameinput").value = ""; 
 bankuploadDialogObject.show(); 	
 newBankuploadDialogObject.show(); 
} 

function newBankuploadFinalise() {
 // YAHOO.log newBankupload called ");
 var newbankuploadid = document.getElementById("nbankuploadidinput").value;	
 Get_Data_Hash('bankupload',newbankuploadid); 
 if (GLOBALS["IOERROR"] == "1") {
  GLOBALS['bankupload_id'] = newbankuploadid; 
  GLOBALS['bankupload_name'] = document.getElementById("nbankuploadnameinput").value;
  GLOBALS['bankupload_filetype'] = "csv";   
  if ( document.getElementById("bankuploadheader").checked == true ) { GLOBALS['bankupload_header'] = "Yes"; }
  else { GLOBALS['bankupload_header'] = "No"; }
  for (var i=0;i<maxtestinputcolindex+1;i++) {	 
   var ffieldid = "Format"+i;
   var cfieldid = "bankupload_col"+i;  
   GLOBALS[cfieldid] = document.getElementById(ffieldid).value;   
  }
  Write_Data_Hash('bankupload',newbankuploadid); 	 
  newBankuploadDialogObject.hide();  
  repopulateBankuploadTable(); 
  alert("New Format "+newbankuploadid+" created");
 } else {
  alert(newbankuploadid+" already exists - please try another name.");
  bankuploadDialogObject.hide();   
 } 
  
} 

function updateBankupload() {
 // YAHOO.log updateBankupload called ");
 // alert("updateBankupload called ");
 document.getElementById("bankuploadupdate_warning").innerHTML = 'Please confirm that you wish to update the "'+activebankuploadtableid+'" Format?';	 
 updateBankuploadDialogObject.show(); 
} 

function updateBankuploadFinalise() {
 // YAHOO.log updateBankuploadFinalise called ");
 if ( document.getElementById("bankuploadheader").checked == true ) { GLOBALS['bankupload_header'] = "Yes"; }
 else { GLOBALS['bankupload_header'] = "No"; }
 for (var i=0;i<maxtestinputcolindex+1;i++) {	 
  var ffieldid = "Format"+i;
  var cfieldid = "bankupload_col"+i;  
  GLOBALS[cfieldid] = document.getElementById(ffieldid).value;   
 } 	
 Write_Data_Hash('bankupload',activebankuploadtableid);
 updateBankuploadDialogObject.hide();
 alert("Format "+activebankuploadtableid+" updated"); 
} 

function deleteBankupload() {
 // YAHOO.log deleteBankupload called ");
 // alert("deleteBankupload called ");
 document.getElementById("bankuploaddelete_warning").innerHTML = 'Please confirm that you wish to delete the "'+activebankuploadtableid+'" Format?';		
 deleteBankuploadDialogObject.show(); 
} 

 function deleteBankuploadFinalise() {
 // YAHOO.log deleteBankupload called ");
 Delete_Data_Hash('bankupload',activebankuploadtableid);
 deleteBankuploadDialogObject.hide();  
 repopulateBankuploadTable();
 alert("Format "+activebankuploadtableid+" deleted"); 
} 

function cancelBankupload() {
 // YAHOO.log cancelBankupload called ");
 alert("Cancelled - no further updates made.");
} 
	 
YAHOO.util.Event.addListener(window, "load", initPage);
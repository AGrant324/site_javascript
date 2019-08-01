YAHOO.namespace ("BBgeneric");

// parm0 "|" ------------------------------------------------------------------------------
//     0         1          2            3            4            5             6                   
// pagetitle primetable othertables keyfieldname sortfieldname pagination  enable add-copy
//                                                             number/No      Yes/No/NoAdd
// pagetitle - could be Travel Transactions[Bank transcations will be processed via the Bank Allocate routine] to give extra description line
// primetable or other tables could be in format section[rootkey=2009-10] or mergedkey (eg 'table1[mergedkey=fieldname1+fieldname2]') 
// keyfieldname - or mergedkeys - eg vatrate_id+vatrate_dateeffective
// sortfieldname - or mergedkeys - eg vatrate_id+vatrate_dateeffective

// Notes: Up to to 6 generic_programbuttons can be used eg generic_programbutton4
//
// parm1 "|" ------------------------------------------------------------------------------------------------------------------
//     0                  1                                  2            3                 4            5               6                      
// fieldname          fieldlisted                      fieldlisttitle fieldlistwidth fieldupdated fieldinputtitle fieldinputsyntax 
//           Yes/Yes[keyfield,valuefield]/No                                     Yes/No           
// fieldinputsyntax ","            ------------------------------------------------------------------------------------
//     0                               1              2            3              4                5                 6
// KeyText                            size           max 
// KeyDate
// KeySelectFromTable                 tablename    keyfieldname  textfieldname sortfieldname     linkid      linktext
// KeySelectFromList                  xk+yk        <--- OR xk[xt]+yk[yt]
// KeyGenerated                       addroot
// KeyPerson                          size           max       linkid      linktext
// InputText                          size           max
// InputTextArea                      rows           cols
// InputFixed                         value
// InputTextHidden                    size           max          value
// InputTextCalc                      size           max        table_field     +-*/*%/%      table_field                         <---- or table[key]_field
//                                                              prime_field        +-*/       prime_field                         <---- or prime_field+prime_field eg vat
//                                                              gross_field        vat        vatratefield       datefield 
// InputSelectFromTable               tablename    keyfieldname  textfieldname sortfieldname
// InputSelectFromTableDateEffective  tablename    keyfieldname  textfieldname sortfieldname  datefieldname/currentdate
// InputSelectFromTableCustom         tablename    keyfieldname  textfieldname sortfieldname  completedfields a+b 
// InputRadioFromTable                tablename    keyfieldname  textfieldname sortfieldname
// InputCheckboxFromTable             tablename    keyfieldname  textfieldname sortfieldname
// InputSelectFromList                xk+yk        <--- OR xk[xt]+yk[yt]
// InputRadioFromList                 xk+yk        <--- OR xk[xt]+yk[yt]
// InputCheckboxFromList              xk+yk        <--- OR xk[xt]+yk[yt]
// InputPerson                        size           max       buttonid      buttontext
// InputFile                          srcurl      filepath      Prefix1       Prefix2
//                                 domain_temp/srcurl
// InputImage                         srcurl      filepath      xsize/flex    ysize/flex      Prefix1             Prefix2
//                                 domain_temp/srcurl
// InputDate 
// AddCopyButton 
// UpdateButton
// DeleteButton
// ProgramButton                      pgm.php   parametername  valuefieldname  samewindow/newwindow/newpopup popupwidth  popupheight
// LinkButton                         url
// Divider
// parm2 "|" -------------------------------------------------------------------------------------------------
// 0             1                              2                                  
// ButtonText programname parameter value
// Finish personreloginin.php (Default)
// Finish personreloginin.php SpecialAction=DeleteDomainTempFiles
// Maintain Financial Categories finsetdefaultfincategories.php 

genericPageTitle = "";          // Header at top of Page
genericPrimeTable = "";         // Prime Table that is being managed - may include rootkey (eg 'section[rootkey=2011-12]') or mergedkey (eg 'table1[mergedkey=fieldname1+fieldname2]') 
genericOtherTables = "";        // Other tables used - may include rootkey (eg 'section[rootkey=2011-12]') or mergedkey (eg 'table1[mergedkey=fieldname1+fieldname2]') 
genericPrimeKeyFieldName = "";  // Prime Table keyfield name - or mergedkeys - eg vatrate_id+vatrate_dateeffective
genericListSortFieldName = "";  // Fieldname that is used to sort the table list - or mergedkeys - eg vatrate_id+vatrate_dateeffective
genericPagination = "";         // 'No' indicates no pagination - else '25' would show 25 items per page
genericAddCopy = "";            // 'No' indicates no copy allowed - "Yes" allows new entries based on copy of existing entries

genericKeyRoot = "";            // Null requires user to enter new key - 'M[00000]' would automatically create incrememtal index in format M00001,M00002 etc
genericHighestDataKey = "";         // Highest key created so far if keys automativcally generated

genericFieldName = "";
genericFieldNameArray = Array ( );         // Fieldname - or mergedkeys - eg vatrate_id+vatrate_dateeffective
genericFieldListedArray = Array ( );       // Whether field listed on table view
genericFieldListTitleArray = Array ( );    // Column Title if field listed on table view
genericFieldListWidthArray = Array ( );    // Column Width if field listed on table view
genericFieldUpdatedArray = Array ( );      // Whether field listed on table element update view
genericFieldInputTitleArray = Array ( );   // Input Title if field listed on table element update view
genericFieldInputSyntaxArray = Array ( );  // Input Syntax if field listed on table element update view

syntaxa = Array ( );
keyfieldnamea = Array ( );
keyfieldvaluea = Array ( );

genericDataKeyArray = Array ( );        // Array of keys to prime table
genericTitleToDataKeyArray = Array ( ); // Array of key titles to prime table - used to allow for translation of key codes to descriptive text
genericPrimeTableArray = Array ( );          // Array of field values listed on table for each prime key
activeMode = "";                        // update,add,delete,addcopy
activeGenericDataKey = "";              // Active key to prime table list
activeGenericTitle = "";             // Active key title to prime table - used to allow for translation of key codes to descriptive text
// activeGenericTableIndex = -1;           // Active index to table list
mergedkeyseparator = "+";
updatelog = "";
xy = Array ( );

displayfieldname = "";
displayfilepath = "";
displayfilename = "";
displayfilesrc = "";
displayfiletype = "";
displayimagepath = "";
displayimagename = "";
displayimagesrc = "";
displayimagetype = "";

function initGeneric() {
// initialise logger
// myLogConfigs = {width: "500px", right: "10em", top: "10%", fontSize: "80%" };
// myLogContainer = null;
// myLogReader = new YAHOO.widget.LogReader(myLogContainer, myLogConfigs);
// YAHOO.log("init called","info");

 parm0 = document.getElementById("G_parm0").value;
 parm1 = document.getElementById("G_parm1").value;
 
 this.today = new Date();
 thisDD = this.today.getDate();
 if (thisDD <10) {thisDDstr = ("0"+thisDD); } else {thisDDstr = (""+thisDD); }
 thisMM = this.today.getMonth()+1;
 if (thisMM <10) {thisMMstr = ("0"+thisMM); } else {thisMMstr = (""+thisMM); }
 thisYYYY = this.today.getFullYear();
 thisYYYYstr = (""+thisYYYY); 
 baseYYYY = 2000;
 thisYYYY_MM_DD = (""+thisYYYY)+"-"+("0"+thisMM).substr(-2)+"-"+("0"+thisDD).substr(-2);
 
 parm0a = parm0.split("|");
 genericPageTitle = parm0a[0];
 genericPrimeTable = parm0a[1];
 genericOtherTables = parm0a[2];
 genericPrimeKeyFieldName = parm0a[3];
 genericListSortFieldName = parm0a[4];
 genericPagination = parm0a[5];
 genericAddCopy = parm0a[6]; 
 
 parm1a = parm1.split("^");
 for (i in parm1a) {	
  parm1astring = parm1a[i];
  parm1astringa = parm1astring.split("|");
  genericFieldName = parm1astringa[0];
  genericFieldNameArray[genericFieldName] = parm1astringa[0];
  genericFieldListedArray[genericFieldName] = parm1astringa[1];
  genericFieldListTitleArray[genericFieldName] = parm1astringa[2];
  genericFieldListWidthArray[genericFieldName] = parm1astringa[3];  
  genericFieldUpdatedArray[genericFieldName] = parm1astringa[4];
  genericFieldInputTitleArray[genericFieldName] = parm1astringa[5];
  genericFieldInputSyntaxArray[genericFieldName] = parm1astringa[6];
  syntaxa = genericFieldInputSyntaxArray[genericFieldName].split(",");
  if (syntaxa[0] == "KeyGenerated") {
   genericKeyRoot = syntaxa[1];
  }    
 } 
 
//======= setup content dialogue popup ====================================================================
 var handleDialogSubmit = function() { 
  genericDialogObject.hide();  
  if (activeMode == "update") {updateFinalise();}
  if (activeMode == "add") {addFinalise();}
  // if (activeGenericTableIndex != -1) {genericPrimeTableObject.selectRow(genericPrimeTableObject.getTrEl(activeGenericTableIndex));}
 };
 var handleDialogCancel = function() { cancelTidyUp(); };
 genericDialogObject = new YAHOO.widget.Dialog("genericDialog", 
							{ visible : false,
	                          // fixedcenter : true,
							  zindex: 20,
							  close: false,   
							  // constraintoviewport : true,
							  buttons : [ { text:"Update", handler:handleDialogSubmit, isDefault:true },
								      { text:"Cancel", handler:handleDialogCancel } ]
 });
 genericDialogObject.center(); 
 genericDialogObject.render();
 $('#genericDialogouter').appendTo('body'); 

 setupWait(); 
 
 // setup the local hash databases
 var handleDataRequestSuccess = function(o){
     // YAHOO.log("The DataRequestSuccess handler was called; this transaction did not abort.  tId: " + o.tId + ".", "info");
	 // alert(o.responseText); 
	 // alert("Loading complete .. please continue"); 	 
	 // if (JSPersonId() == "bbra") { document.getElementById("updateLog").innerHTML = o.responseText; }
	 if(o.responseText != undefined){ Create_Hashes(o.responseText); }
	  // if (JSPersonId() == "bbra") { document.getElementById("updateLog").innerHTML = GLOBALS["person^INDEX"] }
	  populateAddKeys();
	  createTableArray(); 
	  populateTable();
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
 var dataRequestCallback =
		{
		  success: handleDataRequestSuccess,
		  failure: handleDataRequestFailure,
		  timeout: 50000
 };
 dataparms = "&DataRequestList="+genericPrimeTable;
 if (genericOtherTables != "") {
	 dataparms = dataparms+","+genericOtherTables;
 }
 var sUrl = EscapeSpecials(JSSitePHPURL()+"/"+JSCodeVersion()+"_javascriptdataprovider.php"+STDPARMS()+dataparms);
 // alert(sUrl);
 // document.getElementById("updateLog").innerHTML = sUrl;
 // YAHOO.log("makeDataRequest - "+sUrl,"info");
 startWait("Loading");
 YAHOO.util.Connect.asyncRequest('GET', sUrl, dataRequestCallback);
 
 //======= setup the listeners for the add buttons ====================================================================  
 var addButton = document.getElementById('addkeybutton');
 YAHOO.util.Event.addListener(addButton, "click", function (e) {
	 // alert("addkeybutton");
	 activeMode = "add";
	 Initialise_Data(genericPrimeTable);
	 activeGenericDataKey = "";	
	 keyfieldnamea = genericPrimeKeyFieldName.split("+");
	 var keyvaluesep = "";
	 var ki = 0+0;
	 for (var kn in keyfieldnamea) { // get keys for added record
      for (var fn in genericFieldNameArray) {
       syntaxa = genericFieldInputSyntaxArray[fn].split(",");
       if (genericFieldNameArray[fn].indexOf(keyfieldnamea[kn]) != -1){
        ki = ki+1;
        var inputkeyname = "addkeyinput"+ki;
        if (syntaxa[0] == "KeyText") {
         activeGenericDataKey = activeGenericDataKey+keyvaluesep+document.getElementById(inputkeyname).value;
        }
        if (syntaxa[0] == "KeyDate") {
       	 activeGenericDataKey = activeGenericDataKey+keyvaluesep+
            + document.getElementById(inputkeyname+'_YYYYpart').value + "-"
            + document.getElementById(inputkeyname+'_MMpart').value + "-"        
            + document.getElementById(inputkeyname+'_DDpart').value;           	 
        }
        if (syntaxa[0] == "KeySelectFromList") {
       	 activeGenericDataKey = activeGenericDataKey+keyvaluesep+document.getElementById(inputkeyname).value; 
        }     
        if (syntaxa[0] == "KeySelectFromTable") { 
       	 activeGenericDataKey = activeGenericDataKey+keyvaluesep+document.getElementById(inputkeyname).value; 
        }
        if (syntaxa[0] == "KeyGenerated") { 
       	 activeGenericDataKey = incrementKey(genericHighestDataKey); 
        }
        if (syntaxa[0] == "KeyPerson") {
         activeGenericDataKey = activeGenericDataKey+keyvaluesep+document.getElementById(inputkeyname).value;
        }      
        keyvaluesep = "+";
       }
      }
	 }
     GLOBALS[genericPrimeKeyFieldName] = activeGenericDataKey;
     separateMergedKey();     
	 prepareInput("add");
	 genericDialogObject.center(); 
	 genericDialogObject.show(); 
 },true);
 // YAHOO.log("custom listener set for - "+'addkeybutton',"info");
 
 //======= setup the special listeners on the custom inputs  #CHECK only one allowed per form so far====================================  
 for (var pi in genericFieldNameArray) {
  if (genericFieldUpdatedArray[pi].indexOf("Yes") != -1) {	
   syntaxa = genericFieldInputSyntaxArray[pi].split(",");
   if (syntaxa[0] == "InputSelectFromTableCustom") {
	var customInput = genericFieldNameArray[pi]+"_input";
    YAHOO.util.Event.addListener(customInput, 'change', function (e) {    
     var changedInput = YAHOO.util.Event.getTarget(e);
     var sfieldname = changedInput.id.replace("_input","");   
     var sfieldvalue = document.getElementById(customInput).value; 
     var ssyntaxa = genericFieldInputSyntaxArray[sfieldname].split(",");    	
     var slavefieldsa = ssyntaxa[5].split('+');
     // copy the  favourite values into the custom slave fields
     for (var si in slavefieldsa) {
      var favouritevalue = "";      
      Get_Data_Hash(ssyntaxa[1],sfieldvalue);
      if (GLOBALS["IOERROR"] == "0") {favouritevalue = GLOBALS[ssyntaxa[1]+"_"+slavefieldsa[si]];}       
      document.getElementById(genericPrimeTable+"_"+slavefieldsa[si]+"_input").value = favouritevalue;       	
     }
    },true);
    // alert("custom listener set for - "+customInput);       
   }
   if (syntaxa[0] == "InputTextCalc") {	 	
    // set up listener for x field	
	var xfieldname = syntaxa[3];
	var xnpartsa = xfieldname.split("_"); // CHECK doesnt yet cope with vat credit vat !!
	if (xnpartsa[0] == genericPrimeTable) { 
	 var xFieldId = xfieldname+"_input";
	 YAHOO.util.Event.addListener(xFieldId, 'change', function (e) {
	  var xchangedInput = YAHOO.util.Event.getTarget(e);		 
	  var xchangedfieldname = xchangedInput.id.replace("_input","");  		 
	  var xtargetfieldname = "";  
	  for (var pi in genericFieldNameArray) {
       var syntaxstr = genericFieldInputSyntaxArray[pi];
       if (syntaxstr.indexOf(xchangedfieldname) !=-1) {xtargetfieldname = pi;}   // CHECK nasty !!
	  }
	  calculateInput(xchangedfieldname,xtargetfieldname);     
	 },true);
	 // YAHOO.log("custom listener set for - "+xFieldId,"info");
	} 
    // set up listener for y field	
	var yfieldname = syntaxa[5];
	var ynpartsa = yfieldname.split("_");
	if (ynpartsa[0] == genericPrimeTable) { 
	 var yFieldId = yfieldname+"_input";
	 YAHOO.util.Event.addListener(yFieldId, 'change', function (e) {  	 
      var ychangedInput = YAHOO.util.Event.getTarget(e);		 
      var ychangedfieldname = ychangedInput.id.replace("_input","")
	  var ytargetfieldname = "";  
	  for (var pi in genericFieldNameArray) {
       var syntaxstr = genericFieldInputSyntaxArray[pi];
       if (syntaxstr.indexOf(ychangedfieldname) !=-1) {ytargetfieldname = pi;}   // CHECK nasty !!
      }
      calculateInput(ychangedfieldname,ytargetfieldname);  
	 },true);
	 // YAHOO.log("custom listener set for - "+yFieldId,"info");	 
	}
    // set up listener for any date field  eg vat	
	if (syntaxa[6] != undefined) {
	 var zfieldname = syntaxa[6];
	 var znpartsa = zfieldname.split("_");
	 if (znpartsa[0] == genericPrimeTable) { 
	  var zFieldId = zfieldname+"_input_YYYYpart";
	  YAHOO.util.Event.addListener(zFieldId, 'change', function (e) {  	 
       var zchangedInput = YAHOO.util.Event.getTarget(e);		 
       var zchangedfieldname = zchangedInput.id.replace("_input_YYYYpart","")
	   var ztargetfieldname = "";  
	   for (var pi in genericFieldNameArray) {
        var syntaxstr = genericFieldInputSyntaxArray[pi];
        if (syntaxstr.indexOf(zchangedfieldname) !=-1) {ztargetfieldname = pi;}   // CHECK nasty !!
       }
       calculateInput(zchangedfieldname,ztargetfieldname);  
	  },true);
	  // YAHOO.log("custom listener set for - _YYYYpart "+zFieldId,"info");	
	  var zFieldId = zfieldname+"_input_MMpart";
	  YAHOO.util.Event.addListener(zFieldId, 'change', function (e) {  	 
       var zchangedInput = YAHOO.util.Event.getTarget(e);		 
       var zchangedfieldname = zchangedInput.id.replace("_input_MMpart","")
	   var ztargetfieldname = "";  
	   for (var pi in genericFieldNameArray) {
        var syntaxstr = genericFieldInputSyntaxArray[pi];
        if (syntaxstr.indexOf(zchangedfieldname) !=-1) {ztargetfieldname = pi;}   // CHECK nasty !!
       }
       calculateInput(zchangedfieldname,ztargetfieldname);  
	  },true);
	  // YAHOO.log("custom listener set for - _MMpart "+zFieldId,"info");		  
	  var zFieldId = zfieldname+"_input_DDpart";
	  YAHOO.util.Event.addListener(zFieldId, 'change', function (e) {  	 
       var zchangedInput = YAHOO.util.Event.getTarget(e);		 
       var zchangedfieldname = zchangedInput.id.replace("_input_DDpart","")
	   var ztargetfieldname = "";  
	   for (var pi in genericFieldNameArray) {
        var syntaxstr = genericFieldInputSyntaxArray[pi];
        if (syntaxstr.indexOf(zchangedfieldname) !=-1) {ztargetfieldname = pi;}   // CHECK nasty !!
       }
       calculateInput(zchangedfieldname,ztargetfieldname);  
	  },true);
	  // YAHOO.log("custom listener set for - _DDpart "+zFieldId,"info");		  
	 }
    } 
   }
   /* now done by imagepopup,js 
   if (syntaxa[0] == "InputImage") {
    var customInput = genericFieldNameArray[pi]+"_imagedeletebutton";
    YAHOO.util.Event.addListener(customInput, 'click', function (e) {
     var deletedInput = YAHOO.util.Event.getTarget(e);
     var dfieldname = deletedInput.id.replace("_imagedeletebutton","");       	
     imageDelete(dfieldname);  
    },true);
   }
   */
   if (syntaxa[0] == "InputFile") {
    var customInput = genericFieldNameArray[pi]+"_filedeletebutton";
    YAHOO.util.Event.addListener(customInput, 'click', function (e) {
     var deletedInput = YAHOO.util.Event.getTarget(e);
     var dfieldname = deletedInput.id.replace("_filedeletebutton","");       	
     deleteFile(dfieldname);  
    },true);
   }   
  }
 } 
};

YAHOO.util.Event.addListener(window, "load", initGeneric);

function createTableArray() {
 // YAHOO.log("createTableArray called - "+genericPrimeTable,"info");
 genericDataKeyArray = Get_Array_Hash(genericPrimeTable);
 genericTitleToDataKeyArray = Array ( ); 
 if (genericDataKeyArray.length >0) {
  for (var genericdataindex in genericDataKeyArray) {
   tgenericDataKey = genericDataKeyArray[genericdataindex];
   Get_Data_Hash(genericPrimeTable,tgenericDataKey);
   separateMergedKey();    
   var temparray = Array ();
   var genericTitle = "";  
   var genericTitleSep = ""; 
   for (var fi in genericFieldNameArray) {
    if (genericFieldListedArray[fi].indexOf("Yes") != -1) {	   
     listtext = "";
     var keyfield = "0";
     syntaxa = genericFieldInputSyntaxArray[fi].split(",");
     if (syntaxa[0] == "KeyText") {
    	 listtext = GLOBALS[genericFieldNameArray[fi]];
    	 keyfield = "1";
     }
     if (syntaxa[0] == "KeyDate") {
         listtext = GLOBALS[genericFieldNameArray[fi]];
    	 keyfield = "1";         
     }
     if (syntaxa[0] == "KeySelectFromList") {
         listtext = GLOBALS[genericFieldNameArray[fi]];
    	 keyfield = "1";         
     }     
     if (syntaxa[0] == "KeySelectFromTable") { 
         listtext = SyntaxKeyToValue(syntaxa[1],syntaxa[2],syntaxa[3],GLOBALS[genericFieldNameArray[fi]]);
    	 keyfield = "1";         
     }
     if (syntaxa[0] == "KeyGenerated") {
      listtext = GLOBALS[genericFieldNameArray[fi]];     	 
      if (GLOBALS[genericPrimeKeyFieldName] > genericHighestDataKey) {genericHighestDataKey = GLOBALS[genericPrimeKeyFieldName]; }
 	  keyfield = "1";      
     } 
     if (syntaxa[0] == "KeyPerson") {
    	 Get_Data_Hash('person',GLOBALS[genericFieldNameArray[fi]]);
    	 listtext = GLOBALS['person_fname']+" "+GLOBALS['person_sname'];
    	 keyfield = "1";
     }     
     if (keyfield == "1") {
      genericTitle = genericTitle + genericTitleSep + listtext;  
      genericTitleSep = "+";     	 
     }
     if (syntaxa[0] == "InputText") {
      listtext = GLOBALS[genericFieldNameArray[fi]];  
     }
     if (syntaxa[0] == "InputTextArea") {
      listtext = GLOBALS[genericFieldNameArray[fi]];  
     }     
     if (syntaxa[0] == "InputTextCalc") {
      listtext = GLOBALS[genericFieldNameArray[fi]];  
     }       
     if (syntaxa[0] == "InputHidden") {
      listtext = syntaxa[1];  
     }  
     if (syntaxa[0] == "InputFixed") {
      listtext = syntaxa[1];  
     }        
     if (syntaxa[0] == "InputSelectFromList") {
      temphash = SyntaxListToHash(syntaxa[1]);      
      listtext = temphash[GLOBALS[genericFieldNameArray[fi]]]; 
     }
     if (syntaxa[0] == "InputSelectFromTable") { 
       listtext = SyntaxKeyToValue(syntaxa[1],syntaxa[2],syntaxa[3],GLOBALS[genericFieldNameArray[fi]]);  
     }
     if (syntaxa[0] == "InputSelectFromTableDateEffective") { 
      Get_Data_Hash_DateEffective(syntaxa[1],GLOBALS[genericFieldNameArray[fi]],syntaxa[5]);
      if (GLOBALS["IOERROR"] == "0") {listtext = GLOBALS[syntaxa[3]];}  
     }     
     if (syntaxa[0] == "InputSelectFromTableCustom") { 
       listtext = SyntaxKeyToValue(syntaxa[1],syntaxa[2],syntaxa[3],GLOBALS[genericFieldNameArray[fi]]);  
     }
     if (syntaxa[0] == "InputCheckboxFromList") { 
      temphash = SyntaxListToHash(syntaxa[1]);  
      listtext = KeysToValuesList(temphash,GLOBALS[genericFieldNameArray[fi]]);
     }   
     if (syntaxa[0] == "InputCheckboxFromTable") { 
      temphash = Get_Hash_Hash(syntaxa[1],syntaxa[3]);
      listtext = KeysToValuesList(temphash,GLOBALS[genericFieldNameArray[fi]]);
      listtext = listtext.replace(/,/g, " ");
     } 
     if (syntaxa[0] == "InputRadioFromList") { 
      temphash = SyntaxListToHash(syntaxa[1]);	   
      listtext = temphash[GLOBALS[genericFieldNameArray[fi]]];    
     } 
     if (syntaxa[0] == "InputRadioFromTable") { 
      listtext = SyntaxKeyToValue(syntaxa[1],syntaxa[2],syntaxa[3],GLOBALS[genericFieldNameArray[fi]]);  
     }      
     if (syntaxa[0] == "InputPerson") {
      listtext = ""; sep = "";
      if (GLOBALS[genericFieldNameArray[fi]] != "") {
       personidsa = GLOBALS[genericFieldNameArray[fi]].split(",");  
       for (var pi in personidsa) {
	       Get_Data_Hash('person',personidsa[pi]);
	       listtext = listtext+sep+GLOBALS['person_fname']+" "+GLOBALS['person_sname'];
	       sep = " / ";
       }
      } else {listtext = ""; }
     } 
     if (syntaxa[0] == "InputDate") {
	  if (GLOBALS[genericFieldNameArray[fi]] == "0000-00-00") { listtext = ""; } 
	  else { listtext = GLOBALS[genericFieldNameArray[fi]]; }
     }
     if (syntaxa[0] == "InputFile") {
      if (GLOBALS[genericFieldNameArray[fi]] != "") {listtext = "Yes";} else {listtext = "No";} 
     } 
     if (syntaxa[0] == "InputImage") {
      if (GLOBALS[genericFieldNameArray[fi]] != "") {listtext = "Yes";} else {listtext = "No";} 
     }      
     if ((syntaxa[0] == "AddCopyButton")||
    	 (syntaxa[0] == "UpdateButton")||
         (syntaxa[0] == "DeleteButton")||
         (syntaxa[0] == "ProgramButton")) {
      listtext = genericFieldInputTitleArray[fi];	  
     }
     if (syntaxa[0] != "Divider") {   
      //  YAHOO.log(tgenericId+" "+genericFieldNameArray[fi]+" "+listtext,"info");
      temparray.push(listtext);
     }
    }
   }
   genericPrimeTableArray[genericdataindex] = temparray;
   if (JSPersonId() == "bbra") {
    var tabletext = "";
    for (var tempindex in temparray) {
 	   tabletext = tabletext+" | "+temparray[tempindex];   
    }
    // alert(tabletext);
   }
   genericTitleToDataKeyArray[genericTitle] = tgenericDataKey;
   // alert(tgenericDataKey+ "|" +genericTitle);   
  }
 }
}

function populateTable() {
 // YAHOO.log("populateTable called","info");		

 // myColumnDefs ========================================================================== 
 var myColumnDefsstring = "";
 myColumnDefsstring = myColumnDefsstring + "var myColumnDefs = ["; 
 bigsep = "";
 var fi = 0+0;
 for (var fn in genericFieldNameArray) {
  if (genericFieldListedArray[fn].indexOf("Yes") != -1) {	  
   syntaxa = genericFieldInputSyntaxArray[fn].split(",");
   if ((genericFieldNameArray[fn] == "generic_addcopybutton")||
	   (genericFieldNameArray[fn] == "generic_updatebutton")||
       (genericFieldNameArray[fn] == "generic_deletebutton")||
       (genericFieldNameArray[fn] == "generic_programbutton")||
       (genericFieldNameArray[fn] == "generic_programbutton1")||
       (genericFieldNameArray[fn] == "generic_programbutton2")||       
       (genericFieldNameArray[fn] == "generic_programbutton3")||
       (genericFieldNameArray[fn] == "generic_programbutton4")||       
       (genericFieldNameArray[fn] == "generic_programbutton5")) {
	myColumnDefsstring = myColumnDefsstring + bigsep + '{'
    + 'key:"'+ genericFieldNameArray[fn] + '", '
    + 'label:"' + genericFieldListTitleArray[fn] + '", '   
//     + 'width:' + genericFieldListWidthArray[fn] + ', '   
	+ 'formatter:YAHOO.widget.DataTable.formatButton'   
	+ '}';	   
   } else {	   
	myColumnDefsstring = myColumnDefsstring + bigsep + '{'
    + 'key:"'+ genericFieldNameArray[fn] + '", '
    + 'label:"' + genericFieldListTitleArray[fn] + '", '   
//    + 'width:' + genericFieldListWidthArray[fn] + ', '   
    + 'resizeable:true,sortable:true'   
    + '}';
   }   
   bigsep = ',';
   fi++;   
  }
 }
 myColumnDefsstring = myColumnDefsstring + ']';
 // YAHOO.log(myColumnDefsstring,"info");
 // end myColumnDefs ========================================================================== 
 // alert(myColumnDefsstring);
 eval(myColumnDefsstring);
 updateButtonIndex = fi;
 deleteButtonIndex = fi+1; 
 
 var genericSourceObject = new YAHOO.util.DataSource(genericPrimeTableArray);
 genericSourceObject.responseType = YAHOO.util.XHRDataSource.TYPE_JSARRAY;
 // genericSourceObject.responseSchema ========================================================== 
 var responseSchemastring = "";
 responseSchemastring = responseSchemastring + "genericSourceObject.responseSchema = { fields: ["; 
 bigsep = "";
 for (var fn in genericFieldNameArray) {
  if (genericFieldListedArray[fn].indexOf("Yes") != -1) {	  
   responseSchemastring = responseSchemastring + bigsep + '"' + genericFieldNameArray[fn] + '"';
   bigsep = ",";
  }
 }
 responseSchemastring = responseSchemastring + "]}";
 // YAHOO.log(responseSchemastring,"info");
 // end responseSchema ======================================================================  
 eval(responseSchemastring);

 // myConfigs ====================================================================== 
 var thisKeyFieldName = genericPrimeKeyFieldName;
 if (genericPrimeTable.indexOf("mergedkey") !=-1) { // use first key field as table sort
  mergedfieldnamea = genericPrimeKeyFieldName.split("+");      
  thisKeyFieldName = mergedfieldnamea[0];  
  // alert("TABLE KEY   "+thisKeyFieldName);
 } 
 
 var myConfigsstring = "";
 myConfigsstring = myConfigsstring + 'var myConfigs = {'; 
 myConfigsstring = myConfigsstring + ' sortedBy:{key:"'+thisKeyFieldName+'",dir:"asc"},';
 if ((genericPagination == "No")||(genericPagination == "")) {}
 else {
  myConfigsstring = myConfigsstring + ' paginator: new YAHOO.widget.Paginator({';
  myConfigsstring = myConfigsstring + '   rowsPerPage: ' + genericPagination + ',';
  myConfigsstring = myConfigsstring + '   template: YAHOO.widget.Paginator.TEMPLATE_ROWS_PER_PAGE,';
  myConfigsstring = myConfigsstring + '   rowsPerPageOptions: [10,25,50,100],';
  myConfigsstring = myConfigsstring + '   pageLinks: 5';
  myConfigsstring = myConfigsstring + ' }),';
}
 myConfigsstring = myConfigsstring + ' draggableColumns:true';
 myConfigsstring = myConfigsstring + '}';
 // YAHOO.log(myConfigsstring,"info");
 // end myConfigs ====================================================================== 
 // alert(myConfigsstring);
 eval(myConfigsstring);

 genericPrimeTableObject = new YAHOO.widget.DataTable("genericPrimeTable", myColumnDefs, genericSourceObject, myConfigs);
 genericPrimeTableObject.subscribe("buttonClickEvent", buttonClicked);
 
 if ($('#addkeyinput1').length > 0) { document.getElementById('addkeyinput1').value = "";	}	 
 if ($('#addkeyinput2').length > 0) { document.getElementById('addkeyinput2').value = "";	}	
}

function buttonClicked(oArgs){
 var oRecord = this.getRecord(oArgs.target);
 var oColumn = this.getColumn(oArgs.target);
 var oColumnname = oColumn.getKey();
 activeGenericTableRow = oRecord;
 
 
 if (genericPrimeTable.indexOf("mergedkey") !=-1) {
  keyfieldnamea = genericPrimeKeyFieldName.split("+");      
  activeGenericTitle = oRecord.getData(keyfieldnamea[0])+"+"+oRecord.getData(keyfieldnamea[1]);
  specialkey = "1";  
 } else {
  activeGenericTitle = oRecord.getData(genericPrimeKeyFieldName);
 }

 // activeGenericTableIndex = -1;     
 // alert(activeGenericTitle); 
 activeGenericDataKey = genericTitleToDataKeyArray[activeGenericTitle]; 
 // alert(activeGenericDataKey);  
 var oColumnIndex = -1;
 for (var fi in genericFieldNameArray) {
  if (oColumnname == genericFieldNameArray[fi]) {oColumnIndex = fi;}
 }
 if (oColumnname == "generic_addcopybutton") {
  Get_Data_Hash(genericPrimeTable,activeGenericDataKey);
  separateMergedKey();     
  activeMode = "add";
  activeGenericDataKey = incrementKey(genericHighestDataKey);
  GLOBALS[genericPrimeKeyFieldName] = activeGenericDataKey;
  prepareInput("add");
  genericDialogObject.center(); 	 
  genericDialogObject.show();   
 
 } 
 if (oColumnname == "generic_deletebutton") {
  var answer = confirm ("Do you wish to delete "+activeGenericDataKey+"?")
  if (answer) {
   activeMode = "delete";  
   alert ('Record "'+activeGenericDataKey+'" will now be deleted');
   genericDialogObject.hide();
   deleteFinalise();
  } 
 }
 if (oColumnname == "generic_updatebutton") {
  // alert(activeGenericDataKey);
  Get_Data_Hash(genericPrimeTable,activeGenericDataKey);
  separateMergedKey();   
  activeMode = "update";
  prepareInput("update");
  genericDialogObject.center(); 
  genericDialogObject.show();
 }
 if ((oColumnname == "generic_programbutton")||
     (oColumnname == "generic_programbutton1")||
     (oColumnname == "generic_programbutton2")||
     (oColumnname == "generic_programbutton3")||     
     (oColumnname == "generic_programbutton4")||     
     (oColumnname == "generic_programbutton5")) {
  Get_Data_Hash(genericPrimeTable,activeGenericDataKey);
  separateMergedKey();  
  syntaxa = genericFieldInputSyntaxArray[oColumnIndex].split(",");
  dataparms = "&"+syntaxa[2]+"="+GLOBALS[syntaxa[3]];
  var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_"+syntaxa[1]+STDPARMS()+dataparms; 
  if (syntaxa[4] == "samewindow") {
	  window.location.replace(sUrl);
  }
  if (syntaxa[4] == "newwindow") {
	  window.open(sUrl,'_blank'); 
  }  
  if (syntaxa[4] == "newpopup") {
	 var $sizestring = 'width='+syntaxa[5]+',height='+syntaxa[6]+',scrollbars=yes';
	 var NWin = window.open(sUrl,'',$sizestring);
	 if (window.focus) { NWin.focus(); }  
  }

 } 
 return {
  oDS: genericSourceObject,
  oDT: genericPrimeTableObject
 };
}

function prepareInput(mode) {
 // YAHOO.log("prepareInputcalled - " + activeGenericDataKey,"info");
 for (var pi in genericFieldNameArray) {
  if (genericFieldUpdatedArray[pi].indexOf("Yes") != -1) {	
   syntaxa = genericFieldInputSyntaxArray[pi].split(",");
   // YAHOO.log("prepareInput "+genericFieldNameArray[pi]+" - "+genericFieldInputSyntaxArray[pi],"info");
   if (syntaxa[0] == "KeyText") {
	   document.getElementById(genericFieldNameArray[pi]+"_input").innerHTML = GLOBALS[genericFieldNameArray[pi]];
   }
   if (syntaxa[0] == "KeyDate") { 
	   document.getElementById(genericFieldNameArray[pi]+"_input").innerHTML = GLOBALS[genericFieldNameArray[pi]];
   }
   if (syntaxa[0] == "KeySelectFromList") {
	   document.getElementById(genericFieldNameArray[pi]+"_input").innerHTML = GLOBALS[genericFieldNameArray[pi]];
   }
   if (syntaxa[0] == "KeySelectFromTable") { 
	   document.getElementById(genericFieldNameArray[pi]+"_input").innerHTML = SyntaxKeyToValue(syntaxa[1],syntaxa[2],syntaxa[3],GLOBALS[genericFieldNameArray[pi]]);
   }
   if (syntaxa[0] == "KeyGenerated") { 
	   document.getElementById(genericFieldNameArray[pi]+"_input").innerHTML = GLOBALS[genericFieldNameArray[pi]];
   }
   if (syntaxa[0] == "KeyPerson") {
  	 Get_Data_Hash('person',GLOBALS[genericFieldNameArray[pi]]);	   
     document.getElementById(genericFieldNameArray[pi]+"_input").innerHTML = GLOBALS['person_fname']+" "+GLOBALS['person_sname'];
   }   
   if (syntaxa[0] == "InputText") { 
	   document.getElementById(genericFieldNameArray[pi]+"_input").value = GLOBALS[genericFieldNameArray[pi]];
   }
   if (syntaxa[0] == "InputTextArea") { 
	   document.getElementById(genericFieldNameArray[pi]+"_input").value = GLOBALS[genericFieldNameArray[pi]];
   }   
   if (syntaxa[0] == "InputTextCalc") { 
	   document.getElementById(genericFieldNameArray[pi]+"_input").value = GLOBALS[genericFieldNameArray[pi]];
   }    
   if (syntaxa[0] == "InputHidden") {
	   document.getElementById(genericFieldNameArray[pi]+"_input").innerHTML = syntaxa[1];
   }    
   if (syntaxa[0] == "InputFixed") {
	   document.getElementById(genericFieldNameArray[pi]+"_input").innerHTML = syntaxa[1];
   }
   if (syntaxa[0] == "InputSelectFromList") {
	temphash = SyntaxListToHash(syntaxa[1]);
	JSINSELECTHASH(temphash,
 	  eval("document.genericinputform."+genericFieldNameArray[pi]+"_input"),GLOBALS[genericFieldNameArray[pi]],"No","Yes","");
   } 
   if (syntaxa[0] == "InputSelectFromTable") {	   
	temphash = Get_SelectArrays_Hash(syntaxa[1],syntaxa[2],syntaxa[3]);
	JSINSELECTHASH(temphash,
	  eval("document.genericinputform."+genericFieldNameArray[pi]+"_input"),GLOBALS[genericFieldNameArray[pi]],"No","Yes","");
   }
   if (syntaxa[0] == "InputSelectFromTableDateEffective") {	   
    temphash = Get_SelectArrays_Hash_DateEffective(syntaxa[1],syntaxa[2],syntaxa[3],syntaxa[5]);
    JSINSELECTHASH(temphash,
      eval("document.genericinputform."+genericFieldNameArray[pi]+"_input"),GLOBALS[genericFieldNameArray[pi]],"No","Yes","");
   }   
   if (syntaxa[0] == "InputSelectFromTableCustom") { 
    temphash = Get_SelectArrays_Hash(syntaxa[1],syntaxa[2],syntaxa[3]);
    JSINSELECTHASH(temphash,
      eval("document.genericinputform."+genericFieldNameArray[pi]+"_input"),GLOBALS[genericFieldNameArray[pi]],"No","Yes","");
   }   
   if (syntaxa[0] == "InputCheckboxFromList") {
	temphash = SyntaxListToHash(syntaxa[1]);
	 JSINCHECKBOXHASH(temphash,
	  genericFieldNameArray[pi],GLOBALS[genericFieldNameArray[pi]],"","","");
   }   
   if (syntaxa[0] == "InputCheckboxFromTable") {	   
	temphash = Get_SelectArrays_Hash(syntaxa[1],syntaxa[2],syntaxa[3]);
	JSINCHECKBOXHASH(temphash,
	 genericFieldNameArray[pi],GLOBALS[genericFieldNameArray[pi]],"No","","Yes");
   }
   if (syntaxa[0] == "InputRadioFromList") {
    temphash = SyntaxListToHash(syntaxa[1]);
    JSINRADIOHASH(temphash,
     genericFieldNameArray[pi],GLOBALS[genericFieldNameArray[pi]],"","","");
   }   
   if (syntaxa[0] == "InputRadioFromTable") {	   
    temphash = Get_SelectArrays_Hash(syntaxa[1],syntaxa[2],syntaxa[3]);
    JSINRADIOHASH(temphash,
     genericFieldNameArray[pi],GLOBALS[genericFieldNameArray[pi]],"No","","Yes");
   }   
   if (syntaxa[0] == "InputPerson") { 
	document.getElementById(genericFieldNameArray[pi]+"_input").value = GLOBALS[genericFieldNameArray[pi]];
	PSP_personListCompleter();
   }
   if (syntaxa[0] == "InputDate") {
	   
	if (GLOBALS[genericFieldNameArray[pi]] == "") {
     if ((syntaxa.length == 2)&&(syntaxa[1] == "Today")) {
      document.getElementById(genericFieldNameArray[pi]+"_input_DDpart").value = thisDD;
      document.getElementById(genericFieldNameArray[pi]+"_input_MMpart").value = thisMM;
      document.getElementById(genericFieldNameArray[pi]+"_input_YYYYpart").value = thisYYYY;  
     } else {
  	  document.getElementById(genericFieldNameArray[pi]+"_input_DDpart").value = "00";
	  document.getElementById(genericFieldNameArray[pi]+"_input_MMpart").value = "00";
	  document.getElementById(genericFieldNameArray[pi]+"_input_YYYYpart").value = "0000";   	 
     }	
    } else {
     document.getElementById(genericFieldNameArray[pi]+"_input_DDpart").value = GLOBALS[genericFieldNameArray[pi]].substring(8,10);
     document.getElementById(genericFieldNameArray[pi]+"_input_MMpart").value = GLOBALS[genericFieldNameArray[pi]].substring(5,7);	
     document.getElementById(genericFieldNameArray[pi]+"_input_YYYYpart").value = GLOBALS[genericFieldNameArray[pi]].substring(0,4);	      
    }
	// JSINSELECTHASH(List2Hash("00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31"),
	// eval("document.genericinputform."+genericFieldNameArray[pi]+"_input_DDpart"),GLOBALS[genericFieldNameArray[pi]].substring(8,10),"No","","");	   
	// JSINSELECTHASH(List2Hash("00,01,02,03,04,05,06,07,08,09,10,11,12"),
	// eval("document.genericinputform."+genericFieldNameArray[pi]+"_input_MMpart"),GLOBALS[genericFieldNameArray[pi]].substring(5,7),"No","",""); 	   
	// JSINSELECTHASH(List2Hash("2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020"),
	// eval("document.genericinputform."+genericFieldNameArray[pi]+"_input_YYYYpart"),GLOBALS[genericFieldNameArray[pi]].substring(0,4),"No","",""); 	   
   }
   if (syntaxa[0] == "InputFile") {   
    // fieldname,imagename,srcpath,filepath,imageprefix1,imageprefix2	 
    displayFile1(genericFieldNameArray[pi],GLOBALS[genericFieldNameArray[pi]],syntaxa[1],syntaxa[2],syntaxa[3],syntaxa[4]); 
   }
   if (syntaxa[0] == "InputImage") { 
    // fieldname,imagename,srcpath,filepath,reqdimagewidth,reqdimageheight,imageprefix1,imageprefix2	 
    displayImage1(genericFieldNameArray[pi],GLOBALS[genericFieldNameArray[pi]],syntaxa[1],syntaxa[2],syntaxa[3],syntaxa[4],syntaxa[5],syntaxa[6]); 
   }
  } 
 } 
}

function updateFinalise() {
 YAHOO.log("updateFinalise -" + activeGenericDataKey + "-" + activeGenericTableRow,"info");
 Get_Data_Hash(genericPrimeTable,activeGenericDataKey);
 separateMergedKey();  
 for (var fi in genericFieldNameArray) {
  if (genericFieldUpdatedArray[fi].indexOf("Yes") != -1) {	
   // YAHOO.log(genericFieldNameArray[fi],"info");
   syntaxa = genericFieldInputSyntaxArray[fi].split(",");
   ts = "";   
   if (syntaxa[0] == "KeyText") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
   if (syntaxa[0] == "KeyDate") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
   if (syntaxa[0] == "KeySelectFromList") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }   
   if (syntaxa[0] == "KeySelectFromTable") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; } 
   if (syntaxa[0] == "KeyGenerated") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
   if (syntaxa[0] == "KeyPerson") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }   
   if (syntaxa[0] == "InputText") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
   if (syntaxa[0] == "InputTextArea") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }   
   if (syntaxa[0] == "InputTextCalc") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }   
   if (syntaxa[0] == "InputHidden") { ts =    syntaxa[1]; }   
   if (syntaxa[0] == "InputFixed") { ts = syntaxa[1]; }     
   if (syntaxa[0] == "InputSelectFromList") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }   
   if (syntaxa[0] == "InputSelectFromTable") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
   if (syntaxa[0] == "InputSelectFromTableDateEffective") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }   
   if (syntaxa[0] == "InputSelectFromTableCustom") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; } 
   if (syntaxa[0] == "InputCheckboxFromList") { ts = getCheckboxGroupValueList(genericFieldNameArray[fi]+"_input"); }    
   if (syntaxa[0] == "InputCheckboxFromTable") { ts = getCheckboxGroupValueList(genericFieldNameArray[fi]+"_input"); } 
   if (syntaxa[0] == "InputRadioFromList") { ts = getRadioGroupValue(genericFieldNameArray[fi]+"_input"); }  
   if (syntaxa[0] == "InputRadioFromTable") { ts = getRadioGroupValue(genericFieldNameArray[fi]+"_input"); }  
   if (syntaxa[0] == "InputPerson") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }      
   if (syntaxa[0] == "InputDate") { 
	   ts = document.getElementById(genericFieldNameArray[fi]+"_input_YYYYpart").value+"-"+  
	   document.getElementById(genericFieldNameArray[fi]+"_input_MMpart").value+"-"+   
	   document.getElementById(genericFieldNameArray[fi]+"_input_DDpart").value;  	   
   }
   if (syntaxa[0] == "InputFile") {
    xfile = document.getElementById(genericFieldNameArray[fi]+"_input").value;
    if (xfile.indexOf('tempf_') != -1) { tempfile = xfile; newfile = xfile.replace('tempf_',""); } 
    else { tempfile = ""; newfile = xfile; }
    if ((GLOBALS[genericFieldNameArray[fi]] != "")&&(newfile != GLOBALS[genericFieldNameArray[fi]])) { oldfile = GLOBALS[genericFieldNameArray[fi]]; }
    else { oldfile = ""; }
    genericFileUtility("RenameDelete",syntaxa[2],syntaxa[2],tempfile,newfile,oldfile,"");
    ts = newfile;
   }
   if (syntaxa[0] == "InputImage") {
	ximage = document.getElementById(genericFieldNameArray[fi]+"_input").value;
	if (ximage.indexOf('tempf_') != -1) { tempimage = ximage; newimage = ximage.replace('tempf_',""); } 
	else { tempimage = ""; newimage = ximage; }
	if ((GLOBALS[genericFieldNameArray[fi]] != "")&&(newimage != GLOBALS[genericFieldNameArray[fi]])) { oldimage = GLOBALS[genericFieldNameArray[fi]]; }
	else{ oldimage = ""; }
	genericFileUtility("RenameDelete",syntaxa[2],syntaxa[2],tempimage,newimage,oldimage,"");
	ts = newimage;
   }    
   if (ts != undefined){GLOBALS[genericFieldNameArray[fi]] = ts;}   
  }
 }
 if (GLOBALS[genericPrimeKeyFieldName] != activeGenericDataKey) {
  combineMergedKey();	 
  Write_Data_Hash(genericPrimeTable,GLOBALS[genericPrimeKeyFieldName]);
  Delete_Data_Hash(genericPrimeTable,activeGenericDataKey); 
 } else {
  combineMergedKey();		 
  Write_Data_Hash(genericPrimeTable,activeGenericDataKey);	 	 
 }

 for (var fi in genericFieldNameArray) {
  if (genericFieldListedArray[fi].indexOf("Yes") != -1) {	  
   syntaxa = genericFieldInputSyntaxArray[fi].split(",");
   listtext = "";
   if (syntaxa[0] == "KeyText") {
    listtext = GLOBALS[genericFieldNameArray[fi]];  
   }
   if (syntaxa[0] == "KeyDate") {
    listtext = GLOBALS[genericFieldNameArray[fi]];  
   }
   if (syntaxa[0] == "KeySelectFromList") {
    listtext = GLOBALS[genericFieldNameArray[fi]];  
   }   
   if (syntaxa[0] == "KeySelectFromTable") {
    listtext = SyntaxKeyToValue(syntaxa[1],syntaxa[2],syntaxa[3],GLOBALS[genericFieldNameArray[fi]]);  
   }  
   if (syntaxa[0] == "KeyGenerated") {
    listtext = GLOBALS[genericFieldNameArray[fi]];  
   }
   if (syntaxa[0] == "KeyPerson") {
    Get_Data_Hash('person',GLOBALS[genericFieldNameArray[fi]]);
    listtext = GLOBALS['person_fname']+" "+GLOBALS['person_sname'];   
   }   
   if (syntaxa[0] == "InputText") {
   	listtext = GLOBALS[genericFieldNameArray[fi]];  
   }
   if (syntaxa[0] == "InputTextArea") {
    listtext = GLOBALS[genericFieldNameArray[fi]];  
   }  
   if (syntaxa[0] == "InputTextCalc") {
	listtext = GLOBALS[genericFieldNameArray[fi]];  
   }   
   if (syntaxa[0] == "InputHidden") {
	listtext = GLOBALS[genericFieldNameArray[fi]];  
   }  
   if (syntaxa[0] == "InputFixed") {
    listtext = GLOBALS[genericFieldNameArray[fi]];   
   }
   if (syntaxa[0] == "InputSelectFromList") {
	 temphash = SyntaxListToHash(syntaxa[1]);	   
	 listtext = temphash[GLOBALS[genericFieldNameArray[fi]]];  
   }   
   if (syntaxa[0] == "InputSelectFromTable") { 
	listtext = SyntaxKeyToValue(syntaxa[1],syntaxa[2],syntaxa[3],GLOBALS[genericFieldNameArray[fi]]);     
   }
   if (syntaxa[0] == "InputSelectFromTableDateEffective") { 
    Get_Data_Hash_DateEffective(syntaxa[1],GLOBALS[genericFieldNameArray[fi]],syntaxa[5]);
    if (GLOBALS["IOERROR"] == "0") {listtext = GLOBALS[syntaxa[3]];}      
   }   
   if (syntaxa[0] == "InputSelectFromTableCustom") { 
	listtext = SyntaxKeyToValue(syntaxa[1],syntaxa[2],syntaxa[3],GLOBALS[genericFieldNameArray[fi]]);    
   }   
   if (syntaxa[0] == "InputSelectFromList") {
	temphash = SyntaxListToHash(syntaxa[1]);	   
	listtext = temphash[GLOBALS[genericFieldNameArray[fi]]];  
   }     
   if (syntaxa[0] == "InputCheckboxFromList") {   
    temphash = SyntaxListToHash(syntaxa[1]);	   
    listtext = KeysToValuesList(temphash,GLOBALS[genericFieldNameArray[fi]]);
   }     
   if (syntaxa[0] == "InputCheckboxFromTable") {
    temphash = Get_Hash_Hash(syntaxa[1],syntaxa[3]);	   
    listtext = KeysToValuesList(temphash,GLOBALS[genericFieldNameArray[fi]]);
   }
   if (syntaxa[0] == "InputRadioFromList") {
    temphash = SyntaxListToHash(syntaxa[1]);	   
    listtext = temphash[GLOBALS[genericFieldNameArray[fi]]];    
   }     
   if (syntaxa[0] == "InputRadioFromTable") { 
    listtext = SyntaxKeyToValue(syntaxa[1],syntaxa[2],syntaxa[3],GLOBALS[genericFieldNameArray[fi]]);      
   }    
   if (syntaxa[0] == "InputPerson") {
      listtext = ""; sep = "";
      if (GLOBALS[genericFieldNameArray[fi]] != "") {
       personidsa = GLOBALS[genericFieldNameArray[fi]].split(",");  
       for (var pi in personidsa) {
	       Get_Data_Hash('person',personidsa[pi]);
	       listtext = listtext+sep+GLOBALS['person_fname']+" "+GLOBALS['person_sname'];
	       sep = " / ";
       }
      } else {listtext = ""; }
   }  
   if ((syntaxa[0] == "AddCopyButton")||   
       (syntaxa[0] == "UpdateButton")||
       (syntaxa[0] == "DeleteButton")||
       (syntaxa[0] == "ProgramButton")) {
    listtext = genericFieldInputTitleArray[fi];	  
   } 
   if (syntaxa[0] == "InputDate") {
		if (GLOBALS[genericFieldNameArray[fi]] == "0000-00-00") { listtext = ""; } 
		else { listtext = GLOBALS[genericFieldNameArray[fi]]; }
   }
   if (syntaxa[0] == "InputFile") {
    if (GLOBALS[genericFieldNameArray[fi]] != "") {listtext = "Yes";} else {listtext = "No";} 
   } 
   if (syntaxa[0] == "InputImage") {
    if (GLOBALS[genericFieldNameArray[fi]] != "") {listtext = "Yes";} else {listtext = "No";} 
   }      
   if (syntaxa[0] != "Divider") {   
    var col = genericPrimeTableObject.getColumn(genericFieldNameArray[fi]);
    genericPrimeTableObject.updateCell(activeGenericTableRow, col, listtext);
   }
  }
 }
 activeMode = "";
}
 
function addFinalise() {	
 YAHOO.log("addFinalise -" + activeGenericDataKey,"info");
 // alert("addFinalise - " + activeGenericDataKey);
 for (var fi in genericFieldNameArray) {
  if (genericFieldUpdatedArray[fi].indexOf("Yes") != -1) {	
   // YAHOO.log(genericFieldNameArray[fi],"info");
   syntaxa = genericFieldInputSyntaxArray[fi].split(",");
   ts = "";   
   if (syntaxa[0] == "KeyText") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
   if (syntaxa[0] == "KeyDate") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; } 
   if (syntaxa[0] == "KeySelectFromList") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }    
   if (syntaxa[0] == "KeySelectFromTable") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; } 
   if (syntaxa[0] == "KeyGenerated") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
   if (syntaxa[0] == "KeyPerson") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }   
   if (syntaxa[0] == "InputText") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
   if (syntaxa[0] == "InputTextArea") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
   if (syntaxa[0] == "InputTextCalc") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }   
   if (syntaxa[0] == "InputHidden") { ts = syntaxa[1]; }   
   if (syntaxa[0] == "InputFixed") { ts = syntaxa[1]; }     
   if (syntaxa[0] == "InputSelectFromList") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }   
   if (syntaxa[0] == "InputSelectFromTable") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
   if (syntaxa[0] == "InputSelectFromTableDateEffective") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }   
   if (syntaxa[0] == "InputSelectFromTableCustom") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; } 
   if (syntaxa[0] == "InputCheckboxFromList") { ts = getCheckboxGroupValueList(genericFieldNameArray[fi]+"_input"); }   
   if (syntaxa[0] == "InputCheckboxFromTable") { ts = getCheckboxGroupValueList(genericFieldNameArray[fi]+"_input"); }      
   if (syntaxa[0] == "InputRadioFromList") { ts = getRadioGroupValue(genericFieldNameArray[fi]+"_input"); } 
   if (syntaxa[0] == "InputRadioFromTable") { ts = getRadioGroupValue(genericFieldNameArray[fi]+"_input"); }
   if (syntaxa[0] == "InputPerson") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }      
   if (syntaxa[0] == "InputDate") { 
	   ts = document.getElementById(genericFieldNameArray[fi]+"_input_YYYYpart").value+"-"+  
	   document.getElementById(genericFieldNameArray[fi]+"_input_MMpart").value+"-"+   
	   document.getElementById(genericFieldNameArray[fi]+"_input_DDpart").value;  	   
   }
   if (syntaxa[0] == "InputFile") { 
    xfile = document.getElementById(genericFieldNameArray[fi]+"_input").value;
    if (xfile.indexOf('tempf_') != -1) { tempfile = xfile; newfile = xfile.replace('tempf_',""); } 
    else { tempfile = ""; newfile = xfile; }
    if ((GLOBALS[genericFieldNameArray[fi]] != "")&&(newfile != GLOBALS[genericFieldNameArray[fi]])) { oldfile = GLOBALS[genericFieldNameArray[fi]]; }
    else{ oldfile = ""; }
    genericFileUtility("RenameDelete",syntaxa[2],syntaxa[2],tempfile,newfile,oldfile,"");
    ts = newfile;   
   }
   if (syntaxa[0] == "InputImage") {
    ximage = document.getElementById(genericFieldNameArray[fi]+"_input").value;
    if (ximage.indexOf('tempf_') != -1) { tempimage = ximage; newimage = ximage.replace('tempf_',""); } 
    else { tempimage = ""; newimage = ximage; }
    if ((GLOBALS[genericFieldNameArray[fi]] != "")&&(newimage != GLOBALS[genericFieldNameArray[fi]])) { oldimage = GLOBALS[genericFieldNameArray[fi]]; }
	else{ oldimage = ""; }
    genericFileUtility("RenameDelete",syntaxa[2],syntaxa[2],tempimage,newimage,oldimage,"");
    ts = newimage;
   }
   if (ts != undefined){GLOBALS[genericFieldNameArray[fi]] = ts;}      
  }
 }
 combineMergedKey(); 
 Write_Data_Hash(genericPrimeTable,activeGenericDataKey);
 // var data = {one:"one",two:"two",three:"three",one:"one",two:"two",three:"three"};
 // data ========================================================== 
 var datastring = "";
 datastring = datastring + "var data = {"; 
 bigsep = "";
 var genericTitle = "";  
 var genericTitleSep = ""; 
 for (var fi in genericFieldNameArray) {
  if (genericFieldListedArray[fi].indexOf("Yes") != -1) {	  
   syntaxa = genericFieldInputSyntaxArray[fi].split(",");
   listtext = "";
   var keyfield = "0";    
   if (syntaxa[0] == "KeyText") {
    listtext = GLOBALS[genericFieldNameArray[fi]];
	keyfield = "1";    
   }
   if (syntaxa[0] == "KeyDate") {
    listtext = GLOBALS[genericFieldNameArray[fi]];
	keyfield = "1";       
   }
   if (syntaxa[0] == "KeySelectFromList") {
    listtext = GLOBALS[genericFieldNameArray[fi]];
	keyfield = "1";        
   }   
   if (syntaxa[0] == "KeySelectFromTable") {
    listtext = SyntaxKeyToValue(syntaxa[1],syntaxa[2],syntaxa[3],GLOBALS[genericFieldNameArray[fi]]); 
	keyfield = "1";        
   }
   if (syntaxa[0] == "KeyGenerated") {
    listtext = GLOBALS[genericFieldNameArray[fi]];
	keyfield = "1";        
   }
   if (syntaxa[0] == "KeyPerson") {
    Get_Data_Hash('person',GLOBALS[genericFieldNameArray[fi]]);
    listtext = GLOBALS['person_fname']+" "+GLOBALS['person_sname'];    
    keyfield = "1";        
   }   
   if (keyfield == "1") {
    genericTitle = genericTitle + genericTitleSep + listtext;  
    genericTitleSep = "+";     	 
   }   
   if (syntaxa[0] == "InputText") {
   	listtext = GLOBALS[genericFieldNameArray[fi]];  
   }
   if (syntaxa[0] == "InputTextArea") {
    listtext = GLOBALS[genericFieldNameArray[fi]];  
   }
   if (syntaxa[0] == "InputTextCalc") {
	listtext = GLOBALS[genericFieldNameArray[fi]];  
   }    
   if (syntaxa[0] == "InputHidden") {
	listtext = syntaxa[1];  
   }  
   if (syntaxa[0] == "InputFixed") {
    listtext = syntaxa[1];  
   }
   if (syntaxa[0] == "InputSelectFromList") {
    temphash = SyntaxListToHash(syntaxa[1]);	   
	listtext = temphash[GLOBALS[genericFieldNameArray[fi]]];  
   }   
   if (syntaxa[0] == "InputSelectFromTable") { 
	listtext = SyntaxKeyToValue(syntaxa[1],syntaxa[2],syntaxa[3],GLOBALS[genericFieldNameArray[fi]]);      
   }
   if (syntaxa[0] == "InputSelectFromTableDateEffective") { 
    Get_Data_Hash_DateEffective(syntaxa[1],GLOBALS[genericFieldNameArray[fi]],syntaxa[5]);
    if (GLOBALS["IOERROR"] == "0") {listtext = GLOBALS[syntaxa[3]];}       
   }   
   if (syntaxa[0] == "InputSelectFromTableCustom") { 
	listtext = SyntaxKeyToValue(syntaxa[1],syntaxa[2],syntaxa[3],GLOBALS[genericFieldNameArray[fi]]);   
   }
   if (syntaxa[0] == "InputCheckboxFromList") { 
    temphash = SyntaxListToHash(syntaxa[1]);	   
    listtext = KeysToValuesList(temphash,GLOBALS[genericFieldNameArray[fi]]);
   }   
   if (syntaxa[0] == "InputCheckboxFromTable") { 
    temphash = Get_Hash_Hash(syntaxa[1],syntaxa[3]);	   
    listtext = KeysToValuesList(temphash,GLOBALS[genericFieldNameArray[fi]]);    
   } 
   if (syntaxa[0] == "InputRadioFromList") { 
    temphash = SyntaxListToHash(syntaxa[1]);	   
    listtext = temphash[GLOBALS[genericFieldNameArray[fi]]];       
   }   
   if (syntaxa[0] == "InputRadioFromTable") { 
	listtext = SyntaxKeyToValue(syntaxa[1],syntaxa[2],syntaxa[3],GLOBALS[genericFieldNameArray[fi]]);     
   }  
   if (syntaxa[0] == "InputPerson") {
      listtext = ""; sep = "";
      if (GLOBALS[genericFieldNameArray[fi]] != "") {
       personidsa = GLOBALS[genericFieldNameArray[fi]].split(",");  
       for (var pi in personidsa) {
	       Get_Data_Hash('person',personidsa[pi]);
	       listtext = listtext+sep+GLOBALS['person_fname']+" "+GLOBALS['person_sname'];
	       sep = " / ";
       }
      } else {listtext = ""; }
   }     
   if ((syntaxa[0] == "AddCopyButton")||
	   (syntaxa[0] == "UpdateButton")||
       (syntaxa[0] == "DeleteButton")||
       (syntaxa[0] == "ProgramButton")) {
    listtext = genericFieldListTitleArray[fi];	  
   }
   if (syntaxa[0] == "InputDate") {
		if (GLOBALS[genericFieldNameArray[fi]] == "0000-00-00") { listtext = ""; } 
		else { listtext = GLOBALS[genericFieldNameArray[fi]]; }
   }
   if (syntaxa[0] == "InputFile") {
    if (GLOBALS[genericFieldNameArray[fi]] != "") {listtext = "Yes";} else {listtext = "No";} 
   }
   if (syntaxa[0] == "InputImage") {
    if (GLOBALS[genericFieldNameArray[fi]] != "") {listtext = "Yes";} else {listtext = "No";} 
   }    
   if (syntaxa[0] != "Divider") {   
    datastring = datastring + bigsep +'"'+ genericFieldNameArray[fi] + '":"'+listtext+'"'; bigsep = ",";
   }
  }
 }
 genericTitleToDataKeyArray[genericTitle] = activeGenericDataKey;
 datastring = datastring + "}";
 // YAHOO.log(datastring,"info");
 // alert(datastring);
 // end data ======================================================================  
 eval(datastring);
 var newrecord = YAHOO.widget.DataTable._cloneObject(data);   
 newrecord.genericPrimeKeyFieldName = activeGenericDataKey;
 genericPrimeTableObject.addRow(newrecord);   
 activeMode = "";
 if (genericKeyRoot == "") { 
  if ($('#addkeyinput1').length > 0) { document.getElementById('addkeyinput1').value = "";	}
  if ($('#addkeyinput1_personlist').length > 0) { document.getElementById('addkeyinput1_personlist').innerHTML = "";	}  
  if ($('#addkeyinput2').length > 0) { document.getElementById('addkeyinput2').value = "";	}
  if ($('#addkeyinput2_personlist').length > 0) { document.getElementById('addkeyinput2_personlist').innerHTML = "";	}    
 }
}

function deleteFinalise() {
 // YAHOO.log("deleteFinalise -" + activeGenericDataKey,"info");
 // alert("deleteFinalise -" + activeGenericDataKey);
 Delete_Data_Hash(genericPrimeTable,activeGenericDataKey);
 genericPrimeTableObject.deleteRow(activeGenericTableRow);
 activeMode = ""; 
}

function cancelTidyUp() {
 // alert("cancelTidyUp -" + activeGenericDataKey);	
 // YAHOO.log("cancelTidyUp -" + activeGenericDataKey,"info");
 for (var fi in genericFieldNameArray) {
  if (genericFieldUpdatedArray[fi].indexOf("Yes") != -1) {	  
   syntaxa = genericFieldInputSyntaxArray[fi].split(",");
   if (syntaxa[0] == "InputImage") {
    tempimagename = document.getElementById(genericFieldNameArray[fi]+"_input").value;      
    if (tempimagename.indexOf('tempf_') != -1) {      
     genericFileUtility("Delete",syntaxa[2],syntaxa[2],tempimagename,"","");
    }
   }
  }
 }
 genericDialogObject.hide();
}

// function uploadImage() {	 
//  alert("uploadImage called");
// }

function incrementKey(currentkey) { 
// increment the highest key - format CB[00000] or CB[YYMMDDHHMMSS]	
 // YAHOO.log("incrementKey called "+currentkey+"|"+genericKeyRoot+" ","info");
 var keybase = "XX";
 var keyseq = "SSSSSS";
 if (genericKeyRoot.indexOf('[') != -1) {
  xarray = genericKeyRoot.split('[');
  yarray = xarray[1].split(']');
  keybase = xarray[0];
  keyseq = yarray[0];  
 } 
 if (keyseq = "00000") {
  var currentkeynumericstr = "0";
  if (currentkey != "") {currentkeynumericstr = currentkey.replace(keybase,"");}
  var currentkeynumeric = parseFloat(currentkeynumericstr);
  // YAHOO.log("incrementKey 1 called "+currentkeynumeric+"|"+currentkeynumericstr+" ","info");	   
  var newkeynumeric = currentkeynumeric + 1;
  var newkeynumericstr = "00000"+newkeynumeric;
  var newkeynumericstrlen = newkeynumericstr.length;
  // YAHOO.log("incrementKey 2 called "+newkeynumeric+"|"+newkeynumericstr+" ","info");	 
  var newkeystr = keybase+newkeynumericstr.substring(newkeynumericstrlen-5,newkeynumericstrlen);
  genericHighestDataKey = newkeystr;
  return newkeystr;
 }
}

function calculateInput(inputFieldName,targetFieldName) { 
 YAHOO.log("calculateInput called "+inputFieldName+"-------"+genericFieldInputSyntaxArray[targetFieldName],"info");		
 var tsyntaxa = genericFieldInputSyntaxArray[targetFieldName].split(",");    		 
 var xfieldname = tsyntaxa[3];	
 var operatorstr =  tsyntaxa[4];	
 var yfieldname = tsyntaxa[5];
 var xnum = 999;  // default avoiding zero divide		 
 var xnpartsa = xfieldname.split("_");
 if (xnpartsa[0] == genericPrimeTable) { xnum = getCalcInputFromPrime(tsyntaxa[3]);}
 else {xnum = getCalcInputFromOther(tsyntaxa[3]);}
 var ynum = 999;  // default avoiding zero divide	 
 var ynpartsa = yfieldname.split("_");
 if (ynpartsa[0] == genericPrimeTable) {
  if (operatorstr == "vat") {
   var datestr = document.getElementById(tsyntaxa[6]+"_input_YYYYpart").value+"-"+  
   document.getElementById(tsyntaxa[6]+"_input_MMpart").value+"-"+   
   document.getElementById(tsyntaxa[6]+"_input_DDpart").value;  	   
   ynum = getVATRate(document.getElementById(tsyntaxa[5]+"_input").value,datestr);
  }	 
  else { ynum = getCalcInputFromPrime(tsyntaxa[5]); }
 } else {ynum = getCalcInputFromOther(tsyntaxa[5]);}
 var calresult = 0;
 if (operatorstr == "+") { calresult = xnum + ynum;}
 if (operatorstr == "-") { calresult = xnum - ynum;}	 
 if (operatorstr == "*") { calresult = xnum * ynum;}	 
 if (operatorstr == "/") { calresult = xnum / ynum;}
 if (operatorstr == "*%") { calresult = (xnum * ynum)/100;}
 if (operatorstr == "/%") { calresult = (xnum / ynum)*100;} 
 if (operatorstr == "vat") { calresult = calcVAT(xnum,ynum,datestr);}  // CHECK doenst do credits yet
 var calresultstr = calresult.toString();
 var oldresultstr = document.getElementById(targetFieldName+"_input").value; 
 document.getElementById(targetFieldName+"_input").value = calresultstr;
 if ((operatorstr == "vat")&&(calresultstr != oldresultstr)&&(oldresultstr != "")) {alert("VAT Recalculated at "+ynum+"%");}
}
 
function getCalcInputFromPrime(syntaxelement) {
 YAHOO.log("getCalcInputFromPrime called "+syntaxelement,"info");
 if (syntaxelement.indexOf('+') != -1) {  // multiple field eg debit & credit for vat
  var xfpartsa = syntaxelement.split("+"); 
  return parseFloat(document.getElementById(xfpartsa[0]+"_input").value) + parseFloat(document.getElementById(xfpartsa[1]+"_input").value);	 
 } else {	 
  return parseFloat(document.getElementById(syntaxelement+"_input").value);
 }
}

function getCalcInputFromOther(syntaxelement) {
 YAHOO.log("getCalcInputFromOther called "+syntaxelement,"info");	
 var s0partsa = syntaxelement.split("_");
 var s1partsa = s0partsa[0].split("[");
 var s2partsa = s1partsa[1].split("]");
 var stable = s1partsa[0];
 var skey = s2partsa[0];
 var sfieldendname = s0partsa[1];
 Get_Data_Hash(stable,skey);
 if (GLOBALS["IOERROR"] == "0") {return parseFloat(GLOBALS[stable+"_"+sfieldendname]);}
 else {return 999;} // default avoiding zero divide	 
}

function getVATRate(vatrateidstr,vatratedate) {	
 // YAHOO.log("getVATRate called "+vatrateidstr+"  "+vatratedate,"info");
 Get_Data_Hash_DateEffective('vatrate',vatrateidstr,vatratedate);
 // alert("getVATRate called "+vatrateidstr+"  "+vatratedate+"  "+GLOBALS['vatrate_rate']);
 return parseFloat(GLOBALS['vatrate_rate']);
}

function calcVAT(grossnum,vatratenum) {
 // YAHOO.log("calcVAT called "+grossnum+"|"+vatratenum,"info");		
 vatnum = grossnum - (grossnum /(1+(vatratenum/100)));
 var vatnumrounded = vatnum.toFixed(2);
 return vatnumrounded.toString();
}

function displayImage1(tfieldname,timagename,tsrcurl,timagepath,treqdimagewidth,treqdimageheight,timageprefix1,timageprefix2) {	
 // fieldname,imagename,srcpath,filepath,reqdimagewidth,reqdimageheight,imageprefix1,imageprefix2	
 // alert("displayImage1 "+tfieldname);	
 document.getElementById(tfieldname+"_input").value = timagename; 
 document.getElementById(tfieldname+"_imagename").innerHTML = removeNamePrefixes(timagename);	  
 document.getElementById(tfieldname+"_imagesrcurl").value = tsrcurl;           
 document.getElementById(tfieldname+"_imagefilepath").value = timagepath; 
 document.getElementById(tfieldname+"_reqdimagewidth").value = treqdimagewidth;           
 document.getElementById(tfieldname+"_reqdimageheight").value = treqdimageheight;    
 document.getElementById(tfieldname+"_imageprefix1").value = timageprefix1;           
 document.getElementById(tfieldname+"_imageprefix2").value = GLOBALS[timageprefix2];
 document.getElementById(tfieldname+"_image").src = "";
 var imagefield = "#"+tfieldname+"_image"; $(imagefield).hide();  	  
 document.getElementById(tfieldname+"_object").data = ""; 
 var objectfield = "#"+tfieldname+"_object"; $(objectfield).hide();
 var ipartsa = timagename.split("."); 
 var timagetype = ipartsa[1]; 
 if ((tsrcurl.indexOf("domain_temp") > -1)&&(timagename != "")) {
   var fromimagepath = timagepath;
   var fromimagename = timagename; 
   var tempimagepath = JSDomainWWWPath()+"/domain_temp";   
   var tempimagename = "temp_"+new Date().getTime()+"."+timagetype;
   displayfieldname = tfieldname;
   displayimagepath = timagepath;   
   displayimagename = timagename;  
   displayimagetype = timagetype;  
   displayimagesrc = JSDomainWWWURL()+"/domain_temp/"+tempimagename;
   genericFileUtility("Copy",fromimagepath,tempimagepath,fromimagename,tempimagename,"","displayImage2");
 } else {
   displayfieldname = tfieldname;
   displayimagepath = timagepath;      
   displayimagename = timagename;     
   displayimagetype = timagetype;
   exptsrcurl = expandSymbolicURL(tsrcurl); 
   displayimagesrc = exptsrcurl+"/"+timagename+"?ForceRefresh="+new Date().getTime(); // forces cache refresh
   displayImage2();
 }
}

function displayImage2() {
 // alert("displayImage2");
 var displayimagetypeidentified = "0";	
 if ((displayimagetype == "pdf")||(displayimagetype == "PDF")) {
      displayimagetypeidentified = "1"; 	 
	  document.getElementById(displayfieldname+"_object").data = displayimagesrc;
	  document.getElementById(displayfieldname+"_object").style.width = "300px";
	  document.getElementById(displayfieldname+"_imagebutton").innerHTML = "Upload Replacement Image";	 	  
	  var objectfield = "#"+displayfieldname+"_object"; $(objectfield).show();
 } 
 if ((displayimagetype == "jpg")||(displayimagetype == "JPG")||
	     (displayimagetype == "jpeg")||(displayimagetype == "JPEG")|| 	
	     (displayimagetype == "gif")||(displayimagetype == "GIF")|| 	
	     (displayimagetype == "png")||(displayimagetype == "PNG")) { 
      displayimagetypeidentified = "1"; 		 
	  var handleGetImageSizeSuccess = function(o){
	   // YAHOO.log("The GetImageSizeSuccess handler was called; this transaction did not abort.  tId: " + o.tId + ".", "info");
	   if(o.responseText != undefined){  }
	   // imagegetsize.php returns "$error|$message|$width|$height"
	   // alert(o.responseText);
	   var responsea = new Array(4);
	   responsea = o.responseText.split("|");
	   if (responsea[0] == "0") {
			 loadImage(displayimagesrc, function(status) {			   
			   document.getElementById(displayfieldname+"_image").src = displayimagesrc;
			   actimagewidth = responsea[2];
	           actimageheight = responsea[3];	
			   if (actimagewidth > 200) {displayimageheight = (200*actimageheight)/actimagewidth; displayimagewidth = 200;}
			   else {displayimagewidth = actimagewidth; displayimageheight = actimageheight;} 
			   document.getElementById(displayfieldname+"_image").style.width = displayimagewidth+"px";   
			   document.getElementById(displayfieldname+"_imagewidth").value = actimagewidth;
               document.getElementById(displayfieldname+"_imagebutton").innerHTML = "Upload/Modify Image";	 				   
	           var imagefield = "#"+displayfieldname+"_image"; $(imagefield).show();
			 });
	   } else {
	           document.getElementById(displayfieldname+"_input").value = "";
			   document.getElementById(displayfieldname+"_image").src = "../site_assets/noimage.gif";
			   actimagewidth = 0;
	           actimageheight = 0;	
			   document.getElementById(displayfieldname+"_image").style.width = "50px"; 
			   document.getElementById(displayfieldname+"_imagewidth").value = "50px";
               document.getElementById(displayfieldname+"_imagebutton").innerHTML = "Upload New Image";				   
	   		   var imagefield = displayfieldname+"_image"; $(imagefield).show();            
	   }
	   stopWait();
	  }
	  var handleGetImageSizeFailure = function(o){
			  YAHOO.log("The DataWriteFailure handler was called; this transaction aborted.  tId: " + o.tId + ".", "info", "example");
			  response = "";  
			  response += "<li>Transaction id: " + o.tId + "</li>";
			  response += "<li>HTTP status: " + o.status + "</li>";
			  response += "<li>Status code message: " + o.statusText + "</li>";
			  document.getElementById("genericImageMessage").innerHTML = response;
	          stopWait();		  
	  }
	  var getImageSizeCallback =
					{
					  success: handleGetImageSizeSuccess,
					  failure: handleGetImageSizeFailure,
					  timeout: 5000
	  };
	  dataparms = '&ImageFile=' + displayimagepath+"/"+displayimagename; 
	  var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_imagegetsize.php"+STDPARMS()+dataparms; 
	  // alert("sendgetImageSize - "+sUrl);    
	  YAHOO.log("sendgetImageSize - "+sUrl,"info");
	  startWait("Loading");
	  YAHOO.util.Connect.asyncRequest('GET', sUrl, getImageSizeCallback);
 }
 if (displayimagetypeidentified == "0") {
		  if (displayfieldname == "") {
		   document.getElementById(displayfieldname+"_image").src = "../site_assets/nofile.gif";
		   document.getElementById(displayfieldname+"_image").style.width = "50px"; 
		   document.getElementById(displayfieldname+"_imagebutton").innerHTML = "Upload New Image";	   
		   var imagefield = "#"+displayfieldname+"_image"; $(imagefield).show();
		  } else {
		   // alert("file type cannot be displayed");
		   document.getElementById(displayfieldname+"_imagebutton").innerHTML = "Upload New Image"; 
		  }
 } 	
	
}

function deleteImage(tfieldname) {	
 // alert("deleteImage "+tfieldname);
 if (confirm('Are you sure you want to delete this image')) { 
		  document.getElementById(tfieldname+"_input").value = ""; 
		  document.getElementById(tfieldname+"_imagename").innerHTML = "";  
		  document.getElementById(tfieldname+"_image").src = "../site_assets/nofile.gif";
		  document.getElementById(tfieldname+"_image").style.width = "50px";
		  document.getElementById(tfieldname+"_imagebutton").innerHTML = "Upload New Image";	
		  var objectfield = "#"+tfieldname+"_object"; $(objectfield).hide();	  
		  var imagefield = "#"+tfieldname+"_image"; $(imagefield).show();
 } else {
			 	 
 }
}	 

function displayFile1(tfieldname,tfilename,tsrcurl,tfilepath,tfileprefix1,tfileprefix2) {
 // fieldname,filename,srcpath,filepath,fileprefix1,fileprefix2	
 // alert("displayFile1 "+tfieldname);		
 document.getElementById(tfieldname+"_input").value = tfilename; 
 document.getElementById(tfieldname+"_filename").innerHTML = removeNamePrefixes(tfilename);	
 document.getElementById(tfieldname+"_filesrcurl").value = tsrcurl;           
 document.getElementById(tfieldname+"_filefilepath").value = tfilepath;  
 document.getElementById(tfieldname+"_fileprefix1").value = tfileprefix1;           
 document.getElementById(tfieldname+"_fileprefix2").value = GLOBALS[tfileprefix2];
 document.getElementById(tfieldname+"_image").src = "";
 var imagefield = "#"+tfieldname+"_image"; $(imagefield).hide();  	  
 document.getElementById(tfieldname+"_object").data = ""; 
 var objectfield = "#"+tfieldname+"_object"; $(objectfield).hide();
 displayfieldname = tfieldname;
 displayfiletype = "";
 if (tfilename != "") {
  var ipartsa = tfilename.split("."); 
  displayfiletype = ipartsa[1];
 }
 if ((tsrcurl.indexOf("domain_temp") > -1)&&(tfilename != "")) {	 
  var fromfilepath = tfilepath;
  var fromfilename = tfilename; 
  var tempfilepath = JSDomainWWWPath()+"/domain_temp";
  var tempfilename = "temp_"+new Date().getTime()+"."+displayfiletype; 
  displayfilesrc = JSDomainWWWURL()+"/domain_temp/"+tempfilename;
  genericFileUtility("Copy",fromfilepath,tempfilepath,fromfilename,tempfilename,"","displayFile2");
 } else {
  displayfilesrc = tsrcurl+"/"+tfilename+"?ForceRefresh="+new Date().getTime(); // forces cache refresh
  displayFile2();  
 }
}

function displayFile2() {
 // alert(displayfiletype+" "+displayfilesrc+"  displayFile2"); 
 var displayfiletypeidentified = "0";	
 if ((displayfiletype == "pdf")||(displayfiletype == "PDF")) {
	 startWait("Loading");
	 loadImage(displayfilesrc, function(status) {	 
	  displayfiletypeidentified = "1";			 
	  document.getElementById(displayfieldname+"_object").data = displayfilesrc;
	  document.getElementById(displayfieldname+"_object").style.width = "300px";
	  var objectfield = "#"+displayfieldname+"_object"; $(objectfield).show();  
	  document.getElementById(displayfieldname+"_filebutton").innerHTML = "Upload Replacement File";
      stopWait();	  
	 });
 } 
 if ((displayfiletype == "jpg")||(displayfiletype == "JPG")||
	     (displayfiletype == "jpeg")||(displayfiletype == "JPEG")|| 	
	     (displayfiletype == "gif")||(displayfiletype == "GIF")|| 	
	     (displayfiletype == "png")||(displayfiletype == "PNG")) {
	 startWait("Loading");
	 loadImage(displayfilesrc, function(status) {
	   displayfiletypeidentified = "1";
	   document.getElementById(displayfieldname+"_image").src = displayfilesrc;
	   document.getElementById(displayfieldname+"_image").style.width = "300px"; 
	   var imagefield = "#"+displayfieldname+"_image"; $(imagefield).show();  
	   document.getElementById(displayfieldname+"_filebutton").innerHTML = "Upload Replacement File";
	   stopWait();
	 });	  
 } 
 if ((displayfiletype == "docx")||(displayfiletype == "DOCX")||
      (displayfiletype == "doc")||(displayfiletype == "DOC")) {
      displayfiletypeidentified = "1";
	  document.getElementById(displayfieldname+"_image").src = "../site_assets/WordIcon.jpg";
	  document.getElementById(displayfieldname+"_image").style.width = "50px"; 	 
	  $tidname = "#"+displayfieldname+"_image"; $($tidname).show();
      document.getElementById(displayfieldname+"_filebutton").innerHTML = "Upload Replacement File";	  
 }
 if ((displayfiletype == "pptx")||(displayfiletype == "PPTX")||
	     (displayfiletype == "ppt")||(displayfiletype == "PPT")) {
      displayfiletypeidentified = "1";
	  document.getElementById(displayfieldname+"_image").src = "../site_assets/PowerpointIcon.jpg";
	  document.getElementById(displayfieldname+"_image").style.width = "50px"; 	 
	  $tidname = "#"+displayfieldname+"_image"; $($tidname).show();
      document.getElementById(displayfieldname+"_filebutton").innerHTML = "Upload Replacement File";	  
 }
 if ((displayfiletype == "xlsx")||(displayfiletype == "XLSX")||
	     (displayfiletype == "xls")||(displayfiletype == "XLS")) {
      displayfiletypeidentified = "1";
	  document.getElementById(displayfieldname+"_image").src = "../site_assets/ExcelIcon.jpg";
	  document.getElementById(displayfieldname+"_image").style.width = "50px"; 	 
	  $tidname = "#"+displayfieldname+"_image"; $($tidname).show();
      document.getElementById(displayfieldname+"_filebutton").innerHTML = "Upload Replacement File";	  
 }  
 if (displayfiletypeidentified == "0") {
	  if (displayfiletype == "") {
	   document.getElementById(displayfieldname+"_image").src = "../site_assets/nofile.gif";
	   document.getElementById(displayfieldname+"_image").style.width = "50px";
	   document.getElementById(displayfieldname+"_filebutton").innerHTML = "Upload New File";	   
	   var imagefield = "#"+displayfieldname+"_image"; $(imagefield).show();
	   document.getElementById(displayfieldname+"_filebutton").innerHTML = "Upload New File"; 	   
	  } else {
	   // alert("file type cannot be displayed");
	   document.getElementById(displayfieldname+"_filebutton").innerHTML = "Upload New File"; 
	  }
 }          
}

function deleteFile(tfieldname) {	
 // alert("deleteFile "+tfieldname);
	 if (confirm('Are you sure you want to delete this file')) { 
		  document.getElementById(tfieldname+"_input").value = ""; 
		  document.getElementById(tfieldname+"_filename").innerHTML = "";  
		  document.getElementById(tfieldname+"_image").src = "../site_assets/nofile.gif";
		  document.getElementById(tfieldname+"_image").style.width = "50px";
		  document.getElementById(tfieldname+"_filebutton").innerHTML = "Upload New File";	
		  var objectfield = "#"+tfieldname+"_object"; $(objectfield).hide();	  
		  var imagefield = "#"+tfieldname+"_image"; $(imagefield).show();
} else {
			 	 
}
} 

function genericFileUtility(taction,tfilepath,tfilepathto,tfilename1,tfilename2,tfilename3,nextaction) { 
  // alert("genericFileUtility "+displayfiletype);     
  var handleFileUtilitySuccess = function(o){
  // YAHOO.log("The DataWriteSuccess handler was called; this transaction did not abort.  tId: " + o.tId + ".", "info");
  // alert(o.responseText);
  // $error|$message
  if(o.responseText != undefined){
   var responsea = new Array(2);
   responsea = o.responseText.split("|");
   if (responsea[0] == "0") {  }			  
   else {  }	
  }
  stopWait();    
  if (nextaction == "displayImage2") { displayImage2(); }
  if (nextaction == "displayFile2") { displayFile2(); }
 }
 var handleFileUtilityFailure = function(o){
  YAHOO.log("The DataWriteFailure handler was called; this transaction aborted.  tId: " + o.tId + ".", "info", "example");
  response = "";  
  response += "<li>Transaction id: " + o.tId + "</li>";
  response += "<li>HTTP status: " + o.status + "</li>";
  response += "<li>Status code message: " + o.statusText + "</li>";
  document.getElementById("genericImageMessage").innerHTML = response;
  if (nextaction == "displayImage2") { displayImage2(); }
  if (nextaction == "displayFile2") { displayFile2(); }  
 }
 var fileUtilityCallback =  {
  success: handleFileUtilitySuccess,
  failure: handleFileUtilityFailure,
  timeout: 5000
 };
 dataparms = "&Action=" + taction + "&FilePath=" + tfilepath + "&FilePathTo=" + tfilepathto + "&FileName1=" + tfilename1 + "&FileName2=" + tfilename2 + "&FileName3=" + tfilename3; 
 var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_fileutility.php"+STDPARMS()+dataparms; 
 // alert("sendFileUtility - "+sUrl);    
 YAHOO.log("sendFileUtility - "+sUrl,"info");
 YAHOO.util.Connect.asyncRequest('GET', sUrl, fileUtilityCallback);
 startWait("Loading"); 
}

function populateAddKeys() {	
//======= populate the add fields ========================================= 
var ki = 0+0;
keyfieldnamea = genericPrimeKeyFieldName.split("+");
for (var kn in keyfieldnamea) {
 for (var fn in genericFieldNameArray) {
  syntaxa = genericFieldInputSyntaxArray[fn].split(",");
  if (genericFieldNameArray[fn].indexOf(keyfieldnamea[kn]) != -1){
   ki = ki+1;
   var inputkeyname = "addkeyinput"+ki;
   if (syntaxa[0] == "KeyText") { }
   if (syntaxa[0] == "KeyDate") { }
   if (syntaxa[0] == "KeySelectFromList") {
    // hash id/name value showcode shownone showcustom
    temphash = SyntaxListToHash(syntaxa[1]);
    var node = document.getElementById(inputkeyname);
    JSINSELECTHASH(temphash,eval("document.generickeyinputform."+inputkeyname),"","No","Yes","");    
   }     
   if (syntaxa[0] == "KeySelectFromTable") { 
    temphash = Get_SelectArrays_Hash(syntaxa[1],syntaxa[2],syntaxa[3]);
    var node = document.getElementById(inputkeyname);    
    JSINSELECTHASH(temphash,node,"","No","Yes","");
   }
   if (syntaxa[0] == "KeyGenerated") { } 
   if (syntaxa[0] == "KeyPerson") { }   
  }
 }
} 
}

function separateMergedKey() {	
// GLOBALS[genericPrimeKeyFieldName] =  tgenericDataKey;
if (genericPrimeTable.indexOf("mergedkey") !=-1) { // split merged keys into individual fields
 keyfieldnamea = genericPrimeKeyFieldName.split("+");      
 keyfieldvaluea = GLOBALS[genericPrimeKeyFieldName].split("+");    
 GLOBALS[keyfieldnamea[0]] = keyfieldvaluea[0];
 GLOBALS[keyfieldnamea[1]] = keyfieldvaluea[1];
}
}

function combineMergedKey() {
if (genericPrimeTable.indexOf("mergedkey") !=-1) { // combined merged keys back into data key
 GLOBALS[genericPrimeKeyFieldName] = GLOBALS[keyfieldnamea[0]]+"+"+GLOBALS[keyfieldnamea[1]];
}
}


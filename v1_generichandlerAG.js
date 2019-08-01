$(document).ready( function() {

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
	// fieldinputsyntax ","            ------------------------------------------------------------------------------------------------------
	//     0                               1              2            3              4                5                 6              7
	// KeyText                            size           max
	// KeyDate
	// KeyTimestamp
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
	// InputPersonArea                    rows           cols      buttonid      buttontext
	// InputFile                          srcurl      filepath      Prefix1       Prefix2
	//                                 domain_temp/srcurl
	// InputImage                         srcurl      filepath      xsize/flex     ysize/flex      Prefix1      Prefix2
	// InputImage (LookUP Size)           srcurl      filepath      xsizefield[ki] ysizefield[ki] Prefix1      Prefix2     LookupSizeKey
	//                                 domain_temp/srcurl
	//                                    where ki is the input field containing the key to the lookup reference table
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
	genericPrimeTableParm = "";     // Prime Table that is being managed - may include rootkey (eg 'section[rootkey=2011-12]') or mergedkey (eg 'table1[mergedkey=fieldname1+fieldname2]')
	genericPrimeTable = "";			// CHECK - to permit more sophisticated selection of prime table firlds
	genericOtherTablesParm = "";        // Other tables used - may include rootkey (eg 'section[rootkey=2011-12]') or mergedkey (eg 'table1[mergedkey=fieldname1+fieldname2]')
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
	genericPrimeTableArray = Array ( );     // Array of field values listed on table for each prime key
	activeMode = "";                        // update,add,delete,addcopy
	activeGenericDataKey = "";              // Active key to prime table list
	activeGenericTitle = "";             	// Active key title to prime table - used to allow for translation of key codes to descriptive text
	activeGenericPrimeTableRow = "";        // Active row in prime table list
	timestampKey = "";
	mergedkeyseparator = '+';			//
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
	 genericPrimeTableParm = parm0a[1];
	 genericPrimeTable = parm0a[1];
	 genericOtherTablesParm = parm0a[2];
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
	  // genericDialogObject.hide();
	  $("#genericDialog").dialog("close");
	  if (activeMode == "update") {updateFinalise();}
	  if (activeMode == "add") {addFinalise();}
	  // if (activeGenericTableIndex != -1) {genericPrimeTableObject.selectRow(genericPrimeTableObject.getTrEl(activeGenericTableIndex));}
	 };
	 var handleDialogCancel = function() { cancelTidyUp(); };

	 $("#genericDialog").dialog({
			autoOpen: false,
			modal: true,
			width: 'auto',
		    buttons: {
		        "Update": function() { handleDialogSubmit(); },
		        "Cancel": function() { handleDialogCancel(); }
		    }
	});
	$("#genericDialog").dialog('option', 'title', genericPageTitle);
	$("#genericDialog").parent().css('zIndex',2000);  // plave in front of navmenu 1030

	setupWait();

	function handleDataRequestSuccess(data, status) {
	    // alert(data);
		if(data != undefined){
			// $('#TRACETEXT').html(data);
			Create_Hashes(data);
			// if (JSPersonId() == "bbra") { alert(GLOBALS["DATALOADED"]); }
			populateAddKeys();
			createTableArray();
			populateTable();
			// alert(PSP_inputsstring());
		}
		stopWait();
	}

	function handleDataRequestFailure(xhr, reason, ex) {
		alert("Error Reason = "+"|"+xhr+"|"+reason+"|"+ex+"|");
		// messageAlert("Error Reason = "+"|"+xhr+"|"+reason+"|"+ex+"|");
		 // messageAlert("You are not connected to the internet at this time");
	}

	var datarequestlist = genericPrimeTableParm;
	if (genericOtherTablesParm != "") {
		 datarequestlist = datarequestlist+","+genericOtherTablesParm;
	}
	startWait("Loading");
	var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_javascriptdataprovider.php";
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


	//======= setup the listeners for the add buttons ====================================================================
	$('#addkeybutton').on('click', function(event) {
		 // alert("addkeybutton");


		 //rtnpnt

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
					 // activeGenericDataKey.trim();
					 activeGenericDataKey = activeGenericDataKey.replace(/[^a-zA-Z]+/g, '');
					 // activeGenericDataKey = activeGenericDataKey.replace(/\s+/g, '');
	        }
	        if (syntaxa[0] == "KeyDate") {
	       	 activeGenericDataKey = activeGenericDataKey+keyvaluesep+
	            + document.getElementById(inputkeyname+'_YYYYpart').value + "-"
	            + document.getElementById(inputkeyname+'_MMpart').value + "-"
	            + document.getElementById(inputkeyname+'_DDpart').value;
	        }
	        if (syntaxa[0] == "KeyTimestamp") {
		       	activeGenericDataKey = activeGenericDataKey+keyvaluesep+TtimeStamp();
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
		$("#genericDialog").dialog("open");
	});

	 //======= setup the special listeners on the custom inputs  #CHECK only one allowed per form so far====================================
	 for (var pi in genericFieldNameArray) {
	  if (genericFieldUpdatedArray[pi].indexOf("Yes") != -1) {
	   syntaxa = genericFieldInputSyntaxArray[pi].split(",");
	   if (syntaxa[0] == "InputSelectFromTableCustom") {
		var customInput = genericFieldNameArray[pi]+"_input";
		$('#'+customInput).change(function( event ) {
	     var sfieldname = $(this).id.replace("_input","");
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
		 $('#'+xFieldId).change(function( event ) {
		  var xchangedfieldname = $(this).id.replace("_input","");
		  var xtargetfieldname = "";
		  for (var pi in genericFieldNameArray) {
	       var syntaxstr = genericFieldInputSyntaxArray[pi];
	       if (syntaxstr.indexOf(xchangedfieldname) !=-1) {xtargetfieldname = pi;}   // CHECK nasty !!
		  }
		  calculateInput(xchangedfieldname,xtargetfieldname);
		 },true);
		}
	    // set up listener for y field
		var yfieldname = syntaxa[5];
		var ynpartsa = yfieldname.split("_");
		if (ynpartsa[0] == genericPrimeTable) {
		 var yFieldId = yfieldname+"_input";
		 $('#'+yFieldId).change(function( event ) {
	      var ychangedfieldname = $(this).id.replace("_input","")
		  var ytargetfieldname = "";
		  for (var pi in genericFieldNameArray) {
	       var syntaxstr = genericFieldInputSyntaxArray[pi];
	       if (syntaxstr.indexOf(ychangedfieldname) !=-1) {ytargetfieldname = pi;}   // CHECK nasty !!
	      }
	      calculateInput(ychangedfieldname,ytargetfieldname);
		 },true);
		}
	    // set up listener for any date field  eg vat
		if (syntaxa[6] != undefined) {
		 var zfieldname = syntaxa[6];
		 var znpartsa = zfieldname.split("_");
		 if (znpartsa[0] == genericPrimeTable) {
		  var zFieldId = zfieldname+"_input_YYYYpart";
		  $('#'+zFieldId).change(function( event ) {
		   var zchangedfieldname = $(this).id.replace("_input_YYYYpart","")
		   var ztargetfieldname = "";
		   for (var pi in genericFieldNameArray) {
	        var syntaxstr = genericFieldInputSyntaxArray[pi];
	        if (syntaxstr.indexOf(zchangedfieldname) !=-1) {ztargetfieldname = pi;}   // CHECK nasty !!
	       }
	       calculateInput(zchangedfieldname,ztargetfieldname);
		  },true);
		  var zFieldId = zfieldname+"_input_MMpart";
		  $('#'+zFieldId).change(function( event ) {
		   var zchangedfieldname = $(this).id.replace("_input_MMpart","")
		   var ztargetfieldname = "";
		   for (var pi in genericFieldNameArray) {
	        var syntaxstr = genericFieldInputSyntaxArray[pi];
	        if (syntaxstr.indexOf(zchangedfieldname) !=-1) {ztargetfieldname = pi;}   // CHECK nasty !!
	       }
	       calculateInput(zchangedfieldname,ztargetfieldname);
		  },true);
		  var zFieldId = zfieldname+"_input_DDpart";
		  $('#'+zFieldId).change(function( event ) {
		   var zchangedfieldname = $(this).id.replace("_input_DDpart","")
		   var ztargetfieldname = "";
		   for (var pi in genericFieldNameArray) {
	        var syntaxstr = genericFieldInputSyntaxArray[pi];
	        if (syntaxstr.indexOf(zchangedfieldname) !=-1) {ztargetfieldname = pi;}   // CHECK nasty !!
	       }
	       calculateInput(zchangedfieldname,ztargetfieldname);
		  },true);
		 }
	    }
	   }
	   /* now done by slimimagepopup,js
	   if (syntaxa[0] == "InputImage") {}
	   */
	   /*
	   if (syntaxa[0] == "InputFile") {
	    var customInput = genericFieldNameArray[pi]+"_fileremovebutton";
	    $('#'+customInput).change(function( event ) {
		 var dfieldname = $(this).id.replace("_fileremovebutton","")
	     deleteFile(dfieldname);
	    },true);
	   }
	   */
	  }
	 }

});


function createTableArray() {
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
     if (syntaxa[0] == "KeyTimestamp") {
         listtext = GLOBALS[genericFieldNameArray[fi]];
    	 keyfield = "1";
    	 timestampKey = "1";
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
     if (syntaxa[0] == "Text") {
         listtext = GLOBALS[genericFieldNameArray[fi]];
	 }
     if (syntaxa[0] == "Date") {
   	  if (GLOBALS[genericFieldNameArray[fi]] == "0000-00-00") { listtext = ""; }
   	  else { listtext = GLOBALS[genericFieldNameArray[fi]]; }
     }
     if (syntaxa[0] == "InputText") {
      listtext = GLOBALS[genericFieldNameArray[fi]];
     }
     if (syntaxa[0] == "InputTextArea") {
      listtext = GLOBALS[genericFieldNameArray[fi]];
      if ( listtext.length > 100 ) { listtext = listtext.substring(0, 99)+" ..."; }
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
      if ( temphash[GLOBALS[genericFieldNameArray[fi]]] ) { listtext = temphash[GLOBALS[genericFieldNameArray[fi]]]; }
      else { listtext = ""; }
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
     if (syntaxa[0] == "InputPersonArea") {
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
	// alert("populateTable");
	outtablearray = Array ();
	var i=0; var imax = 10000;
	for (var gi in genericPrimeTableArray) {
		i++;
		if (i > imax) { alert("Continue"); i=0; }
		var outrowarray = Array ();
		var temparray = genericPrimeTableArray[gi];
		var ti = 0;
	    for (var fn in genericFieldNameArray) {
	    	// alert(fn+" "+genericFieldListedArray[fn]+" "+temparray[ti]);
	    	 if (genericFieldListedArray[fn].indexOf("Yes") != -1) {
		    	   if ((genericFieldNameArray[fn] == "generic_addcopybutton")||
		    		   (genericFieldNameArray[fn] == "generic_updatebutton")||
		    	       (genericFieldNameArray[fn] == "generic_deletebutton")||
		    	       (genericFieldNameArray[fn] == "generic_programbutton")||
		    	       (genericFieldNameArray[fn] == "generic_programbutton1")||
		    	       (genericFieldNameArray[fn] == "generic_programbutton2")||
		    	       (genericFieldNameArray[fn] == "generic_programbutton3")||
 		    	       (genericFieldNameArray[fn] == "generic_programbutton4")||
		    	       (genericFieldNameArray[fn] == "generic_programbutton5")) {
		    			outrowarray.push('<button type="button" class="genericbutton" id="'+genericFieldNameArray[fn]+'_'+genericDataKeyArray[gi]+'">'+genericFieldListTitleArray[fn]+'</button>');
		    		   // outrowarray.push("Button");
							 //returnDelete
		    	   } else if (genericFieldNameArray[fn] == "generic_checkbox") {
		    	   		outrowarray.push('<input type="checkbox" id="'+genericFieldNameArray[fn]+'_'+genericDataKeyArray[gi]+'">'+genericFieldListTitleArray[fn]+'</input>');
		    	   }else {
		    		   outrowarray.push(temparray[ti]);
		    	   }
		    	   ti++;
	    	  }
	    }
	    outtablearray.push(outrowarray);
    	// genericprimedatatable.row.add( outrowarray ).draw( false );
    	// $('#TRACETEXT').html(outrowarray[0]+" "+outrowarray[1]+" "+outrowarray[2]);
	}
	// print_r(outtablearray);

	$('#genericPrimeDataTable').DataTable( {
    	scrollY:        '50vh',
        scrollCollapse: true,
        paging:         false,
        data: outtablearray,
        columnDefs: [
         {
            targets: '_all',
            defaultContent: '-'
         }
        ]
    });

	$('.genericbutton').on('click', function() {
		activeGenericPrimeTableRow = $(this).closest('tr');
		buttonClicked($(this).attr("id"));
	});

}

function buttonClicked(buttonid){
	idbits = buttonid.split("_");
	var thisbuttonname = idbits[0]+"_"+idbits[1];
	activeGenericDataKey = buttonid.replace(idbits[0]+"_"+idbits[1]+"_", ""); // allows for field names with underscore
	// alert(thisbuttonname+" "+activeGenericDataKey);
	var thisdatatable = $('#genericPrimeDataTable').DataTable();
	// activeGenericPrimeTableRow = thisdatatable.row( $("#"+buttonid).parents('tr') );
	// activeGenericPrimeTableRow = $("#"+buttonid).parents('tr');
	// activeGenericPrimeTableRow = $("#"+buttonid).closest('tr');

	if (thisbuttonname == "generic_addcopybutton") {
		  Get_Data_Hash(genericPrimeTable,activeGenericDataKey);
		  separateMergedKey();
		  activeMode = "add";
		  if ( timestampKey == "1" ) { activeGenericDataKey = TtimeStamp() }
		  else { activeGenericDataKey = incrementKey(genericHighestDataKey); }
		  GLOBALS[genericPrimeKeyFieldName] = activeGenericDataKey;
		  prepareInput("add");
		  $("#genericDialog").dialog("open");
	}
	if (thisbuttonname == "generic_deletebutton") {
		result = confirm('Do you wish to delete '+activeGenericDataKey+'?');
		// console.log(result);
		// if (result) {
		// 	console.log("deleted");
		// 	// Delete_Data();
		// }else{
		// 	console.log("not deleted");
		// }
		$.confirm({
			icon: 'fa fa-question-circle text-danger',
		    title: 'Delete',
		    content: 'Do you wish to delete '+activeGenericDataKey+'?',
		    buttons: {
		        somethingElse: {
		            text: 'Delete',
		            btnClass: 'btn-red',
		            action: function(){
		     		   activeMode = "delete";
		    		   $("#genericDialog").dialog("close");
		    		   deleteFinalise();
		            }
		        },
		        cancel: function () {

		        },
		    }
		});
	}
	if (thisbuttonname == "generic_updatebutton") {
		  // alert(activeGenericDataKey);
		  Get_Data_Hash(genericPrimeTable,activeGenericDataKey);
		  separateMergedKey();
		  activeMode = "update";
		  prepareInput("update");
		  $("#genericDialog").dialog("open");
	}
	if ((thisbuttonname == "generic_programbutton")||
        (thisbuttonname == "generic_programbutton1")||
        (thisbuttonname == "generic_programbutton2")||
        (thisbuttonname == "generic_programbutton3")||
        (thisbuttonname == "generic_programbutton4")||
        (thisbuttonname == "generic_programbutton5")) {
	  Get_Data_Hash(genericPrimeTable,activeGenericDataKey);
	  separateMergedKey();
	  syntaxa = genericFieldInputSyntaxArray[thisbuttonname].split(",");
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


}

function prepareInput(mode) {
 for (var pi in genericFieldNameArray) {
  if (genericFieldUpdatedArray[pi].indexOf("Yes") != -1) {
   syntaxa = genericFieldInputSyntaxArray[pi].split(",");
   if (syntaxa[0] == "KeyText") {
	   document.getElementById(genericFieldNameArray[pi]+"_input").innerHTML = GLOBALS[genericFieldNameArray[pi]];
   }
   if (syntaxa[0] == "KeyDate") {
	   document.getElementById(genericFieldNameArray[pi]+"_input").innerHTML = GLOBALS[genericFieldNameArray[pi]];
   }
   if (syntaxa[0] == "KeyTimestamp") {
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
   if (syntaxa[0] == "Text") {
	   document.getElementById(genericFieldNameArray[pi]+"_input").innerHTML = GLOBALS[genericFieldNameArray[pi]];
   }
   if (syntaxa[0] == "Date") {
	   document.getElementById(genericFieldNameArray[pi]+"_input").value = GLOBALS[genericFieldNameArray[pi]];
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
	var personlist = GLOBALS[genericFieldNameArray[pi]];
	personlist = personlist.replace(/ /g, "");
	personlist = personlist.replace(",,", ",");
	document.getElementById(genericFieldNameArray[pi]+"_input").value = personlist;
	PSP_personListCompleter();
   }
   if (syntaxa[0] == "InputPersonArea") {
		var personlist = GLOBALS[genericFieldNameArray[pi]];
		personlist = personlist.replace(/ /g, "");
		personlist = personlist.replace(",,", ",");
		document.getElementById(genericFieldNameArray[pi]+"_input").value = personlist;
		PSP_personListCompleter();
   }
   if (syntaxa[0] == "InputDate") {
	if (GLOBALS[genericFieldNameArray[pi]] == "") {
	 /*
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
    */

     if ((syntaxa.length == 2)&&(syntaxa[1] == "Today")) {
    	document.getElementById(genericFieldNameArray[pi]+"_input_DateInput").value = thisDD+"/"+thisMM+"/"+thisYYYY;
     } else {
    	document.getElementById(genericFieldNameArray[pi]+"_input_DateInput").value = "";
     }
    } else {
	   var datetxt = GLOBALS[genericFieldNameArray[pi]].substring(8,10)+"/"+GLOBALS[genericFieldNameArray[pi]].substring(5,7)+"/"+GLOBALS[genericFieldNameArray[pi]].substring(0,4);
	   document.getElementById(genericFieldNameArray[pi]+"_input_DateInput").value = datetxt;
    }
   }
   if (syntaxa[0] == "InputFile") {
    // fieldname,filename,srcpath,filepath,imageprefix1,imageprefix2
	// alert("XXXX "+GLOBALS[genericFieldNameArray[pi]]);
    displayFile1(genericFieldNameArray[pi],GLOBALS[genericFieldNameArray[pi]],syntaxa[1],syntaxa[2],syntaxa[3],GLOBALS[syntaxa[4]]);
   }
   if (syntaxa[0] == "InputImage") {
    // fieldname,imagename,srcpath,filepath,reqdimagewidth,reqdimageheight,imageprefix1,imageprefix2,lookupsizekey
    displayImage1(genericFieldNameArray[pi],GLOBALS[genericFieldNameArray[pi]],syntaxa[1],syntaxa[2],syntaxa[3],syntaxa[4],syntaxa[5],syntaxa[6]);
   }
  }
 }
}

function updateFinalise() {
 Get_Data_Hash(genericPrimeTable,activeGenericDataKey);
 separateMergedKey();
 for (var fi in genericFieldNameArray) {
	 if (genericFieldUpdatedArray[fi].indexOf("Yes") != -1) {
		   syntaxa = genericFieldInputSyntaxArray[fi].split(",");
		   ts = "";
		   if (syntaxa[0] == "KeyText") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
		   if (syntaxa[0] == "KeyDate") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
		   if (syntaxa[0] == "KeyTimestamp") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
		   if (syntaxa[0] == "KeySelectFromList") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
		   if (syntaxa[0] == "KeySelectFromTable") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
		   if (syntaxa[0] == "KeyGenerated") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
		   if (syntaxa[0] == "KeyPerson") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
		   if (syntaxa[0] == "Text") { }
		   if (syntaxa[0] == "Date") { }
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
		   if (syntaxa[0] == "InputPerson") {
			   ts = document.getElementById(genericFieldNameArray[fi]+"_input").value;
			   ts = ts.replace(/ /g, "");
			   ts = ts.replace(",,", ",");
		   }
		   if (syntaxa[0] == "InputPersonArea") {
			   ts = document.getElementById(genericFieldNameArray[fi]+"_input").value;
			   ts = ts.replace(/ /g, "");
			   ts = ts.replace(",,", ",");
		   }
		   if (syntaxa[0] == "InputDate") {
			   ts = document.getElementById(genericFieldNameArray[fi]+"_input_YYYYpart").value+"-"+
			   document.getElementById(genericFieldNameArray[fi]+"_input_MMpart").value+"-"+
			   document.getElementById(genericFieldNameArray[fi]+"_input_DDpart").value;
		   }
		   if (syntaxa[0] == "InputFile") {
		    xfile = document.getElementById(genericFieldNameArray[fi]+"_filename").value;
		    if (xfile.indexOf('tempf_') != -1) { tempfile = xfile; newfile = xfile.replace('tempf_',""); }
		    else { tempfile = ""; newfile = xfile; }
		    if ((GLOBALS[genericFieldNameArray[fi]] != "")&&(newfile != GLOBALS[genericFieldNameArray[fi]])) { oldfile = GLOBALS[genericFieldNameArray[fi]]; }
		    else { oldfile = ""; }
		    genericFileUtility("RenameDelete",syntaxa[2],syntaxa[2],tempfile,newfile,oldfile,"");
		    ts = newfile;
		   }
		   if (syntaxa[0] == "InputImage") {
			ximage = document.getElementById(genericFieldNameArray[fi]+"_imagename").value;
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

 var temparray = Array ();
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
		if (syntaxa[0] == "KeyTimestamp") {
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
		if (syntaxa[0] == "Text") { }
		if (syntaxa[0] == "Date") { }
		if (syntaxa[0] == "InputText") {
		   listtext = GLOBALS[genericFieldNameArray[fi]];
		}
		if (syntaxa[0] == "InputTextArea") {
		   listtext = GLOBALS[genericFieldNameArray[fi]];
		   if ( listtext.length > 100 ) { listtext = listtext.substring(0, 99)+" ..."; }
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
		if (syntaxa[0] == "InputPersonArea") {
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
			var thisid = genericFieldNameArray[fi]+'_'+activeGenericDataKey;
			listtext = '<button type="button" class="genericbutton" id="'+thisid+'">'+genericFieldListTitleArray[fi]+'</button>';
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
		   temparray.push(listtext);
		}

	}

 }
 genericPrimeTableArray[activeGenericDataKey]= temparray;
 genericprimedatatable = $('#genericPrimeDataTable').DataTable();
 genericprimedatatable.row(activeGenericPrimeTableRow.index()).data(temparray).invalidate();
 activeGenericPrimeTableRow.addClass('selected');
 activeMode = "";
 $('.genericbutton').off("click");
 $('.genericbutton').on('click', function() {
	activeGenericPrimeTableRow = $(this).closest('tr');
	buttonClicked($(this).attr("id"));
 });
 activeMode = "";
}

function addFinalise() {
 // alert("addFinalise - " + activeGenericDataKey);
 for (var fi in genericFieldNameArray) {
  if (genericFieldUpdatedArray[fi].indexOf("Yes") != -1) {
   syntaxa = genericFieldInputSyntaxArray[fi].split(",");
   ts = "";
   if (syntaxa[0] == "KeyText") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
   if (syntaxa[0] == "KeyDate") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
   if (syntaxa[0] == "KeyTimestamp") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
   if (syntaxa[0] == "KeySelectFromList") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
   if (syntaxa[0] == "KeySelectFromTable") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
   if (syntaxa[0] == "KeyGenerated") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
   if (syntaxa[0] == "KeyPerson") { ts = document.getElementById(genericFieldNameArray[fi]+"_input").value; }
   if (syntaxa[0] == "Text") { }
   if (syntaxa[0] == "Date") { }
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
   if (syntaxa[0] == "InputPerson") {
	   ts = document.getElementById(genericFieldNameArray[fi]+"_input").value;
	   ts = ts.replace(/ /g, "");
	   ts = ts.replace(",,", ",");
   }
   if (syntaxa[0] == "InputPersonArea") {
	   ts = document.getElementById(genericFieldNameArray[fi]+"_input").value;
	   ts = ts.replace(/ /g, "");
	   ts = ts.replace(",,", ",");
   }
   if (syntaxa[0] == "InputDate") {
	   ts = document.getElementById(genericFieldNameArray[fi]+"_input_YYYYpart").value+"-"+
	   document.getElementById(genericFieldNameArray[fi]+"_input_MMpart").value+"-"+
	   document.getElementById(genericFieldNameArray[fi]+"_input_DDpart").value;
   }
   if (syntaxa[0] == "InputFile") {
    xfile = document.getElementById(genericFieldNameArray[fi]+"_filename").value;
    if (xfile.indexOf('tempf_') != -1) { tempfile = xfile; newfile = xfile.replace('tempf_',""); }
    else { tempfile = ""; newfile = xfile; }
    if ((GLOBALS[genericFieldNameArray[fi]] != "")&&(newfile != GLOBALS[genericFieldNameArray[fi]])) { oldfile = GLOBALS[genericFieldNameArray[fi]]; }
    else{ oldfile = ""; }
    genericFileUtility("RenameDelete",syntaxa[2],syntaxa[2],tempfile,newfile,oldfile,"");
    ts = newfile;
   }
   if (syntaxa[0] == "InputImage") {
    ximage = document.getElementById(genericFieldNameArray[fi]+"_imagename").value;
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

 var temparray = Array ();
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
   if (syntaxa[0] == "KeyTimestamp") {
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
   if (syntaxa[0] == "Text") { }
   if (syntaxa[0] == "Date") { }
   if (syntaxa[0] == "InputText") {
   	listtext = GLOBALS[genericFieldNameArray[fi]];
   }
   if (syntaxa[0] == "InputTextArea") {
    listtext = GLOBALS[genericFieldNameArray[fi]];
    if ( listtext.length > 100 ) { listtext = listtext.substring(0, 99)+" ..."; }
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
   if (syntaxa[0] == "InputPersonArea") {
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
	var thisid = genericFieldNameArray[fi]+'_'+activeGenericDataKey;
	listtext = '<button type="button" class="genericbutton" id="'+thisid+'">'+genericFieldListTitleArray[fi]+'</button>';
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
	   temparray.push(listtext);
   }
  }
 }
 genericPrimeTableArray.push(temparray);
 genericprimedatatable = $('#genericPrimeDataTable').DataTable();
 genericprimedatatable.row.add( temparray ).draw( false );
 activeMode = "";
 $('.genericbutton').off("click");
 $('.genericbutton').on('click', function() {
	activeGenericPrimeTableRow = $(this).closest('tr');
	buttonClicked($(this).attr("id"));
 });

 if (genericKeyRoot == "") {
  if ($('#addkeyinput1').length > 0) { document.getElementById('addkeyinput1').value = "";	}
  if ($('#addkeyinput1_personlist').length > 0) { document.getElementById('addkeyinput1_personlist').innerHTML = "";	}
  if ($('#addkeyinput2').length > 0) { document.getElementById('addkeyinput2').value = "";	}
  if ($('#addkeyinput2_personlist').length > 0) { document.getElementById('addkeyinput2_personlist').innerHTML = "";	}
 }

}

function deleteFinalise() {
 Delete_Data_Hash(genericPrimeTable,activeGenericDataKey);
 genericprimedatatable = $('#genericPrimeDataTable').DataTable();
 genericprimedatatable.row(activeGenericPrimeTableRow).remove().draw();
 genericprimedatatable.columns.adjust().draw();
 activeMode = "";
}

function cancelTidyUp() {
 // alert("cancelTidyUp -" + activeGenericDataKey);
 for (var fi in genericFieldNameArray) {
  if (genericFieldUpdatedArray[fi].indexOf("Yes") != -1) {
   syntaxa = genericFieldInputSyntaxArray[fi].split(",");
   if (syntaxa[0] == "InputImage") {
    tempimagename = document.getElementById(genericFieldNameArray[fi]+"_imagename").value;
    if (tempimagename.indexOf('tempf_') != -1) {
     genericFileUtility("Delete",syntaxa[2],syntaxa[2],tempimagename,"","");
    }
   }
   if (syntaxa[0] == "InputFile") {
    tempimagename = document.getElementById(genericFieldNameArray[fi]+"_filename").value;
    if (tempimagename.indexOf('tempf_') != -1) {
     genericFileUtility("Delete",syntaxa[2],syntaxa[2],tempimagename,"","");
    }
   }
  }
 }
 $("#genericDialog").dialog("close");
}

// function uploadImage() {
//  alert("uploadImage called");
// }

function incrementKey(currentkey) {
// increment the highest key - format CB[00000] or CB[YYMMDDHHMMSS]
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
  var newkeynumeric = currentkeynumeric + 1;
  var newkeynumericstr = "00000"+newkeynumeric;
  var newkeynumericstrlen = newkeynumericstr.length;
  var newkeystr = keybase+newkeynumericstr.substring(newkeynumericstrlen-5,newkeynumericstrlen);
  genericHighestDataKey = newkeystr;
  return newkeystr;
 }
}

function calculateInput(inputFieldName,targetFieldName) {
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
 if (syntaxelement.indexOf('+') != -1) {  // multiple field eg debit & credit for vat
  var xfpartsa = syntaxelement.split("+");
  return parseFloat(document.getElementById(xfpartsa[0]+"_input").value) + parseFloat(document.getElementById(xfpartsa[1]+"_input").value);
 } else {
  return parseFloat(document.getElementById(syntaxelement+"_input").value);
 }
}

function getCalcInputFromOther(syntaxelement) {
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
 Get_Data_Hash_DateEffective('vatrate',vatrateidstr,vatratedate);
 // alert("getVATRate called "+vatrateidstr+"  "+vatratedate+"  "+GLOBALS['vatrate_rate']);
 return parseFloat(GLOBALS['vatrate_rate']);
}

function calcVAT(grossnum,vatratenum) {
 vatnum = grossnum - (grossnum /(1+(vatratenum/100)));
 var vatnumrounded = vatnum.toFixed(2);
 return vatnumrounded.toString();
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
   if (syntaxa[0] == "KeyTimestamp") { }
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
//�GLOBALS[genericPrimeKeyFieldName] =  tgenericDataKey;
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

function formatId(){



	document.getElementById("addkeyinput1").strtolower;
	console.log("fff");
}

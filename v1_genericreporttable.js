YAHOO.namespace ("BBgenericreporttable");

// parm0 "|" ------------------------------------------------------------------------------
//    0        1          2           3                  
// divid   tableid   sortcolname   pagination
//                                 number/No    
//
// parm1 "|" ---------------------------------------------
//     0             1               2            3                             
// colname       colheader        colwidth        colsyntax 

genericReportTableId = "";
genericReportListColName = "";
genericReportPagination = "";
genericReportColNameArray = Array ( );    
genericReportColHeaderArray = Array ( );         
genericReportColWidthArray = Array ( );  
genericReportColSyntaxArray = Array ( );  

syntaxa = Array ( );

function initGenericReportTable() {
// initialise logger
// myLogConfigs = {width: "500px", right: "10em", top: "10%", fontSize: "80%" };
// myLogContainer = null;
// myLogReader = new YAHOO.widget.LogReader(myLogContainer, myLogConfigs);
// YAHOO.log("init called","info");
	
 parm0 = document.getElementById("GRT_parm0").value;
 parm1 = document.getElementById("GRT_parm1").value;
 
 parm0a = parm0.split("|");
 genericDivId = parm0a[0]; 
 genericReportTableId = parm0a[1];
 genericSortColName = parm0a[2];
 genericReportPagination = parm0a[3];
 
 parm1a = parm1.split("^");
 for (i in parm1a) {	
  parm1astring = parm1a[i];
  parm1astringa = parm1astring.split("|");
  genericReportColNameArray.push(parm1astringa[0]);  
  genericReportColHeaderArray.push(parm1astringa[1]);
  genericReportColWidthArray.push(parm1astringa[2]);
  genericReportColSyntaxArray.push(parm1astringa[3]);
 } 
 
 // myColumnDefs ========================================================================== 
 var myColumnDefsstring = "";
 myColumnDefsstring = myColumnDefsstring + "var myColumnDefs = ["; 
 bigsep = "";
 for (var fn in genericReportColNameArray) {
  myColumnDefsstring = myColumnDefsstring + bigsep + '{'
  + 'key:"'+ genericReportColNameArray[fn] + '", '
  + 'label:"' + genericReportColHeaderArray[fn] + '", '   
  + 'width:' + genericReportColWidthArray[fn] + ', '   
  + 'resizeable:true,sortable:true'   
  + '}';
  bigsep = ',';
 }
 myColumnDefsstring = myColumnDefsstring + ']';
 // YAHOO.log(myColumnDefsstring,"info");
 // end myColumnDefs ==========================================================================  
 // alert(myColumnDefsstring);
 eval(myColumnDefsstring);
 
 var genericSourceObject = new YAHOO.util.DataSource(YAHOO.util.Dom.get(genericReportTableId)); 
 genericSourceObject.responseType = YAHOO.util.DataSource.TYPE_HTMLTABLE;  
 
 // genericSourceObject.responseSchema ========================================================== 
 var responseSchemastring = "";
 responseSchemastring = responseSchemastring + "genericSourceObject.responseSchema = { fields: ["; 
 bigsep = "";
 for (var fn in genericReportColNameArray) {
   responseSchemastring = responseSchemastring + bigsep + '"' + genericReportColNameArray[fn] + '"';
   bigsep = ",";   
 }
 responseSchemastring = responseSchemastring + "]}";
 // YAHOO.log(responseSchemastring,"info");
 // end responseSchema ======================================================================  
 // alert(responseSchemastring); 
 eval(responseSchemastring);

 // myConfigs ====================================================================== 
 
 var myConfigsstring = "";
 myConfigsstring = myConfigsstring + 'var myConfigs = {'; 
 myConfigsstring = myConfigsstring + ' sortedBy:{key:"'+genericSortColName+'",dir:"asc"},';
 if ((genericReportPagination == "No")||(genericReportPagination == "")) {}
 else {
  myConfigsstring = myConfigsstring + ' paginator: new YAHOO.widget.Paginator({';
  myConfigsstring = myConfigsstring + '   rowsPerPage: ' + genericReportPagination + ',';
  myConfigsstring = myConfigsstring + '   template: YAHOO.widget.Paginator.TEMPLATE_ROWS_PER_PAGE,';
  myConfigsstring = myConfigsstring + '   rowsPerPageOptions: [10,25,50,100],';
  myConfigsstring = myConfigsstring + '   pageLinks: 5';
  myConfigsstring = myConfigsstring + ' }),';
 }
 myConfigsstring = myConfigsstring + ' draggableColumns:true';
 myConfigsstring = myConfigsstring + '}';
 // YAHOO.log(myConfigsstring,"info");
 // end myConfigs ====================================================================== 
 
 eval(myConfigsstring);
 // alert(myConfigsstring); 
 genericReportTableObject = new YAHOO.widget.DataTable(genericDivId, myColumnDefs, genericSourceObject, myConfigs);

};

YAHOO.util.Event.addListener(window, "load", initGenericReportTable);


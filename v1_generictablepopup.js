// alert("generictablepopup called");

// this is an extension to generichandler that pops up a reference tble

//global variables
	
GLOBALS = new Array();

//$parm0 = pagetitle
//$parm1 = table
//$parm2 = sortfieldname
//$parm3 = triggerfield id
//$parm4 = field1,title1,width1|field2,title2,width2|field3,title3,width3
//$parm5 = pagination
//$parm6 = New Window positioning name|topx|topy|width|height

genericTablePageTitle = "";               // Header at top of Page
genericTable = "";                        // Table that is being displayed
genericTableSortFieldName = "";           // Table that is being displayed
genericTableCreated = "0";                // Table created status
genericTableTriggerField = "";            // Field that is listened to
genericTableFieldNameArray = Array ( );   // Fieldname Array
genericTableHeaderTitleArray = Array ( );      // Column Header Title Array
genericTableHeaderWidthArray = Array ( ); // Column Header Width Array
genericTablePagination = "";              // Pagination
genericTablePopupName = "";               // Popup Name
genericTablePopupTopX = "";               // Popup TopX
genericTablePopupTopY = "";               // Popup TopY
genericTablePopupWidth = "";              // Popup Width
genericTablePopupHeight = "";             // Popup Height

genericTableKeyArray = Array ( );         // Table Key Array
genericTableArray = Array ( );            // Table Data

GTXY = Array();
	
$(document).ready( function() {

	$("#genericTableDialog").dialog({
		autoOpen: false,
		width: "70%",
		height: "500",		
	    buttons: {
	        "Cancel": function() { hideTable( ); }
	    }
	});	 
	
	$('#genericTable').DataTable( { 
    	scrollY:        '340',
        scrollCollapse: true,
		searching: 		false,
		bInfo: 			false,
        paging:         false
	});	

	 gtpparm0 = document.getElementById("GTP_parm0").value;
	 gtpparm1 = document.getElementById("GTP_parm1").value;
	 gtpparm2 = document.getElementById("GTP_parm2").value;
	 gtpparm3 = document.getElementById("GTP_parm3").value;	 
	 gtpparm4 = document.getElementById("GTP_parm4").value;
	 gtpparm5 = document.getElementById("GTP_parm5").value;	
	 gtpparm6 = document.getElementById("GTP_parm6").value;	 
	 
	 genericTablePageTitle = gtpparm0;
	 genericTable = gtpparm1;
	 genericTableSortFieldName = gtpparm2;	 
	 genericTableTriggerField = gtpparm3;
	 tfa = gtpparm4.split("|");
	 for (i in tfa) {
	  xa =  tfa[i].split(",");   
	  genericTableFieldNameArray[i] = xa[0];
	  genericTableHeaderTitleArray[i] = xa[1];
	  genericTableHeaderWidthArray[i] = xa[2];	  
	 }	 
	 genericTablePagination = gtpparm5;

	 wdimsa = gtpparm6.split(",");
	 genericTablePopupName = wdimsa[0];
	 genericTablePopupTopX = wdimsa[1];
	 genericTablePopupTopY = wdimsa[2];
	 genericTablePopupWidth = wdimsa[3]+"px";
	 genericTablePopupHeight = wdimsa[4]+"px";
     var position = $("#abovecontent").position();
	 GTXY[0] = (genericTablePopupTopX*1) + position.left;      
	 GTXY[1] = (genericTablePopupTopY*1) + position.top; 
	 
	 // alert(GTXY[0]+" "+GTXY[1]);
     
     // add listener for trigger link

	 var triggerLink = genericTableTriggerField;
	 $('#'+triggerLink).on('click', function(event) {
		 showTable();
		if (genericTableCreated == "0") { createTable(); }
		
	 });		
	 
	function createTable( ) {		
		
		generictable = $('#genericTable').DataTable();
		generictable.clear().draw();
		
		genericTableKeyArray = Get_Array_Hash(genericTable);
		if (genericTableKeyArray.length >0) {
			for (var generictableindex in genericTableKeyArray) {	  
				tgenericTableKey = genericTableKeyArray[generictableindex];
				Get_Data_Hash(genericTable,tgenericTableKey);
				var outrowarray = Array ();
			    for (var fn in genericTableFieldNameArray) {
			    	outrowarray.push(GLOBALS[genericTableFieldNameArray[fn]]); 
			    }   
			    generictable.row.add( outrowarray ).draw( false );
			}
		}
		$('#genericTable').DataTable().search( '' ).draw();
		/*
	    setTimeout( function(){  /// This is a workaround to force the datatable to realign headngs and data
	    	$('#genericTable').DataTable().search( '' ).draw();
	    }, 10 );
	    */
	}
	
	function showTable( ) {
		$("#genericTableDialog").dialog("open");
	}
	
	function hideTable( ) {
		$("#genericTableDialog").dialog("close");
	}
	
});
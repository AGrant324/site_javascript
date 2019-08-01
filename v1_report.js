    $(document).ready( function() {
    	
    	
    	/// Currently this routine handles a simgle report per page (ie a single reportdiv )
    	
    	var dtid = "";
    	var reportwidth = "95%";
    	var reportheight = "70vh";
    	var reportalign = "left";
    	if( $('#reportwidth').length )  { reportwidth = $('#reportwidth').val(); }
    	if( $('#reportheight').length )  { reportheight = $('#reportheight').val(); }    	
    	if( $('#reportalign').length )  { reportalign = $('#reportalign').val(); }  // not active yet  	
    	// $("#reportdiv").css("width", reportwidth);
    	// $("#reportdiv").css("float", reportalign);
    	
    	reportfilterpresent = "0";
    	reportfilteronoffa = new Array(); // array of columns which have filters. value = On or Off
    	reportfiltervaluesa = new Array(); // reportfiltervaluesa[col] - is array of unique field values in that column
    	reportfiltercheckeda = new Array(); // reportfiltercheckeda[col] - whether filter is selected or not    	

    	$('*[id*=reportdiv]').each(function() {
    	    $(this).css("width", reportwidth);
    	    // $(this).css("height", reportheight);
    		$(this).css("float", reportalign);
    	    var thisid = $(this).attr('id');
    	    var idbits = thisid.split("_");
    		if( $("#reportshowhide_"+idbits[1]).length )  { 
    	    	$("#reportshowhide_"+idbits[1]).on('click', function(event) {
    	    	    var thisid = $(this).attr('id');
    	    	    var idbits = thisid.split("_");
    	    		if ( $(this).html() == "Show More Detail") {
    	    			$(this).html("Show Less Detail"); 
    	    			$("#reportdiv_"+idbits[1]).show();
    	    		} else {
    	    			$(this).html("Show More Detail"); 
    	    			$("#reportdiv_"+idbits[1]).hide();
    	    		}	
    	    	});	
    		}
    	});     	

    	$('*[id*=reporttable_]').each(function() {
    	    var thisid = $(this).attr('id');
    	    dtid = thisid;
    	    var idbits = thisid.split("_");
    	    var sortcolid = "#"+idbits[1]+"_sortcol";
    	    var sortseqid = "#"+idbits[1]+"_sortseq"; 
    	    var thissortcol = "0";
    	    if( $("#"+idbits[1]+"_sortcol").length )  { thissortcol = $("#"+idbits[1]+"_sortcol").val(); }
    	    var thissortseq = 'asc';
    	    if( $("#"+idbits[1]+"_sortseq").length )  { thissortseq = $("#"+idbits[1]+"_sortseq").val(); }
    	    var colbits = thissortcol.split(",");
    	    var seqbits = thissortseq.split(","); 
    	    // [[col,seq],[col,seq]]
    	    // alert(colbits[0]+" "+seqbits[0]);
    	    if (colbits.length == 1 ) {
    	    	$(this).DataTable( {
	    		order: [[colbits[0],seqbits[0]]],
	    	    	scrollY:        reportheight,
	    	    	scrollCollapse: true,
	    	    	scrollX: 	true,
	    	        paging:         false,
	    	        columnDefs: [{
	    	            targets: 0,
	    	            searchable: true
	    	      }]
    	    	});    	    	
    	    }
    	    if (colbits.length == 2 ) {
    	    	$(this).DataTable( {
	    			order: [[colbits[0],seqbits[0]],[colbits[1],seqbits[1]]],
	    	    	scrollY:        '70vh',
	    	    	scrollCollapse: true,
	    	    	scrollX: 		true,
	    	        paging:         false
    	    	});    	    	
    	    }
    	    if (colbits.length == 3 ) {
    	    	$(this).DataTable( {
	    			order: [[colbits[0],seqbits[0]],[colbits[1],seqbits[1]],[colbits[2],seqbits[2]]],
	    	    	scrollY:        '70vh',
	    	    	scrollCollapse: true,
	    	    	scrollX: 		true,
	    	        paging:         false
    	    	});    	    	
    	    }
    	    
        	$('.reportfilter').each(function() { 
        		reportfilterpresent = "1";
        		$(this).css('color', "silver");
        	    var thisid = $(this).attr('id');
        	    var ida = thisid.split("_");
        	    var colindex = ida[1];
        	    reportfilteronoffa[colindex] = "Off"; // report always starts with filteroff
    	    	oTable = $("#reporttable_report").dataTable();
    	        var cellValueArray=[];   	        
    	        $.each( oTable.fnGetData(), function(i, row){
    	            cellValueArray.push( row[colindex]);
	    	    })
	    	    var cellValueArrayU = [...new Set(cellValueArray)];        	    
        	    reportfiltervaluesa[colindex] = cellValueArrayU;
        	    reportfiltercheckeda[colindex] = new Array();
    			for (var vi in reportfiltervaluesa[colindex]) {
    				reportfiltercheckeda[colindex][vi] = ""; // report always starts with no filters selected
    			}          	    
        	});
    	    
        	if ( reportfilterpresent == "1" ) {
        		RefreshFilters(thisid);
        	}
    	       
		    setTimeout( function(){  /// This is a workaround to force the datatable to realign headngs and data
		    	// alert(dtid);  CHECK for multiple reports on a page
		    	$("#"+dtid).DataTable().search( '' ).draw();	    	
		    }, 10 ); 
		       		
    	});
    	
    	$('.dataTables_scrollBody').css('min-height', '100px'); // Workaround to avoid horix scoller obscuring small lists
        
    	$('.updatelink').on('click', function(event) {		   		
    		var thistext =  $(this).text();
    		$(this).text(thistext.toUpperCase());
    	});	
    	
    	$('.deletelink').on('click', function(event) {		   		
    		var thistext =  $(this).text();
    		$(this).text(thistext.toUpperCase());
    	});
    	
    	//  allows time for report div to be created before hiding 
    	$('*[id*=reportdiv]').each(function() { 
    	    var thisid = $(this).attr('id');
    	    var idbits = thisid.split("_");    		
    		if( $("#reportshowhide_"+idbits[1]).length )  { 
	    	    $("#reportdiv_"+idbits[1]).hide();
	    	}	
    	});   	
    	
    	$("#filterpopup").dialog({
    		// closeOnEscape: false,
    		open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
    		autoOpen: false,
    		width: "40%",
    		overflow:"auto"
    	});
    	
    	$('#ClearFilter').on('click', function(event) {
    		// alert($('#filterid').val()); 
    	    var ida = $('#filterid').val().split("_");
    	    var colindex = ida[1];
    	    $("#filter_"+colindex).css('color', "silver");
			for (var vi in reportfiltervaluesa[colindex]) {
				value = reportfiltervaluesa[colindex][vi];
				var encodedvalue = EnCodeSpecials(value);
				$("#filtervalue_"+encodedvalue).removeAttr("checked");
			}    				
    	})	   	
    	
    	$('#ApplyFilter').on('click', function(event) {
    		// alert($('#filterid').val());
    	    var ida = $('#filterid').val().split("_");
    	    var colindex = ida[1];
    	    var checkedstring = "";
    	    var anythingchecked = "0";
			for (var vi in reportfiltervaluesa[colindex]) {	
				var value = reportfiltervaluesa[colindex][vi];
				var encodedvalue = EnCodeSpecials(reportfiltervaluesa[colindex][vi]);
				var checked = "";
				if ($("#filtervalue_"+encodedvalue).prop('checked')) { checked = "checked"; anythingchecked = "1";}
				// alert("#filtervalue_"+encodedvalue+" "+$("#filtervalue_"+encodedvalue).prop('checked')+" "+checked);
				reportfiltercheckeda[colindex][vi] = checked;
				checkedstring = checkedstring+"|"+value+"="+reportfiltercheckeda[colindex][vi];
			} 
			// alert(checkedstring);
			if ( anythingchecked == "1" ) { $("#filter_"+colindex).css('color', "green"); }
			else { $("#filter_"+colindex).css('color', "silver"); }
			
    		$("#filterpopup").dialog("close");
    		
    		// ^(?=.*?(10|99)).*?
    		// ^(?=.*?(^ExactValueString$|^ExactValueString$)).*?
    		var regexsearch = '^(?=.*?(';
    		var orsep = "";
			for (var vi in reportfiltervaluesa[colindex]) {	
				if (reportfiltercheckeda[colindex][vi] == "checked") {
					regexsearch = regexsearch + orsep + "^"+reportfiltervaluesa[colindex][vi]+"$";
					orsep = "|";
				}
			} 		
			regexsearch = regexsearch + ')).*?';
    		// alert("#"+dtid+"...."+colindex+"...."+regexsearch);
    		$("#"+dtid).DataTable().column(colindex).search(regexsearch, true, false).draw();
    	})	    	
    	
    	
    	$('#CancelFilter').on('click', function(event) {
    		$("#filterpopup").dialog("close");   	
    	})	
    	
    	function RefreshFilters(datatableid) {
    		// alert(datatableid);
	    	$('.reportfilter').each(function() {
	    	    $(this).on('click', function(event) {
	    	    	// alert($(this).attr('id'));
	    	    	$(this).css('color', "green");
		    	    var thisid = $(this).attr('id');
		    	    var ida = thisid.split("_");
		    	    var colindex = ida[1];
		    	    reportfiltervaluesa[colindex].sort();
		    	    var datastring = "";
	    			for (var vi in reportfiltervaluesa[colindex]) {
	    				var value = reportfiltervaluesa[colindex][vi];
	    				var encodedvalue = EnCodeSpecials(value);
	    				var checked = reportfiltercheckeda[colindex][vi];
	    				datastring = datastring+'<div>';
	    				datastring = datastring+'<div class="checkbox">';
	    				datastring = datastring+'<label>';
	    				// datastring = datastring+'<input type="checkbox" id="filtervalue_'+value+'" name="filtervalue" value="'+value+'" checked="'+checked+'" />';
	    				datastring = datastring+'<input type="checkbox" id="filtervalue_'+encodedvalue+'" name="filtervalue" value="'+encodedvalue+'" '+checked+' />';
	    				datastring = datastring+value;
	    				datastring = datastring+'</label>';
	    				datastring = datastring+'</div>';
	  
	    				/*
	    				datastring = datastring+'<label><input type="checkbox" id="filtervalue_'+value+'" name="filtervalue" value=">'+value+'"'+checked+' </label>';
						*/
	    				datastring = datastring+'</div>';
	    			}
	    			// alert(datastring);
	    			$("#filterid").val(thisid);
	    			$("#filterstring").html(datastring);
	    			
	    	    	$("#filterpopup").dialog("open");
	    	    	$(".ui-dialog-titlebar-close").show();
	    		});	
	    	});
    	
    	}
    	
    	function EnCodeSpecials(string) {
    		var estring = string;    		
    		estring = estring.replace('/', 'xSLASHx');
    		estring = estring.replace('&amp;', 'xANDx');
    		estring = estring.replace('&', 'xANDx');
    		estring = estring.replace(' ', 'xBLANKx');
    		estring = estring.replace(':', 'xCOLONx');  		
    		estring = estring.replace('-', 'xHYPHENx');
    		
    		// alert(string+" "+estring);
    		return estring;
    	}
    	function DeCodeSpecials(string) {    		
    		var decodedstring = string;
    		decodedstring = decodedstring.replace('xSLASHx', '/');
    		decodedstring = decodedstring.replace('xANDx', '&');
    		decodedstring = decodedstring.replace('xBLANKx', ' ');
    		decodedstring = decodedstring.replace('xCOLONx', ':');
    		decodedstring = decodedstring.replace('xHYPHENx', '-');    		
    		return decodedstring;
    	}
    		  		
    });
    

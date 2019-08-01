$(document).ready( function() { 
	
	primaryback = "#327AF6";
	primarytext = "white";
	secondaryback = "#6E757C";
	secondarytext = "white";
	successback = "#51A451";
	successtext = "white";
	dangerback = "#CB444A";
	dangertext = "white";
	warningback = "#F6C343";
	warningtext = "black";
	infoback = "#49A0B5";
	infotext = "white";
	lightback = "#49A0B5";
	lighttext = "black";
	darkback = "#black";
	darktext = "white";
	linkback = "white";
	linktext = "#317BF5";
	
	thisselectid = "";
	selectidvalues = new Array();

	sfmclub_id = $('#sfmclub_id').val();	
	sfmfloodlightvisit_sfmfacilityid = $('#sfmfloodlightvisit_sfmfacilityid').val();
	sfmfloodlightvisit_id = $('#sfmfloodlightvisit_id').val();	
	
	$('#NewVisit').on('click', function(event) { 
		$("#NewVisit").submit();
	});   
	
    $('#sfmclubupdateform').areYouSure( {'silent':true} );
    $(window).on('beforeunload', function() {
        if ($('#sfmclubupdateform').hasClass('dirty') && (areyousurestate == "dirty")) {
            return 'Are you sure you want to close without saving? (Updates may be lost)'; // doesnt override browser default message !!		
        }
    });
	
	// ======== prevents navigation away from fpage without updates =====================
	$('#sfmclubupdateform').areYouSure( 
		{'message':'Are you sure you want to close without saving? (Updates may be lost)'} // doesnt override browser default message !!
	);
		
	// ======== Listeners for Save/Close Buttons =====================
	if ( $('#Save').length ) {
		$('#Save').on('click', function(event) { SaveAction(); });
	}	
	function SaveAction() {	
		areyousurestate = "clean"; // prevent areyousure from triggering
		$('[name=SubmitAction]').val('Save');		
		$("#sfmfloodlightvisitupdateform").submit();
	}
	// ======== Listeners for Close Buttons =====================	
	$('#Close').on('click', function(event) { CloseAction(); });
	function CloseAction() {	
		areyousurestate = "clean"; // prevent areyousure from triggering
		$('[name=SubmitAction]').val('Close');
		var changesmade = "0";
		if ( changesmade == "1") {
			$.confirm({
				icon: 'fa fa-question-circle text-warning',
			    title: 'Close',
			    content: 'Are you sure you want to close without saving? (Updates may be lost)',
			    buttons: {
			        somethingElse: {
			            text: 'Close',
			            btnClass: 'btn-orange',
			            action: function(){
                                        var liststatus = "Open";	
                                        var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_sfmclubupdateout.php"+STDPARMS();
                                        sUrl = sUrl + "&sfmclub_id="+sfmclub_id;
                                        sUrl = sUrl + "&sfmfacility_id="+sfmfloodlightvisit_sfmfacilityid;
                                        sUrl = sUrl + "&CurrentTab="+"FLOODSTATUS";
			            }
			        },
			        cancel: function () { 
			        	
			        },
			    }
			});
		} else {		
                    var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_sfmclubupdateout.php"+STDPARMS();
                    sUrl = sUrl + "&sfmclub_id="+sfmclub_id;
                    sUrl = sUrl + "&sfmfacility_id="+sfmfloodlightvisit_sfmfacilityid;
                    sUrl = sUrl + "&CurrentTab="+"FLOODSTATUS";    		
                    window.location.replace(sUrl);						
		}
	}
	$('#FloodlightSpecification').on('click', function(event) {
		$('[name=SubmitAction]').val('FloodlightSpecification');	
		$("#sfmfloodlightvisitupdateform").submit();								
	});	
	
	$('#mpdfreports').on('click', function(event) {
		var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_mpdfrelevantreportlist.php"+STDPARMS();
		// var corsite_id = $('#corsite_id').val();
		sUrl = sUrl + "&keynamelist=sfmfloodlightvisit_sfmfacilityid,sfmfloodlightvisit_id"+ "&keyvaluelist=" + sfmfloodlightvisit_sfmfacilityid + "," + sfmfloodlightvisit_id;
		// window.location.href = sUrl;
    	if ( $('#locked').attr('src') == "../site_assets/LockedByMe.png") {		    	
			$.confirm({
				icon: 'fa fa-question-circle text-warning',
			    title: 'Report',
			    content: 'Are you sure you want to generate the PDF report without your latest updates. Please Save before creating the report.',
			    buttons: {
			        somethingElse: {
			            text: 'Generate PDF Report',
			            btnClass: 'btn-orange',
			            action: function(){
							$('#corsiteupdateform').trigger('reinitialize.areYouSure'); // prevent double warning				
							window.open (sUrl,"PDF reports");
			            }
			        },
			        cancel: function () {  },
			    }
			});			
    	} else {
    		window.open (sUrl,"PDF reports");
    	}
	})
	
	$('.static').each(function() {
		$(this).css('background-color', '#EBF5FB');	
	});
	
	$('.static').on('click', function(event) {
		$(this).css('background-color', 'red');
		thisid = $(this).attr('id');
		setTimeout(
				  function() 
				  {
					  $('#'+thisid).css('background-color', '#EBF5FB');
				  }, 100);
	});
	
	$('.static').each(function() {
		$(this).css('background-color', '#FDEDEC');	
		thisselectid = $(this).attr("id");
		selectidvalues[thisselectid] = $(this).val();
	});
	
	$('.static').on('click', function(event) {   // text input elements
		
		if ($("#SpecificationChanged").val() == "Yes") {} else {
			$.confirm({
		            icon: 'fa fa-question-circle text-warning',
			    title: 'Update',
			    content: 'This will change the specification. Do you want to continue ?',
			    buttons: {
			        somethingElse: {
			            text: 'Continue',
			            btnClass: 'btn-green',
			            action: function(){
			            	$("#SpecificationChanged").val("Yes");	
			            	$('.static').each(function() {
			            		$(this).css('background-color', '#EAFAF1');	
			            		thisselectid = $(this).attr("id");
			            		selectidvalues[thisselectid] = $(this).val();
			            	});
			            }
			        },
			        cancel: function () { },
			    }
			});
		}
	});
	
	$('.static' ).change(function() {   // select elements	
		thisselectid = $(this).attr("id");
		if ($("#SpecificationChanged").val() == "Yes") {} else {
			$.confirm({
				icon: 'fa fa-question-circle text-warning',
			    title: 'Update',
			    content: 'This will change the specification. Do you want to continue ?',
			    buttons: {
			        somethingElse: {
			            text: 'Continue',
			            btnClass: 'btn-green',
			            action: function(){
			            	$("#SpecificationChanged").val("Yes");
			            	$("#"+thisselectid).prop("disabled", false); 
			            	$('.static').each(function() {
			            		$(this).css('background-color', '#EAFAF1');	
			            	});
			            }
			        },
			        cancel: function () {  
			        	$("#"+thisselectid).val(selectidvalues[thisselectid]).prop('selected', true);
			        },
			    }
			});
		}
	});
	
	$('.rag').each(function() {
		backcolor = "white"; textcolor = "black";
		if ($(this).val() == "Y") { backcolor = successback; textcolor = successtext; }
		if ($(this).val() == "Yes") { backcolor = successback; textcolor = successtext; }			
		if ($(this).val() == "Green") { backcolor = successback; textcolor = successtext; }
		if ($(this).val() == "Pass") { backcolor = successback; textcolor = successtext; }
		if ($(this).val() == "Good") { backcolor = successback; textcolor = successtext; }		
		if ($(this).val() == "Amber") { backcolor = warningback; textcolor = warningtext; }
		if ($(this).val() == "Review") { backcolor = warningback; textcolor = warningtext; }
		if ($(this).val() == "Fair") { backcolor = warningback; textcolor = warningtext; }		
		if ($(this).val() == "N") { backcolor = dangerback; textcolor = dangertext; }
		if ($(this).val() == "No") { backcolor = dangerback; textcolor = dangertext; }			
		if ($(this).val() == "Red") { backcolor = dangerback; textcolor = dangertext; }
		if ($(this).val() == "Fail") { backcolor = dangerback; textcolor = dangertext; }
		if ($(this).val() == "Poor") { backcolor = dangerback; textcolor = dangertext; }		
		if ($(this).val() == "NA") { backcolor = lightback; textcolor = "white"; }	
		$(this).css('background-color', backcolor);
		$(this).css('color', textcolor);
	});	
	
	$('.rag').change( function() {			
		backcolor = "white"; textcolor = "black";
		if ($(this).val() == "Y") { backcolor = successback; textcolor = successtext; }
		if ($(this).val() == "Yes") { backcolor = successback; textcolor = successtext; }			
		if ($(this).val() == "Green") { backcolor = successback; textcolor = successtext; }
		if ($(this).val() == "Pass") { backcolor = successback; textcolor = successtext; }
		if ($(this).val() == "Good") { backcolor = successback; textcolor = successtext; }		
		if ($(this).val() == "Amber") { backcolor = warningback; textcolor = warningtext; }
		if ($(this).val() == "Review") { backcolor = warningback; textcolor = warningtext; }
		if ($(this).val() == "Fair") { backcolor = warningback; textcolor = warningtext; }		
		if ($(this).val() == "N") { backcolor = dangerback; textcolor = dangertext; }
		if ($(this).val() == "No") { backcolor = dangerback; textcolor = dangertext; }			
		if ($(this).val() == "Red") { backcolor = dangerback; textcolor = dangertext; }
		if ($(this).val() == "Fail") { backcolor = dangerback; textcolor = dangertext; }
		if ($(this).val() == "Poor") { backcolor = dangerback; textcolor = dangertext; }		
		if ($(this).val() == "NA") { backcolor = lightback; textcolor = "white"; }	
		$(this).css('background-color', backcolor);
		$(this).css('color', textcolor);
	});	
	
	// tab management.
	
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e){
        var currentTab = $(e.target).attr('href'); // get current tab
        var currentTab = currentTab.replace("#", "");
        $('#CurrentTab').val(currentTab);
    });	
	
	$('#sfmfloodlightvisit_pitchorientation').on('change', function(event) {
		$('#compass').attr('src','../site_assets/'+$('#sfmfloodlightvisit_pitchorientation').val()+'.gif'); 		
	});	
	
	// ===== Floodlight measurements ==========================
	
	gridyn = 1;  
	gridxn = 1;
	lastgridyn = 1;
	lastgridxn = 1;
	gridymax = 0;
	gridxmax = 0;
	gridresult = "";
	
    var pitchcol = "#A2D9CE";
    var outercol = "#16A085";
    var columncol = "#F9E79F";
    var dugoutcol = "#F0B27A";
	hightlightSidethings();
	
	$('.pitchpoint').change( function() {
		IncrementGridPoint();
		HighlightGrid();
		CalculateLuxResults();
	});	
	
	$('.sidething').change( function() {
		hightlightSidethings();
	});	
	
	function hightlightSidethings() {
		$('.sidething').each(function() {
		    var sidethingtext = $(this).val();
			if (sidethingtext != "") {
				if (sidethingtext.substr(0, 3) == "Col") { $(this).css('background-color', columncol); }
				else { $(this).css('background-color', dugoutcol); }
		    }
		    else {$(this).css('background-color', outercol);}		    
		});
	}
	
	var pitchlength = parseFloat($("#sfmfloodlightvisit_pitchlength").val()) || 0;
	var pitchwidth = parseFloat($("#sfmfloodlightvisit_pitchwidth").val()) || 0;
	var gridpointinset = parseFloat($("#sfmfloodlightvisit_gridpointinset").val()) || 0;
	gridpointslength = parseFloat($("#sfmfloodlightvisit_gridpointslength").val()) || 0;
	gridpointswidth = parseFloat($("#sfmfloodlightvisit_gridpointswidth").val()) || 0;
		
	if ( pitchlength == 0 ) { pitchlength = 100; }
	if ( pitchwidth == 0 ) { pitchwidth = 60; }	
	if ( gridpointinset == 0 ) { gridpointinset = 2.5; }
	if ( gridpointslength == 0 ) { gridpointslength = 11; }
	if ( gridpointswidth == 0 ) { gridpointswidth = 8; }	
	
	var gridsizelength = (pitchlength - (2*gridpointinset))/(gridpointslength+1);
	var gridsizewidth = (pitchwidth - (2*gridpointinset))/(gridpointswidth+1);

	$("#sfmfloodlightvisit_pitchlength").val(pitchlength.toFixed(2));
	$("#sfmfloodlightvisit_pitchwidth").val(pitchwidth.toFixed(2));
	$("#sfmfloodlightvisit_gridpointinset").val(gridpointinset.toFixed(2));
	$("#sfmfloodlightvisit_gridpointslength").val(gridpointslength.toFixed(0));	
	$("#sfmfloodlightvisit_gridpointswidth").val(gridpointswidth.toFixed(02));	
	$("#sfmfloodlightvisit_gridsizelength").val(gridsizelength.toFixed(2));
	$("#sfmfloodlightvisit_gridsizewidth").val(gridsizewidth.toFixed(2));	
	
	gridymax = gridpointslength;
	gridxmax = gridpointswidth;	
	avgluxreqd = 130;
	minmaxluxreqd = 0.25;		
	
	lightgrey = "#F8F9F9";
	midgrey = "#CCD1D1";
	green = "#D5F5E3";
	amber = "#F9E79F",
	red = "#FADBD8";
		
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
    	$("#SpeechIn").css('background-color', red);
    	$('#SpeechStart').on('click', function(event) { 
    		// alert("SpeechStart");
    		$("#SpeechIn").css('background-color', green);
        	HighlightGrid();
        	// StartRecognition(); 
    	});
    	$('#SpeechStop').on('click', function(event) { 
    		// alert("SpeechEnd");
    		$("#SpeechIn").css('background-color', red);
			$("#SpeechIn").val("");
			StopRecognition();
    	}); 
    	$('#Calculate').on('click', function(event) { 
			Calculate(gridymax,gridxmax);
    	});    	
	} else {
		// alert("This browser does not support speech recognition.");
    	$('#Calculate').on('click', function(event) { 
			Calculate(gridymax,gridxmax);
    	});   
	} 
    
    CalculateLuxResults();

});
  
function GridXY2ID(gridy,gridx) {
	var ynumstring = "00000"+gridy;
	var xnumstring = "00000"+gridx;
	var idstring = "G"+ynumstring.substr(ynumstring.length - 2)+xnumstring.substr(xnumstring.length - 2);
	return idstring;
}

function Grid2String() {
	var outstring = ""; var sep = "";
	for (var yi=1; yi<=gridymax; yi++) {
		for (var xi=1; xi<=gridxmax; xi++) {
			outstring = outstring + sep + CleanString($("#"+GridXY2ID(yi,xi)).val());
			sep = ",";
		}	
	}
	return outstring;
}

function CleanString($string) {
	if ( $string != "" ) { return $string.replace(/[^0-9]/gi, ''); }
	else { return ""; }
}

function HighlightGrid() {
	for (var yi=1; yi<=gridymax; yi++) {
		for (var xi=1; xi<=gridxmax; xi++) {
			if ( $("#"+GridXY2ID(yi,xi)).val() =="") { $("#"+GridXY2ID(yi,xi)).css('background-color', midgrey); }
			else { $("#"+GridXY2ID(yi,xi)).css('background-color', lightgrey); }
			if ((yi == gridyn)&&(xi == gridxn)) { $("#"+GridXY2ID(yi,xi)).css('background-color', green); }
		}	
	}
}

function IncrementGridPoint() {	
	lastgridyn = gridyn;
	lastgridxn = gridxn;
	var more = true;
	if (isEven(gridyn)) {			
		gridxn--;
		more = "1";
		if ( gridxn < 1 ) {
			gridyn++;
			if ( gridyn <= gridymax ) {
				gridxn = 1;
			} else {
				gridyn = gridymax;
				more = false;
			}
		}						
	} else {			
		gridxn++;
		more = "1";
		if ( gridxn > gridxmax ) {
			gridyn++;
			if ( gridyn <= gridymax ) {
				gridxn = gridxmax;
			} else {
				gridyn = gridymax;
				more = false;
			}
		}
	}
	return more;
}

function DecrementGridPoint() {
	lastgridyn = gridyn;
	lastgridxn = gridxn;
	var more = true;
	if (isEven(gridyn)) {			
		gridxn++;
		if ( gridxn > gridxmax ) {
			gridyn--;
			gridxn = gridxmax;
		}						
	} else {			
		gridxn--;
		if ( gridxn < 1 ) {
			gridyn--;
			if ( gridyn < 1 ) {
				gridyn = 1;
				gridxn = 1;
				more = false
			}
		}				
	}
	return more;
}

function isEven(n) {
  return n == parseFloat(n)? !(n%2) : void 0;
}	
	
function CalculateLuxResults() {
	var count = 0;
	var total = 0;
	var min = 9999;
	var max = 0;
	var stddev = 0;
	var cv = 0;	
	var gridnuma = new Array();
	for (var yi=1; yi<=gridymax; yi++) {
		for (var xi=1; xi<=gridxmax; xi++) {
			var result = parseFloat($("#"+GridXY2ID(yi,xi)).val()) || 0;
			gridnuma.push(result);
			count++;
			total = total + result;
			if (result < min) { min = result; }
			if (result > max) { max = result; }
		}	
	}
	var avg = total / count;
	var minovermax = min / max;
	var minoveravg = min / avg;
	
	$("#sfmfloodlightvisit_avglux").val(avg.toFixed(2));
	// $("#sfmfloodlightvisit_avgluxreqd").val("130");
	if ($("#sfmfloodlightvisit_avgluxreqd").val() == "") { $("#sfmfloodlightvisit_avgluxreqd").val("130"); }
	$("#sfmfloodlightvisit_minlux").val(min.toFixed(2));
	$("#sfmfloodlightvisit_maxlux").val(max.toFixed(2));
	$("#sfmfloodlightvisit_minmaxlux").val(minovermax.toFixed(2));
	if ($("#sfmfloodlightvisit_minmaxluxreqd").val() == "") { $("#sfmfloodlightvisit_minmaxluxreqd").val("0.25"); }
	$("#sfmfloodlightvisit_minavglux").val(minoveravg.toFixed(2));
	
	avgluxreqd = $("#sfmfloodlightvisit_avgluxreqd").val();
	minmaxluxreqd = $("#sfmfloodlightvisit_minmaxluxreqd").val() - 0.004999; // Tolerence at second decimal point
	
	stddev = StandardDeviation(gridnuma);
	cv = avg/stddev;
	
	$("#sfmfloodlightvisit_deviation").val(stddev.toFixed(0));	
	$("#sfmfloodlightvisit_cv").val(cv.toFixed(2));		
	
	var anyfail = "0";
	if (avg >= avgluxreqd) { 
		$("#sfmfloodlightvisit_avglux").css('background-color', successback);
		$("#sfmfloodlightvisit_avglux").css('color', successtext);
	}
	else { 
		$("#sfmfloodlightvisit_avglux").css('background-color', dangerback);
		$("#sfmfloodlightvisit_avglux").css('color', dangertext);
		anyfail = "1";
	}
	if (minovermax >= minmaxluxreqd) { 
		$("#sfmfloodlightvisit_minmaxlux").css('background-color', successback); 
		$("#sfmfloodlightvisit_minmaxlux").css('color', successtext); 
	}
	else { 
		$("#sfmfloodlightvisit_minmaxlux").css('background-color', dangerback);
		$("#sfmfloodlightvisit_minmaxlux").css('color', dangertext); 
		anyfail = "1";
	}
	if (anyfail == "0") { 
		$("#sfmfloodlightvisit_reviewerdecision").val("Pass");
		$("#sfmfloodlightvisit_reviewerdecision").css('background-color', successback);
		$("#sfmfloodlightvisit_reviewerdecision").css('color', successtext);
	} 
	else { 
		$("#sfmfloodlightvisit_reviewerdecision").val("Fail");
		$("#sfmfloodlightvisit_reviewerdecision").css('background-color', dangerback);
		$("#sfmfloodlightvisit_reviewerdecision").css('color', dangertext);
	}	
	
	$('#sfmfloodlightvisit_gridluxresults').val(Grid2String());
	
	// ================= Draw Canvas =======================
	
	colora = Array();
	
	/*
	colora[0.80] = "#333300";
	colora[0.85] = "#666600";
	colora[0.90] = "#999900";
	colora[0.95] = "#b3b300";
	colora[1.00] = "#00cc00";
	colora[1.05] = "#00e600";
	colora[1.10] = "#00ff00";
	colora[1.15] = "#1aff1a";		
	colora[1.20] = "#33ff33";
	colora[1.25] = "#4dff4d";
	colora[1.30] = "#66ff66";
	colora[1.35] = "#80ff80";	
	colora[1.40] = "#99ff99";
	colora[1.45] = "#b3ffb3";
	colora[1.50] = "#ccffcc";	
	*/
	
	/*
	colora[0.50] = "#010000";
	colora[0.60] = "#2D6FBA";
	colora[0.70] = "#4BADEA";
	colora[0.80] = "#B96028";
	colora[0.90] = "#DF8244";
	colora[1.00] = "#5D803F";
	colora[1.25] = "#5D803F";
	colora[1.50] = "#7DAA55";
	colora[1.75] = "#7DAA55"; 
	colora[2.00] = "#B0CF94";
	colora[2.25] = "#B0CF94";
	colora[2.50] = "#FADA78";
	colora[2.75] = "#FADA78";
	colora[3.00] = "#FDF1D0"; 
	colora[3.25] = "#FDF1D0";
	colora[3.50] = "#FFFFFF";
	*/

	colora[0.50] = "#010000";
	colora[0.60] = "#2D6FBA";
	colora[0.70] = "#4BADEA";
	colora[0.80] = "#B96028";
	colora[0.90] = "#DF8244";
	colora[1.00] = "#5D803F";
	colora[1.25] = "#7E8F4E";
	colora[1.50] = "#86934B";
	colora[1.75] = "#9AA74F"; 
	colora[2.00] = "#A6B24E";
	colora[2.25] = "#B8C150";
	colora[2.50] = "#DADA78";
	colora[2.75] = "#C7CE51";
	colora[3.00] = "#E4E651"; 
	colora[3.25] = "#F5F451";
	colora[3.50] = "#FFFFFF";	
	
	var sidex = 12;
	var sidey = 12;
	var spacex = 32;
	var spacey = 39;
	var maxx = 249;
	var maxy = 415;
	
	var luxa = Array(maxy);
	for ( var ygi=0; ygi<maxy; ygi++) {
		luxa[ygi] = new Array(maxx);
		for ( var xgi=0; xgi<maxx; xgi++) {
			luxa[ygi][xgi] = 0;
		}
	}
	
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	
	// populate the width interpolations
	
	for (var yi=1; yi<=gridymax; yi++) {
		var ygi = parseInt(sidey + ((yi-1)*spacey));
		// alert(ygi);
		for (var xgi=0; xgi<sidex; xgi++) {
			luxa[ygi][xgi] = parseFloat($("#"+GridXY2ID(yi,1)).val());
		}			
		
		for (var xi=1; xi<gridxmax ; xi++) {
			var lval = parseFloat($("#"+GridXY2ID(yi,xi)).val());
			var rval = parseFloat($("#"+GridXY2ID(yi,xi+1)).val());			
			for (var i=0; i<32; i++) {
				xgi= sidex + ((xi-1)*spacex) + i;
				var mval = lval + ((rval-lval)*(i/32));
				luxa[ygi][xgi] = parseInt(mval);
			}
		}
		
		for (var xgi=sidex + ((gridpointswidth-1)*spacex); xgi<maxx; xgi++) {
			luxa[ygi][xgi] = parseFloat($("#"+GridXY2ID(yi,8)).val());
		}			
	}
	
	// populate the length interpolations
	
	for (var xgi=0; xgi<maxx; xgi++) {
		for (var ygi=0; ygi<sidey; ygi++) {
			luxa[ygi][xgi] = luxa[sidey][xgi];
		}	
		for (var yi=1; yi<gridymax ; yi++) {
			var starty = sidey + ((yi-1)*spacey);
			var tval = luxa[starty][xgi];
			var bval = luxa[starty+spacey][xgi];				
			for (var i=1; i<spacey; i++) {									
				var mval = tval + ((bval-tval)*(i/spacey));
				ygi = starty + i;
				luxa[ygi][xgi] = parseInt(mval);
			}
		}

		var starty = sidey + ((gridymax-1)*spacey);
		for (var ygi=starty; ygi<maxy; ygi++) {
			luxa[ygi][xgi] = luxa[starty][xgi];
		}
	}	

	// ======= horizontal grid lines =====================
	for (var yi=1; yi<=gridymax; yi++) {
		ygi = parseInt(sidey + ((yi-1)*spacey));
		for ( var xgi=0; xgi<maxx; xgi++) {
			luxa[ygi][xgi] = 0;
		}		
	}	
	
	// ======= vertical grid lines =====================
	for (var xi=1; xi<=gridxmax; xi++) {
		xgi = parseInt(sidex + ((xi-1)*spacex));
		for ( var ygi=0; ygi<maxy; ygi++) {
			luxa[ygi][xgi] = 0;
		}		
	}

	
	for ( var ygi=0; ygi<maxy; ygi++) {
		for ( var xgi=0; xgi<maxx; xgi++) {
			ctx.fillStyle = hue(luxa[ygi][xgi],avgluxreqd);
			// ctx.fillStyle = hue(60,130);
			ctx.fillRect(xgi,ygi,1,1);
			
		}
	}

	// ctx.fillStyle = hue(150, 130);	
	// ctx.fillRect(50,50,1,1);
	
	var imgData = canvas.toDataURL();
	$("#sfmfloodlightvisit_heatmap").val(imgData);
}

function hue(val, reqdval) {
	var hue = colora[3.50];
	var valratio = val / reqdval;
	var lui = 3.75; 
	var found = "0";
	while (found == "0") { 
		if (lui > 1) { lui = lui - 0.25; }
		else { lui = lui - 0.1; } 
		lui = Math.round(lui * 100) / 100
		if (lui < 0.5) {
			hue = colora[0.50];
			found = "1";
		} else {
			// alert(valratio+" vs "+lui);
			if (valratio < lui) {
				hue = colora[lui];
				// alert(lui+" "+hue);
			} else {
				found = "1";
			}			
		}
	}
	// alert(val+" "+reqdval+" "+valratio+" "+hue);
	return hue;	
}

function hueOLD(val, reqdval) {
	var hue = colora[1.50];
	var valratio = val / reqdval;
	var lui = 1.55; 
	var found = "0";
	while (found == "0") { 
		lui = lui - 0.05;
		lui = Math.round(lui * 100) / 100
		if (lui < 0.8) {
			hue = colora[0.80];
			found = "1";
		} else {
			// alert(valratio+" vs "+lui);
			if (valratio < lui) {
				hue = colora[lui];
				// alert(lui+" "+hue);
			} else {
				found = "1";
			}			
		}
	}
	// alert(val+" "+reqdval+" "+valratio+" "+hue);
	return hue;	
}


//=========== speech recognition input mode ================

function StartRecognition() {
	$("#SpeechIn").css('background-color', green);
	$("#SpeechIn").val("");
	
	recognition = new webkitSpeechRecognition();
	recognition.continuous = false;
	recognition.interimResults = false;
	recognition.lang = "en-GB";
	recognition.start();

	recognition.onresult = function(e) {
		gridresult = e.results[0][0].transcript;
		gridresult = gridresult.replace(/ /g, "");
		gridresult = gridresult.replace(/to/g, "2");
		gridresult = gridresult.replace(/for/g, "4");
		gridresult = gridresult.replace(/point/g, ".");
		gridresult = gridresult.replace(/seven/g, "7");			
		gridresult = gridresult.replace(/sex/g, "6");	

		if (gridresult.includes(".")) {
			// alert("Point");
			var gridpointa = gridresult.split(".");
			if (gridpointa.length == 3) {
				// alert(gridpointa[0]+" "+gridpointa[1]+" "+gridpointa[2])
				gridyn = gridpointa[0];
				gridxn = gridpointa[1];
				gridresult = gridpointa[2];
			}
		}
		if (gridresult == "back") {
			$("#SpeechIn").val("back");
			if (DecrementGridPoint()) {
				HighlightGrid();
				$("#"+GridXY2ID(lastgridyn,lastgridxn)).val(gridresult);
			    // setTimeout( function(){ StartRecognition(); }, 10 ); 
			}
		} else {	
			// alert(thisgridid+" "+gridresult); 
			$("#SpeechIn").val(gridresult);
			// recognition.stop();
			HighlightGrid();
			$("#"+GridXY2ID(lastgridyn,lastgridxn)).val(gridresult);
			// if ( IncrementGridPoint() ) { setTimeout( function(){ StartRecognition(); }, 10 ); }
		}	
	};
	
	recognition.onerror = function(e) {
		// recognition.stop();
	    setTimeout( function(){
			$("#SpeechIn").css('background-color', amber);
			$("#SpeechIn").val("Timeout");
	    	// StartRecognition();	    	
	    }, 10 ); 		
	} 
}	

function StopRecognition() {
	$("#SpeechIn").css('background-color', red);
	$("#SpeechIn").val("Stopped");
	recognition.stop();
}

function StandardDeviation(numbersArr) {
    //--CALCULATE AVAREGE--
    var total = 0;
    for(var key in numbersArr) 
       total += numbersArr[key];
    var meanVal = total / numbersArr.length;
    //--CALCULATE AVAREGE--
  
    //--CALCULATE STANDARD DEVIATION--
    var SDprep = 0;
    for(var key in numbersArr) 
       SDprep += Math.pow((parseFloat(numbersArr[key]) - meanVal),2);
    var SDresult = Math.sqrt(SDprep/numbersArr.length);
    //--CALCULATE STANDARD DEVIATION--
    return SDresult;
    
}

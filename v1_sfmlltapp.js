$(document).ready( function() { 
	
	$("body").css('font-size', "18px");
	$("body").css('color', "black");
	$(".form-control").css('font-size', "18px");		
	$(".form-control").css('color', "black");	
	$(".form-control").css('margin-bottom', "4px");	
	
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
	
	reading = "";
	gridyn = 1;  
	gridxn = 1;
	lastgridyn = 1;
	lastgridxn = 1;
	gridymax = $('#sfmfloodlightvisit_gridpointslength').val();
	gridxmax = $('#sfmfloodlightvisit_gridpointswidth').val();
	if ( gridymax == "" ) { gridymax = 11; }
	if ( gridxmax == "" ) { gridxmax = 11; }	
	gridresult = "";
	
	// =========== colour scheme ============
	headerbackgroundcolor = "navy";	
	headertextcolor = "white";		
	gridouterbackgroundcolor = "#45B39D";
	gridsidebackgroundcolor = "#45B39D";
	gridsidebordercolor = "yellow";	
	gridsidetextcolor = "black";		
	gridpitchbordercolor = "yellow";
	gridsquarebackgroundcolor = "#7DCEA0";
	gridsquarebackgroundcolorhalf = "#A9DFBF";
	gridsquarebackgroundcoloractive = "yellow";
	gridsquarebackgroundcolorlast = "#A3E4D7";	
	gridsquarebordercolor = "yellow";
	gridsquaretextcolor = "black";	
	gridnavouterbackgroundcolor = "black";
	
	// =========== dimensions ============	
	screenw = $(window).width();
	screenh = $(window).height();
	pagemargin = $("#page").css("marginLeft");
	minuspagemargin = "-"+pagemargin; // make margin full width	
	headerw = screenw;
	headerh = 20;	
	
	// ========== signature setup ===================================

	var reviewernamesignature = $("#sfmfloodlightvisit_reviewersignature_signature").jSignature({
        'width': $("#sfmfloodlightvisit_reviewersignature_signatureparent").width(),
        'height': 200
	});
	var sigdata = $("#sfmfloodlightvisit_reviewersignature").val();
	if ( sigdata != "" ) {
		$("#sfmfloodlightvisit_reviewersignature_signature").jSignature("importData",sigdata);
	}
	$("#sfmfloodlightvisit_reviewersignature_signature").jSignature("disable");
	$("#sfmfloodlightvisit_reviewersignature_signature").children().css('background-color', '#FDEDEC');
	reviewersignaturelock = "on";
	$("#sfmfloodlightvisit_reviewersignature_sigclearbutton").hide();
	
 	var clubrepnamesignature = $("#sfmfloodlightvisit_clubrepsignature_signature").jSignature({
        'width': $("#sfmfloodlightvisit_clubrepsignature_signatureparent").width(),
        'height': 200
	});
	var sigdata = $("#sfmfloodlightvisit_clubrepsignature").val();
	if ( sigdata != "" ) {
		$("#sfmfloodlightvisit_clubrepsignature_signature").jSignature("importData",sigdata);
	}
	$("#sfmfloodlightvisit_clubrepsignature_signature").jSignature("disable");
	$("#sfmfloodlightvisit_clubrepsignature_signature").children().css('background-color', '#FDEDEC');	
	clubrepsignaturelock = "on";
	$("#sfmfloodlightvisit_clubrepsignature_sigclearbutton").hide();
	// === signature listeners ====
	
	$("#sfmfloodlightvisit_reviewersignature_siglockbutton").on('click', function(event) { 
		if (reviewersignaturelock == "on") {			
			$("#sfmfloodlightvisit_reviewersignature_signature").jSignature("enable");
			$("#sfmfloodlightvisit_reviewersignature_signature").children().css('background-color', '#EAFAF1');
			$("#sfmfloodlightvisit_reviewersignature_siglockbutton").html('<span><i class="fa fa-refresh fa-lock"></i></span>&nbsp;Save');	
			reviewersignaturelock = "off";
			$("#sfmfloodlightvisit_reviewersignature_sigclearbutton").show();
		} else {
			$("#sfmfloodlightvisit_reviewersignature_signature").jSignature("disable");
			$("#sfmfloodlightvisit_reviewersignature_signature").children().css('background-color', '#FDEDEC');
			$("#sfmfloodlightvisit_reviewersignature_siglockbutton").html('<span><i class="fa fa-refresh fa-unlock"></i></span>&nbsp;UnLock');			
			reviewersignaturelock = "on";
			$("#sfmfloodlightvisit_reviewersignature_sigclearbutton").hide();
			var sigdata = $("#sfmfloodlightvisit_reviewersignature_signature").jSignature('getData');
			$("#sfmfloodlightvisit_reviewersignature").val(sigdata);
		}
	});
	
	$("#sfmfloodlightvisit_clubrepsignature_siglockbutton").on('click', function(event) { 	
		if (clubrepsignaturelock == "on") {			
			$("#sfmfloodlightvisit_clubrepsignature_signature").jSignature("enable");
			$("#sfmfloodlightvisit_clubrepsignature_signature").children().css('background-color', '#EAFAF1');
			$("#sfmfloodlightvisit_clubrepsignature_siglockbutton").html('<span><i class="fa fa-refresh fa-lock"></i></span>&nbsp;Save');	
			clubrepsignaturelock = "off";
			$("#sfmfloodlightvisit_clubrepsignature_sigclearbutton").show();
		} else {
			$("#sfmfloodlightvisit_clubrepsignature_signature").jSignature("disable");
			$("#sfmfloodlightvisit_clubrepsignature_signature").children().css('background-color', '#FDEDEC');
			$("#sfmfloodlightvisit_clubrepsignature_siglockbutton").html('<span><i class="fa fa-refresh fa-unlock"></i></span>&nbsp;UnLock');	
			clubrepsignaturelock = "on";
			$("#sfmfloodlightvisit_clubrepsignature_sigclearbutton").hide();
			var sigdata = $("#sfmfloodlightvisit_clubrepsignature_signature").jSignature('getData');
			$("#sfmfloodlightvisit_clubrepsignature").val(sigdata);
		}
	});	
	$("#sfmfloodlightvisit_reviewersignature_sigclearbutton").on('click', function(event) { 	
		$.confirm({
			icon: 'fa fa-question-circle text-warning',
		    title: 'Clear Signature',
		    content: 'This will clear the signature. Do you want to continue ?',
		    buttons: {
		        somethingElse: {
		            text: 'Continue',
		            btnClass: 'btn-green',
		            action: function(){
		            	$("#sfmfloodlightvisit_reviewersignature_signature").jSignature("reset");
		            }
		        },
		        cancel: function () { },
		    }
		});
	});
	$("#sfmfloodlightvisit_clubrepsignature_sigclearbutton").on('click', function(event) { 	
		$.confirm({
			icon: 'fa fa-question-circle text-warning',
		    title: 'Clear Signature',
		    content: 'This will clear the signature. Do you want to continue ?',
		    buttons: {
		        somethingElse: {
		            text: 'Continue',
		            btnClass: 'btn-green',
		            action: function(){
		            	$("#sfmfloodlightvisit_clubrepsignature_signature").jSignature("reset");
		            }
		        },
		        cancel: function () { },
		    }
		});
	});	
	
	
	
	

	// ========== floodlight specification data control ===================================
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
	
	$("#sfmfloodlightvisit_reviewername").on('change', function(event) { 
		$("#ReviewerSignatureHeader").html("Reviewer Signature - "+$("#sfmfloodlightvisit_reviewername").val());
	});		
	$("#sfmfloodlightvisit_clubrepname").on('change', function(event) { 
		$("#ClubrepSignatureHeader").html("Club Rep Signature - "+$("#sfmfloodlightvisit_clubrepname").val());
	});		

	// =============================================
	
	CalculateGridDim();
	
	$("#sfmfloodlightvisit_pitchlength").on('change', function(event) { 
		CalculateGridDim();
	});
	$("#sfmfloodlightvisit_pitchwidth").on('change', function(event) { 
		CalculateGridDim();
	});	
	$("#sfmfloodlightvisit_gridpointslength").on('change', function(event) { 
		CalculateGridDim();
	});
	$("#sfmfloodlightvisit_gridpointswidth").on('change', function(event) { 
		CalculateGridDim();
	});
	$("#sfmfloodlightvisit_avgluxreqd").on('change', function(event) { 
		CalculateLuxResults();
	});
	$("#sfmfloodlightvisit_minmaxluxreqd").on('change', function(event) { 
		CalculateLuxResults();
	});	
	
	// =========== grid dimensions ============		
	var gnleftw = screenw*0.3;
	var gncenterw = screenw*0.4;
	var gncenterh = ((gncenterw/3)*4)*1.05;	
	var gnrightw = screenw*0.3;
	var gnumbuttw = (gncenterw/3)-6;	
	var gnumbutth = gnumbuttw;	
	
	var pitchcontainerh = screenh - headerh - gncenterh;
	
	var gridptsw = 8;
	var gridptsh = 11;
	var headerh = $("#HeaderDiv").height();
	var gridbw = 0;
	var gridw = Math.floor((screenw)/(gridptsw+1));	// assumes side is half grid
	var gridh = Math.floor(pitchcontainerh/12);

	var bothsides =  Math.floor(screenw-(gridptsw*gridw));
	var lsidew =  Math.floor(bothsides/2);
	// var rsidew =  bothsides - lsidew;
	var rsidew =  screenw - (8*gridw) - lsidew;	
	var lrsideh = gridh;	
	
	var tbsidew =  gridw;
	var tbsideh =  Math.floor(gridh/2);		
	var lcsidew =  lsidew;
	var rcsidew =  rsidew;	
	var csideh =  tbsideh;
	
	var cpaddingtop = (csideh-10)/2;
	var cpaddingleft = (lcsidew-10)/2;
	var spaddingtop = (lrsideh-20)/2;
	var spaddingleft = (lsidew-20)/2;	

	var pitchw = (gridptsw*gridw)+(lsidew+rsidew);
	var pitchh = (gridptsh*gridh)+(2*tbsideh);
	
	// alert(gridptsh+" "+gridh+" "+tbsideh+" "+pitchh);
	// =========== css ============	
		
	$("#HeaderDiv").css('width', headerw);	
	$("#HeaderDiv").css('height', headerh);
	$("#HeaderDiv").css('background-color', headerbackgroundcolor);
	$("#HeaderDiv").css('color', headertextcolor);	
	$("#HeaderDiv").css("text-align", "center");
	$("#HeaderDiv").css('marginLeft', minuspagemargin);
	$("#HeaderDiv").css('marginRight', minuspagemargin);	
	$("#HeaderDiv").css('marginTop', minuspagemargin);
	
	/*
	$("#GridPitchOuter").css('width', pitchw);	
	$("#GridPitchOuter").css('height', pitchh);	
	$("#GridPitchOuter").css('background-color', gridouterbackgroundcolor);
	*/
	
	$("#GridPitch").css('width', pitchw);	
	$("#GridPitch").css('height', pitchh);	

	$(".GridCLSide").css('width', lcsidew);	
	$(".GridCLSide").css('height', csideh);		
	$(".GridCLSide").css('background-color', gridsidebackgroundcolor);
	$(".GridCLSide").css('border-color', gridsidebordercolor);
	$(".GridCLSide").css('border-width', gridbw);	
	$(".GridCLSide").css('color', gridsidetextcolor);
	$(".GridCLSide").css('padding-top', cpaddingtop);
	$(".GridCLSide").css('padding-left', cpaddingleft);	
	
	$(".GridCRSide").css('width', rcsidew);	
	$(".GridCRSide").css('height', csideh);		
	$(".GridCRSide").css('background-color', gridsidebackgroundcolor);
	$(".GridCRSide").css('border-color', gridsidebordercolor);
	$(".GridCRSide").css('border-width', gridbw);	
	$(".GridCRSide").css('color', gridsidetextcolor);
	$(".GridCRSide").css('padding-top', cpaddingtop);
	$(".GridCRSide").css('padding-left', cpaddingleft);		
	
	$(".GridLSide").css('width', lsidew);	
	$(".GridLSide").css('height', lrsideh);		
	$(".GridLSide").css('background-color', gridsidebackgroundcolor);
	$(".GridLSide").css('border-color', gridsidebordercolor);
	$(".GridLSide").css('border-width', gridbw);	
	$(".GridLSide").css('color', gridsidetextcolor);
	$(".GridLSide").css('padding-top', spaddingtop);
	$(".GridLSide").css('padding-left', spaddingleft);		
	
	$(".GridRSide").css('width', rsidew);	
	$(".GridRSide").css('height', lrsideh);		
	$(".GridRSide").css('background-color', gridsidebackgroundcolor);
	$(".GridRSide").css('border-color', gridsidebordercolor);
	$(".GridRSide").css('border-width', gridbw);	
	$(".GridRSide").css('color', gridsidetextcolor);
	$(".GridRSide").css('padding-top', spaddingtop);
	$(".GridRSide").css('padding-left', spaddingleft);		
	
	$(".GridTBSide").css('width', tbsidew);	
	$(".GridTBSide").css('height', tbsideh);		
	$(".GridTBSide").css('background-color', gridsidebackgroundcolor);
	$(".GridTBSide").css('border-color', gridsidebordercolor);
	$(".GridTBSide").css('border-width', gridbw);	
	$(".GridTBSide").css('color', gridsidetextcolor);	
	
	$(".GridSquare").css('width', gridw);	
	$(".GridSquare").css('height', gridh);		
	$(".GridSquare").css('background-color', gridsquarebackgroundcolor);
	$(".GridSquare").css('border-color', gridsquarebordercolor);
	$(".GridSquare").css('border-width', gridbw);	
	$(".GridSquare").css('color', gridsquaretextcolor);	
	$(".GridSquare").css('text-align', "center");	
	$(".GridSquare").css('vertical-align', "middle");
	$(".GridSquare").css('line-height', gridh+"px");	// trick to vertically centre
	
	$("#GridNavOuter").css('height', gncenterh+30);
	$("#GridNavOuter").css('width', screenw);
	
	$("#GridNavLeft").css('width', gnleftw);
	$("#GridNavLeft").css('height', gncenterh+30);
	$("#GridNavLeft").css({top: headerh+pitchh, left: 0, position:'absolute'});
	$("#GridNavLeft").css('background-color', gridnavouterbackgroundcolor);
	
	$("#GridNavCenter").css('width', gncenterw);
	$("#GridNavCenter").css('height', gncenterh+30);	
	$("#GridNavCenter").css({top: headerh+pitchh, left: screenw*0.3, position:'absolute'});	
	$("#GridNavCenter").css('background-color', gridnavouterbackgroundcolor);
	
	$("#GridNavRight").css('width', gnrightw);
	$("#GridNavRight").css('height', gncenterh+30);
	$("#GridNavRight").css({top: headerh+pitchh, left: screenw*0.7, position:'absolute'});
	$("#GridNavRight").css('background-color', gridnavouterbackgroundcolor);
	
	$("#GridReadingBox").css('width', gnrightw*0.9);
	$("#GridReadingBox").css('margin-left', gnrightw*0.05);
	$("#GridReadingBox").css('height', "40px");
	$("#GridReadingBox").css('background-color', "white");
	$("#GridReadingBox").css('font-size', "30px");
	$("#GridReadingBox").css('text-align', "center");	
	
	$(".GridNumButton").css('width', gnumbuttw);
	$(".GridNumButton").css('height', gnumbutth);
	$(".GridNumButton").css('margin', "1px");
	$(".GridNumButton").css('background-color', "gray");	
	$(".GridNumButton").css('font-size', "20px");
	
	$(".GridAppNavButton").css('width', "90%");	
	$(".GridAppNavButton").css('height', "40px");
	$(".GridAppNavButton").css('margin-left', gnrightw*0.05);
	
	var tleft = 0;
	var ttop = headerh;
	var liss = "";
	var wiss = "";
    var linn = "";
    var winn = "";
	var li = 0;
	var wi = 0;

	// alert(ttop);
	//==== top row =====
	tleft = 0;
	li = 0;
	wi = 0;
	liss = "00"+li.toString();
	wiss = "00"+wi.toString();
    linn = liss.substr(liss.length -2);
    winn = wiss.substr(wiss.length -2);
    $("#S"+linn+winn).css({top: ttop, left: tleft, position:'absolute'});
    tleft = tleft + lsidew;
    for (var wi=1; wi<9; wi++) {
    	liss = "00"+li.toString();
    	wiss = "00"+wi.toString();
        linn = liss.substr(liss.length -2);
        winn = wiss.substr(wiss.length -2);
        $("#S"+linn+winn).css({top: ttop, left: tleft, position:'absolute'});
        tleft = tleft + gridw;
    }
	wi = 9;
	liss = "00"+li.toString();
	wiss = "00"+wi.toString();
    linn = liss.substr(liss.length -2);
    winn = wiss.substr(wiss.length -2);
    $("#S"+linn+winn).css({top: ttop, left: tleft, position:'absolute'});
    tleft = tleft + rsidew;        
    ttop = ttop + tbsideh;
	
	//==== main rows =====
    for (var li=1; li<12; li++) {
    	tleft = 0;
    	wi = 0;
    	liss = "00"+li.toString();
    	wiss = "00"+wi.toString();
        linn = liss.substr(liss.length -2);
        winn = wiss.substr(wiss.length -2);
        $("#S"+linn+winn).css({top: ttop, left: tleft, position:'absolute'});
        tleft = tleft + lsidew;
        for (var wi=1; wi<9; wi++) {
        	liss = "00"+li.toString();
        	wiss = "00"+wi.toString();
            linn = liss.substr(liss.length -2);
            winn = wiss.substr(wiss.length -2);
            $("#G"+linn+winn).css({top: ttop, left: tleft, position:'absolute'});
            if (li == 6) {
            	$("#G"+linn+winn).css('background-color', gridsquarebackgroundcolorhalf);            	          	
            } else {
            	$("#G"+linn+winn).css('background-color', gridsquarebackgroundcolor);  
            }
            tleft = tleft + gridw;
        }
    	wi = 9;
    	liss = "00"+li.toString();
    	wiss = "00"+wi.toString();
        linn = liss.substr(liss.length -2);
        winn = wiss.substr(wiss.length -2);
        $("#S"+linn+winn).css({top: ttop, left: tleft, position:'absolute'});
        tleft = tleft + rsidew;        
        ttop = ttop + gridh;
    }

	//==== side row =====
	tleft = 0;
	li = 12;
	wi = 0;
	liss = "00"+li.toString();
	wiss = "00"+wi.toString();
    linn = liss.substr(liss.length -2);
    winn = wiss.substr(wiss.length -2);
    $("#S"+linn+winn).css({top: ttop, left: tleft, position:'absolute'});
    tleft = tleft + lsidew;
    for (var wi=1; wi<9; wi++) {
    	liss = "00"+li.toString();
    	wiss = "00"+wi.toString();
        linn = liss.substr(liss.length -2);
        winn = wiss.substr(wiss.length -2);
        $("#S"+linn+winn).css({top: ttop, left: tleft, position:'absolute'});
        tleft = tleft + gridw;
    }
	wi = 9;
	liss = "00"+li.toString();
	wiss = "00"+wi.toString();
    linn = liss.substr(liss.length -2);
    winn = wiss.substr(wiss.length -2);
    $("#S"+linn+winn).css({top: ttop, left: tleft, position:'absolute'});
    tleft = tleft + rsidew;        
    ttop = ttop + tbsideh;
	// alert(ttop);  
    
    HighlightGrid();
    CalculateLuxResults();
	
	$('#InitDiv').show();
	$('#DimDiv').hide();
	$('#GridDiv').hide();
	$('#ResDiv').hide();
	$('#DecisionDiv').hide();
	$('#SigDiv').hide();
	$('#ImgDiv').hide();	
	$('#NotesDiv').hide();
	
	$('#InitDivBackButton').on('click', function(event) { 
		window.history.back();
	});	
    
	$('#InitDivNextButton').on('click', function(event) { 
		$('#InitDiv').hide();
		$('#DimDiv').show();
		$('#GridDiv').hide();
		$('#ResDiv').hide();
		$('#DecisionDiv').hide();
		$('#SigDiv').hide();
		$('#ImgDiv').hide();		
		$('#NotesDiv').hide();		
	});	
	$('#DimDivBackButton').on('click', function(event) { 
		$('#InitDiv').show();
		$('#DimDiv').hide();
		$('#GridDiv').hide();
		$('#ResDiv').hide();
		$('#DecisionDiv').hide();
		$('#SigDiv').hide();
		$('#ImgDiv').hide();		
		$('#NotesDiv').hide();		
	});	
	$('#DimDivNextButton').on('click', function(event) { 
		$('#InitDiv').hide();
		$('#DimDiv').hide();
		$('#GridDiv').show();
		$('#ResDiv').hide();
		$('#DecisionDiv').hide();
		$('#SigDiv').hide();
		$('#ImgDiv').hide();		
		$('#NotesDiv').hide();		
	});			
	$('#GridDivBackButton').on('click', function(event) { 
		$('#InitDiv').hide();
		$('#DimDiv').show();
		$('#GridDiv').hide();
		$('#ResDiv').hide();
		$('#ImgDiv').hide();
		$('#DecisionDiv').hide();
		$('#SigDiv').hide();
		$('#NotesDiv').hide();		
	});	
	$('#GridDivNextButton').on('click', function(event) { 
		$('#InitDiv').hide();
		$('#DimDiv').hide();
		$('#GridDiv').hide();
		$('#ResDiv').show();
		$('#DecisionDiv').hide();
		$('#SigDiv').hide();
		$('#ImgDiv').hide();		
		$('#NotesDiv').hide();		
	});	
	$('#ResDivBackButton').on('click', function(event) { 
		$('#InitDiv').hide();
		$('#DimDiv').hide();
		$('#GridDiv').show();
		$('#ResDiv').hide();
		$('#DecisionDiv').hide();
		$('#SigDiv').hide();
		$('#ImgDiv').hide();		
		$('#NotesDiv').hide();		
	});	
	$('#ResDivNextButton').on('click', function(event) { 
		$('#InitDiv').hide();
		$('#DimDiv').hide();
		$('#GridDiv').hide();
		$('#ResDiv').hide();
		$('#DecisionDiv').show();
		$('#SigDiv').hide();
		$('#ImgDiv').hide();		
		$('#NotesDiv').hide();		
	});	
	$('#DecisionDivBackButton').on('click', function(event) { 
		$('#InitDiv').hide();
		$('#DimDiv').hide();
		$('#GridDiv').hide();
		$('#ResDiv').show();
		$('#DecisionDiv').hide();
		$('#SigDiv').hide();
		$('#ImgDiv').hide();		
		$('#NotesDiv').hide();		
	});	
	$('#DecisionDivNextButton').on('click', function(event) { 
		$('#InitDiv').hide();
		$('#DimDiv').hide();
		$('#GridDiv').hide();
		$('#ResDiv').hide();
		$('#DecisionDiv').hide();
		$('#SigDiv').show();
		$('#ImgDiv').hide();		
		$('#NotesDiv').hide();		
	});	
	$('#SigDivBackButton').on('click', function(event) { 
		$('#InitDiv').hide();
		$('#DimDiv').hide();
		$('#GridDiv').hide();
		$('#ResDiv').hide();
		$('#DecisionDiv').show();
		$('#SigDiv').hide();
		$('#ImgDiv').hide();		
		$('#NotesDiv').hide();		
	});
	$('#SigDivNextButton').on('click', function(event) { 
		$('#InitDiv').hide();
		$('#DimDiv').hide();
		$('#GridDiv').hide();
		$('#ResDiv').hide();
		$('#DecisionDiv').hide();
		$('#SigDiv').hide();
		$('#ImgDiv').show();		
		$('#NotesDiv').hide();		
	});
	$('#ImgDivBackButton').on('click', function(event) { 
		$('#InitDiv').hide();
		$('#DimDiv').hide();
		$('#GridDiv').hide();
		$('#ResDiv').hide();
		$('#DecisionDiv').hide();
		$('#SigDiv').show();
		$('#ImgDiv').hide();		
		$('#NotesDiv').hide();	
	});		
	$('#ImgDivNextButton').on('click', function(event) { 
		$('#InitDiv').hide();
		$('#DimDiv').hide();
		$('#GridDiv').hide();
		$('#ResDiv').hide();
		$('#DecisionDiv').hide();
		$('#SigDiv').hide();
		$('#ImgDiv').hide();		
		$('#NotesDiv').show();		
	});	
	$('#NotesDivBackButton').on('click', function(event) { 
		$('#InitDiv').hide();
		$('#DimDiv').hide();
		$('#GridDiv').hide();
		$('#ResDiv').hide();
		$('#DecisionDiv').hide();
		$('#SigDiv').hide();
		$('#ImgDiv').show();		
		$('#NotesDiv').hide();		
	});
	$('#SigDivSaveButton').on('click', function(event) { 
		// alert("Finished");
		$("#SubmitAction").val("Save");
		var myform = document.getElementById("myform");
		var fd = new FormData(sfmlltappinform );
		$.ajax({
		    url: "../site_php/v1_sfmlltappin.php",
		    data: fd,
		    cache: false,
		    processData: false,
		    contentType: false,
		    type: 'POST',
		    success: function (response) {
	    		if (response.includes("Updates Successful")) {
	    			$.alert({
		    			icon: 'fa fa-thumbs-up text-success',
		    			title: "Success",
		    		    content: "Quick Save Successful."
		    		});	
	    		} else {
	    			$.alert({
		    			icon: 'fa fa-thumbs-down text-danger',
		    			title: "Problem",
		    		    content: "Quick Save failed."
		    		});	
	    		}
		    }
		});
	});		
	$('#ImgDivSaveButton').on('click', function(event) { 
		// alert("Finished");
		$("#SubmitAction").val("Save");
		var myform = document.getElementById("myform");
		var fd = new FormData(sfmlltappinform );
		$.ajax({
		    url: "../site_php/v1_sfmlltappin.php",
		    data: fd,
		    cache: false,
		    processData: false,
		    contentType: false,
		    type: 'POST',
		    success: function (response) {
	    		if (response.includes("Updates Successful")) {
	    			$.alert({
		    			icon: 'fa fa-thumbs-up text-success',
		    			title: "Success",
		    		    content: "Quick Save Successful."
		    		});	
	    		} else {
	    			$.alert({
		    			icon: 'fa fa-thumbs-down text-danger',
		    			title: "Problem",
		    		    content: "Quick Save failed."
		    		});	
	    		}
		    }
		});
	});		
	$('#NotesDivFinishButton').on('click', function(event) { 
		// alert("Finished");
		$("#SubmitAction").val("Finish");
		$("#sfmlltappinform").submit();
	});	

	
	$(".AppNavButton").css('width', "100%");	
	$(".AppNavButton").css('height', "40px");	
	
	$(".GridSquare").on('click', function(event) { 
		thisid = $(this).attr('id');
		// alert(thisid);	
		gridyn = parseInt(thisid.substr(1, 2));
		gridxn = parseInt(thisid.substr(3, 2));		
		HighlightGrid();
		reading = "";
		$('#Reading').html(reading);
	});
	
	$(".GridNumButton").on('click', function(event) { 
		thisid = $(this).attr('id');
		// alert(thisid);	
		var bits = thisid.split('_');
		if (bits[1] == "C") {
			reading = "";
			$('#Reading').html(reading);
		} else {
			if (bits[1] == "B") {
				reading = reading + bits[1];
				$('#Reading').html(reading);
			} else {
				reading = reading + bits[1];
				$('#Reading').html(reading);
			}
		}
	});
	
	/*
	reading = "";
	gridyn = 1;  
	gridxn = 1;
	lastgridyn = 1;
	lastgridxn = 1;
	gridymax = 0;
	gridxmax = 0;
	gridresult = "";
	*/
	
	$("#GridDivEnterButton").on('click', function(event) { 
		// alert(gridyn+" "+gridxn+" Reading Value =  "+reading);
		if (reading != "") {
			$("#"+GridXY2ID(gridyn,gridxn)).html(reading);
			$('#sfmfloodlightvisit_gridluxresults').val(Grid2String());
		}
		IncrementGridPoint();
		HighlightGrid();
		reading = "";
		$('#Reading').html(reading);
		CalculateLuxResults();
	});
		
	var heatmapouterbackgroundcolor = "#1E8449";
	var heatmapouterw = screenw;
	var heatmapouterh = 435;	
	var heatmapw = 249
	var heatmaph = 415;
	var heatmapleft = (heatmapouterw-heatmapw)/2 ;
	
	$("#HeatMapOuter").css('width', heatmapouterw);	
	$("#HeatMapOuter").css('height', heatmapouterh);	
	$("#HeatMapOuter").css('background-color', heatmapouterbackgroundcolor);
	$("#HeatMapOuter").css({top: headerh, left: 0, position:'absolute'});
	
	$("#HeatMap").css('width', heatmapw);	
	$("#HeatMap").css('height', heatmaph);	
	$("#HeatMap").css('background-color', "Silver");	
	$("#HeatMap").css({top: 10, left: heatmapleft, position:'absolute'});
	
	$("#ResData").css({top: headerh+heatmapouterh+10, left: 0, position:'absolute'});
	$("#ResData").css({paddingLeft: '20px', marginRight: '20px'});
	
});

function GridXY2ID(gridy,gridx) {
	var ynumstring = "00000"+gridy;
	var xnumstring = "00000"+gridx;
	var idstring = "G"+ynumstring.substr(ynumstring.length - 2)+xnumstring.substr(xnumstring.length - 2);
	return idstring;
}

function HighlightGrid() {
	// alert(gridyn+" "+gridxn+" "+gridymax+" "+gridxmax);
	for (var yi=1; yi<=gridymax; yi++) {
		for (var xi=1; xi<=gridxmax; xi++) {
			if ((yi == gridyn)&&(xi == gridxn)) { 
				$("#"+GridXY2ID(yi,xi)).css('background-color', gridsquarebackgroundcoloractive);
			} else {
				if ((yi == lastgridyn)&&(xi == lastgridxn)) { 
					$("#"+GridXY2ID(yi,xi)).css('background-color', gridsquarebackgroundcolorlast); 
				} else {
					if (yi == 6) {
		            	$("#"+GridXY2ID(yi,xi)).css('background-color', gridsquarebackgroundcolorhalf); 
		            } else {
		            	$("#"+GridXY2ID(yi,xi)).css('background-color', gridsquarebackgroundcolor);  
		            }					
				}
			}
		}	
	}
}

function Grid2String() {
	var outstring = ""; var sep = "";
	for (var yi=1; yi<=gridymax; yi++) {
		for (var xi=1; xi<=gridxmax; xi++) {
			outstring = outstring + sep + CleanString($("#"+GridXY2ID(yi,xi)).html());
			sep = ",";
		}	
	}
	// alert (outstring)
	return outstring;
}

function CleanString($string) {
	return $string.replace(/[^0-9]/gi, '');
}

function IncrementGridPoint() {	
	lastgridyn = gridyn;
	lastgridxn = gridxn;
	if (isEven(gridyn)) {			
		gridxn--;
		more = "1";
		if ( gridxn < 1 ) {
			gridyn++;
			if ( gridyn <= gridymax ) {
				gridxn = 1;
			} else {
				gridyn = 1;
				gridxn = 1;
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
				gridyn = 1;
				gridxn = 1;
			}
		}
	}
}

function DecrementGridPoint() {
	lastgridyn = gridyn;
	lastgridxn = gridxn;
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
			}
		}				
	}
}

function isEven(n) {
  return n == parseFloat(n)? !(n%2) : void 0;
}		

function CalculateGridDim() {
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
	
	var gridsizelength = (pitchlength - (2*gridpointinset))/(gridpointslength-1);
	var gridsizewidth = (pitchwidth - (2*gridpointinset))/(gridpointswidth-1);
	
	$("#sfmfloodlightvisit_pitchlength").val(pitchlength.toFixed(2));
	$("#sfmfloodlightvisit_pitchwidth").val(pitchwidth.toFixed(2));
	$("#sfmfloodlightvisit_gridpointinset").val(gridpointinset.toFixed(2));
	$("#sfmfloodlightvisit_gridpointslength").val(gridpointslength.toFixed(0));	
	$("#sfmfloodlightvisit_gridpointswidth").val(gridpointswidth.toFixed(0));	
	$("#sfmfloodlightvisit_gridsizelength").val(gridsizelength.toFixed(2));
	$("#sfmfloodlightvisit_gridsizewidth").val(gridsizewidth.toFixed(2));	
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
			// alert(GridXY2ID(yi,xi)+" "+$("#"+GridXY2ID(yi,xi)).html());
			var result = parseFloat(CleanString($("#"+GridXY2ID(yi,xi)).html()));
			gridnuma.push(result);
			count++;
			total = total + result;
			if (result < min) { min = result; }
			if (result > max) { max = result; }
		}	
	}
	var avg = total / count;
	var minovermax = 0;
	var minoveravg = 0;	
	if (count > 0) { avg = total / count; }	
	if (max > 0) { minovermax = min / max; }
	if (avg > 0) { minoveravg = min / avg;	 }
	
	$("#sfmfloodlightvisit_avglux").val(avg.toFixed(0));
	if ($("#sfmfloodlightvisit_avgluxreqd").val() == "") { 
		$("#sfmfloodlightvisit_avgluxreqd").val("130");
		var avgluxreqd = 130;
	} else {
		var avgluxreqd = parseFloat($("#sfmfloodlightvisit_avgluxreqd").val());
		// avgluxreqd = avgluxreqd.toFixed(0);
		$("#sfmfloodlightvisit_avgluxreqd").val(avgluxreqd.toFixed(0));
	}
	$("#sfmfloodlightvisit_minlux").val(min.toFixed(0));
	$("#sfmfloodlightvisit_maxlux").val(max.toFixed(0));
	$("#sfmfloodlightvisit_minmaxlux").val(minovermax.toFixed(2));
	if ($("#sfmfloodlightvisit_minmaxluxreqd").val() == "") { 
		$("#sfmfloodlightvisit_minmaxluxreqd").val("0.25");
		var minmaxluxreqd = 0.25;
	} else {
		var minmaxluxreqd = parseFloat($("#sfmfloodlightvisit_minmaxluxreqd").val());
		// minmaxluxreqd = minmaxluxreqd.toFixed(2);
		$("#sfmfloodlightvisit_minmaxluxreqd").val(minmaxluxreqd.toFixed(2));
	}	
	
	if ($("#sfmfloodlightvisit_minmaxluxreqd").val() == "") { $("#sfmfloodlightvisit_minmaxluxreqd").val("0.25"); }
	$("#sfmfloodlightvisit_minavglux").val(minoveravg.toFixed(2));
	
	avgluxreqd = $("#sfmfloodlightvisit_avgluxreqd").val();
	minmaxluxreqd = $("#sfmfloodlightvisit_minmaxluxreqd").val() - 0.004999; // Tolerence at second decimal point;	
	
	$("#sfmfloodlightvisit_avglux").val(avg.toFixed(0));
	$("#sfmfloodlightvisit_minmaxlux").val(minovermax.toFixed(2));
	
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
		$("#PassFailButton").val("Pass");
		$("#PassFailButton").css('background-color', successback);
		$("#PassFailButton").css('color', successtext);
	} 
	else { 
		$("#sfmfloodlightvisit_reviewerdecision").val("Fail");
		$("#PassFailButton").val("Fail");
		$("#PassFailButton").css('background-color', dangerback);
		$("#PassFailButton").css('color', dangertext);
	}	
	
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
	
	var gridpointswidth = parseFloat($('#sfmfloodlightvisit_gridpointswidth').val());
	var gridpointslength = parseFloat($('#sfmfloodlightvisit_gridpointslength').val());
	
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
			luxa[ygi][xgi] = parseFloat(CleanString($("#"+GridXY2ID(yi,1)).html()));
		}			
		
		for (var xi=1; xi<gridxmax ; xi++) {
			var lval = parseFloat(CleanString($("#"+GridXY2ID(yi,xi)).html()));
			var rval = parseFloat(CleanString($("#"+GridXY2ID(yi,xi+1)).html()));	
			for (var i=0; i<32; i++) {
				xgi= sidex + ((xi-1)*spacex) + i;
				var mval = lval + ((rval-lval)*(i/32));
				luxa[ygi][xgi] = parseInt(mval);
			}
		}
		
		for (var xgi=sidex + ((gridpointswidth-1)*spacex); xgi<maxx; xgi++) {
			luxa[ygi][xgi] = parseFloat(CleanString($("#"+GridXY2ID(yi,8)).html()));
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


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

    passback = "#b3ffd9";
    advisoryback = "#ffd65c";
    failback = "#ff9999";
    headerback = "#85929E";
    feintback = "#F8F9F9";
	
    $('.CriteriaInspectButton' ).on('click', function(event) {
            // this routine paints the Inspectors Popup window
            // alert("CriteriaInspectButton");
            thisselectid = $(this).attr("id");	
            // CriteriaInspectButton_accredcriteria_id
            var thisaccredcriteria_id = thisselectid.replace("CriteriaInspectButton_", "");
	    $("#popupaccredcriteria_schemeid").val($("#accredcriteria_schemeid").val());
	    $("#popupaccredcriteria_clubid").val($("#accredcriteria_clubid").val());
	    $("#popupaccredcriteria_id").val(thisaccredcriteria_id);
	    $("#popupaccredcriteria_inspectionresult").val($("#accredcriteria_inspectionresult_"+thisaccredcriteria_id).html());
	    var commentstext = $("#accredcriteria_inspectioncomments_"+thisaccredcriteria_id).html(); 
	    $("#popupaccredcriteria_inspectioncomments").val(commentstext);
	    
	    /*
	    <div class="row"><div class="vcenter col-md-3"></div><div class="vcenter col-md-3">Club</div><div class="vcenter col-md-3">Inspector</div><div class="vcenter col-md-3">Condition</div></div>
	    <div class="row">
	    <div class="vcenter col-md-3">Text</div>
	    <div class="vcenter col-md-3">YYYY</div>
	    ---- datatext variant ----
	    <div class="col-md-3">
	    <input id="textidname" name="textfieldname" class="form-control" type="text" value="Text">
	    </div>
	    --------------------------
	    <div class="col-md-3">
	    <select id="conditionidname"  name="conditionfieldname" class="form-control">
	    <option value="" >?</option>
	    <option value="Green" >Green</option>
	    <option value="Amber" selected>Amber</option>
	    <option value="Red" >Red</option>
	    </select >
	    </div>
	    </div>
	    */

	    var evidencedatalist = $("#EvidenceDataList_"+thisaccredcriteria_id).val();
	    var inspectiondatastring = "";
	    if (evidencedatalist != "") {
                // alert(evidencedatalist);
                inspectiondatastring = '<div class="row">'+"\n";
                    inspectiondatastring = inspectiondatastring+'<div class="vcenter col-md-4" style="background-color: '+headerback+'; color: white;">Information</div>'+"\n";
                    inspectiondatastring = inspectiondatastring+'<div class="vcenter col-md-3" style="background-color: '+headerback+'; color: white;">Club Input</div>'+"\n";
                    inspectiondatastring = inspectiondatastring+'<div class="vcenter col-md-3" style="background-color: '+headerback+'; color: white;">Inspector</div>'+"\n";
                    inspectiondatastring = inspectiondatastring+'<div class="vcenter col-md-2" style="background-color: '+headerback+'; color: white;">Condition</div>'+"\n";
                    inspectiondatastring = inspectiondatastring+'</div>';
                inspectiondatastring = inspectiondatastring+'<div class="row">'+"\n";
                    inspectiondatastring = inspectiondatastring+'<div class="vcenter col-md-4">&nbsp;</div>'+"\n";
                    inspectiondatastring = inspectiondatastring+'<div class="vcenter col-md-3">&nbsp;</div>'+"\n";
                    inspectiondatastring = inspectiondatastring+'<div class="vcenter col-md-3">&nbsp;</div>'+"\n";
                    inspectiondatastring = inspectiondatastring+'<div class="vcenter col-md-2">&nbsp;</div>'+"\n";
                    inspectiondatastring = inspectiondatastring+'</div>';

                var evidencedatalista = evidencedatalist.split(",");
                for (var di in evidencedatalista) {
                    var did = evidencedatalista[di];
                    inspectiondatastring = inspectiondatastring+'<div class="row">'+"\n";
                    inspectiondatastring = inspectiondatastring+'<div class="vcenter col-md-4">'+$("#accredcriteria_datafieldtitle_"+did).html()+'</div>'+"\n";

                    var dataidname = 'popupinspectiondataresult_'+did;
                    // alert($("#accredcriteria_dataquestiontype_"+did).val());
                    if ( $("#accredcriteria_dataquestiontype_"+did).val() == "Text" ) {
                        // Text Questions
                        inspectiondatastring = inspectiondatastring+'<div class="vcenter col-md-3">'+$("#accredcriteria_datatextresult_"+did).val()+'</div>'+"\n";
                        var inspectiondataresult = $("#accredcriteria_datatextresult_"+did).val();
                        if (($("#accredcriteria_inspectiondataresult_"+did).html() != "")&&($("#accredcriteria_inspectiondataresult_"+did).html() != "&nbsp;")) {
                                inspectiondataresult = $("#accredcriteria_inspectiondataresult_"+did).html();
                        }
                        /*
                         ---- datatext variant ----
                         <div class="col-md-3">
                         <input id="textidname" name="textfieldname" class="form-control" type="text" value="Text">
                         </div>
                         --------------------------
                         */
                        inspectiondatastring = inspectiondatastring+'<div class="col-md-3">'+"\n";
                        inspectiondatastring = inspectiondatastring+'<input id="'+dataidname+'" name="'+dataidname+'" class="form-control" type="text" value="'+inspectiondataresult+'">'+"\n";
                        inspectiondatastring = inspectiondatastring+'</div>'+"\n";
                    }
                    if ( $("#accredcriteria_dataquestiontype_"+did).val() == "Radio" ) {
                        // Radio Questions
                        inspectiondatastring = inspectiondatastring+'<div class="vcenter col-md-3">'+$("#accredcriteria_dataradioresult_"+did).val()+'</div>'+"\n";	 	    		
                        var dataqa = ($("#accredcriteria_dataradioquestions_"+did).val()).split(",");
                        var inspectiondataresult = $("#accredcriteria_dataradioresult_"+did).val();
                        if (($("#accredcriteria_inspectiondataresult_"+did).html() != "")&&($("#accredcriteria_inspectiondataresult_"+did).html() != "&nbsp;")) { 
                                inspectiondataresult = $("#accredcriteria_inspectiondataresult_"+did).html(); 
                        }
                        /*
                        ---- dataradio variant ----
                                    <div class="radio">
                                      <label class="radio">
                                        <input type="radio" name="survey" id="Radios1" value="Yes" checked>
                                        Yes
                                      </label>
                                    </div>
                        --------------------------
                        */
                        inspectiondatastring = inspectiondatastring+'<div class="col-md-3">'+"\n";
                        inspectiondatastring = inspectiondatastring+'<div id="'+dataidname+'div" >'+"\n";  
                        for (var dqi in dataqa) {
                        var dq = dataqa[dqi];
                        var dqbitsa = dq.split("=");
                        var checked = "";
                        if (inspectiondataresult == dqbitsa[0] ) { checked = "checked"; }	    	    	
                                inspectiondatastring = inspectiondatastring+'<label class="radio">'+"\n";
                                inspectiondatastring = inspectiondatastring+'<input type="radio" name="'+dataidname+'" value="'+dqbitsa[0]+'" '+checked+'>'+"\n";
                                inspectiondatastring = inspectiondatastring+dqbitsa[1]+"\n";
                                inspectiondatastring = inspectiondatastring+'</label>'+"\n";
                        }
                        inspectiondatastring = inspectiondatastring+'</div>'+"\n";
                        inspectiondatastring = inspectiondatastring+'</div>'+"\n";
                    }
                    if ( $("#accredcriteria_dataquestiontype_"+did).val() == "Checkbox" ) {
                        // CHECK - CHECKBOXES NOT YET TESTED
                        inspectiondatastring = inspectiondatastring+'<div class="vcenter col-md-3">'+$("#accredcriteria_datacheckboxresult_"+did).val()+'</div>'+"\n";
                        var dataqa = ($("#accredcriteria_datacheckboxquestions_"+did).val()).split(",");
                        var inspectiondataresult = $("#accredcriteria_datacheckboxresult_"+did).val();
                        if (($("#accredcriteria_inspectiondataresult_"+did).html() != "")&&($("#accredcriteria_inspectiondataresult_"+did).html() != "&nbsp;")) {
                                    inspectiondataresult = $("#accredcriteria_inspectiondataresult_"+did).html();
                        }
                        /*
                         ---- datacheckbox variant ----
                         <div class="col-md-3">
                         <input type=hidden id="checkboxfieldname" name="checkboxfieldname" value="">
                         <div id="checkboxfieldnamediv" >
                         <fieldset>
                         <div class="checkbox checkbox-primary">
                         <input id="checkboxfieldname_Green" type="checkbox" name="checkboxfieldname[Green]"  >
                         <label for="checkboxfieldname_Green">
                         Green
                         </label>
                         </div>
                         <div class="checkbox checkbox-primary">
                         <input id="checkboxfieldname_Amber" type="checkbox" name="checkboxfieldname[Amber]" checked >
                         <label for="checkboxfieldname_Amber">
                         Amber
                         </label>
                         </div>
                         </fieldset>
                         </div><!-- end #checkboxfieldnamediv -->
                         </div>
                         --------------------------
                         */
                        inspectiondatastring = inspectiondatastring+'<div class="col-md-3">'+"\n";
                        inspectiondatastring = inspectiondatastring+'<input type=hidden id="'+dataidname+'" name="'+dataidname+'" value="">'+"\n";
                        inspectiondatastring = inspectiondatastring+'<div id="'+dataidname+'div" >'+"\n";
                        inspectiondatastring = inspectiondatastring+'<fieldset>'+"\n";
                        for (var dqi in dataqa) {
                            var dq = dataqa[dqi];
                            var dqbitsa = dq.split("=");
                            var checked = "";
                            if (inspectiondataresult == dqbitsa[0] ) { checked = "checked"; }
                            inspectiondatastring = inspectiondatastring+'<div class="checkbox checkbox-primary">'+"\n";
                            inspectiondatastring = inspectiondatastring+'<input id="'+dataidname+'_'+dqbitsa[0]+'" type="checkbox" name="'+dataidname+'['+dqbitsa[0]+']" '+checked+' >'+"\n";
                            inspectiondatastring = inspectiondatastring+'<label for="checkboxfieldname_Amber">'+"\n";
                            inspectiondatastring = inspectiondatastring+dqbitsa[1]+"\n";
                            inspectiondatastring = inspectiondatastring+'</label>'+"\n";
                            inspectiondatastring = inspectiondatastring+'</div>'+"\n";
                        }
                        inspectiondatastring = inspectiondatastring+'</fieldset>'+"\n";
                        inspectiondatastring = inspectiondatastring+'</div>'+"\n";
                        inspectiondatastring = inspectiondatastring+'</div>'+"\n";       
                    }  

		    	
                    var condition = $("#accredcriteria_inspectiondatacondition_"+did).html();
                    // alert(condition);
                    var condition0 = "";
                    if ( condition != "") { condition0 = condition.charAt(0); } else { $condition0 = "&"; }
                    var nullselected = ""; if ( condition0 == "&" ) { nullselected = "selected"; } // &nsbp;
                    var greenselected = ""; if ( condition0 == "G" ) { greenselected = "selected"; }
                    var amberselected = ""; if ( condition0 == "A" ) { amberselected = "selected"; }		    	
                    var redselected = ""; if ( condition0 == "R" ) { redselected = "selected"; }		    	
                    inspectiondatastring = inspectiondatastring+'<div class="col-md-2">'+"\n";
                    inspectiondatastring = inspectiondatastring+'<select id="popupinspectiondatacondition_'+did+'"  name="popupinspectiondatacondition_'+did+'" class="rag form-control">'+"\n";
                    inspectiondatastring = inspectiondatastring+'<option value="" '+nullselected+' >?</option>'+"\n";
                    inspectiondatastring = inspectiondatastring+'<option value="Green" '+greenselected+' >Green</option>'+"\n";
                    inspectiondatastring = inspectiondatastring+'<option value="Amber" '+amberselected+' >Amber</option>'+"\n";
                    inspectiondatastring = inspectiondatastring+'<option value="Red" '+redselected+' >Red</option>'+"\n";
                    inspectiondatastring = inspectiondatastring+'</select >'+"\n";
                    inspectiondatastring = inspectiondatastring+'</div>'+"\n";
                    inspectiondatastring = inspectiondatastring+'</div>'+"\n";	
                }
	    }
	    $("#InspectionDataArea").html(inspectiondatastring);	    
            $("#accredinspectionpopup").show();
            $("#accredinspectionpopup").dialog("open");
            $("#accredinspectionpopup").dialog({ title: "Inspection Assessment - "+$("#accredcriteria_ref_"+thisaccredcriteria_id).val()+" "+$("#accredcriteria_section_"+thisaccredcriteria_id).val() });
	    RAGListener();	   
	});	
	
	$("#accredinspectionpopup").dialog({
		autoOpen: false,
		width: "75%",
		height: "700",
		overflow: "auto"
	});	

	$("#accredinspectionpopup").hide();	
	
	$('#InspectionUpdate' ).on('click', function(event) {
		// this routine takes the input from the inspectors popup, sends it to the server, and updates the checklist
	    var accredcriteria_schemeid = $("#popupaccredcriteria_schemeid").val();
	    var accredcriteria_clubid = $("#popupaccredcriteria_clubid").val();
	    var accredcriteria_id = $("#popupaccredcriteria_id").val();
	    var accredcriteria_inspectionresult = $("#popupaccredcriteria_inspectionresult").val();
	    var accredcriteria_inspectioncomments = $("#popupaccredcriteria_inspectioncomments").val();	
	    var evidencedataresultlist = "";
	    var evidencedatalist = $("#EvidenceDataList_"+accredcriteria_id).val();
	    var evidencedatalista = evidencedatalist.split(",");	    
	    var sep = "";
	    for (var di in evidencedatalista) {
	    	var did = evidencedatalista[di];
	    	var dataresult = "";
                // alert(did+" "+$("#accredcriteria_dataquestiontype_"+did).val()+" "+$('#popupinspectiondataresult_'+did).val());
                if ( $("#accredcriteria_dataquestiontype_"+did).val() == "Text" ) {
	    		dataresult = $('#popupinspectiondataresult_'+did).val();
	    		// alert(dataresult);
	    	}
	    	if ( $("#accredcriteria_dataquestiontype_"+did).val() == "Radio" ) {
	    		dataresult = $('input[name=popupinspectiondataresult_'+did+']:checked').val();
	    	}
	    	if ( $("#accredcriteria_dataquestiontype_"+did).val() == "Checkbox" ) {
	    		// CHECK to be added
	    	}	    	
	    	evidencedataresultlist = evidencedataresultlist+sep+dataresult;
	    	sep = "|";
	    	evidencedataresultlist = evidencedataresultlist+sep+$('#popupinspectiondatacondition_'+did).val();
	    }
	    // alert(evidencedataresultlist);
	    var accredcriteria_inspectionimagelist = $("#accredcriteria_inspectionimagelist").val();

		var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_accredinspectionmaintainin.php";
		// alert(sUrl);
	    $.ajax({
	        type: "POST", 
	        url: sUrl,
		     data: { 
		    	 ServiceId: JSServiceId(),	        	
		    	 DomainId: JSDomainId(),
		    	 ModeId: JSModeId(),	        	
		    	 PersonId: JSPersonId(),	
		    	 SessionId: JSSessionId(),		        	
		    	 LoginModeId: JSLoginModeId(),
		    	 MenuId: JSMenuId(),
                         OrgTypeId: JSOrgTypeId(),
		    	 OrgId: JSOrgId(),                  
		    	 accredcriteria_schemeid: accredcriteria_schemeid,
		    	 accredcriteria_clubid: accredcriteria_clubid,
		    	 accredcriteria_id: accredcriteria_id,
		    	 accredcriteria_inspectionresult: accredcriteria_inspectionresult,
		    	 accredcriteria_inspectioncomments: accredcriteria_inspectioncomments,
		    	 evidencedatalist: evidencedatalist,
		    	 evidencedataresultlist: evidencedataresultlist,
		    	 accredcriteria_inspectionimagelist: accredcriteria_inspectionimagelist,
		    },
	        success: function(data){
	        	// 0|Update Successful|$inaccredcriteria_schemeid|$inaccredcriteria_clubid|$inaccredcriteria_id
	        	// alert(data);
	        	var databits = data.split("|");
	        	$("#accredcriteria_inspectionresult_"+databits[4]).html($("#popupaccredcriteria_inspectionresult").val());
	        	if ($("#popupaccredcriteria_inspectionresult").val() == "Pass") {
	        		$("#accredcriteria_inspectionresult_"+databits[4]).css('background-color', passback);
	        	}
	        	if ($("#popupaccredcriteria_inspectionresult").val() == "Advisory") {
	        		$("#accredcriteria_inspectionresult_"+databits[4]).css('background-color', advisoryback);
	        	}
	        	if ($("#popupaccredcriteria_inspectionresult").val() == "Fail") {
	        		$("#accredcriteria_inspectionresult_"+databits[4]).css('background-color', failback);
                        }

	        	var inspectioncomments = $("#popupaccredcriteria_inspectioncomments").val();
	        	$("#accredcriteria_inspectioncomments_"+databits[4]).html(inspectioncomments);
	        	if ( inspectioncomments != "" ) { $("#accredcriteria_inspectioncommentsdiv_"+databits[4]).show(); }       	
	        	else {$("#accredcriteria_inspectioncommentsdiv_"+databits[4]).hide(); }
	        	        	
	        	// populate the checksheet with the update data values for inspector
	    	    var evidencedatalist = $("#EvidenceDataList_"+accredcriteria_id).val();
	    	    var evidencedatalista = evidencedatalist.split(",");	    
	    	    var sep = "";
	    	    for (var di in evidencedatalista) {
	    	    	var did = evidencedatalista[di];
	    	    	var dataresult = "";
                        // alert($("#accredcriteria_dataquestiontype_"+did).val());
                        if ( $("#accredcriteria_dataquestiontype_"+did).val() == "Text" ) {
	    	    		dataresult = $('#popupinspectiondataresult_'+did).val();
	    	    	}
	    	    	if ( $("#accredcriteria_dataquestiontype_"+did).val() == "Radio" ) {
	    	    		dataresult = $('input[name=popupinspectiondataresult_'+did+']:checked').val();
	    	    	}
	    	    	if ( $("#accredcriteria_dataquestiontype_"+did).val() == "Checkbox" ) {
	    	    		// CHECK to be added
	    	    	}
	    	    	$("#accredcriteria_inspectiondataresult_"+did).html(dataresult);
                    }
                    $("#accredinspectionpopup").dialog("close");
                    RefreshRectifications();
	        },
	        error: function(data, textStatus, jqXHR) {
	           //process error msg
	        	alert("error - "+jqXHR);
	        },
	    })  

	});	
	
	$('#InspectionCancel' ).on('click', function(event) {
		$("#accredinspectionpopup").dialog("close");
	});	
	
	// ===== Inspection Images ==============	
	$('.CriteriaInspectImageButton' ).on('click', function(event) {
		// ------ this button shows the impage upload popup -----
		thisselectid = $(this).attr("id");	
		// CriteriaInspectImageButton_accredcriteria_id
		var thisaccredcriteria_id = thisselectid.replace("CriteriaInspectImageButton_", "");
		var thisaccredcriteria_clubid = $("#accredcriteria_clubid").val();
		var thisaccredcriteria_schemeid = $("#accredcriteria_schemeid").val();
		var thisinspectionimagelist = $("#accredcriteria_inspectionimagelist_"+thisaccredcriteria_id).val();
		
	    $("#popupimageaccredcriteria_id").val(thisaccredcriteria_id);
		$("#popupimageaccredcriteria_clubid").val(thisaccredcriteria_clubid);
		$("#popupimageaccredcriteria_schemeid").val(thisaccredcriteria_schemeid);
		$("#popupimageaccredcriteria_inspectionimagelist").val(thisinspectionimagelist);
	    		
		var existingimages = 0;
		if (thisinspectionimagelist != "") {
			var inspectionimagelista = thisinspectionimagelist.split(",");
			existingimages = inspectionimagelista.length;
		} else {
			var inspectionimagelista = new Array();
		}

		for (var ii=0; ii<6; ii++) {
			if (ii < existingimages) {	
				var thisimage = inspectionimagelista[ii];
				// personalise the popup to reflect this specific evidence item
				// <input type=hidden id="InspectionImageName5_ImageUploadTo" name="InspectionImageName5_ImageUploadTo" value="AccredInspectionaccredscheme_id">
				// <input type=hidden id="InspectionImageName5_ImageUploadId" name="InspectionImageName5_ImageUploadId" value="accredcriteria_clubidaccredcriteria_id">				
				$('#InspectionImageName'+ii+"_ImageUploadTo").val("AccredInspection"+thisaccredcriteria_schemeid);
				$('#InspectionImageName'+ii+"_ImageUploadId").val(thisaccredcriteria_clubid+thisaccredcriteria_id);
				$('#InspectionImageName'+ii+"_imagename").val(thisimage);
				var imagesrc = JSDomainWWWURL()+'/domain_media/'+thisimage;
				$('#InspectionImageName'+ii+"_view").attr("src",imagesrc);
				$('#InspectionImageName'+ii+"_slimimageupdatebutton").html("Update Image");
				$('#InspectionImageName'+ii+"_slimimageremovebutton").show();
				$('#InspectionImageDiv'+ii).show();				
			}
			if (ii == existingimages) {	
				var thisimage = "";
				// personalise the popup to reflect this specific evidence item
				// <input type=hidden id="InspectionImageName5_ImageUploadTo" name="InspectionImageName5_ImageUploadTo" value="AccredInspectionaccredscheme_id">
				// <input type=hidden id="InspectionImageName5_ImageUploadId" name="InspectionImageName5_ImageUploadId" value="accredcriteria_clubidaccredcriteria_id">				
				$('#InspectionImageName'+ii+"_ImageUploadTo").val("AccredInspection"+thisaccredcriteria_schemeid);
				$('#InspectionImageName'+ii+"_ImageUploadId").val(thisaccredcriteria_clubid+thisaccredcriteria_id);
				$('#InspectionImageName'+ii+"_imagename").val(thisimage);
				$('#InspectionImageName'+ii+"_view").attr("src","../site_assets/NoImage_500x500.png");			
				$('#InspectionImageName'+ii+"_slimimageupdatebutton").html("Add Image");
				$('#InspectionImageName'+ii+"_slimimageremovebutton").hide();
				$('#InspectionImageDiv'+ii).show();				
			}
			if (ii > existingimages) {	
				$('#InspectionImageName'+ii+"_imagename").val("");
				$('#InspectionImageDiv'+ii).hide();
			}
		}
		$("#accredinspectionimagepopup").show();
		$("#accredinspectionimagepopup").dialog("open");		
	});	
	
	$("#accredinspectionimagepopup").dialog({
		autoOpen: false,
		width: "75%",
		height: "700",
		overflow: "auto"
	});	

	$("#accredinspectionimagepopup").hide();	
	
	$('#InspectionImageUpdate' ).on('click', function(event) {
		// this routine takes the input from the inspectors popup, sends it to the server, and updates the checklist
	    var accredcriteria_schemeid = $("#popupimageaccredcriteria_schemeid").val();
	    var accredcriteria_clubid = $("#popupimageaccredcriteria_clubid").val();
	    var accredcriteria_id = $("#popupimageaccredcriteria_id").val();	    
    	var imagelisttext = "";
    	var sep = "";
		for (var ii=0; ii<6; ii++) {
			var imagename = $("#InspectionImageName"+ii+"_imagename").val();
			imagelisttext = imagelisttext + sep + imagename;
			sep = ",";
		}
	    var accredcriteria_inspectionimagelist = imagelisttext;
	    $("#popupimageaccredcriteria_inspectionimagelist").val(imagelisttext);	
	    // alert(imagelisttext);
		var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_accredinspectionimagemaintainin.php";
		// alert(sUrl);
	    $.ajax({
	        type: "POST", 
	        url: sUrl,
		     data: { 
		    	 ServiceId: JSServiceId(),	        	
		    	 DomainId: JSDomainId(),
		    	 ModeId: JSModeId(),	        	
		    	 PersonId: JSPersonId(),	
		    	 SessionId: JSSessionId(),		        	
		    	 LoginModeId: JSLoginModeId(),
		    	 MenuId: JSMenuId(),
                         OrgTypeId: JSOrgTypeId(),
		    	 OrgId: JSOrgId(),  
		    	 accredcriteria_schemeid: accredcriteria_schemeid,
		    	 accredcriteria_clubid: accredcriteria_clubid,
		    	 accredcriteria_id: accredcriteria_id,
		    	 accredcriteria_inspectionimagelist: accredcriteria_inspectionimagelist,
		    },
	        success: function(data){
	        	// 0|Update Successful|$inaccredcriteria_schemeid|$inaccredcriteria_clubid|$inaccredcriteria_id|$accredcriteria_inspectionimagelist
	        	// alert(data);
	        	var databits = data.split("|");
	        	// $("#accredcriteria_inspectionresult_"+databits[4]).html($("#popupaccredcriteria_inspectionresult").val());
	        	var accredcriteria_inspectionimagelist = databits[5];	
	        	var imagelista = new Array();
	        	var imagecount = 0;
	        	if ( accredcriteria_inspectionimagelist != "" ) { 
	        		imagelista = accredcriteria_inspectionimagelist.split(",");
	        		imagecount = imagelista.length;
	        	}

	        	var imagelisttext = "";
	    		for (var ii=0; ii<6; ii++) {
	    			if (ii < imagecount) {
	    				var imagesrc = JSDomainWWWURL()+'/domain_media/'+imagelista[ii];
	    				var imagetext = '<div class="row"><div class="col-md-12"><img src="'+imagesrc+'" width="100%" ></div></div>';
	    				imagelisttext = imagelisttext + "<hr>" + imagetext;
	    			}
	    		}
	    		$("#accredcriteria_inspectionimagelistdiv_"+databits[4]).html(imagelisttext);
	    		$("#accredcriteria_inspectionimagelist_"+databits[4]).val(accredcriteria_inspectionimagelist);
	        	$("#accredinspectionimagepopup").dialog("close");	        	

	        },
	        error: function(data, textStatus, jqXHR) {
	           //process error msg
	        	alert("error - "+jqXHR);
	        },
	    })  

	});	
	
	$('#InspectionImageCancel' ).on('click', function(event) {
		$("#accredinspectionimagepopup").dialog("close");
	});	
	
	
	RAGListener();
	
});
  
function RAGListener() {	
	// alert("RAGListener");
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
		if ($(this).val() == "Advisory") { backcolor = warningback; textcolor = warningtext; }		
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
		if ($(this).val() == "Advisory") { backcolor = warningback; textcolor = warningtext; }		
		if ($(this).val() == "N") { backcolor = dangerback; textcolor = dangertext; }
		if ($(this).val() == "No") { backcolor = dangerback; textcolor = dangertext; }			
		if ($(this).val() == "Red") { backcolor = dangerback; textcolor = dangertext; }
		if ($(this).val() == "Fail") { backcolor = dangerback; textcolor = dangertext; }
		if ($(this).val() == "Poor") { backcolor = dangerback; textcolor = dangertext; }		
		if ($(this).val() == "NA") { backcolor = lightback; textcolor = "white"; }	
		$(this).css('background-color', backcolor);
		$(this).css('color', textcolor);
	});		
	
}


function Val2RAG ($val) {
    $vala = new Array("","Y","Yes","N","No","Green","Amber","Red","NA","Pending","Partial","Pass","Fail","Advisory");
    $raga = new Array("white","#b3ffd9","#b3ffd9","#ff9999","#ff9999","#b3ffd9","#ffd65c","#ff9999","white","white","#ffd65c","#b3ffd9","#ff9999","#ffd65c");
	$ragindex = array_search($val, $vala);
	if ($ragindex !== false) { return $raga[$ragindex]; }
	else { return "white";}
}

function RefreshRectifications() {
	// alert("RefreshRectifications");
	// var sourceida = new Array();	
	var sourcerefa = new Array();
	var evidencerequirementa = new Array();	
	var inspectionresulta = new Array();		
	var inspectioncommentsa = new Array();	
	// var rectificationtypeida = new Array();
	var duedatea = new Array();	
	var statusa = new Array();	
	
	$('.CriteriaInspectButton').each(function() {
		// "CriteriaInspectButton_accredcriteriaid"
		var thisid = $(this).attr("id");
		var accredcriteriaid = thisid.replace("CriteriaInspectButton_","");
		// sourceida.push(accredcriteriaid);	
		sourcerefa.push($("#accredcriteria_ref_"+accredcriteriaid).val());
		evidencerequirementa.push($("#accredcriteria_evidencerequirement_"+accredcriteriaid).html());		
		inspectionresulta.push($("#accredcriteria_inspectionresult_"+accredcriteriaid).html());
		var inspectioncomments = $("#accredcriteria_inspectioncomments_"+accredcriteriaid).html();
		inspectioncomments = inspectioncomments.replace("<h4>Inspection Comments</h4>","");
		inspectioncommentsa.push(inspectioncomments);
		// rectificationtypeida.push("");
		duedatea.push("2010-01-01");
		statusa.push("Open");
	});
	
	$("#simpletabletable_visitrectifications").DataTable().clear().draw(); 
  
	for (var ri = 0; ri < sourcerefa.length; ri++) { 
		if ((inspectionresulta[ri] == "Fail")||(inspectionresulta[ri] == "Advisory")) {
			$("#simpletabletable_visitrectifications").DataTable().row.add( [
				// sourceida[ri],				  
				sourcerefa[ri],
				evidencerequirementa[ri],				
				inspectionresulta[ri],
				inspectioncommentsa[ri],
 				// rectificationtypeida[ri],
				duedatea[ri],
				statusa[ri]
				] ).draw( false );
		} 
	}
}	


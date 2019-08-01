

// ==== FA1 Development ===============
var corsite_buildingdvtotcalc = 0;
var corsite_buildoutgdvtotcalc = 0;
if ( $( "#corsite_buildcomminternally" ).val() == "Y" ) { corsite_buildingdvtotcalc = corsite_buildingdvtotcalc + corsite_dispcommgdvsubtotalcalc; }
else { corsite_buildoutgdvtotcalc = corsite_buildoutgdvtotcalc + corsite_dispcommgdvsubtotalcalc; }
if ( $( "#corsite_buildresiinternally" ).val() == "Y" ) { corsite_buildingdvtotcalc = corsite_buildingdvtotcalc + corsite_dispresigdvsubtotalcalc + corsite_dispresiothergdvcalc; } 
else { corsite_buildoutgdvtotcalc = corsite_buildoutgdvtotcalc + corsite_dispresigdvsubtotalcalc + corsite_dispresiothergdvcalc;; }
$("#corsite_buildingdvtotcalc").val( FToN80(corsite_buildingdvtotcalc) );
$("#corsite_buildoutgdvtotcalc").val( FToN80(corsite_buildoutgdvtotcalc) );

// ==== Internal Build Perspective ===============

if (( $( "#corsite_buildcomminternally" ).val() == "Y" )||( $( "#corsite_buildresiinternally" ).val() == "Y" )) { 
	// calculate internal build costs if any internal build
	var corsite_buildincoststotcalc = 0;
	var corsite_buildinlandpurchase = N80ToF( $('#corsite_buildinlandpurchase').val() );
	var corsite_buildinagentsalepercent = P82ToF( $('#corsite_buildinagentsalepercent').val() );				
	var corsite_buildinagentsalecalc = (corsite_buildingdvtotcalc * corsite_buildinagentsalepercent) / 100;						
	var tranche1 = 0; var tranche2 = 0;
	if (corsite_buildinlandpurchase >= 250000) {
			tranche1 = 100000;
			tranche2 = corsite_buildinlandpurchase - 249999;				
	} else {
		if (corsite_buildinlandpurchase >= 150000) {
			tranche1 = corsite_buildinlandpurchase - 149999;		
		}
	}
	var corsite_buildinsdltcalc = (tranche1 * 0.02) + (tranche2 * 0.05) ;
	if ( corsite_buildinlandpurchase == 0 ) { var corsite_buildinsdltpercentcalc = 0; }
	else { var corsite_buildinsdltpercentcalc = (corsite_buildinsdltcalc / corsite_buildinlandpurchase)*100; }		
	var corsite_buildinlegals = N80ToF($('#corsite_buildinlegals').val());
	var corsite_buildinagentpurchasepercent = P82ToF( $('#corsite_buildinagentpurchasepercent').val() );
	var corsite_buildinagentpurchasecalc = (corsite_buildinlandpurchase * corsite_buildinagentpurchasepercent) / 100;	
	var corsite_buildinproffees = N80ToF($('#corsite_buildinproffees').val());
	var corsite_buildincilsqmcalc = corsite_buildintotalsqftcalc / 10.764;
	var corsite_buildincilcostpersqm = N80ToF( $('#corsite_buildincilcostpersqm').val() );
	var corsite_buildincilpercent = P82ToF( $('#corsite_buildincilpercent').val() );
	var corsite_buildincilcalc = corsite_buildincilsqmcalc * corsite_buildincilcostpersqm * corsite_buildincilpercent / 100;					
	var corsite_buildincil = N80ToF($('#corsite_buildincil').val());
	var corsite_buildin106 = N80ToF($('#corsite_buildin106').val());				
	var corsite_buildinother = N80ToF($('#corsite_buildinother').val());			
	var corsite_buildincostpersqft = N80ToF( $('#corsite_buildincostpersqft').val() );
	var corsite_buildinextrasqftpercent = P82ToF( $('#corsite_buildinextrasqftpercent').val() );			
	var corsite_buildintotalbuildcostcalc = corsite_buildintotalsqftcalc * corsite_buildincostpersqft * ( 100 + corsite_buildinextrasqftpercent ) / 100;				
	var corsite_buildincoststotcalc = corsite_buildinlandpurchase+corsite_buildinagentsalecalc+corsite_buildinsdltcalc+corsite_buildinlegals+corsite_buildinagentpurchasecalc+corsite_buildinproffees+corsite_buildincilcalc+corsite_buildincil+corsite_buildin106+corsite_buildinother+corsite_buildintotalbuildcostcalc;
	var corsite_buildinnpcalc = corsite_buildingdvtotcalc-corsite_buildincoststotcalc;
}


// ==== Developer Build Perspective ===============

if (( $( "#corsite_buildcomminternally" ).val() == "N" )||( $( "#corsite_buildresiinternally" ).val() == "N" )) { 

	var corsite_buildoutagentsalepercent = P82ToF( $('#corsite_buildoutagentsalepercent').val() );
	var corsite_buildoutagentsalecalc = (corsite_buildoutgdvtotcalc * corsite_buildoutagentsalepercent) / 100;
	var corsite_salelandvalue = N80ToF($('#corsite_salelandvalue').val());
	if ( corsite_buildoutgdvtotcalc == 0 ) { var corsite_salelandvaluepercentcalc = 0; }
	else { var corsite_salelandvaluepercentcalc = (corsite_salelandvalue / corsite_buildoutgdvtotcalc)*100; }					
	var tranche1 = 0; var tranche2 = 0;
	if (corsite_salelandvalue >= 250000) {
			tranche1 = 100000;
			tranche2 = corsite_salelandvalue - 249999;				
	} else {
		if (corsite_salelandvalue >= 150000) {
			tranche1 = corsite_salelandvalue - 149999;		
		}
	}
	var corsite_buildoutsdltcalc = (tranche1 * 0.02) + (tranche2 * 0.05) ;
	if ( corsite_salelandvalue == 0 ) { var corsite_buildoutsdltpercentcalc = 0; }
	else { var corsite_buildoutsdltpercentcalc = (corsite_buildoutsdltcalc / corsite_salelandvalue)*100; }				
	var corsite_buildoutlegals = N80ToF($('#corsite_buildoutlegals').val());
	var corsite_buildoutagentpurchasepercent = P82ToF( $('#corsite_buildoutagentpurchasepercent').val() );
	var corsite_buildoutagentpurchasecalc = (corsite_salelandvalue * corsite_buildoutagentpurchasepercent)/100;
	// var corsite_buildouttenantsurrender = N80ToF($('#corsite_buildouttenantsurrender').val());
	var corsite_buildoutother = N80ToF($('#corsite_buildoutother').val());
	var corsite_buildoutproffees = N80ToF($('#corsite_buildoutproffees').val());				
	var corsite_buildoutcilsqmcalc = corsite_buildouttotalsqftcalc / 10.764;
	var corsite_buildoutcilcostpersqm = N80ToF( $('#corsite_buildoutcilcostpersqm').val() );
	var corsite_buildoutcilpercent = P82ToF( $('#corsite_buildoutcilpercent').val() );	
	var corsite_buildoutcilcalc = corsite_buildoutcilsqmcalc * corsite_buildoutcilcostpersqm * corsite_buildoutcilpercent / 100;								
	var corsite_buildoutcil = N80ToF($('#corsite_buildoutcil').val());	
	var corsite_buildout106 = N80ToF($('#corsite_buildout106').val());					
	var corsite_buildoutcostpersqft = N80ToF( $('#corsite_buildoutcostpersqft').val() );
	var corsite_buildoutextrasqftpercent = P82ToF( $('#corsite_buildoutextrasqftpercent').val() );	
	var corsite_buildouttotalbuildcostcalc = corsite_buildouttotalsqftcalc * corsite_buildoutcostpersqft * ( 100 + corsite_buildoutextrasqftpercent ) / 100;			
	
	var corsite_buildouttotaldealcostbeforeintcalc = corsite_buildoutagentsalecalc + corsite_salelandvalue + corsite_buildoutsdltcalc + corsite_buildoutlegals + corsite_buildoutagentpurchasecalc + corsite_buildoutother + corsite_buildoutcilcalc + corsite_buildoutcil + corsite_buildout106 + corsite_buildoutproffees + corsite_buildouttotalbuildcostcalc;
	
	// Net Profit before Interest		
	var corsite_buildoutgpbeforeintcalc = corsite_buildoutgdvtotcalc - corsite_buildouttotaldealcostbeforeintcalc;	
	var corsite_buildoutgpbeforeintpercentcalc = (corsite_buildoutgpbeforeintcalc / corsite_buildouttotaldealcostbeforeintcalc)*100;
	
	var corsite_buildoutvatablepercent = P82ToF( $('#corsite_buildoutvatablepercent').val() );
	var corsite_buildoutvatratepercent = P82ToF( $('#corsite_buildoutvatratepercent').val() );
	var corsite_buildoutvatcalc = (corsite_salelandvalue * corsite_buildoutvatablepercent * corsite_buildoutvatratepercent)/10000;
	
	var corsite_buildoutfinancingltvpercent = P82ToF( $('#corsite_buildoutfinancingltvpercent').val() );		
	var corsite_buildoutfinancingnetborrowingcalc = (corsite_buildouttotaldealcostbeforeintcalc * corsite_buildoutfinancingltvpercent)/100;						
	var corsite_buildoutfinancingintratepercent = P82ToF( $('#corsite_buildoutfinancingintratepercent').val() );
	var corsite_buildoutfinancingduration = N80ToF( $('#corsite_buildoutfinancingduration').val() );
	var corsite_buildoutfinancingcostscalc = (corsite_buildouttotaldealcostbeforeintcalc * corsite_buildoutfinancingltvpercent * corsite_buildoutfinancingintratepercent) * corsite_buildoutfinancingduration / 120000;		
	
	var corsite_buildouttotaldealcostafterintcalc = corsite_buildouttotaldealcostbeforeintcalc + corsite_buildoutfinancingcostscalc;
	
	// Net Profit after Interest
	var corsite_buildoutnpafterintcalc = corsite_buildoutgdvtotcalc - corsite_buildouttotaldealcostafterintcalc;
	var corsite_buildoutnpafterintpercentcalc = (corsite_buildoutnpafterintcalc / corsite_buildouttotaldealcostbeforeintcalc)*100;

	// Net Profit after Interest and tax
	var corsite_buildouttaxratepercent = P82ToF( $('#corsite_buildouttaxratepercent').val() );
	var tax = (corsite_buildoutnpafterintcalc * corsite_buildouttaxratepercent)/100;
	
	var corsite_buildoutnpafterintandtaxcalc = corsite_buildoutnpafterintcalc - tax;
	var corsite_buildoutnpafterintandtaxpercentcalc = (corsite_buildoutnpafterintandtaxcalc / corsite_buildouttotaldealcostbeforeintcalc)*100;
	var corsite_buildoutnpcalc = corsite_salelandvalue;
		
}

// Net Profit after Interest
$("#corsite_buildoutnpafterintcalc").val( FToN80(corsite_buildoutnpafterintcalc) );		
$("#corsite_buildoutnpafterintpercentcalc").val( FToP82(corsite_buildoutnpafterintpercentcalc) );	

// Net Profit after Interest and tax
$("#corsite_buildouttaxratepercent").val( FToP82(corsite_buildouttaxratepercent) );	

$("#corsite_buildoutnpafterintandtaxcalc").val( FToN80(corsite_buildoutnpafterintandtaxcalc) );		
$("#corsite_buildoutnpafterintandtaxpercentcalc").val( FToP82(corsite_buildoutnpafterintandtaxpercentcalc) );
$("#corsite_buildoutnpcalc").val( FToN80(corsite_buildoutnpcalc) );	

var corsite_buildtotalgpcalc = corsite_buildinnpcalc + corsite_buildoutnpcalc;
$("#corsite_buildtotalgpcalc").val( FToN80(corsite_buildtotalgpcalc) );		
$("#corsite_buildtotalgpcalccopy").val( FToN80(corsite_buildtotalgpcalc) ); // sales page
// ==== Finance and Operations ===============

// ==== Surveys ========================================

var corsite_buildtotalplanningsubmissionfees = 0;
var corsite_buildtotalplanningproffees = 0;

var corsite_quoteready = $('#corsite_quoteready').val();

for (var key in corsurveyida) {
	if (corsurvey_corsurveycategoryid == "AppSubmission") { corsite_buildtotalplanningsubmissionfees = corsite_buildtotalplanningsubmissionfees + corsurvey_ph1quote; }
	else { corsite_buildtotalplanningproffees = corsite_buildtotalplanningproffees + corsurvey_ph1quote; }
}		
var corsite_buildtotalplanningsuccessfees = corsite_plgsurveytotalsuccessfeecalc;


	

// ==== Proceeds and Uplift on Financial Appraisal 1 ===========================================				
var corsite_buildtotalgrossproceeds = corsite_buildtotalgpcalc;
$("#corsite_buildtotalgrossproceeds").val( FToN80(corsite_buildtotalgrossproceeds) );	
var corsite_proposalphasestatus = $('#corsite_proposalphasestatus').val();
var corsite_proposalnewrag = $('#corsite_proposalnewrag').val();
if ( corsite_quoteready != "Y") { // override with default values
	if ( corsite_proposalphasestatus == "Ph2Completed") {
		if (( corsite_proposalnewrag == "Green")||( corsite_proposalnewrag == "Amber" )) {						
			Get_Data_Hash('cordefaultvalue',"corsite_buildtotalplanningproffees");
			if (GLOBALS["IOERROR"] == "1") { corsite_buildtotalplanningproffees = 0; } else { corsite_buildtotalplanningproffees = parseFloat(GLOBALS['cordefaultvalue_value']); }
			Get_Data_Hash('cordefaultvalue',"corsite_buildtotalplanningsubmissionfees");
			if (GLOBALS["IOERROR"] == "1") { corsite_buildtotalplanningsubmissionfees = 0; } else { corsite_buildtotalplanningsubmissionfees = parseFloat(GLOBALS['cordefaultvalue_value']); }
			Get_Data_Hash('cordefaultvalue',"corsite_buildtotalplanningsuccessfees");
			if (GLOBALS["IOERROR"] == "1") { corsite_buildtotalplanningsuccessfees = 0; } else { corsite_buildtotalplanningsuccessfees = parseFloat(GLOBALS['cordefaultvalue_value']); }	
		}							
	}
}
$("#corsite_buildtotalplanningproffees").val( FToN80(corsite_buildtotalplanningproffees) );	
$("#corsite_buildtotalplanningsubmissionfees").val( FToN80(corsite_buildtotalplanningsubmissionfees) );	
$("#corsite_buildtotalplanningsuccessfees").val( FToN80(corsite_buildtotalplanningsuccessfees) );			
var corsite_buildtotallegalcosts = N80ToF( $('#corsite_buildtotallegalcosts').val() );
$("#corsite_buildtotallegalcosts").val( FToN80(corsite_buildtotallegalcosts) );	
var corsite_buildtotalothercosts = N80ToF( $('#corsite_buildtotalothercosts').val() );
$("#corsite_buildtotalothercosts").val( FToN80(corsite_buildtotalothercosts) );	
var corsite_buildtotalothercosts = N80ToF( $('#corsite_buildtotalothercosts').val() );
$("#corsite_buildtotalothercosts").val( FToN80(corsite_buildtotalothercosts) );			
var corsite_buildtotalcapex = N80ToF( $('#corsite_buildtotalcapex').val() );
$("#corsite_buildtotalcapex").val( FToN80(corsite_buildtotalcapex) );			
var corsite_buildtotallossofebitda = N80ToF( $('#corsite_buildtotallossofebitda').val() );
$("#corsite_buildtotallossofebitda").val( FToN80(corsite_buildtotallossofebitda) );
var corsite_buildtotalnetproceeds = corsite_buildtotalgrossproceeds - corsite_buildtotalplanningproffees - corsite_buildtotalplanningsubmissionfees - corsite_buildtotalplanningsuccessfees - corsite_buildtotallegalcosts - corsite_buildtotalothercosts - corsite_buildtotalcapex - corsite_buildtotallossofebitda;
$("#corsite_buildtotalnetproceeds").val( FToN80(corsite_buildtotalnetproceeds) );


if ( $( "#corsite_proposaltype" ).val() == "Full Site" ) {
	$("#corsite_currfinlatestebitdacopy").val( FToN80(corsite_currfinlatestebitda) ); // synch with Specification Tab				
	var corsite_predictedebitdapercent = 100;
	$("#corsite_predictedebitdapercent").val( FToP82(corsite_predictedebitdapercent) );			
	var corsite_predictedebitdacalc = corsite_currfinlatestebitda;
	var corsite_ebitdamultiple = N82ToF( $('#corsite_ebitdamultiple').val() );
	$("#corsite_ebitdamultiple").val( FToN82(corsite_ebitdamultiple) );			
	var corsite_capvalebitdaimpactcalc = 0;
	$("#corsite_capvalebitdaimpactcalc").val( FToN80(corsite_capvalebitdaimpactcalc) );	
	var corsite_upliftcalc = corsite_buildtotalnetproceeds - corsite_arkgva
	$("#corsite_upliftcalc").val( FToN80(corsite_upliftcalc) );
	$("#corsite_upliftcalcexplanation").html("Full Site</br>Uplift = Net Proceeds - GVA");
	$('#EBITDAReduction').hide(); 
}			
if ( $( "#corsite_proposaltype" ).val() == "Part Site" ) {
	$("#corsite_currfinlatestebitdacopy").val( FToN80(corsite_currfinlatestebitda) ); // synch with Specification Tab				
	var corsite_predictedebitdapercent = 100;
	$("#corsite_predictedebitdapercent").val( FToP82(corsite_predictedebitdapercent) );			
	var corsite_predictedebitdacalc = corsite_currfinlatestebitda;
	var corsite_ebitdamultiple = N82ToF( $('#corsite_ebitdamultiple').val() );
	$("#corsite_ebitdamultiple").val( FToN82(corsite_ebitdamultiple) );			
	var corsite_capvalebitdaimpactcalc = 0;
	$("#corsite_capvalebitdaimpactcalc").val( FToN80(corsite_capvalebitdaimpactcalc) );	
	var corsite_upliftcalc = corsite_buildtotalnetproceeds;
	$("#corsite_upliftcalc").val( FToN80(corsite_upliftcalc) );
	$("#corsite_upliftcalcexplanation").html("Part Site</br>Uplift = Net Proceeds");
	$('#EBITDAReduction').hide(); 
}		
if ( $( "#corsite_proposaltype" ).val() == "Split Site" ) {
	$("#corsite_currfinlatestebitdacopy").val( FToN80(corsite_currfinlatestebitda) ); // synch with Specification Tab				
	var corsite_predictedebitdapercent = P82ToF( $('#corsite_predictedebitdapercent').val() );
	$("#corsite_predictedebitdapercent").val( FToP82(corsite_predictedebitdapercent) );			
	var corsite_predictedebitdacalc = corsite_currfinlatestebitda * corsite_predictedebitdapercent / 100;
	$("#corsite_predictedebitdacalc").val( FToN80(corsite_predictedebitdacalc) );	
	var corsite_ebitdamultiple = N82ToF( $('#corsite_ebitdamultiple').val() );
	$("#corsite_ebitdamultiple").val( FToN82(corsite_ebitdamultiple) );			
	var corsite_capvalebitdaimpactcalc = (corsite_currfinlatestebitda - corsite_predictedebitdacalc) * corsite_ebitdamultiple;
	$("#corsite_capvalebitdaimpactcalc").val( FToN80(corsite_capvalebitdaimpactcalc) );	
	var corsite_upliftcalc = corsite_buildtotalnetproceeds - corsite_capvalebitdaimpactcalc ;
	$("#corsite_upliftcalc").val( FToN80(corsite_upliftcalc) );
	$("#corsite_upliftcalcexplanation").html("Split Site</br>Uplift = Net Proceeds - CapVal EBITDA Impact");
	$('#EBITDAReduction').show(); 
}
	


		


$(document).ready( function() { 
	
// This routine works for both sidebars and webpages 
	
/*

Key
(*)+(+)				Page
(*)+(**)		Database
(*)+(**)+(***)	Composer
(o)				Imported Plugin html

**	<!-- FSSTART_1 -->
+	<section style="background-color: White; padding-top: 10px; padding-bottom: 10px">
***	<hr class="fshr" style="border-top: 3px solid Navy; margin-bottom: 5px;">
***	<button id="fssettings_1" type="button" class="fssettings btn btn-primary" title="settings"><span><i class="fa fa-cog"></i></span></button>
***	<button id="fsmovedown_1" type="button" class="fsmovedown btn btn-secondary" title="move down"><span><i class="fa fa-angle-double-down"></i></span></button>
***	<button id="fsmoveup_1" type="button" class="fsmoveup btn btn-secondary" title="move up"><span><i class="fa fa-angle-double-up"></i></span></button>
***	<button id="fsdelete_1" type="button" class="fsdelete btn btn-danger" title="delete"><span><i class="fa fa-remove"></i></span></button>&nbsp;&nbsp;
**	<span id="fstitle_1" class="fstitle" style="color:navy">Formatted Section - 1 ( Type[ImageWithTextA], Header[No], BackgroundColor[White], PaddingTop[0], PaddingBottom[0] )</span>
***	<hr class="fshr" style="border-top: 1px solid #e6e6e6; margin-top: 4px; margin-bottom: 4px;">
**	<!-- /FSSTART -->	
*	<!-- Start ImageWithTextA_1 -->
*	<div class="row">
*		<div class="col-md-6">
*			<img class="img-responsive editableimg" src="../site_assets/750x450.png" alt="">
*		</div>
*		<div class="col-md-6">
*			<h2 class="editabletext">Topic Heading</h2>
*			<div class="editabletextarea"> 
*				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed voluptate nihil eum consectetur similique? Consectetur, quod, incidunt, harum nisi dolores delectus reprehenderit voluptatem perferendis dicta dolorem non blanditiis ex fugiat.</p>
*				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe, magni, aperiam vitae illum voluptatum aut sequi impedit non velit ab ea pariatur sint quidem corporis eveniet. Odit, temporibus reprehenderit dolorum!</p>
*				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, consequuntur, modi mollitia corporis ipsa voluptate corrupti eum ratione ex ea praesentium quibusdam? Aut, in eum facere corrupti necessitatibus perspiciatis quis?</p>		
*			</div>
*		</div>
*	</div>
*	<!-- End ImageWithTextA_1 -->	
**	<!-- FSEND_1 -->
+	</section>
**	<!-- /FSEND -->	

	Parallax Note: webpagecomposer.js  also modifies bg-holder to set specific height

**	<!-- FSSTART_2 -->
+	</div><!-- close bootstrap container -->
***	<hr class="fshr" style="border-top: 3px solid Navy; margin-bottom: 5px;">
***	<button id="fssettings_2" type="button" class="fssettings btn btn-primary" title="settings"><span><i class="fa fa-cog"></i></span></button>
***	<button id="fsmovedown_2" type="button" class="fsmovedown btn btn-secondary" title="move down"><span><i class="fa fa-angle-double-down"></i></span></button>
***	<button id="fsmoveup_2" type="button" class="fsmoveup btn btn-secondary" title="move up"><span><i class="fa fa-angle-double-up"></i></span></button>
***	<button id="fsdelete_2" type="button" class="fsdelete btn btn-danger" title="delete"><span><i class="fa fa-remove"></i></span></button>&nbsp;&nbsp;
**	<span id="fstitle_2" class="fstitle" style="color:navy">Formatted Section - 2 ( Type[Parallax], PaddingTop[0], PaddingBottom[0] )</span>
***	<hr class="fshr" style="border-top: 1px solid #e6e6e6; margin-top: 4px; margin-bottom: 4px;">
**	<!-- /FSSTART -->
*	<!-- Parallax_1 -->
*	<div class="editableimg bg-holder" style="background-image: url(&quot;../site_assets/1024x768.png&quot;); height: 768px;" data-width="1024" data-height="768">
*		<div class="content intro">
*			<h1 class="editabletext">Heading</h1>
*			<p class="editabletext">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
*			<div class="cta">
*				<a href="#" class="editablelink btn-cta">Read More</a>
*			</div>
*		</div>
*	</div>
*	<!-- End Parallax_1 -->
**	<!-- FSEND_2 -->
+	<div class="container"><!-- re-open bootstrap container -->
**	<!-- /FSEND -->


**	<!-- FSSTART_3 -->
***	<hr class="fshr" style="border-top: 3px solid Navy; margin-bottom: 5px;">
***	<button id="fssettings_2" type="button" class="fssettings btn btn-primary" title="settings"><span><i class="fa fa-cog"></i></span></button>
***	<button id="fsmovedown_2" type="button" class="fsmovedown btn btn-secondary" title="move down"><span><i class="fa fa-angle-double-down"></i></span></button>
***	<button id="fsmoveup_2" type="button" class="fsmoveup btn btn-secondary" title="move up"><span><i class="fa fa-angle-double-up"></i></span></button>
***	<button id="fsdelete_2" type="button" class="fsdelete btn btn-danger" title="delete"><span><i class="fa fa-remove"></i></span></button>&nbsp;&nbsp;
**	<span id="fstitle_2" class="fstitle" style="color:navy">Formatted Section - 2 ( Type[PluginPanels_1], PaddingTop[0], PaddingBottom[0] )</span>
***	<hr class="fshr" style="border-top: 1px solid #e6e6e6; margin-top: 4px; margin-bottom: 4px;">
**	<!-- /FSSTART -->
*   <!-- Start PluginPanels_1 -->
*   <div class="row">
*   	<div class="col-md-12">
*   		<div class="panel panel-default">
*   			<div class="panel-heading">
*   				<h4 class="editabletext">Topic One</h4>
*   			</div>
*   			<div class="panel-body">
*   				<div class="editablepluginarea" style="height:100px; width:100%; border: 2px dotted navy; text-align: center; padding-top: 40px;" >
*   					<div class="editablepluginareamarker" >
*   						Plugin Area ========= REPLACED BY NEXT LINE =============  
*   						<p class="ItemList"><img src="../site_assets/event.gif" /> [EventList:type=event;category=all;sortdate=desc;show=full;max=10]</p>  
*   					</div>		
*   				</div>
*   			</div>
*   		</div>
*   	</div>
*   </div>
*   <!-- End PluginPanels_1 -->
**	<!-- FSEND_3 -->
**	<!-- /FSEND -->
*

	
*/	
	composermode = $("#composermode").val();
	// alert(composermode);
	
	// ====== formatted section selection popup controls =======

	if ( composermode == "webpage") {
		$("#formattedsectionpopup").dialog({
			autoOpen: false,
			width: "95%",
			height: "auto",
			overflow:"auto"
		});
	}
	if ( composermode == "sidebar") {	
		$("#formattedsectionpopup").dialog({
			autoOpen: false,
			width: "50%",
			height: "75%",
			overflow:"auto"
		});			
		$("#composerhtml").css('width', '35%');
		$("#composerhtml").css('height', 'auto');
		$('#composerhtml').css('border-width', '2');
		$('#composerhtml').css('border', '4px solid silver');
	}
	
	$("#formattedsectionsettingspopup").dialog({
		autoOpen: false,
		width: "50%",
		height: "auto",
		overflow: "auto"
	});		
	
	$("#formattedpluginpopup").dialog({
		autoOpen: false,
		width: "45%",
		height: "auto",
		overflow:"auto"
	});	
		
	$('.formattedpluginsettingspopup').each(function() {
		var pspid = $(this).attr("id");
		// alert(pspid);
		$("#"+pspid).dialog({
			autoOpen: false,
			width: "40%",
			height: "auto",
			overflow: "auto"
		});	
	});	
	
	$("#formattedsidebarpopup").dialog({
		autoOpen: false,
		width: "95%",
		height: "auto",
		overflow:"auto"
	});		
	
	var thisformattedsectiontype = "";
	var thisformattedsectionheader = "";
	var thisformattedsectionbackcolor = "";
	var thisformattedsectioncols = "";
	var thisformattedsectionrows = "";
	var thisformattedsectionpaddingtop = "";	
	var thisformattedsectionpaddingbottom = "";	
	
	thispid = "";	
	thispnumstring = "";
	thispparmlist = "";
			
	var editabletextelementfired = "";
	var editabletextareaelementfired = "";	
	var editabletextlinkelementfired = "";
	var editabletabelementfired = "";	
	
	// alert("composerformattedsectionpopup");
	$("#formattedsectionpopup").hide();
	// $("#formattedsectionsettingspopup").hide();
	$("#parallaxsettingspopup").hide();
	
	$('.formattedsectiondisplay').css('border-width', '2');
	$('.formattedsectiondisplay').css('border', '4px solid silver');	
	$('.formattedsectiondisplay').css('padding', '10px');
	$('.formattedselectionbutton').css('background-color', "#007acc");	
	$('.formattedselectionbutton').css('color', "white");
	$('.formattedselectionbutton').css('padding', "4px");	
	
	$('.formattedselectionbutton').on('click', function() {	
		thisformattedsectiontype = this.id;
		thisformattedsectionheader = "";
		thisformattedsectionbackcolor = "";
		thisformattedsectioncols = "";
		thisformattedsectionrows = "";	
		var sectionparmstext = "("; 		
		sectionparmstext = sectionparmstext+" Type["+thisformattedsectiontype+"]";
		var jqid= '#'+thisformattedsectiontype+'Header'; 
		if ( $(jqid).length ) { 
			if ( $(jqid).is(':checked') ) { sectionparmstext = sectionparmstext+", Header[Yes]"; } 
			else { sectionparmstext = sectionparmstext+", Header[No]"; }
		}
		var jqid= '#'+thisformattedsectiontype+'BackColor'; 
		if ( $(jqid).length ) { 
			thisformattedsectionbackcolor = $(jqid).val();
			sectionparmstext = sectionparmstext+", BackgroundColor["+thisformattedsectionbackcolor+"]";
		}
		var jqid= '#'+thisformattedsectiontype+'Cols'; 
		if ( $(jqid).length ) { 
			thisformattedsectioncols = $(jqid).val();
			sectionparmstext = sectionparmstext+", Cols["+thisformattedsectioncols+"]";
		}	
		var jqid= '#'+thisformattedsectiontype+'Rows'; 
		if ( $(jqid).length ) { 
			thisformattedsectionrows = $(jqid).val();
			sectionparmstext = sectionparmstext+", Rows["+thisformattedsectionrows+"]";
		}
		sectionparmstext = sectionparmstext+", PaddingTop[20]";
		sectionparmstext = sectionparmstext+", PaddingBottom[20]";
	
		sectionparmstext = sectionparmstext+" )";
		if ( sectionparmstext == "()" ) { sectionparmstext = ""; }
		
		
		// alert(thisformattedsectiontype+"|"+thisformattedsectionheader+"|"+thisformattedsectioncols+"|"+thisformattedsectionrows);
		
		var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_formattedsectionprovider.php";
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
		    	 formattedsectiontype: thisformattedsectiontype,
		    	 formattedsectionheader: thisformattedsectionheader,
		    	 formattedsectioncols: thisformattedsectioncols,		    	 
		    	 formattedsectionrows: thisformattedsectionrows		    	 
		     },
	        success: function(data){
	        	// alert(data);
	        	var insertedsection = data;
	    		$("#formattedsectionpopup").dialog("close");
	    		var oldcontent = $('#composerhtml').html();

	    		var highestfsidnum = 0;
	    		var oldcontentfsa = oldcontent.split('fssettings');
	    		for (var fsi in oldcontentfsa) {
	    			if (fsi != 0) {
	    				var fsastring = oldcontentfsa[fsi];
	    				var oldcontentfsb = fsastring.split('"');
	    				var oldcontentfsd = oldcontentfsb[0].split('_');
	    				// alert(Number(oldcontentfsd[1])+" vs "+highestfsidnum);
	    				if (Number(oldcontentfsd[1]) > highestfsidnum) { highestfsidnum = Number(oldcontentfsd[1]); }
	    			}
	    		}

	    		nextfsidnum = highestfsidnum + 1;
	    		nextfsidnumtxt = nextfsidnum.toString();
	    		
	    		if (thisformattedsectiontype == "Slider") {
	    			insertedsection = insertedsection.replace(/body-carousel/g, "body-carousel-"+nextfsidnumtxt);
	        	}
	    		insertedsection = insertedsection.replace(/Plugin Area/g, '<button type="button" class="btn btn-warning" title="Add Plugin">Add Plugin</button>');
	    		
	    		// replace marker with downloaded template
	    		var oldcontenta = oldcontent.split('<div class="markerdiv"></div>');
	    		
	    		var s0 = '<!-- FSSTART_'+nextfsidnumtxt+' -->'+"\n"; 
	    		var s1 = '<hr class="fshr" style="border-top: 3px solid Navy; margin-bottom: 5px;">'+"\n"; 
	    		var s2 = '<button id="fssettings_'+nextfsidnumtxt+'" type="button" class="fssettings btn btn-primary" title="settings"><span><i class="fa fa-cog"></i></span></button>'+"\n";
	    		var s3 = '<button id="fsmovedown_'+nextfsidnumtxt+'" type="button" class="fsmovedown btn btn-secondary" title="move down"><span><i class="fa fa-angle-double-down"></i></span></button>'+"\n";
	    		var s4 = '<button id="fsmoveup_'+nextfsidnumtxt+'" type="button" class="fsmoveup btn btn-secondary" title="move up"><span><i class="fa fa-angle-double-up"></i></span></button>'+"\n";
	    		var s5 = '<button id="fsdelete_'+nextfsidnumtxt+'" type="button" class="fsdelete btn btn-danger" title="delete"><span><i class="fa fa-remove"></i></span></button>&nbsp;&nbsp;'+"\n"  		
	    		var s6 = '<span id="fstitle_'+nextfsidnumtxt+'" class="fstitle" style="color:navy">Formatted Section - '+nextfsidnumtxt+" "+sectionparmstext+"</span>\n"; 
	    		var s7 = '<hr class="fshr" style="border-top: 1px solid #e6e6e6; margin-top: 4px; margin-bottom: 4px;">'+"\n"; 	    		
	    		var s8 = '<!-- /FSSTART -->'+"\n";

	    		var e0 = '<!-- FSEND_'+nextfsidnumtxt+' -->'+"\n"; 	 		
	    		var e1 = '<!-- /FSEND -->'+"\n";	    		
	    		
	    		var newcontent =  oldcontenta[0] +"\n" + s0 + s1 + s2 + s3 + s4 + s5 + s6 + s7 + s8 + insertedsection + e0 + e1 + oldcontenta[1] ;	    		
	    		$('#composerhtml').html(newcontent);
	    		
	    		if (thisformattedsectiontype == "Slider") {
	    	         $('.bodycarousel').carousel({
	    	        	 interval: 3000, cycle: false
	    	         })
	    	         
	    	         $('.bodycarousel .carousel-indicators').click(function(e) {
	    	        	 $("#body-carousel-"+nextfsidnumtxt).carousel('next');
    	        	});
	    	         
	        	}
	    		
	    		ComposerListeners();
	        }
	    })  

	});	
	
	$('.formattedpluginselectionbutton').on('click', function() {	
		// Plugin_Tyyyymmddhhmmss
		thisformattedpluginref = this.id;
		var pida = thisformattedpluginref.split('_');
		thispid = pida[1];
		thispname = $('#'+thisformattedpluginref+"_Name").val();
		thispparmlist = $('#'+thisformattedpluginref+"_Parmdefaults").val();
		thispimage = $('#'+thisformattedpluginref+"_Image").val();
		
		$("#formattedpluginpopup").dialog("close");
		// <div class="editablepluginarea" style="height:100px; width:100%; border: 2px dotted navy; text-align: center; padding-top: 40px;" >
		$( "#pluginareaselected" ).parent().css('height', 'auto');
		$( "#pluginareaselected" ).parent().css('padding-top', '0px');
		$( "#pluginareaselected" ).parent().css('text-align', 'left');		
		
		$( "<div>PluginMarker</div>" ).insertAfter( "#pluginareaselected" );
		$("#pluginareaselected").remove();
		var oldcontent = $('#composerhtml').html();
		
		var highestpidnum = 0;
		var oldcontentpa = oldcontent.split('psettings');
		for (var pi in oldcontentpa) {
			if (pi != 0) {
				var pastring = oldcontentpa[pi];
				var oldcontentpb = pastring.split('"');
				var oldcontentpd = oldcontentpb[0].split('_');
				// alert(Number(oldcontentpd[1])+" vs "+highestpidnum);
				if (Number(oldcontentpd[1]) > highestpidnum) { highestpidnum = Number(oldcontentpd[1]); }
			}
		}

		nextpidnum = highestpidnum + 1;
		nextpidnumtxt = nextpidnum.toString();		

		// replace marker with plugin image
		var oldcontenta = oldcontent.split('<div>PluginMarker</div>');		
		// [ItemListA:Category=Article_All;Date=Past;SortBy=Date;SortSeq=Asc;Show=Full;Max=10]
		
		var insertedsection = '<p id="pparms_'+nextpidnumtxt+'" class="Plugin '+thispid+'"    style="word-break: break-all;"     ><img src="'+JSDomainWWWURL()+'/domain_style/'+thispimage+'" width="100%" />['+thispid+':'+thispparmlist+']</p>'+"\n";   
		var embeddedhtml = '<input type=hidden id="pembed_'+nextpidnumtxt+'" name="pembed_'+nextpidnumtxt+'" value="">'+"\n";   
		
		var s1 = '<!-- PSTART_'+nextpidnumtxt+' -->'+"\n"; 
		var s2 = '<button id="psettings_'+nextpidnumtxt+'" type="button" class="psettings btn btn-info" title="settings"><span><i class="fa fa-cog"></i></span></button>'+"\n";	
		var s3 = '<button id="pdelete_'+nextpidnumtxt+'" type="button" class="pdelete btn btn-danger" title="delete"><span><i class="fa fa-remove"></i></span></button>&nbsp;&nbsp;'+"\n"; 				
		var s4 = '<span id="ptitle_'+nextpidnumtxt+'" class="ptitle" style="color:navy">Plugin - '+nextpidnumtxt+" - "+thispname+"</span>\n";
		
		var s5 = '<!-- Formatted Plugin - '+nextpidnumtxt+' -->'+"\n"; 	    		
//		var s6 = '<hr class="phr" style="border-top: 1px solid #e6e6e6; margin-top: 4px; margin-bottom: 4px;">'+"\n"; 	    		
		var s7 = '<!-- /PSTART -->'+"\n";
		var e0 = '<!-- PEND_'+nextpidnumtxt+' -->'+"\n"; 	 		
		var e1 = '<!-- /PEND -->'+"\n";	    		
		
		var newcontent =  oldcontenta[0] + s1 + s2 + s3 + s4 + s5 + s7 + insertedsection + embeddedhtml  + e0 + e1 + oldcontenta[1] ;	    		
		$('#composerhtml').html(newcontent);
		
		ComposerListeners();

	});		
	
	// ====== composer controls =================
	if ( composermode == "webpage") {
		if ( $("#composerhtml").html().includes('<!-- FSSTART_') ) { } else { $("#composerhtml").html(""); }
	}	
	if ( composermode == "sidebar") {	
		if ( $("#composerhtml").html().includes('<!-- FSSTART_') ) { } else { 
			if ( $("#composerhtml").html().includes('<!-- Empty Sidebar -->') ) { } else { 		
				$("#composerhtml").html(""); 
			}
		}		
	}
	
	activeelement = "";
	activeparentelement = "";
	
	hovercolor = "#4286f4";
	editabletextcolor = "";
	editabletextareacolor = "";
	editableimgcolor = "";
	
	// ========= Composer Page level controls ===============		
	
	$('#composeraddsectionbutton').on('click', function() {
		var oldcontent = $('#composerhtml').html();		
		if ( oldcontent.includes('<!-- Empty Page -->') ) { oldcontent = ""; }
		if ( oldcontent.includes('<!-- Empty Sidebar -->') ) { oldcontent = ""; }
		$("#composerhtml").html(oldcontent+'<div class="markerdiv"></div>');
		$("#formattedsectionpopup").dialog("open");
		$("#formattedsectionpopup").css({height: $(window).height()*.75, overflow:"auto"});
		$("#formattedsectionpopup").parent().css('position', 'fixed');		
		$("#formattedsectionpopup").parent().css("top", ( $(window).height() - $("#formattedsectionpopup").height() ) / 2  + "px");
		$("#formattedsectionpopup").parent().css("left", ( $(window).width() - $("#formattedsectionpopup").width() ) / 2 + "px");			
		$(".bg-holder").css({height:"768px"}); // parallax option within formattedsectionpopup
	});	
	
	if ( composermode == "webpage") {
		$('#composerpreviewbutton').on('click', function() {
			var webpage_templatename = $('#webpage_templatename').val();
			var webpage_sidebarname = $('#webpage_sidebarname').val();
			var webpage_html = $('#composerhtml').html();
			var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_webpagepreviewpopup.php";
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
			    	 webpage_templatename: webpage_templatename,
			    	 webpage_sidebarname: webpage_sidebarname,
			    	 webpage_html: webpage_html
			     },
		        success: function(data){
		            var win = window.open();
		            try {
		                win.focus();
			            win.document.write(data);
			            win.document.close();	                 
		            }
		            catch (e) {
		                alert("Pop-up Blocker is enabled! Please add this site to your exception list or disable the Pop-up blocker.");
		            }
		        }
		    })  
		});
		
		$('#composersubmitbutton').on('click', function() {
			var htmlcontent = $('#composerhtml').html();
			$('#webpage_html').val(Composer2DBHTML(htmlcontent));
			$('#webpage_pluginlist').val(Composer2Pluginlist(htmlcontent));
			$("#webpagecomposerin").submit();
		});	
	}
	
	if ( composermode == "sidebar") {
		$('#composerpreviewbutton').on('click', function() {
			var sidebar_name = $('#sidebar_name').val();
			var oldcontent = $('#composerhtml').html();
			// alert(oldcontent);
			var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_sidebarpreviewpopup.php";
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
			    	 sidebar_name: sidebar_name,
			    	 sidebar_html: oldcontent
			     },
		        success: function(data){
		            var win = window.open();
		            try {
		                win.focus();
			            win.document.write(data);
			            win.document.close();	                 
		            }
		            catch (e) {
		                alert("Pop-up Blocker is enabled! Please add this site to your exception list or disable the Pop-up blocker.");
		            }
		        }
		    })  
		});
		
		$('#composersubmitbutton').on('click', function() {
			var htmlcontent = $('#composerhtml').html();
			$('#sidebar_html').val(Composer2DBHTML(htmlcontent));
			$('#sidebar_pluginlist').val(Composer2Pluginlist(htmlcontent));			
			$("#sidebarcomposerin").submit();
		});	
	}
		
	// ========= Composer Section level controls and popups ===============	
	
	
	$('#formattedsectionsettingsupdatebutton').on('click', function() {
		// Formatted Section - 1 ( Type[PluginsPlain], Cols[2], PaddingTop[0], PaddingBottom[0] )
		$("#formattedsectionsettingspopup").dialog("close");
		var pbits = $("#formattedsectionid").val().split('_');
		var oldcontent = $('#composerhtml').html();		
		// alert('|Formatted Section - '+pbits[1]+"|");
		var oldcontenta = oldcontent.split('Formatted Section - '+pbits[1]+" ");
		var oldcontentb = oldcontenta[1].split('</span>');
		var oldsettings = oldcontentb[0];
		oldsettings = oldsettings.replace("( ", "");
		oldsettings = oldsettings.replace(" )", "");
		var newsettings = SettingsEditor2Settings(oldsettings);
		var newcontent = oldcontent.replace(oldsettings, newsettings);
		$('#composerhtml').html(newcontent);
		ComposerListeners();
	});	
	
	$('#formattedsectionsettingscancelbutton').on('click', function() {
		$("#formattedsectionsettingspopup").dialog("close");
	});	
	
	$('.formattedpluginsettingsupdatebutton').on('click', function() {
		// Plugin_T20181011234236_Settings_Button
		var psbid = $(this).attr("id");
		var ppid = psbid.replace("_Button", "_Popup");		
		var oldparmstringfull = $("#pparms_"+thispnumstring).html();
		var pbits = oldparmstringfull.split("[");
		var qbits = pbits[1].split("]");
		var oldimagepart = pbits[0];
		var oldparmstring = qbits[0];
		// alert(oldparmstring);
		var newparmstring = "";	
		// ItemListA:Category=Event_All;Date=Past;SortBy=Date;SortSeq=Asc;Show=Full;Max=10
		// InstagramWidget:Source=EmbeddedHTML;
		// T20181013012946_EmbeddedHTML
		if ( oldparmstring.includes("Source=EmbeddedHTML") ) {
			// alert($("#"+thispid+"_EmbeddedHTML").val());			
			var encodeembed = EnCodeEmbed($("#"+thispid+"_EmbeddedHTML").val());
			$("#pembed_"+thispnumstring).val(encodeembed);	
		} else {
			bits1 = oldparmstring.split(":");
			newparmstring = newparmstring + bits1[0] + ":";
			bits2 = bits1[1].split("]");
			bits3 = bits2[0].split(";");
			for (i in bits3) {
				if (bits3[i].indexOf("=") !=-1) {
					bits4 = bits3[i].split("=");
					// alert(thispid+"_"+bits4[0]+"   "+$('#'+thispid+"_"+bits4[0]).val());
					var newparmval = $('#'+thispid+"_"+bits4[0]).val();
					newparmstring = newparmstring + bits4[0] + "=" + newparmval + ";";
				}
			}			
			// ItemListA:Category=Event_All;Date=Past;SortBy=Date;SortSeq=Asc;Show=Full;Max=10	
			$("#pparms_"+thispnumstring).html(oldimagepart + "[" + newparmstring + "]");
		}
		$("#"+ppid).dialog("close");
		ComposerListeners();
	});	

	$('.formattedpluginsettingscancelbutton').on('click', function() {
		// Plugin_AdMultiple_Settings_CancelButton
		var psbid = $(this).attr("id");
		var ppid = psbid.replace("_CancelButton", "_Popup");
		// Plugin_AdMultiple_Settings_Popup
		$("#"+ppid).dialog("close");		
	});		
	
	
	// ========= text ===============	
	$("#editabletextpopup").hide();	
	$("#editabletextpopup").dialog({
		autoOpen: false,
		width: "auto",
		height: "auto",
		overflow:"auto"
	});		
	$('#editabletextsavebutton').on('click', function(event) {	
		var newtext = $('#editabletext').val();
		// alert(newtext);
		activeelement.text(newtext);
		$("#editabletextpopup").dialog("close");
		ComposerListeners();
	});		
	$('#editabletextclosebutton').on('click', function(event) {
		$("#editabletextpopup").dialog("close");
	});	
	
	// ========= tiered text ===============	
	$("#editabletieredtextpopup").hide();	
	$("#editabletieredtextpopup").dialog({
		autoOpen: false,
		width: "auto",
		height: "auto",
		overflow:"auto"
	});		
	$('#editabletieredtextsavebutton').on('click', function(event) {
		// <h3 class="editabletieredtext">John Smith<br><small>Job Title</small></h3>	
		var newtext1 = $('#editabletieredtext1').val();
		var newtext2 = $('#editabletieredtext2').val();
		var tieredtext = '<h3 class="editabletieredtext">'+newtext1+'<br><small>'+newtext2+'</small></h3>';			
		activeelement.html(tieredtext);
		$("#editabletieredtextpopup").dialog("close");
		ComposerListeners();
	});		
	$('#editabletieredtextclosebutton').on('click', function(event) {
		$("#editabletieredtextpopup").dialog("close");
	});	
	
	// ========= textarea ===============	
	$("#editabletextareapopup").hide();	
	$("#editabletextareapopup").dialog({
		autoOpen: false,
		width: "auto",
		height: "auto",		
		overflow:"auto"
	});
	$('#editabletextareasavebutton').on('click', function(event) {	
		var newtextarea = tinymce.activeEditor.getContent();	
		activeelement.html(newtextarea);
		$("#editabletextareapopup").dialog("close");
		ComposerListeners();
	});		
	
	$('#editabletextareaclosebutton').on('click', function(event) {	
		$("#editabletextareapopup").dialog("close");
	});	
	
	// =========  textlink ===============	
	$("#editabletextlinkpopup").hide();	
	$("#editabletextlinkpopup").dialog({
		autoOpen: false,
		width: "auto",
		height: "auto",
		overflow:"auto"
	});	
	$('#editabletextlinksavebutton').on('click', function(event) {
		// <a href="#" class="editabletextlink btn btn-default">Learn More</a>
		var newtext = $('#editabletextlinktext').val();
		var newlink = $('#editabletextlinklink').val();
		activeelement.text(newtext);
		activeelement.attr('href',newlink);
		$("#editabletextlinkpopup").dialog("close");
		ComposerListeners();
	});		
	$('#editabletextlinkclosebutton').on('click', function(event) {
		$("#editabletextlinkpopup").dialog("close");
	});	
	
	// =========  tab ===============	
	$("#editabletabpopup").hide();	
	$("#editabletabpopup").dialog({
		autoOpen: false,
		width: "auto",
		height: "auto",
		overflow:"auto"
	});	
	$('#editabletabsavebutton').on('click', function(event) {
		// <a href="#" class="editabletextlink btn btn-default">Learn More</a>
		var newtext = $('#editabletabtext').val();
		activeelement.text(newtext);
		$("#editabletabpopup").dialog("close");
		ComposerListeners();
	});		
	$('#editabletabclosebutton').on('click', function(event) {
		$("#editabletabpopup").dialog("close");
	});	
	
	// ========= map ===============	
	$("#editablemappopup").hide();	
	$("#editablemappopup").dialog({
		autoOpen: false,
		width: "auto",
		height: "auto",
		overflow:"auto"
	});		
	$('#editablemapsavebutton').on('click', function(event) {	
		var newtext = $('#editablemap').val();
		alert(newtext);
		activeelement.parent().prev().replaceWith( newtext );
		$("#editablemappopup").dialog("close");
		ComposerListeners();
	});		
	$('#editablemapclosebutton').on('click', function(event) {
		$("#editablemappopup").dialog("close");
	});	
	
	// ========= Image ===============	
	$("#editableimgpopup").hide();	
	$("#editableimgpopup").dialog({
		autoOpen: false,
		width: "auto",
		height: "600px",
		overflow:"auto"
	});	
	$('#editableimgsavebutton').on('click', function(event) {	
		// alert("editableimgsavebutton");
		var capturedimgsrc = $("#editable_img_view").attr('src');
		activeelement.attr("src",capturedimgsrc);		
		$("#editableimgpopup").dialog("close");
		ComposerListeners();
	});			
	$('#editableimgclosebutton').on('click', function(event) {	
		$("#editableimgpopup").dialog("close");
	});	
	
	// ========= Background Image (eg parallax) ===============	
	$("#editablebackgroundimgpopup").hide();	
	$("#editablebackgroundimgpopup").dialog({
		autoOpen: false,
		width: "auto",
		height: "600px",
		overflow:"auto"
	});	
	$('#editablebackgroundimgsavebutton').on('click', function(event) {	
		// alert("editableimgsavebutton");
		var capturedimgurl = $("#editable_backgroundimg_view").attr('src');
		alert(capturedimgurl);
		activeelement.css('background-image', 'url("' + capturedimgurl + '")');
		$("#editablebackgroundimgpopup").dialog("close");
		ComposerListeners();
	});			
	$('#editablebackgroundimgclosebutton').on('click', function(event) {	
		$("#editablebackgroundimgpopup").dialog("close");
	});		
	
	// =========  font awesome stack ===============	
	$("#editablefastackpopup").hide();	
	$("#editablefastackpopup").dialog({
		autoOpen: false,
		width: "auto",
		height: "auto",
		overflow:"auto"
	});
	
	$('#facheatsheet').on('click', function(event) {
		$("#facheatsheetpopup").dialog("open");
		$("#facheatsheetpopup").css({height:"700px", overflow:"auto"});	
		CheatsheetListeners();
	});
	
	$('#editablefastacksavebutton').on('click', function(event) {
		// <a href="#" class="editablefastack btn btn-default">Learn More</a>
		var newicon = $('#editablefastackicon').val();
		var iconelement = activeelement.children(":first").next();
		var iconclass = iconelement.attr('class');
		var iclassa = iconclass.split(" ");
		var iconclass = iconclass.replace(iclassa[1], "fa-"+newicon);
		$(iconelement).attr("class",iconclass);
		$("#editablefastackpopup").dialog("close");
		ComposerListeners();
	});		
	$('#editablefastackclosebutton').on('click', function(event) {
		$("#editablefastackpopup").dialog("close");
	});	
	
	// =========  font awesome cheatsheet ===============	
	$("#facheatsheetpopup").hide();	
	$("#facheatsheetpopup").dialog({
		autoOpen: false,
		width: "80%",
		height: "600",
		overflow:"auto"
	});	
	
	CheatsheetListeners();
	
	ComposerListeners();
	
});




// ================= functions ============================

function ComposerListeners () { 
	
	$(".bg-holder").css({height:"768px"}); // parallax option within formattedsectionpopup
	$(".editabletextlink").click(function(e){e.preventDefault();});
	$(".editabletab").click(function(e){e.preventDefault();});	
	// $(".editableimg").click(function(e){e.preventDefault();});   // sliders	
	
	editabletextelementfired = "";
	editabletextareaelementfired = "";
	editabletextlinkelementfired = "";
	editabletabelementfired = "";
	
	// ======= plugin settings (takes priority)
	
	$('.psettings').on('click', function() {
		event.stopPropagation(); // prevents other listeners from firing
		var psid = $(this).attr("id");
		thispnumstring = psid.replace("psettings_", "");
		var ptitlestring = $("#ptitle_"+thispnumstring).html();
		// ptitlestring = "Plugin - 1 - ItemListA"		
		pparmstring = $("#pparms_"+thispnumstring).html();
		var pbits = pparmstring.split("[");
		var qbits = pbits[1].split("]");
		thispparmlist = qbits[0];
		// alert(thispnumstring+" "+thispparmlist);		
		// ItemListA:Category=Event_All;Date=Past;SortBy=Date;SortSeq=Asc;Show=Full;Max=10
		// InstagramWidget:Source=EmbeddedHTML;
		if ( thispparmlist.includes("Source=EmbedddedHTML") ) {
			$('#'+thispid+"_EmbedddedHTML").val(bits4[1]);
		} else {			
			bits1 = thispparmlist.split(":");
			thispid = bits1[0].replace("[","");
			bits2 = bits1[1].split("]");
			bits3 = bits2[0].split(";");
			for (i in bits3) {
				if (bits3[i].indexOf("=") !=-1) {
					bits4 = bits3[i].split("=");
					// alert(thispid+"_"+bits4[0]);
					$('#'+thispid+"_"+bits4[0]).val(bits4[1]);
				}
			}			
		}
		$('#Plugin_'+thispid+'_Settings_Popup').dialog("open");	
	});	
	
	// delete plugin
	
	$('.pdelete').unbind().on('click', function() {
		event.stopPropagation(); // prevents other listeners from firing
		var pid = $(this).attr("id");
		thispnumstring = pid.replace("pdelete_", "");
		
		$.confirm({
			icon: 'fa fa-question-circle text-warning',
		    title: 'Delete Plugin',
		    content: 'Are you sure you want to delete this plugin?',
		    buttons: {
		        somethingElse: {
		            text: 'Delete',
		            btnClass: 'btn-red',
		            action: function(){
		            	FormattedPluginDelete(thispnumstring);
		            }
		        },
		        cancel: function () { 
		        	
		        },
		    }
		});
		
	});	
	
	// ======== section settings
	
	$('.fssettings').on('click', function() {
		// <span id="fstitle_1" class="fstitle" style="color:navy">Formatted Section - 1 ( Type[ImageWithTextA], Header[No], BackgroundColor[White], PaddingTop[0], PaddingBottom[0] )</span>
		var fsid = $(this).attr("id");
		var fsnumstring = fsid.replace("fssettings_", "");
		// alert(fsnumstring);
		var oldcontent = $('#composerhtml').html();
		var oldcontenta = oldcontent.split('Formatted Section - '+fsnumstring);
		var oldcontentb = oldcontenta[1].split('</span>');
		var settingsstring = oldcontentb[0] ;
		settingsstring = settingsstring.replace(" ( ", "");
		settingsstring = settingsstring.replace(" )", "");
		var windowheight = $(window).height();
		var popupheight = windowheight*.5;
		$("#formattedsectionsettingspopup").dialog("open");
		$("#formattedsectionid").val(fsid);	
		Settings2SettingsEditor(settingsstring);
	});

	
	// move sections
	
	$('.fsmovedown').on('click', function() {	
		var fsid = $(this).attr("id");
		var fsnumstring = fsid.replace("fsmovedown_", "");
		FormattedSectionMove(fsnumstring,"down");
	});	
	
	$('.fsmoveup').on('click', function() {	
		var fsid = $(this).attr("id");
		var fsnumstring = fsid.replace("fsmoveup_", "");
		FormattedSectionMove(fsnumstring,"up");
	});		
	
	// delete sections
	
	$('.fsdelete').unbind().on('click', function() {
		var fsid = $(this).attr("id");
		var fsnumstring = fsid.replace("fsdelete_", "");
		// alert(fsnumstring);		
		$.confirm({
			icon: 'fa fa-question-circle text-warning',
		    title: 'Delete Formatted Section',
		    content: 'Are you sure you want to delete this formatted section?',
		    buttons: {
		        somethingElse: {
		            text: 'Delete',
		            btnClass: 'btn-red',
		            action: function(){
		            	FormattedSectionDelete(fsnumstring);
		            }
		        },
		        cancel: function () { 
		        	
		        },
		    }
		});
		
	});	
	
	// =========  plugin (takes Priority) ===============	
	
	$('.editablepluginareamarker').on('click', function() {		
		if ($(this).parents('.formattedsectiondisplay').length) {
		} else {
			event.stopPropagation(); // prevents other listeners from firing
			$(this).attr('id', 'pluginareaselected');
			$("#formattedpluginpopup").dialog("open");
			$("#formattedpluginpopup").css({height: $(window).height()*.75, overflow:"auto"});
			$("#formattedpluginpopup").parent().css('position', 'fixed');		
			$("#formattedpluginpopup").parent().css("top", ( $(window).height() - $("#formattedpluginpopup").height() ) / 2  + "px");
			$("#formattedpluginpopup").parent().css("left", ( $(window).width() - $("#formattedpluginpopup").width() ) / 2 + "px");	
		}
	});	
	
	// =========  other areas ===============	
	
	$('.editabletext').on('click', function(event) {
		if ($(this).parents('.formattedsectiondisplay').length) {
			$.alert({
				icon: 'fa fa-pencil text-info',
				title: "Information",
			    content: "Please select a Formatted Section before making updates."
			})	
		} else {
			activeelement = $(this);
			editabletextelementfired = $(this);
			// alert(editabletextelementfired.attr('class'));
			$("#editabletext").val(activeelement.text());
			openDialogCenter("editabletextpopup");
		}
	});	

	$('.editabletieredtext').on('click', function(event) {
		if ($(this).parents('.formattedsectiondisplay').length) {
			$.alert({
				icon: 'fa fa-pencil text-info',
				title: "Information",
			    content: "Please select a Formatted Section before making updates."
			})	
		} else {
			// <h3 class="editabletieredtext">John Smith<br>
			// <small>Job Title</small>
			// </h3>
			activeelement = $(this);
			var activeelementtext = activeelement.html();
			// alert(activeelementtext);
			var tbits = activeelementtext.split('<br>');
			var ubits = tbits[1].split('<small>');
			var vbits = ubits[1].split('</small>');
			$("#editabletieredtext1").val(tbits[0]);
			$("#editabletieredtext2").val(vbits[0]);			
			openDialogCenter("editabletieredtextpopup");
		}
	});		
	
	$('.editabletextarea').on('click', function(event) {
		if ($(this).parents('.formattedsectiondisplay').length) {
			$.alert({
				icon: 'fa fa-pencil text-info',
				title: "Information",
			    content: "Please select a Formatted Section before making updates."
			})	
		} else {
			activeelement = $(this);
			editabletextareaelementfired = $(this);
			activeelement.css('color', 'black');		
			tinymce.activeEditor.setContent(activeelement.html());
			// tinymce.theme.resizeTo("300px", "300px");
			// tinymce.DOM.setStyle(tinyMCE.DOM.get("elm1" + '_ifr'), 'height', '100px');
			$(".mce-tinymce").css({'height': '80%', overflow:"auto"});
			openDialogCenter("editabletextareapopup");
			$("#editabletextareapopup").scrollTop("0");
		}
	});	
	
	$('.editabletextlink').on('click', function(event) {
		if ($(this).parents('.formattedsectiondisplay').length) {
			$.alert({
				icon: 'fa fa-pencil text-info',
				title: "Information",
			    content: "Please select a Formatted Section before making updates."
			})	
		} else {
			// <a href="#" class="editabletextlink btn btn-default">Learn More</a>
			activeelement = $(this);
			editabletextlinkelementfired = $(this);
			$("#editabletextlinktext").val(activeelement.text());		
			$("#editabletextlinklink").val(activeelement.attr('href'));
			openDialogCenter("editabletextlinkpopup");
		}
	});	
	
	$('.editabletab').on('click', function(event) {
		if ($(this).parents('.formattedsectiondisplay').length) {
			$.alert({
				icon: 'fa fa-pencil text-info',
				title: "Information",
			    content: "Please select a Formatted Section before making updates."
			})	
		} else {
			activeelement = $(this);
			editabletabelementfired = $(this);
			$("#editabletabtext").val(activeelement.text());		
			openDialogCenter("editabletabpopup");
		}
	});	
	
	$('.editablemapbuttondiv').each(function() {
		if ($(this).parents('.formattedsectiondisplay').length) { $( this ).hide(); }  		
	});

	$('.editablemap').each(function() {
		if ($(this).parents('.formattedsectiondisplay').length) {} else {
			var embtext = '<br><button type="button" class="btn btn-info editablemapbutton" title="edit map">Update Map Link</button>';		
			var iframe = $(this).next();			
			$( embtext ).insertAfter( iframe );
		}
	});	
	
	$('.editablemapbutton').on('click', function(event) {
		if ($(this).parents('.formattedsectiondisplay').length) {
			$.alert({
				icon: 'fa fa-pencil text-info',
				title: "Information",
			    content: "Please select a Formatted Section before making updates."
			})	
		} else {
			activeelement = $(this);
			$("#editablemap").val("");
			openDialogCenter("editablemappopup");
		}
	});	
	
	$('.editableimg').on('click', function(event) {
		if ($(this).parents('.formattedsectiondisplay').length) {
			$.alert({
				icon: 'fa fa-pencil text-info',
				title: "Information",
			    content: "Please select a Formatted Section before making updates."
			})	
		} else {
			activeelement = $(this);
			activeparentelement = $(this).parent();
			var src = activeelement.attr('src');
			var fixedsize = "";
			// ../site_assets/750x450.png
			var timagename = "";
			if ( src.includes('/site_assets/') ) { 
				var sbits = src.split('/site_assets/')
				var tbits = sbits[1].split('.');
				if ( tbits[0].includes('x') ) { fixedsize = tbits[0]; }
			} else {
				if (src.includes('/')) {
					var imgbitsa = src.split("/");
					var imgbitsb = (imgbitsa[imgbitsa.length - 1]+"?").split("?");
					var timagename = imgbitsb[0];							
				}								
			}
			// Webpage_pagename_IMGIG0708_FixedSize_750x450.jpg
			if ( src.includes('_FixedSize_') ) { 
				var sbits = src.split('_FixedSize_')
				var tbits = sbits[1].split('.');
				if ( tbits[0].includes('x') ) { fixedsize = tbits[0]; }
			}
			// set imagecropper parameters
			$("#editable_img_view").attr('src', activeelement.attr('src'));
			$("#editable_img_imagename").val(timagename);
			
			// set dynamic imagecropper popup parameters (use aaaa_bbbb fieldname structure			
			$("#ImageFieldName").val("editable_img");
			$("#editable_img_ImageUploadTo").val("Webpage");
			$("#editable_img_ImageUploadId").val($("#webpage_name").val());
			$("#editable_img_ImageUploadWidth").val("800");
			$("#editable_img_ImageUploadHeight").val("flex");
			$("#editable_img_ImageUploadFixedSize").val(fixedsize);
			$("#editable_img_ImageThumbWidth").val("200");
			openDialogCenter("editableimgpopup");
			if ( src.includes('/site_assets/') ) {
				$("#editable_img_slimimageupdatebutton").html("Add Image");
				$("#editable_img_slimimageremovebutton").hide();		     
			} else { 
				$("#editable_img_slimimageupdatebutton").html("Update Image"); 
				$("#editable_img_slimimageremovebutton").show();		     
			}	
		}
	});	
	
	$('.editablebackgroundimg').on('click', function(event) {
		if ($(this).parents('.formattedsectiondisplay').length) {
			$.alert({
				icon: 'fa fa-pencil text-info',
				title: "Information",
			    content: "Please select a Formatted Section before making updates."
			})	
		} else {
			activeelement = $(this);
			// give preference to overlaying elements
			var editthiselement = "1";
			if (activeelement.find('.editabletext').length) {
				if (editabletextelementfired != "") { editthiselement = "0"; activeelement = editabletextelementfired; }
			}
			if (activeelement.find('.editabletextarea').length) {
				if (editabletextareaelementfired != "") { editthiselement = "0"; activeelement = editabletextareaelementfired; }			
			}
			if (activeelement.find('.editabletextlink').length) {
				if (editabletextlinkelementfired != "") { editthiselement = "0"; activeelement = editabletextlinkelementfired; }				
			}
			if (activeelement.find('.editabletab').length) {
				if (editabletabelementfired != "") { editthiselement = "0"; activeelement = editabletabelementfired; }				
			}
			if ( editthiselement == "1" ) {	
				activeparentelement = $(this).parent();
				var url = activeelement.css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1');;
				// alert(url);
				var src = url2src(url);
				// alert(url+ " | "+src);
				var fixedsize = "";
				// ../site_assets/750x450.png
				if ( src.includes('/site_assets/') ) { 
					var sbits = src.split('/site_assets/')
					var tbits = sbits[1].split('.');
					if ( tbits[0].includes('x') ) { fixedsize = tbits[0]; }
				}
				// Webpage_pagename_IMGIG0708_FixedSize_750x450.jpg
				if ( src.includes('_FixedSize_') ) { 
					var sbits = src.split('_FixedSize_')
					var tbits = sbits[1].split('.');
					if ( tbits[0].includes('x') ) { fixedsize = tbits[0]; }
				}
				// set imagecropper parameters
				$("#editable_backgroundimg_view").attr('src', src);			
				$("#editable_backgroundimg_imagename").val("");
				
				// set dynamic imagecropper popup parameters (use aaaa_bbbb fieldname structure			
				$("#ImageFieldName").val("editable_backgroundimg");
				$("#editable_backgroundimg_ImageUploadTo").val("Webpage");
				$("#editable_backgroundimg_ImageUploadId").val($("#webpage_name").val());
				$("#editable_backgroundimg_ImageUploadWidth").val("800");
				$("#editable_backgroundimg_ImageUploadHeight").val("flex");
				$("#editable_backgroundimg_ImageUploadFixedSize").val(fixedsize);
				$("#editable_backgroundimg_ImageThumbWidth").val("200");
				
				openDialogCenter("editablebackgroundimgpopup");
			}
		} 
	});	

	$('.editablefastack').on('click', function(event) {
		if ($(this).parents('.formattedsectiondisplay').length) {
			$.alert({
				icon: 'fa fa-pencil text-info',
				title: "Information",
			    content: "Please select a Formatted Section before making updates."
			})	
		} else {
			// <span class="fa-stack fa-5x editablefastack">
			// 	  <i class="fa fa-circle fa-stack-2x text-primary"></i>
			// 	  <i class="fa fa-tree fa-stack-1x fa-inverse"></i>
			// </span>
			activeelement = $(this);
			// alert($(this).attr('class'));
			var iconelement = activeelement.children(":first").next();
			var iconclass = iconelement.attr('class');
			var iclassa = iconclass.split(" ");			
			var iconpart = iclassa[1].replace("fa-", "");
			$("#editablefastackicon").val(iconpart);		
			$("#editablefastackpopup").dialog("open");
			$("#editablefastackpopup").css({height:"auto", overflow:"auto"});
		}
	});	
	
}

function CheatsheetListeners () { 

		// <div class="row row-eq-height">
		// <div class="col-md-2 col-sm-4">
		// <div class="media">
		// <div class="pull-left">
		// <span class="fa-stack fa-2x">
		// <i class="fa fa-circle fa-stack-2x text-primary"></i>
		// <i class="fa fa-twitter-square fa-stack-1x fa-inverse selectablefaicon"></i>
		// </span>
		// </div>
		// <div class="media-body">
		// <div class="selectablefatext">
		// twitter-square
		// </div>
		// </div>
		// </div>
		// </div>		
		
	$('.selectablefaicon').on('click', function(event) {				
		// alert("selectablefaicon");		
		var iconclass = $(this).attr('class');
		var iclassa = iconclass.split(" ");			
		var iconpart = iclassa[1].replace("fa-", "");		
		$("#editablefastackicon").val(iconpart);
		$("#facheatsheetpopup").dialog("close");
	});	
	
	$('.selectablefatext').on('click', function(event) {
		// alert("selectablefatext");
		var iconpart = $(this).text();
		$("#editablefastackicon").val(iconpart);
		$("#facheatsheetpopup").dialog("close");
	});	
}

function Settings2SettingsEditor(settingsstring) {		
	// alert(settingsstring);
	$( ".formattedsettingdiv" ).hide();	
	var sbitsa = settingsstring.split("]");
	for (var i = 0; i < (sbitsa.length-1); i++) {
		var tbitsa = sbitsa[i].split("[");
		var sname = tbitsa[0];
		sname = sname.replace(", ", "");
		var sval = tbitsa[1];
		// alert(sname+" = "+sval);
		$('#FS'+sname+"Div").show();
		$('#FS'+sname).val(sval);
	}		
}

function SettingsEditor2Settings(oldsettingsstring) {
	// Type[ImageWithTextA], Header[No], BackgroundColor[White], PaddingTop[0], PaddingBottom[0]
	// alert(oldsettingsstring);
	var newsettingsstring = ""; $sep = "";
	var sbitsa = oldsettingsstring.split("]");
	for (var i = 0; i < sbitsa.length; i++) {
		if (sbitsa[i] != "") {
			var tbitsa = sbitsa[i].split("[");
			var sname = tbitsa[0];
			var oldsval = tbitsa[1];
			var newsval = tbitsa[1];
			sname = sname.replace(" ", "");
			sname = sname.replace(",", "");
			if ( $('#FS'+sname).length ) {	
				newsval = $('#FS'+sname).val();
				// alert('#FS'+sname+" "+newsval);
			}
			newsettingsstring = newsettingsstring + $sep + sname + "[" + newsval + "]";
			$sep = ", ";
			
		}
	}	
	return newsettingsstring;
}

/*
var pbackgroundcolor = $('#FSBackgroundColor').val();
newpartext = UpdateParmValue(newpartext, "BackgroundColor", pbackgroundcolor)
var ppaddingtop = $('#FSPaddingTop').val();
newpartext = UpdateParmValue(newpartext, "PaddingTop", ppaddingtop)		
var ppaddingbottom = $('#FSPaddingBottom').val();
newpartext = UpdateParmValue(newpartext, "PaddingBottom", ppaddingbottom)	
var newcontent = oldcontent.replace(oldpartext, newpartext);		
*/

function EnCodeEmbed (instring) {
	var outstring = instring;
	outstring = outstring.replace(/</g, '&lt;');
	outstring = outstring.replace(/>/g, '&gt;');
	return outstring;
}

function GetParmValue(parmstring, parmname) { 
	var pbitsa = parmstring.split(parmname+"[");
	var pbitsb = pbitsa[1].split(']');
	// alert(parmstring+" "+parmname+" "+pbitsb[0])
	return pbitsb[0];	
}

function UpdateParmValue(parmstring, parmname, parmvalue) { 
	var pbitsa = parmstring.split(parmname+"[");
	var pbitsb = pbitsa[1].split(']');
	var oldpartext = parmname+"["+pbitsb[0]+"]";
	var newpartext = parmname+"["+parmvalue+"]";
	var newparmstring = parmstring.replace(oldpartext, newpartext);	
	return newparmstring;	
}      

function FormattedSectionDelete (thisfsnum) { 
	// alert("FormattedSectionDelete "+thisfsnum);
	var newcontent = "";
	var oldcontent = $('#composerhtml').html();
	var oldcontenta = oldcontent.split(/\r\n|\n|\r/);
	var exclude = "0";
	for (var i in oldcontenta) {
		var oldcontentstring = oldcontenta[i];
		// alert(oldcontentstring);
		if ( oldcontentstring.includes('<!-- FSSTART_'+thisfsnum+' -->') ) { exclude = "1"; }
		if ( (oldcontentstring.includes('<!-- /FSEND -->'))&&(exclude == "1") ) { exclude = "2"; }	
		
		if ( exclude == "0" ) { newcontent = newcontent+oldcontentstring+"\n"; }
		if ( exclude == "2") { exclude = "0"; }
	}
	if ( newcontent.includes('<!-- FSSTART_') ) { } else { newcontent = ""; }		
	
	$('#composerhtml').html(newcontent);
	ComposerListeners();
}

function FormattedSectionMove (thisfsnumstring,thisdirection) { 
	// alert("FormattedSectionMove "+thisfsnumstring+" "+thisdirection);
		
	var sectioncontenta = new Array();
	var sectionfsnuma = new Array();
	var fsnumseqa = new Array();
	var si = -1;
	var sci = 0;
	var totalcontent = $('#composerhtml').html();
	var totalcontenta = totalcontent.split(/\r\n|\n|\r/);
	var thisfsnum = "";
	for (var i in totalcontenta) {
		var oldcontentstring = totalcontenta[i];
		if ( oldcontentstring.includes('FSSTART_') ) {
			si++;
			sci = 0;
			var obits = oldcontentstring.split('FSSTART_');
			var pbits = obits[1].split(' ');
			var tfsnum = pbits[0];
			sectioncontenta[si] = new Array();
			sectionfsnuma[tfsnum] = si;
			fsnumseqa.push(tfsnum);		
		}
		if ( si != -1 ) {
			sectioncontenta[si][sci] = oldcontentstring;
			sci++;
		}
	}
	
	if ( thisdirection == "up" ) {
		fsnumseqa = movesection(fsnumseqa, thisfsnumstring, -1);		
	}
	if ( thisdirection == "down" ) {
		fsnumseqa = movesection(fsnumseqa, thisfsnumstring, 1);		
	}	
	
	var newtotalcontent = "";
	for (var i in fsnumseqa) {
		var tfsnum = fsnumseqa[i];
		var tsi = sectionfsnuma[tfsnum];
		for (var j in sectioncontenta[tsi]) {
			var newcontentelement = sectioncontenta[tsi][j]+"\n"			
			// alert ( tsi + " " + j + " " + newcontentelement );
			newtotalcontent = newtotalcontent + newcontentelement;
		}
	}
	$('#composerhtml').html(newtotalcontent);
	ComposerListeners();
}

function movesection (oldfsnumseqa, targetseq, delta) {
	
	  var newfsnumseqa = oldfsnumseqa.slice(); // copy array !!
	  var indexa = oldfsnumseqa.indexOf(targetseq);
	  var indexb = indexa + delta;
	  if ((indexb < 0)  || (indexb >= oldfsnumseqa.length)) return oldfsnumseqa; // already at the top or bottom
	  /*
	  var oldstring = ""; var newstring = "";
	  for (var i in oldfsnumseqa) { 
		  oldstring = oldstring+"|"+oldfsnumseqa[i];
		  newstring = newstring+"|"+newfsnumseqa[i];
	  }
	  alert("Before "+oldstring+" => "+newstring);
	  */
	  newfsnumseqa[indexb] = oldfsnumseqa[indexa]; // switch the array elements
	  newfsnumseqa[indexa] = oldfsnumseqa[indexb];
	  /*
	  var oldstring = ""; var newstring = "";
	  for (var i in oldfsnumseqa) { 
		  oldstring = oldstring+"|"+oldfsnumseqa[i];
		  newstring = newstring+"|"+newfsnumseqa[i];
	  }
	  alert("After "+oldstring+" => "+newstring);
	  */
	  return newfsnumseqa;
}

function FormattedPluginDelete (thispnum) { 
	// alert("FormattedPluginDelete "+thisfsnum);
	var newcontent = "";
	var oldcontent = $('#composerhtml').html();
	var oldcontenta = oldcontent.split(/\r\n|\n|\r/);
	var deletebuttonid = "pdelete_"+thispnum;	
	if ($('#'+deletebuttonid).parents().hasClass('editabletextarea')) {
		// pluginarea placed within editable textarea
		// delete entire pluginarean within =editable textarea		
		$('#'+deletebuttonid).parent().remove();
	} else {
		// dedicated pluginarea	
		// delete specific plugin and replace with pluginarea button
		var exclude = "0";
		for (var i in oldcontenta) {
			var oldcontentstring = oldcontenta[i];
			// alert(oldcontentstring);
			if ( oldcontentstring.includes('<!-- PSTART_'+thispnum+' -->') ) { exclude = "1"; }
			if ( (oldcontentstring.includes('<!-- /PEND -->'))&&(exclude == "1") ) { exclude = "2"; }	
			
			if ( exclude == "0" ) { newcontent = newcontent+oldcontentstring+"\n"; }
			if ( exclude == "2") {
				newcontent = newcontent+'<div class="editablepluginareamarker" ><button type="button" class="btn btn-warnibg" title="Add Plugin">Add Plugin</button></div>'+"\n";
				exclude = "0"; 
			}
		}
		$('#composerhtml').html(newcontent);
	}
	
	// $( "#pluginareaselected" ).parent().css('height', '100px');
	// $( "#pluginareaselected" ).parent().css('padding-top', '40px');
	// $( "#pluginareaselected" ).parent().css('text-align', 'center');	
	ComposerListeners();
}

function Composer2DBHTML (composerhtmlin) { 	
	var composerhtmlout = "";
    var htmla = new Array();    
    var htmlrawa = composerhtmlin.split('<'); 
    var htmlrawline = "";
    var excludeline = "0";
    var mustincludeline = "0";
    var hi = 0;
    while ( hi < htmlrawa.length ) {    	   	
	    if ((htmlrawa[hi] != "")&&(htmlrawa[hi] != "\n")) {
		    htmlrawline = '<'+htmlrawa[hi];	    	
		    mustincludeline = "0";
			// retain just the parameters line from the FSSTART section
			if (htmlrawline.indexOf(' FSSTART') >= 0) { 
				excludeline = "1";
				mustincludeline = "1";
			} 		
			if (htmlrawline.indexOf('class="fstitle') >= 0) { // keep this line
				composerhtmlout = composerhtmlout + htmlrawline;
				hi++;
				htmlrawline = '<'+htmlrawa[hi];
				composerhtmlout = composerhtmlout + htmlrawline; // closing span of title line
			}
			if (htmlrawline.indexOf('/FSSTART') >= 0) {  
				excludeline = "2";
				mustincludeline = "1";
			} 
			
			if (htmlrawline.indexOf(' PSTART') >= 0) { 
				excludeline = "1";
				mustincludeline = "1";
			} 		
			if (htmlrawline.indexOf('class="ptitle') >= 0) { // keep this line
				composerhtmlout = composerhtmlout + htmlrawline;
				hi++;
				htmlrawline = '<'+htmlrawa[hi];
				composerhtmlout = composerhtmlout + htmlrawline; // closing span of title line
			}
			if (htmlrawline.indexOf('/PSTART') >= 0) {  
				excludeline = "2";
				mustincludeline = "1";
			} 						
						
			if (excludeline == "0") { composerhtmlout = composerhtmlout + htmlrawline; }
			if (mustincludeline == "1") { composerhtmlout = composerhtmlout + htmlrawline; }
			if (excludeline == "2") { excludeline = "0"; } 
    	}
        hi++;
    }
	return composerhtmlout;
}

function Composer2Pluginlist (composerhtmlin) { 	
	var pluginlist = "";
	var wsep = "";
    var htmla = new Array();    
    var htmlrawa = composerhtmlin.split('<'); 
    var htmlrawline = "";
    var hi = 0;
    while ( hi < htmlrawa.length ) {    	   	
	    if ((htmlrawa[hi] != "")&&(htmlrawa[hi] != "\n")) {
		    htmlrawline = '<'+htmlrawa[hi];
		    // <p id="pparms_1" class="ItemListA"><img src="../site_assets/Plugin_ItemListA.png">[ItemListA:Category=Event_All;Date=Future;SortBy=Date;SortSeq=Asc;Show=Full;Max=10;]</p> 
		    if (htmlrawline.indexOf('/domain_style/Plugin_') !=-1) {
		    	var hbits = htmlrawline.split('[');
		    	var ibits = hbits[1].split(']');
		    	pluginlist = pluginlist + wsep + "[" +ibits[0] + "]";
		    	wsep = ",";
		    }
    	}
        hi++;
    }
	return pluginlist;
}

function url2src (url) {
	// http://localhost/site_assets/1024x768.png to ../site_assets/1024x768.png
	var urla = url.split('/');
	src = "..";
	var found = "0";
    var ui = 0;
    while ( ui < urla.length ) { 
    	urlbit = urla[ui];
    	if (urlbit.indexOf('site_') >= 0) { found = "1"; }
    	if (urlbit.indexOf('domain_') >= 0) { found = "1"; }
    	if (found == "1") { src = src+"/"+urlbit; } 
    	ui++;
    }
	return src;
}

function openDialogCenter (dialogid) {
	$("#"+dialogid).dialog("open");
	if (dialogid == "editableimgpopup") {
		$("#"+dialogid).css({'height': $(window).height()*.75, overflow:"auto"});
	} else {
		$("#"+dialogid).css({'max-height': $(window).height()*.75, overflow:"auto"});
	}
	$("#"+dialogid).parent().css('position', 'fixed');		
	$("#"+dialogid).parent().css("top", ( $(window).height() - $("#"+dialogid).height() ) / 2  + "px");
	$("#"+dialogid).parent().css("left", ( $(window).width() - $("#"+dialogid).width() ) / 2 + "px");	
}
  

$(document).ready( function() { 	
	
/*

Key
(*)+(+)				Page
(*)+(**)		Database
(*)+(**)+(***)	Composer

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
*/
	
	
	// ====== formatted sidebar selection popup controls =======	
	
	$("#composerhtml").css('width', '30%');
	$("#composerhtml").css('height', 'auto');
	$('#composerhtml').css('border-width', '2');
	$('#composerhtml').css('border', '4px solid silver');
	
	$("#formattedsidebarpopup").dialog({
		autoOpen: false,
		width: "30%",
		height: "75%",
		overflow:"auto"
	});	
	
	var thisformattedsectiontype = "";
	var thisformattedsectionheader = "";
	var thisformattedsectionbackcolor = "";
	var thisformattedsectioncols = "";
	var thisformattedsectionrows = "";
	var thisformattedsectionpaddingtop = "";	
	var thisformattedsectionpaddingbottom = "";	
	
	// alert("composerformattedsidebarpopup");
	$("#formattedsidebarpopup").hide();
	$("#formattedsidebarsettingspopup").hide();
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
		var sectiontext = "("; 		
		sectiontext = sectiontext+" Type["+thisformattedsectiontype+"]";
		var jqid= '#'+thisformattedsectiontype+'Header'; 
		if ( $(jqid).length ) { 
			if ( $(jqid).is(':checked') ) {
				sectiontext = sectiontext+", Header[Yes]";				
			} else {
				sectiontext = sectiontext+", Header[No]";
			}
		}
		var jqid= '#'+thisformattedsectiontype+'BackColor'; 
		if ( $(jqid).length ) { 
			thisformattedsectionbackcolor = $(jqid).val();
			sectiontext = sectiontext+", BackgroundColor["+thisformattedsectionbackcolor+"]";
		}
		var jqid= '#'+thisformattedsectiontype+'Cols'; 
		if ( $(jqid).length ) { 
			thisformattedsectioncols = $(jqid).val();
			sectiontext = sectiontext+", Cols["+thisformattedsectioncols+"]";
		}	
		var jqid= '#'+thisformattedsectiontype+'Rows'; 
		if ( $(jqid).length ) { 
			thisformattedsectionrows = $(jqid).val();
			sectiontext = sectiontext+", Rows["+thisformattedsectionrows+"]";
		}
		sectiontext = sectiontext+", PaddingTop[0]";
		sectiontext = sectiontext+", PaddingBottom[0]";
	
		sectiontext = sectiontext+" )";
		if ( sectiontext == "()" ) { sectiontext = ""; }
		
		
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
	    		$("#formattedsidebarpopup").dialog("close");
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
	    		
	    		// replace marker with downloaded template
	    		var oldcontenta = oldcontent.split('<div class="markerdiv"></div>');
	    		if ( oldcontenta[0].includes('<!-- Empty Sidebar -->') ) { oldcontenta[0] = ""; } 	
	    		
	    		var s0 = '<!-- FSSTART_'+nextfsidnumtxt+' -->'+"\n"; 
	    		var s1 = '<hr class="fshr" style="border-top: 3px solid Navy; margin-bottom: 5px;">'+"\n"; 
	    		var s2 = '<button id="fssettings_'+nextfsidnumtxt+'" type="button" class="fssettings btn btn-primary" title="settings"><span><i class="fa fa-cog"></i></span></button>'+"\n";
	    		var s3 = '<button id="fsmovedown_'+nextfsidnumtxt+'" type="button" class="fsmovedown btn btn-secondary" title="move down"><span><i class="fa fa-angle-double-down"></i></span></button>'+"\n";
	    		var s4 = '<button id="fsmoveup_'+nextfsidnumtxt+'" type="button" class="fsmoveup btn btn-secondary" title="move up"><span><i class="fa fa-angle-double-up"></i></span></button>'+"\n";
	    		var s5 = '<button id="fsdelete_'+nextfsidnumtxt+'" type="button" class="fsdelete btn btn-danger" title="delete"><span><i class="fa fa-remove"></i></span></button>&nbsp;&nbsp;'+"\n"  		
	    		var s6 = '<span id="fstitle_'+nextfsidnumtxt+'" class="fstitle" style="color:navy">Formatted Section - '+nextfsidnumtxt+" "+sectiontext+"</span>\n"; 
	    		var s7 = '<hr class="fshr" style="border-top: 1px solid #e6e6e6; margin-top: 4px; margin-bottom: 4px;">'+"\n"; 	    		
	    		var s8 = '<!-- /FSSTART -->'+"\n";

	    		var e0 = '<!-- FSEND_'+nextfsidnumtxt+' -->'+"\n"; 	 		
	    		var e1 = '<!-- /FSEND -->'+"\n";	    		
	    		
	    		var newcontent =  oldcontenta[0] + s0 + s1 + s2 + s3 + s4 + s5 + s6 + s7 + s8 + insertedsection + e0 + e1 + oldcontenta[1] ;	    		
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
	
	// ====== composer controls =================
	if ( $("#composerhtml").html().includes('<!-- FSSTART_') ) { } else { 
		if ( $("#composerhtml").html().includes('<!-- Empty Sidebar -->') ) { } else { 		
			$("#composerhtml").html(""); 
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
		// if ( oldcontent.includes('<!-- Empty Sidebar -->') ) { oldcontent = ""; } 		
		$("#composerhtml").html(oldcontent+'<div class="markerdiv"></div>');
		$("#formattedsidebarpopup").dialog("open");
		$("#formattedsidebarpopup").css({height:"600px", overflow:"auto"});	
		$(".bg-holder").css({height:"768px"}); // parallax option within formattedsectionpopup
	});	
	
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
		var oldcontent = $('#composerhtml').html();
		$('#sidebar_html').val(COMPOSER2DBHTML(oldcontent));
		$("#sidebarcomposerin").submit();
	});	
	
	// ========= Composer Section level controls and popups ===============	
	
	
	$("#formattedsidebarsettingspopup").dialog({
		autoOpen: false,
		width: "50%",
		height: "auto",
		overflow: "auto"
	});	
	
	$('#formattedsectionsettingsupdatebutton').on('click', function() {
		$("#formattedsidebarsettingspopup").dialog("close");
		var pbits = $("#formattedsectionid").val().split('_');
		var oldcontent = $('#composerhtml').html();		
		// alert('|Formatted Section - '+pbits[1]+"|");
		var oldcontenta = oldcontent.split('Formatted Section - '+pbits[1]);
		var oldcontentb = oldcontenta[1].split('</span>');
		var oldpartext = oldcontentb[0];
		var newpartext = oldpartext;
		var pbackgroundcolor = $('#FSBackgroundColor').val();
		newpartext = UpdateParmValue(newpartext, "BackgroundColor", pbackgroundcolor)
		var ppaddingtop = $('#FSPaddingTop').val();
		newpartext = UpdateParmValue(newpartext, "PaddingTop", ppaddingtop)		
		var ppaddingbottom = $('#FSPaddingBottom').val();
		newpartext = UpdateParmValue(newpartext, "PaddingBottom", ppaddingbottom)	
		var newcontent = oldcontent.replace(oldpartext, newpartext);				
		$('#composerhtml').html(newcontent);
		ComposerListeners();
	});	
	
	$('#formattedsectionsettingscancelbutton').on('click', function() {
		$("#formattedsidebarsettingspopup").dialog("close");
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
	// $(".editableimg").click(function(e){e.preventDefault();});   // sliders	
	
	// settings
	
	$('.fssettings').on('click', function() {
		var fsid = $(this).attr("id");
		var fsnumstring = fsid.replace("fssettings_", "");
		// alert(fsnumstring);
		var oldcontent = $('#composerhtml').html();
		var oldcontenta = oldcontent.split('Formatted Section - '+fsnumstring);
		var oldcontentb = oldcontenta[1].split('</span>');
		var parmstring = oldcontentb[0] ;	
		var windowheight = $(window).height();
		var popupheight = windowheight*.5;			   		   			   
		$("#formattedsidebarsettingspopup").dialog("open");
		$("#formattedsectionid").val(fsid);			
		$('#FSBackgroundColor').val(GetParmValue(parmstring, "BackgroundColor"));
		$('#FSPaddingTop').val(GetParmValue(parmstring, "PaddingTop"));				
		$('#FSPaddingBottom').val(GetParmValue(parmstring, "PaddingBottom"));	
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
	
	$('.editabletext').on('click', function(event) {
		if ($(this).parents('.formattedsectiondisplay').length) {} else {
			activeelement = $(this);
			$("#editabletext").val(activeelement.text());
			$("#editabletextpopup").dialog("open");
			$("#editabletextpopup").css({height:"auto", overflow:"auto"});			
		}
	});	

	$('.editabletieredtext').on('click', function(event) {
		if ($(this).parents('.formattedsectiondisplay').length) {} else {
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
			$("#editabletieredtextpopup").dialog("open");
			$("#editabletieredtextpopup").css({height:"auto", overflow:"auto"});			
		}
	});		
	
	$('.editabletextarea').on('click', function(event) {
		if ($(this).parents('.formattedsectiondisplay').length) {} else {
			activeelement = $(this);
			activeelement.css('color', 'black');		
			tinymce.activeEditor.setContent(activeelement.html());
			$("#editabletextareapopup").dialog("open");
			$("#editabletextareapopup").dialog().css({height:"auto", overflow:"auto"});
			$("#editabletextareapopup").scrollTop("0");
			$('#editabletextareapopup').parent().position({
	             my: "center",
	             at: "center",
	             of: window
			});
		}
	});	
	
	$('.editabletextlink').on('click', function(event) {
		if ($(this).parents('.formattedsectiondisplay').length) {} else {
			// <a href="#" class="editabletextlink btn btn-default">Learn More</a>
			activeelement = $(this);
			$("#editabletextlinktext").val(activeelement.text());		
			$("#editabletextlinklink").val(activeelement.attr('href'));
			$("#editabletextlinkpopup").dialog("open");
			$("#editabletextlinkpopup").css({height:"auto", overflow:"auto"});
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
		if ($(this).parents('.formattedsectiondisplay').length) {} else {
			activeelement = $(this);
			$("#editablemap").val("");
			$("#editablemappopup").dialog("open");
			$("#editablemappopup").css({height:"auto", overflow:"auto"});			
		}
	});	
	
	$('.editableimg').on('click', function(event) {
		if ($(this).parents('.formattedsectiondisplay').length) {} else {
			activeelement = $(this);
			activeparentelement = $(this).parent();
			var src = activeelement.attr('src');
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
			$("#editable_img_view").attr('src', activeelement.attr('src'));
			$("#editable_img_imagename").val("");
			
			// set dynamic imagecropper popup parameters (use aaaa_bbbb fieldname structure			
			$("#ImageFieldName").val("editable_img");
			$("#editable_img_ImageUploadTo").val("Webpage");
			$("#editable_img_ImageUploadId").val($("#webpage_name").val());
			$("#editable_img_ImageUploadWidth").val("800");
			$("#editable_img_ImageUploadHeight").val("flex");
			$("#editable_img_ImageUploadFixedSize").val(fixedsize);
			$("#editable_img_ImageThumbWidth").val("200");
			
			$("#editableimgpopup").dialog("open");
			$("#editableimgpopup").css({height:"auto", overflow:"auto"});
		}
	});	
	
	$('.editablefastack').on('click', function(event) {
		if ($(this).parents('.formattedsectiondisplay').length) {} else {
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

function UpdateParmXValue(instring, searchstring, newvalue) { 
	var xbitsa = instring.split(searchstring);
	var xbitsb = xbitsa[1].split('<');
	var xbitsc = xbitsb[0].split('>');
	var oldpartext = searchstring+xbitsc[0]+'>'+xbitsc[1];
	var newpartext = searchstring+xbitsc[0]+'>'+newvalue;
	// alert(oldpartext+" "+newpartext);
	var outstring = instring.replace(oldpartext, newpartext);	
	return outstring;	
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

function FormattedSectionMove (thisthisfsnum,thisdirection) { 
	// alert("FormattedSectionMove "+thisfsnum+" "+direction);
		
	var sectioncontent = new Array();
	var sectionfsnum = new Array();
	var fsnumseq = new Array();
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
			var tfsnum = obits[1].charAt(0);
			sectioncontent[si] = new Array();
			sectionfsnum[tfsnum] = si;
			fsnumseq.push(tfsnum);		
		}
		if ( si != -1 ) {
			sectioncontent[si][sci] = oldcontentstring;
			sci++;
		}
	}
	
	// var str=""; for (var i in fsnumseq) {str=str+fsnumseq[i];} alert(str);
	
	if ( thisdirection == "up" ) {
		movesection(fsnumseq, thisthisfsnum, -1);		
	}
	if ( thisdirection == "down" ) {
		movesection(fsnumseq, thisthisfsnum, 1);		
	}	
	
	var newtotalcontent = "";
	for (var i in fsnumseq) {
		var tfsnum = fsnumseq[i];
		var tsi = sectionfsnum[tfsnum];
		for (var j in sectioncontent[tsi]) {
			var newcontentelement = sectioncontent[tsi][j]+"\n"			
			// alert ( tsi + " " + j + " " + newcontentelement );
			newtotalcontent = newtotalcontent + newcontentelement;
		}
	}
	$('#composerhtml').html(newtotalcontent);
	ComposerListeners();
}

function movesection (array, element, delta) {
	  var index = array.indexOf(element);
	  var newIndex = index + delta;
	  if (newIndex < 0  || newIndex == array.length) return; //Already at the top or bottom.
	  var indexes = [index, newIndex].sort(); //Sort the indixes
	  array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); //Replace from lowest index, two elements, reverting the order
};

function COMPOSER2DBHTML (composerhtmlin) { 	
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
			if (excludeline == "0") { composerhtmlout = composerhtmlout + htmlrawline; }
			if (mustincludeline == "1") { composerhtmlout = composerhtmlout + htmlrawline; }
			if (excludeline == "2") { excludeline = "0"; } 
    	}
        hi++;
    }
	return composerhtmlout;
}
  

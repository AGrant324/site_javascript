
$(document).ready( function() {
	
	var thisformattedsectiontype = "";
	var thisformattedsectionheader = "";
	var thisformattedsectionbackcolor = "";
	var thisformattedsectioncols = "";
	var thisformattedsectionrows = "";
	var thisformattedsectionpaddingtop = "";	
	var thisformattedsectionpaddingbottom = "";	
	
	// alert("tinyformattedsectionpopup");
	$("#formattedsectionpopup").hide();
	$("#formattedsectionsettingspopup").hide();
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
	    		$("#formattedsectionpopup").dialog("close");
	    		
	    		// get the cursor position of the tinymce visual editor
	    		var ed = tinyMCE.get('mceTextarea');                // get editor instance
	    		var range = ed.selection.getRng();                  // get range
	    		var newNode = ed.getDoc().createElement ( "div" );  // create div node
	    		newNode.setAttribute('class', 'markerdiv');;  // add class
	    		range.insertNode(newNode);
	    		var oldcontent = tinyMCE.get('mceTextarea').getContent();
	    		// alert(oldcontent);

	    		var highestfsidnum = 0;
	    		var oldcontentfsa = oldcontent.split('fsstart');
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
	    		
	    		// replace marker with downloaded template
	    		var oldcontenta = oldcontent.split('<div class="markerdiv"></div>');
	    		var start0 = '<p>&nbsp;</p>'+"\n"+'<!-- FSSTART_'+nextfsidnumtxt+' -->'+"\n"; 
	    		var thisformattedsectionwidth = "partial";
	    		var start1 = '<table id="fsstart_'+nextfsidnumtxt+'" style="background-color:'+thisformattedsectionbackcolor+'; border-color:red; border-style:dotted; border-width:1px;" >'+"\n"+'<tr>'+"\n"+'<td>'+"\n";
	    		var start2 = '<img id="fsdelete_'+nextfsidnumtxt+'" class="fsdelete" src="../site_assets/formattedsectiondelete.png" width="15" align="bottom" title="Delete">'+"\n";
	    		var start3 = '<img id="fssettings_'+nextfsidnumtxt+'" class="fssettings" src="../site_assets/formattedsectionsettings.png" width="15" align="bottom" title="Settings">'+"\n";	    		
	    		var start4 = '<span id="fstitle_'+nextfsidnumtxt+'" style="color:red">Formatted Section - '+nextfsidnumtxt+" "+sectiontext+'</span>'+"\n"; 
	    		var start5 = '<!-- /FSSTART -->'+"\n"; 	    		
	    		
	    		var end0 = '<!-- FSEND_'+nextfsidnumtxt+' -->'+"\n"; 	 		
	    		var end1 = '</td>'+"\n"+'</tr>'+"\n"+'</table>'+"\n";
	    		var end2 = '<!-- /FSEND -->'+"\n";	    		
	    		var postend = '<p>&nbsp;</p>'+"\n"; 
	    		
	    		var newcontent =  oldcontenta[0] + start0 + start1 + start2 + start3 + start4 + start5 + data + end0 + end1 + end2 + postend + oldcontenta[1] ;	    		
	    		var tidiedupcontent = TidyUpFormattedSections(newcontent);
	    		tinyMCE.get('mceTextarea').setContent(tidiedupcontent);
	        }
	    })  

	});
	
	$('#formattedsectionsettingsupdatebutton').on('click', function() {	
		$("#formattedsectionsettingspopup").dialog("close");
		var pbits = $("#formattedsectionid").val().split('_');
		var oldcontent = tinyMCE.get('mceTextarea').getContent();
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
		tinyMCE.get('mceTextarea').setContent(newcontent);
	});	
	
	$('#parallaxsettingsbutton').on('click', function() {	
		$("#parallaxsettingspopup").dialog("close");
		var pbits = $("#parallaxid").val().split('_');
		var oldcontent = tinyMCE.get('mceTextarea').getContent();
		var oldcontenta = oldcontent.split('Parallax Effect - '+pbits[1]);
		var oldcontentb = oldcontenta[1].split('</span>');
		var oldpartext = oldcontentb[0];
		var newpartext = oldpartext;
		var parspeed = $('select[name="ParallaxSpeed"]').val();
		newpartext = UpdateParmValue(newpartext, "Speed", parspeed);		
		var newcontent = oldcontent.replace(oldpartext, newpartext);
		var parheight = $('#ParallaxHeight').val();
		newpartext = UpdateParmValue(newpartext, "Height", parheight);
		var newcontent = oldcontent.replace(oldpartext, newpartext);		
		var parheading = $('#ParallaxHeading').val();
		var newcontent = UpdateParmXValue(newcontent, 'parheading_'+pbits[1], parheading);	
		var partext = $('#ParallaxText').val();
		var newcontent = UpdateParmXValue(newcontent, 'partext_'+pbits[1], partext);		
		var parbuttontext = $('#ParallaxButtonText').val();
		var newcontent = UpdateParmXValue(newcontent, 'parbuttontext_'+pbits[1], parbuttontext);		
		var parbuttonlink = $('#ParallaxButtonLink').val();
		var newcontent = UpdateParmXValue(newcontent, 'parbuttonlink_'+pbits[1], parbuttonlink);		
		tinyMCE.get('mceTextarea').setContent(newcontent);
	});	
	

	$('#previewbutton').on('click', function() {
		var webpage_templatename = $('#webpage_templatename').val();
		var oldcontent = tinyMCE.get('mceTextarea').getContent();
		// alert(oldcontent);
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
		    	 webpage_html: oldcontent
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
	
	$('#composerbutton').on('click', function() {
		var webpage_templatename = $('#webpage_templatename').val();
		var oldcontent = tinyMCE.get('mceTextarea').getContent();
		// alert(oldcontent);
		var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_webpagecomposer.php";
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
		    	 webpage_html: oldcontent
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
	
});       
        
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




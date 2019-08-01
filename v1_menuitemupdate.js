$(document).ready( function() {
	
	nextnid = 500;
	
	$("#webpagemenuitempopup").dialog({
		autoOpen: false,
		width: "50%",
		height: "auto",
		overflow: "auto"
	});		
	$("#webpagemenuitempopup").hide();
	
    $('#nestable').nestable({
        maxDepth: 3
    });
    $('#nestable').nestable().on('change', function() {		
        updateOutput($('#nestable').data('output', $('#json_output')));
        // updateOutput($('#nestable').data('output', $('#json_outputview')));
	});	
    
    var updateOutput = function (e) {
      var list = e.length ? e : $(e.target),
          output = list.data('output');
      if (window.JSON) {
        if (output) {
          output.val(window.JSON.stringify(list.nestable('serialize')));
        }
      } else {
        alert('JSON browser support required for this page.');
      }
    };

    var nestableList = $("#nestable > .dd-list");

    var deleteFromMenuHelper = function (target) {
      if (target.data('new') == 1) {
        // if it's not yet saved in the database, just remove it from DOM
        target.fadeOut(function () {
          target.remove();
          updateOutput($('#nestable').data('output', $('#json_output')));
          // updateOutput($('#nestable').data('output', $('#json_outputview')));
        });
      } else {
        // otherwise hide and mark it for deletion
        target.appendTo(nestableList); // if children, move to the top level
        target.data('deleted', '1');
        target.fadeOut();
      }
    };

	var deleteFromMenu = function () {
		var targetId = $(this).data('owner-id');
		var target = $('[data-id="' + targetId + '"]');
      
		$.confirm({
			icon: 'fa fa-question-circle text-warning',
		    title: 'Delete',
		    content: "Delete " + target.data('text') + " and all its subitems ?",
		    buttons: {
		        somethingElse: {
		            text: 'Delete',
		            btnClass: 'btn-red',
		            action: function(){
		                // Remove children (if any)
		                target.find("li").each(function () {
		                  deleteFromMenuHelper($(this));
		                });
		                // Remove parent
		                deleteFromMenuHelper(target);
		                // update JSON
		                updateOutput($('#nestable').data('output', $('#json_output')));
		                // updateOutput($('#nestable').data('output', $('#json_outputview')));
		            }
		        },
		        cancel: function () { 
		        	
		        },
		    }
		});
    };
    
    var prepareEdit = function () {
    	var targetId = $(this).data('owner-id');
      	var target = $('[data-id="' + targetId + '"]');
		$("#webpagemenuitempopup").dialog("open");
		$("#nid").val(target.data("id"));
		$("#MenuItemText").val(target.data("text"));		
		$("#MenuItemTargetType").val(target.data("targettype"));		
		$("#MenuItemWebpageName").val(target.data("webpagename"));		
		$("#MenuItemUrl").val(target.data("url"));		
		$("#MenuItemHide").val(target.data("hide"));
		$("#MenuItemWebpageNameDiv").hide();
		$("#MenuItemUrlDiv").hide();
		if ( $("#MenuItemTargetType").val() == "Webpage" ) { $("#MenuItemWebpageNameDiv").show(); }
		if ( $("#MenuItemTargetType").val() == "URL" ) { $("#MenuItemUrlDiv").show(); }	
		if ( $("#MenuItemTargetType").val() == "Facebook" ) { $("#MenuItemUrlDiv").show(); }			
		if ( $("#MenuItemTargetType").val() == "Twitter" ) { $("#MenuItemUrlDiv").show(); }	
		if ( $("#MenuItemTargetType").val() == "Instagram" ) { $("#MenuItemUrlDiv").show(); }			
    };

    var addToMenu = function () {
		$("#webpagemenuitempopup").dialog("open");		
		$("#nid").val(nextnid);
		nextnid++;
		$("#MenuItemText").val("");
		$("#MenuItemTargetType").val("");
		$("#MenuItemWebpageName").val("");
		$("#MenuItemUrl").val("");
		$("#MenuItemHide").val("");
    };     
    
    ButtonListeners();
    
    function ButtonListeners () { 
        updateOutput($('#nestable').data('output', $('#json_output')));
        updateOutput($('#nestable').data('output', $('#json_outputview')));
        $("#nestable .button-delete").on("click", deleteFromMenu);
        $("#nestable .button-edit").on("click", prepareEdit);
        $("#menu-add").on('click', function(e) {
          e.preventDefault();
          addToMenu();
        });
    }
    
	$('#webpagemenuitemupdatebutton').on('click', function() {		
		var targetid = $("#nid").val();	
		var intext = $("#MenuItemText").val();
		var intargettype = $("#MenuItemTargetType").val();
		var inwebpagename = "";
		var inurl = "";
	    if ( $("#MenuItemTargetType").val() == "Webpage" ) { inwebpagename = $("#MenuItemWebpageName").val(); }
	    if ( $("#MenuItemTargetType").val() == "URL" ) { inurl = $("#MenuItemUrl").val(); }
	    if ( $("#MenuItemTargetType").val() == "Facebook" ) { inurl = $("#MenuItemUrl").val(); }	    
	    if ( $("#MenuItemTargetType").val() == "Twitter" ) { inurl = $("#MenuItemUrl").val(); }	    
	    if ( $("#MenuItemTargetType").val() == "Instagram" ) { inurl = $("#MenuItemUrl").val(); }	    
		var $targettypeicon = "fa fa-file";
	    if ($("#MenuItemTargetType").val() == "Webpage") { targettypeicon = "fa fa-file"; }
	    if ($("#MenuItemTargetType").val() == "URL") { targettypeicon = "fa fa-link"; }
	    if ($("#MenuItemTargetType").val() == "Login") { targettypeicon = "fa fa-sign-in"; }
	    if ($("#MenuItemTargetType").val() == "AccountRegistration") { targettypeicon = "far fa-registered"; }	    
	    if ($("#MenuItemTargetType").val() == "Results") { targettypeicon = "fa fa-trophy"; }
	    if ($("#MenuItemTargetType").val() == "Contacts") { targettypeicon = "fa fa-users"; }
	    if ($("#MenuItemTargetType").val() == "Facebook") { targettypeicon = "fa fa-facebook-square"; }
	    if ($("#MenuItemTargetType").val() == "Twitter") { targettypeicon = "fa fa-twitter"; }
	    if ($("#MenuItemTargetType").val() == "Instagram") { targettypeicon = "fa fa-instagram"; } 		
		$htmlstring = $("#MenuItemText").val();    
	    $htmlstring = $htmlstring+'<span class="button-type btn btn-secondary btn-xs pull-right" data-owner-id="'+targetid+'">'+"\n";
	    $htmlstring = $htmlstring+'<i class="'+targettypeicon+'" aria-hidden="false"></i>'+"\n";
	    $htmlstring = $htmlstring+'</span>'+"\n";   		
	    var inhide = $("#MenuItemHide").val();
		if ( $('[data-id="' + targetid + '"]').length ) {
			// existing item
			var target = $('[data-id="' + targetid + '"]');
		    // alert("webpagemenuitemupdatebutton "+targetid+ " "+$("#MenuItemText").val()+" "+target.data("text"));	    
		    // target.data("id", targetid);
		    target.data("text",intext);
		    target.data("targettype",intargettype);
		    target.data("webpagename",inwebpagename);
		    target.data("url",inurl);
		    target.data("hide",inhide);  
			target.find("> .dd-handle").html($htmlstring);	
		} else {
			// new item
			// alert("new item");			
			nestableList.append(
				'<li class="dd-item" ' +
				'data-id="'+targetid+'" ' +
				'data-text="'+intext+'" ' +
				'data-targettype="'+intargettype+'" ' +
				'data-webpagename="'+inwebpagename+'" ' +
				'data-url="'+inurl+'" ' +
				'data-hide="'+inhide+'" ' +				
				'data-new="1" ' +
				'data-deleted="0">' +
				'<div class="dd-handle">' + $htmlstring + '</div> ' +
				'<span class="button-edit btn btn-primary btn-xs pull-right" ' +
				'data-owner-id="' + targetid + '">' +
				'<i class="fa fa-pencil" aria-hidden="true"></i>' +
				'</span>' +				
				'<span class="button-delete btn btn-danger btn-xs pull-right" ' +
				'data-owner-id="' + targetid + '"> ' +
				'<i class="fa fa-times" aria-hidden="true"></i> ' +
				'</span>' +
				'</li>'
			);			
		}
		$("#webpagemenuitempopup").dialog("close");		
		updateOutput($('#nestable').data('output', $('#json_output')));	
		// updateOutput($('#nestable').data('output', $('#json_outputview')));
		ButtonListeners();
	});	
	
	$('#webpagemenuitemcancelbutton').on('click', function() {
		$("#webpagemenuitempopup").dialog("close");
		// alert("webpagemenuitemcancelbutton");
	});	
	
	$("#MenuItemTargetType").on('change', function() {
		$("#MenuItemWebpageNameDiv").hide();
		$("#MenuItemUrlDiv").hide();
		if ( $("#MenuItemTargetType").val() == "Webpage" ) { $("#MenuItemWebpageNameDiv").show(); }
		if ( $("#MenuItemTargetType").val() == "URL" ) { $("#MenuItemUrlDiv").show(); }		
	});	
    
});


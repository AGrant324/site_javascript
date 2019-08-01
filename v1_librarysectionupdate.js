$(document).ready( function() {
	
	nextnid = 500;
	
	$("#librarysectionpopup").dialog({
		autoOpen: false,
		width: "50%",
		height: "auto",
		overflow: "auto"
	});		
	$("#librarysectionpopup").hide();
	
    $('#nestable').nestable({
        maxDepth: 5
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
		    content: "Delete " + target.data('title') + " and all its subitems ?",
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
		$("#librarysectionpopup").dialog("open");
		$("#nid").val(target.data("id"));
		$("#LibrarySectionId").val(target.data("librarysectionid"));
		$("#LibrarySectionTitle").val(target.data("title"));		
		$("#LibrarySectionEditor").val(target.data("editor"));		
		$("#LibrarySectionSubEditors").val(target.data("subeditors"));		
		$("#LibrarySectionHide").val(target.data("hide"));		
		$("#LibrarySectionSecurity").val(target.data("security"));	
    };

    var addToMenu = function () {
		$("#librarysectionpopup").dialog("open");		
		$("#nid").val(nextnid);
		nextnid++;
		$("#LibrarySectionId").val(TtimeStamp());
		$("#LibrarySectionTitle").val("");
		$("#LibrarySectionEditor").val("");
		$("#LibrarySectionSubEditors").val("");
		$("#LibrarySectionHide").val("");
		$("#LibrarySectionSecurity").val("");
    };     
    
    ButtonListeners();
    
    function ButtonListeners () { 
        // updateOutput($('#nestable').data('output', $('#json_output')));
        $("#nestable .button-delete").on("click", deleteFromMenu);
        $("#nestable .button-edit").on("click", prepareEdit);
        $("#librarysection-add").on('click', function(e) {
          e.preventDefault();
          addToMenu();
        });
    }
    
	$('#librarysectionupdatebutton').on('click', function() {		
		var targetid = $("#nid").val();
		var intitle = $("#LibrarySectionTitle").val();
		var inlibrarysectionid = $("#LibrarySectionId").val();
	    var inhide = $("#LibrarySectionHide").val();		
	    var insecurity = $("#LibrarySectionSecurity").val();
		if ( $('[data-id="' + targetid + '"]').length ) {
			// existing item
			var target = $('[data-id="' + targetid + '"]');
		    // alert("webpagemenuitemupdatebutton "+targetid+ " "+$("#LibrarySectionTitle").val()+" "+target.data("text"));	    
		    target.data("id", targetid);
		    target.data("librarysectionid",inlibrarysectionid);
		    target.data("title",intitle);
		    target.data("hide",inhide);
		    target.data("security",insecurity);  
			target.find("> .dd-handle").html(intitle);	
		} else {
			// new item
			// alert("new item");			
			nestableList.append(
				'<li class="dd-item" ' +
				'data-id="'+targetid+'" ' +
				'data-librarysectionid="'+inlibrarysectionid+'" ' +
				'data-title="'+intitle+'" ' +
				'data-hide="'+inhide+'" ' +
				'data-security="'+insecurity+'" ' +				
				'data-new="1" ' +
				'data-deleted="0">' +
				'<div class="dd-handle">' + intitle + '</div> ' +
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
		$("#librarysectionpopup").dialog("close");		
		updateOutput($('#nestable').data('output', $('#json_output')));	
		ButtonListeners();
	});	
	
	$('#librarysectioncancelbutton').on('click', function() {
		$("#librarysectionpopup").dialog("close");
		// alert("webpagemenuitemcancelbutton");
	});	
	
    
});


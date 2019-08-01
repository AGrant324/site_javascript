$(document).ready( function() {
	
	nextnid = 500;
	
	$("#kbsectionpopup").dialog({
		autoOpen: false,
		width: "50%",
		height: "auto",
		overflow: "auto"
	});		
	$("#kbsectionpopup").hide();
	$("#KBSectionRefDiv").hide();
	
    $('#nestable').nestable({
        maxDepth: 2
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
		$("#kbsectionpopup").dialog("open");
		$("#nid").val(target.data("id"));
		$("#KBSectionId").val(target.data("kbsectionid"));
		$("#KBSectionTitle").val(target.data("title"));	
		$("#KBSectionType").val(target.data("type"));
		$("#KBSectionRefDiv").hide();
		$("#KBSectionRef").val("");
		if (target.data("type") == "HelpItem") {
			$("#KBSectionRefDiv").show();
			$("#KBSectionRef").val(target.data("ref"));			
		}		
    };

    var addToMenu = function () {
		$("#kbsectionpopup").dialog("open");		
		$("#nid").val(nextnid);
		nextnid++;
		$("#KBSectionId").val(TtimeStamp());
		$("#KBSectionTitle").val("");
		$("#KBSectionType").val("HelpItem");
		$("#KBSectionRefDiv").show();
		$("#KBSectionRef").val("");
    };     
    
    ButtonListeners();
    
    function ButtonListeners () { 
        updateOutput($('#nestable').data('output', $('#json_output')));
        updateOutput($('#nestable').data('output', $('#json_outputview')));        
        $("#nestable .button-delete").on("click", deleteFromMenu);
        $("#nestable .button-edit").on("click", prepareEdit);
        $("#kbsection-add").on('click', function(e) {
          e.preventDefault();
          addToMenu();
        });
    }
    
	$('#kbsectionupdatebutton').on('click', function() {		
		var targetid = $("#nid").val();
		var inkbsectionid = $("#KBSectionId").val();
		var intitle = $("#KBSectionTitle").val();
		var intype = $("#KBSectionType").val();		
		var inref = $("#KBSectionRef").val();
		// alert(inref);
		var ddclass = "dd-handle";
		var xtratext = "";
		if ( intype == "HelpSection" ) { 
			ddclass = "dd-handle-alt"; 
		}
		if ( intype == "HelpItem" ) { 
			ddclass = "dd-handle";
			xtratext = " ("+inref+")";
		}	
		if ( $('[data-id="' + targetid + '"]').length ) {
			// existing item
			// alert("KKK"+inref+xtratext);
			var target = $('[data-id="' + targetid+ '"]');
		    target.data("id", targetid);
		    target.data("kbsectionid",inkbsectionid);
		    target.data("title",intitle);
		    target.data("type",intype);
		    target.data("ref",inref);
			target.find('> .'+ddclass).html(intitle + xtratext);			
		} else {
			// new item
			// alert("new item");		
			nestableList.append(
				'<li class="dd-item" ' +
				'data-id="'+targetid+'" ' +
				'data-kbsectionid="'+inkbsectionid+'" ' +
				'data-title="' + intitle + xtratext + '" ' +				
				'data-type="'+intype+'" ' +					
				'data-ref="'+inref+'" ' +			
				'data-new="1" ' +
				'data-deleted="0">' +
				'<div class="'+ddclass+'">' + intitle + '</div> ' +
				'<span class="button-edit btn btn-primary btn-xs pull-right" ' +
				'data-owner-id="' + targetid + '">' +
				'<i class="fa fa-pencil" aria-hidden="true"></i>' +
				'</span>' +				
				'<span class="button-delete btn btn-danger btn-xs pull-right" ' +
				'data-owner-id="' + targetid + '"> ' +
				'<i class="fa fa-times" aria-hidden="true"></i> ' +
				'</span> ' +
				'</li> '
			);			
		}
		$("#kbsectionpopup").dialog("close");		
		updateOutput($('#nestable').data('output', $('#json_output')));	
		// updateOutput($('#nestable').data('output', $('#json_outputview')));	
		ButtonListeners();
	});	
	
	$('#kbsectioncancelbutton').on('click', function() {
		$("#kbsectionpopup").dialog("close");
	});	
	
	$("#KBSectionType").on('change', function() {
		$("#KBSectionRefDiv").hide();
		if ( $("#KBSectionType").val() == "HelpItem" ) { $("#KBSectionRefDiv").show(); }
	});	
    
});


$(document).ready( function() { 

	$('.swatch').on('click', function(event) {
		currentswatchid = $(this).attr("id");
		
		$('.swatch').each(function() {
			$(this).css({"border-color": "gray", 
	            "border-weight":"0px", 
	            "border-style":"none"});
		});

		$(this).css({"border-color": "white", 
            "border-weight":"8px", 
            "border-style":"solid"});
		
		$("#newcorsite_version").val( currentswatchid );
		
	});	
	
});


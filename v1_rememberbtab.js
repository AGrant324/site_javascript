$(document).ready( function() {
	
	// Note: Limited to one tab per page
	// alert("rememberbtab");
	var thisbtabdivid = "";
	
	$('.btabdiv').each(function(i, obj) {	    
		//  alert($(this).attr("id"));
		thisbtabdivid = $(this).attr("id");
	});
	
    $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
        localStorage.setItem(thisbtabdivid+'_activeTab', $(e.target).attr('href'));
    });
    var activeTab = localStorage.getItem(thisbtabdivid+'_activeTab');
    if(activeTab){
        $('#'+thisbtabdivid+' a[href="' + activeTab + '"]').tab('show');
    }
	
});

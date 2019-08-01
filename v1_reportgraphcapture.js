$(document).ready( function() {
	
	$('#myCanvas').hide();
	$('#myImage').hide();
	

	$('#SaveGraphImage').on('click', function(event) {

		setupWait();
		var chartcontainer = $(".highcharts-container").first();
		var chartcontainerid = $(".highcharts-container").first().attr("id");
		// alert(chartcontainerid+" "+$("#"+chartcontainerid).width()+" "+$("#"+chartcontainerid).height());
		var chartsvg = $(".highcharts-container").first().children().first();
		var svgcontent = chartsvg.html();
		// var svg = '<svg xmlns="http://www.w3.org/2000/svg" height="400" width="700" viewBox="0 0 700 400">'+svgcontent+'</svg>';
		var svg = '<svg xmlns="http://www.w3.org/2000/svg" height="'+$("#"+chartcontainerid).height()+'" width="'+$("#"+chartcontainerid).width()+'">'+svgcontent+'</svg>';
		// alert(svg);
		
		var canvas = document.getElementById("myCanvas");
        canvas.width = ($("#"+chartcontainerid).width());
        canvas.height = ($("#"+chartcontainerid).height());
        // alert(canvas.width+' '+canvas.height);
        var ctx = canvas.getContext('2d');       

        var img = document.getElementById("myImage");
        img.width = ($("#"+chartcontainerid).width());
        img.height = ($("#"+chartcontainerid).height());
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
            var imgData = canvas.toDataURL();
            // alert(imgData.length);
    		var reporttype = $('#ReportType').val();
    		if (reporttype == "mpdfreport") {
    			$('#mpdfreport_graphimage').val(imgData);
    			var reportmpdfreport_id = $('#mpdfreport_id').val();
    			var reportmpdfreport_graphimage = $('#mpdfreport_graphimage').val(); 
    		}
    		if (reporttype == "report") {
    			$('#report_graphimage').val(imgData);
    			var reportmpdfreport_id = $('#reportexport_id').val();
    			var reportmpdfreport_graphimage = $('#report_graphimage').val(); 
    		} 
    		startWait("Loading");
    		var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_reportgraphimageupdate.php"; 
    		// alert(sUrl+" "+reporttype+" "+reportmpdfreport_id+" "+reportmpdfreport_graphimage);
    		$.ajax({
    		     url: sUrl,
    		     data: { 
    		    	 ServiceId: JSServiceId(),	        	
    		    	 DomainId: JSDomainId(),
    		    	 ModeId: JSModeId(),	        	
    		    	 PersonId: JSPersonId(),	
    		    	 SessionId: JSSessionId(),		        	
    		    	 LoginModeId: JSLoginModeId(),
    		    	 MenuId: JSMenuId(),
    		    	 ReportType: reporttype,
    		    	 reportmpdfreport_id: reportmpdfreport_id,
    		    	 reportmpdfreport_graphimage: reportmpdfreport_graphimage
    		     },
    		     type: "POST",
    		     dataType: "text",
    		     timeout: 10000,
    		     success: GraphImageSuccess,	        
    		     error: GraphImageFailure  
    		 });
    		 // Define a function to handle the response data.
    		 function GraphImageSuccess(data, status) {
    			// 0 OK/Error 1 report_id 2 Message
    		    var databits = data.split("|");
    		    stopWait(); 
    		    // alert(data);
	    		$.alert({
	    			icon: 'fa fa-bar-chart text-success',
	    			title: "Success",
	    		    content: "Graph Image has been saved successfully."
	    		});	
    		}
    		function GraphImageFailure(xhr, reason, ex) {
	    		$.alert({
	    			icon: 'fa fa-bar-chart text-danger',
	    			title: "Error",
	    		    content: "Graph Image has not been saved."
	    		});	
    		}            
            
        };
        img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg))));
		
	});	
	

});
    

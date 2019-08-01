$(document).ready(function(){
	// alert("sitePHPurl "+ JSSitePHPURL());

	if ( $( "#composerpreviewbutton" ).length ) {}
	else {
		itemlistseq = 0;
		
		/*
		$('.ItemListA').each(function() {
			// alert("ItemListA");
			var thisid = $(this).attr('id');
			itemlistseq++;
			// <p id="fwparms_2" class="ItemList"><img src="../site_assets/event.gif" /> [ItemListA:Category=Article_All;Date=Past;SortBy=Date;SortSeq=Asc;Show=Full;Max=10]</p>
			$(this).after( '<div id="ItemListInclude'+itemlistseq+'"></div>' );
			itemliststring = $(this).html();
			bits1 = itemliststring.split(":");
			bits2 = bits1[1].split("]");
			bits3 = bits2[0].split(";");
			category="Article_All";
			fpdate="Past";
			sortby="Date";
			sortseq="Desc";
			show="Full";
			max="10";
			for (i in bits3) {
				bits4 = bits3[i].split("=");
				if (bits4[0] == "Category") { category=bits4[1]; }
				if (bits4[0] == "Date") { fpdate=bits4[1]; }			
				if (bits4[0] == "SortBy") { sortby=bits4[1]; }
				if (bits4[0] == "SortSeq") { sortseq=bits4[1]; }			
				if (bits4[0] == "Show") { show=bits4[1]; }			
				if (bits4[0] == "Max") { max=bits4[1]; }		
			}
			$(this).after( '<div id="ItemListInclude'+itemlistseq+'"></div>' );
			$(this).remove();
			// alert(category+" "+fpdate+" "+sortby+" "+sortseq+" "+show+" "+max);
			 var uri = JSSitePHPURL()+"/v1_pluginitemlistout.php";
			 // alert(uri);
			 $.ajax({
			     url: uri,
			     data: { 
			    	 ServiceId: JSServiceId(),	        	
			    	 DomainId: JSDomainId(),
			    	 ModeId: JSModeId(),
			    	 Category: category,
			    	 Date: fpdate,
			    	 SortBy: sortby,
			    	 SortSeq: sortseq,		    	 
			 	     Show: show,
			 	     Max: max,
			     },
			     type: "GET",
			     dataType: "text",
			     timeout: 10000,
			     success: ItemsSuccess,	        
			     error: ItemsError
			 });	     
		});
		*/	
		
		/*
		$('.GRLLeagueTableA').each(function() {
			// alert("GRLLeagueTableA");
			var thisid = $(this).attr('id');
			itemlistseq++;
			// <p id="fwparms_2" class="ItemList"><img src="../site_assets/event.gif" /> [GRLLeagueTableA:League=Premier]</p			$(this).after( '<div id="GRLLeagueTableA'+itemlistseq+'"></div>' );
			itemliststring = $(this).html();
			bits1 = itemliststring.split(":");
			bits2 = bits1[1].split("]");
			bits3 = bits2[0].split(";");
			league="Test";
			for (i in bits3) {
				bits4 = bits3[i].split("=");
				if (bits4[0] == "League") { league=bits4[1]; }
			}
			$(this).after( '<div id="GRLLeagueTableAInclude'+itemlistseq+'"></div>' );
			$(this).remove();
			 var uri = JSSitePHPURL()+"/v1_plugingrlleaguetableaout.php";
			 // alert(uri);
			 $.ajax({
			     url: uri,
			     data: { 
			    	 ServiceId: JSServiceId(),	        	
			    	 DomainId: JSDomainId(),
			    	 ModeId: JSModeId(),
			    	 League: league,
			     },
			     type: "GET",
			     dataType: "text",
			     timeout: 10000,
			     success: GRLLeagueTableASuccess,	        
			     error: GRLLeagueTableAError
			 });	     
		});			
		*/
		
		
		// =============  Older Versions ===============================
	
		if($("#EventList").length != 0) {
			// <p id="EventList"><img src="../site_assets/event.gif" /> [EventList:category=all;sortdate=desc;show=full;max=10]</p>
			$("#EventList").after( '<div id="EventListInclude"></div>' );
			eventliststring = $('#EventList').html();
			bits1 = eventliststring.split(":");
			bits2 = bits1[1].split("]");
			bits3 = bits2[0].split(";");
			categoryid="all";
			fpdate="future";
			sortby="date";
			sortseq="desc";
			show="full";
			max="10";
			for (i in bits3) {
				bits4 = bits3[i].split("=");
				if (bits4[0] == "categoryid") { categoryid=bits4[1]; }
				if (bits4[0] == "date") { fpdate=bits4[1]; }			
				if (bits4[0] == "sortby") { sortby=bits4[1]; }
				if (bits4[0] == "sortseq") { sortseq=bits4[1]; }			
				if (bits4[0] == "show") { show=bits4[1]; }			
				if (bits4[0] == "max") { max=bits4[1]; }		
			}
			$("#EventList").after( '<div id="EventListInclude"></div>' );
			$("#EventList").remove();
			// alert(category+" "+sortdate+" "+show+" "+max);
			 var uri = JSSitePHPURL()+"/v1_webpageeventlistout.php";
			 // alert(uri);
			 $.ajax({
			     url: uri,
			     data: { 
			    	 ServiceId: JSServiceId(),	        	
			    	 DomainId: JSDomainId(),
			    	 ModeId: JSModeId(),	        	    	
			    	 CategoryId: categoryid,
			    	 Date: fpdate,
			    	 SortBy: sortby,
			    	 SortSeq: sortseq,		    	 
			 	     Show: show,
			 	     Max: max,
			     },
			     type: "GET",
			     dataType: "text",
			     timeout: 10000,
			     success: EventsSuccess,	        
			     error: EventsError
			 });	     
		}
		
		if ($("#DrawList").length != 0) {
			drawliststring = $('#DrawList').html();
			bits1 = drawliststring.split(":");
			bits2 = bits1[1].split("]");
			bits3 = bits2[0].split(";");
			categoryid="all";
			sortby="date";
			sortseq="desc";
			show="full";
			max="10";
			for (i in bits3) {
				bits4 = bits3[i].split("=");
				if (bits4[0] == "categoryid") { categoryid=bits4[1]; }
				if (bits4[0] == "date") { fpdate=bits4[1]; }				
				if (bits4[0] == "sortby") { sortby=bits4[1]; }
				if (bits4[0] == "sortseq") { sortseq=bits4[1]; }	
				if (bits4[0] == "show") { show=bits4[1]; }			
				if (bits4[0] == "max") { max=bits4[1]; }		
			}
			$("#DrawList").after( '<div id="DrawListInclude"></div>' );
			$("#DrawList").remove();	
			 var uri = JSSitePHPURL()+"/v1_webpagedrawlistout.php";
			 $.ajax({
			     url: uri,
			     data: { 
			    	 ServiceId: JSServiceId(),	        	
			    	 DomainId: JSDomainId(),
			    	 ModeId: JSModeId(),		    	
			    	 CategoryId: categoryid,
			    	 Date: fpdate,		    	 
			    	 SortBy: sortby,
			    	 SortSeq: sortseq,	
			 	     Show: show,
			 	     Max: max,		    	 
			     },
			     type: "GET",
			     dataType: "text",
			     timeout: 10000,
			     success: DrawsSuccess,	        
			     error: DrawsError
			 });	     
		}
		
		if($("#ArticleList").length != 0) {
			articleliststring = $('#ArticleList').html();
			bits1 = articleliststring.split(":");
			bits2 = bits1[1].split("]");
			bits3 = bits2[0].split(";");
			categoryid="all";
			sortby="date";
			sortseq="desc";
			show="full";
			max="10";
			for (i in bits3) {
				bits4 = bits3[i].split("=");
				if (bits4[0] == "categoryid") { categoryid=bits4[1]; }
				if (bits4[0] == "sortby") { sortby=bits4[1]; }
				if (bits4[0] == "sortseq") { sortseq=bits4[1]; }	
				if (bits4[0] == "show") { show=bits4[1]; }			
				if (bits4[0] == "max") { max=bits4[1]; }		
			}
			$("#ArticleList").after( '<div id="ArticleListInclude"></div>' );
			$("#ArticleList").remove();	
			 var uri = JSSitePHPURL()+"/v1_webpagearticlelistout.php";
			 $.ajax({
			     url: uri,
			     data: { 
			    	 ServiceId: JSServiceId(),	        	
			    	 DomainId: JSDomainId(),
			    	 ModeId: JSModeId(),	        	    	
			    	 CategoryId: categoryid,
			    	 SortBy: sortby,
			    	 SortSeq: sortseq,	
			 	     Show: show,
			 	     Max: max,		    	 
			     },
			     type: "GET",
			     dataType: "text",
			     timeout: 10000,
			     success: ArticlesSuccess,	        
			     error: ArticlesError
			 });	     
		}
		
		if($("#CourseList").length != 0) {
			courseliststring = $('#CourseList').html();
			bits1 = courseliststring.split(":");
			bits2 = bits1[1].split("]");
			bits3 = bits2[0].split(";");
			categoryid="all";
			fpdate="future";
			sortby="date";
			sortseq="asc";
			show="full";
			max="10";
			for (i in bits3) {
				bits4 = bits3[i].split("=");
				if (bits4[0] == "categoryid") { categoryid=bits4[1]; }
				if (bits4[0] == "date") { fpdate=bits4[1]; }				
				if (bits4[0] == "sortby") { sortby=bits4[1]; }
				if (bits4[0] == "sortseq") { sortseq=bits4[1]; }	
				if (bits4[0] == "show") { show=bits4[1]; }			
				if (bits4[0] == "max") { max=bits4[1]; }		
			}
			$("#CourseList").after( '<div id="CourseListInclude"></div>' );
			$("#CourseList").remove();	
			 var uri = JSSitePHPURL()+"/v1_webpagecourselistout.php";
			 $.ajax({
			     url: uri,
			     data: { 
			    	 ServiceId: JSServiceId(),	        	
			    	 DomainId: JSDomainId(),
			    	 ModeId: JSModeId(),		    	
			    	 CategoryId: categoryid,
			    	 Date: fpdate,		    	 
			    	 SortBy: sortby,
			    	 SortSeq: "asc",	
			 	     Show: show,
			 	     Max: max,		    	 
			     },
			     type: "GET",
			     dataType: "text",
			     timeout: 10000,
			     success: CoursesSuccess,	        
			     error: CoursesError
			 });	     
		}
	
	}
	
});

function ItemsSuccess(data, status) {
    // alert(data);
	$('#ItemListInclude'+itemlistseq).html(data); 
}

function ItemsError(xhr, reason, ex) {
	// messageAlert("Error Reason="+xhr+reason+ex+"<br>url: "+uri+"?Difficulty="+difficultystring+"&LatestPuzzle="+lateststring+"&SpecificPuzzle="+specificstring);
	messageAlert("You are not connected to the internet at this time");
} 	
	
function EventsSuccess(data, status) {
    // alert(data);
	$("#EventListInclude").html(data); 
}

function EventsError(xhr, reason, ex) {
	// messageAlert("Error Reason="+xhr+reason+ex+"<br>url: "+uri+"?Difficulty="+difficultystring+"&LatestPuzzle="+lateststring+"&SpecificPuzzle="+specificstring);
	messageAlert("You are not connected to the internet at this time");
} 

function ArticlesSuccess(data, status) {
    // alert(data);
	$("#ArticleListInclude").html(data); 
}

function ArticlesError(xhr, reason, ex) {
	// messageAlert("Error Reason="+xhr+reason+ex+"<br>url: "+uri+"?Difficulty="+difficultystring+"&LatestPuzzle="+lateststring+"&SpecificPuzzle="+specificstring);
	messageAlert("You are not connected to the internet at this time");
}

function CoursesSuccess(data, status) {
    // alert(data);
	$("#CourseListInclude").html(data); 
}

function CoursesError(xhr, reason, ex) {
	// messageAlert("Error Reason="+xhr+reason+ex+"<br>url: "+uri+"?Difficulty="+difficultystring+"&LatestPuzzle="+lateststring+"&SpecificPuzzle="+specificstring);
	messageAlert("You are not connected to the internet at this time");
} 

/*
function GRLLeagueTableASuccess(data, status) {
    // alert(data);
	$('#GRLLeagueTableAInclude'+itemlistseq).html(data); 

	var ref = $('#simpletabletable_LeagueA_2017-18_Premier').DataTable( );
	ref.ajax.reload();
		
	$('.dataTables_scrollBody').css('min-height', '100px'); // Workaround to avoid horix scoller obscuring small lists  

}

function GRLLeagueTableAError(xhr, reason, ex) {
	// messageAlert("Error Reason="+xhr+reason+ex+"<br>url: "+uri+"?Difficulty="+difficultystring+"&LatestPuzzle="+lateststring+"&SpecificPuzzle="+specificstring);
	alert("You are not connected to the internet at this time");
} 
*/

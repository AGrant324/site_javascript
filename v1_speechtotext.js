$(document).ready( function() { 
	  
	var gridymax = 11;	
	var gridxmax = 8;
	var gridyn = 1;  
	var gridxn = 1;
	var gridresult = "";
	
	lightgrey = "#F8F9F9";
	midgrey = "#CCD1D1";
	green = "#D5F5E3";
	amber = "#F9E79F",
	red = "#FADBD8";
		
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
    	$("#SpeechIn").css('background-color', red);
    	$('#SpeechStart').on('click', function(event) { 		
    		$("#SpeechIn").css('background-color', green);
        	UnHighlightGrid(gridymax,gridxmax);
        	HighlightGridElement(1,1);
        	StartRecognition(gridyn,gridxn,gridymax,gridxmax); 
    	});
    	$('#SpeechStop').on('click', function(event) { 
    		$("#SpeechIn").css('background-color', red);
			$("#SpeechIn").val("");
			StopRecognition();
    	}); 	
	} else {
		alert("This browser does not support speech recognition.");
		
	}

});
  
function StartRecognition(gridyn,gridxn,gridymax,gridxmax) {
	alert("StartRecognition");
	$("#SpeechIn").css('background-color', green);
	$("#SpeechIn").val("");
	
	recognition = new webkitSpeechRecognition();
	recognition.continuous = false;
	recognition.interimResults = false;
	recognition.lang = "en-GB";
	recognition.start();

	recognition.onresult = function(e) {
		gridresult = e.results[0][0].transcript;
		gridresult = gridresult.replace(/ /g, "");
		gridresult = gridresult.replace(/to/g, "2");
		gridresult = gridresult.replace(/for/g, "4");
		gridresult = gridresult.replace(/point/g, ".");
		gridresult = gridresult.replace(/seven/g, "7");			
		gridresult = gridresult.replace(/sex/g, "6");	
		
		alert(gridresult);
		if (gridresult.includes(".")) {
			// alert("Point");
			var gridpointa = gridresult.split(".");
			if (gridpointa.length == 3) {
				// alert(gridpointa[0]+" "+gridpointa[1]+" "+gridpointa[2])
				gridyn = gridpointa[0];
				gridxn = gridpointa[1];
				gridresult = gridpointa[2];
			}
		}
		if (gridresult == "back") {
			$("#SpeechIn").val("back");
			if (isEven(gridyn)) {			
				gridxn++;
				if ( gridxn > gridxmax ) {
					gridyn--;
					gridxn = gridxmax;
				}						
			} else {			
				gridxn--;
				if ( gridxn < 1 ) {
					gridyn--;
					if ( gridyn < 1 ) {
						gridyn = 1;
						gridxn = 1;
					}
				}				
			}
			UnHighlightGrid(gridymax,gridxmax);
			HighlightGridElement(gridyn,gridxn);
			$("#"+GridXY2ID(gridyn,gridxn)).val(gridresult);
			
		    setTimeout( function(){
		    	StartRecognition(gridyn,gridxn,gridymax,gridxmax);	    	
		    }, 10 ); 
			
		} else {	
			// alert(thisgridid+" "+gridresult); 
			$("#SpeechIn").val(gridresult);
			// recognition.stop();
			UnHighlightGrid(gridymax,gridxmax);
			HighlightGridElement(gridyn,gridxn);
			$("#"+GridXY2ID(gridyn,gridxn)).val(gridresult);
			
			if (isEven(gridyn)) {			
				gridxn--;
				more = "1";
				if ( gridxn < 1 ) {
					gridyn++;
					if ( gridyn <= gridymax ) {
						gridxn = 1;
					} else {
						more = "0";
					}
				}						
			} else {			
				gridxn++;
				more = "1";
				if ( gridxn > gridxmax ) {
					gridyn++;
					if ( gridyn <= gridymax ) {
						gridxn = gridxmax;
					} else {
						more = "0";
					}
				}
				
			}
			
			if ( more == "1" ) {			
			    setTimeout( function(){
			    	// $("#SpeechIn").val("");
			    	StartRecognition(gridyn,gridxn,gridymax,gridxmax);	    	
			    }, 10 ); 
			}
		}	
	};
	
	recognition.onerror = function(e) {
		alert("Error "+e.error+" "+e.message);
		recognition.stop();
		if (e.error == "no-speech") {
		    setTimeout( function(){
				$("#SpeechIn").css('background-color', amber);
				$("#SpeechIn").val("Timeout");
		    	StartRecognition(gridyn,gridxn,gridymax,gridxmax);	    	
		    }, 10 );		
		} else {
			alert("Error "+e.error+" "+e.message);
		}
	}
}	

function StopRecognition(recognition) {
	alert("StopRecognition");
	$("#SpeechIn").css('background-color', red);
	$("#SpeechIn").val("Stopped");
	recognition.stop();
}

  
function GridXY2ID(gridy,gridx) {
	var ynumstring = "00000"+gridy;
	var xnumstring = "00000"+gridx;
	var idstring = ynumstring.substr(ynumstring.length - 2)+"-"+xnumstring.substr(xnumstring.length - 2);
		return idstring;
}
 
function UnHighlightGrid(gridymax,gridxmax) {
	for (var yi=1; yi<=gridymax; yi++) {
		for (var xi=1; xi<=gridxmax; xi++) {
			if ( $("#"+GridXY2ID(yi,xi)).val() =="") { $("#"+GridXY2ID(yi,xi)).css('background-color', midgrey); }
			else { $("#"+GridXY2ID(yi,xi)).css('background-color', lightgrey); }	
		}	
	}
}	

function HighlightGridElement(yi,xi) {
	var thisgridid = GridXY2ID(yi,xi);
	$("#"+thisgridid).css('background-color', green);
}	

function isEven(n) {
  return n == parseFloat(n)? !(n%2) : void 0;
}

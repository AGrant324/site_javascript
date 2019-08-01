
$(document).ready( function() {
	
    $('.img-modalview').on('click', function() {		
        var img = $(this);
        var imagesrc = $(this).attr('src');        
        var realWidth = 0;
        var realHeight = 0;
              
        if ($('#composermode').length){
           // dont preview images in composer mode 
        } else {
            // Create dummy image to get real width and height
            $("<img>").attr("src", $(img).attr("src")).load(function(){
                realWidth = this.width;
                realHeight = this.height;
                // alert("Original width=" + realWidth + ", " + "Original height=" + realHeight);
                $('.modal-dialog').width(realWidth*1.05);
                $('#imagepreview').attr('src', imagesrc); // here asign the image to the modal when the user click the enlarge link
                $('#imagemodal').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function           
            });       
        }   
    });


    if($("#popup_alert").length) {
        $("#popup_alert").hide();
        $('#popup_alertOKbutton').on('click', function() {
                 $("#popup_alert").hide();	  
        });
    }
    if($("#popup_confirm").length) {
        $("#popup_confirm").hide(); 
        $('#popup_confirmOKbutton').on('click', function() {
           $("#popup_confirm").hide();			  
           var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_keepalive.php"+STDPARMS(); 
           $.ajax({
                type: "GET",
                url: sUrl,
                success: function(data) {
                  dbits = data.split(',');
                  if ( dbits[0] == "1" ) { 
                          resetTimeoutHandle(JSPersonId());
                  }
                  else { alert("Invalid Session - Please login again"); }
                },
                error: function() {
                  alert('Please try again - 1');
                }
           }); 
        });	 
        $('#popup_confirmcancelbutton').on('click', function() {
                $("#popup_confirm").hide();
                var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_personloginout.php"+STDPARMS(); 
                $("#nav_Login").attr("href", sUrl);
                $("#nav_Login").html("Login");	

                $.ajax({
                           type: "GET",
                           url: sUrl,
                             success: function() {
                                       $("#main").html("<h2>Thank You, You have now been logged out successfully.</h2>");
                             },
                             error: function() {
                                 alert('Please try again - 2');
                             }
                }); 
        });	 
    } 

    //  ===== Large nbanner =============================== 
    // When site loaded, load the Popupbox First
    loadPopupBox();

    $('#popupBoxClose').click( function() {            
        unloadPopupBox();
    });
    
    $('#pagecontainer').click( function() {
        unloadPopupBox();
    });      
    
});       
  
function resetTimeoutHandle(person_id) {
    window.clearTimeout(timeoutHandle);
    // alert($("#JSTimeOut").val());
    var timeoutDuration = (parseFloat($("#JSTimeOut").val())*60000) - 120000;  // Timeout minus 2 minutes
    // alert(timeoutDuration);
    /*
     if ( person_id == "bbra" ) { 
        // alert("reset timeouthandle"); 
        timeoutDuration = 4000; 
     */
    var timeoutHandle = window.setTimeout(function( ) { 
           $('#popup_confirmmessage').html("You don't seem to be using the website at the moment. You will be logged out in 2 minutes time.");	   		 
           $('#popup_confirmOKbutton').html("Please keep me logged in");		   		 
           $('#popup_confirmcancelbutton').html("Logout now");		   		 
           $('#popup_confirm').fadeIn("slow")
    }, timeoutDuration);
}

        
function unloadPopupBox() {    // TO Unload the Popupbox
    $('#popup_box').fadeOut("slow");
    // $("#maincontainer").css({ // this is just for style        
    //     "opacity": "1"  
    // }); 
}    

function loadPopupBox() {    // To Load the Popupbox
    $('#popup_box').fadeIn("slow");
    // $("#maincontainer").css({ // this is just for style
    //    "opacity": "0.3"  
    // }); 
    $("#popup_box").css({ // this is just for style        
    	"border": "4px solid navy",
    	"opacity": "1.0"              		
    });             
} 
        
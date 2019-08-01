

$(document).ready( function() {
	
    if ( $('#headercarouselparm').length ) {
	var headercarouselparms = $('#headercarouselparms').val();
        if (headercarouselparms != "") {
            var headercarouselparma = headercarouselparms.split("|"); 
            var headercarouselType = headercarouselparma[0];
            var headercarouselHeight = headercarouselparma[1];
            var headercarouselWidth = headercarouselparma[2];
            var headercarouselSpeed = headercarouselparma[3];
            var headercarouselImageRandomise = headercarouselparma[4];
            var headercarouselScreenDepth = headercarouselparma[5];	

            if (headercarouselType == "Carousel") {
                    var $item = $('.carousel .item');
                    $item.addClass('full-screen');
                    if (headercarouselImageRandomise == "Yes") {
                            var $numberofSlides = $('.item').length;
                            var $currentSlide = Math.floor((Math.random() * $numberofSlides));

                            $('.carousel-indicators li').each(function(){
                              var $slideValue = $(this).attr('data-slide-to');
                              if($currentSlide == $slideValue) {
                                $(this).addClass('active');
                                $item.eq($slideValue).addClass('active');
                              } else {
                                $(this).removeClass('active');
                                $item.eq($slideValue).removeClass('active');
                              }
                            });

                            $('.carousel img').each(function() {
                              var $src = $(this).attr('src');
                              var $color = $(this).attr('data-color');
                              $(this).parent().css({
                                'background-image' : 'url(' + $src + ')',
                                'background-color' : $color
                              });
                              $(this).remove();
                            });
                    }
                    /*
                    $(window).on('resize', function (){
                      $wHeight = $(window).height();
                      $item.height($wHeight);
                    });
                    */
                    $('.carousel').carousel({
                      interval: headercarouselSpeed,
                      pause: "false"
                    });

                    $('#headercarousel').css(
                            'height',headercarouselScreenDepth
                    );
            }

            if (headercarouselType == "Parallax") {
                    var item = $('.headerparallaximage');
                    // var $wHeight = $(window).height();
                    // $item.height($wHeight); 
                    // $item.addClass('full-screen');
                    if (headercarouselImageRandomise == "Yes") {		
                            var numberofSlides = item.length;
                            var currentSlide = Math.floor((Math.random() * numberofSlides))+1;
                            var imageref = '#headerparallaximage_'+String(currentSlide);
                            var chosenimage = 'url("'+$(imageref).val()+'")';
                            // alert(imageref +" - "+ chosenimage);
                            $('#headercarousel').css('background-image', chosenimage);
                            var headerref = '#headerparallaxheader_'+String(currentSlide);
                            var chosenheader = $(headerref).val();
                            $('#headerparallaxheader').html(chosenheader);			
                            var textref = '#headerparallaxtext_'+String(currentSlide);
                            var chosentext = $(textref).val();
                            $('#headerparallaxtext').html(chosentext);				
                            var buttontextref = '#headerparallaxbuttontext_'+String(currentSlide);
                            var chosenbuttontext = $(buttontextref).val();
                            $('#headerparallaxbutton').html(chosenbuttontext);				
                            var buttonlinkref = '#headerparallaxbuttonlink_'+String(currentSlide);
                            var chosenbuttonlink = $(buttonlinkref).val();
                            $('#headerparallaxbutton').attr('href', chosenbuttonlink);		
                            // <a  id="headerparallaxbutton" href="http://www.bbc.co.uk" class="btn-cta">Button</a>
                    }
            }

            if (headercarouselType == "Image") {
                var item = $('.headersimpleimage');
                // var $wHeight = $(window).height();
                // $item.height($wHeight); 
                // $item.addClass('full-screen');
                if (headercarouselImageRandomise == "Yes") {		
                        var numberofSlides = item.length;
                        var currentSlide = Math.floor((Math.random() * numberofSlides))+1;
                        var imageref = '#headersimpleimage_'+String(currentSlide);
                        var chosenimage = 'url("'+$(imageref).val()+'")';
                        $('#headercarousel').css('background-image', chosenimage);
                        // $('#headercarousel').addClass('full-screen');
                }
            }
        }
    }
    
});       
  

        
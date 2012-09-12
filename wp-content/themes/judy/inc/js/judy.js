var judyScript = {
	imagesQty:0,
	imagesLoaded:0,
	okToRun : false,
	init:function(){
	    $('.words').find('li').each(function(){
	        //console.info($(this).find('img').length);
	        judyScript.imagesQty += $(this).find('img').length;
	        var imageLoaded = function() {
                    //console.info('judyScript.imagesQty judyScript.imagesLoaded '+judyScript.imagesQty +' '+ judyScript.imagesLoaded)
                    ++judyScript.imagesLoaded;
                    if(judyScript.imagesQty == judyScript.imagesLoaded){
                        $('.words').trigger('imagesLoaded',['Custom', 'Event']);
                        //console.info('ALL IMAGES LOADED TRIGERRING ')
                    }
            }
	        $(this).find('img').each(function(){
	            
	         
                var tmpImg = new Image() ;
                tmpImg.onload = imageLoaded ;
                tmpImg.src = $(this).attr('src') ;
                
	        })
	    });
	},
	startTheDream : function(){
		
		var actualImage = $('.word-images li:first');
		var actualTiming = [];
		var allHeights = [];
		var iterator = 0;
		
		$('.words').find('li').each(function(){
			
			var allItems = $(this).html().split('||');
			actualTiming.push(allItems[1]);
			
			if(allItems[2]){
				allHeights.push(allItems[2])
				$(this).html($(this).html().replace('||'+allItems[2], ''));
				$(this).attr('style','position:absolute; top:'+allItems[2]+'% !important');
			}
			else{
				allHeights.push(0)
			}
			
			$(this).html($(this).html().replace('||'+allItems[1], ''));
			
		});
		
		var oldImage;
		var iterator= 0;
		
		$('.words').cycle({
			
			interval:500,
			autostop:true,
			
			before:function(currSlideElement, nextSlideElement, options, forwardFlag){
				//console.info(options);
				
			},
			
			after:function(currSlideElement, nextSlideElement, options, forwardFlag){
				
				$('.words').cycle('pause');
				//console.info('Paused');
				//console.info(actualTiming[iterator]*1000);
				setTimeout(function(){
				    if(judyScript.okToRun == true){
				       $('.words').cycle('resume');
					   //console.info('resumed');
				    }
					
				},actualTiming[iterator]*1000);
				++ iterator;
			},
			end: function(){
			    
			    location.hash = 'home-navigation';
				$('.words').fadeOut(3000);
				
			}
			
		});
		$('.words').cycle('pause');
	},
	addListeners : function(){
	    
	    var actualHash = location.hash;
	    
	    
	    $('.navigation-1').click(function(){
	        
	        console.info('navigation '+$(this).attr('href'));
	        var url = $(this).attr('href').replace('#','');	
	        actualHash = $(this).attr('href');
	        $('.home-navigation').load(website+'/'+url, function(){
	            $('.home-navigation').fadeIn('2000');
	        });
	        $('.words').fadeOut('2000');
	        $('.home-navigation').fadeOut('2000');
	       
	    });
	    
	    var direction = 1;
	    jQuery('.navigation-1').mouseenter(function(e){
	        direction = direction * -1;
	        
	        var arc_params = {
                center: [400,e.pageY],  
                    radius: 100,    
                    start: 100,
                    end: e.pageX,
                    dir: direction
          };
              actualX = e.pageX;
              actualY = e.pageY;
            
            $('.icarius-button-bkg').animate({
                                                path : new $.path.arc(arc_params),
                                                opacity:1
                                              }, 2500)
                                              
          
	       
	    });
	    
	    jQuery('.navigation-1').mouseleave(function(e){
	        $('.icarius-button-bkg').animate({opacity:0},500);
	    });
	    
	    setInterval(function(){
	        console.info(location.hash +'   '+ actualHash)
	        if(location.hash != actualHash){
	            if(location.hash == ''){	                
	                location.hash = 'home-navigation';
	            }
	            else{
	                var url = location.hash.replace('#','');
                 
                    $('.home-navigation').load(website+'/'+url, function(){
                        
                        $('.home-navigation').fadeIn('2000');
                        
                    });
                    $('.words').fadeOut('2000');
                    $('.home-navigation').fadeOut('2000');
                    actualHash = location.hash;
	            }
                
	        }
	    },500);
	}
	
};
$(document).ready(function(){
	judyScript.init();
	judyScript.addListeners();
	judyScript.startTheDream();
	$('.words').bind('imagesLoaded', function(){
	    //console.info('Go go go');
	    judyScript.okToRun = true;
	    $('.words').cycle('resume');
	})
	
})

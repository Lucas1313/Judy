var judyScript = {
	
	init:function(){
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
							
			},
			
			after:function(currSlideElement, nextSlideElement, options, forwardFlag){
				
				$('.words').cycle('pause');
				console.info('Paused');
				console.info(actualTiming[iterator]*1000);
				setTimeout(function(){
					$('.words').cycle('resume');
					console.info('resumed');
				},actualTiming[iterator]*1000);
				++ iterator;
			},
			end: function(){
				$('.words').fadeOut(3000);
				$('.home-navigation').fadeIn(3000);
			}
			
		});
		
		//$('.words').cycle('pause');
		
	}
	
};
$(document).ready(function(){
	judyScript.init();
	judyScript.startTheDream();
})

var judyScript = {
	
	init:function(){
	},
	startTheDream : function(){
		
		var actualImage = $('.word-images li:first');
		var actualTiming = $('.timing-words li:first');
		
		var oldImage;
		var iterator= 0;
		
		$('.words').cycle({
			
			interval:10000,
			autostop:true,
			
			after:function(){
				
				var timingArray = $(actualTiming).html().split(',');
				
				var wordTiming = timingArray[0] * 1000;
				console.info('wordTiming = '+wordTiming)
				
				var imageTiming = timingArray[1] * 1000;
				console.info('imageTiming = '+imageTiming)
				
				var imageStay = timingArray[2] * 1000;
				console.info('imageStay = '+imageStay)
				
				if(iterator > 0){	
					
					$('.words').cycle('pause');
					
					$('.words').fadeOut(5000);
					
	
					$(actualImage).fadeIn(imageTiming, function(){
						setInterval(function(){
							$('.words').fadeIn(500);
							$('.words').cycle('resume');
							$('.words').cycle('next');
							
					 }, imageStay);
					 
					console.info('after');
					actualImage = $(actualImage).next();
					$(oldImage).fadeOut(1000);
					oldImage = actualImage;
				
				});
				
				
			
				}
				++ iterator;
			}
		});
		
		//$('.words').cycle('pause');
		
	}
	
};
$(document).ready(function(){
	judyScript.init();
	judyScript.startTheDream();
})

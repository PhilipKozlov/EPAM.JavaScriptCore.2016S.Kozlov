$(function (){
	var array = ["images/bomb.png","images/cheese.png","images/cherry.png","images/orange.png","images/pumpkin.png"];
	// counters
	var cheeseCounter = 0;
	var cherryCounter = 0;
	var orangeCounter = 0;
	var pumpkinCounter = 0;
	
	// handle
	var handle;
	var bombHandle;
	
	// initial counter state
	var initState = '<p class="text">-</p>';
	var $counter = $('.counter-cheese');
	$counter.html(initState);
	$counter = $('.counter-cherry');
	$counter.html(initState);
	$counter = $('.counter-orange');
	$counter.html(initState);
	$counter = $('.counter-pumpkin');
	$counter.html(initState);
	
	//button
	var $button = $('<button type="button">Start</button>');
	$button.addClass("button-green");
	$button.appendTo($(".buttons"));
	$button.on("click", function(){
		if ($(this).text() == "Start"){
			$(".resource").fadeIn(function(){
				$(this).remove();
			});
			$(".bomb").fadeIn(function(){
				$(this).remove();
			});
			$(this).text("Stop");
			$(this).removeClass("button-green");
			$(this).addClass("button-orange");
			handle = setTimeout(makeDiv, 500);
			bombHandle = setTimeout(makeBomb, 5000);

		}
		else{
			clearTimeout(handle);
			clearTimeout(bombHandle);
			$(this).text("Start");
			$(this).removeClass("button-orange");
			$(this).addClass("button-green");
			
			$(".resource").stop(false,false);
			$(".bomb").stop(false,false);
		}
	});
	
	function makeBomb(){
		var divsize = 64;
		var $newdiv = $('<div>');
		$newdiv.css({
			'background-image':'url(' + array[0] + ')'
		});  
		$newdiv.addClass('bomb');
		
		$newdiv.on('mouseover', function(){
			$(this).remove();
			var rnd = random(1,5);
			switch(rnd){
				case 1: var $temp = $('.counter-cheese');
						cheeseCounter=0;
						$temp.html('<p class="text">-</p>');
						break;
				case 2: var $temp = $('.counter-cherry');
						cherryCounter=0;
						$temp.html('<p class="text">-</p>');
						break;
				case 3: var $temp = $('.counter-orange');
						orangeCounter=0;
						$temp.html('<p class="text">-</p>');
						break;
				case 4: var $temp = $('.counter-pumpkin');
						pumpkinCounter=0;
						$temp.html('<p class="text">-</p>');
						break;
			}
		});
		
		var posx = random($('.action-field').position().left, $('.action-field').position().left + 100 - divsize);
		var posy = random($('.action-field').position().top, $('.action-field').position().top + 20 + $('.action-field').height() - 2*divsize);

		bombHandle = setTimeout(makeBomb, 5000);
		
		$newdiv.css({
			'position':'absolute',
			'left':posx+'px',
			'top':posy+'px',
			'display':'none'
		}).appendTo('.action-field').fadeIn(2000, function(){
		  $(this).remove();
		  var rnd = random(1,5);
			switch(rnd){
				case 1: var $temp = $('.counter-cheese');
						cheeseCounter-=10;
						var res = cheeseCounter;
						if (cheeseCounter <= 0){
							res = '-';
							cheeseCounter=0;
						}
						$temp.html('<p class="text">' + res + '</p>');
						break;
				case 2: var $temp = $('.counter-cherry');
						cherryCounter-=10;
						var res = cheeseCounter;
						if (cherryCounter <= 0){
							res = '-';
							cherryCounter=0;
						}
						$temp.html('<p class="text">' + res + '</p>');
						break;
				case 3: var $temp = $('.counter-orange');
						orangeCounter-=10;
						var res = cheeseCounter;
						if (orangeCounter <= 0){
							res = '-';
							orangeCounter=0;
						}
						$temp.html('<p class="text">' + res + '</p>');
						break;
				case 4: var $temp = $('.counter-pumpkin');
						pumpkinCounter-=10;
						var res = cheeseCounter;
						if (pumpkinCounter <= 0){
							res = '-';
							pumpkinCounter=0;
						}
						$temp.html('<p class="text">' + res + '</p>');
						break;
			}
		}); 
	}
	
	function makeDiv(){
		var divsize = 64;
		// div type
		var divtype = random(1,4);
		var $newdiv = $('<div>');
		$newdiv.css({
			'background-image':'url(' + array[divtype] + ')'
		});  
		$newdiv.addClass('resource');
		
		$newdiv.on('click', function(){
			switch(divtype){
				case 1: cheeseCounter++;
						var $temp = $('.counter-cheese');
						$temp.html('<p class="text">' + cheeseCounter + '</p>');
						$(this).remove();
						break;
				case 2: cherryCounter++;
						var $temp = $('.counter-cherry');
						$temp.html('<p class="text">' + cherryCounter + '</p>');
						$(this).remove();
						break;
				case 3: orangeCounter++;
						var $temp = $('.counter-orange');
						$temp.html('<p class="text">' + orangeCounter + '</p>');
						$(this).remove();
						break;
				case 4: pumpkinCounter++;
						var $temp = $('.counter-pumpkin');
						$temp.html('<p class="text">' + pumpkinCounter + '</p>');
						$(this).remove();
						break;
			}
		});
		
		var posx = random($('.action-field').position().left, $('.action-field').position().left + 100 - divsize);
		var posy = random($('.action-field').position().top, $('.action-field').position().top + 20 + $('.action-field').height() - 2*divsize);
		
		handle = setTimeout(makeDiv, 500);
		
		$newdiv.css({
			'position':'absolute',
			'left':posx+'px',
			'top':posy+'px',
			'display':'none'
		}).appendTo('.action-field').fadeIn(1700, function(){
		  $(this).remove();
		}); 
	}
});
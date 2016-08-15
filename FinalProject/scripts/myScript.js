$(function (){
	// array of resources
	var array = ['cheese','cherry','orange','pumpkin'];
	// counters
	var cheeseCounter = 0;
	var cherryCounter = 0;
	var orangeCounter = 0;
	var pumpkinCounter = 0;
	// handles
	var resourceHandle;
	var bombHandle;
	// resource size
	var resSize = 64;
	// field where resources will appear
	var $actionField = $('.action-field');
	// bomb display time in ms
	var bombTimeToLive = 2000;
	// resource display time in ms
	var resourceTimeToLive = 1700;
	// resource frequency in ms
	var resourceFrequency = 500;
	// bomb frequency in ms
	var bombFrequency = 5000;
	
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
	var $button = $('#start');
	$button.addClass('button-green');
	$button.on('click', function(){
		var $this = $(this);
		var $text = $this.text();
		if ($text == 'Start'){
			$('.resource').fadeIn(function(){
				$(this).remove();
			});
			$this.text('Stop');
			$this.removeClass('button-green');
			$this.addClass('button-orange');
			resourceHandle = setTimeout(MakeResource, resourceFrequency);
			bombHandle = setTimeout(MakeBomb, bombFrequency);
		}
		else{
			clearTimeout(resourceHandle);
			clearTimeout(bombHandle);
			$this.text('Start');
			$this.removeClass('button-orange');
			$this.addClass('button-green');
			$('.resource').stop(false,false);
		}
	});
	
	// creates a new resource
	function MakeResource(){
		var divtype = random(0,3);
		var $resource = $('<div>');
		$resource.addClass('resource');
		$resource.addClass(array[divtype]);
		var position = GeneratePosition();
		$resource.css({
			'left':position[0]+'px',
			'top':position[1]+'px'
		}).appendTo('.action-field').fadeIn(resourceTimeToLive, function(){
		  $(this).remove();
		});
		$resource.on('click', function(){
			var $this = $(this);
			switch(divtype){
				case 0: cheeseCounter++;
						$('.counter-cheese').html('<p class="text">' + cheeseCounter + '</p>');
						break;
				case 1: cherryCounter++;
						$('.counter-cherry').html('<p class="text">' + cherryCounter + '</p>');
						break;
				case 2: orangeCounter++;
						$('.counter-orange').html('<p class="text">' + orangeCounter + '</p>');
						break;
				case 3: pumpkinCounter++;
						$('.counter-pumpkin').html('<p class="text">' + pumpkinCounter + '</p>');
						break;
			}
			$this.remove();
		});
		resourceHandle = setTimeout(MakeResource, resourceFrequency);
	}
	
	// creates a new bomb
	function MakeBomb(){
		var $bomb = $('<div>');
		$bomb.addClass('resource');
		$bomb.addClass('bomb');
		var position = GeneratePosition();
		$bomb.css({
			'left':position[0]+'px',
			'top':position[1]+'px'
		}).appendTo('.action-field').fadeIn(bombTimeToLive, function(){
			Explode($(this));
		}); 
		bombHandle = setTimeout(MakeBomb, bombFrequency);
	}

	// generate random position within a div
	function GeneratePosition(){
		var posx = random($actionField.position().left, $actionField.position().left + $actionField.width() - resSize);
		var posy = random($actionField.position().top, $actionField.position().top + $actionField.height() - resSize);
		var position = [posx, posy];
		return position;
	}
	
	// explodes the bomb and negates random resource by 10 points
	function Explode($bomb){
		$bomb.remove();
		var rnd = random(0,3);
		switch(rnd){
			case 0: var $temp = $('.counter-cheese');
					cheeseCounter-=10;
					var res = cheeseCounter;
					if (cheeseCounter <= 0){
						res = '-';
						cheeseCounter=0;
					}
					$temp.html('<p class="text">' + res + '</p>');
					break;
			case 1: var $temp = $('.counter-cherry');
					cherryCounter-=10;
					var res = cheeseCounter;
					if (cherryCounter <= 0){
						res = '-';
						cherryCounter=0;
					}
					$temp.html('<p class="text">' + res + '</p>');
					break;
			case 2: var $temp = $('.counter-orange');
					orangeCounter-=10;
					var res = cheeseCounter;
					if (orangeCounter <= 0){
						res = '-';
						orangeCounter=0;
					}
					$temp.html('<p class="text">' + res + '</p>');
					break;
			case 3: var $temp = $('.counter-pumpkin');
					pumpkinCounter-=10;
					var res = cheeseCounter;
					if (pumpkinCounter <= 0){
						res = '-';
						pumpkinCounter=0;
					}
					$temp.html('<p class="text">' + res + '</p>');
					break;
		}
	}
});
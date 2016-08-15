$(function (){
	// resources
	var resources = [{name : 'cheese', counter : 0}, {name : 'cherry', counter : 0}, {name : 'orange', counter : 0}, {name : 'pumpkin', counter : 0}]
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
	
	//button
	var $button = $('#start');
	$button.addClass('button-green');
	$button.on('click', function(){
		var $this = $(this);
		var $text = $this.text();
		var $resources = $('.resource');
		if ($text == 'Start'){
			$resources.removeClass('disabled');
			$resources.off('click', EmptyEvent);
			$resources.fadeIn(function(){
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
			$resources.stop(false, false);
			$resources.addClass('disabled');
			$resources.on('click', EmptyEvent);
			LastToFirst($resources);
		}
	});
	
	// suppresses execution of queued up event handlers
	function EmptyEvent(event){
		event.stopImmediatePropagation();
	}
	
	// places last event handler at the front of the queue
	function LastToFirst($resources){
		$.each($resources, function(div){
			var eventList = $._data($(this)[0], 'events');
			eventList.click.unshift(eventList.click.pop());
		});
	}
	
	// creates a new resource
	function MakeResource(){
		var rnd = random(0, resources.length - 1);
		var $resource = $('<div>');
		$resource.addClass('resource');
		$resource.addClass(resources[rnd].name);
		var position = GeneratePosition();
		$resource.css({
			'left' : position[0] + 'px',
			'top' : position[1] + 'px'
		}).appendTo('.action-field').fadeIn(resourceTimeToLive, function(){
			$(this).remove();
		});
		$resource.on('click', {resource : rnd}, IncrementResource);
		resourceHandle = setTimeout(MakeResource, resourceFrequency);
	}
	
	// creates a new bomb
	function MakeBomb(){
		var $bomb = $('<div>');
		$bomb.addClass('resource');
		$bomb.addClass('bomb');
		var position = GeneratePosition();
		$bomb.css({
			'left' : position[0] + 'px',
			'top' : position[1] + 'px'
		}).appendTo('.action-field').fadeIn(bombTimeToLive, Explode); 
		bombHandle = setTimeout(MakeBomb, bombFrequency);
	}

	// generate random position within a div
	function GeneratePosition(){
		var posX = random($actionField.position().left, $actionField.position().left + $actionField.width() - resSize);
		var posY = random($actionField.position().top, $actionField.position().top + $actionField.height() - resSize);
		var position = [posX, posY];
		return position;
	}
	
	// incremet resource counter
	function IncrementResource(event){
		var rnd = event.data.resource;
		resources[rnd].counter++;
		$('.counter-' + resources[rnd].name).html('<p class="text">' + resources[rnd].counter + '</p>');
		$(this).remove();
	}
	
	// explode the bomb and negate random resource by 10 points
	function Explode(){
		$(this).remove();
		var rnd = random(0, resources.length - 1);
		$counter = $('.counter, .counter-bottom').eq(rnd)
		resources[rnd].counter -= 10;
		var res = resources[rnd].counter;
		if (resources[rnd].counter <= 0){
			resources[rnd].counter = 0;
			res = '-';
		}
		$counter.html('<p class="text">' + res + '</p>');
	}
});
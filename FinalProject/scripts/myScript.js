$(function (){
	// resources
	var resources = [
	{name : 'cheese', counter : 0}, 
	{name : 'cherry', counter : 0}, 
	{name : 'orange', counter : 0}, 
	{name : 'pumpkin', counter : 0}]
	// difficulty levels
	var difficultyLevels = [
	{name : 'Easy', value : 2100}, 
	{name : 'Normal', value : 1400}, 
	{name : 'Hard', value : 700}]
	// settings
	var settings = {
		difficultyLevel : difficultyLevels[0],
		bombTimeToLive : 5000,
		resourceFrequency : 500,
		bombFrequency : 5000
	}
	// handles
	var resourceHandle;
	var bombHandle;
	// resource size in px
	var resSize = 64;
	// field where resources will appear
	var $actionField = $('.action-field');
	// button Start
	var $btnStart = $('#start');
	// button Reset
	var $btnReset = $('#reset');
	
	// registers onclick for Start button
	$btnStart.addClass('button-green');
	$btnStart.on('click', function(){
		var $this = $(this);
		var $text = $this.text();
		var $resources = $('.resource');
		if ($text == 'Start'){
			$btnReset.prop('disabled', false);
			$resources.removeClass('disabled');
			$resources.off('click', EmptyEvent);
			$resources.fadeIn(function(){
				$(this).remove();
			});
			$this.text('Stop');
			$this.removeClass('button-green');
			$this.addClass('button-orange');
			resourceHandle = setTimeout(MakeResource, settings.resourceFrequency);
			bombHandle = setTimeout(MakeBomb, settings.bombFrequency);
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
	
	// registers onclick for Reset button
	$btnReset.addClass('button-red');
	$btnReset.on('click', function(){
		$btnReset.prop('disabled', true);
		$('.resource').remove();
		$('.counter, .counter-bottom').html('<p class="text">-</p>');
		clearTimeout(resourceHandle);
		clearTimeout(bombHandle);
		$btnStart.text('Start');
		$btnStart.removeClass('button-orange');
		$btnStart.addClass('button-green');
		for (var i = 0; i < resources.length; i++){
			resources[i].counter = 0;
		}
	});
	$btnReset.prop('disabled', true);
	
	AddDifficultyLevels();
	
	function AddDifficultyLevels(){
		var $difficulty = $('.difficulty');
		for (var i = 0; i < difficultyLevels.length; i++){
			var level = difficultyLevels[i];
			$difficulty.append($('<option>').attr('value', level.value).text(level.name));
		}
		$difficulty.on('change', function(){
			var $text = $('.difficulty option:selected').text();
			var levels = $.grep(difficultyLevels, function(level){
				return level.name === $text;
			});
			settings.difficultyLevel = levels[0];
		});
	}
	
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
		}).appendTo('.action-field').fadeIn(settings.difficultyLevel.value, function(){
			$(this).remove();
		});
		$resource.on('click', {resource : rnd}, IncrementResource);
		resourceHandle = setTimeout(MakeResource, settings.resourceFrequency);
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
		}).appendTo('.action-field').fadeIn(settings.bombTimeToLive, Explode); 
		bombHandle = setTimeout(MakeBomb, settings.bombFrequency);
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
$(function(){
	// zombie types
	var zombieTypes = [zombie.michael, zombie.strong];
	// zombies
	var zombies = [];
	// max number of lanes
	var numberOfLanes = 5;
	// zombie timeout in ms
	var zombieTimeout = 100;
	// zombie handles
	var zombieHandles = [];
	var $field = $('#field');
	// default zombie config
	var zombieConfig = { movementSpeed : -1, startPosition : $field.position().left + $field.width() - 60, finishPosition : $field.position().left };
	var $gameOver = $('.game-over');

	// registers onclick handler for Generate button
	$('#btnGenerate').on('click', GenerateZombie);
	
	// creates a new zombie
	function GenerateZombie(){
		$gameOver.hide();
		var rnd = random(0, zombieTypes.length - 1);
		var laneNumber = random(0, numberOfLanes - 1);
		var $lane = $($('.field-line')[laneNumber]);
		// add zombie
		var zombie = zombieTypes[rnd](zombieConfig);
		zombies.push(zombie);
		// add zombie to html
		var $zombie = $('<div>');
		$zombie.addClass('zombie');
		$zombie.addClass(zombie.name);
		$zombie.css({
			'left' : zombie.currentPosition + 'px'
		});
		$lane.append($zombie);
		var func = function(){ MoveZombie($zombie, zombie); };
		zombieHandles.push(setTimeout(func, zombieTimeout));
	}

	// moves one zombie towards the finish line
	function MoveZombie($zombie, zombie){
		zombie.move();
		$zombie.css('left', zombie.currentPosition + 'px');
		var func = function(){ MoveZombie($zombie, zombie); };
		zombieHandles.push(setTimeout(func, zombieTimeout));
		if ($zombie.position().left <= zombie.finishPosition){
			GameOver();
		}
	}
	
	// removes all zombies and clears zombies collection
	function GameOver(){
		$('.zombie').remove();
		zombies = [];
		for (var i = 0; i < zombieHandles.length; i++){
			clearTimeout(zombieHandles[i]);
		}
		zombieHandles = [];
		$gameOver.show();
		$gameOver.text('Game Over');
	}
});
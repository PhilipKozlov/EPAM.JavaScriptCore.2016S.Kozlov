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
	var zombieConfig = { movementSpeed : -1, startPosition : $field.position().left + $field.width() - 60, finishPosition : $field.position().left};
	var $gameOver = $('.game-over');

	// registers onclick handler for Generate button
	$('#btnGenerate').on('click', GenerateZombie);
	
	// creates a new zombie
	function GenerateZombie(){
		$gameOver.hide();
		var rnd = random(0, zombieTypes.length - 1);
		var laneNumber = random(0, numberOfLanes - 1);
		var $lane = $($('.field-line')[laneNumber]);
		zombieConfig.$lane = $lane;
		var zombie = new zombieTypes[rnd](zombieConfig);
		// register GameOver function to execute on zombie`s death
		zombie.onDeath(function(event){
			GameOver();
		});
		zombies.push(zombie);
		var func = function(){ MoveZombie(zombie); };
		zombieHandles.push(setTimeout(func, zombieTimeout));
	}

	// moves one zombie towards the finish line
	function MoveZombie(zombie){
		zombie.move();
		var func = function(){ MoveZombie(zombie); };
		zombieHandles.push(setTimeout(func, zombieTimeout));
	}
	
	// removes all zombies and clears zombies collection
	function GameOver(){
		for (var i = 0; i < zombieHandles.length; i++){
			clearTimeout(zombieHandles[i]);
		}
		for (var i = 0; i < zombies.length; i++){
			zombies[i].kill();
		}
		zombieHandles = [];
		zombies = [];
		$gameOver.show();
		$gameOver.text('Game Over');
	}
});
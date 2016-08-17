$(function(){
	//zombies
	var zombies = ['michael', 'strong'];
	// max number of lanes
	var numberOfLanes = 5;
	// zombie move increment in px
	var zombieMoveIncrement = 1;
	//zombie timeout in ms
	var zombieTimeout = 100;
	var $gameOver = $('.game-over');
	var $field = $('#field');
	// zombie handle
	var zombieHandle;
	
	// registers onclick handler for Generate button
	$('#btnGenerate').on('click', GenerateZombie);
	
	// creates a new zombie
	function GenerateZombie(){
		$gameOver.hide();
		var rnd = random(0, zombies.length - 1);
		var laneNumber = random(0, numberOfLanes - 1);
		var $lanes = $('.field-line');
		var $lane = $($lanes[laneNumber]);
		var $zombie = $('<div>');
		$zombie.addClass('zombie');
		$zombie.addClass(zombies[rnd]);
		$zombie.css({
			'left' : $lane.position().left + $('.field').width() + 'px',
			'top' : $lane.position().top + $('.field').height() + 'px'
		});
		$lane.append($zombie);
		
		zombieHandle = clearTimeout(zombieHandle);
		zombieHandle = setTimeout(MoveZombie, zombieTimeout);
	}
	
	// moves one zombie towards the finish line
	function MoveZombie(){
		var $zombies = $('.zombie');
		$.each($zombies, function(div){
			$(this).css('left', (parseFloat($(this).css('left')) - zombieMoveIncrement) + 'px');
			if ($(this).position().left <= $field.position().left){
				$zombies.remove();
				$gameOver.show();
				$gameOver.text('Game Over');
			}
		});
		zombieHandle = setTimeout(MoveZombie, zombieTimeout);
	}
});
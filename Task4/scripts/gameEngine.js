$(function(){
	// zombie types
	var zombieTypes = [zombie.michael, zombie.strong];
	// plant types
	var plantTypes = [plant.peashooter];
	// projectile types
	var projectileTypes = [pea];
	// resource types
	var resourceTypes = [sun];
	// zombies
	var zombies = [];
	// plants
	var plants = [];
	// projectiles
	var projectiles = [];
	// resources
	var resources = [];
	// max number of lanes
	var numberOfLanes = 5;
	
	// timeouts in ms
	var zombieMoveTimeout = 100;
	var resourceMoveTimeout = 100;
	var projectileMoveTimeout = 100;
	var zombieMinTimeout = 1000;
	var zombieMaxTimeout = 2000;
	var resourceTimeout = 1500;
	var projectileTimeout = 2500;
	var agingTimeout = 1000;
	
	// time interval for slowing zombies, in ms
	var slowTime = 10000;
	// time interval for aging zombies
	var agingTime = 10000;
	// how much heath zombies lose while aging is active
	var agingDecrement = 1;
	var explosionDamage = 15;
	
	// handles
	var zombieHandles = [];
	var resourceHandles = [];
	var projectileHandles = [];
	var ageingHandle;
	
	var $field = $('#field');
	var $fieldLane = $('.field-line');
	var $gameOver = $('.game-over');
	
	// default configs
	var zombieConfig = { movementSpeed : -1, startPosition : $field.position().left + $field.width() - 60, finishPosition : $field.position().left, damage : 100};
	var plantConfig = {};
	var projectileConfig = { movementSpeed : 20, damage : 25};
	var resourceConfig = { movementSpeed : 10, $field : $field, top : $field.position().top};
	
	// resource requirements to perform certain actions
	var resourceCount = 0;
	var resourceIncrement = 25;
	var resourcesForPlant = 100;
	var resourcesForExplosion = 50;
	var resourcesForAging = 50;

	// buttons
	var $btnReset = $('#btnReset');
	var $btnStart = $('#btnStart');
	var $btnSlow = $('#btnSlow');
	var $btnExplode = $('#btnExplode');
	var $btnAge = $('#btnAge');
	$btnStart.on('click', Start);
	$btnReset.addClass('disabled');
	$btnSlow.addClass('disabled');
	$btnExplode.addClass('disabled');
	$btnAge.addClass('disabled');
	
	// starts the game
	function Start(){
		$('.field-line').on('click', GeneratePlant);
		resourceHandles.push(setTimeout(GenerateResource, resourceTimeout));
		zombieHandles.push(setTimeout(GenerateZombie, random(zombieMinTimeout, zombieMaxTimeout)));
		$btnStart.addClass('disabled');
		$btnStart.off();
		$btnReset.on('click', Reset);
		$btnReset.removeClass('disabled');
		$btnSlow.removeClass('disabled');
		$btnSlow.on('click', Slow);
		$btnExplode.on('click', Explode);
		$btnExplode.removeClass('disabled');
		$btnAge.on('click', Age);
		$btnAge.removeClass('disabled');
	}
	
	// resets the game
	function Reset(){
		$('.field-line').off();
		$gameOver.hide();
		ResetGame();
		resourceCount = 0;
		$('.resources p').text(resourceCount);
		$btnStart.removeClass('disabled');
		$btnStart.on('click', Start);
		$btnReset.off();
		$btnReset.addClass('disabled');
	}

	// adds new plant when clicking on the lane
	function GeneratePlant(){
		if (resourceCount >= resourcesForPlant){
			resourceCount -= resourcesForPlant;
			if (resourceCount <= 0){
				resourceCount = 0;
			}
			
			$('.resources p').text(resourceCount);
			var $lane = $(this);
			var lanePlants = plants.filter(function(el){ return el.$lane[0] == $($lane)[0]; });
			var startPosition = Math.max.apply(null, lanePlants.map(function(obj){ return obj.currentPosition; })) + 60;
			if (lanePlants.length == 0){
				startPosition = $field.position().left;
			}
			
			plantConfig.$lane = $lane;
			plantConfig.startPosition = startPosition;
			var plant = new plantTypes[0](plantConfig);
			plants.push(plant);
			GenerateProjectile($lane, plant);
		}
	}
	
	// creates a new projectile
	function GenerateProjectile($lane, plant){
		projectileConfig.$lane = $lane;
		projectileConfig.startPosition = plant.currentPosition + 60;
		var  projectile = new projectileTypes[0](projectileConfig);
		projectiles.push(projectile);
		projectileHandles.push(setTimeout(function(){ GenerateProjectile($lane, plant); }, projectileTimeout));
		projectileHandles.push(setTimeout(function(){ MoveProjectile(projectile, $lane); }, projectileMoveTimeout));
	}
	
	// moves one projectile
	function MoveProjectile(projectile, $lane){
		projectile.move();
		var laneZombies = zombies.filter(function (el) {
			return el.$lane[0] == $($lane)[0];
		});
		// remove projectile when it hits zombie;
		// damages zombie
		for (var i = 0; i < laneZombies.length; i++){
			if (projectile.currentPosition >= laneZombies[i].currentPosition){
				projectile.remove();
				laneZombies[i].hit(projectile.damage);
				break;
			}
		}

		if (!projectile.isRemoved){
			projectileHandles.push(setTimeout(function(){ MoveProjectile(projectile, $lane); }, projectileMoveTimeout));
		}
		// remove all 'dead' zombies
		zombies = $.grep(zombies, function(e){ 
			 return !e.isDead; 
		});
	}
	
	// creates a new resource
	function GenerateResource(){
		resourceConfig.left = random($fieldLane.position().left, $fieldLane.position().left + $field.width() - 60);
		var resource = new resourceTypes[0](resourceConfig);
		resource.onClick(function(){
			resourceCount += resourceIncrement;
			$('.resources p').text(resourceCount);
		});
		resources.push(resource);
		resourceHandles.push(setTimeout(GenerateResource, resourceTimeout));
		resourceHandles.push(setTimeout(function(){ MoveResource(resource);}, resourceMoveTimeout));
	}
	
	// moves one resource 
	function MoveResource(resource){
		resource.move();
		resourceHandles.push(setTimeout(function(){ MoveResource(resource); }, resourceMoveTimeout));
	}
	
	// creates a new zombie
	function GenerateZombie(){
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
		zombieHandles.push(setTimeout(func, zombieMoveTimeout));
		zombieHandles.push(setTimeout(GenerateZombie, random(zombieMinTimeout, zombieMaxTimeout)));
	}

	// moves one zombie towards the finish line
	function MoveZombie(zombie){
		if (!zombie.isDead){
			zombie.move();
			var lanePlants = plants.filter(function (el) {
				return el.$lane[0] == zombie.$lane[0];
			});
			// damage a plant when zombie reaches it
			for (var i = 0; i < lanePlants.length; i++){
				if (zombie.currentPosition <= lanePlants[i].currentPosition + 50){
					lanePlants[i].hit(zombie.damage);
					break;
				}
			}
			
			// remove dead plants
			plants = $.grep(plants, function(e){ 
				 return !e.isDead; 
			});
			var func = function(){ MoveZombie(zombie); };
			zombieHandles.push(setTimeout(func, zombieMoveTimeout));
		}
	}
	
	// cleares the field and displays 'Gmae over' message
	function GameOver(){
		ResetGame();
		$gameOver.show();
		$gameOver.text('Game Over');
	}
	
	// slows all zombies for a period of time in ms
	function Slow(time){
		var baseZombie = new zombie(zombieConfig);
		for (var i = 0; i < zombies.length; i++){
			zombies[i].slow(baseZombie.movementSpeed);
		}
		setTimeout(SetNormalSpeed, slowTime);
		$btnSlow.addClass('disabled');
		$btnSlow.off();
	}
	
	// set normal zombie speed based on zombie type
	function SetNormalSpeed(){
		for (var i = 0; i < zombies.length; i++){
			zombies[i].restoreSpeed();
		}
		$btnSlow.removeClass('disabled');
		$btnSlow.on('click', Slow);
	}
	
	// damages all the zombies on the field
	function Explode(){
		if (resourceCount >= resourcesForExplosion){
			for (var i = 0; i < zombies.length; i++){
				zombies[i].hit(explosionDamage);
			}
			resourceCount -= resourcesForExplosion;
			if (resourceCount <= 0){
				resourceCount = 0;
			}
			$('.resources p').text(resourceCount);
		}
	}
	
	// damages all zombies on the field for a set time interval
	function Age(){
		if (resourceCount >= resourcesForAging){
			AgeHelper();
			setTimeout(StopAging, agingTime);
			resourceCount -= resourcesForAging;
			if (resourceCount <= 0){
				resourceCount = 0;
			}
			$('.resources p').text(resourceCount);
			$btnAge.addClass('disabled');
			$btnAge.off();
		}
	}
	
	function AgeHelper(){
		for (var i = 0; i < zombies.length; i++){
			zombies[i].hit(agingDecrement);
		}
		ageingHandle = setTimeout(AgeHelper, agingTimeout);
	}
	
	// stops zombies aging
	function StopAging(){
		clearTimeout(ageingHandle);
		$btnAge.removeClass('disabled');
		$btnAge.on('click', Age);
	}
	
	// resets the game
	function ResetGame(){
		for (var i = 0; i < zombieHandles.length; i++){
			clearTimeout(zombieHandles[i]);
		}
		for (var i = 0; i < projectileHandles.length; i++){
			clearTimeout(projectileHandles[i]);
		}
		for (var i = 0; i < resourceHandles.length; i++){
			clearTimeout(resourceHandles[i]);
		}
		for (var i = 0; i < zombies.length; i++){
			zombies[i].kill();
		}
		for (var i = 0; i < plants.length; i++){
			plants[i].die();
		}
		for (var i = 0; i < projectiles.length; i++){
			projectiles[i].remove();
		}
		for (var i = 0; i < resources.length; i++){
			resources[i].remove();
		}
		zombieHandles = [];
		projectileHandles = [];
		zombies = [];
		plants = [];
		projectiles = [];
		resourceHandles = [];
	}
});
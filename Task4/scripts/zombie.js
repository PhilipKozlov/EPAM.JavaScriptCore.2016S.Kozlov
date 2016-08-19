// zombie base type
// config{ 
// 			movementSpeed : how fast zombie moves, in px,
//			startPosition : zombie initial position on screen,
// 			finishPosition : finish line position,
//			$lane : zombie lane that it moves on
// 		}
var zombie = function(config){
	var obj = {};
	obj.name = '';
	obj.health = 100;
	obj.movementSpeed = config.movementSpeed || 1;
	obj.currentPosition = config.startPosition;
	obj.finishPosition = config.finishPosition;
	obj.$lane = config.$lane;
	
	var isDead = false;

	// creates jQuery zombie
	obj.create = function(){
		if (!obj.$zombie){
			obj.$zombie = $('<div>');
			obj.$zombie.addClass('zombie');
			obj.$zombie.addClass(obj.name);
			obj.$zombie.css({
				'left' : obj.currentPosition + 'px'
			});
			obj.$lane.append(obj.$zombie);
		}
	}
	
	obj.move = function(){
		obj.currentPosition += obj.movementSpeed;
		if (obj.currentPosition <= obj.finishPosition){
			obj.die();
		}
		obj.$zombie.css('left', obj.currentPosition + 'px');
	}
	
	obj.die = function(){
		if (!isDead){
			isDead = true;
			obj.$zombie.trigger('death');
			obj.$zombie.remove();
		}
	}
	
	// kill zombie without triggering the 'death' event
	obj.kill = function(){
		if (!isDead){
			isDead = true;
			obj.$zombie.remove();
		}
	}
	
	// creates custom 'death' event for zombie
	obj.onDeath = function(func){
		obj.$zombie.on('death', func);
	}
	
	return obj;
}
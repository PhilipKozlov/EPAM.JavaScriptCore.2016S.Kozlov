// plant base type
// config{ 
//			startPosition : palnt position on screen,
//			$lane : plant lane
// 		}
var plant = function(config){
	var obj = {};
	obj.name = '';
	obj.health = 100;
	obj.currentPosition = config.startPosition;
	obj.$lane = config.$lane;
	obj.isDead = false;

	// creates jQuery plant
	obj.create = function(){
		if (!obj.$plant){
			obj.$plant = $('<div>');
			obj.$plant.addClass('plant');
			obj.$plant.addClass(obj.name);
			obj.$plant.css({
				'left' : obj.currentPosition + 'px'
			});
			obj.$lane.append(obj.$plant);
		}
	}
	
	obj.die = function(){
		if (!obj.isDead){
			isDead = true;
			obj.$plant.remove();
		}
	}

	obj.hit = function(damage){
		obj.health -= damage;
		if (obj.health <= 0){
			obj.die();
		}
	}
	
	return obj;
}
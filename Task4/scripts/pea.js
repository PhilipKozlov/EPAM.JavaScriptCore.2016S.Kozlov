// pea type
// config{ 
//			movementSpeed : how fast pea moves, in px,
//			startPosition : pea initial position on screen,
//			damage : how much health zombie loses on hit,
//			$lane : pea lane
// 		}
var pea = function(config){
	var obj = {};
	obj.name = 'pea';
	obj.movementSpeed = config.movementSpeed || 10;
	obj.currentPosition = config.startPosition;
	obj.damage = config.damage;
	obj.$lane = config.$lane;
	obj.$pea = $('<div>');
	obj.$pea.addClass(obj.name);
	obj.$pea.css({
		'left' : obj.currentPosition + 'px'
	});
	obj.$lane.append(obj.$pea);
	obj.isRemoved = false;
	
	obj.move = function(){
		obj.currentPosition += obj.movementSpeed;
		if (obj.currentPosition >= obj.$lane.position().left + obj.$lane.width() - 60){
			obj.remove();
		}
		obj.$pea.css('left', obj.currentPosition + 'px');
	}
	
	obj.remove = function(){
		obj.$pea.remove();
		obj.isRemoved = true;
	}
	
	return obj;
}
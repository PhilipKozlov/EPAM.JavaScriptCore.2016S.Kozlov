// sun type
// config{ 
//			movementSpeed : how fast sun moves, in px,
//			left : sun left position on screen,
//			top : sun top position on screen,
//			$field : area on screen where sun will appear
// 		}
var sun = function(config){
	var obj = {};
	obj.name = 'sun';
	obj.movementSpeed = config.movementSpeed || 10;
	obj.leftPosition = config.left;
	obj.topPosition = config.top;
	obj.$field = config.$field;
	obj.$sun = $('<div>');
	obj.$sun.addClass(obj.name);
	obj.$sun.css({
		'top' : obj.topPosition + 'px',
		'left' : obj.leftPosition + 'px'
	});
	obj.$field.append(obj.$sun);
	
	obj.onClick = function(func){
		obj.$sun.on('click', func);
		obj.$sun.on('click', function(){ obj.$sun.remove(); });
	}
	
	obj.move = function(){
		obj.topPosition += obj.movementSpeed;
		if (obj.topPosition >= obj.$field.position().top + obj.$field.height() - 60){
			obj.$sun.remove();
		}
		obj.$sun.css('top', obj.topPosition + 'px');
	}
	
	obj.remove = function(){
		obj.$sun.remove();
	}
	
	return obj;
}
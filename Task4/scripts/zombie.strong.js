// zombie strong
// config{ 
// 			movementSpeed : how fast zombie moves, in px,
//			startPosition : zombie initial position on screen,
// 			finishPosition : finish line position
//			$lane : zombie lane that it moves on
// 		}
zombie.strong = function(config){
	var obj = zombie.call(this, config);
	obj.name = 'strong';
	obj.create();
	return obj;
}
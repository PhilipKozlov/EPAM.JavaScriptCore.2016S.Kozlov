// zombie michael
// config{ 
// 			movementSpeed : how fast zombie moves, in px,
//			startPosition : zombie initial position on screen,
// 			finishPosition : finish line position
//			damage : how much health plant loses on zombie`s hit,
//			$lane : zombie lane that it moves on
// 		}
zombie.michael = function(config){
	var obj = zombie.call(this, config);
	obj.name = 'michael';
	obj.create();
	return obj;
}
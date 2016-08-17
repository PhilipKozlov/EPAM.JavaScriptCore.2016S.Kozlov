// zombie strong
// config{ 
// 			movementSpeed : how fast zombie moves, in px,
//			startPosition : zombie initial position on screen,
// 			finishPosition : finish line position
// 		}
zombie.strong = function(config){
	zombie.call(this, config);
	this.obj.name = 'strong';
	return this.obj;
}
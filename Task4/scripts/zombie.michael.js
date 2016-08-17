// zombie michael
// config{ 
// 			movementSpeed : how fast zombie moves, in px,
//			startPosition : zombie initial position on screen,
// 			finishPosition : finish line position
// 		}
zombie.michael = function(config){
	zombie.call(this, config);
	this.obj.name = 'michael';
	return this.obj;
}
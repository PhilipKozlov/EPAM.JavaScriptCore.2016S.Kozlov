// zombie base type
// config{ 
// 			movementSpeed : how fast zombie moves, in px,
//			startPosition : zombie initial position on screen,
// 			finishPosition : finish line position
// 		}
var zombie = function(config){
	this.obj = {};
	this.obj.name = '';
	this.obj.health = 100;
	this.obj.movementSpeed = config.movementSpeed || 1;
	this.obj.currentPosition = config.startPosition;
	this.obj.finishPosition = config.finishPosition;
	
	this.obj.move = function(){
		this.currentPosition += this.movementSpeed;
		if (this.currentPosition >= this.finishPosition){
			this.die();
		}
	}
	
	this.obj.die = function(){
		// do something
	}
}
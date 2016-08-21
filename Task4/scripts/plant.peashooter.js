// plant base type
// config{ 
//			startPosition : palnt position on screen,
//			$lane : plant lane
// 		}
plant.peashooter = function(config){
	var obj = plant.call(this, config);
	obj.name = 'peashooter';
	obj.create();
	return obj;
}
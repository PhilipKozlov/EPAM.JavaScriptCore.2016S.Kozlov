// array of objects
var data = [];
// number of possible object types
var numOfTypes = 3;
// base function name
var funcBaseName = "getCount";

// creates objects
function CreateObjects(numOfObjects, maxCountValue){

	for (var i = 0; i < numOfObjects; i++){
		// object "type"
		var rndType = random(1,numOfTypes);
		// object count value
		var rndCount = random(1,maxCountValue);
		// object
		var element = {};
		element.count = rndCount;
		element[funcBaseName + rndType] = function(){
			return this.count;
		}
		data[i] = element;
		console.log("type=%d,count=%d", rndType, data[i].count);
	}
}

CreateObjects(5, 10);

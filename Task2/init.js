// array of objects
var data = [];
// number of possible object types
var numOfTypes = 3;
// base function name
var funcBaseName = "getCount";

// creates objects
function CreateObjects(numOfObjects, maxCountValue){
	for (var i = 0; i < numOfObjects; i++){
		data[i] = CreateElement(maxCountValue);
		console.log("type=%d,count=%d", GetType(data[i]), data[i].count);
	}
}

// creates random Object with "count" property and "getCount" function
function CreateElement(maxCountValue){
	// object "type"
	var rndType = random(1,numOfTypes);
	// object count value
	var rndCount = random(1,maxCountValue);
	// object to be returned
	var element = {};
	element.count = rndCount;
	element[funcBaseName + rndType] = function(){
										return this.count;
									  }
	return element;
}

function GetType(obj){
	for (var i = 0; i < numOfTypes; i++){
			var funcName = funcBaseName + (i + 1);
			// if type-specific function is defined return appropriate type
			try{
				// if function call fails - function is not defined.
				obj[funcName]();
				return i + 1;
			}
			catch(ex){
				
			}
		}
}

CreateObjects(5, 10);

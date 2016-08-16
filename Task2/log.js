// creates an empty array
function CreateEmptyArray(){
	var array = []
	for (var i = 0; i < numOfTypes; i++){
		array[i] = null;
	}
	return array;
}

// calculates the sum of count for each type
function Sum(){
	// sum of all counts for each object type
	var countSum = CreateEmptyArray();
	// loop through array and calculate the sum of count for each type
	for (var j = 0; j < numOfTypes; j++){
		for (var i = 0; i < data.length; i++){
			var obj = data[i];
			var f = obj[funcBaseName + (j + 1)] || function(){ return 0; };
			countSum[j] += f.call(obj);
		}
	}
	Print(countSum);
}

// prints result on console
function Print(array){
	for (var i = 0; i < array.length; i++){
		console.log("count%d=%d", i + 1, array[i]);
	}
}

Sum();





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
	for (var i = 0; i < data.length; i++){
		var obj = data[i];
		// get object functions
		var func = Object.getOwnPropertyNames(obj).filter(function (p) {
				return typeof obj[p] === 'function';
			}
		);
		// get last character of function name	
		var index = func[0].substr(func[0].length - 1);
		countSum[index-1] += obj[funcBaseName + index]();
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





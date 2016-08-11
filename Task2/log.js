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
		// loop through all types
		for (var j = 0; j < numOfTypes; j++){
			var funcName = funcBaseName + (j + 1);
			var obj = data[i];
			// if type-specific function is defined calculate sum of count
			try{
				countSum[j] += obj[funcName]();
			}
			catch(ex){
				
			}
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





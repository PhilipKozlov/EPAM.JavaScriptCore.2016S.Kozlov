// loop through array and print it`s elements on the console
function Log(){
	for (var i = 0; i < data.length; i++){
		console.log("data[" + i + "] = " + printString(data[i]));
	}
}

// function uses strict equals to test value and type equality and print appropriate message
function printString(value){
	if (value === undefined){
		value = "не определено";
	} 
	if (value === null){
		value = "не указанно";
	} 
	return value;
}
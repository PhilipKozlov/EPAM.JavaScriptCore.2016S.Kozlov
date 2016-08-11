// loop through array
for (var i = 0; i < data.length; i++)
{
	// check if array element is null or undefined
	if (data[i] != null){
		// check if array element contains only digits
		if (!isNaN(data[i])){
			data[i] = Action(data[i]);
		}
	}
}

// log to the console
Log();

// perform mathematical actions on array elements according to the task
function Action(value){
	if (value == 0){
		value = value - (-10);
	}
	else if (value > 100){
		value = value - 100;
	}
	else if(value < 100){
		value = value - (-100);
	}
	return value;
}
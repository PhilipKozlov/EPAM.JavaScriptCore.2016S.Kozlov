$(function (){
	// total number of tiles to display
	var numOfTiles = 50;
	var startValue = 1;
	var endValue = 100;
	// Generate button
	var $btnGenerate = $('#generate');
	// Set Color button
	var $btnSetColor = $('#setColor');
	// Reset button
	var $btnReset = $('#reset');
	
	
	// disable Set Color and Reset buttons
	DisableButton($btnSetColor);
	DisableButton($btnReset);
	// on Generate button click display 50 tiles
	$btnGenerate.on('click', GenerateTiles);
	// on Set Color button click change tiles color
	$btnSetColor.on('click', SetColor);
	// on Reset button click remove all previously generated tiles from html
	$btnReset.on('click', Reset);
	
	// generate 50 tiles
	function GenerateTiles(){
		for (var i = 0; i < numOfTiles; i++){
			var $div = $('<div class="tile"></div>');
			var number = random(startValue, endValue);
			$div.html('<p class="text">' + number + '</p>');
			$('.block').append($div);
		}
		// enable/disable appropriate buttons
		DisableButton($btnGenerate);
		EnableButton($btnSetColor, SetColor);
		EnableButton($btnReset, Reset);
	}
	
	// set tiles color
	function SetColor(){
		var $divs = $('.tile');
		$.each($divs, function(div){
			var $this = $(this);
			var text = $this.text();
			if (text > 25 && text < 50){
				$this.addClass('green');
			}
			if (text > 50 && text < 75){
				$this.addClass('orange');
			}
			if (text > 75){
				$this.addClass('red');
			}
		});
		// disable button Set Color
		DisableButton($btnSetColor);
	}
	
	// remove all tiles
	function Reset(){
		$('.block').empty();
		// enable/disable appropriate buttons
		EnableButton($btnGenerate, GenerateTiles);
		DisableButton($btnSetColor);
		DisableButton($btnReset);
	}
	
	function DisableButton($btn){
		$btn.addClass('disabled');
		$btn.off();
	}
	
	function EnableButton($btn, $function){
		$btn.removeClass('disabled');
		$btn.off();
		$btn.on('click', $function);
	}
});
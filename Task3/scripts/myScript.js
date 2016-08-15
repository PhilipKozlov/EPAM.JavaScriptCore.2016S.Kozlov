$(function (){
	// total number of tiles to display
	var numOfTiles = 50;
	var startValue = 1;
	var endValue = 100;
	// Generate button
	var $btnGenerate = $('<button type="button" class="button">Generate</button>');
	// Set Color button
	var $btnSetColor = $('<button type="button" class="button">Set color</button>');
	// Reset button
	var $btnReset = $('<button type="button" class="button">Reset</button>');

	// appends buttons to html
	var $buttons = $(".buttons");
	$btnGenerate.appendTo($buttons);
	$btnSetColor.appendTo($buttons);
	$btnReset.appendTo($buttons);
	
	// disable Set Color and Reset buttons
	DisableButton($btnSetColor);
	DisableButton($btnReset);
	
	// on Generate button click display 50 tiles
	$btnGenerate.on("click", function(){
		for (var i = 0; i < numOfTiles; i++){
			var $div = $('<div class="tile"></div>');
			var number = random(startValue,endValue);
			$div.html('<p class="text">' + number + '</p>');
			$(".block").append($div);
		}
		// enable/disable appropriate buttons
		DisableButton($btnGenerate);
		EnableButton($btnSetColor);
		EnableButton($btnReset);
	});
	
	// on Set Color button click change tiles color
	$btnSetColor.on("click", function(){
		var $divs = $(".tile");
		$.each($divs, function (div) {
			var $this = $(this);
			if ($this.text() > 25){
				$this.css('background','#4caf50')
			}
			if ($this.text() > 50){
				$this.css('background','#ff9800')
			}
			if ($this.text() > 75){
				$this.css('background','#f44336')
			}
		});
		// disable button Set Color
		DisableButton($btnSetColor);
	});
	
	// on Reset button click remove all previously generated tiles from html
	$btnReset.on("click", function(){
		$(".block").empty();
		// enable/disable appropriate buttons
		EnableButton($btnGenerate);
		DisableButton($btnSetColor);
		DisableButton($btnReset);
	});
	
	function DisableButton($btn){
		$btn.removeClass('enabled');
		$btn.addClass('disabled');
		$btn.prop("disabled",true);
	}
	
	function EnableButton($btn){
		$btn.removeClass('disabled');
		$btn.addClass('enabled');
		$btn.prop("disabled",false);
	}
});
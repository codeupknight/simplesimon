(function () {
	var sequence = [];
	var userInput = [];
	var userProgress = 0;
	var simon = $(".simon");
	var laser = $(".laser");
	var counter = 0;
	var inputCounter = 0;
	var blockInput = true;

	// generate random number
	function randomNumber () {
		return Math.floor(Math.random() * ($(".simon").length));
	};

	//start new simon round
	function startRound () {
    	counter++;
	    $("#roundDisplay").text(counter);
		sequence.push(randomNumber());
		inputCounter = 0;
		flareSequence();
	}

	//show flares according to sequence array
	//sets guard to restrict clicks during sequence
	function flareSequence() {
		blockInput = true;
		var y = 0;
		id = setInterval(function () {
			if (y < sequence.length) {
				$('.flare').eq(sequence[y]).fadeToggle(300);
				$('.flare').eq(sequence[y]).fadeToggle(500);
				y++
				console.log("flashing " + y + " : " + sequence[y-1]);
			} else {
				clearInterval(id);
				blockInput = false;
			};
		}, 1000);
	}

	//logs user input and sends out laser image when clicked.
	//restarts if array length is reached. clears and restarts if failed.
	function simonClick(event) {
		if (blockInput) {
			return;
		}
		var value = $(this).attr('data-value')
		value = Number(value);
		console.log(value);
		$('.laser').eq(value).fadeToggle(10);
		$('.laser').eq(value).animate({
			marginLeft: "100%"
		}, 700);
		$('.laser').eq(value).fadeToggle(1);
		$('.laser').eq(value).css('marginLeft', 0);
		userInput.push(value);
		if (value == sequence[inputCounter]) {
	        inputCounter++;
	        console.log("winning!");
	        console.log("inputCounter: " + inputCounter + ", sequence length: " + sequence.length + ", last one in the array: " + sequence[sequence.length - 1]);
	    }
	    if (value != sequence[inputCounter-1]) {
	    	console.log("failure. starting new game");
	    	sequence = [];
	    	startRound()
	    }
	    if (inputCounter === sequence.length) {
	        	console.log("winning! starting a new round!")
	        	startRound();
	    } 
	};

	function simonStart() {
		sequence = [];
		startRound()
	}

		//place button listeners
	for (i=0;i<simon.length;i++) {
		simon.eq(i).attr('data-value', i);
		simon.eq(i).click(simonClick);
	}
	for (i=0;i<simon.length;i++) {
		laser.eq(i).attr('data-invisValue', i);
	}

	$('#title').click(simonStart);
})();
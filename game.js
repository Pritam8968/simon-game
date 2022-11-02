// all the buttons
var buttonColors = ["red", "blue", "green", "yellow"];

// game pattern and user clicked pattern so far
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

//start the game
$(".start-btn").click(function () {
	started = true;
	hideButton(this);
	nextSequence();
	showLevel();
});

function hideButton(btn) {
	$(btn).css("display", "none");
}

// The random color generator
function nextSequence() {
	// resetting the user clicked pattern
	userClickedPattern = [];

	let randomNumber = Math.floor(Math.random() * 4);
	let randomChosenColor = buttonColors[randomNumber];

	// Saving the pattern so far
	gamePattern.push(randomChosenColor);

	playSound(randomChosenColor);
	$("#" + randomChosenColor)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);

	level++;
	showLevel();
}

function showLevel() {
	$("#level-title").text("Level: " + level);
}

// user play area
$(".btn").on("click", function () {
	if (started === false) {
		return;
	}
	let userChosenColor = this.id;
	userClickedPattern.push(userChosenColor);

	playSound(userChosenColor);
	animatePress(userChosenColor);

	// console.log(userClickedPattern);
	matchPattern(userClickedPattern.length - 1);
});

// sound-playing function
function playSound(name) {
	var sound = new Audio("sounds/" + name + ".mp3");
	sound.play();
}

// pressing animation function
function animatePress(key) {
	$("#" + key).addClass("pressed");
	setTimeout(() => {
		$("#" + key).removeClass("pressed");
	}, 100);
}

function matchPattern(currentLevel) {
	// console.log(userClickedPattern);
	// console.log(gamePattern);
	// If the user got the most recent answer right
	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
		// if they have finished their sequence
		if (userClickedPattern.length === gamePattern.length) {
			console.log("success!");
			setTimeout(() => {
				nextSequence();
			}, 1000);
		} else {
			console.log("go on");
		}
	} else {
		console.log("wrong");
		gameOver();
	}
}

function gameOver() {
	playSound("wrong");
	$("body").addClass("game-over");
	setTimeout(() => {
		$("body").removeClass("game-over");
	}, 100);
	$("#level-title").text("game over!");
	$(".start-btn").text("Restart");
	showButton();

	started = false;
	$(".start-btn").click(startOver());
}

function showButton() {
	$(".start-btn").css("display", "inline-block");
}
function startOver() {
	level = 0;
	gamePattern = [];
}

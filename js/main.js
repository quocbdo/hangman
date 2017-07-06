/*----- constants -----*/
var categories = ["SKATE TRICKS", "PRO SKATERS", "SKATE SPOTS"] 

var skateWord = {
	"SKATE TRICKS": [
	"FAKIEOLLIE",
	"KICKFLIP",
	"POPSHOVEIT",
	"NOLLIEFLIP",
	"TAILSLIDE",
	"CROOKEDGRIND",
	"SMITHGRIND",
	"BLUNTSLIDE",
	"NOCOMPLY",
	"BONELESS"
	], 

	"PRO SKATERS": [
	"MIKECARROL",
	"ANDREWREYNOLDS",
	"GINOIANNUCCI",
	"MARCJOHNSON",
	"ELISSASTEAMER",
	"LIZZIEARMANTO",
	"HEATHKIRCHART",
	"DAEWONSONG",
	"GEOFFROWLEY",
	"MARKGONZALES"
	],

	"SKATE SPOTS": [
	"HOLLYWOODHIGH",
	"BROOKLYNBANKS",
	"THIRDANDARMY",
	"EMBARCADERO",
	"WALLENBERG",
	"FLUSHINGMEADOWS",
	"HUBBAHIDEOUT",
	"PALAISDETOKYO",
	"BRONSONDITCH",
	"JKWONPLAZA"
	],
};

/*----- app's state (declaring variables) -----*/

// var source of secret words (in the constants section)
// var wordCat (display word category)
// var secretWord (holds the randomly chosen word from the words array)
// var triesLeft (initialize to 0; inc. w/ each wrong guess)
// var letterGuess (holds player's guess so far, initialize to be a string
//        of '_' same # LENGTH as secret word)
// var usedLetter letters

/*----- cached element references -----*/

var $letterGuess = $('#guess');
var $images = $('#hang-img');
var $winLoseMsg = $('#message');
var $wordCat = $('.category');

/*----- event listeners -----*/

$('#table').on('click', handleLetterClick);
$('#reset').on('click', resetGame);

/*----- functions -----*/

resetGame();

function resetGame() {
	triesLeft = 9;
	secretCategory = categories[getRandomInt(categories.length -1)];
	secretWord = skateWord[secretCategory][getRandomInt(skateWord[secretCategory].length - 1)];
	letterGuess = '_'.repeat(secretWord.length);
	usedLetter = [];
	$('td').removeClass('disable-td');
	render();
}

function handleLetterClick(evt) {
	if (triesLeft === 0)
		return;	
	console.log(secretWord);
	var letter = evt.target.id !== "table" ? evt.target.id : null;
	if (usedLetter.includes(letter)) {
		return;
	} else {
		usedLetter.push(letter);
	}
	if (secretWord.includes(letter)) {
		//first letter match
		var pos = secretWord.indexOf(letter);
		while (pos >= 0) {
			letterGuess = letterGuess.split('');
			letterGuess[pos] = letter;
			letterGuess = letterGuess.join('');
				console.log(letterGuess);
			pos = secretWord.indexOf(letter, pos +1);
		}
	} else if (triesLeft > 0) {
		triesLeft--;
	}
	render();
}

//generate random word
function getRandomInt(max) {
	return Math.floor(Math.random()*(max + 1));
}

//display hangman limb images on wrong guess
function render() {
	$images.attr('src', 'images/img' + triesLeft + '.svg')
	$letterGuess.html(letterGuess);
	$wordCat.html(`Category: ${secretCategory}`)
	//displays number of tries left
	$('#tries').html(triesLeft);
	usedLetter.forEach(function(letter) {
		// console.log("This is my letter", letter);
		$('#'+letter).addClass('disable-td');
		$('#'+letter).removeClass('unclicked');
	});
	if (letterGuess === secretWord) {
		$winLoseMsg.html("You've ESCAPED from security!");
	} else if (triesLeft === 0) {
		$winLoseMsg.html("You've been BUSTED by security!");
	} else {
		$winLoseMsg.html("");
	}
}
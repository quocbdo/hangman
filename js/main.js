/*----- constants -----*/

var words = [
	"FAKIEOLLIE",
	"KICKFLIP",
	"POPSHOVEIT",
	"NOLLIEFLIP",
	"TAILSLIDE",
	"CROOKEDGRIND",
	"SMITHGRIND",
	"BLUNTSLIDE",
	"NOCOMPLY",
	"BONELESS",

	"MIKECARROL",
	"ANDREWREYNOLDS",
	"GINOIANNUCCI",
	"MARCJOHNSON",
	"ELISSASTEAMER",
	"LIZZIEARMANTO",
	"HEATHKIRCHART",
	"DAEWONSONG",
	"GEOFFROWLEY",
	"MARKGONZALES",
	
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
];


/*----- app's state (declaring variables) -----*/

// var source of secret words (in the constants section)
// var wordCat (display word category)
// var secretWord (holds the randomly chosen word from the words array)
// var wrongCount (initialize to 0; inc. w/ each wrong guess)
// var guess (holds player's guess so far, initialize to be a string
//        of '_' same # LENGTH as secret word)
// var used letters


/*----- cached element references -----*/

var $guess = $('#guess');
var $img = $('#hang-img');
var $msg = $('#msg');
// var msg = document.getElementById('msg');

/*----- event listeners -----*/

$('#table').on('click', handleLetterClick)
$('#reset').on('click', resetGame);



/*----- functions -----*/

resetGame();

function resetGame() {
	wrongCount = 9;
	secretWord = words[getRandomInt(words.length - 1)];
	guess = '_'.repeat(secretWord.length);
	used = [];
	$('td').removeClass('disable-td');
	render();
}

function handleLetterClick(evt) {
	if (wrongCount === 0) return;
	
	console.log(secretWord);
	var letter = evt.target.id !== "table" ? evt.target.id : null;
	if (used.includes(letter)) {
		return;
	} else {
		used.push(letter);
	}
	if (secretWord.includes(letter)) {
		//first letter match
		var pos = secretWord.indexOf(letter);
		while (pos >= 0) {
			guess = guess.split('');
			guess[pos] = letter;
			guess = guess.join('');
				console.log(guess);
			pos = secretWord.indexOf(letter, pos +1);
		}
	} else if (wrongCount > 0) {
		wrongCount--;
	}
	render();
}

function getRandomInt(max) {
	return Math.floor(Math.random()*(max + 1));
}

//display hangman limb images on wrong guess
function render() {
	$img.attr('src', 'images/img' + wrongCount + '.svg')
	$guess.html(guess);
	$('#wrong').html(wrongCount);
	used.forEach(function(letter) {
		// console.log("This is my letter", letter);
		$('#'+letter).addClass('disable-td');
	});
	if (guess === secretWord) {
		$msg.html("ESCAPED!");
	} else if (wrongCount === 0) {
		$msg.html("BUSTED!");
	} else {
		$msg.html("");
	}
}
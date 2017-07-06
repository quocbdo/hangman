Hangman Game (Skateboard Edition) - Pseudocode

- Generate a word from wordlist (3 categories: pro skaters, skate tricks, skate spots)

- Show word length with empty slots to user


***OPTION 1: ALPHABET KEYS***

 
- Display alphabet A-Z buttons (26 total)

	- if user clicks A-Z button, then return corresponding letter


***OPTION 2: TEXT ENTRY FIELD***


- Create text entry field to input single alphabet character (no numbers) and button to submit the character


*********************************


- if letter is correct (true), then display letter in correct slot
	
	- else letter is wrong (false), then display a hangman limb (total 8 tries)

- if user makes 8 wrong guesses, then notify user game is over (lose message)

- if user guesses correct answer, then notify that the user has won (win message)

- Display a button to restart (initialize) game when clicked

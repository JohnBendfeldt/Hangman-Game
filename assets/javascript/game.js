// Variables that are used, sets up score and loses categories
var words, picList, blank, wrongGuess, guessRemain, currentWord, score = 0, loses = 0, wordPic, audioWin, audioLoss;
var activeList = ["trump", "america", "freedom", "liberty", "justice", "flag", "eagle", "equality", "capitalism", "love", "constitution", "independence"];
setUp();
// Sets up inital game status/ round reset basically
function setUp() {
    console.log(activeList)
    var words = ["trump", "america", "freedom", "liberty", "justice", "flag", "eagle", "equality", "capitalism", "love", "constitution", "independence"];
        picList = {trump: "assets/images/trump.jpg", america: "assets/images/america-2.jpg", freedom: "assets/images/freedom.jpg", 
                   liberty: "assets/images/liberty.jpg", justice: "assets/images/justice.jpg", flag: "assets/images/flag.jpg", 
                   eagle: "assets/images/eagle.jpg", equality: "assets/images/equality.png", capitalism: "assets/images/capitalism.jpg", 
                   love: "assets/images/love.gif", constitution: "assets/images/constitution.jpg", independence: "assets/images/independence.jpg"};
        ranNum = Math.floor(Math.random() * activeList.length);
        currentWord = activeList[ranNum];
        index = activeList.indexOf(currentWord);
        activeList.splice(index, 1)
        wordPic = picList[currentWord];
        wrongGuess = [];
        guessRemain = 10;
        blank = "";
        audioWin = new Audio("assets/sounds/djwin.mp3");
        audioLoss = new Audio("assets/sounds/madworldloss.mp3");
        availableLetters = "abcdefghijklmnopqrstuvwxyz";
    if (activeList.length ==  0) {
        activeList = words
    }
    for (var i = 0; i < currentWord.length; i++) {
        // Establishes blanks for letters
            blank += "_" + "";
    }
};

document.onkeyup = function(event) {
// Establishes events on key stroke
    var userGuess = event.key;
    if (availableLetters.indexOf(userGuess) == -1){
        document.getElementById("status").textContent = "Please type a valid letter";
        return // end and do nothing
    };
    document.getElementById("blanks").textContent = blank;
    document.getElementById("wrongGuesses").textContent = wrongGuess;
    document.getElementById("status").textContent = "Current Word:";
    document.getElementById("completion").textContent = "";
// Checks if guess was accurate
    checkGuess(userGuess);
    function checkGuess(userGuess) {
        if (currentWord.indexOf(userGuess) > -1) {
            for (var i = 0; i < currentWord.length; i++) { 
                if (currentWord[i] === userGuess) {
                    // Shows user guess with displayLtrAt function
                    displayLtrAt(userGuess, i);
                    roundOver ();
             }
        }
        // If the guess is wrong it is pushed down into the wrongGuess text area
        } else if (wrongGuess.indexOf(userGuess) === -1) {
            wrongGuess.push(userGuess);
            wrongGuess = wrongGuess.sort();
            document.getElementById("wrongGuesses").textContent = wrongGuess;
            // Subtracts 1 remaining guess
            guessRemain--;
            document.getElementById("remain").textContent = guessRemain;
            roundOver ();
        } 
    }
};
// Puts the user guess in where a blank would be
function displayLtrAt(letter, index) {
    var letterGuess = "";
    for (var i = 0; i < blank.length; i++) 
        if (i === index) {
            letterGuess += letter;
        } else {
            letterGuess += blank[i];
        }
    // Changes guess to upper case
    blank = letterGuess.toUpperCase();

        document.getElementById("blanks").textContent = blank;
    };
// When a round ends
function roundOver () {
// Out of gueesses
    if (guessRemain === 0) {
        document.getElementById("picChange").src = ("assets/images/pepe-lost.jpg");
        document.getElementById("status").textContent = "You lose! The word was:";
        // Plays losing clip
        audioLoss.play();
        document.getElementById("blanks").textContent = currentWord.toUpperCase();
        document.getElementById("completion").textContent = "Press Any Key to Try Again";
        loses++;
        document.getElementById("loses").textContent = loses;
        setUp ();

    }
// Guessed the word correctly
    else if (blank.indexOf("_") === -1 && guessRemain != 0) {
        document.getElementById("status").textContent = "You win! The word was";
        // Plays winning clip
        audioWin.play();
        document.getElementById("completion").textContent = "Press Any Key to Restart";
        document.getElementById("picChange").src = wordPic;
        score++;
        document.getElementById("score").textContent = score;
        setUp();
    } 
};


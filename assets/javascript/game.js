
var words, picList, blank, wrongGuess, guessRemain, currentWord, score = 0, loses = 0, wordPic;

setUp ();

function setUp () {

var words= ["trump", "america", "freedom", "liberty", "justice", "flag", "eagle"];
    picList= ["assets/images/trump.jpg", "assets/images/america-2.jpg", "assets/images/freedom.jpg", "assets/images/liberty.jpg", "assets/images/justice.jpg", "assets/images/flag.jpg", "assets/images/eagle.jpg"];
    ranNum = Math.floor(Math.random() * words.length)
    currentWord = words[ranNum];
    wordPic = picList[ranNum];
    wrongGuess = [];
    guessRemain = 10;
    blank = "";
for (var i = 0; i < currentWord.length; i++) {
        blank += "_" + "";
    }
};
document.onkeyup = function(event) {

    var userGuess = event.key;
    document.getElementById("blanks").textContent = blank;
    document.getElementById("wrongGuesses").textContent = wrongGuess;
    document.getElementById("status").textContent = "Current Word:";

    checkGuess(userGuess);
    function checkGuess(userGuess) {
        if (currentWord.indexOf(userGuess) > -1) {
            for (var i = 0; i < currentWord.length; i++) { 
                if (currentWord[i] === userGuess) {
                    displayLtrAt(userGuess, i);
                    endGame ();
             }
        }
        } else if (wrongGuess.indexOf(userGuess) === -1) {
            wrongGuess.push(userGuess);
            document.getElementById("wrongGuesses").textContent = wrongGuess;
            guessRemain--;
            document.getElementById("remain").textContent = guessRemain;
            endGame ();
        } 
    }
};

function displayLtrAt(letter, index) {
    var newTxt = "";
    for (var i = 0; i < blank.length; i++) 
        if (i === index) {
            newTxt += letter;
        } else {
            newTxt += blank[i];
        }
    blank = newTxt.toUpperCase();

        document.getElementById("blanks").textContent = blank;
    };


function endGame () {
// Out of gueesses
    if (guessRemain === 0) {
        document.getElementById("picChange").src = ("assets/images/pepe-lost.jpg");
        document.getElementById("status").textContent = "You lose!";
        document.getElementById("blanks").textContent = "Press key to restart";
        loses++;
        document.getElementById("loses").textContent = loses;
        setUp ();

    }
// Guessed the word correctly
    else if (blank.indexOf("_") === -1 && guessRemain != 0) {
        document.getElementById("status").textContent = "You win!";
        document.getElementById("blanks").textContent = "Press any key to play again!";
        document.getElementById("picChange").src = wordPic;
        score++;
        document.getElementById("score").textContent = score;
        setUp();

    } 
};


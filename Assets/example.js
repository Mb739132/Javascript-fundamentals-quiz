document.addEventListener("DOMContentLoaded", function() {
  const startButton = document.querySelector(".start-button");
  const timerElement = document.querySelector(".timer-count");
  const wordBlanks = document.querySelector(".word-blanks");
  const winElement = document.querySelector(".win");
  const loseElement = document.querySelector(".lose");
  const resetButton = document.querySelector(".reset-button");

var timer;
var ele = document.getElementbyI
  let timerCount = 10;
  let isGameActive = false;
  let winCounter = 0;
  let loseCounter = 0;

  function init() {
      getWins();
      getLosses();
      resetButton.addEventListener("click", resetGame);
      startButton.addEventListener("click", startGame);
      document.addEventListener("keydown", function(event) {
          if (isGameActive && timerCount > 0) {
              var key = event.key.toLowerCase();
              if (key.match(/[a-z0-9]/)) {
                  checkLetters(key);
                  checkWin();
              }
          }
      });
  }

  function startGame() {
      if (!isGameActive) {
          isGameActive = true;
          timerCount = 10;
          startButton.disabled = true;
          renderBlanks();
          startTimer();
      }
  }

  function startTimer() {
      timer = setInterval(function() {
          timerCount--;
          timerElement.textContent = timerCount;
          if (timerCount === 0 || isWin) {
              clearInterval(timer);
              endGame();
          }
      }, 1000);
  }

  function renderBlanks() {
      chosenWord = words[Math.floor(Math.random() * words.length)];
      lettersInChosenWord = chosenWord.split("");
      numBlanks = lettersInChosenWord.length;
      blanksLetters = Array(numBlanks).fill("_");
      wordBlanks.textContent = blanksLetters.join(" ");
  }

  function checkWin() {
      if (chosenWord === blanksLetters.join("")) {
          isWin = true;
      }
  }

  function checkLetters(letter) {
      let letterInWord = false;
      for (let i = 0; i < numBlanks; i++) {
          if (chosenWord[i] === letter) {
              letterInWord = true;
              blanksLetters[i] = letter;
          }
      }
      if (!letterInWord) {
          timerCount -= 2;
      }
      wordBlanks.textContent = blanksLetters.join(" ");
  }

  function endGame() {
      isGameActive = false;
      if (isWin) {
          winGame();
      } else {
          loseGame();
      }
  }

  function winGame() {
      wordBlanks.textContent = "YOU WON!!!🏆";
      winCounter++;
      startButton.disabled = false;
      setWins();
  }

  function loseGame() {
      wordBlanks.textContent = "GAME OVER";
      loseCounter++;
      startButton.disabled = false;
      setLosses();
  }

  function setWins() {
      winElement.textContent = winCounter;
      localStorage.setItem("winCount", winCounter);
  }

  function setLosses() {
      loseElement.textContent = loseCounter;
      localStorage.setItem("loseCount", loseCounter);
  }

  function getWins() {
      const storedWins = localStorage.getItem("winCount");
      winCounter = storedWins ? parseInt(storedWins) : 0;
      winElement.textContent = winCounter;
  }

  function getLosses() {
      const storedLosses = localStorage.getItem("loseCount");
      loseCounter = storedLosses ? parseInt(storedLosses) : 0;
      loseElement.textContent = loseCounter;
  }

  function resetGame() {
      winCounter = 0;
      loseCounter = 0;
      setWins();
      setLosses();
  }

  init();
});

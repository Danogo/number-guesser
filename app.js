// Game values
let winningNum,
    minVal,
    maxVal,
    guessesLeft;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input')
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');


// Listen for guess
guessBtn.addEventListener('click', checkGuess);

// Listen for range change
minNum.addEventListener('change', resetSettings);
maxNum.addEventListener('change', resetSettings);

// Listen for play again click
game.addEventListener('mousedown', event => {
  if(event.target.className === 'play-again') {
    window.location.reload();
  }
});

// Pick initial winning number
resetSettings();

// Pick random winning number within set range
function resetSettings() {
  // Grab values from inputs and convert them to numbers
  minVal = parseInt(minNum.value);
  maxVal = parseInt(maxNum.value);
  // Validate range
  if (minVal >= maxVal) {
    setMessage('Please set minimum and maxium correctly! Minimum value should be less than maximum value.', 'orange');
    return;
  }
  
  // Set winning number
  winningNum = pickRandomNum(minVal, maxVal);
  // Set guesses left to 3
  guessesLeft = 3;
}

// Pick random number
function pickRandomNum(min, max) {
 min = Math.ceil(min);
 max = Math.floor(max);
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Check if user guessed a number
function checkGuess() {
  let guess = parseInt(guessInput.value);

  // Validate input
  // First check if isNaN, then if is less then min and greater then max
  if (guess !== guess || guess < minVal || guess > maxVal) {
    setMessage(`Please enter a number between ${minVal} and ${maxVal}. You have ${guessesLeft} guesses left`, 'red');
    return;
  }

  // check if user won
  if (guess === winningNum) {
    // Game over - won
    gameOver(true, `${guess} is correct, YOU WON!`);
  } else {
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // Game over - lost
      // Tell user he lost and show the correct answer
      gameOver(false, `Game over, you lost. Correct answer is ${winningNum}`);
    } else {
      // Game continues - answer wrong
      // Clear input
      guessInput.value = '';
      let isWhat = guess > winningNum ? 'high' : 'low';
      // Tell user it's the wrong number
      setMessage(`${guess} is not correct. Your number was too ${isWhat}. ${guessesLeft} guesses left.`, 'orange');
    }
  }
}

// ==== Helper Functions =====

// Paint result
function paintResult(color) {
  guessInput.style.borderColor = color;
  guessInput.style.color = color;
  guessInput.disabled = true;
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// Game over
function gameOver(won, msg) {
  let color = won ? 'green' : 'red';
  paintResult(color);
  setMessage(msg, color);
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
  minNum.disabled = true;
  maxNum.disabled = true;
}
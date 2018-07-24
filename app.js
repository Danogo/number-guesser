// Game values
let winningNum,
    minVal,
    maxVal,
    guessesLeft = 3;

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
minNum.addEventListener('change', pickWinNum);
maxNum.addEventListener('change', pickWinNum);

// Pick initial winning number
pickWinNum();

// Pick random winning number within set range
function pickWinNum() {
  // Grab values from inputs and convert them to numbers
  minVal = parseInt(minNum.value);
  maxVal = parseInt(maxNum.value);
  // Validate range
  if (minVal >= maxVal) {
    setMessage('Please set minimum and maxium correctly! Minimum value should be less than maximum value.', 'orange');
    return;
  }
  // Pick random number
  let min = Math.ceil(minVal);
  let max = Math.floor(maxVal);
  winningNum = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(winningNum);
}

// Check if user guessed a number
function checkGuess() {
  let guess = parseInt(guessInput.value);

  // Validate input
  // First check if isNaN, then if is less then min and greater then max
  if (guess !== guess || guess < minVal || guess > maxVal) {
    setMessage(`Please enter a number between ${minVal} and ${maxVal}.`, 'red');
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
      // Tell user it's the wrong number
      setMessage(`${guess} is not correct. ${guessesLeft} guesses left.`, 'orange');
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
}
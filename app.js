// Game values
let winningNum = 7,
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

// Check if user guessed a number
function checkGuess() {
  let guess = parseInt(guessInput.value);
  let minVal = parseInt(minNum.value);
  let maxVal = parseInt(maxNum.value);

  // Validate range
  if (minVal >= maxVal) {
    setMessage('Please set minimum and maxium correctly! Minimum value should be less than maximum value.', 'orange');
    return;
  }

  // Validate input
  // First check if isNaN, then if is less then min and greater then max
  if (guess !== guess || guess < minVal || guess > maxVal) {
    setMessage(`Please enter a number between ${minVal} and ${maxVal}.`, 'red');
    return;
  }

  // check if user won
  if (guess === winningNum) {
    guessInput.style.borderColor = 'green';
    guessInput.style.color = 'green';
    message.disabled = true;
    setMessage (`${guess} is correct, YOU WON!`, 'green');
  } else {

  }
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
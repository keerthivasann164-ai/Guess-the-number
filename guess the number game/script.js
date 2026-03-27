// =============================================
// script.js — All the game logic lives here
// =============================================


// ─────────────────────────────────────────────
// STEP 1: Variables to remember game state
// ─────────────────────────────────────────────

let secretNumber;  // The random number the computer picks
let attempts;      // How many guesses the player has made
let gameOver;      // true = game is finished (player won)


// ─────────────────────────────────────────────
// STEP 2: Get references to HTML elements
// (so JavaScript can read/update them)
// ─────────────────────────────────────────────

const guessInput    = document.getElementById('guessInput');
const guessBtn      = document.getElementById('guessBtn');
const restartBtn    = document.getElementById('restartBtn');
const messageBox    = document.getElementById('messageBox');
const attemptsCount = document.getElementById('attemptsCount');
const historyEl     = document.getElementById('history');


// ─────────────────────────────────────────────
// STEP 3: Attach button click events
// ─────────────────────────────────────────────

// When the "Guess!" button is clicked → run checkGuess()
guessBtn.addEventListener('click', checkGuess);

// When the "Restart" button is clicked → run startGame()
restartBtn.addEventListener('click', startGame);

// When the user presses Enter inside the input → run checkGuess()
guessInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    checkGuess();
  }
});


// ─────────────────────────────────────────────
// STEP 4: Start (or restart) the game
// ─────────────────────────────────────────────

function startGame() {
  // Generate a random whole number between 1 and 100
  // Math.random()  → decimal between 0.0 and 0.999…
  // * 100          → decimal between 0.0 and 99.9…
  // Math.floor()   → round DOWN to whole number (0 to 99)
  // + 1            → shift range to 1 to 100
  secretNumber = Math.floor(Math.random() * 100) + 1;

  attempts = 0;      // Reset attempt counter to zero
  gameOver = false;  // Game is now active

  // Reset the input box
  guessInput.value    = '';
  guessInput.disabled = false;   // Make sure input is usable

  // Reset the Guess button
  guessBtn.disabled = false;

  // Reset the attempt counter display
  attemptsCount.textContent = '0';

  // Clear the guess history chips
  historyEl.innerHTML = '';

  // Reset the message box
  messageBox.textContent = 'Make your first guess! 🤔';
  messageBox.className   = 'message-box idle';

  // Auto-focus the input so user can type right away
  guessInput.focus();

  // TIP: Open browser DevTools (F12 → Console) to see this!
  console.log('New game! Secret number is:', secretNumber);
}


// ─────────────────────────────────────────────
// STEP 5: Check the player's guess
// ─────────────────────────────────────────────

function checkGuess() {
  // If game is already won, do nothing
  if (gameOver) return;

  // Read the value from the input box and convert to a number
  const guess = Number(guessInput.value);

  // --- Validate: must be a number between 1 and 100 ---
  if (!guessInput.value || isNaN(guess) || guess < 1 || guess > 100) {
    showMessage('⚠️ Please enter a number between 1 and 100!', 'too-high');
    return; // Stop here, don't count this as an attempt
  }

  // Count this valid guess as one attempt
  attempts++;
  attemptsCount.textContent = attempts;

  // --- Compare guess to secret number ---
  if (guess > secretNumber) {
    // Guess is too high
    showMessage('📈 Too high! Try a lower number.', 'too-high');
    addChip(guess, 'chip-high', '↑');

  } else if (guess < secretNumber) {
    // Guess is too low
    showMessage('📉 Too low! Try a higher number.', 'too-low');
    addChip(guess, 'chip-low', '↓');

  } else {
    // Guess is exactly right — player wins!
    const word = attempts === 1 ? 'attempt' : 'attempts';
    showMessage(`🎉 Correct! The number was ${secretNumber}. You got it in ${attempts} ${word}!`, 'correct');
    addChip(guess, 'chip-win', '✓');

    // Disable input and button — game is over
    guessInput.disabled = true;
    guessBtn.disabled   = true;
    gameOver = true;
  }

  // Clear the input so user can type the next guess
  guessInput.value = '';
  guessInput.focus();
}


// ─────────────────────────────────────────────
// STEP 6: Helper — update the message box
// ─────────────────────────────────────────────

function showMessage(text, type) {
  messageBox.textContent = text;
  // Set the CSS class to change the box colour
  messageBox.className = `message-box ${type} celebrate`;
}


// ─────────────────────────────────────────────
// STEP 7: Helper — add a chip to guess history
// ─────────────────────────────────────────────

function addChip(number, chipClass, symbol) {
  const chip = document.createElement('span');   // Create a <span> element
  chip.className   = `history-chip ${chipClass}`; // Style it
  chip.textContent = `${number} ${symbol}`;       // e.g. "73 ↑"
  historyEl.appendChild(chip);                    // Add it to the history row
}


// ─────────────────────────────────────────────
// STEP 8: Start the game when the page loads
// ─────────────────────────────────────────────

startGame();

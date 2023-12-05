// Lista de palabras para adivinar
const words = [
  "javascript",
  "programacion",
  "computadora",
  "desarrollo",
  "tecnologia",
];

// Palabra aleatoria seleccionada
let word = words[Math.floor(Math.random() * words.length)];

// Inicialización del juego
let guessedWord = [];
for (let i = 0; i < word.length; i++) {
  guessedWord.push("_");
}

let incorrectGuesses = 0;
const maxIncorrectGuesses = 6;
const lettersGuessed = [];

// Elementos del DOM
const wordContainer = document.getElementById("word-container");
const hangman = document.getElementById("hangman");
const message = document.getElementById("message");
const letters = document.getElementById("letters");

// Arreglo con las partes del muñeco
const hangmanParts = [
  "head",
  "body",
  "left-arm",
  "right-arm",
  "left-leg",
  "right-leg",
];

// Función para actualizar la palabra adivinada en el DOM
function updateWordContainer() {
  wordContainer.innerText = guessedWord.join(" ");
}

// Función para dibujar el ahorcado en el DOM
function drawHangman() {
  if (incorrectGuesses < hangmanParts.length) {
    const part = document.createElement("div");
    part.classList.add(hangmanParts[incorrectGuesses]);
    hangman.appendChild(part);
  }
}

// Función para verificar si el jugador ganó
function checkWin() {
  if (!guessedWord.includes("_")) {
    message.innerText = "¡Ganaste! La palabra es: " + word;
    letters.innerHTML = "";
  }
}

// Función para verificar si el jugador perdió
function checkLose() {
  if (incorrectGuesses >= maxIncorrectGuesses) {
    message.innerText = "¡Perdiste! La palabra era: " + word;
    letters.innerHTML = "";
  }
}

// Función para manejar las letras adivinadas
function handleGuess(letter) {
  if (!lettersGuessed.includes(letter)) {
    lettersGuessed.push(letter);
    if (word.includes(letter)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          guessedWord[i] = letter;
        }
      }
      updateWordContainer();
      checkWin();
    } else {
      incorrectGuesses++;
      drawHangman();
      checkLose();
    }
    letters.removeChild(document.getElementById(letter));
  }
}

// Inicializar letras disponibles
for (let i = 65; i <= 90; i++) {
  const letter = String.fromCharCode(i);
  const button = document.createElement("button");
  button.innerText = letter;
  button.addEventListener("click", function () {
    handleGuess(letter.toLowerCase());
  });
  letters.appendChild(button);
}

// Inicializar el juego
updateWordContainer();

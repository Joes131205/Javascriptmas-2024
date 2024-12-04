import { films } from "./data.js";

let currFilmIndex = 0;
let lives = 3;

const maxFilms = films.length;

let randomizedFilms = [...films];

// Some useful elements
const guessForm = document.getElementById("guess-form");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const messageContainer =
    document.getElementsByClassName("message-container")[0];
const emojiCluesContainer = document.getElementsByClassName(
    "emoji-clues-container"
)[0];

// Shuffle films randomly
function shuffleFilms() {
    for (let i = randomizedFilms.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomizedFilms[i], randomizedFilms[j]] = [
            randomizedFilms[j],
            randomizedFilms[i],
        ];
    }
}

// Toggle button state
function toggleButton(disable) {
    guessButton.disabled = disable;
}

// Display the current question
function renderQuestion() {
    toggleButton(true);

    guessInput.value = "";
    emojiCluesContainer.textContent =
        randomizedFilms[currFilmIndex].emoji.join(" ");
    emojiCluesContainer.ariaLabel = randomizedFilms[currFilmIndex].ariaLabel;

    messageContainer.textContent = `You have ${lives} guesses remaining.`;

    toggleButton(false);
}

// Move to the next question
function goNext() {
    currFilmIndex++;
    lives = 3;

    if (currFilmIndex >= maxFilms) {
        messageContainer.textContent = "That's all folks!";
        toggleButton(true);
        return;
    }

    setTimeout(() => {
        renderQuestion();
    }, 3000);
}

// Handle the player's guess
guessForm.addEventListener("submit", (e) => {
    e.preventDefault();

    toggleButton(true);
    const guessValue = guessInput.value.trim();

    if (
        randomizedFilms[currFilmIndex].title.toLowerCase() ===
        guessValue.toLowerCase()
    ) {
        messageContainer.textContent = "Correct!";
        setTimeout(goNext, 3000);
    } else {
        lives--;
        if (lives > 0) {
            messageContainer.textContent = `Incorrect! You have ${lives} guesses remaining.`;
            toggleButton(false);
        } else {
            messageContainer.textContent = `The film was "${randomizedFilms[currFilmIndex].title}"!`;
            setTimeout(goNext, 3000);
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    shuffleFilms();
    renderQuestion();
});

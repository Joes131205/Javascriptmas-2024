// The keyboard has been rendered for you
import { renderKeyboard } from "./keyboard.js";

document
    .getElementById("keyboard-container")
    .addEventListener("click", checkGuess);

// Some useful elements
const guessContainer = document.getElementById("guess-container");
const snowmanParts = document.getElementsByClassName("snowman-part");

const christmasWords = [
    "santa",
    "reindeer",
    "snowman",
    "elf",
    "present",
    "christmas",
    "mistletoe",
    "gingerbread",
    "candle",
    "holly",
    "wreath",
    "stocking",
    "ornament",
    "carol",
    "candy",
    "sleigh",
    "merry",
    "jolly",
    "noel",
    "joy",
    "peace",
    "love",
    "hope",
    "cheer",
    "bells",
    "lights",
    "cookies",
    "eggnog",
    "frosty",
    "grinch",
    "scrooge",
    "rudolph",
    "frostbite",
    "blizzard",
    "icicle",
    "chimney",
    "coal",
    "sugarplum",
    "nutcracker",
    "star",
    "angel",
    "shepherd",
];

let word = "";
const guessArr = [];
let isPlaying = true;
let guesses = 6;

function checkGuess() {
    if (isPlaying) {
        const guess = event.target.id;
        console.log(guess);
        if (word.includes(guess)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === guess) {
                    guessArr[i] = guess;
                }
            }
        } else {
            guesses--;
            snowmanParts[guesses].style.display = "none";
        }
        event.target.disabled = true;

        renderGuess();

        if (guessArr.every((char) => char !== "-")) {
            guessContainer.innerHTML = "You Win!";
            isPlaying = false;
        }

        if (guesses === 0) {
            guessContainer.innerHTML = `You Lose! (The word was "${word}")`;
            isPlaying = false;
        }
    }
}

renderKeyboard();

function renderGuess() {
    const guessHtml = guessArr.map((char) => {
        return `<div class="guess-char">${char}</div>`;
    });
    guessContainer.innerHTML = guessHtml.join("");
}

function init() {
    word = christmasWords[Math.floor(Math.random() * christmasWords.length)];
    for (let i = 0; i < word.length; i++) {
        guessArr.push("-");
    }
    renderGuess();
}

init();

document.getElementById("retry-button").addEventListener("click", () => {
    for (let i = 0; i < snowmanParts.length; i++) {
        snowmanParts[i].style.display = "block";
    }
    guessArr.length = 0;
    guesses = 6;
    isPlaying = true;
    init();
    renderKeyboard();
});

const emojis = ["🎄", "🎁", "🎅", "☃️"]; // Your set of emojis
const gameBoard = document.querySelector("#game-board");
const scoreEl = document.querySelector("#score");
const resetButton = document.querySelector("#reset-button");
const bestScoreEl = document.querySelector("#best-score");

/**
 *🎄 Requirements:
 * - This is a classic "Find the Pair" game with a christmas theme.
 * - The player should be able to reveal cards by clicking on them.
 * - When the player reveals one card, it should stay revealed until a second card is revealed.
 * - When the player reveals two cards:
 *   - If they are the same, they should remain revealed for the rest of the game.
 *   - If they are different, they should be flipped back to hidden.
 * - The cards should be shuffled at the start of each game.
 */

/**
 * 🎅 Stretch Goals:
 * - Add a point system where points are awarded for each correctly revealed pair
 *   and deducted for each incorrect pair (you decide the exact points for each action).
 * - Implement a high-score system using the browser's local storage.
 * - Add a "Restart Game" button that appears when the game ends so the user can start over.
 */

let firstCard = null;
let secondCard = null;
let hasFlippedCard = false;
let isPlaying = true;
let cooldown = false;

let points = 0;
let bestScore = localStorage.getItem("bestScore") || 0;
let cardRevealed = 0;

function init() {
    isPlaying = true;
    if (isPlaying) {
        const shuffledEmojis = [...emojis, ...emojis].sort(
            () => Math.random() - 0.5
        );

        shuffledEmojis.forEach((emoji) => {
            const cardEl = document.createElement("div");
            cardEl.classList.add("card");
            cardEl.dataset.emoji = emoji;
            cardEl.innerText = "?";
            gameBoard.appendChild(cardEl);

            cardEl.addEventListener("click", handleCardClick);
        });
    }
}

function handleCardClick(event) {
    const cardEl = event.currentTarget;

    if (
        cooldown ||
        cardEl === firstCard ||
        cardEl.classList.contains("revealed")
    )
        return;

    cardEl.classList.add("revealed");
    cardEl.innerText = cardEl.dataset.emoji;

    if (!hasFlippedCard) {
        firstCard = cardEl;
        hasFlippedCard = true;
    } else {
        secondCard = cardEl;
        cooldown = true;

        if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
            handleMatch();
        } else {
            handleMismatch();
        }
    }
    scoreEl.textContent = points;
}

function handleMatch() {
    points += 10;
    cardRevealed += 2;

    firstCard.removeEventListener("click", handleCardClick);
    secondCard.removeEventListener("click", handleCardClick);

    resetTurn();

    if (cardRevealed === emojis.length * 2) {
        endGame();
    }
}

function handleMismatch() {
    points -= 5;

    setTimeout(() => {
        firstCard.classList.remove("revealed");
        secondCard.classList.remove("revealed");
        firstCard.innerText = "?";
        secondCard.innerText = "?";

        resetTurn();
    }, 1000);
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    hasFlippedCard = false;
    cooldown = false;
}

function endGame() {
    isPlaying = false;

    if (points > Number(bestScoreEl.textContent)) {
        bestScoreEl.textContent = points;
        localStorage.setItem("bestScore", points);
    }
}

init();
bestScoreEl.textContent = bestScore;

resetButton.addEventListener("click", () => {
    gameBoard.innerHTML = "";
    points = 0;
    cardRevealed = 0;
    scoreEl.textContent = points;
    init();
});

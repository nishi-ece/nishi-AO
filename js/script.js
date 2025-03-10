const gameBoard = document.getElementById("gameBoard");
const statusText = document.getElementById("status");
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function initializeGame() {
    gameBoard.innerHTML = "";
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Your Turn (X)";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => playerMove(i));
        gameBoard.appendChild(cell);
    }
}

function playerMove(index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        renderBoard();
        if (checkWin(currentPlayer)) {
            statusText.textContent = `Player ${currentPlayer} Wins! 💖`;
            gameActive = false;
        } else if (board.every(cell => cell !== "")) {
            statusText.textContent = "It's a Tie! 💞";
            gameActive = false;
        } else {
            currentPlayer = "O";
            statusText.textContent = "Computer's Turn (O)";
            setTimeout(computerMove, 500);
        }
    }
}

function computerMove() {
    if (!gameActive) return;
    let available = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
    let randomIndex = available[Math.floor(Math.random() * available.length)];
    board[randomIndex] = currentPlayer;
    renderBoard();
    if (checkWin(currentPlayer)) {
        statusText.textContent = `Computer (O) Wins! 💔`;
        gameActive = false;
    } else if (board.every(cell => cell !== "")) {
        statusText.textContent = "It's a Tie! 💞";
        gameActive = false;
    } else {
        currentPlayer = "X";
        statusText.textContent = "Your Turn (X)";
    }
}

function renderBoard() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
        if (board[index] === "X") {
            cell.innerHTML = '<span class="pixel-heart x">💖</span>';
        } else if (board[index] === "O") {
            cell.innerHTML = '<span class="pixel-heart o">💗</span>';
        } else {
            cell.innerHTML = "";
        }
    });
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

function restartGame() {
    initializeGame();
}

initializeGame();
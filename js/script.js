const gameBoard = document.getElementById("gameBoard");
const statusText = document.getElementById("status");
const gridSize = 3;  // Reverted to 3x3
let board = Array(gridSize * gridSize).fill("");
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

function initializeGame() {
    gameBoard.innerHTML = "";
    board.fill("");
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Your Turn (X)";
    for (let i = 0; i < gridSize * gridSize; i++) {
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
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = `Your Turn (${currentPlayer})`;
        }
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

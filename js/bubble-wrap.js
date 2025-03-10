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

// Initialize the game
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

// Handle player move
function playerMove(index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        renderBoard();
        if (checkWin(currentPlayer)) {
            statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
            gameActive = false;
        } else if (board.every(cell => cell !== "")) {
            statusText.textContent = "It's a Tie!";
            gameActive = false;
        } else {
            currentPlayer = "O";
            statusText.textContent = "Computer's Turn (O)";
            setTimeout(computerMove, 500);
        }
    }
}

// Computer move (random)
function computerMove() {
    if (!gameActive) return;
    let available = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
    let randomIndex = available[Math.floor(Math.random() * available.length)];
    board[randomIndex] = currentPlayer;
    renderBoard();
    if (checkWin(currentPlayer)) {
        statusText.textContent = `Computer (O) Wins! 🤖`;
        gameActive = false;
    } else if (board.every(cell => cell !== "")) {
        statusText.textContent = "It's a Tie!";
        gameActive = false;
    } else {
        currentPlayer = "X";
        statusText.textContent = "Your Turn (X)";
    }
}

// Render the board
function renderBoard() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

// Check for a win
function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

// Restart the game
function restartGame() {
    initializeGame();
}

initializeGame();

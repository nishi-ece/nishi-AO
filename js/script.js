const gameBoard = document.getElementById("gameBoard");
const statusText = document.getElementById("status");
const gridSize = 6;  // Corrected to 6x6
let board = Array(gridSize * gridSize).fill("");
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [];

// Generate all possible winning combinations (rows, columns, diagonals)
function generateWinningCombinations() {
    // Rows
    for (let r = 0; r < gridSize; r++) {
        const row = [];
        for (let c = 0; c < gridSize; c++) {
            row.push(r * gridSize + c);
        }
        winningCombinations.push(row);
    }

    // Columns
    for (let c = 0; c < gridSize; c++) {
        const col = [];
        for (let r = 0; r < gridSize; r++) {
            col.push(r * gridSize + c);
        }
        winningCombinations.push(col);
    }

    // Diagonals (top-left to bottom-right)
    const diag1 = [];
    for (let d = 0; d < gridSize; d++) {
        diag1.push(d * gridSize + d);
    }
    winningCombinations.push(diag1);

    // Diagonals (top-right to bottom-left)
    const diag2 = [];
    for (let d = 0; d < gridSize; d++) {
        diag2.push(d * gridSize + (gridSize - 1 - d));
    }
    winningCombinations.push(diag2);
}

generateWinningCombinations();

function initializeGame() {
    gameBoard.innerHTML = "";
    board = Array(gridSize * gridSize).fill("");
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

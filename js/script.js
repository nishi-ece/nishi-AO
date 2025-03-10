const gameBoard = document.getElementById("gameBoard");
const statusText = document.getElementById("status");
const gridSize = 3;
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
            return;
        }
        if (board.every(cell => cell !== "")) {
            statusText.textContent = "It's a Tie! 💞";
            gameActive = false;
            return;
        }

        // Switch player and let the opponent (O) make a move automatically
        currentPlayer = "O";
        statusText.textContent = `Opponent's Turn (O)`;
        setTimeout(opponentMove, 300);  // Adding a slight delay for a natural feel
    }
}

function opponentMove() {
    let emptyCells = board.map((cell, index) => (cell === "" ? index : null)).filter(index => index !== null);

    // Choose a random empty cell for the opponent
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    if (randomIndex !== undefined) {
        board[randomIndex] = currentPlayer;
        renderBoard();
        if (checkWin(currentPlayer)) {
            statusText.textContent = `Opponent (O) Wins! 💗`;
            gameActive = false;
            return;
        }
        if (board.every(cell => cell !== "")) {
            statusText.textContent = "It's a Tie! 💞";
            gameActive = false;
            return;
        }

        // Switch back to player X
        currentPlayer = "X";
        statusText.textContent = `Your Turn (X)`;
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

const bubbleWrap = document.getElementById("bubbleWrap");

// Bubble popping sound
const popSound = new Audio("https://www.soundjay.com/button/sounds/button-16.mp3");

// Create bubbles
function createBubbles(rows, cols) {
    bubbleWrap.innerHTML = "";
    for (let i = 0; i < rows * cols; i++) {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");

        // Pop the bubble on click
        bubble.addEventListener("click", () => {
            if (!bubble.classList.contains("popped")) {
                bubble.classList.add("popped");
                popSound.currentTime = 0;
                popSound.play();
            }
        });

        bubbleWrap.appendChild(bubble);
    }
}

// Reset bubbles
function resetBubbles() {
    createBubbles(10, 10);
}

// Initialize bubble wrap
createBubbles(10, 10);

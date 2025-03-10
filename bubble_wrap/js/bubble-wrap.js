const bubbleWrap = document.getElementById("bubbleWrap");

// Bubble popping sound
const popSound = new Audio("https://www.soundjay.com/button/sounds/button-16.mp3");

// Create the bubbles
function createBubbles(rows, cols) {
    for (let i = 0; i < rows * cols; i++) {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");

        // Pop the bubble on click
        bubble.addEventListener("click", () => {
            if (!bubble.classList.contains("popped")) {
                bubble.classList.add("popped");
                popSound.currentTime = 0; // Reset sound
                popSound.play();
            }
        });

        bubbleWrap.appendChild(bubble);
    }
}

// Initialize the bubble wrap
createBubbles(10, 10);
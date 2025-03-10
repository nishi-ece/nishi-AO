const bubbleWrap = document.getElementById("bubbleWrap");
const totalBubbles = 100;
const resetTime = 6000; // 6 seconds

function createBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.addEventListener("click", popBubble);
    return bubble;
}

function popBubble(event) {
    const bubble = event.target;
    bubble.classList.add("popped");
    setTimeout(() => {
        bubble.classList.remove("popped");
    }, resetTime);
}

function createBubbleWrap() {
    for (let i = 0; i < totalBubbles; i++) {
        const bubble = createBubble();
        bubbleWrap.appendChild(bubble);
    }
}

createBubbleWrap();
// Load background music
const bgMusic = new Audio("bg-music.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.4; // optional: make it less loud

// Play after user interaction (required on some browsers)
document.addEventListener("keydown", () => {
  if (bgMusic.paused) {
    bgMusic.play();
  }
});

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const laneCount = 4;
const laneWidth = canvas.width / laneCount;

const lanes = [];
for (let i = 0; i < laneCount; i++) {
  lanes.push(i * laneWidth + laneWidth / 2);
}

// Giraffe player
const giraffe = {
  x: canvas.width / 2 - 50,
  y: canvas.height - 120,
  width: 100,
  height: 100,
  speed: 6
};

// Notes (falling shapes)
const notes = [];
const noteRadius = 30;
const noteSpeed = 4;

let score = 0;

// Keyboard control
let leftPressed = false;
let rightPressed = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") leftPressed = true;
  if (e.key === "ArrowRight") rightPressed = true;
});
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") leftPressed = false;
  if (e.key === "ArrowRight") rightPressed = false;
});

function createNote() {
    const laneX = lanes[Math.floor(Math.random() * lanes.length)];
    notes.push({
      x: laneX,
      y: -noteRadius
    });
  }
  

function isColliding(note) {
  return (
    note.x + noteRadius > giraffe.x &&
    note.x - noteRadius < giraffe.x + giraffe.width &&
    note.y + noteRadius > giraffe.y &&
    note.y - noteRadius < giraffe.y + giraffe.height
  );
}

function update() {
  // Move giraffe
  if (leftPressed && giraffe.x > 0) giraffe.x -= giraffe.speed;
  if (rightPressed && giraffe.x < canvas.width - giraffe.width) giraffe.x += giraffe.speed;

  // Spawn notes
  if (Math.random() < 0.02) createNote();

  // Move notes
  for (let i = 0; i < notes.length; i++) {
    notes[i].y += noteSpeed;

    if (isColliding(notes[i])) {
      score++;
      notes.splice(i, 1);
      i--;
    } else if (notes[i].y - noteRadius > canvas.height) {
      notes.splice(i, 1);
      i--;
    }
  }
}

// Load giraffe image
const giraffeImg = new Image();
giraffeImg.src = "giraffe.png";

giraffeImg.onload = () => {
  loop(); // Start the game loop after image is ready
};

function draw() {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 2;
    for (let i = 1; i < laneCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * laneWidth, 0);
        ctx.lineTo(i * laneWidth, canvas.height);
        ctx.stroke();
    }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw giraffe image
  ctx.drawImage(giraffeImg, giraffe.x, giraffe.y, giraffe.width, giraffe.height);

  // Draw notes
  ctx.fillStyle = "#800080";
  notes.forEach((note) => {
    ctx.beginPath();
    ctx.arc(note.x, note.y, noteRadius, 0, Math.PI * 2);
    ctx.fill();
  });

  // Draw score
  ctx.fillStyle = "#000";
  ctx.font = "30px Arial";
  ctx.fillText("Score: " + score, 20, 40);
}

let lastTime = 0;
const fps = 60;
const interval = 1000 / fps;

function loop(timestamp) {
  if (timestamp - lastTime > interval) {
    update();
    draw();
    lastTime = timestamp;
  }
  requestAnimationFrame(loop);
}

loop();
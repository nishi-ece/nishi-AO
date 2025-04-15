import { setupBeatManager } from "./beatManager.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Centered lane setup
const laneCount = 4;
const laneWidth = 80;
const totalLaneWidth = laneCount * laneWidth;
const startX = canvas.width / 2 - totalLaneWidth / 2;

const lanes = [];
for (let i = 0; i < laneCount; i++) {
  lanes.push(startX + i * laneWidth + laneWidth / 2);
}

// Giraffe player
const giraffe = {
  x: canvas.width / 2 - 50,
  y: canvas.height - 120,
  width: 100,
  height: 100,
  speed: 8
};

// Notes
const notes = [];
const noteRadius = 20;
const noteSpeed = 6;

let score = 0;

// Load giraffe image
const giraffeImg = new Image();
giraffeImg.src = "giraffe.png";

// Controls
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
  if (leftPressed && giraffe.x > 0) giraffe.x -= giraffe.speed;
  if (rightPressed && giraffe.x < canvas.width - giraffe.width) giraffe.x += giraffe.speed;

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

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Optional: Draw lane lines
  ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
  ctx.lineWidth = 2;
  for (let i = 0; i <= laneCount; i++) {
    const x = startX + i * laneWidth;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  // Draw giraffe
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

// 🎧 Start music + beat manager on key press
let musicStarted = false;
document.addEventListener("keydown", () => {
  if (!musicStarted) {
    musicStarted = true;
    setupBeatManager("bg-music.mp3", () => {
      createNote();
    });
  }
});

giraffeImg.onload = () => {
  loop();
};

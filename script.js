alert("JS Loaded!");

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Giraffe as rectangle
const giraffe = {
  x: canvas.width / 2 - 50,
  y: canvas.height - 120,
  width: 100,
  height: 100,
  speed: 10
};

// Notes as falling circles
const notes = [];
const noteRadius = 20;
const noteSpeed = 4;

// Keyboard control
let leftPressed = false;
let rightPressed = false;

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") leftPressed = true;
  if (e.key === "ArrowRight") rightPressed = true;
});

document.addEventListener("keyup", e => {
  if (e.key === "ArrowLeft") leftPressed = false;
  if (e.key === "ArrowRight") rightPressed = false;
});

function createNote() {
  notes.push({
    x: Math.random() * (canvas.width - noteRadius * 2),
    y: -noteRadius
  });
}

function isColliding(note) {
  return (
    note.x + noteRadius > giraffe.x &&
    note.x - noteRadius < giraffe.x + giraffe.width &&
    note.y + noteRadius > giraffe.y
  );
}

let score = 0;

function update() {
  // Move giraffe
  if (leftPressed && giraffe.x > 0) {
    giraffe.x -= giraffe.speed;
  }
  if (rightPressed && giraffe.x < canvas.width - giraffe.width) {
    giraffe.x += giraffe.speed;
  }

  // Possibly spawn new note
  if (Math.random() < 0.02) {
    createNote();
  }

  // Update notes
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

  // Giraffe (rectangle)
  ctx.fillStyle = "#FFD700"; // Yellow
  ctx.fillRect(giraffe.x, giraffe.y, giraffe.width, giraffe.height);

  // Notes (circles)
  ctx.fillStyle = "#800080"; // Purple
  for (let note of notes) {
    ctx.beginPath();
    ctx.arc(note.x, note.y, noteRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Score
  ctx.fillStyle = "#000";
  ctx.font = "30px Arial";
  ctx.fillText("Score: " + score, 20, 40);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();

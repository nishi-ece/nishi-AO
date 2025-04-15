const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Draw red rectangle
ctx.fillStyle = "red";
ctx.fillRect(100, 100, 200, 150);

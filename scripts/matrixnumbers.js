//Draws a ball with a random colour, will eventually become background matrix numbers I promise

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

ctx.beginPath();
ctx.fillStyle = randomRGB();
ctx.arc(200, 200, 20, 0, 2*Math.PI);
ctx.fill();
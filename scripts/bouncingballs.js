//Draws a ball with a random colour, will eventually become background matrix numbers I promise

//Define the canvas to draw on and get a context to draw onto
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

//Function to pick a random number in the given range
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Function to pick a random rgb colour
function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}


//Class to define a ball
class Ball{
    //Constructor
    constructor(x, y, velX, velY, color, sz){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.sz = sz;
    }

    //Draw the current ball
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.sz, 0, 2*Math.PI);
        ctx.fill();
    }

    //Update the balls position
    update() {
        //Alter the velocity if we reach an edge
        if (((this.x + this.sz) >= width) || (this.x - this.sz) <= 0){
            this.velX = -(this.velX);
        } 

        if (((this.y + this.sz) >= height) || (this.y - this.sz) <= 0){
            this.velY = -(this.velY);
        }

        //Update position based on velocity
        this.x = this.x + this.velX;
        this.y = this.y + this.velY;
    }
}

//List of all our balls
const balls = []

//Create 15 balls at random positions and velocities
while (balls.length < 15){
    const sz = 10;
    const ball = new Ball(
        random(0 + sz, width - sz),
        random(0 + sz, height - sz),
        random(-5, 5),
        random(-5, 5),
        randomRGB(),
        sz
    );

    balls.push(ball);
}

//The main animation loop
function loop(){
    //Draw a black background
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);

    //Draw and update each balls positions
    for (const ball of balls){
        ball.draw();
        ball.update();
    }

    //Rerun loop
    requestAnimationFrame(loop);
}

loop();
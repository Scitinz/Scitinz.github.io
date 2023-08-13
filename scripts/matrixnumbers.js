//Draws matrix numbers fading up the screen

//Define the canvas to draw on and get a context to draw onto
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//Get window height and width and set as canvas height/width
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

//Assumed framerate for character updates
const frameRate = 60;

//Function to pick a random number in the given range
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Function to pick a random rgb colour
function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

//Function to pick a random number or letter
function randomChar(){
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVQXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const len = chars.length;
    return chars.charAt(random(0, len));
}

//Class to define a matrix number fader
class Fader{
    //Constructor
    constructor(x, y, velY, length, height, color){
        this.x = x;
        this.y = y;
        this.velY = velY;
        this.length = length;
        this.height = height;
        //X position modulo the pixel height
        this.drawY = Math.floor(y/height) * height;

        this.counter = 0;
        this.color = color;

        this.chars = [];
        for (let i = 0; i < this.length; i++) {
            this.chars.push(randomChar());
        }
    }

    //Draw the current fader
    draw() {
        //Colours that change from character to character
        let tempColor = this.color;
        let tempDrawY = this.drawY;
        //For every character
        for (let i = 0; i < this.length; i++) {
            //Don't draw the character if it is off screen
            if (tempDrawY >= height || tempDrawY <= 0){
                continue;
            }
            //Draw it
            ctx.beginPath();
            ctx.fillStyle = tempColor;
            ctx.font = this.height.toString() + "px sans-serif";
            ctx.fillText(this.chars[i], this.x, tempDrawY);
            //Calculate next characters position
            tempDrawY = tempDrawY + this.height + 2;
            //Calculate its color based on the length of the fader
            tempColor = `rgb(${0},${(255/this.length)*(this.length - i - 1)},${0})`;
        }
    }

    //Update the fader position
    update() {
        //If the whole fader is outside the screen, reset it
        if (this.y + (this.length * (this.height + 2)) <= 0){
            this.y = height - this.height;
            this.x = random(0, width);
        }
        //Update positions
        this.y = this.y - this.velY;
        this.drawY = Math.floor(this.y/this.height) * this.height;
        this.counter = (this.counter + 1) % frameRate;
        //Update character every half a second
        if (this.counter % (frameRate/2) == 0){
            for (let i = 0; i < this.length; i++) {
                this.chars[i] = randomChar();
            }
        }
    }
}

//List of all our faders
const faders = [];

//Create 10 faders at random positions and velocities
while (faders.length < 30){
    const sz = 24;
    const fader = new Fader(
        random(0 + sz, width - sz),
        random(0 + sz, height - sz),
        random(3, 6),
        random(10, 20),
        sz,
        "rgba(0, 255, 0, 1)"
    );

    faders.push(fader);
}

//The main animation loop
function loop(){
    //Draw a black background
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0, 0, width, height);

    //Draw and update each balls positions
    for (const fader of faders){
        fader.draw();
        fader.update();
    }

    //Rerun loop
    requestAnimationFrame(loop);
}

loop();
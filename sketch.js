//Canvas constants
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 650;
const BGCOLOR_DIV = 40;
const BG_COLOR = "#000";

//Array of letters
let letters = [];

//Letter Constants
const COLOR_INCR = 160;
const SPEED_MIN = 2;
const SPEED_MAX = 20;
const SIZE_MIN = 20;
const SIZE_MAX = 120;

//Constants to determine the direction that a letter is travelling
const DIAG_UL = 0;
const DIAG_UR = 1;
const DIAG_DL = 2;
const DIAG_DR = 3;
const DIR_MAX = DIAG_DR;

//Color Pallette
const COLOR_PALLETE = ["#00f", "#0f0", "#f00", "#0ff", "#f0f", "#0ff"];

function setup(){
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw(){
    //Draw background
    background(BG_COLOR);

    //Draw letters
    for(i = 0; i < letters.length; i++){
        let currLet = letters[i];
        if(currLet.faded()){
            //Remove faded letter
            letters.splice(i, 1);
            i--;
        }else{
            currLet.drawAsLine();
            currLet.move();
            currLet.fade(1);
        }
    }
}

function keyPressed(){
    if(key.length == 1){
        let dir = getRandomInt(0, DIR_MAX);
        let sz = getRandomInt(SIZE_MIN, SIZE_MAX);
        let sp = getRandomInt(SPEED_MIN, SPEED_MAX);
        let clr = color(COLOR_PALLETE[getRandomInt(0, COLOR_PALLETE.length - 1)]);
        let x = getRandomInt(0, CANVAS_WIDTH);
        let y = getRandomInt(0, CANVAS_HEIGHT);
        let newLetter = new Letter(key, COLOR_INCR, dir, sz, sp, clr, x, y);
        letters.push(newLetter);
    }
}

/*
* Returns a random integer between min and max (inclusive)
*/
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
* Class for Letter object
*/
class Letter{
    constructor(letter, fadeRemaining, direction, size, speed, color, x, y){
        this.letter = letter;
        this.fadeRemaining = fadeRemaining;
        this.direction = direction;
        this.size = size;
        this.speed = speed;
        this.color = color;
        this.x = x;
        this.y = y;
    }

    /*
    * Draw letter at given position
    */
    draw(){
        textSize(this.size);
        fill(lerpColor(color(BG_COLOR), this.color, this.fadeRemaining/COLOR_INCR));
        text(this.letter, this.x, this.y);
    }

    /*
    * Move letter according to speed and direction
    */
    move(){
        if(this.direction == DIAG_UL){
            this.x -= this.speed;
            this.y -= this.speed;
        }else if(this.direction == DIAG_DL){
            this.x -= this.speed;
            this.y += this.speed;
        }else if(this.direction == DIAG_DR){
            this.x += this.speed;
            this.y += this.speed;
        }else if(this.direction == DIAG_UR){
            this.x += this.speed;
            this.y -= this.speed;
        }else{
            //Error - should never reach here
        }
    }

    /*
    * Draw several instances of letter in a line according to direction
    */
    drawAsLine(){
        //Draw base letter - also sets fill and text size
        this.draw();

        if(this.direction == DIAG_UL || this.direction == DIAG_DR){
            let tempX, tempY;
            
            //Draw letters up-left of starter
            tempX = this.x - this.size;
            tempY = this.y - this.size;
            while(tempX > -this.size && tempY > 0){
                text(this.letter, tempX, tempY);
                tempX -= this.size;
                tempY -= this.size;
            }

            //Draw letters down-right of starter
            tempX = this.x + this.size;
            tempY = this.y + this.size;
            while(tempX < CANVAS_WIDTH && tempY < CANVAS_HEIGHT + this.size){
                text(this.letter, tempX, tempY);
                tempX += this.size;
                tempY += this.size;
            }
            
        }else if(this.direction == DIAG_DL || this.direction == DIAG_UR){
            let tempX, tempY;

            //Draw letters down-left of starter
            tempX = this.x - this.size;
            tempY = this.y + this.size;
            while(tempX > -this.size && tempY < CANVAS_HEIGHT + this.size){
                text(this.letter, tempX, tempY);
                tempX -= this.size;
                tempY += this.size;
            }

            //Draw letters up-right of starter
            tempX = this.x + this.size;
            tempY = this.y - this.size;
            while(tempX < CANVAS_WIDTH && tempY > 0){
                text(this.letter, tempX, tempY);
                tempX += this.size;
                tempY -= this.size;
            }
        }else{
            //Error - should never reach here
        }
    }

    /*
    * Decrease amount of fade remaining
    *
    * Input:
    *   fadeAmount - integer amount to decrease fade
    */
    fade(fadeAmount){
        this.fadeRemaining -= fadeAmount;
    }

    /*
    * Determine whether or not letter is faded
    *
    * Output:
    *   true if letter is faded, false if not
    */
    faded(){
        return this.fadeRemaining <= 0;
    }
}
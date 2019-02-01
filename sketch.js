//Canvas constants
const BGCOLOR_DIV = 40;
const BG_COLOR = "#000";

//Array of letters
let letters = [];

//Letter Constants
const COLOR_INCR = 160;
const SPEED_MIN = 1;
const SPEED_MAX = 15;
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

//Initial state boolean
let buttonPressed;

//Start message vars
const START_MESSAGE_TEXT = "#TYPEAWAY";
let startMessageFont;

//Font vars
const FONT_PALLETE = ["fonts/Audiowide/Audiowide-Regular.ttf",
    "fonts/Bangers/Bangers-Regular.ttf",
    "fonts/Bungee_Inline/BungeeInline-Regular.ttf",
    "fonts/Chakra_Petch/ChakraPetch-Regular.ttf",
    "fonts/Major_Mono_Display/MajorMonoDisplay-Regular.ttf",
    "fonts/Monoton/Monoton-Regular.ttf",
    "fonts/Orbitron/Orbitron-Regular.ttf",
    "fonts/Shojumaru/Shojumaru-Regular.ttf",
    "fonts/VT323/VT323-Regular.ttf",
    "fonts/Wallpoet/Wallpoet-Regular.ttf"];
const font_arr = [];


/*
* Run once before site loads
*/
function preload(){
    mmdFont = loadFont("fonts/Major_Mono_Display/MajorMonoDisplay-Regular.ttf");
    for(i = 0; i < FONT_PALLETE.length; i++){
        font_arr.push(loadFont(FONT_PALLETE[i]));
    }
}

/*
* Run at initial load
*/
function setup(){
    createCanvas(windowWidth, windowHeight);
    buttonPressed = false;
    startMessageFont = font_arr[getRandomInt(0, font_arr.length - 1)];
    displayStartMessage();
}

/*
*   Run every frame
*/
function draw(){
    //Draw background
    background(BG_COLOR);

    if(!buttonPressed){
        displayStartMessage();
    }else{
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
}

/*
* Run when window is resized
*/
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if(!buttonPressed){
        startMessageSize = Math.min(width, height) / 10;
        startMessageX = width/2;
        startMessageY = height/2;
    }
  }

/*
* Run when key is pressed
*/
function keyPressed(){
    if(key.length == 1){
        if(!buttonPressed){
            buttonPressed = true;
            textAlign(LEFT, BASELINE);
        }

        let dir = getRandomInt(0, DIR_MAX);
        let sz = getRandomInt(SIZE_MIN, SIZE_MAX);
        let sp = getRandomInt(SPEED_MIN, SPEED_MAX);
        let clr = color(COLOR_PALLETE[getRandomInt(0, COLOR_PALLETE.length - 1)]);
        let x = getRandomInt(0, width);
        let y = getRandomInt(0, height);
        let letFont = font_arr[getRandomInt(0, font_arr.length - 1)];
        let newLetter = new Letter(key, COLOR_INCR, dir, sz, sp, clr, x, y, letFont);

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
* Displays start message, randomizing the font
*/
function displayStartMessage(){
    let size = Math.min(width, height) / 10;
    let x = width/2;
    let y = height/2;

    fill("white");
    textSize(size);
    textAlign(CENTER, CENTER);
    textFont(startMessageFont);
    text(START_MESSAGE_TEXT, x, y);
}

/*
* Class for Letter object
*/
class Letter{
    constructor(letter, fadeRemaining, direction, size, speed, color, x, y, font){
        this.letter = letter;
        this.fadeRemaining = fadeRemaining;
        this.direction = direction;
        this.size = size;
        this.speed = speed;
        this.color = color;
        this.x = x;
        this.y = y;
        this.font = font;
    }

    /*
    * Draw letter at given position
    */
    draw(){
        textSize(this.size);
        textFont(this.font);
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
        //Draw base letter - also sets fill, text size, and font
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
            while(tempX < width && tempY < height + this.size){
                text(this.letter, tempX, tempY);
                tempX += this.size;
                tempY += this.size;
            }
            
        }else if(this.direction == DIAG_DL || this.direction == DIAG_UR){
            let tempX, tempY;

            //Draw letters down-left of starter
            tempX = this.x - this.size;
            tempY = this.y + this.size;
            while(tempX > -this.size && tempY < height + this.size){
                text(this.letter, tempX, tempY);
                tempX -= this.size;
                tempY += this.size;
            }

            //Draw letters up-right of starter
            tempX = this.x + this.size;
            tempY = this.y - this.size;
            while(tempX < width && tempY > 0){
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
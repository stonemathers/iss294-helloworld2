//Canvas constants
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 650;
const BGCOLOR_DIV = 40;
const BG_COLOR = "#000";

//Variables for letters
let letters = [];
let fades = [];
let directions = [];
let sizes = [];
let speeds = [];
let colors = [];
let locsX = [];
let locsY = [];

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
    let numLet = letters.length;

    //Draw background
    background(BG_COLOR);

    //Draw letters
    for(i = 0; i < letters.length; i++){
        let fade = fades[i];
        if(fade > 0){
            let letter = letters[i];
            let size = sizes[i];
            let x = locsX[i];
            let y = locsY[i];
            let dir = directions[i];
            let speed = speeds[i];

            textSize(size);
            fill(lerpColor(color(BG_COLOR), colors[i], fade/COLOR_INCR));

            if(dir == DIAG_UL){
                //Draw line of letters
                //Draw letters up-left of starter
                tempX = x - size;
                tempY = y - size;
                while(tempX > -size && tempY > -size){
                    text(letter, tempX, tempY);
                    tempX -= size;
                    tempY -= size;
                }

                //Draw starter
                text(letter, x, y);

                //Draw letters down-right of starter
                tempX = x + size;
                tempY = y + size;
                while(tempX < CANVAS_WIDTH && tempY < CANVAS_HEIGHT){
                    text(letter, tempX, tempY);
                    tempX += size;
                    tempY += size;
                }

                //Update position
                locsX[i] = x - speed;
                locsY[i] = y - speed;
            }else if(dir == DIAG_DL){
                //Draw line of letters
                //Draw letters down-left of starter
                tempX = x - size;
                tempY = y + size;
                while(tempX > -size && tempY < CANVAS_HEIGHT){
                    text(letter, tempX, tempY);
                    tempX -= size;
                    tempY += size;
                }

                //Draw starter
                text(letter, x, y);

                //Draw letters up-right of starter
                tempX = x + size;
                tempY = y - size;
                while(tempX < CANVAS_WIDTH && tempY > -size){
                    text(letter, tempX, tempY);
                    tempX += size;
                    tempY -= size;
                }

                //Update position
                locsX[i] = x - speed;
                locsY[i] = y + speed;
            }else if(dir == DIAG_DR){
                //Draw line of letters
                //Draw letters up-left of starter
                tempX = x - size;
                tempY = y - size;
                while(tempX > -size && tempY > -size){
                    text(letter, tempX, tempY);
                    tempX -= size;
                    tempY -= size;
                }

                //Draw starter
                text(letter, x, y);

                //Draw letters down-right of starter
                tempX = x + size;
                tempY = y + size;
                while(tempX < CANVAS_WIDTH && tempY < CANVAS_HEIGHT){
                    text(letter, tempX, tempY);
                    tempX += size;
                    tempY += size;
                }

                //Update position
                locsX[i] = x + speed;
                locsY[i] = y + speed;
            }else if(dir == DIAG_UR){
                //Draw line of letters
                //Draw letters down-left of starter
                tempX = x - size;
                tempY = y + size;
                while(tempX > -size && tempY < CANVAS_HEIGHT){
                    text(letter, tempX, tempY);
                    tempX -= size;
                    tempY += size;
                }

                //Draw starter
                text(letter, x, y);

                //Draw letters up-right of starter
                tempX = x + size;
                tempY = y - size;
                while(tempX < CANVAS_WIDTH && tempY > -size){
                    text(letter, tempX, tempY);
                    tempX += size;
                    tempY -= size;
                }

                //Update position
                locsX[i] = x + speed;
                locsY[i] = y - speed;
            }

            //Decrement fade value
            fades[i] = fade - 1;
        }else{
            //Remove faded letter
            letters.splice(i, 1);
            fades.splice(i, 1);
            directions.splice(i, 1);
            sizes.splice(i, 1);
            speeds.splice(i, 1);
            colors.splice(i, 1);
            locsX.splice(i, 1);
            locsY.splice(i, 1);
            i--;
        }
    }
}

function keyPressed(){
    if(key.length == 1){
        letters.push(key);
        fades.push(COLOR_INCR);
        directions.push(getRandomInt(0, DIR_MAX));
        sizes.push(getRandomInt(SIZE_MIN, SIZE_MAX));
        speeds.push(getRandomInt(SPEED_MIN, SPEED_MAX));
        colors.push(color(COLOR_PALLETE[getRandomInt(0, COLOR_PALLETE.length - 1)]));
        locsX.push(getRandomInt(0, CANVAS_WIDTH));
        locsY.push(getRandomInt(0, CANVAS_HEIGHT));
    }
}

/*
* Returns a random integer between min and max (inclusive)
*/
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
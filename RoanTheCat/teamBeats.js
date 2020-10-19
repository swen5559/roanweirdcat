let roanFaceUp;
let roanFaceDown;
let keyboard;
let keysInstruct;
let catFace;
let catPawz;
let osc, envelope;
let scaleArray = [52, 60, 64, 65, 69, 72, 74, 76];
let note = 0;
let canWidth;
let canHeight;
let xL, speedxL;
let xR, speedxR;
let pawLeftHeightMinus;
let pawRightHeightMinus;
let songBeat;
let faceUpPosX;
let faceUpPosY;
let keyA,keyS,keyD,keyF,keyJ,keyK,keyL,keyDOT;
let letterSize;
let letterSizeBig;
let letterSizeCircle;
let letterSizeCircleBig;
let keySpacing;
let keyOpacity;
let keyboardBool;
let drawFace;
let keyisPressed;
let catX;
let catSpeedX;
let meowSound;
let roanSound;
let catFaceSize;

function preload() {
  roanFaceUp = loadImage('assets/r1.png');
  roanFaceDown = loadImage('assets/r2.png');
  catPawz = loadImage('assets/catPawz.png');
  songBeat = loadSound('assets/beat.mp3');
  meowSound = loadSound('assets/meow.mp3');
  roanSound = loadSound('assets/roan.mp3');
  keyboard = loadImage('assets/keyboard.png');
  keysInstruct = loadImage('assets/keysInstruct.png');
  catFace = loadImage('assets/catFace.png');
}

function setup() {
catFaceSize = 300;
catX = 4;
catSpeedX = 5;
drawFace = true;
keyboardBool = true;
letterSize = 40;
letterSizeBig = 89;
lettSizeCircle = 100;
letterSizeCircleBig = 200;
keyOpacity = 255;
keySpacing = 80;
userStartAudio();
canWidth = windowWidth;
canHeight = windowHeight;
createCanvas (canWidth,canHeight);
background(255,255,0);
image(roanFaceUp, windowWidth/2 - 200, windowHeight/2);
image(roanFaceDown, windowWidth/2 - 200, windowHeight/2);

osc = new p5.SinOsc();
envelope = new p5.Env();
envelope.setADSR(0.001, 0.5, 0.1, 0.5);
envelope.setRange(1, 0);

xL = canWidth/2-800;
xR = canWidth/2+100;
speedxL = 5;
speedxR = 5;
pawLeftHeightMinus = 250;
pawRightHeightMinus = 250;
  if (songBeat.isPlaying()) {
    // .isPlaying() returns a boolean
    songBeat.stop();
  } else {
    songBeat.play();
    songBeat.loop();
  }
  
}


function draw() {
if(keyisPressed){
background(random(127,255),random(127,255),random(127,255));
}
else{
background(63,224,208);
}
//functions
moveLeftPaw();
moveRightPaw();
drawKeyboard();
drawLetters();
drawTheFace();
animateTheFace();
drawCatFace();
//detectMeowFace();
}

//catface follow mouse

function animateTheFace(){
  if(keyisPressed){
    faceUp();
  }
  if(keyisPressed == false){
    faceDown();
  }
}


function moveLeftPaw(){

//rect(0,0,canWidth/2 - 130,canHeight);
image(catPawz, xL, canHeight - pawLeftHeightMinus);
xL += speedxL;
if(xL > canWidth/2 - 710){
  speedxL = speedxL * -1;
}
if(xL <= canWidth/2 - 1000){
  speedxL *= -1;
}
}

function moveRightPaw(){
let from = color(255,255,0);
let to = color(0,255,255);
let interA = lerpColor(to, from, 0.33);
fill(interA);
noStroke();
//rect(canWidth/2 + 230,0,canWidth,canHeight);
image(catPawz, xR, canHeight - pawRightHeightMinus);
xR += speedxR;
if(xR > canWidth/2 + 200){
  speedxR = speedxR * -1;
}
if(xR <= canWidth/2 -50){
  speedxR *= -1;
}

}

function keyPressed(){
  
  osc.start();
  keyboardBool = false;
  keyisPressed = true;
  drawFace = false;
  
  if(key === "a"){
    
  meowSound.play();

  let midiValue = scaleArray[0];
  let freqValue = midiToFreq(midiValue);
  osc.freq(freqValue);
  envelope.play(osc, 0, 0.1);
  pawLeftHeightMinus = 750;
  keyA = true;
  }
  if(key === "s"){
  let midiValue = scaleArray[1];
  let freqValue = midiToFreq(midiValue);
  osc.freq(freqValue);
  envelope.play(osc, 0, 0.1);
  pawLeftHeightMinus = 750;
  keyS = true;
  }
  if(key === "d"){
  let midiValue = scaleArray[2];
  let freqValue = midiToFreq(midiValue);
  osc.freq(freqValue);
  envelope.play(osc, 0, 0.1);
  pawLeftHeightMinus = 750;
  keyD = true;
  }
  if(key === "f"){
  let midiValue = scaleArray[3];
  let freqValue = midiToFreq(midiValue);
  osc.freq(freqValue);
  envelope.play(osc, 0, 0.1);
  pawLeftHeightMinus = 750;
  keyF = true;
  }
  if(key === "j"){
  let midiValue = scaleArray[4];
  let freqValue = midiToFreq(midiValue);
  osc.freq(freqValue);
  envelope.play(osc, 0, 0.1);
  pawRightHeightMinus = 750;
  keyJ = true;
  }
  if(key === "k"){
  let midiValue = scaleArray[5];
  let freqValue = midiToFreq(midiValue);
  osc.freq(freqValue);
  envelope.play(osc, 0, 0.1);
  pawRightHeightMinus = 750;
  keyK = true;
  }
  if(key === "l"){
  let midiValue = scaleArray[6];
  let freqValue = midiToFreq(midiValue);
  osc.freq(freqValue);
  envelope.play(osc, 0, 0.1);
  pawRightHeightMinus = 750;
  keyL = true;
  }
  if(key === ";"){
  
  roanSound.play();
  
  let midiValue = scaleArray[7];
  let freqValue = midiToFreq(midiValue);
  osc.freq(freqValue);
  envelope.play(osc, 0, 0.1);
  pawRightHeightMinus = 750;
  keyDOT = true;
  }
}

function keyReleased(){
  
  keyisPressed = false;

  if(key === "a"){
  pawLeftHeightMinus = random(150,250);
  keyA = false;
  }
  if(key === "s"){
  pawLeftHeightMinus = random(150,250);
  keyS = false;
  }
  if(key === "d"){
  pawLeftHeightMinus = random(150,250);
  keyD = false;
  }
  if(key === "f"){
  pawLeftHeightMinus = random(150,250);
  keyF = false;
  }
  if(key === "j"){
  pawRightHeightMinus = random(150,250);
  keyJ = false;
  }
  if(key === "k"){
  pawRightHeightMinus = random(150,250);
  keyK = false;
  }
  if(key === "l"){
  pawRightHeightMinus = random(150,250);
  keyL = false;
  }
  if(key === ";"){
  pawRightHeightMinus = random(150,250);
  keyDOT = false;
  }
}

function faceUp(){
    //let from = color(255,255,0);
    //let to = color(0,255,255);
    //let interA = lerpColor(to, from, 0.33);
    //background(interA);
    //background(255,255,0);
    faceUpPosX = windowWidth/2 - 200 + random(-30,35);
    faceUpPosY = windowHeight/2 - random(30,70);
    image(roanFaceUp, faceUpPosX, faceUpPosY);
    image(roanFaceDown, windowWidth/2 - random(180,220), windowHeight/2);
}

function faceDown(){
    //let from = color(255,255,0);
    //let to = color(0,255,255);
    //let interA = lerpColor(to,from, 0.33);
    //background(interA);
    image(roanFaceUp, windowWidth/2 - 200, windowHeight/2 + random(1,6));
    image(roanFaceDown, windowWidth/2 - 200, windowHeight/2);
}

function drawLetters(){
  
//KEY A
  if(keyA){
  fill(255,255,0,keyOpacity);
  textSize(letterSizeBig);
  ellipse(faceUpPosX, faceUpPosY, letterSizeCircleBig);
  } 
  else {
  fill(64,224,208,keyOpacity);
  textSize(letterSize);
  ellipse(faceUpPosX, faceUpPosY, letterSizeCircle);
  }
  fill(0);
  text("a", faceUpPosX, faceUpPosY); 

//KEY S
  if(keyS){
  fill(255,255,0,keyOpacity);
  textSize(letterSizeBig);
  ellipse(faceUpPosX + keySpacing, faceUpPosY, letterSizeCircleBig);
  }
  else {
  fill(64,224,208,keyOpacity);
  textSize(letterSize);
  ellipse(faceUpPosX + keySpacing, faceUpPosY, letterSizeCircle);
  }
  fill(0);
  text("s", faceUpPosX + keySpacing, faceUpPosY); 
  
//KEY D
  if(keyD){
  fill(255,255,0,keyOpacity);
  textSize(letterSizeBig);
  ellipse(faceUpPosX + (keySpacing * 2), faceUpPosY, letterSizeCircleBig);
  }
  else {
  fill(64,224,208,keyOpacity);
  textSize(letterSize);
  ellipse(faceUpPosX + (keySpacing * 2), faceUpPosY, letterSizeCircle);
  }
  fill(0);
  text("d", faceUpPosX + keySpacing * 2, faceUpPosY); 
  
//KEY F
  if(keyF){
  fill(255,255,0,keyOpacity);
  textSize(letterSizeBig);
  ellipse(faceUpPosX + (keySpacing * 3), faceUpPosY, letterSizeCircleBig);
  }
  else {
  fill(64,224,208,keyOpacity);
  textSize(letterSize);
  ellipse(faceUpPosX + (keySpacing * 3), faceUpPosY, letterSizeCircle);
  }
  fill(0);
  text("f", faceUpPosX + keySpacing * 3, faceUpPosY); 
  
//KEY J
  if(keyJ){
  fill(255,255,0,keyOpacity);
  textSize(letterSizeBig);
  ellipse(faceUpPosX + (keySpacing * 4), faceUpPosY, letterSizeCircleBig);
  }
  else {
  fill(64,224,208,keyOpacity);
  textSize(letterSize);
  ellipse(faceUpPosX + (keySpacing * 4), faceUpPosY, letterSizeCircle);
  }
  fill(0);
  text("j", faceUpPosX + keySpacing * 4, faceUpPosY); 
    
//KEY K
  if(keyK){
  fill(255,255,0,keyOpacity);
  textSize(letterSizeBig);
  ellipse(faceUpPosX + (keySpacing * 5), faceUpPosY, letterSizeCircleBig);
  }
  else {
  fill(64,224,208,keyOpacity);
  textSize(letterSize);
  ellipse(faceUpPosX + (keySpacing * 5), faceUpPosY, letterSizeCircle);
  }
  fill(0);
  text("k", faceUpPosX + keySpacing * 5, faceUpPosY); 
  
//KEY L
  if(keyL){
  fill(255,255,0,keyOpacity);
  textSize(letterSizeBig);
  ellipse(faceUpPosX + (keySpacing * 6), faceUpPosY, letterSizeCircleBig);
  }
  else {
  fill(64,224,208,keyOpacity);
  textSize(letterSize);
  ellipse(faceUpPosX + (keySpacing * 6), faceUpPosY, letterSizeCircle);
  }
  fill(0);
  text("l", faceUpPosX + keySpacing * 6, faceUpPosY); 
  
//KEY ;
  if(keyDOT){
  fill(255,255,0,keyOpacity);
  textSize(letterSizeBig);
  ellipse(faceUpPosX + (keySpacing * 7), faceUpPosY, letterSizeCircleBig);
  }
  else {
  fill(64,224,208,keyOpacity);
  textSize(letterSize);
  ellipse(faceUpPosX + (keySpacing * 7), faceUpPosY, letterSizeCircle);
  }
  fill(0);
  text(";", faceUpPosX + keySpacing * 7, faceUpPosY); 
}


function drawKeyboard(){
  
  if(keyboardBool){
  image(keyboard, windowWidth/2 - 200, windowHeight/2 - 500, 500,300);
  image(keysInstruct, windowWidth/2 - 120, windowHeight/2 - 200);
  }
  
}


//function drawCatFace(){
 
//image(catFace, catX,400, catFaceSize,catFaceSize + (random(-50,50)));

//catX += catSpeedX;

//if(catX > canWidth - 300){
//  catSpeedX += random(-2,2);
//  catSpeedX = catSpeedX * -1;
//  catFaceSize += random (-100,100);
//}
//if(catX <= 0){
//  catSpeedX += random(-2,2);
//  catSpeedX *= -1;
//  catFaceSize += random (-100,100);
//}

//}

function drawTheFace(){
  
  if(drawFace){
    image(roanFaceUp, windowWidth/2 - 200, windowHeight/2 + random(1,6));
    image(roanFaceDown, windowWidth/2 - 200, windowHeight/2);
  }
}

//function detectMeowFace(){
  
//  if (catX > 50){
    
//  if (songBeat.isPlaying()) {
//    // .isPlaying() returns a boolean
//    meowSound.stop();
//  } else {
//    meowSound.play();
//  }
//  }
  
//}

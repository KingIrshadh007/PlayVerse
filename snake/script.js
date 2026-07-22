/* =====================================
   PLAYVERSE SNAKE GAME PRO
   PHASE 2 - GAME ENGINE
===================================== */


/* ================================
   CANVAS SETUP
================================ */


const canvas =
document.getElementById("gameCanvas");


const ctx =
canvas.getContext("2d");





/* ================================
   GAME VARIABLES
================================ */


let box = 25;


let canvasSize = 500;



let snake = [];



let direction = "RIGHT";



let nextDirection = "RIGHT";



let food = {};



let score = 0;



let highScore =
localStorage.getItem("snakeHighScore") || 0;



let level = 1;



let timer = 0;



let gameInterval;



let gameStarted = false;



let paused = false;



let gameSpeed = 120;



let difficulty = "medium";



let gamesPlayed =
localStorage.getItem("snakeGamesPlayed") || 0;







/* ================================
   DOM ELEMENTS
================================ */


const scoreText =
document.getElementById("score");


const highScoreText =
document.getElementById("highScore");


const levelText =
document.getElementById("level");


const timerText =
document.getElementById("timer");



const countdown =
document.getElementById("countdown");



const countdownNumber =
document.getElementById("countdownNumber");



const gameOverBox =
document.getElementById("gameOver");



const finalScore =
document.getElementById("finalScore");







/* ================================
   INITIAL LOAD
================================ */


highScoreText.innerHTML =
highScore;



function initializeGame(){


snake=[

{

x:250,

y:250

},

{

x:225,

y:250

},

{

x:200,

y:250

}

];



direction="RIGHT";


nextDirection="RIGHT";


score=0;


level=1;


timer=0;


scoreText.innerHTML=score;


levelText.innerHTML=level;


generateFood();


draw();


}





/* ================================
   CREATE FOOD
================================ */


function generateFood(){


food={


x:

Math.floor(

Math.random()*20

)*box,


y:

Math.floor(

Math.random()*20

)*box


};


}
/* =====================================
   DRAW GAME OBJECTS
===================================== */



function draw(){


    // Clear canvas

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    drawBackground();


    drawFood();


    drawSnake();


}







/* =====================================
   GAME BACKGROUND
===================================== */


function drawBackground(){


    ctx.fillStyle="#052e16";


    ctx.fillRect(

        0,
        0,
        canvas.width,
        canvas.height

    );



    // Grid effect


    ctx.strokeStyle="rgba(255,255,255,0.05)";


    ctx.lineWidth=1;



    for(let i=0;i<canvas.width;i+=box){


        ctx.beginPath();


        ctx.moveTo(i,0);


        ctx.lineTo(
            i,
            canvas.height
        );


        ctx.stroke();



        ctx.beginPath();


        ctx.moveTo(0,i);


        ctx.lineTo(
            canvas.width,
            i
        );


        ctx.stroke();

    }


}








/* =====================================
   DRAW SNAKE
===================================== */


function drawSnake(){


snake.forEach(

(segment,index)=>{


    let radius=10;



    ctx.beginPath();



    ctx.roundRect(

        segment.x,

        segment.y,

        box,

        box,

        radius

    );



    if(index===0){


        // Snake Head


        ctx.fillStyle="#22c55e";


    }

    else{


        // Snake Body


        ctx.fillStyle="#16a34a";


    }



    ctx.fill();



    ctx.closePath();



    // Snake eyes


    if(index===0){


        ctx.fillStyle="white";



        ctx.beginPath();


        ctx.arc(

            segment.x+8,

            segment.y+8,

            3,

            0,

            Math.PI*2

        );



        ctx.arc(

            segment.x+17,

            segment.y+8,

            3,

            0,

            Math.PI*2

        );



        ctx.fill();



    }



});


}








/* =====================================
   DRAW FOOD
===================================== */


function drawFood(){


    let centerX =
    food.x + box/2;


    let centerY =
    food.y + box/2;




    // Apple glow


    ctx.shadowBlur=20;


    ctx.shadowColor="#ef4444";



    ctx.fillStyle="#ef4444";



    ctx.beginPath();



    ctx.arc(

        centerX,

        centerY,

        10,

        0,

        Math.PI*2

    );



    ctx.fill();



    ctx.shadowBlur=0;





    // Apple leaf


    ctx.fillStyle="#22c55e";


    ctx.beginPath();



    ctx.ellipse(

        centerX+8,

        centerY-12,

        5,

        3,

        -.5,

        0,

        Math.PI*2

    );



    ctx.fill();



}

/* =====================================
   SNAKE MOVEMENT ENGINE
===================================== */



function moveSnake(){


    direction = nextDirection;



    let head = {

        x: snake[0].x,

        y: snake[0].y

    };




    if(direction==="UP"){

        head.y -= box;

    }


    if(direction==="DOWN"){

        head.y += box;

    }


    if(direction==="LEFT"){

        head.x -= box;

    }


    if(direction==="RIGHT"){

        head.x += box;

    }






    snake.unshift(head);





    // Eat food


    if(

        head.x === food.x &&

        head.y === food.y

    ){


        score++;


       playSound(eatSound);


        updateScore();



        generateFood();



        increaseLevel();



    }

    else{


        snake.pop();


    }







    checkCollision();


}





/* =====================================
   KEYBOARD CONTROLS
===================================== */


document.addEventListener(

"keydown",

function(event){



let key = event.key;



if(

key==="ArrowUp" ||

key==="w" ||

key==="W"

){



if(direction!=="DOWN"){


nextDirection="UP";


}



}




else if(

key==="ArrowDown" ||

key==="s" ||

key==="S"

){



if(direction!=="UP"){


nextDirection="DOWN";


}



}




else if(

key==="ArrowLeft" ||

key==="a" ||

key==="A"

){



if(direction!=="RIGHT"){


nextDirection="LEFT";


}



}




else if(

key==="ArrowRight" ||

key==="d" ||

key==="D"

){



if(direction!=="LEFT"){


nextDirection="RIGHT";


}



}



});







/* =====================================
   SCORE UPDATE
===================================== */


function updateScore(){


scoreText.innerHTML =
score;



if(score > highScore){


highScore = score;



localStorage.setItem(

"snakeHighScore",

highScore

);



highScoreText.innerHTML =
highScore;


}



}







/* =====================================
   LEVEL SYSTEM
===================================== */


function increaseLevel(){



if(score % 5 === 0){



level++;



levelText.innerHTML =
level;



}



}







/* =====================================
   COLLISION CHECK
===================================== */


function checkCollision(){



let head = snake[0];



/* Wall Collision */


if(

head.x < 0 ||

head.y < 0 ||

head.x >= canvas.width ||

head.y >= canvas.height

){



endGame();


}






/* Self Collision */


for(

let i=1;

i<snake.length;

i++

){


if(

head.x===snake[i].x &&

head.y===snake[i].y

){


endGame();


}



}



}

/* =====================================
   GAME CONTROL SYSTEM
===================================== */



const startBtn =
document.getElementById("startBtn");


const pauseBtn =
document.getElementById("pauseBtn");


const resetBtn =
document.getElementById("resetBtn");


const resumeBtn =
document.getElementById("resumeBtn");






/* =====================================
   START BUTTON
===================================== */


startBtn.onclick=function(){


if(!gameStarted){


    startCountdown();


}


};







/* =====================================
   3-2-1 COUNTDOWN
===================================== */


function startCountdown(){



let count = 3;



countdown.classList.remove("hidden");



countdownNumber.innerHTML =
count;





let countdownTimer = setInterval(function(){



count--;



if(count > 0){


countdownNumber.innerHTML =
count;



}

else{


clearInterval(countdownTimer);



countdown.classList.add("hidden");



startGame();



}



},1000);



}








/* =====================================
   START GAME
===================================== */


function startGame(){



initializeGame();



gameStarted=true;



gamesPlayed++;



localStorage.setItem(

"snakeGamesPlayed",

gamesPlayed

);



startTimer();



gameInterval = setInterval(

function(){



moveSnake();


draw();



},

gameSpeed



);



}







/* =====================================
   TIMER
===================================== */


function startTimer(){



setInterval(function(){



if(gameStarted && !paused){



timer++;



let minutes =
Math.floor(timer/60);



let seconds =
timer%60;



timerText.innerHTML =


String(minutes).padStart(2,"0")

+

":"

+

String(seconds).padStart(2,"0");



}



},1000);



}







/* =====================================
   PAUSE GAME
===================================== */


pauseBtn.onclick=function(){



if(gameStarted){


paused=true;



clearInterval(gameInterval);



document

.getElementById("pauseScreen")

.classList

.remove("hidden");



}



};







/* =====================================
   RESUME GAME
===================================== */


resumeBtn.onclick=function(){



paused=false;



document

.getElementById("pauseScreen")

.classList

.add("hidden");




gameInterval=setInterval(


function(){



moveSnake();


draw();



},

gameSpeed


);



};








/* =====================================
   RESET GAME
===================================== */


resetBtn.onclick=function(){



clearInterval(gameInterval);



gameStarted=false;



gameOverBox

.classList

.add("hidden");



initializeGame();



};

/* =====================================
   DIFFICULTY SYSTEM
===================================== */


const difficultySelect =
document.getElementById("difficulty");



difficultySelect.onchange=function(){


difficulty=this.value;



if(difficulty==="easy"){


gameSpeed=180;


}



else if(difficulty==="medium"){


gameSpeed=120;


}



else if(difficulty==="hard"){


gameSpeed=80;


}



};








/* =====================================
   MOBILE BUTTON CONTROLS
===================================== */


const upBtn =
document.getElementById("upBtn");


const downBtn =
document.getElementById("downBtn");


const leftBtn =
document.getElementById("leftBtn");


const rightBtn =
document.getElementById("rightBtn");





upBtn.onclick=function(){


if(direction!=="DOWN"){


nextDirection="UP";


}


};





downBtn.onclick=function(){


if(direction!=="UP"){


nextDirection="DOWN";


}


};





leftBtn.onclick=function(){


if(direction!=="RIGHT"){


nextDirection="LEFT";


}


};





rightBtn.onclick=function(){


if(direction!=="LEFT"){


nextDirection="RIGHT";


}


};








/* =====================================
   SWIPE CONTROLS
===================================== */


let touchStartX=0;

let touchStartY=0;




canvas.addEventListener(

"touchstart",

function(event){



touchStartX =
event.changedTouches[0].screenX;



touchStartY =
event.changedTouches[0].screenY;



});







canvas.addEventListener(

"touchend",

function(event){



let touchEndX =
event.changedTouches[0].screenX;



let touchEndY =
event.changedTouches[0].screenY;





let xDifference =
touchEndX-touchStartX;



let yDifference =
touchEndY-touchStartY;






if(Math.abs(xDifference) >

Math.abs(yDifference)){



if(xDifference>0){



if(direction!=="LEFT")

nextDirection="RIGHT";


}



else{


if(direction!=="RIGHT")

nextDirection="LEFT";


}


}






else{



if(yDifference>0){



if(direction!=="UP")

nextDirection="DOWN";


}



else{


if(direction!=="DOWN")

nextDirection="UP";


}



}



});









/* =====================================
   FULLSCREEN MODE
===================================== */


const fullscreenBtn =
document.getElementById("fullscreenBtn");





fullscreenBtn.onclick=function(){



let element =
document.documentElement;



if(!document.fullscreenElement){



element.requestFullscreen();



fullscreenBtn.innerHTML=
"❌ Exit Fullscreen";



}



else{



document.exitFullscreen();



fullscreenBtn.innerHTML=
"⛶ Fullscreen";


}



};

/* =====================================
   AUDIO SYSTEM
===================================== */


const backgroundMusic =
document.getElementById("backgroundMusic");


const eatSound =
document.getElementById("eatSound");


const gameOverSound =
document.getElementById("gameOverSound");



let musicEnabled = true;


let soundEnabled = true;








/* =====================================
   MUSIC BUTTON
===================================== */


const musicBtn =
document.getElementById("musicBtn");




musicBtn.onclick=function(){



musicEnabled = !musicEnabled;



if(musicEnabled){


backgroundMusic.play();


musicBtn.innerHTML =
"🎵 Music";


}



else{


backgroundMusic.pause();


musicBtn.innerHTML =
"🔇 Muted";


}



};








/* =====================================
   SETTINGS BUTTON
===================================== */


const settingsBtn =
document.getElementById("settingsBtn");



const settingsPanel =
document.getElementById("settingsPanel");



const closeSettings =
document.getElementById("closeSettings");





settingsBtn.onclick=function(){


settingsPanel

.classList

.remove("hidden");


};






closeSettings.onclick=function(){


settingsPanel

.classList

.add("hidden");


};








/* =====================================
   SOUND TOGGLE
===================================== */


const soundToggle =
document.getElementById("soundToggle");



const musicToggle =
document.getElementById("musicToggle");





soundToggle.onchange=function(){



soundEnabled=this.checked;



};






musicToggle.onchange=function(){



musicEnabled=this.checked;



if(musicEnabled){


backgroundMusic.play();


}

else{


backgroundMusic.pause();


}



};








/* =====================================
   PLAY SOUND FUNCTION
===================================== */


function playSound(sound){



if(soundEnabled){



sound.currentTime=0;


sound.play();



}



}







/* =====================================
   THEME SYSTEM
===================================== */


const themeSelect =
document.getElementById("themeSelect");





themeSelect.onchange=function(){



let selectedTheme =
this.value;



if(selectedTheme==="forest"){



document.body.style.background =

"linear-gradient(135deg,#020617,#064e3b)";


}



else if(selectedTheme==="neon"){



document.body.style.background =

"linear-gradient(135deg,#020617,#581c87)";


}



else if(selectedTheme==="classic"){



document.body.style.background =

"linear-gradient(135deg,#052e16,#14532d)";


}



};


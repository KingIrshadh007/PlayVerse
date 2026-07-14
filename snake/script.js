/* =====================================
   PLAYVERSE - SNAKE GAME ENGINE
===================================== */


const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");


const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");

const finalScore = document.getElementById("finalScore");

const gameOverBox = document.getElementById("gameOver");


const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const restartBtn = document.getElementById("restartBtn");

const difficulty = document.getElementById("difficulty");



let box = 20;

let snake;

let food;

let direction;

let score = 0;

let highScore =
localStorage.getItem("snakeHighScore") || 0;


let gameInterval;

let gameRunning = false;

let paused = false;



highScoreText.innerHTML = highScore;



/* ==========================
   START GAME
========================== */


function startGame(){


if(gameRunning)
return;



snake=[

{
x:200,
y:200
}

];



direction="RIGHT";


score=0;


scoreText.innerHTML=score;


food=createFood();



gameRunning=true;

paused=false;


gameOverBox.style.display="none";



gameInterval=setInterval(

drawGame,

difficulty.value

);


}





/* ==========================
   DRAW GAME
========================== */


function drawGame(){


if(paused)
return;



ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



drawFood();

drawSnake();



moveSnake();



checkCollision();


}




/* ==========================
   DRAW SNAKE
========================== */


function drawSnake(){


snake.forEach((part,index)=>{


ctx.fillStyle =
index===0
?
"#22d3ee"
:
"#38bdf8";



ctx.fillRect(

part.x,
part.y,
box,
box

);



ctx.strokeStyle="#020617";

ctx.strokeRect(

part.x,
part.y,
box,
box

);



});

}




/* ==========================
   DRAW FOOD
========================== */


function drawFood(){


ctx.fillStyle="#ef4444";


ctx.beginPath();


ctx.arc(

food.x+10,
food.y+10,
10,
0,
Math.PI*2

);


ctx.fill();


}





/* ==========================
   MOVE SNAKE
========================== */


function moveSnake(){


let head={

x:snake[0].x,
y:snake[0].y

};



if(direction==="UP")
head.y-=box;


if(direction==="DOWN")
head.y+=box;


if(direction==="LEFT")
head.x-=box;


if(direction==="RIGHT")
head.x+=box;



snake.unshift(head);



if(

head.x===food.x &&
head.y===food.y

){


score++;


scoreText.innerHTML=score;


food=createFood();



if(score>highScore){


highScore=score;


localStorage.setItem(
"snakeHighScore",
highScore
);


highScoreText.innerHTML=highScore;


}



}

else{


snake.pop();


}



}




/* ==========================
   CREATE FOOD
========================== */


function createFood(){


return {


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




/* ==========================
   COLLISION
========================== */


function checkCollision(){



let head=snake[0];



if(

head.x<0 ||
head.y<0 ||
head.x>=canvas.width ||
head.y>=canvas.height

){


endGame();


}




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





/* ==========================
   GAME OVER
========================== */


function endGame(){


clearInterval(gameInterval);



gameRunning=false;


finalScore.innerHTML=score;


gameOverBox.style.display="block";


}





/* ==========================
   CONTROLS
========================== */


document.addEventListener(
"keydown",
function(event){


if(event.key==="ArrowUp"
&& direction!=="DOWN")

direction="UP";



if(event.key==="ArrowDown"
&& direction!=="UP")

direction="DOWN";



if(event.key==="ArrowLeft"
&& direction!=="RIGHT")

direction="LEFT";



if(event.key==="ArrowRight"
&& direction!=="LEFT")

direction="RIGHT";


});






/* MOBILE CONTROLS */


function changeDirection(dir){


if(dir==="UP" && direction!=="DOWN")
direction="UP";


if(dir==="DOWN" && direction!=="UP")
direction="DOWN";


if(dir==="LEFT" && direction!=="RIGHT")
direction="LEFT";


if(dir==="RIGHT" && direction!=="LEFT")
direction="RIGHT";


}






/* ==========================
   PAUSE
========================== */


pauseBtn.onclick=function(){


paused=!paused;


pauseBtn.innerHTML = paused
?
"Resume"
:
"Pause";


};






/* ==========================
   RESTART
========================== */


function restartGame(){


clearInterval(gameInterval);


gameRunning=false;


startGame();


}




startBtn.onclick=startGame;


restartBtn.onclick=restartGame;

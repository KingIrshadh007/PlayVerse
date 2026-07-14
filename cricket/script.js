/* =====================================
   PLAYVERSE - CRICKET GAME ENGINE
===================================== */


const runsDisplay =
document.getElementById("runs");

const ballsDisplay =
document.getElementById("balls");

const wicketsDisplay =
document.getElementById("wickets");


const message =
document.getElementById("message");


const batButton =
document.getElementById("batButton");



let runs = 0;

let balls = 0;

let wickets = 0;

let maxBalls = 6;



let gameOver = false;




/* ============================
   HIT BALL FUNCTION
============================ */


batButton.addEventListener(
"click",
()=>{


if(gameOver)
return;



playShot();



});






function playShot(){



balls++;



ballsDisplay.innerHTML =
balls;



let result =
Math.floor(
Math.random()*7
);



/*
0 = wicket
1-3 = runs
4 = boundary
5 = six
6 = six
*/



if(result===0){


wickets++;


wicketsDisplay.innerHTML =
wickets;


message.innerHTML =
"💀 OUT! Bowled!";



}

else{


let scored=result;


runs += scored;


runsDisplay.innerHTML =
runs;



if(scored===6){


message.innerHTML =
"🔥 SIX! Amazing shot!";


}


else if(scored===4){


message.innerHTML =
"🏏 FOUR! Great boundary!";


}


else{


message.innerHTML =
"Run scored: "+scored;


}


}




checkOver();



}







/* ============================
   CHECK OVER
============================ */


function checkOver(){



if(balls>=maxBalls){



gameOver=true;



message.innerHTML =

`
🏆 Over Finished!

Final Score:
${runs}/${wickets}

`;



saveHighScore();


}

}






/* ============================
   HIGH SCORE
============================ */


function saveHighScore(){


let oldScore =
localStorage.getItem(
"cricketHighScore"
)
||0;



if(runs>oldScore){


localStorage.setItem(
"cricketHighScore",
runs
);


message.innerHTML +=

"<br>🎉 New High Score!";


}



}





/* ============================
   RESET GAME
============================ */


function restartGame(){


runs=0;

balls=0;

wickets=0;


runsDisplay.innerHTML=0;

ballsDisplay.innerHTML=0;

wicketsDisplay.innerHTML=0;


gameOver=false;


message.innerHTML =
"New innings started!";


}




/* DOUBLE CLICK TO RESTART */


batButton.addEventListener(
"dblclick",
()=>{


restartGame();


});

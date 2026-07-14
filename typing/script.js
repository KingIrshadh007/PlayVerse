/* =====================================
   PLAYVERSE - TYPING SPEED TEST ENGINE
===================================== */


const textDisplay = document.getElementById("textDisplay");

const typingArea = document.getElementById("typingArea");

const startBtn = document.getElementById("startBtn");

const resetBtn = document.getElementById("resetBtn");


const timeDisplay = document.getElementById("time");

const wpmDisplay = document.getElementById("wpm");

const accuracyDisplay = document.getElementById("accuracy");


const resultBox = document.getElementById("result");



/* SAMPLE TEXT DATABASE */


const sentences = [

"Software testing helps improve the quality of applications by finding defects before release.",

"Practice makes perfect. Improve your typing speed every day with consistent training.",

"Technology is changing the world and developers create amazing digital experiences.",

"Quality assurance engineers ensure software products work correctly and efficiently.",

"Learning new skills every day helps you grow professionally and personally."

];



let currentText="";

let timeLeft=60;

let timer=null;

let started=false;

let typedCharacters=0;

let correctCharacters=0;



/* ================================
   START TEST
================================ */


startBtn.addEventListener(
"click",
()=>{


resetValues();


currentText =
sentences[
Math.floor(
Math.random()*sentences.length
)
];


textDisplay.innerHTML=currentText;


typingArea.disabled=false;


typingArea.focus();


started=true;


timer=setInterval(
updateTimer,
1000
);


}
);






/* ================================
   TIMER
================================ */


function updateTimer(){


timeLeft--;


timeDisplay.innerHTML=timeLeft;



if(timeLeft<=0){


finishTest();


}


}






/* ================================
   TYPING CHECK
================================ */


typingArea.addEventListener(
"input",
()=>{


if(!started)
return;



let typedText =
typingArea.value;



typedCharacters =
typedText.length;


correctCharacters=0;



for(
let i=0;
i<typedText.length;
i++
){


if(
typedText[i]===currentText[i]
){

correctCharacters++;

}


}



calculateStats();



}

);







/* ================================
   CALCULATE RESULTS
================================ */


function calculateStats(){



let minutes =
(60-timeLeft)/60;



if(minutes===0)
return;



let words =
typedCharacters/5;



let wpm =
Math.round(
words/minutes
);



let accuracy =
Math.round(
(correctCharacters/typedCharacters)*100
)
||0;



wpmDisplay.innerHTML =
wpm;



accuracyDisplay.innerHTML =
accuracy+"%";



}








/* ================================
   FINISH TEST
================================ */


function finishTest(){


clearInterval(timer);


typingArea.disabled=true;


started=false;



calculateStats();



resultBox.innerHTML=

`
<h2>🎉 Test Completed</h2>

<p>
Your Speed:
${wpmDisplay.innerHTML}
WPM
</p>

<p>
Accuracy:
${accuracyDisplay.innerHTML}
</p>

`;



}







/* ================================
   RESET
================================ */


function resetValues(){


clearInterval(timer);



timeLeft=60;


timeDisplay.innerHTML=60;


wpmDisplay.innerHTML=0;


accuracyDisplay.innerHTML="100%";


typingArea.value="";


resultBox.innerHTML="";


}






resetBtn.addEventListener(
"click",
()=>{


resetValues();


typingArea.disabled=true;


textDisplay.innerHTML=

"Click Start and begin typing...";


}
);

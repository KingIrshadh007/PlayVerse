/* =====================================
   PLAYVERSE - DAILY QUIZ GAME ENGINE
===================================== */


const questions = [

{
question:
"What does HTML stand for?",

options:[
"Hyper Text Markup Language",
"High Text Machine Language",
"Hyper Transfer Mark Language",
"Home Tool Markup Language"
],

answer:0

},


{
question:
"Which language is used for styling websites?",

options:[
"HTML",
"CSS",
"Python",
"SQL"
],

answer:1

},


{
question:
"Which company created Android?",

options:[
"Microsoft",
"Apple",
"Google",
"Amazon"
],

answer:2

},


{
question:
"What is the capital of India?",

options:[
"Chennai",
"Mumbai",
"New Delhi",
"Kolkata"
],

answer:2

},


{
question:
"Which sport uses a bat and ball?",

options:[
"Football",
"Cricket",
"Tennis",
"Hockey"
],

answer:1

}

];





let currentQuestion = 0;

let score = 0;

let highScore =
localStorage.getItem("quizHighScore") || 0;



const questionText =
document.getElementById("question");


const optionButtons =
document.querySelectorAll(".option");


const questionNumber =
document.getElementById("questionNumber");


const totalQuestions =
document.getElementById("totalQuestions");


const scoreText =
document.getElementById("score");


const nextButton =
document.getElementById("nextBtn");


const resultBox =
document.getElementById("result");


const restartButton =
document.getElementById("restartBtn");





totalQuestions.innerHTML =
questions.length;




/* ==========================
   LOAD QUESTION
========================== */


function loadQuestion(){


let q =
questions[currentQuestion];



questionText.innerHTML =
q.question;



questionNumber.innerHTML =
currentQuestion+1;



optionButtons.forEach(
(button,index)=>{


button.innerHTML =
q.options[index];


button.classList.remove(
"correct",
"wrong"
);



button.disabled=false;



button.onclick=function(){

checkAnswer(index);

};



});



}





/* ==========================
   CHECK ANSWER
========================== */


function checkAnswer(selected){


let correct =
questions[currentQuestion].answer;



optionButtons.forEach(
(button,index)=>{


button.disabled=true;



if(index===correct){

button.classList.add(
"correct"
);

}


if(index===selected &&
selected!==correct){


button.classList.add(
"wrong"
);


}


});




if(selected===correct){


score++;


scoreText.innerHTML =
score;


}



}





/* ==========================
   NEXT QUESTION
========================== */


nextButton.onclick=function(){



currentQuestion++;



if(currentQuestion < questions.length){


loadQuestion();


}

else{


finishQuiz();


}



};







/* ==========================
   FINISH QUIZ
========================== */


function finishQuiz(){



questionText.innerHTML =
"🎉 Quiz Completed!";


document
.getElementById("options")
.style.display="none";



nextButton.style.display="none";



resultBox.innerHTML=

`
Your Score:
${score}/${questions.length}

<br><br>

Best Score:
${Math.max(score,highScore)}

`;



if(score>highScore){


localStorage.setItem(
"quizHighScore",
score
);


}



restartButton.style.display="inline-block";



}







/* ==========================
   RESTART QUIZ
========================== */


restartButton.onclick=function(){



currentQuestion=0;


score=0;


scoreText.innerHTML=0;



document
.getElementById("options")
.style.display="grid";



nextButton.style.display="inline-block";



restartButton.style.display="none";



resultBox.innerHTML="";



loadQuestion();



};







// START GAME

loadQuestion();

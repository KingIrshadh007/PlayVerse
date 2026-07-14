/* =====================================
   PLAYVERSE - PROFILE SYSTEM ENGINE
===================================== */



const playerName =
document.getElementById("playerName");


const changeName =
document.getElementById("changeName");


const gamesPlayed =
document.getElementById("gamesPlayed");


const bestScore =
document.getElementById("bestScore");


const streak =
document.getElementById("streak");





/* ==========================
   LOAD PLAYER DATA
========================== */


let username =
localStorage.getItem("playVerseName")
|| "Player";



let played =
localStorage.getItem("gamesPlayed")
|| 0;



let score =
localStorage.getItem("bestScore")
|| 0;



let loginStreak =
localStorage.getItem("loginStreak")
|| 1;



playerName.innerHTML =
username;


gamesPlayed.innerHTML =
played;


bestScore.innerHTML =
score;


streak.innerHTML =
loginStreak;








/* ==========================
   CHANGE PLAYER NAME
========================== */


changeName.onclick=function(){



let newName =
prompt(
"Enter your gamer name:",
username
);



if(newName){


username=newName;



localStorage.setItem(
"playVerseName",
username
);



playerName.innerHTML =
username;


}


};







/* ==========================
   DAILY LOGIN STREAK
========================== */


let today =
new Date()
.toDateString();



let lastLogin =
localStorage.getItem(
"lastLogin"
);



if(lastLogin !== today){



loginStreak++;



localStorage.setItem(
"loginStreak",
loginStreak
);



localStorage.setItem(
"lastLogin",
today
);



streak.innerHTML =
loginStreak;



}







/* ==========================
   ACHIEVEMENT SYSTEM
========================== */


const badges =
document.querySelectorAll(".badge");



if(played>=5){


badges[0].innerHTML=
"🥉 Beginner Unlocked";


}



if(played>=20){


badges[1].innerHTML=
"🔥 Active Player";


}



if(score>=100){


badges[2].innerHTML=
"🏆 Champion";


}

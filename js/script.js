/* ==================================
   PLAYVERSE MAIN JAVASCRIPT
================================== */


/* ================================
   DARK / LIGHT MODE
================================ */


const themeButton = document.getElementById("themeToggle");

let darkMode = true;


themeButton.addEventListener("click", function(){


    darkMode = !darkMode;


    if(darkMode){


        document.body.style.background = "#050816";

        document.body.style.color = "white";

        themeButton.innerHTML = "🌙";


    }

    else{


        document.body.style.background = "#f8fafc";

        document.body.style.color = "#111827";

        themeButton.innerHTML = "☀️";


    }


});





/* ================================
   START PLAYING BUTTON
================================ */


const playButton = document.querySelector(".play-btn");


playButton.addEventListener("click",function(){


    document
    .getElementById("games")
    .scrollIntoView({

        behavior:"smooth"

    });


});






/* ================================
   GAME CARD ANIMATION
================================ */


const cards = document.querySelectorAll(".game-card");


cards.forEach(card=>{


    card.addEventListener("mouseenter",()=>{


        card.style.cursor="pointer";


    });



});







/* ================================
   BUTTON CLICK EFFECT
================================ */


const buttons=document.querySelectorAll("button");


buttons.forEach(btn=>{


btn.addEventListener("click",()=>{


    btn.style.transform="scale(.95)";


    setTimeout(()=>{


        btn.style.transform="scale(1)";


    },100);


});


});






/* ================================
   WELCOME MESSAGE
================================ */


window.addEventListener("load",()=>{


console.log(
"🎮 Welcome to PlayVerse Gaming Platform"
);


});






/* ================================
   FUTURE GAME LOADER
================================ */


function openGame(gameName){


console.log(
"Opening Game:",
gameName
);


}


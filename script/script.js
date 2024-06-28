const wordList = [
    {
      "word": "guitar",
      "hint": "A musical instrument with strings"
    },
    {
      "word": "astronomy",
      "hint": "The study of celestial objects and the universe"
    },
    {
      "word": "python",
      "hint": "A popular programming language"
    },
    {
      "word": "pizza",
      "hint": "A popular Italian dish with cheese and toppings"
    },
    {
      "word": "kangaroo",
      "hint": "A marsupial native to Australia"
    },
    {
      "word": "hologram",
      "hint": "A three-dimensional image created with light"
    },
    {
      "word": "robot",
      "hint": "A machine capable of carrying out complex actions automatically"
    },
    {
      "word": "apple",
      "hint": "A fruit that can be red or green"
    },  
    {
      "word": "puzzle",
      "hint": "Something you solve for fun"
    },
    {
      "word": "galaxy",
      "hint": "A massive system of stars in space"
    }
];

const initGame = (button,clickedLetter)=>{
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter,index)=>{
            if(letter===clickedLetter){
                correctletters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText=letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }
    else{
        wrongGuessCount++;
        hangmanImage.src=`hangman-${wrongGuessCount}.svg`
    }
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctletters.length === currentWord.length) return gameOver(true);
    button.disabled=true;
    guessesText.innerText=`${wrongGuessCount} /${maxGuesses}`;
};
const audio=new Audio("MemoryReboot.mp3");
let currentWord, correctletters = [],wrongGuessCount=0;
const retry=document.querySelector(".play-again");
const wordDisplay=document.querySelector(".word-display");
const keyboardDiv=document.querySelector(".keyboard");
const maxGuesses=6;
const guessesText=document.querySelector(".guesses-text b");
const hangmanImage=document.querySelector(".hangman-box img");
const gameModal=document.querySelector(".game-modal");
const gameOver=(isVictory)=>{
    setTimeout(()=>{
        gameModal.classList.add("show");
        const modaltext =isVictory ? `Word Founded` : `Correct word is :`;
        gameModal.querySelector("img").src=`${isVictory ? 'dancing' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText=`${isVictory ? 'Winner !' : 'Game Over'}`;
        gameModal.querySelector("p").innerHTML=`${modaltext} <b>${currentWord}</b>`
    },300);
}
const reset=()=>{
    correctletters=[];
    wrongGuessCount=0;
    keyboardDiv.querySelectorAll("button").forEach(btn=>btn.disabled=false);
    guessesText.innerText=`${wrongGuessCount} /${maxGuesses}`;
    hangmanImage.src=`hangman-${wrongGuessCount}.svg`
    gameModal.classList.remove("show");
    wordDisplay.innerHTML=currentWord.split("").map(()=>`<li class="letter"></li>`).join("");
}
const getRandomWord =() => {
    const{word,hint}=wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word);
    document.querySelector(".hint-text b").innerText=hint;
    currentWord=word;
    reset();
}


for (let i = 97; i < 123; i++) {
    const button=document.createElement("button");
    button.innerText=String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click",e=>initGame(e.target,String.fromCharCode(i)))
}

getRandomWord();
retry.addEventListener("click",getRandomWord);
// audio.play();
audio.play();

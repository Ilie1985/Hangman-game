// GRAB THE DOM ELEMENTS THAT WE NEED
const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);
const figureParts = document.querySelectorAll(".figure-part");

const words = [
  "temperament",
  "electrocardiograma",
  "sternocleidomastoidian",
  "transplant",
  "pupaza",
  "autoinsamantare",
  "stupefiant",
  "pisiform",
  "dermatovenerologie",
  "pneumatic",
  "elocvent",
  "barbat",
  "metalurgie",
  "crap",
  "fitofag",
  "talpa",
  "imagine",
  "numaratoare",
  "bazin",
  "latifundiar",
  "cinematografie",
  "feromicroazotombohidric",
  "ceapa",
  "spinare",
  "electroglotospectrografie",
  "gaina",
  "automobil",
  "homosapiens",
  "saliva",
  "pleonasm",
  "curatat",
  "catedrala",
  "coasta",
  "fildes",
];

//Get a random word
let selectedWord = words[Math.floor(Math.random() * words.length)];
console.log((selectedWord ));

//Store the correct letters
const correctLetters = ["c", "e", "a", "p", "a"];

//Store the wrong letters
const wrongLetters = [];
//==================================================================================

//DISPLAY THE HIDDEN WORD FUNCTIONALITY
//selectedWord needs to be turned into an array
//to turn the string into an array i use the split method
//we take a string from words (i.e coasta) and every letter is going to be an itme in the array
//now since its an array we can map through it
//for each letter we`re going to return an element (i.e span)
//inside the span we want correctLetters,every correct letter that we add will be in this array
//to check if the letter is already in the array i use the .includes method
//if it is im going to use a ternary operation and show the letter
//if its not included its going to be an empty string
//in order to complete it ,turn it back into a string with the join() method
//at this stage if i pass letters that can be found in the word,inside correctLetters array and console.log wordEl.innerText i nottice that the letters are on top of each other because of the new line character and i have to remove that
//to remove neew line character create a new variable (innerWord)
//set it to WordEl.innerText
//use replace with a regular expression like bellow
//replace the new line character globaly ,thats what the g in the /\n/g stands for, with an empty string
// use if method to see if i won or not
//diplay popup and style it to be flex
const displayWord = () => {
  wordEl.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) => `<span class ="letter">
  ${correctLetters.includes(letter) ? letter : ""}

  </span>`
    )
    .join("")}`;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    popup.style.display = "flex";
  }
};
displayWord();

//==============================================================================

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
console.log(selectedWord);

//Store the correct letters
const correctLetters = [];

//Store the wrong letters
const wrongLetters = [];
//==================================================================================

//displayWord FUNCTIONALITY
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

//updateTheWrongLetterEl FUNCTIONALITY

//get the wrongLettersEl from the DOM and add to the innerHTML
//check if the length of the array worngLetters is greater than 0
//use ternary operator and if there is something in the array put a paragraph that says wrong
//if its empty give back an empty string
//store the letters in the wrongaletters array and map through
//for each letter output a span with the letter
//loop through figureParts with forEach
//set part and index param
//see how many missed letters(errors) i have with wrongLetters.length
//each part has in index starting at 0
//if index is less than errors  take part and style it do be displayed block (by default is display none)
//else, part is styled to be displayed none
// the game is lost if the number of wrongLetters.length === figureParts.length
// set the innerText of the finalMessage
//display the popup and style it to be flex
const updateWrongLettersEl = () => {
  //Display wrong letters
  wrongLettersEl.innerHTML = ` ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
     ${wrongLetters.map((letter) => `<span>${letter}</span>`)} `;

  //Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //Check if game is lost

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    popup.style.display = "flex";
  }
};
//========================================================================

// showNotification FUNCTIONALITY

//add the show class to notification element
//set it to dissapear automatically after 2sec
//remove the show class
const showNotification = () => {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
};
//=====================================================================

//ADD EVENT LISTENERS

//Key down letter press
//use window object which is the very top level object in the DOM
//only listen for letters ,if i press numbers or something else besides letters the event will not fire
//use the keycode property that is inside the event parameter object
//the range of letters form a to z is 65 to 90
//first if only works if we press a letter on the keyboard
//save the letter into a variable (letter)
//push the letter on the correctLetter array but only if its not included already
//update the wordEl element to show the new letter by invoking the displayWord function
//if the letter is already inside correctLetter than invoke showNotification function
//if the letter is not included in selectedWord push letter to the wrongLetters array
//make sure it is not already on the wrongLetters array with if statement
//invoke the function updateWrongLetterEl to be displayed in the wrongLettersElement
// keyCode is deprecated ,could not find an alternative for it for now

window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// Restart game and play again
//Empty the correctLetters and wrongLetters arrays
//splice to 0
//get a new random word from the array words
//call displayWord()
//cleanup the wrong letters and hide the parts (the figurine) by calling updateWrongLettersEl
//hide the popup
playAgainBtn.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = "none";
});
//=====================================================================================

//Setting Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Game Created By Ghaith`;

// Setting Game Options
let numberOftries = 5;
let currentTry = 1;
let numberOfHints = 2;
// Manage Words



let wordToGuess = "";
const words = [
  { word: "Create", question: "to make something from nothing" },
  { word: "Update", question: "to modify or change existing information" },
  { word: "Delete", question: "to remove or erase something" },
  { word: "Master", question: "to become highly skilled at something" },
  { word: "Branch", question: "a part that extends from the main body" },
  { word: "Mainly", question: "for the most part; chiefly" },
  { word: "School", question: "an institution for education" },
  { word: "Learn", question: "to gain knowledge or skill" },
  { word: "Code", question: "instructions for a computer program" },
  { word: "Skill", question: "ability to do something well" },
  { word: "Write", question: "to form letters or words on a surface" },
  { word: "Think", question: "to use the mind to reason or reflect" },
  { word: "Build", question: "to construct or create something" },
  { word: "Solve", question: "to find a solution to a problem" },
  { word: "Debug", question: "to find and fix errors in code" },
  { word: "Design", question: "to plan and create something" },
  { word: "Focus", question: "to concentrate attention on something" },
  { word: "Share", question: "to use or enjoy something jointly" },
  { word: "Study", question: "to learn about a subject in detail" },
  { word: "Teach", question: "to help someone learn something" },
  { word: "Guide", question: "to show the way or direct" },
  { word: "Smart", question: "having or showing intelligence" },
  { word: "Quick", question: "moving or doing things fast" },
  { word: "Logic", question: "reasoning conducted according to strict principles" },
  { word: "Adapt", question: "to adjust to new conditions" },
  { word: "Begin", question: "to start or commence something" },
  { word: "Clear", question: "easy to understand or see through" },
  { word: "Dream", question: "to imagine or visualize something" },
  { word: "Equal", question: "identical in size, quantity, or value" },
  { word: "Fixed", question: "fastened, attached, or placed firmly" },
  { word: "Happy", question: "feeling or showing pleasure" },
  { word: "Ideas", question: "thoughts or suggestions" },
  { word: "Judge", question: "to form an opinion about something" },
  { word: "Known", question: "recognized or familiar" },
  { word: "Light", question: "natural agent that stimulates sight" },
  { word: "Model", question: "a representation of something" },
  { word: "Novel", question: "new and original" },
  { word: "Order", question: "arrange systematically" },
  { word: "Peace", question: "freedom from disturbance" },
  { word: "Query", question: "a question or inquiry" }
];
let wordObj = words[Math.floor(Math.random() * words.length)];
wordToGuess = wordObj.word.toLowerCase();

wordToGuessquestion = wordObj.question;
let messageArea = document.querySelector(".message");

// Manage Hints
document.querySelector(".hint").innerHTML = `You have ${numberOfHints} hints left`;///////////////////////////////
const HintButton = document.querySelector(".hint");/////////////////////////////
let numberOfletters = wordToGuess.length;
HintButton.addEventListener("click", getHint); ///////////////////////////////////////


function generateInput(numberOfletters) {
  const inputcontainer = document.querySelector(".inputs");
  // Create Main Tr
  for (let i = 1; i <= numberOftries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}<span>`;

    if (i != 1) tryDiv.classList.add("disabled-inputs");

    // Create Inputs
    for (let j = 1; j <= numberOfletters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }

    inputcontainer.appendChild(tryDiv);
  }
  // Focus On First Input In First Try Element
  inputcontainer.children[0].children[1].focus();

  //Disable All Inputs Except First One
  const inputsInDisabledDiv = document.querySelectorAll(
    ".disabled-inputs input"
  );
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    // Convert input to uppercase
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target); // this
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput < inputs.length && prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}

const guessButton = document.querySelector(".check");

guessButton.addEventListener("click", handleGuesses);

console.log(wordToGuess);
let question = document.querySelector(".question");
question.innerHTML = `The question is: ${wordToGuessquestion}`;
function handleGuesses() {
  let successGuess = true;
  for (let i = 1; i <= numberOfletters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];


    // Game logic
    if (letter === actualLetter) {
      // letter is Correct And In place
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      // letter is Correct And Not in Place
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }

  // Check If User Win Or Lose
  if (successGuess) {
    messageArea.innerHTML = `You win! The word was <span>${wordToGuess}</span>`;

    if (numberOfHints == 2) {
      messageArea.innerHTML = `<p>Congratz You Didn't Use Hints</p>`;
    }


    // Add Disabled Class To All Try Divs
    let allTries = document.querySelectorAll(".inputs >div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));

    // Disable Guesses Button
    guessButton.disabled = true;
  } else {
    messageArea.innerHTML = `Try ${currentTry} failed. You have ${numberOftries - currentTry} tries left.`;
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-inputs");
    const currentTryInputs = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentTryInputs.forEach((input) => (input.disabled = true));

    currentTry++;

    const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInputs.forEach((input) => (input.disabled = false));

    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-inputs");

      el.children[1].focus();
    } else {
      // Disable Guesses Button
      guessButton.disabled = true;
      HintButton.disabled = true;
      messageArea.innerHTML = `You Lost! The word was <span>${wordToGuess}</span>. Better luck next time!`;
    }
  }
}

function getHint() {
  if (numberOfHints > 0) {
    // decreaent hints
    numberOfHints--;
    document.querySelector(".hint").innerHTML = `You have ${numberOfHints} hints left`;
  }
  if (numberOfHints === 0) {
    HintButton.disabled = true;
    document.querySelector(".hint").innerHTML = "No hints left!";
  }
  // Check the enablend inputs that are empty
  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  // console.log(enabledInputs);
  const emptyEnabledInputs = Array.from(enabledInputs).filter(input => input.value === '');
  // console.log(emptyEnabledInputs);

  if (emptyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex];

    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
    // console.log(randomIndex);
    // console.log(randompInput);
    // console.log(indexToFill);
    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }

}
function handleDeleteAndbackspace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    let currentIndex = Array.from(inputs).indexOf(document.activeElement);

    if (currentIndex >= 0) {
      let currentInput = inputs[currentIndex];

      if (currentInput.value === "") {
        // check if you reach to the first input
        if (currentIndex > 0) {
          inputs[currentIndex - 1].focus();
          inputs[currentIndex - 1].value = "";
        }
      } else {
        currentInput.value = "";
      }
    }
  } else if (event.key === "Delete") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    let currentIndex = Array.from(inputs).indexOf(document.activeElement);

    if (currentIndex < inputs.length) {
      let currentInput = inputs[currentIndex];

      if (currentInput.value === "") {
        if (currentIndex < inputs.length - 1) {
          inputs[currentIndex + 1].focus();
          inputs[currentIndex + 1].value = "";
        }
      } else {
        currentInput.value = "";
      }
    }
  }
}

document.addEventListener("keydown", handleDeleteAndbackspace);/////////////////////////////


window.onload = function () {

  generateInput(numberOfletters);
};

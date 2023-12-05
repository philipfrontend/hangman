let guessCount = 0;
let totalCount = 5;
let score = 0;
let level = 1;
let maxLevel = 10;
let guessedWord = [];
let guessedLetters = [];

let words = [
  "azerbaijan",
  "kazakhstan",
  "bangladesh",
  "mauritania",
  "micronesia",
  "montserrat",
  "muxembourg",
  "madagascar",
  "auritania",
  "mozambique",
];

function openScore() {
  var winmodel = document.getElementById("winmodel");
  if (winmodel) {
    winmodel.classList.add("hide");
  }

  var losemodel = document.getElementById("losemodel");
  if (losemodel) {
    losemodel.classList.add("hide");
  }
  var scoremodel = document.getElementById("scoremodel");
  scoremodel.classList.toggle("hide");
}
function continueGame() {
  hidemodel();
  document.getElementById(0 + "").value = "";
  document.getElementById(1 + "").value = "";
  document.getElementById(2 + "").value = "";
  document.getElementById(3 + "").value = "";
  document.getElementById(4 + "").value = "";
  document.getElementById(5 + "").value = "";
  document.getElementById(6 + "").value = "";
  document.getElementById(7 + "").value = "";
  document.getElementById(8 + "").value = "";
  document.getElementById(9 + "").value = "";
  guessCount = 0;
  guessedLetters = [];
}
function hidemodel() {
  var scoremodel = document.getElementById("scoremodel");
  scoremodel.classList.add("hide");
  var catModel = document.getElementById("catModel");
  catModel.classList.add("hide");
  var winmodel = document.getElementById("winmodel");
  winmodel.classList.toggle("hide");
}
function openCat() {
  var winmodel = document.getElementById("catModel");
  winmodel.classList.toggle("hide");
}

function newGame(link) {
  window.location.replace(link);
}

function openWinModel() {
  var winmodel = document.getElementById("winmodel");
  winmodel.classList.toggle("hide");
}
function openLoseModel() {
  var losemodel = document.getElementById("losemodel");
  losemodel.classList.toggle("hide");
}
function moveToNextField(currentField, nextFieldId) {
  let word = words[level - 1];
  const valur = currentField.value;
  let enteredWord = "";
  for (let i = 0; i <= 9; i++) {
    enteredWord = enteredWord + document.getElementById(i + "").value;
  }
  if (guessCount < 5) {
    let guessText = document.getElementById("counts");
    let scoreText = document.getElementById("score");
    let wordText1 = document.getElementById("inter1");
    let wordText2 = document.getElementById("inter2");
    let levelText = document.getElementById("level");
    let scoreValueText = document.getElementById("score_value");

    let res = /^[a-zA-Z]+$/.test(valur);
    if (res) {
      document.getElementById("counts").value = 3;

      const maxLength = parseInt(currentField.getAttribute("maxlength"));
      const currentLength = currentField.value.length;
      //  let word = words[level - 1];

      let letterArr = word.split("");
      let currentFieldId = parseInt(nextFieldId);

      let positionArr = [];

      letterArr.map((item, index) => {
        if (item.toString().toLowerCase() == valur.toString().toLowerCase()) {
          positionArr.push(index);
        }
      });

      console.log(positionArr);
      if (
        positionArr.length > 0 &&
        !guessedLetters.includes(valur.toLowerCase())
      ) {
        score = score + 100;
        guessedLetters.push(valur.toLowerCase());
        positionArr.map((item, index) => {
          let res1 = /^[a-zA-Z]+$/.test(
            document.getElementById(item + "").value
          );

          if (!res1) {
            document.getElementById(item + "").value = valur;

            //working
            console.log(word);
            if (
              word[level - 1].toString().toLowerCase() !=
              currentField.value.toString().toLowerCase()
            ) {
              currentField.value = "";
            }
          }
        });
      } else {
        if (guessCount < 5) {
          currentField.value = "X";
          currentField.style.color = "red";

          guessCount = guessCount + 1;
        }
      }

      scoreText.innerHTML = `${score}`;
      if (currentLength === maxLength) {
        const nextField = document.getElementById(nextFieldId);

        if (nextField) {
          nextField.focus();
        }
      }
      if (guessCount == 5 && guessCount < 6) {
        guessText.innerHTML = `Guess: ${guessCount}`;
        wordText1.innerHTML = word;
        scoreValueText.innerHTML = score;
        document.getElementById("hangman").src = "assests/images/complete.png";
        setTimeout(() => {
          openLoseModel();
        }, 3000);
      } else {
        if (guessCount == 0) {
          document.getElementById("hangman").src = "assests/images/oldman.png";
        } else if (guessCount == 1) {
          document.getElementById("hangman").src = "assests/images/Rope.png";
        } else if (guessCount == 2) {
          document.getElementById("hangman").src = "assests/images/head.png";
        } else if (guessCount == 3) {
          document.getElementById("hangman").src = "assests/images/upper.png";
        } else if (guessCount == 4) {
          document.getElementById("hangman").src = "assests/images/with_left_leg.png";
        }

        guessText.innerHTML = `Guess: ${guessCount}`;
      }

      if (enteredWord.length == 10) {
        if (
          enteredWord.toString().toLowerCase() === word.toString().toLowerCase()
        ) {
          wordText2.innerHTML = enteredWord;
          if (level < 10) {
            level = level + 1;
          }
          levelText.innerHTML = level;
          word = words[level - 1];
          scoreValueText.innerHTML = score;
          openWinModel();
        } else {
          wordText1.innerHTML = word;
         
          openLoseModel();
        }
      }
    } else {
      currentField.value = "";
      alert("Please Enter Aplhabets only");
    }
  }
}

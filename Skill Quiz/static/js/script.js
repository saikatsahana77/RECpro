// https://opentdb.com/api.php?amount=10&category=18&difficulty=medium

const question = document.getElementById("question");
const options = document.querySelector(".test_options");
const _correctScore = document.getElementById("correct_score");
const _totalQuestion = document.getElementById("total_question");
const checkButton = document.getElementById("check_answer");
const tryAgainButton = document.getElementById("try_again");
const _result = document.getElementById("result");

let correctAnswer = "",
  correctScore = 0,
  askedCount = 0,
  totalQuestion = 10;

// Function for eventListeners
function eventListeners() {
  checkButton.addEventListener("click", checkAnswer);
  tryAgainButton.addEventListener("click", tryAgain);
}

// Load the document
document.addEventListener("DOMContentLoaded", () => {
  loadQuestion();
  eventListeners();
  _correctScore.textContent = correctScore;
  _totalQuestion.textContent = totalQuestion;
});

// Fetch question and options from API
async function loadQuestion() {
  const APIUrl =
    "https://opentdb.com/api.php?amount=1&category=18&difficulty=medium";
  const result = await fetch(`${APIUrl}`);
  const data = await result.json();
  _result.innerHTML = "";
  showQuestion(data.results[0]);
}

// Show question and options
function showQuestion(data) {
  checkButton.disabled = false;
  correctAnswer = data.correct_answer;
  let incorrectAnswer = data.incorrect_answers;
  let optionsList = incorrectAnswer;

  // For inserting correct option at random position in optionList
  optionsList.splice(
    Math.floor(Math.random() * (incorrectAnswer.length + 1)),
    0,
    correctAnswer
  );

  // For inserting the question and the options
  question.innerHTML = `${data.question} <br> <span class="category">${data.category}</span>`;
  options.innerHTML = `${optionsList
    .map((option, index) => `<li>${index + 1}. <span> ${option} </span></li>`)
    .join("")}`;

  selectOption();
}

// Option selection
function selectOption() {
  options.querySelectorAll("li").forEach((option) => {
    option.addEventListener("click", () => {
      // console.log("hello");
      if (options.querySelector(".selected")) {
        const activeOption = options.querySelector(".selected");
        activeOption.classList.remove("selected");
      }
      option.classList.add("selected");
    });
  });
  console.log(correctAnswer);
}

// Checking Answer
function checkAnswer() {
  checkButton.disabled = true;
  if (options.querySelector(".selected")) {
    let selectedAnswer = options.querySelector(".selected span").textContent;
    if (selectedAnswer.trim() === HTMLDecode(correctAnswer)) {
      correctScore++;
      _result.innerHTML = `<p><i class = "fas fa-check"></i>Correct Answer!</p>`;
    } else {
      _result.innerHTML = `<p><i class = "fas fa-times"></i>
    Incorrect Answer!</p> <p> <small><b>Correct Answer: </b> ${correctAnswer}</small></p>`;
    }
    checkCount();
  } else {
    _result.innerHTML = `<p><i class = "fas fa-question"></i>Please select an option!</p>`;
    checkButton.disabled = false;
  }
}

// For converting HTML entities into normal text
function HTMLDecode(string) {
  let textString = new DOMParser().parseFromString(string, "text/html");
  return textString.documentElement.textContent;
}

// For checking the various counts
function checkCount() {
  askedCount++;
  setCount();
  if (askedCount == totalQuestion) {
    // alert("hello");
    document.getElementById("score_obtained").value = correctScore;
    document.getElementById("score_btn").click();
    _result.innerHTML = `<p> Your score is ${correctScore}</p>`;
    tryAgainButton.style.display = "block";
    checkButton.style.display = "none";
  } else {
    setTimeout(() => {
      loadQuestion();
    }, 300);
  }
}

// Setting the counts as necessary
function setCount() {
  _totalQuestion.textContent = totalQuestion;
  _correctScore.textContent = correctScore;
}

// For trying again
function tryAgain() {
  correctScore = 0;
  askedCount = 0;
  tryAgainButton.style.display = "none";
  checkButton.style.display = "block";
  // checkButton.disabled = false;
  document.getElementById("score_obtained").value = correctScore;
  setCount();
  loadQuestion();
}

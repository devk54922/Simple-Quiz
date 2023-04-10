const Questions = [
  {
    questions: "What is largest animal in the World.",
    Answer: [
      { text: "Elephant", correct: false },
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    questions: "Which is  smallest animal in the world.",
    Answer: [
      { text: "Bhutan", correct: false },
      { text: "Shri lanka", correct: false },
      { text: "Vatican City", correct: true },
      { text: "Nepal", correct: false },
    ],
  },
  {
    questions: "Which color is red.",
    Answer: [
      { text: "green", correct: false },
      { text: "yellow", correct: false },
      { text: "white", correct: false },
      { text: "red", correct: true },
    ],
  },
  {
    questions: "Choose no. 8.",
    Answer: [
      { text: "8", correct: true },
      { text: "5", correct: false },
      { text: "9", correct: false },
      { text: "4", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answer-btn");
const nextBtn = document.getElementById("submit");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  console.log("start quiz triggered");
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  let currentQuestion = Questions[currentQuestionIndex];
  let questionIndex = currentQuestionIndex + 1;
  questionElement.innerHTML = questionIndex + "." + currentQuestion.questions;
  resetState();
  currentQuestion.Answer.forEach((Answer) => {
    const button = document.createElement("button");
    button.innerHTML = Answer.text;
    button.classList.add("btn");
    answerBtns.appendChild(button);
    if (Answer.correct) {
      button.dataset.correct = Answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
}

function selectAnswer(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerBtns.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${Questions.length}!`;
  nextBtn.style = "block";
  nextBtn.innerHTML = "Play Again";
  console.log(currentQuestionIndex)
  // if (currentQuestionIndex===Questions.length) {
    
  //   nextBtn.addEventListener('click',playAgain())
  //   console.log(currentQuestionIndex)
  //   console.log(score)
  // }
}

// function playAgain() {
//   currentQuestionIndex=0;
//   // score++;
//   showQuestion()
//   // showScore()
  
// }
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < Questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < Questions.length) {
    handleNextButton();
  }
});

startQuiz();
// resetState();

const quizData = [
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Computer Style Sheets",
    d: "Creative Style System",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "HyperText Markup Language",
    b: "Hyper Transfer Markup Language",
    c: "Hyperlinks and Text Markup Language",
    d: "Home Tool Markup Language",
    correct: "a",
  },
  {
    question: "Which year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "None of the above",
    correct: "b",
  },
];

let currentQuiz = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answerBtns = document.querySelectorAll(".answer-btn");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");

function loadQuiz() {
  resetState();
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  document.getElementById("a_text").innerText = currentQuizData.a;
  document.getElementById("b_text").innerText = currentQuizData.b;
  document.getElementById("c_text").innerText = currentQuizData.c;
  document.getElementById("d_text").innerText = currentQuizData.d;
}

function resetState() {
  resultEl.innerText = "";
  answerBtns.forEach(btn => {
    btn.disabled = false;         // enable all buttons
    btn.style.background = "#ece2e5f3"; // reset colors
  });
}

answerBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const answer = btn.dataset.answer;
    const correctAnswer = quizData[currentQuiz].correct;

    // Disable all buttons after selection
    answerBtns.forEach(b => b.disabled = true);

    if (answer === correctAnswer) {
      score++;
      btn.style.background = "lightgreen";
      resultEl.innerText = "✅ Correct!";
      resultEl.style.color = "green";
    } else {
      btn.style.background = "lightcoral";
      resultEl.innerText = "❌ Wrong!";
      resultEl.style.color = "red";
      
      // highlight correct answer
      document.querySelector(`[data-answer="${correctAnswer}"]`).style.background = "lightgreen";
    }
  });
});

nextBtn.addEventListener("click", () => {
  currentQuiz++;
  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    document.getElementById("quiz").innerHTML = `
      <h2>You scored ${score}/${quizData.length} 🎉</h2>
      <button onclick="location.reload()">Restart</button>
    `;
  }
});

loadQuiz();

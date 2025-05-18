const questions = [
  {
    question: "What is my favorite color?",
    options: ["Blue", "Red", "Green", "Yellow"],
    answer: "Blue"
  },
  {
    question: "When is my birthday?",
    options: ["January 1", "February 14", "March 8", "December 25"],
    answer: "January 1"
  },
  {
    question: "What’s my favorite food?",
    options: ["Pizza", "Burger", "Sushi", "Momo"],
    answer: "Pizza"
  }
];

let current = 0;
let score = 0;

const questionContainer = document.getElementById("questionContainer");
const form = document.getElementById("quizForm");
const result = document.getElementById("result");
const progress = document.getElementById("progress");
const restartBtn = document.getElementById("restartBtn");
const submitBtn = document.getElementById("submitBtn");

function loadQuestion(index) {
  progress.textContent = `Question ${index + 1} of ${questions.length}`;
  const q = questions[index];
  questionContainer.innerHTML = `
    <div class="question">
      <p>${q.question}</p>
      <div class="options">
        ${q.options.map((opt, i) =>
          `<label><input type="radio" name="answer" value="${opt}" required /> ${opt}</label>`
        ).join("")}
      </div>
    </div>
  `;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const selected = form.answer.value;
  if (selected === questions[current].answer) {
    score++;
  }

  current++;
  if (current < questions.length) {
    loadQuestion(current);
  } else {
    showResult();
  }
});

function showResult() {
  form.classList.add("hidden");
  submitBtn.classList.add("hidden");
  restartBtn.classList.remove("hidden");

  let emoji = "😐";
  if (score === 3) emoji = "🎉";
  else if (score === 2) emoji = "😄";
  else if (score === 1) emoji = "🤔";
  else emoji = "😢";

  result.classList.remove("hidden");
  result.innerHTML = `You scored <strong>${score}/${questions.length}</strong>! ${emoji}`;
}

restartBtn.addEventListener("click", () => {
  current = 0;
  score = 0;
  form.classList.remove("hidden");
  submitBtn.classList.remove("hidden");
  result.classList.add("hidden");
  restartBtn.classList.add("hidden");
  loadQuestion(current);
});

// 🌙 Theme Toggle
const toggleThemeBtn = document.getElementById("toggleTheme");
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleThemeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Load first question
loadQuestion(current);

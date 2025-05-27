const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "Hyper Tool Multi Language",
      "HighText Machine Language",
      "Home Text Mark Language"
    ],
    answer: 0
  },
  {
    question: "Which CSS property controls the text size?",
    options: [
      "font-weight", "font-style", "text-size", "font-size"
    ],
    answer: 3
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: [
      "//", "/* */", "#", "<!-- -->"
    ],
    answer: 0
  }
];

let currentQ = 0;
let score = 0;

function loadQuestion() {
  const q = quizData[currentQ];
  document.getElementById("question").textContent = q.question;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(index, btn);
    optionsContainer.appendChild(btn);
  });

  document.getElementById("score").textContent = "";
}

function checkAnswer(selectedIndex, button) {
  const correctIndex = quizData[currentQ].answer;

  const allButtons = document.querySelectorAll("#options button");
  allButtons.forEach(btn => btn.disabled = true);

  if (selectedIndex === correctIndex) {
    score++;
    button.style.backgroundColor = "#4caf50"; // green
    document.getElementById("score").textContent = "✅ Correct!";
  } else {
    button.style.backgroundColor = "#f44336"; // red
    allButtons[correctIndex].style.backgroundColor = "#4caf50"; // highlight correct
    document.getElementById("score").textContent = "❌ Oops! Wrong answer.";
  }

  setTimeout(() => {
    currentQ++;
    if (currentQ < quizData.length) {
      loadQuestion();
    } else {
      showFinalResult();
    }
  }, 1500);
}

function showFinalResult() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = `
    <h3>🎉 Quiz Completed!</h3>
    <p>Your Score: ${score} / ${quizData.length}</p>
    <button onclick="retakeQuiz()">🔁 Retake Quiz</button>
  `;
}

function retakeQuiz() {
  currentQ = 0;
  score = 0;
  document.getElementById("quiz-container").innerHTML = `
    <p id="question"></p>
    <div id="options"></div>
    <p id="score"></p>
  `;
  loadQuestion();
}


loadQuestion();

const imageData = [
  {
    src: "ladakh.jpg",
    caption: "Ladakh – The Land of High Passes"
  },
  {
    src: "p.jpg",
    caption: "Pondicherry – A Slice of French India"
  },
  {
    src: "arunachal.jpg",
    caption: "Arunachal Pradesh – India’s First Sunrise"
  }
];

let currentIndex = 0;
let autoSlideInterval;

function showImage(index) {
  const img = document.getElementById("carousel");
  const caption = document.getElementById("caption");

  if (!img || !caption) return;

  img.src = imageData[index].src;
  caption.textContent = imageData[index].caption;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % imageData.length;
  showImage(currentIndex);
  resetAutoSlide();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + imageData.length) % imageData.length;
  showImage(currentIndex);
  resetAutoSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % imageData.length;
    showImage(currentIndex);
  }, 10000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

showImage(currentIndex);
startAutoSlide();

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "cd2bdfe60943e265a6931060a31d733f"; // Replace this
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  
  document.getElementById("loader").style.display = "block";
  document.getElementById("weatherResult").innerHTML = "";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    document.getElementById("weatherResult").innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <p>🌡️ Temp: ${data.main.temp} °C</p>
      <p>☁️ Condition: ${data.weather[0].description}</p>
    `;
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `
      <p style="color: red;">❗ ${error.message}</p>
    `;
  } finally {
    document.getElementById("loader").style.display = "none";
  }
}

let score = 0;

/* ================= Анімації появи ================= */

const faders = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 150);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
faders.forEach(el => observer.observe(el));

/* ================= Кнопка "Почати" ================= */

const startBtn = document.getElementById("strtBtn"); // беремо кнопку по ID
const inputField = document.getElementById("inpfld");
const card = document.querySelector(".card");
const textBox = document.getElementById("textToType");

/* ================= Інпут ================= */

inputField.addEventListener('input', () => {
  inputField.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(1.02)' },
    { transform: 'scale(1)' }
  ], { duration: 120 });
});

/* ================= Панель налаштувань ================= */

const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settings-panel');
const closeSettings = document.getElementById('closeSettings');
const timeSelect = settingsPanel.querySelector('select'); // перший select у панелі

function positionSettingsPanel() {
  const rect = settingsBtn.getBoundingClientRect();
  settingsPanel.style.top = `${rect.bottom + window.scrollY}px`;
  settingsPanel.style.left = `${rect.left + window.scrollX - 50}px`;
}

settingsBtn.addEventListener('click', (e) => {
  e.preventDefault();
  positionSettingsPanel();
  settingsPanel.classList.toggle('active');
});

closeSettings.addEventListener('click', () => {
  settingsPanel.classList.remove('active');
});

document.addEventListener('click', (e) => {
  if (!settingsPanel.contains(e.target) && e.target !== settingsBtn) {
    settingsPanel.classList.remove('active');
  }
});

window.addEventListener('resize', () => {
  if (settingsPanel.classList.contains('active')) {
    positionSettingsPanel();
  }
});

/* ================= Таймер ================= */

let timerId = null;
let timerDiv = null;

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

function startTimer() {
  clearInterval(timerId);

  let timeLeft = Number(timeSelect.value);

  if (!timerDiv) {
    timerDiv = document.createElement("div");
    timerDiv.id = "timer";
    timerDiv.style.fontSize = "24px";
    timerDiv.style.textAlign = "center";
    timerDiv.style.marginBottom = "10px";
    card.prepend(timerDiv);
  }

  timerDiv.textContent = `⏱ ${formatTime(timeLeft)}`;
  timerDiv.style.display = "block";
  inputField.disabled = false;

  timerId = setInterval(() => {
    timeLeft--;
    timerDiv.textContent = `⏱ ${formatTime(timeLeft)}`;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      inputField.disabled = true;

  // зберігаємо кількість балів
      localStorage.setItem("typingScore", score);

  // переходимо на фінальний екран
      window.location.href = "finish-screen.html";
    }

  }, 1000);
}

/* ================= Завантаження текстів ================= */

fetch("data.txt")
  .then(response => response.text())
  .then(data => {
    texts = data
      .split(/\r?\n/)        // розбиваємо по рядках
      .map(line => line.trim())
      .filter(line => line !== "");

    console.log("Texts loaded:", texts);
  })
  .catch(err => console.error("Failed to load data.txt", err));

  document.getElementById("strtBtn").addEventListener("click", function () {
    if (texts.length === 0) return;

  const randomText = texts[Math.floor(Math.random() * texts.length)];
  textBox.textContent = randomText;

  card.classList.add("typing-mode");
  inputField.value = "";
  inputField.disabled = false;
  inputField.focus();

  startTimer(); // запускаємо таймер
});

function loadRandomText() {
  if (texts.length === 0) return;

  const randomText = texts[Math.floor(Math.random() * texts.length)];
  textBox.textContent = randomText;

  inputField.value = "";
  inputField.focus();
}

startBtn.addEventListener("click", function () {
  card.classList.add("typing-mode");
  inputField.disabled = false;

  loadRandomText();
  startTimer();
});

const errorMsg = document.getElementById("errorMsg");

inputField.addEventListener("input", () => {
  const typedText = inputField.value;
  const targetText = textBox.textContent;

  const currentIndex = typedText.length - 1;

  if (
    currentIndex >= 0 &&
    typedText[currentIndex] !== targetText[currentIndex]
  ) {
    errorMsg.textContent = "❌ Помилка! Неправильна літера";
    errorMsg.classList.add("show");
    inputField.classList.add("error");

    inputField.value = typedText.slice(0, -1);

    setTimeout(() => {
      inputField.classList.remove("error");
      errorMsg.classList.remove("show");
    }, 500);

    return;
  }

  if (typedText === targetText) {
    score++; // ✅ +1 бал за правильне речення
    console.log("Score:", score);

    errorMsg.textContent = "✅ Чудово!";
    errorMsg.classList.add("show");

    setTimeout(() => {
      errorMsg.classList.remove("show");
    }, 800);

    loadRandomText();
  }

});


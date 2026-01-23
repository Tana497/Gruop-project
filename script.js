let totalChars = 0; 
let texts = [];     
let testDuration = 0;
let timerId = null;

// ================= Анімації появи =================
const faders = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), index * 150);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
faders.forEach(el => observer.observe(el));

// ================= Елементи =================
const startBtn = document.getElementById("strtBtn");
const inputField = document.getElementById("inpfld");
const card = document.querySelector(".card");
const textBox = document.getElementById("textToType");
const errorMsg = document.getElementById("errorMsg");

// ================= Інпут =================
inputField.disabled = true;
inputField.addEventListener('input', () => {
  if (inputField.disabled) return; 

  inputField.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(1.02)' },
    { transform: 'scale(1)' }
  ], { duration: 120 });
});


// ================= Панель налаштувань =================
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settings-panel');
const closeSettings = document.getElementById('closeSettings');
const timeSelect = settingsPanel.querySelector('select');

function positionSettingsPanel() {
  const rect = settingsBtn.getBoundingClientRect();
  settingsPanel.style.top = `${rect.bottom + window.scrollY}px`;
  settingsPanel.style.left = `${rect.left + window.scrollX - 50}px`;
}

settingsBtn.addEventListener('click', e => {
  e.preventDefault();
  positionSettingsPanel();
  settingsPanel.classList.toggle('active');
});

closeSettings.addEventListener('click', () => settingsPanel.classList.remove('active'));

document.addEventListener('click', e => {
  if (!settingsPanel.contains(e.target) && e.target !== settingsBtn) {
    settingsPanel.classList.remove('active');
  }
});

window.addEventListener('resize', () => {
  if (settingsPanel.classList.contains('active')) positionSettingsPanel();
});

// ================= Таймер =================
let timerDiv = null;

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

function startTimer() {
  clearInterval(timerId);
  testDuration = Number(timeSelect.value);
  let timeLeft = testDuration;

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
  inputField.focus();

  timerId = setInterval(() => {
    timeLeft--;
    timerDiv.textContent = `⏱ ${formatTime(timeLeft)}`;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      const minutes = testDuration / 60;
      const wpm = Math.round((totalChars / 5) / minutes);

      localStorage.setItem("typingWPM", wpm);
      localStorage.setItem("typingChars", totalChars);

      window.location.href = "finish-screen.html";
    }
  }, 1000);
}

// ================= Завантаження текстів =================
fetch("data.txt")
  .then(response => response.text())
  .then(data => {
    texts = data
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line !== "");
  })
  .catch(err => console.error("Failed to load data.txt", err));

// ================= Функції для тексту =================
function loadRandomText() {
  if (texts.length === 0) return;
  const randomText = texts[Math.floor(Math.random() * texts.length)];
  textBox.textContent = randomText;
  inputField.value = "";
  inputField.focus();
}

startBtn.addEventListener("click", () => {
  if (texts.length === 0) return;

  card.classList.add("typing-mode");
  totalChars = 0;           
  inputField.dataset.correct = 0;
  inputField.disabled = false;  
  loadRandomText();
  startTimer();
});


// ================= Перевірка введеного тексту =================
inputField.addEventListener("input", () => {
  const typedText = inputField.value;
  const targetText = textBox.textContent;

  let correctUpTo = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === targetText[i]) correctUpTo++;
    else break; // рахувати тільки до першої помилки
  }

  if (correctUpTo > 0) {
    totalChars += correctUpTo - (inputField.dataset.correct ? Number(inputField.dataset.correct) : 0);
  }

  inputField.dataset.correct = correctUpTo;

  if (typedText[typedText.length - 1] !== targetText[typedText.length - 1]) {
    errorMsg.textContent = "❌ Помилка! Неправильна літера";
    errorMsg.classList.add("show");
    inputField.classList.add("error");
    inputField.value = typedText.slice(0, -1);
    setTimeout(() => {
      errorMsg.classList.remove("show");
      inputField.classList.remove("error");
    }, 500);
    return;
  }

  if (typedText === targetText) {
    errorMsg.textContent = "Чудово!";
    errorMsg.classList.add("show");
    setTimeout(() => errorMsg.classList.remove("show"), 800);
    loadRandomText();
    inputField.dataset.correct = 0;
  }
});

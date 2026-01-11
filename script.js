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

const startBtn = document.querySelector('.button');
setInterval(() => {
  startBtn.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(1.05)' },
    { transform: 'scale(1)' }
  ], { duration: 1200, easing: 'ease-in-out' });
}, 4000);
startBtn.addEventListener('click', () => {
  startBtn.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(0.9)' },
    { transform: 'scale(1)' }
  ], { duration: 200 });
});

document.getElementById("strtBtn").addEventListener("click", function () {
  const card = document.querySelector(".card");
  const input = document.getElementById("inpfld");

  card.classList.add("typing-mode");
  input.value = "";
  input.focus();
});


const input = document.querySelector('.input-text input');
input.addEventListener('input', () => {
  input.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(1.02)' },
    { transform: 'scale(1)' }
  ], { duration: 120 });
});

const title = document.querySelector('.title');
const text = title.textContent;
title.textContent = '';
let i = 0;
function typeEffect() {
  if (i < text.length) {
    title.textContent += text.charAt(i);
    i++;
    setTimeout(typeEffect, 60);
  }
}

const subtitle = document.querySelector('.subtitle');
const subText = subtitle.textContent;
subtitle.textContent = '';
let j = 0;
function typeSubtitle() {
  if (j < subText.length) {
    subtitle.textContent += subText.charAt(j);
    j++;
    setTimeout(typeSubtitle, 40);
  }
}

window.addEventListener('load', typeEffect);
window.addEventListener('load', typeSubtitle);

function shake(element) {
  element.animate([
    { transform: 'translateX(0)' },
    { transform: 'translateX(-5px)' },
    { transform: 'translateX(5px)' },
    { transform: 'translateX(0)' }
  ], { duration: 300 });
}

document.getElementById("strtBtn").addEventListener("click", function () {
  document.getElementById("inpfld").value = "";
});

const settingsBtn = document.querySelector('.menu-item:nth-child(3)');
const settingsPanel = document.getElementById('settings-panel');
const closeSettings = document.getElementById('closeSettings');

function positionSettingsPanel() {
  const rect = settingsBtn.getBoundingClientRect();
  settingsPanel.style.top = `${rect.bottom + window.scrollY}px`;
  settingsPanel.style.left = `${rect.left + window.scrollX - 50}px`; 
}

let timerId;
let timeLeft = 0;
let timer = null;

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

function startTimer() {
  clearInterval(timerId);

  timeLeft = Number(timeSelect.value);

  if (!timer) {
    timer = document.createElement("div");
    timer.id = "timer";
    timer.style.fontSize = "24px";
    timer.style.textAlign = "center";
    timer.style.marginBottom = "10px";
    card.prepend(timer);
  }

  timer.textContent = `⏱ ${formatTime(timeLeft)}`;
  timer.style.display = "block";

  timerId = setInterval(() => {
    timeLeft--;
    timer.textContent = `⏱ ${formatTime(timeLeft)}`;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      timer.textContent = "⏱ Час вийшов!";
      inputField.disabled = true;
    }
  }, 1000);
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
  
    const card = document.querySelector(".card");
    const input = document.getElementById("inpfld");
    const textBox = document.getElementById("textToType");
  
    const randomText = texts[Math.floor(Math.random() * texts.length)];
  
    textBox.textContent = randomText;
    card.classList.add("typing-mode");
  
    input.value = "";
    input.focus();
  });
  


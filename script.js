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

const texts = [
  "Швидкий бурий лис перестрибує через ледачого пса.",
  "Практика друку допомагає покращити швидкість і точність.",
  "SpeedKey — це простий спосіб тренувати навички друку.",
  "Чим більше ти друкуєш, тим швидше стають твої пальці.",
  "Клавіатура — інструмент, який потребує щоденних тренувань.",
  "Сонце світить над містом. Люди поспішають у своїх справах. Вітер колише дерева, а думки стають яснішими з кожним кроком.",
  "Їжак шукав яблука в жовтому листі. Філіжанка чаю стояла поруч, зігріваючи руки в прохолодний вечір.",
  "У 2026 році швидкість 75–90 слів/хв вважається хорошою. Пароль: Test_123! Час — 10:45.",
  "Регулярна практика допомагає мозку й пальцям працювати як єдина система. Кілька хвилин щодня дають кращий результат, ніж довгі, але рідкісні сесії."
];

document.getElementById("strtBtn").addEventListener("click", function () {
  const card = document.querySelector(".card");
  const input = document.getElementById("inpfld");
  const textBox = document.getElementById("textToType");

  const randomText = texts[Math.floor(Math.random() * texts.length)];

  textBox.textContent = randomText;
  card.classList.add("typing-mode");

  input.value = "";
  input.focus();
});


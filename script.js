const faders = document.querySelectorAll('.fade-up');
const settingsBtn = document.querySelector('.menu-item:nth-child(3)');
const settingsPanel = document.getElementById('settings-panel');
const closeSettings = document.getElementById('closeSettings');
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
  ], {
    duration: 1200,
    easing: 'ease-in-out'
  });
}, 4000);

startBtn.addEventListener('click', () => {
  startBtn.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(0.9)' },
    { transform: 'scale(1)' }
  ], { duration: 200 });
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

window.addEventListener('load', typeSubtitle);


window.addEventListener('load', typeEffect);

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

settingsBtn.addEventListener('click', (e) => {
  e.preventDefault();
  settingsPanel.classList.add('active');
});

closeSettings.addEventListener('click', () => {
  settingsPanel.classList.remove('active');
});




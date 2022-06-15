function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

// const btnStart = document.querySelector('[data-start]');
// const btnStop = document.querySelector('[data-stop]');
// const body = document.querySelector('body');

let timerId = null;
console.log(refs.startBtn);
console.log(refs.stopBtn);

refs.startBtn.addEventListener('click', showClr);
refs.stopBtn.addEventListener('click', stopShowClr);

function showClr() {
  timerId = setInterval(function () {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  if (setInterval) {
    refs.startBtn.setAttribute('disabled', true);
  }
}

function stopShowClr() {
  clearInterval(timerId);
  if (clearInterval) {
    refs.startBtn.removeAttribute('disabled');
  }
}

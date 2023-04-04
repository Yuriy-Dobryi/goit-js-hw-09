const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let timerId = null;
let isStartBtnActive = false;

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);

function onStartBtn() {
  if (isStartBtnActive) {
    return;
  }

  timerId = setInterval(
    () => (body.style.backgroundColor = `${getRandomHexColor()}`),
    1000);
  
  isStartBtnActive = true;
}

function onStopBtn() {
  clearInterval(timerId);
  isStartBtnActive = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
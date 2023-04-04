const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);

function onStartBtn() {
  timerId = setInterval(
    () => (body.style.backgroundColor = `${getRandomHexColor()}`),
    1000);
  startBtn.setAttribute('disabled', '');
}

function onStopBtn() {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
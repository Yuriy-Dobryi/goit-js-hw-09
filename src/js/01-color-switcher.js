const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;

stopBtn.disabled = true;

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);

function onStartBtn() {
  timerId = setInterval(
    () => (body.style.backgroundColor = `${getRandomHexColor()}`),
    1000);
  toggleBtns();
}

function onStopBtn() {
  clearInterval(timerId);
  toggleBtns();
}

function toggleBtns() {
  startBtn.toggleAttribute('disabled');
  stopBtn.toggleAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
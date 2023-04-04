import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
const [daysRef, hoursRef, minutesRef, secondsRef] = document.querySelectorAll(
  'span[data-days], span[data-hours], span[data-minutes], span[data-seconds]'
);

let timeToEvent = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onOpen: () => disableStartBtn(),

  onClose: (selectedDates) => {
    timeToEvent = selectedDates[0] - Date.now();
    if (timeToEvent > 0) {
      startBtn.removeAttribute('disabled');
    } else {
      alert('Please choose a date in the future');
    }
  },
};

disableStartBtn();

flatpickr('#datetime-picker', options);
startBtn.addEventListener('click', onStartBtn);

function disableStartBtn() {
  startBtn.setAttribute('disabled', '');
}

function onStartBtn() {
  const intervalId = setInterval(() => {
    if (timeToEvent < 1000) {
      clearInterval(intervalId);
    }
    const convertedTime = convertMs(timeToEvent);
    for (const time in convertedTime) {
      if (convertedTime[time] < 10) {
        convertedTime[time] = addLeadingZero(convertedTime[time]);
      }
    }
    updateClockface(convertedTime);
    timeToEvent -= 1000;
  }, 1000);

  disableStartBtn();
} 

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockface({ days, hours, minutes, seconds }) {
  daysRef.textContent = days;
  hoursRef.textContent = hours;
  minutesRef.textContent = minutes;
  secondsRef.textContent = seconds;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
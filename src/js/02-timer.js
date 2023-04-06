import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Report } from 'notiflix';
Report.init({
  width: '420px',
  titleFontSize: '36px',
  messageFontSize: '24px',
  buttonFontSize: '24px',
});

const startBtn = document.querySelector('button[data-start]');
const [daysRef, hoursRef, minutesRef, secondsRef] = document.querySelectorAll('span[data-days], span[data-hours], span[data-minutes], span[data-seconds]');

const clockRef = {
  days: daysRef,
  hours: hoursRef,
  minutes: minutesRef,
  seconds: secondsRef,
};
let msTimeToEvent = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onOpen: () => disableStartBtn(),

  onClose: (selectedDates) => {
    msTimeToEvent = selectedDates[0] - Date.now();
    if (msTimeToEvent > 0) {
      startBtn.disabled = false;
    } else {
      Report.warning(
        'Invalid time',
        'Please choose a date in the future',
        'Okay'
      );
    }
  },
};

disableStartBtn();

flatpickr('#datetime-picker', options);
startBtn.addEventListener('click', onStartBtn);

function disableStartBtn() {
  startBtn.disabled = true;
}

function onStartBtn() {
  const intervalId = setInterval(() => {
    if (msTimeToEvent < 1000) {
      clearInterval(intervalId);
    }
    const convertedToClockTime = convertMs(msTimeToEvent);
    // Функция convertMs возвращает обьект с такими же ключами как у обьекта clockRef, поэтому эти ключи удобно использовать в цикле for in
    for (const unitTime in convertedToClockTime) {
      clockRef[unitTime].textContent = addLeadingZero(convertedToClockTime[unitTime]);
      // const unitTimeClockRef = document.querySelector(`[data-${unitTime}]`);
      // unitTimeClockRef.textContent = addLeadingZero(convertedToClockTime[unitTime]);
    }
    msTimeToEvent -= 1000;
  }, 1000);

  disableStartBtn();
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
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
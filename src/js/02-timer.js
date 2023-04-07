import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  startBtn: document.querySelector('[data-start]'),
  daysLabel: document.querySelector('[data-days-label]'),
  hoursLabel: document.querySelector('[data-hours-label]'),
  minutesLabel: document.querySelector('[data-minutes-label]'),
  secondsLabel: document.querySelector('[data-seconds-label]'),
};

refs.startBtn.setAttribute('disabled', true);
refs.startBtn.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (!isFutureDate(selectedDates[0])) {
      Notiflix.Notify.warning('Please choose a date in the future', {
        position: 'center-top',
      });
    }
    refs.startBtn.disabled = !isFutureDate(selectedDates[0]);
  },
};

const fp = flatpickr('#datetime-picker', options);

function isFutureDate(date) {
  return date > new Date();
}

let timerId = null;

function startTimer() {
  timerId = setInterval(setTimer, 1000);
  refs.startBtn.textContent = 'Reset';
  refs.startBtn.removeEventListener('click', startTimer);
  refs.startBtn.addEventListener('click', resetTimer);
}

// Add code for reset timer
function resetTimer() {
  clearInterval(timerId);
  refs.startBtn.textContent = 'Start';
  refs.startBtn.removeEventListener('click', resetTimer);
  refs.startBtn.addEventListener('click', startTimer);
  refs.days.textContent = pad(0);
  refs.hours.textContent = pad(0);
  refs.minutes.textContent = pad(0);
  refs.seconds.textContent = pad(0);
  updateLabels(0, 0, 0, 0);
}

function setWordForm(value, singular, plural) {
  return value === 1 ? singular : plural;
}

function setTimer() {
  if (isFutureDate(fp.selectedDates[0])) {
    const targetDate = new Date(fp.selectedDates[0]);
    const currentDate = new Date();
    const time = targetDate - currentDate;
    const { days, hours, minutes, seconds } = convertMs(time);

    refs.days.textContent = pad(days);
    refs.hours.textContent = pad(hours);
    refs.minutes.textContent = pad(minutes);
    refs.seconds.textContent = pad(seconds);
    updateLabels(days, hours, minutes, seconds);
  }
}

// Add logic for text content
function updateLabels(days, hours, minutes, seconds) {
  refs.daysLabel.textContent = setWordForm(days, 'Day', 'Days');
  refs.hoursLabel.textContent = setWordForm(hours, 'Hour', 'Hours');
  refs.minutesLabel.textContent = setWordForm(minutes, 'Minute', 'Minutes');
  refs.secondsLabel.textContent = setWordForm(seconds, 'Second', 'Seconds');
}

function pad(value) {
  return String(value).padStart(2, '0');
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

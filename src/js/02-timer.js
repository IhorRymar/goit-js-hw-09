import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  datetime: document.querySelector('#datetime-picker'),
  btn: document.querySelector('button'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
  timer: document.querySelector('div.timer'),
};

refs.btn.setAttribute('disabled', true);
// console.log(refs.datetime);
// console.log(refs.btn);
// console.log(refs.dataDays);
// console.log(refs.dataHours);
// console.log(refs.dataMinutes);
// console.log(refs.dataSeconds);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (options.defaultDate > selectedDates[0]) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.btn.removeAttribute('disabled');
      refs.btn.addEventListener('click', timer);
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

function renderTimer(number) {
  refs.dataDays.textContent = addLeadingZero(number.days);
  refs.dataHours.textContent = addLeadingZero(number.hours);
  refs.dataMinutes.textContent = addLeadingZero(number.minutes);
  refs.dataSeconds.textContent = addLeadingZero(number.seconds);
}

let timerId = null;

function timer() {
  timerId = setInterval(() => {
    const selectedDate = fp.selectedDates[0].getTime();
    const delta = selectedDate - new Date();

    let dataItem = convertMs(delta);
    renderTimer(dataItem);
  }, 1000);
  refs.datetime.disabled = true;

  refs.btn.setAttribute('disabled', true);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

refs.datetime.style.borderRadius = '10px';
refs.datetime.style.border = 'solid';
refs.datetime.style.fontSize = '20px';
refs.btn.style.fontSize = '20px';
refs.btn.style.borderRadius = '10px';
refs.btn.style.border = 'solid';
refs.dataDays.style.fontSize = '40px';
refs.dataHours.style.fontSize = '40px';
refs.dataMinutes.style.fontSize = '40px';
refs.dataSeconds.style.fontSize = '40px';

refs.timer.style.display = 'flex';
refs.timer.style.justifyContent = 'space-between';
refs.timer.style.padding = '20px';

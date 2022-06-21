import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name=delay]'),
  step: document.querySelector('[name=step]'),
  amount: document.querySelector('[name=amount]'),
};

// let position = 0;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

refs.form.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  setTimeout(() => {
    for (let i = 0; i < refs.amount.value; i += 1) {
      let totalStep = Number(refs.delay.value) + Number(refs.step.value) * i;
      // position = i + 1;
      createPromise(i, totalStep)
        .then(({ position, delay }) => {
          Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });
    }
  }, refs.delay.value);
}

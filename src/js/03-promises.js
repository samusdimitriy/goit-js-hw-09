import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const { delay, step, amount } = event.target.elements;
  let delayValue = Number(delay.value);
  const stepValue = Number(step.value);
  const amountValue = Number(amount.value);

  if (delayValue < 0 || stepValue < 0 || amountValue <= 0) {
    Notiflix.Notify.failure(
      'Invalid input values. Please check and try again.'
    );
    return;
  } else {
    for (let i = 1; i <= amountValue; i++) {
      createPromise(i, delayValue)
        .then(({ position, delay }) =>
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          )
        )
        .catch(({ position, delay }) =>
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          )
        );

      delayValue += stepValue;
    }
  }

  form.reset();
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

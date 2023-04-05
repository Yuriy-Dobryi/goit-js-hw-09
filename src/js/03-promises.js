const formRef = document.querySelector('.form');
const [delayRef, stepRef, amountRef] = document.querySelectorAll(
  'input[name="delay"], input[name="step"], input[name="amount"]'
);

formRef.addEventListener('submit', (e) => {
  e.preventDefault();
  let delay = Number(delayRef.value);
  const step = Number(stepRef.value);
  const amount = Number(amountRef.value);
  

  for (let index = 1; index <= amount; index += 1) {
    createPromise(index, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
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
  })
}
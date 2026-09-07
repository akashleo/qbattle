const startButton = document.querySelector('#startButton');
const message = document.querySelector('#message');

startButton.addEventListener('click', () => {
  message.textContent = 'The quiz is starting!';
  startButton.disabled = true;
});

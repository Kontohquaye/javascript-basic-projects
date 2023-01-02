const number = document.querySelector(".number");

let count = 0;
const counter = () => {
  if (count == 100) {
    clearInterval();
  } else {
    count++;
    number.textContent = `${count}%`;
  }
};
setInterval(counter, 80);

const card = document.querySelector(".container");
const header = document.querySelector("h2");

const moveCard = ({ movementX, movementY }) => {
  let cardStyles = window.getComputedStyle(card);
  console.log(movementX, movementY);
  let left = parseInt(cardStyles.left);
  let top = parseInt(cardStyles.top);
  card.style.left = `${movementX + left}px`;
  card.style.top = `${movementY + top}px`;
};

header.addEventListener("mousedown", () => {
  header.classList.add("active");
  header.addEventListener("mousemove", moveCard);
});

document.addEventListener("mouseup", () => {
  header.classList.remove("active");
  header.removeEventListener("mousemove", moveCard);
});

const carousel = document.querySelector(".carousel");
const arrowKeys = document.querySelectorAll(".wrapper i");
const firstImage = document.querySelectorAll(".carousel img")[0];
let firstImageWidth = firstImage.clientWidth + 14;

const showHiddenArrow = () => {
  const scrollWidth = carousel.scrollWidth - carousel.clientWidth;
  arrowKeys[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowKeys[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowKeys.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    arrow.id == "left"
      ? (carousel.scrollLeft -= firstImageWidth)
      : (carousel.scrollLeft += firstImageWidth);
    setTimeout(() => {
      showHiddenArrow();
    }, 60);
  });
});

let draggingReady = false,
  lastpageX,
  lastscrollLeft,
  positionDifference,
  isDragging;

const autoSlide = () => {
  if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth)
    return;
  positionDifference = Math.abs(positionDifference);
  let valDifference = firstImageWidth - positionDifference;

  if (carousel.scrollLeft > lastscrollLeft) {
    return (carousel.scrollLeft +=
      positionDifference > firstImageWidth / 3
        ? valDifference
        : -positionDifference);
  }
  carousel.scrollLeft -=
    positionDifference > firstImageWidth / 3
      ? valDifference
      : -positionDifference;
};

const dragStart = (e) => {
  draggingReady = true;
  lastpageX = e.pageX || e.touches[0].pageX;
  lastscrollLeft = carousel.scrollLeft;
};

const dragging = (evt) => {
  if (!draggingReady) return;
  evt.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDifference = (evt.pageX || evt.touches[0].pageX) - lastpageX;
  carousel.scrollLeft = lastscrollLeft - positionDifference;
  showHiddenArrow();
};

const dragStop = () => {
  draggingReady = false;
  carousel.classList.remove("dragging");
  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);

carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);

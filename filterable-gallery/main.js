// Nav selection
const gallery = document.querySelector(".gallery");

// filter function
const filter = (evt) => {
  //  switching between lists
  if (evt.target.classList.contains("filter")) {
    gallery.querySelector(".active").classList.remove("active");
    evt.target.classList.add("active");

    // variables for filtering images
    const itemBoxes = document.querySelectorAll(".itembox");
    const filterValue = evt.target.getAttribute("data-filter");

    // image filtering
    itemBoxes.forEach((imgBox) => {
      if (imgBox.classList.contains(filterValue) || filterValue === "all") {
        imgBox.classList.remove("hide");
        imgBox.classList.add("show");
      } else {
        imgBox.classList.remove("show");
        imgBox.classList.add("hide");
      }
    });
  }
};

// Adding Eventlistner to the gallery
gallery.addEventListener("click", filter);

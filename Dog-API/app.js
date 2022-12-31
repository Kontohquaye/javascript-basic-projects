const image = document.querySelector(".img");
const button = document.querySelector("button");
const toast = document.querySelector(".toast");
const notification = document.querySelector(".notification");

// image function
const getImage = () => {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => response.json())
    .then((data) => {
      image.innerHTML = `<img src="${data.message}"  alt="dogImage">`;
      console.log(data);
    });
};

// element
const toastDetails = {
  icon: "fa-solid fa-circle-check",
  message: "fetch success",
};

// Event-listner
button.addEventListener("click", getImage);
button.addEventListener("click", () => {
  // toast animation
  const toast = document.createElement("li");
  toast.className = "toast";
  toast.innerHTML = `<div class="colum">
                <i class="${toastDetails.icon}"></i>
                <span>${toastDetails.message}</span>
            </div>
            <i class="fa-solid fa-xmark" onclick()=></i>`;
  toast.classList.remove("hide");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hide");
  }, 2000);
  notification.appendChild(toast);
  // deleting toast
  if (toast) {
    setTimeout(() => {
      notification.removeChild(toast);
    }, 2500);
  }

  toast.querySelector(".fa-xmark").addEventListener("click", (evt) => {
    toast.classList.add("hide");
    evt.target.parentElement.remove();
  });
});

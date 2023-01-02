const cookieContainer = document.querySelector(".container");
const acceptButton = document.querySelector(".btn .accept");

const addCookie = () => {
  //   create cookie
  document.cookie = "cookie=HelloWorld; max-age=" + 60 * 60 * 24 * 29;

  if (document.cookie) {
    cookieContainer.classList.add("hide");
  } else {
    alert("cookie cannot be set!");
  }
};

const checkCookie = document.cookie.indexOf("cookie=HelloWorld");
checkCookie != -1
  ? cookieContainer.classList.add("hide")
  : cookieContainer.classList.remove("hide");

acceptButton.addEventListener("click", addCookie);

const input = document.querySelector(".input-box input");
const sliderLine = document.querySelector(".range .slider");
const slider = document.querySelector(".range input");
const counter = document.querySelector(".pass-slide span");
const passStrenght = document.querySelector(".pass-strenght .strenght");
const checkboxes = document.querySelectorAll(".option input");
const genBtn = document.querySelector(".gen-btn button");
const copyIcon = document.querySelector(".input-box i");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+;>/?<.:='-",
};

const genPass = () => {
  let password = "";
  let newPassword = "";
  let duplicate = false;
  checkboxes.forEach((icon) => {
    if (icon.checked) {
      if (icon.id !== "spaces" && icon.id !== "exc-duplicate") {
        password += characters[icon.id];
      } else if (icon.id == "spaces") {
        password += `  ${characters[icon.id]} `;
      } else if (icon.id == "exc-duplicate") {
        duplicate = true;
      }
    }
  });

  for (let i = 0; i < slider.value; i++) {
    let randomPass = password[Math.floor(Math.random() * password.length)];

    if (duplicate) {
      !newPassword.includes(randomPass) || randomPass == " "
        ? (newPassword += randomPass)
        : i--;
    } else {
      newPassword += randomPass;
    }
  }
  input.value = newPassword;
};

const updateAll = () => {
  const value = slider.value;
  sliderLine.style.width = `${(value / 30) * 100}%`;
  counter.textContent = value;
  passStrenght.id = value < 8 ? "weak" : value < 16 ? "medium" : "strong";
  genPass();
};
updateAll();

const copyPassword = () => {
  navigator.clipboard.writeText(input.value);
  copyIcon.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;
  setTimeout(() => {
    copyIcon.innerHTML = `<i class="fa-regular fa-copy"></i>`;
  }, 1500);
};

copyIcon.addEventListener("click", copyPassword);
slider.addEventListener("input", updateAll);
genBtn.addEventListener("click", genPass);

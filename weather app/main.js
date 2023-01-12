import key from "./api.js";

const wrapper = document.querySelector(".wrapper");
const text = document.querySelector(".inputs .info");
const inputArea = document.querySelector(".inputs input");
const backIcon = document.querySelector("header i");
const locButton = document.querySelector("button");

//
const fetchDisplay = () => {
  text.classList.remove("error");
  text.classList.add("pending");
  text.textContent = "getting weather results";
};
//
const requestWeather = (city) => {
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

  fetch(api)
    .then((response) => response.json())
    .then((data) => processData(data));
};

//
const processData = (results) => {
  if (results.cod == "404") {
    text.classList.add("error");
    text.textContent = `${inputArea.value + " " + results.message}`;
    setTimeout(() => {
      text.classList.remove("error", "pending");
      text.textContent = "enter a valid city below";
    }, 1500);
    inputArea.value = " ";
  } else {
    wrapper.classList.add("active");
    updateWeather(results);
  }
};

//
const updateWeather = (info) => {
  console.log(info);
  let { feels_like, humidity, temp } = info.main;
  let { country } = info.sys;
  let city = info.name;
  let { id, description } = info.weather[0];
  //   updating info
  //   image update.
  let img = wrapper.querySelector(".weather-part img");
  if (id >= 200 && id <= 232) {
    img.src = "icons/thunderstorm.png";
  } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
    img.src = "icons/rain.png";
  } else if (id >= 600 && id <= 622) {
    img.src = "icons/snow.png";
  } else if (id >= 701 && id <= 781) {
    img.src = "icons/hazy.png";
  } else if (id == 800) {
    img.src = "icons/sunny.png";
  } else if (id >= 801 && id <= 804) {
    img.src = "icons/cloudy.png";
  }

  //  content update
  wrapper.querySelector(".weather-part .details span.temp").textContent =
    Math.floor(temp);
  wrapper.querySelector(".weather-part .details .weather").textContent =
    description;
  wrapper.querySelector(".location span").textContent = `${city}, ${country}`;
  wrapper.querySelector(".feel").textContent = `${Math.floor(feels_like)}°C`;
  wrapper.querySelector(".humid").textContent = `${humidity}%`;
};

//
const fetchWeather = (evt) => {
  if (evt.key == "Enter" && inputArea.value !== "") {
    fetchDisplay();
    requestWeather(inputArea.value);
  }
};

const backToRequest = () => {
  wrapper.classList.remove("active");
  text.classList.remove("pending", "error");
  text.textContent = "enter a valid city below";
  inputArea.value = " ";
};

const processMyWeather = (lat, lon) => {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

  fetch(api)
    .then((response) => response.json())
    .then((data) => processData(data));
};

const reqMyWeather = () => {
  //
  const locSuccess = (position) => {
    console.log(position);
    fetchDisplay();
    let { latitude, longitude } = position.coords;
    processMyWeather(latitude, longitude);
  };
  const locError = (error) => {
    text.classList.add("error");
    text.textContent = error.message;
  };
  //
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(locSuccess, locError);
  } else {
    alert("Your device doesn't support geolocation");
  }
};

inputArea.addEventListener("keyup", fetchWeather);
backIcon.addEventListener("click", backToRequest);
locButton.addEventListener("click", reqMyWeather);

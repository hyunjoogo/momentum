const weatherTemp = document.querySelector(".weather-info__temper");
const weatherCity = document.querySelector(".weather-city");
const locationIcon = document.querySelector(".weather-info__icon");
const COORDS_LS = "coords";
const API_Key = "dd4f3e227774a294cbdd1e924a02bc04";

function showWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_Key}&lang=kr&units=metric`
  )
    .then(function (response) {
      console.log();
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const city = json.name;
      const icon = json.weather[0].icon;
      console.log(icon);
      weatherTemp.innerText = `${Math.round(temperature)}°`;
      weatherCity.innerText = `${city}`;
      locationIcon.setAttribute("src", `icons/${icon}.png`);
    });
}

function getSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  showWeather(latitude, longitude);
}

function getError() {
  console.log("Error");
}

function askCoords() {
  navigator.geolocation.getCurrentPosition(getSuccess, getError);
}

function loadLocation() {
  const location = localStorage.getItem(COORDS_LS);
  if (location == null) {
    askCoords();
  } else {
    showWeather();
  }
}

loadLocation();

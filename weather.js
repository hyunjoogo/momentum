const weather = document.querySelector(".weather-desc");
const locationIcon = document.querySelector('.weather-icon');
const COORDS_LS = "coords";
const API_Key = "dd4f3e227774a294cbdd1e924a02bc04";


function saveCoords() {
  localStorage.setItem
}

function showWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_Key}&lang=kr&units=metric`)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log(json);
    const temperature = json.main.temp;
    const city = json.name;
    const icon = json.weather[0].icon;
    console.log(temperature, city, icon);
    weather.innerText = `${temperature} ${city}`;
    locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
    
  })
}

function getSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  // const coordsObj = {
  //   latitude,
  //   longitude
  // };
  showWeather(latitude, longitude);
  saveCoords(latitude, longitude);
}

function getError() {
  console.log("Error")
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

function init() {
  loadLocation();
}

init();

// 1. 위치를 가지고 온다.
// 2. 날씨 API
// 3. API 데이터 출력
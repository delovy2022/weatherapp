function displayOne(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}
let display = document.querySelector("h6");
let now = new Date();

display.innerHTML = displayOne(now);

function showTemperature(response) {
  console.log(response);
  let currentTemperature = Math.round(response.data.main.temp);
  console.log(currentTemperature);
  let currentTempmin = Math.round(response.data.main.temp_min);
  console.log(currentTempmin);
  let currentTempmax = Math.round(response.data.main.temp_max);
  console.log(currentTempmax);
  let currentWind = Math.round(response.data.wind.speed);
  document.querySelector(`#wind`).innerHTML = `Windspeed: ${currentWind}km/h`;
  document.querySelector(`#description`).innerHTML =
    response.data.weather[0].description;
  let currentHumidity = response.data.main.humidity;
  document.querySelector(`#tempa`).innerHTML = `Now is ${currentTemperature}°C`;
  document.querySelector(`#citiy`).innerHTML = response.data.name;
  document.querySelector(
    `#maxmin`
  ).innerHTML = `Today ${currentTempmax}°C/${currentTempmin}°C`;
  document.querySelector(`#humid`).innerHTML = `Humidity:${currentHumidity}%`;
}
function search(city) {
  let apiKey = `8290d80f32ed8484ecefb6a0a00a5330`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector(`#exampleInputlocation`).value;
  search(city);
}

let form = document.querySelector(`#search-form`);
form.addEventListener(`submit`, handleSearch);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  let apiKey = `8290d80f32ed8484ecefb6a0a00a5330`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function current() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector(`#geo`);
button.addEventListener(`click`, current);
search("New York");

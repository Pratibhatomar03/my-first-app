// date, day and time

let today = new Date();
console.log(today);
let time = today.getHours();
console.log(time);
let minute = today.getMinutes();
console.log(minute);
let displayTime = `${time}:${minute}`;
let selectedTime = document.querySelector("#time");
selectedTime.innerHTML = displayTime;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];
let selectedDay = document.querySelector("#day");
selectedDay.innerHTML = day;

let year = today.getFullYear();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[today.getMonth()];

let date = today.getDate();
let currentDate = ` ${date} ${month}, ${year}`;
let selcetedDate = document.querySelector("#date");
selcetedDate.innerHTML = currentDate;

//On your project, when a user searches for a city
// (example: New York), it should display the name
//of the city on the result page and the current
//temperature of the city.

function temperature(response) {
  let country = response.data.sys.country;
  document.querySelector("h1").innerHTML = response.data.name + `, ${country}`;

  document.querySelector("#temp").innerHTML =
    Math.round(response.data.main.temp) + "°C ";

  document.querySelector("#weatherType").innerHTML =
    response.data.weather[0].description;
}

function cityName(event) {
  event.preventDefault();
  let apiKey = "26c70cc759f2dda82240508e33d14cb9";
  let cityElement = document.querySelector("#city").value;
  console.log(cityElement);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityElement}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(temperature);
}
let form = document.querySelector("form");
form.addEventListener("submit", cityName);

//🙀 Bonus point:
//Add a Current Location button. When clicking
// on it, it uses the Geolocation API to get your
//GPS coordinates and display and the city and
// current temperature using the OpenWeather API.
function displayLocation(response) {
  console.log(response);
  let country = response.data.sys.country;
  let city = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}, ${country}`;
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = `${temp} °C`;
  document.querySelector("#weatherType").innerHTML =
    response.data.weather[0].description;
}

function currentPosition(position) {
  let l1 = position.coords.latitude;
  let l2 = position.coords.longitude;
  let apiKey = "26c70cc759f2dda82240508e33d14cb9";
  let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${l1}&lon=${l2}&appid=${apiKey}&units=metric`;
  axios.get(`${geoUrl}&apiid=${apiKey}`).then(displayLocation);
}

function locationPosition() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", locationPosition);

// weather Type

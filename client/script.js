import axios from "axios";
import { format } from "date-fns";

// get user location
navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionError);

function getPositionSuccess({ coords }) {
  getWeather(coords.latitude, coords.longitude);
}

function getPositionError() {
  alert(
    "There was an error getting your location. Please allow us to use your location and refresh the page",
  );
}

function getWeather(lat, lon) {
  axios
    .get("http://localhost:3001/weather", {
      params: { lat, lon },
    })
    .then(({ data }) => {
      document.body.classList.remove("blurred");
      renderCurrentWeather(data.current);
      renderDailyWeather(data.daily);
    })
    .catch((err) => {
      console.error(err);
      alert("Error getting weather. Please try again.");
    });
}

function renderCurrentWeather(current) {
  document.querySelector("[data-current-icon]").src = getIconUrl(current.icon, {
    large: true,
  });
  setValue("current-temp", current.currentTemp);
  setValue("current-high", current.highTemp);
  setValue("current-low", current.lowTemp);
  setValue("current-fl-high", current.highFeelsLike);
  setValue("current-fl-low", current.lowFeelsLike);
  setValue("current-wind", current.windSpeed);
  setValue("current-precip", current.precip);
  setValue("current-description", current.description);
}

const dailySection = document.querySelector("[data-day-section]");
const dayCardTemplate = document.getElementById("day-card-template");
function renderDailyWeather(daily) {
  dailySection.innerHTML = "";
  daily.forEach((day) => {
    const element = dayCardTemplate.content.cloneNode(true);
    setValue("temp", day.temp, { parent: element });
    setValue("date", formatDay(day.timestamp), { parent: element });
    element.querySelector("[data-icon]").src = getIconUrl(day.icon);
    dailySection.append(element);
  });
}

function setValue(selector, value, { parent = document } = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value;
}

function getIconUrl(icon, { large = false } = {}) {
  const size = large ? "@2x" : "";
  return `http://openweathermap.org/img/wn/${icon}${size}.png`;
}

function formatDay(timestamp) {
  return format(new Date(timestamp), "eeee");
}

function formatTime(timestamp) {
  return format(new Date(timestamp), "ha");
}

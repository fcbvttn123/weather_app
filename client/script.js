import axios from "axios";

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

function setValue(selector, value, { parent = document } = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value;
}

function getIconUrl(icon, { large = false } = {}) {
  const size = large ? "@2x" : "";
  return `http://openweathermap.org/img/wn/${icon}${size}.png`;
}

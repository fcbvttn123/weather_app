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
    .then((response) => {
      document.body.classList.remove("blurred");
    })
    .catch((err) => {
      console.err(err);
      alert("Error getting weather. Please try again.");
    });
}

const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/weather", (request, response) => {
  const { lat, lon } = request.query;
  axios
    .get("https://api.openweathermap.org/data/3.0/onecall", {
      params: {
        appid: process.env.API_KEY,
        lat,
        lon,
        units: "imperial",
        exclude: "minutely, alerts",
      },
    })
    .then(({ data }) => {
      response.json(data);
    })
    .catch((err) => {
      response.sendStatus(500);
      response.json({
        error: err.response.data,
        message: err.message,
      });
    });
});

app.listen(3001);

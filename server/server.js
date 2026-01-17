const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/weather", (request, response) => {
  const { lat, lon } = request.query;
  console.log(lat, lon);
  response.send();
});

app.listen(3001);

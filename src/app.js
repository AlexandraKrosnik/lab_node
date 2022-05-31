const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();

const weatherData = require("../utils/weatherData");

const port = process.env.PORT || 3000;

const publicStaticDirPath = path.join(__dirname, "../public");

const viewsPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
  });
});

//localhost:3000/weather?address=lahore
app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address || address === " " || address === "") {
    return res.send({
      error: "You must enter address in search text box",
    });
  }
  weatherData(address, (error, data) => {
    if (error || !data) {
      return res.send({
        error,
      });
    }
    let { temperature, description, cityName, humidity, pressure } = data;
    res.send({
      temperature,
      description,
      cityName,
      humidity,
      pressure,
    });
  });
});
app.get("*", (req, res) => {
  res.send("You must enter address in search text box");
});

app.listen(port, () => {
  console.log("Server is up and running on port: ", port);
});

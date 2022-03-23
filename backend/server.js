const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const { signup, signin } = require("./controllers/auth");
const { db } = require("./models/User");
const rp = require("request-promise");

mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB Connected"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signin", signin);
app.post("/signup", signup);

app.get("/cricket", (req, res) => {
  console.log("request");
  const options = {
    url: "https://hs-consumer-api.espncricinfo.com/v1/pages/matches/current?lang=en&latest=true",
    json: true,
  };
  rp(options)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/football", (req, res) => {
  const options = {
    method: "GET",
    url: "https://sportscore1.p.rapidapi.com/sports/1/events/live",
    qs: { page: "1" },
    headers: {
      "x-rapidapi-host": process.env.SPORTSCOREHOST,
      "x-rapidapi-key": process.env.SPORTSCOREKEY,
    },
    json: true,
  };
  rp(options).then((data) => res.send(data));
});
app.get("/tennis", (req, res) => {
  const options = {
    method: "GET",
    url: "https://sportscore1.p.rapidapi.com/sports/2/events/live",
    qs: { page: "1" },
    headers: {
      "x-rapidapi-host": process.env.SPORTSCOREHOST,
      "x-rapidapi-key": process.env.SPORTSCOREKEY,
    },
    json: true,
  };
  rp(options).then((data) => res.send(data));
});
app.get("/basketball", (req, res) => {
  const options = {
    method: "GET",
    url: "https://sportscore1.p.rapidapi.com/sports/3/events/live",
    qs: { page: "1" },
    headers: {
      "x-rapidapi-host": process.env.SPORTSCOREHOST,
      "x-rapidapi-key": process.env.SPORTSCOREKEY,
    },
    json: true,
  };
  rp(options).then((data) => res.send(data));
});
app.get("/hockey", (req, res) => {
  const options = {
    method: "GET",
    url: "https://sportscore1.p.rapidapi.com/sports/4/events/live",
    qs: { page: "1" },
    headers: {
      "x-rapidapi-host": process.env.SPORTSCOREHOST,
      "x-rapidapi-key": process.env.SPORTSCOREKEY,
    },
    json: true,
  };
  rp(options).then((data) => res.send(data));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

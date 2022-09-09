const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
//console.log(req.body.cityName);
const query = req.body.cityName;
const apiKey = "ace750f646a3ac1ff6ff78229f1a53d1";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
https.get(url, function(responce) {
  console.log(responce.statusCode);

  responce.on("data", function(data) {
    const weatherData = JSON.parse(data)

    //console.log(weatherData);
    // const object = {
    //   name: "saurabh",
    //   favouriteFood: "maggie"
    // }
    // console.log(JSON.stringify(object));
    const temp = weatherData.main.temp
    const weatherDescription = weatherData.weather[0].description
    const icon = weatherData.weather[0].icon
    const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png"
    // console.log(weatherDescription);
    res.write("<p>The weather is currently " + weatherDescription + "</p>");
    res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius</h1>");
    res.write("<img src=" + imageURL + ">");
    res.send()
  })
})

//res.send("Server is up and running.");

//  console.log("Post request recieved.");
})


app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});

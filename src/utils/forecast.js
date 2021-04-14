const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const weatherStackAccessKey = "f729a6a94999bd0788765e79c089c31f";
  const url = `http://api.weatherstack.com/current?access_key=${weatherStackAccessKey}&query=${latitude + ',' + longitude}`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      let data = body.current;
      let forecastMessage = `It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees.`;
      callback(undefined, forecastMessage);
    }
  });
};

module.exports = forecast;
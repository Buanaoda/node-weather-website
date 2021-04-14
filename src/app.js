const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000; // Heroku port

// Define paths for exporess config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory path
app.use(express.static(path.join(publicDirectoryPath)));


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Joseph'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Joseph'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'If you want true help, pray the entire Rosary everyday.',
    title: 'Help',
    name: 'Joseph'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({error: "No address informed."})
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error: error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error: error });
      }
      res.send({
        location: location,
        forecastData: forecastData
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term."
    });
  }
  console.log(req.query);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('notFound', {
    title: '404',
    message: 'Article not found.',
    name: 'Joseph'
  })
});

app.get('*', (req, res) => {
  res.render('notFound', {
    title: '404',
    message: 'Page not found.',
    name: 'Joseph'
  })
});


// Listen Server
app.listen(port, () => {
  console.log('Serve up on port 3000.');
});
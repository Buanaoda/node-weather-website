const request = require('request');

const geocode = (address, callback) => {
  const geoCodeAccessToken = 'pk.eyJ1IjoiYnVhbmEiLCJhIjoiY2p6Y3E4dXdjMDhyYjNidGk4dzVoMjBscyJ9.bkC0CvdZ0djDJ1aYFp_ORA';
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${geoCodeAccessToken}&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to location services.');
    } else if (body.message === 'Not Found' || body.features.length === 0) {
      callback('Unable to find coordinates.');
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0]
      })
    }
  });
};

module.exports = geocode;
var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path');
    request = require('request'),
    db = require('./db/helper'),
    jwt = require('jwt-simple');


var public = path.join(__dirname + '/public/');

var app = express();

app.set('jwtTokenSecret', '53u37IF4d6SZZMOzygldjl9E2QOrIoZqzDdTFaH-7DJHoU5BVsOAURgaVADKzMQu');


app.use(bodyParser());
app.use(express.static(__dirname + '/public'));


app.get('/trip/:id', (req, res) => {
  if ( /^\d+$/.test(req.params.id) ) {
    res.sendFile(public + 'index.html');
  } else {
    res.redirect('/itineraries');
  }
});

app.get('/itineraries', (req, res) => {
  res.sendFile(public + 'index.html');
});





app.post('/submit_location', (req, res) => {
  // req.body === {
  //   itineraryId: 0,
  //   text: "google hq",
  //   date: "July 4th",
  //   time: "3pm"
  // };

  console.log(req.body);

  var propertiesObj = {
    address: req.body.text,
    key: process.env.GEOCODING_KEY
  };

  var params = {
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    qs: propertiesObj
  };

  request(params, function(err, response, body) {
    if (err) {
      console.log(err);
      res.end(err);
    } else {

      var results = JSON.parse( body ).results[0];

      if (results) {
        var args = [
          req.body.itineraryId,
          results.formatted_address,
          req.body.date,
          req.body.time,
          results.geometry.location.lat,
          results.geometry.location.lng,
        ];

        var responseObj = {
          location: results.formatted_address,
          visitDate: req.body.date,
          time: req.body.time,
          latitude: results.geometry.location.lat,
          longitude: results.geometry.location.lng
        };

        db.addLocation(...args, function() {});
        res.end( JSON.stringify(responseObj) );
      }
      res.end('broken');
    }
  });
});





app.post('/submit_itinerary', (req, res) => {
  // req.body === {
  //   name: 'trip name',
  //   start: 'start date',
  //   end: 'end date',
  //   user_id: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3hvc2suYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA4MzU4MTMyNzk4ODgxNzc2ODg4IiwiYXVkIjoieDdJdGk3MUpKVjZhcHBZN3BwT0w2WGFqaTFoSDRGbUIiLCJleHAiOjE0OTQzODM3OTMsImlhdCI6MTQ5NDM0Nzc5M30.piHQCL1aHMlzgTZGzdkzm1s3lOvmlisn036MZkOp0Xc'
  // }

  var decoded = jwt.decode( req.body.user_id, app.get('jwtTokenSecret'));

  db.addItinerary(req.body.name, req.body.start, req.body.end, decoded.sub, function(result) {
    res.end( JSON.stringify(result.dataValues) );
  });
});







app.post('/delete_location', (req, res) => {
  // req.body === {
  //   locationId: 87,
  //   itineraryId: 28,
  //   user_id: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3hvc2suYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA4MzU4MTMyNzk4ODgxNzc2ODg4IiwiYXVkIjoieDdJdGk3MUpKVjZhcHBZN3BwT0w2WGFqaTFoSDRGbUIiLCJleHAiOjE0OTQzODM3OTMsImlhdCI6MTQ5NDM0Nzc5M30.piHQCL1aHMlzgTZGzdkzm1s3lOvmlisn036MZkOp0Xc'
  // }

  var decoded = jwt.decode( req.body.user_id, app.get('jwtTokenSecret'));

  db.removeLocations(req.body.locationId, function() {});
  res.end();
});



app.post('/delete_itinerary', (req, res) => {
  // req.body === {
  //   itineraryId: 87,
  //   user_id: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3hvc2suYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA4MzU4MTMyNzk4ODgxNzc2ODg4IiwiYXVkIjoieDdJdGk3MUpKVjZhcHBZN3BwT0w2WGFqaTFoSDRGbUIiLCJleHAiOjE0OTQzODM3OTMsImlhdCI6MTQ5NDM0Nzc5M30.piHQCL1aHMlzgTZGzdkzm1s3lOvmlisn036MZkOp0Xc'
  // }

  var decoded = jwt.decode( req.body.user_id, app.get('jwtTokenSecret'));

  db.removeItinerary(req.body.itineraryId, function() {});
  res.end();
});








app.post('/location_by_coords', (req, res) => {
  // req.body === {
  //   latitude: 50.988888888,
  //   longitude: -5.888888888,
  // }

  var propertiesObj = {
    latlng: req.body.latitude + ',' + req.body.longitude,
    key: 'AIzaSyBZ8EbK7eX0twoYIy-wfONHc29fZJU3HV8'
  };

  var params = {
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    qs: propertiesObj
  };

  request(params, function(err, response, body) {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      var results = JSON.parse( body ).results[0];
      res.end(results.formatted_address);
    }
  });
});



app.get('/authorize_itinerary', (req, res) => {
  // req.query === {
  //   itineraryId: 0
  //   user_id: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3hvc2suYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA4MzU4MTMyNzk4ODgxNzc2ODg4IiwiYXVkIjoieDdJdGk3MUpKVjZhcHBZN3BwT0w2WGFqaTFoSDRGbUIiLCJleHAiOjE0OTQ2NTc5NjcsImlhdCI6MTQ5NDYyMTk2N30.5RV-p6uoysS-iGT5K4bsDqLoxYP-Xd2IkgHxnQ4_WFw"
  // }

  var decoded = jwt.decode( req.query.user_id, app.get('jwtTokenSecret'));

  db.authorizeItinerary(req.query.itineraryId, decoded.sub, function(result) {
    console.log('result', result);
    if (result.length) {
      res.end('true');
    } else {
      res.end('false');
    }
  });

});







app.get('/locations_for_itinerary', (req, res) => {
  // req.query === {
  //   itineraryId: 0
  // }

  db.getitineraryLocations(req.query.itineraryId, (result) => {
    var array = [];
    if (result.length) {
      for (var instance of result[0].dataValues.locations) {
        array.push(instance.dataValues);
      }
    }
    res.end( JSON.stringify(array) );
  });
});





app.get('/itineraries_for_user', (req, res) => {
  // req.query === {
  //   user_id: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3hvc2suYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA4MzU4MTMyNzk4ODgxNzc2ODg4IiwiYXVkIjoieDdJdGk3MUpKVjZhcHBZN3BwT0w2WGFqaTFoSDRGbUIiLCJleHAiOjE0OTQzODM3OTMsImlhdCI6MTQ5NDM0Nzc5M30.piHQCL1aHMlzgTZGzdkzm1s3lOvmlisn036MZkOp0Xc"
  // }

  var decoded = jwt.decode( req.query.user_id, app.get('jwtTokenSecret'));

  db.getUserItineraries(decoded.sub, (result) => {
    var array = [];
    if (result.length) {
      for (var itinerary of result) {
        array.push({
          id: itinerary.id,
          name: itinerary.name,
          start: itinerary.start,
          end: itinerary.end
        });
      }
    }
    res.end( JSON.stringify(array) );
  });
});



app.post('/login', (req, res) => {
  res.end();
});


app.get('*', (req, res) => {
  res.redirect('/itineraries');
});


module.exports = app;


var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path');
    request = require('request'),
    db = require('./db/helper');


var exec = require('child_process').exec;

exec('mysql -u root < db/script.sql');




// var viewPath = path.join(__dirname+'/public/views/');
var app = express();

app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});




// form should send request with text from an input element named 'text'
app.post('/submit_location', (req, res) => {
  // req.body === {
  //   itineraryId: 0,
  //   text: "google hq",
  //   date: "July 4th",
  //   time: "3pm"
  // };

  var propertiesObj = {
    address: req.body.text,
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


      // function(itineraryId, location, visitDate, time, longitude, latitude, callback)
      var args = [
        req.body.itineraryId,
        results.formatted_address,
        req.body.date,
        req.body.time,
        results.geometry.location.lat,
        results.geometry.location.lng,
      ];

      console.log(args);

      var responseObj = {
        location: results.formatted_address,
        visitDate: req.body.date,
        time: req.body.time,
        latitude: results.geometry.location.lat,
        longitude: results.geometry.location.lng,
        placeID: results.place_id
      };

      db.addLocation(...args, function() {});

      res.end( JSON.stringify(responseObj) );

    }
  });
});





app.post('/submit_itinerary', (req, res) => {
  // req.body === {
  //   name: 'trip name',
  //   start: 'start date',
  //   end: 'end date',
  //   userID: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3hvc2suYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA4MzU4MTMyNzk4ODgxNzc2ODg4IiwiYXVkIjoieDdJdGk3MUpKVjZhcHBZN3BwT0w2WGFqaTFoSDRGbUIiLCJleHAiOjE0OTQzODM3OTMsImlhdCI6MTQ5NDM0Nzc5M30.piHQCL1aHMlzgTZGzdkzm1s3lOvmlisn036MZkOp0Xc'
  // }




  // input(name, start, end, userId, callback)
  db.addItinerary(req.body.name, req.body.start, req.body.end, req.body.userId, function() {
    res.end('itinerary created');
  });



});






app.get('/locations_for_itinerary', (req, res) => {
  // req.query === {
  //   itineraryId: 0
  // }

  console.log(req.query.itineraryId);

  db.getitineraryLocations(req.query.itineraryId, (result) => {
    res.end( JSON.stringify(result) );
  });


  // ------------- dummy data -------------
  // res.end( JSON.stringify( [ {
  //   location: "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
  //   visitDate: "July 4th",
  //   id: 1,
  //   latitude: 37.421999,
  //   longitude: -122.0840575
  // },
  // {
  //   location: "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
  //   visitDate: "July 4th",
  //   id: 2,
  //   latitude: 33.421999,
  //   longitude: -122.0840575
  // },
  // {
  //   location: "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
  //   visitDate: "July 4th",
  //   id: 3,
  //   latitude: 51.421999,
  //   longitude: -122.0840575
  // } ]));
  // ---------------------------------------



});




app.post('/login', (req, res) => {
  // req.body === {
  //   user_id: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3hvc2suYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA4MzU4MTMyNzk4ODgxNzc2ODg4IiwiYXVkIjoieDdJdGk3MUpKVjZhcHBZN3BwT0w2WGFqaTFoSDRGbUIiLCJleHAiOjE0OTQzODM3OTMsImlhdCI6MTQ5NDM0Nzc5M30.piHQCL1aHMlzgTZGzdkzm1s3lOvmlisn036MZkOp0Xc"
  // }

  console.log('/login', req.body);
  db.getUserItineraries(req.body.user_id, (res) => {
    if (!res.length) {
      db.addItinerary(req.body.name, req.body.start, req.body.end, req.body.userId, function() {
        res.end('itinerary created for new user');
      });
    }
  });
});





app.post('/signup', (req, res) => {
  console.log('/signup', req.body);
  // res.end();
});



module.exports = app;
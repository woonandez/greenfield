var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path');
    request = require('request'),
    db = require('./db/helper'),
    jwt = require('jwt-simple');


var public = path.join(__dirname + '/public/');


// var viewPath = path.join(__dirname+'/public/views/');
var app = express();

// app.use(jwt({
//   secret: '53u37IF4d6SZZMOzygldjl9E2QOrIoZqzDdTFaH-7DJHoU5BVsOAURgaVADKzMQu'
// }));




app.set('jwtTokenSecret', '53u37IF4d6SZZMOzygldjl9E2QOrIoZqzDdTFaH-7DJHoU5BVsOAURgaVADKzMQu');

// Inside of GET route for login:








app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

// app.get('/', (req, res) => {
//   res.redirect('/current');
// });



app.get('/trip/*', (req, res) => {
  console.log(req, public, '\n\n');
  res.sendFile(public + 'index.html');
});

// app.get('/trip', (req, res) => {
//   console.log(public);
//   res.sendFile(public + 'index.html');
// });

app.get('/itineraries', (req, res) => {
  res.sendFile(public + 'index.html');
});






// form should send request with text from an input element named 'text'
app.post('/submit_location', (req, res) => {
  // req.body === {
  //   itineraryId: 0,
  //   text: "google hq",
  //   date: "July 4th",
  //   time: "3pm"
  // };


  // console.log(process.env);


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





app.post('/location_by_coords', (req, res) => {

  // latlng
  console.log(req.body);

  var propertiesObj = {
    latlng: req.body.latitude + ',' + req.body.longitude,
    key: 'AIzaSyBZ8EbK7eX0twoYIy-wfONHc29fZJU3HV8'
  };
  console.log(propertiesObj);

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


// /my_itinerary
// /current_itinerary






app.post('/submit_itinerary', (req, res) => {
  // req.body === {
  //   name: 'trip name',
  //   start: 'start date',
  //   end: 'end date',
  //   user_id: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3hvc2suYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA4MzU4MTMyNzk4ODgxNzc2ODg4IiwiYXVkIjoieDdJdGk3MUpKVjZhcHBZN3BwT0w2WGFqaTFoSDRGbUIiLCJleHAiOjE0OTQzODM3OTMsImlhdCI6MTQ5NDM0Nzc5M30.piHQCL1aHMlzgTZGzdkzm1s3lOvmlisn036MZkOp0Xc'
  // }

  var decoded = jwt.decode( req.body.user_id, app.get('jwtTokenSecret'));
  console.log("DECODED", decoded.sub);

  // console.log(req.body.userID)

  // input(name, start, end, userId, callback)
  db.addItinerary(req.body.name, req.body.start, req.body.end, decoded.sub, function(result) {
    console.log('RESULT', result.dataValues);
    res.end( JSON.stringify(result.dataValues) );
  });
});








app.get('/locations_for_itinerary', (req, res) => {
  // req.query === {
  //   itineraryId: 0
  // }

  console.log('query: ', req.query);


  db.getitineraryLocations(req.query.itineraryId, (result) => {
    // console.log('result: ', result[0].dataValues.locations);



    var array = [];

    if (result.length) {
      for (var instance of result[0].dataValues.locations) {
        array.push(instance.dataValues);
      }
    }


    console.log('result: ', array);

    res.end( JSON.stringify(array) );
  });
});





app.get('/itineraries_for_user', (req, res) => {
  // req.query === {
  //   user_id: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3hvc2suYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA4MzU4MTMyNzk4ODgxNzc2ODg4IiwiYXVkIjoieDdJdGk3MUpKVjZhcHBZN3BwT0w2WGFqaTFoSDRGbUIiLCJleHAiOjE0OTQzODM3OTMsImlhdCI6MTQ5NDM0Nzc5M30.piHQCL1aHMlzgTZGzdkzm1s3lOvmlisn036MZkOp0Xc"
  // }

  console.log('query: ', req.query);

  var decoded = jwt.decode( req.query.user_id, app.get('jwtTokenSecret'));
  console.log(decoded);

  db.getUserItineraries(decoded.sub, (result) => {
    var array = [];
    if (result.length) {
      for (var itinerary of result) {
        array.push({
          id: itinerary.id,
          name: itinerary.name,
          start: itinerary.start,
          end: itinerary.end
          // locations: itinerary.locations
        });
      }
    }
    res.end( JSON.stringify(array) );
  });
});



app.post('/login', (req, res) => {
  // req.body === {
  //   user_id: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3hvc2suYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA4MzU4MTMyNzk4ODgxNzc2ODg4IiwiYXVkIjoieDdJdGk3MUpKVjZhcHBZN3BwT0w2WGFqaTFoSDRGbUIiLCJleHAiOjE0OTQzODM3OTMsImlhdCI6MTQ5NDM0Nzc5M30.piHQCL1aHMlzgTZGzdkzm1s3lOvmlisn036MZkOp0Xc"
  // }

  // console.log('\nUSERID', req.body.user_id);

  var decoded = jwt.decode( req.body.user_id, app.get('jwtTokenSecret'));
  console.log(decoded.sub);

  // db.getUserItineraries(req.body.user_id, (result) => {

  //   console.log('USERid: ', req.body.user_id);
  //   if (!result.length) {
  //     db.addItinerary("default", "start", "end", decoded.sub, function(result) {
  //       // console.log("result: ", result.dataValues.id);
  //       res.end( JSON.stringify(result.dataValues.id) );
  //     });
  //   } else {
  //     res.end( JSON.stringify(result[0].dataValues.id) );
  //   }
  // });
});


app.post('/login', (req, res) => {
  console.log('/login', req.body);
  res.end();
});




app.post('/signup', (req, res) => {
  console.log('/signup', req.body);
  // res.end();
});


app.get('*', (req, res) => {
  res.redirect('/itineraries');
});


module.exports = app;


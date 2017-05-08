var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path');
    request = require('request');


var exec = require('child_process').exec;

exec('mysql -u root < db/script.sql');



// var mysql = require('mysql');

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'piranha'
// });





// var viewPath = path.join(__dirname+'/public/views/');
var app = express();

app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});




// form should send request with text from an input element named 'text'
app.post('/submit_location', (req, res) => {

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
      var returnObj = {
        location: results.formatted_address,
        coordinates: results.geometry.location,
        placeID: results.place_id
      };


      res.end( JSON.stringify(returnObj) );
    }
  });
});


app.get('/locations_for_itinerary', (req, res) => {
  console.log(req.query.itineraryId);
  res.end( JSON.stringify( [ {
    // location: "804 Corona Rd, Petaluma, CA 94954, USA",
    // visitDate: "July 4th",
    id: 1,
    latitude: 38.277942,
    longitude: -122.643732
  },
  {
    // location: "804 Corona Rd, Petaluma, CA 94954, USA",
    // visitDate: "July 4th",
    id: 2,
    latitude: 30.277942,
    longitude: -122.643732
  },
  {
    // location: "804 Corona Rd, Petaluma, CA 94954, USA",
    // visitDate: "July 4th",
    id: 3,
    latitude: 35.277942,
    longitude: -122.643732
  } ]));
  // connection.query(`SELECT * FROM locations WHERE user = ${req.body.itineraryId}`, function(error, results, fields) {
  //   if (error) { throw error; }
  //   console.log(results);
  // });
});

app.post('/login', (req, res) => {
  console.log(req.body);
  // res.end();
  // connection.query(`SELECT * FROM locations WHERE user = ${req.body.itineraryId}`, function(error, results, fields) {
  //   if (error) { throw error; }
  //   console.log(results);
  // });
});




module.exports = app;
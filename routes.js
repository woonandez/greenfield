var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path');
    request = require('request');


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
      res.end( JSON.stringify( JSON.parse( body ).results ) );
    }
  });
});



module.exports = app;
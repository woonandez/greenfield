var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path');


// var viewPath = path.join(__dirname+'/public/views/');
var app = express();

app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.post('/submit_location', (req, res) => {
  res.end('location placeholder');
});



module.exports = app;
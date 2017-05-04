var express = require('express'),
    bodyParser = require('body-parser');



var app = express();

app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

module.exports = app;
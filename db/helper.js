var model = require('./model.js');

var addItinerary = function(name, start, end, userId, callback) {

  model.itineraries.create({
    name: name,
    start: start,
    end: end,
    userId: userId
  }).then(function(result) {
    callback(result);
  });

}

var addLocation = function(itineraryId, location, visitDate, time, longitude, latitude, callback) {

  model.locations.create({
    location: location,
    visitDate: visitDate,
    time: time,
    longitude: longitude,
    latitude: latitude,
    id_itineraries: itineraryId
  }).then(function(result) {
    callback(result);
  });

}

var getUserItineraries = function(userId, callback) {

  model.itineraries.findAll({
    where: {
      userId: userId
    },
    include: [{
      model: model.locations
    }]
  }).then(function(result) {
    callback(result);
  })

}

var getitineraryLocations = function(itineraryId, callback) {

  model.itineraries.findAll({

    include: [{
      model: model.locations,
      where: {id_itineraries: itineraryId}
    }]
  }).then(function(result) {
    callback(result);
  })

}

var addEvents = function(location, time, description, callback) {

  model.events.create({
    location: location,
    time: time,
    description: description
  }).then(function(result) {
    callback(result);
  });
}

var getLocationsEvents = function(locationId, callback) {
  model.locations.findAll({
    include: [{
      model: model.events,
      where: {id_locations: locationId}
    }]
  }).then(function(result) {
    callback(result);
  });
}

var removeEvents = function(locationsId) {
  model.events.destroy({
    where: {
      id_locations: locationsId
    }
  })
}
var removeLocations = function(locationId, callback) {
  model.locations.destroy({
    where: {
      id: locationId
    }
  }).then(function() {
    callback();
  });
}

var removeItinerary = function(itineraryId, callback) {
  model.locations.destroy({
    where: {
      id_itineraries: itineraryId
    }
  }).then(function() {
    model.itineraries.destroy({
      where: {
        id: itineraryId
      }
    })
  }).then(function() {
    callback();
  });
}

module.exports.addItinerary = addItinerary;
module.exports.addLocation = addLocation;
module.exports.getUserItineraries = getUserItineraries;
module.exports.getitineraryLocations  = getitineraryLocations;
module.exports.addEvents = addEvents;
module.exports.getLocationsEvents = getLocationsEvents;
module.exports.removeEvents = removeEvents;
module.exports.removeLocations = removeLocations;
module.exports.removeItinerary = removeItinerary;

// var x = {"name":"trip name","start":"start date","end":"end date","userID":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3hvc2suYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA4MzU4MTMyNzk4ODgxNzc2ODg4IiwiYXVkIjoieDdJdGk3MUpKVjZhcHBZN3BwT0w2WGFqaTFoSDRGbUIiLCJleHAiOjE0OTQzODM3OTMsImlhdCI6MTQ5NDM0Nzc5M30.piHQCL1aHMlzgTZGzdkzm1s3lOvmlisn036MZkOp0Xc"};
//var x = {"name":"trip asdf","start":"start asdf","end":"end asdf","userID":1};
// addItinerary(x.name, x.start, x.end, x.userID, () => console.log('success'));

// addLocation(1, "some location", "june 123rd", "4pm", 123.22, -123.222222222222, () => console.log('success'));




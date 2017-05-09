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





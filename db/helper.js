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

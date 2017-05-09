var Sequelize = require('sequelize');
var sequelize = new Sequelize('piranha', 'root', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
  });

var itineraries = sequelize.define('itineraries', {
  name: Sequelize.TEXT,
  start: Sequelize.TEXT,
  end: Sequelize.TEXT,
  userId: Sequelize.TEXT
})

var locations = sequelize.define('locations', {
  location: Sequelize.STRING,
  visitDate: Sequelize.TEXT,
  time: Sequelize.TEXT,
  longitude: Sequelize.DOUBLE,
  latitude: Sequelize.DOUBLE
});

var events = sequelize.define('events', {
  location: Sequelize.STRING,
  time: Sequelize.TEXT,
  description: Sequelize.TEXT
});


itineraries.hasMany(locations, {foreignKey: 'id_itineraries'});
locations.hasMany(events, {foreignKey: 'id_locations'})

itineraries.sync();
locations.sync();
events.sync();

module.exports.itineraries = itineraries;
module.exports.locations = locations;
module.exports.events = events;


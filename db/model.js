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
  userId: Sequelize.INTEGER
})

var locations = sequelize.define('locations', {
  location: Sequelize.STRING,
  visitDate: Sequelize.TEXT,
  time: Sequelize.TEXT,
  longitude: Sequelize.DOUBLE,
  latitude: Sequelize.DOUBLE
});

itineraries.hasMany(locations, {foreignKey: 'id_itineraries'});

itineraries.sync();
locations.sync();

module.exports.itineraries = itineraries;
module.exports.locations = locations;

var Sequelize = require('sequelize');
var sequelize = new Sequelize('piranha', 'root', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
  });

var itineraries = sequelize.define('itineraries', {
  name: Sequelize.STRING,
  start: Sequelize.DATE,
  end: Sequelize.DATE,
  userId: Sequelize.INTEGER
})

var locations = sequelize.define('locations', {
  location: Sequelize.STRING,
  vistDate: Sequelize.DATE,
  longitude: Sequelize.DOUBLE,
  latitude: Sequelize.DOUBLE
});

itineraries.hasMany(locations, {foreignKey: 'id_itineraries'});

itineraries.sync();
locations.sync();

module.exports.itineraries = itineraries;
module.exports.locations = locations;

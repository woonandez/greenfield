var server = require('./routes.js');
var exec = require('child_process').exec;

exec('mysql -u root < db/script.sql');

server.listen(8000, function() {
  console.log('Server is listening on 8000');
});
var mongoose = require('mongoose');
var dbUrl = 'mongodb://timi:timi@ds011331.mlab.com:11331/heroku_zrp33cvm';
mongoose.connect(dbUrl);

//Close the Mongoose connection Control + C
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected');
        process.exit(0);
    });
});

require('../models/employee');
require('../models/team');
//var dbUrl = 'mongodb://timi:timi@ds011331.mlab.com:11331/heroku_zrp33cvm' || 'mongodb://localhost:27017/hrm';
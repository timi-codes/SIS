var mongoose = require('mongoose');
var dbUrl = 'mongodb://heroku_3hqzzjp1:rq4gru3kbpaqhjige75li2kb30@ds149495.mlab.com:49495/heroku_3hqzzjp1';
mongoose.connect(dbUrl);

//Close the Mongoose connection Control + C
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected');
        process.exit(0);
    });
});

require('../models/student');
require('../models/department');
//var dbUrl = 'mongodb://timi:timi@ds011331.mlab.com:11331/heroku_zrp33cvm' || 'mongodb://localhost:27017/hrm';
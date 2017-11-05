var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sis', function(err) {
    if (err) {
        console.log("Not connected to the database: " + err);
    } else {
        console.log("Succesfully connected to MongoDB");
    }
});

//Close the Mongoose connection Control + C
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected');
        process.exit(0);
    });
});

require('../models/student');
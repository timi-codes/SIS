var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
require('./lib/connection');
var students = require('./routes/students');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(logger('dev'));
app.use(students);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/home.html'));
});

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
    console.log('Running the server at port ' + server.address().port);
});
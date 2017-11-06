var express = require('express');
var mongoose = require('mongoose');
var Student = mongoose.model('Student');
var Department = mongoose.model('Department');

var router = express.Router();

router.get('/students', function(req, res, next) {
    Student.find().sort('name.last').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

router.get('/students/:studentId', function(req, res, next) {
    Student.findOne({
        id: req.params.studentId
    }).populate('department').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // If valid user was not found, send 404
        if (!results) {
            res.send(404);
        }
        // Respond with valid data
        res.json(results);
    });
});

router.put('/students/:studentId', function(req, res, next) {
    // Remove this or mongoose will throw an error
    // because we would be trying to update the mongo ID
    delete req.body._id;
    req.body.department = req.body.department._id;
    Student.update({
        id: req.params.studentId
    }, req.body, function(err, numberAffected, response) {
        if (err) {
            throw err;
        }
        res.send(200);
    });
});

router.post('/students', function(req, res, next) {

    var newstudent = new Student({
        id: '1000028',
        name: {
            first: req.body.first,
            last: req.body.last
        }
    });

    newstudent.save(function(error, data) {
        if (error) {
            return next(error);
        }
        res.send(data);
    });

});

router.delete('/students/:studentId', function(req, res, next) {
    Student.remove({ 'id': req.params.studentId }, function(error, data) {
        if (error) {
            return next(error);
        }
        next();
    });
}, function(req, res, next) {
    Student.find().exec(function(error, results) {
        if (error) {
            return next(error);
        }
        res.send(results);
    });
});

module.exports = router;
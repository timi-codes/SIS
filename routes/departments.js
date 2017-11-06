var express = require('express');
var mongoose = require('mongoose');
var Team = mongoose.model('Department');
var router = express.Router();

router.get('/departments', function(req, res, next) {
    Team.find().sort('name').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

router.get('/departments/:departmentId', function(req, res, next) {
    Team.findOne({
        _id: req.params.teamId
    }, function(error, results) {
        if (error) {
            return next(error);
        }
        res.json(results);
    });
});

module.exports = router;
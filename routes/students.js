var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Student = mongoose.model('Student');

/* GET users listing. */
router.post('/students', function(req, res, next) {
    var student = new Student();
    student.matric_no = req.body.matric_no;
    student.name.first = req.body.firstname;
    student.name.last = req.body.lastname;
    student.email = req.body.email;
    student.phone = req.body.phone;
    student.level = req.body.level;
    student.gpa = req.body.gpa;

    if (req.body.matric_no == null || req.body.matric_no == '') {
        res.end('matric no is missing!');
    } else if (req.body.firstname == null || req.body.firstname == '') {
        res.end('firstname is missing!');
    } else if (req.body.lastname == null || req.body.lastname == '') {
        res.end('lastname is missing!');
    } else if (req.body.email == null || req.body.email == '') {
        res.end('email is missing!');
    } else if (req.body.phone == null || req.body.phone == '') {
        res.end('phone no is missing!');
    } else if (req.body.level == null || req.body.level == '') {
        res.end('level is missing!');
    } else if (req.body.gpa == null || req.body.gpa == '') {
        res.end('gpa is missing!');
    } else {
        student.save(function(err) {
            if (err) {
                res.send('matric no already exist!');
            } else {
                res.send('user created!')
            }
        });
    }
});

module.exports = router;
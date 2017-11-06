var async = require('async');
var mongoose = require('mongoose');
require(process.cwd() + '/lib/connection');

var Student = mongoose.model('Student');
var Department = mongoose.model('Department');

var data = {
    students: [{
            id: '1000003',
            name: {
                first: 'Tejumola',
                last: 'David'
            },
            image: 'images/students/1000003.png',
            address: {
                lines: ['11 Wall Street'],
                city: 'New York',
                state: 'NY',
                zip: 10118
            }
        },
        {
            id: '1000021',
            name: {
                first: 'Adam',
                last: 'Bretz'
            },
            address: {
                lines: ['46 18th St', 'St. 210'],
                city: 'Pittsburgh',
                state: 'PA',
                zip: 15222
            }
        },
        {
            id: '1000022',
            name: {
                first: 'Matt',
                last: 'Liegey'
            },
            address: {
                lines: ['2 S Market Square', '(Market Square)'],
                city: 'Pittsburgh',
                state: 'PA',
                zip: 15222
            }
        },
        {
            id: '1000025',
            name: {
                first: 'Aleksey',
                last: 'Smolenchuk'
            },
            image: 'images/students/1000025.png' /* invalid image */ ,
            address: {
                lines: ['3803 Forbes Ave'],
                city: 'Pittsburgh',
                state: 'PA',
                zip: 15213
            }
        },
        {
            id: '1000030',
            name: {
                first: 'Sarah',
                last: 'Gay'
            },
            address: {
                lines: ['8651 University Blvd'],
                city: 'Pittsburgh',
                state: 'PA',
                zip: 15108
            }
        },
        {
            id: '1000031',
            name: {
                first: 'Dave',
                last: 'Beshero'
            },
            address: {
                lines: ['1539 Washington Rd'],
                city: 'Mt Lebanon',
                state: 'PA',
                zip: 15228
            }
        }
    ],
    departments: [{
        name: 'Software and Services Group'
    }, {
        name: 'Project Development'
    }]
};


var deleteStudents = function(callback) {
    console.info('Deleting students');
    Student.remove({}, function(error, response) {
        if (error) {
            console.error('Error deleting students: ' + error);
        }
        console.info('Done deleting students');
        callback();
    });
};


var addStudents = function(callback) {
    console.info('Adding students');
    Student.create(data.students, function(error) {
        if (error) {
            console.error('Error: ' + error);
        }
        console.info('Done adding students');
        callback();
    });
};


var deleteDepartments = function(callback) {
    console.info('Deleting departments');
    Department.remove({}, function(error, response) {
        if (error) {
            console.error('Error deleting departments: ' + error);
        }
        console.info('Done deleting departments');
        callback();
    });
};


var addDepartments = function(callback) {
    console.info('Adding departments');
    Department.create(data.departments, function(error, department1) {
        if (error) {
            console.error('Error: ' + error);
        } else {
            data.department_id = department1._id;
        }
        console.info('Done adding departments');
        callback();
    });
};


var updateStudentDepartments = function(callback) {
    console.info('Updating student departments');
    var department = data.departments[0];
    // Set everyone to be on the same department to start
    Student.update({}, {
        department: data.department_id
    }, {
        multi: true
    }, function(error, numberAffected, response) {
        if (error) {
            console.error('Error updating student department: ' + error);
        }
        console.info('Done updating student departments');
        callback();
    });
};

async.series([
    deleteStudents,
    deleteDepartments,
    addStudents,
    addDepartments,
    updateStudentDepartments
], function(error, results) {
    if (error) {
        console.error('Error: ' + error);
    }
    mongoose.connection.close();
    console.log('Done!');
});
var mongoose = require('mongoose');
var postFind = require('mongoose-post-find');
var async = require('async');
var Schema = mongoose.Schema;
var DepartmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    members: {
        type: [Schema.Types.Mixed]
    }
});

function _attachMembers(Student, result, callback) {
    Student.find({
        department: result._id
    }, function(error, students) {
        if (error) {
            return callback(error);
        }
        result.members = students;
        callback(null, result);
    });
}

// listen for find and findOne
DepartmentSchema.plugin(postFind, {
    find: function(result, callback) {
        var Student = mongoose.model('Student');
        async.each(result, function(item, callback) {
            _attachMembers(Student, item, callback);
        }, function(error) {
            if (error) {
                return callback(error);
            }
            callback(null, result)
        });
    },
    findOne: function(result, callback) {
        var Student = mongoose.model('Student');
        _attachMembers(Student, result, callback);
    }
});

module.exports = mongoose.model('Department', DepartmentSchema);
var mongoose = require('mongoose');

var Scheme = mongoose.Schema;

var StudentSchema = new Scheme({
    matric_no: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    deparment: {
        type: Scheme.Types.ObjectId,
        ref: 'Department'
    },
    level: {
        type: Number,
        required: true
    },
    gpa: {
        type: Number
    },
    image: {
        type: String,
        default: 'images/user.png'
    },
    address: {
        lines: {
            type: [String]
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        zip: {
            type: Number
        }
    }
});

module.exports = mongoose.model('Student', StudentSchema);
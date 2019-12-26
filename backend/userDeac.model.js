const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserDeac = new Schema ({
    FirstName : {
        type : String
    },

    LastName : {
        type : String
    },

    Email : {
        type : String
    },

    NIC : {
        type : String
    },

    DeacDate : {
        type : Date
    }
}, {
    collection : 'DeactivatedUsers'
});

module.exports = mongoose.model('UserDeac', UserDeac);
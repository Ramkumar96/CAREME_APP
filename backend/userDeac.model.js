const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserDeac = new Schema ({
    FirstName : {
        type : String
    },

    LastName : {
        type : String
    },

    nurseID : {
        type : Number 
    },

    Home : {
        type : String
    },

    PW : {
        type : String
    },

    CPW : {
        type : String
    },

    Email : {
        type : String
    },

    NIC : {
        type : String
    },

    Tel : {
        type : Number
    },

    userID : {
        type : Number
    },

    RegDate : {
        type : Date
    },

    DeacDate : {
        type : Date
    }
}, {
    collection : 'DeactivatedUsers'
});

module.exports = mongoose.model('UserDeac', UserDeac);
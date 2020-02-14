const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Complaint = new Schema({
    accusedBy: {
        type: String
    },

    accusedByFName: {
        type: String
    },

    accusedByLName: {
        type: String
    },

    accusedUser: {
        type: String
    },

    accusedUserFName: {
        type: String
    },

    accusedUserLName: {
        type: String
    },

    accusedByID: {
        type: Number
    },

    accusedUserID: {
        type: Number
    },

    complaint: {
        type: String
    },

    complainedDate: {
        type: Date
    }
},{
    collection: 'Complaints'
});

module.exports = mongoose.model('Complaint', Complaint);
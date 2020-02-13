const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserRequest = new Schema({
    RequestedClient: {
        type: String
    },

    RequestedByClientID: {
        type: String
    },

    RequestedClientLocation:{
        type: String
    },

    RequestedNurse: {
        type: String
    },

    RequestedNurseID: {
        type: String
    },

    RequestedDate: {
        type: Date
    }
},{
    collection: 'UserRequest'
});

module.exports = mongoose.model('UserRequest', UserRequest);
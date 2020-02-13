const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserAccept = new Schema({
    AcceptedClient: {
        type: String
    },

    AcceptedClientID: {
        type: String
    },

    AcceptedClientLocation:{
        type: String
    },

    AcceptedByNurse: {
        type: String
    },

    AcceptedByNurseID: {
        type: String
    },

    AcceptedDate: {
        type: Date
    }
},{
    collection: 'UserAccept'
});

module.exports = mongoose.model('UserAccept', UserAccept);
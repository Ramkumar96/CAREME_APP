const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserRequestDeleted = new Schema({

    DeletedRequestedClient: {
        type: String
    },

    DeletedRequestedByClientID: {
        type: String
    },

    DeletedRequestedClientLocation:{
        type: String
    },

    DeletedRequestedNurse: {
        type: String
    },

    DeletedRequestedNurseID: {
        type: String
    },

    DeletedRequestedDate: {
        type: Date
    }
},{
    collection: 'UserRequestDeleted'
});

module.exports = mongoose.model('UserRequestDeleted', UserRequestDeleted);
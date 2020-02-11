const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Messaging = new Schema({
    messageClient: {
        type: String
    },

    clientStatus: {
        type: Boolean
    },

    messageNurse: {
        type: String
    },
    
    nurseStatus: {
        type: Boolean
    },

    message: {
        type: String
    },

    messageDate: {
        type: Date
    }
},{
    collection: 'Messages'
});

module.exports = mongoose.model('Messages', Messaging);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Messaging = new Schema({
    senderEmail: {
        type: String
    },

    receiverEmail: {
        type: String
    },
    
    receiverStatus: {
        type: Boolean
    },

    message: {
        type: String
    },

    messageDate: {
        type: Date
    }
},{
    collection: 'Messaging'
});

module.exports = mongoose.model('Messaging', Messaging);
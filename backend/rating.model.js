const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserRating = new Schema({
    RatedBy: {
        type: String
    },

    RatedUser: {
        type: String
    },

    Rating: {
        type: Number
    },

    RatedDate: {
        type: Date
    }
},{
    collection: 'UserRating'
});

module.exports = mongoose.model('UserRating', UserRating);
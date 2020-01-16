const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserReview = new Schema({
    ReviewBy: {
        type: String
    },

    ReviewedUser: {
        type: String
    },

    Review: {
        type: String
    },

    ReviewDate: {
        type: Date
    }
},{
    collection: 'UserReview'
});

module.exports = mongoose.model('UserReview', UserReview);
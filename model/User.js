const mongoose = require('mongoose');
const ObjectIdType = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
    restaurantIds: {
        type: [ObjectIdType]
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('User', userSchema);
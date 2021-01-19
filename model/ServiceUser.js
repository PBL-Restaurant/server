const mongoose = require('mongoose');
const ObjectIdType = mongoose.Schema.Types.ObjectId;

const serviceUserSchema = new mongoose.Schema({
    userId: {
        type: ObjectIdType,
        required: true
    },
    restaurantId: {
        type: ObjectIdType,
        required: true
    },
    type: {
        type: Number,
        required: true,
        min: 0
    }
});

module.exports = mongoose.model('ServiceUser', serviceUserSchema);

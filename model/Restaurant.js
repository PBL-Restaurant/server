const mongoose = require('mongoose');
const ObjectIdType = mongoose.Schema.Types.ObjectId;

const restaurantSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 255
    },
    menu: {
        type: [ObjectIdType]
    },
    room: {
        type: [ObjectIdType]
    }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);

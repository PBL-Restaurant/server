const mongoose = require('mongoose');
const ObjectIdType = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
    items: {
        type: [ObjectIdType]
    },
    itemCount: {
        type: [Number]
    },
    itemStatus: {
        type: [Number]
    },
    restaurantId: {
        type: ObjectIdType
    },
    roomId: {
        type: ObjectIdType
    },
    userId: {
        type: ObjectIdType
    },
    active: {
        type: Boolean,
        default: false
    },
    done: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Order', orderSchema);

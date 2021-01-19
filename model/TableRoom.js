const mongoose = require('mongoose');
const ObjectIdType = mongoose.Schema.Types.ObjectId;

const tableRoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 255
    },
    users: {
        type: [ObjectIdType]
    },
    password: {
        type: String,
        min: 4,
        max: 4,
    },
    booked: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model('TableRoom', tableRoomSchema);

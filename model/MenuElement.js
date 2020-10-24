const mongoose = require('mongoose');

const menuElementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 255
    },
    description: {
        type: String,
        required: true,
        max: 1024
    },
    image: {
        type: String,
        required: true,
        max: 255
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
});

module.exports = mongoose.model('MenuElement', menuElementSchema);

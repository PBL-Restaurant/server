const User = require('../model/User');
const Restaurant = require('../model/Restaurant');
const MenuElement = require('../model/MenuElement');
const TableRoom = require('../model/TableRoom');

async function verifyContainsRestaurant(req) {
    const user = await User.findOne({
        _id: req.user._id
    });

    const restaurantId = req.body.restaurantId;
    return user.restaurantIds.includes(restaurantId);
}

async function getRestaurant(restaurantId) {
    let restaurant = await Restaurant.findOne({
        _id: restaurantId
    });

    if (!restaurant) {
        return null;
    }

    const menuElementIds = restaurant.menu;
    const menuElements = [];
    for (let j = 0; j < menuElementIds.length; j++) {
        let menuElementId = menuElementIds[j];
        let menuElement = await MenuElement.findOne({
            _id: menuElementId
        });

        menuElements.push({
            "_id": menuElement._id,
            "image": menuElement.image,
            "title": menuElement.title,
            "description": menuElement.description,
            "price": menuElement.price
        });
    }

    const tableRoomIds = restaurant.room;
    const tableRooms = [];
    for (let j = 0; j < tableRoomIds.length; j++) {
        let tableRoomId = tableRoomIds[j];
        let tableRoom = await TableRoom.findOne({
            _id: tableRoomId
        });

        tableRooms.push({
            "_id": tableRoom._id,
            "booked": tableRoom.booked,
            "users": tableRoom.users
        });
    }

    return {
        "_id": restaurant._id,
        "title": restaurant.title,
        "menu": menuElements,
        "room": tableRooms
    }
}

module.exports = { verifyContainsRestaurant, getRestaurant };

const User = require('../model/User');
const Restaurant = require('../model/Restaurant');
const MenuElement = require('../model/MenuElement');
const TableRoom = require('../model/TableRoom');
const ServiceUser = require('../model/ServiceUser');

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

    const servicesIds = restaurant.service;
    const services = [];
    for (let j = 0; j < servicesIds.length; j++) {
        let serviceUser = await ServiceUser.findOne({
            _id: servicesIds[j]
        });

        services.push({
            "_id": serviceUser._id,
            "userId": serviceUser.userId,
            "type": serviceUser.type
        });
    }

    return {
        "_id": restaurant._id,
        "title": restaurant.title,
        "menu": menuElements,
        "room": tableRooms,
        "service": services
    }
}

async function verifyContainsServiceUser(req) {
    const user = await User.findOne({
        _id: req.user._id
    });

    const restaurantId = req.body.restaurantId;
    return user.restaurantIds.includes(restaurantId);

    let restaurant = await Restaurant.findOne({
        _id: req.body.restaurantId
    });

    let isServiceUser = false;
    for (let i = 0; i < restaurant.service.length; i++) {
        let service = await ServiceUser.findOne({
            _id: restaurant.service[i]
        });

        if (service.userId == req.user._id) {
            isServiceUser = true;
            break;
        }
    }

    return isServiceUser;
}

module.exports = { verifyContainsRestaurant, getRestaurant, verifyContainsServiceUser };

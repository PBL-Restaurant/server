const User = require('../model/User');
const Restaurant = require('../model/Restaurant');
const MenuElement = require('../model/MenuElement');

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

    return {
        "_id": restaurant._id,
        "title": restaurant.title,
        "menu": menuElements
    }
}

module.exports = { verifyContainsRestaurant, getRestaurant };

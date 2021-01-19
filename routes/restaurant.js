const router = require('express').Router();
const Restaurant = require('../model/Restaurant');
const MenuElement = require('../model/MenuElement');
const User = require('../model/User');
const verifyToken = require('./verifyToken');
const { getRestaurant } = require('./verifyRestaurant');

router.post('/create', verifyToken, async (req, res) => {
    const restaurant = new Restaurant({
        title: req.body.title
    });

    const user = await User.findOne({
        _id: req.user._id
    });

    try {
        user.restaurantIds.push(restaurant);
        await restaurant.save();
        await user.save();
        res.send({
            restaurant: restaurant._id,
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/remove', verifyToken, async (req, res) => {
    const user = await User.findOne({
        _id: req.user._id
    });

    if (!user.restaurantIds.includes(req.body.restaurantId)) {
        return res.status(400).send('Restaurant is wrong.');
    }

    try {
        const restaurant = await Restaurant.findOne({
            _id: req.body.restaurantId
        });

        for (let i = 0; i < restaurant.menu.length; i++) {
            let menuElement = restaurant.menu[i];
            await MenuElement.deleteOne({
                _id: menuElement
            });
        }

        const removeIndex = user.restaurantIds.indexOf(req.body.restaurantId);
        user.restaurantIds.splice(removeIndex, 1);
        await user.save();

        await Restaurant.deleteOne({
            _id: req.body.restaurantId
        });

        res.send('Removed restaurant.');
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/', verifyToken, async (req, res) => {
    const user = await User.findOne({
        _id: req.user._id
    });

    const restaurantIds = user.restaurantIds;
    const restaurants = [];

    try {
        for (let i = 0; i < restaurantIds.length; i++) {
            const restaurant = await getRestaurant(restaurantIds[i]);
            restaurants.push(restaurant);
        }

        return res.send({
            restaurants: restaurants
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;

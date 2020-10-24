const router = require('express').Router();
const Restaurant = require('../model/Restaurant');
const MenuElement = require('../model/MenuElement');
const verifyToken = require('./verifyToken');
const { verifyContainsRestaurant } = require('./verifyRestaurant');

router.post('/create', verifyToken, async (req, res) => {
    if (!await verifyContainsRestaurant(req)) {
        return res.status(400).send('Restaurant is wrong.');
    }

    let restaurant = await Restaurant.findOne({
        _id: req.body.restaurantId
    });

    const menuElement = new MenuElement({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price
    });

    try {
        restaurant.menu.push(menuElement);
        await restaurant.save();
        await menuElement.save();
        res.send({
            menuElement: menuElement._id,
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/remove', verifyToken, async (req, res) => {
    if (!await verifyContainsRestaurant(req)) {
        return res.status(400).send('Restaurant is wrong.');
    }

    let restaurant = await Restaurant.findOne({
        _id: req.body.restaurantId
    });

    if (!restaurant.menu.includes(req.body.menuElementId)) {
        return res.status(400).send('Menu element is wrong.');
    }

    try {
        const removeIndex = restaurant.menu.indexOf(req.body.menuElementId);
        restaurant.menu.splice(removeIndex, 1);
        await restaurant.save();

        await MenuElement.deleteOne({
            _id: req.body.menuElementId
        });

        res.send('Removed element.');
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;

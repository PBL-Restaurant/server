const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');

router.get('/', verify, async (req, res) => {
    const user = await User.findOne({
        _id: req.user._id
    });

    res.json({
        logged: true,
        name: user.name,
        email: user.email,
    })
});

module.exports = router;
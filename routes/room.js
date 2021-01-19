const router = require('express').Router();
const Restaurant = require('../model/Restaurant');
const TableRoom = require('../model/TableRoom');
const verifyToken = require('./verifyToken');

router.get('/check', verifyToken, async (req, res) => {
    let room = await TableRoom.findOne({
        _id: req.body.tableRoomId
    });

    if (!room) {
        return res.status(400).send('Room is wrong');
    }

    try {
        res.send({
            booked: room.booked,
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/book', verifyToken, async (req, res) => {
    let room = await TableRoom.findOne({
        _id: req.body.tableRoomId
    });

    if (!room) {
        return res.status(400).send('Room is wrong');
    }

    if (room.booked) {
        return res.status(400).send('Room is booked');
    }

    if (!req.body.password) {
        return res.status(400).send('Wrong password');
    }

    try {
        room.users = [];
        room.users.push(req.user._id);

        room.password = req.body.password;
        room.booked = true;
        await room.save();

        res.send({
            room: room,
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/enter', verifyToken, async (req, res) => {
    let room = await TableRoom.findOne({
        _id: req.body.tableRoomId
    });

    if (!room) {
        return res.status(400).send('Room is wrong');
    }

    if (!room.booked) {
        return res.status(400).send('Room is not booked');
    }

    try {
        if (room.users.includes(req.user._id)) {
            return res.status(400).send('Room contains this user');
        }

        if (req.body.password !== room.password) {
            return res.status(400).send('Wrong room pass');
        }

        room.users.push(req.user._id);
        await room.save();

        res.send({
            room: room,
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;

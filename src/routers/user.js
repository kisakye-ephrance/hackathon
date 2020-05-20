const express = require('express');

const User = require('../models/User');

const router = express.Router();

//create a new user
router.post('/User', async(req, res) => {
    try {
        const user = new User (req.body);
        await user.save();
        const token = await user. generateAuthToken();
        res.status(201).send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }
});

//login a registered user
router.post('/User/login', async(req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findbyCredentials(email, password)
        if(!user) {
            return res.status(401).send({error: 'login failed! check authentication credentials'})
        }
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router;
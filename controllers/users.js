const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.render('users/index.ejs', {
            users: users,
        });
    } catch (err) {
        console.log('Error loading community page:', err);
        res.redirect('/');
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.redirect('/users');
        }
        res.render('users/show.ejs', {
            viewedUser: user,
        });
    } catch (err) {
        console.log('Error loading user profile:', err);
        res.redirect('/users');
    }
});

module.exports = router;
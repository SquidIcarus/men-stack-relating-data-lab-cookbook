const express = require('express');
const router = express.Router({ mergeParams: true });

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        console.log('PANTRY ROUTE DEBUG');
        console.log('req.params.userId:', req.params.userId);
        console.log('req.session.user:', req.session.user);

        const user = await User.findById(req.params.userId);
        console.log('User found:', user);

        if (!user) {
            console.log('User not found, redirecting to home.');
            return res.redirect('/');
        }

        console.log('Rendering pantry with:', user.pantry);
        res.render('foods/index.ejs', {
            pantry: user.pantry,
        });
    } catch (err) {
        console.log('Error in patry route:', err);
        res.redirect('/');
    }
});

module.exports = router;
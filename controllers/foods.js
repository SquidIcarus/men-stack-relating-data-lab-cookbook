const express = require('express');
const router = express.Router({ mergeParams: true });

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        
        const user = await User.findById(req.params.userId);
        
        if (!user) {
            return res.redirect('/');
        }

        res.render('foods/index.ejs', {
            pantry: user.pantry,
        });
    } catch (err) {
        console.log('Error in patry route:', err);
        res.redirect('/');
    }
});

router.get('/new', (req, res) => {
    res.render('foods/new.ejs');
});

module.exports = router;
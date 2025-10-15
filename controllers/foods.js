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

router.post('/', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.redirect('/');
        }

        user.pantry.push(req.body);
        await user.save();
        
        res.redirect(`/users/${user._id}/foods`);
    } catch (err) {
        console.log('Error creating food item:', err);
        res.redirect('/');
    }
});

router.delete('/:itemId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        
        if (!user) {
            return res.redirect('/');
        }

        user.pantry.id(req.params.itemId).deleteOne();
        await user.save();

        res.redirect(`/users/${user._id}/foods`);
    } catch (err) {
        console.log('Error deleting food item:', err);
        res.redirect('/');
    }
});

module.exports = router;
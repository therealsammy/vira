const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const {Rental, validate} = require('../models/rentals');
const {Game} = require('../models/games');
const {Customer} = require('../models/customers');

router.get('/', async (req, res) => {
const rentals = await Rental.find().sort('-dateOut');
res.send(rentals);
});

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body); 
        if (error) return res.status(400).send(error.details[0].message);

        const customer = await Customer.findById(req.body.customerId);
        if (!customer) return res.status(400).send('Invalid customer.');

        const game = await Game.findById(req.body.gameId);
        if (!game) return res.status(400).send('Invalid game.');

        // Soft commit: Check stock without changing it yet
        if (game.numberInStock === 0) return res.status(400).send('Game not in stock.');

        let rental = new Rental({ 
            customer: {
                _id: customer._id,
                name: customer.name, 
                phone: customer.phone
            },
            game: {
                _id: game._id,
                title: game.title,
                dailyRentalRate: game.dailyRentalRate
            }
        });

        // Confirmation: Save rental and update game stock
        await rental.save();
        const updatedGame = await Game.findOneAndUpdate({ _id: game._id, numberInStock: { $gt: 0 } }, {
            $inc: { numberInStock: -1 }
        });

        // Confirm the stock was still available during update
        if (!updatedGame) {
            // Roll back: Remove the rental since the game update failed
            await Rental.deleteOne({ _id: rental._id });
            return res.status(400).send('Game was no longer in stock. Rental rolled back.');
        }

        res.send(rental);
    } catch (ex) {
        if (ex.name && ex.name === 'MongoError') {
            // Handle potential MongoDB errors
            res.status(500).send('Database operation failed.');
        } else if (ex.name && ex.name === 'ValidationError') {
            // Handle potential validation errors from Mongoose
            res.status(400).send(ex.message);
        } else {
            // Handle any other unforeseen errors
            // console.error(ex); // Log the detailed error for debugging
            res.status(500).send('Something failed.');
        }
    }
});



router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);

    if (!rental) return res.status(404).send('The rental with the given ID was not found.');

    res.send(rental);
});

module.exports = router; 
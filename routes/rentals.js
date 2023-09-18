const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const {Rental, validate} = require('../models/rentals');
const {Movie} = require('../models/movies');
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

        const movie = await Movie.findById(req.body.movieId);
        if (!movie) return res.status(400).send('Invalid movie.');

        // Soft commit: Check stock without changing it yet
        if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

        let rental = new Rental({ 
            customer: {
                _id: customer._id,
                name: customer.name, 
                phone: customer.phone
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }
        });

        // Confirmation: Save rental and update movie stock
        await rental.save();
        const updatedMovie = await Movie.findOneAndUpdate({ _id: movie._id, numberInStock: { $gt: 0 } }, {
            $inc: { numberInStock: -1 }
        });

        // Confirm the stock was still available during update
        if (!updatedMovie) {
            // Roll back: Remove the rental since the movie update failed
            await Rental.deleteOne({ _id: rental._id });
            return res.status(400).send('Movie was no longer in stock. Rental rolled back.');
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
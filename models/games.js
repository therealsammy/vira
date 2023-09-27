const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre')

const Game = mongoose.model('Game', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}));

function validateGame(game) {
    const schema = Joi.object({
        title: Joi.string().min(5).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    }).unknown(true);

    return schema.validate(game);
}

exports.Game = Game;
exports.validate = validateGame;
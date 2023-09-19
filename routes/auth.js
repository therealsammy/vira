const express = require('express');
const router = express.Router()
const Joi = require('joi');
const mongoose = require('mongoose');
const {User} = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
    /* The code `router.post('/', async (req, res) => { ... })` is defining a route handler for a POST
    request to the auth URL ("/api/auth"). */
    const {error} = validate(req.body);
    if (error)  return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();

    res.send(token)
});


function validate(req) {
    /**
     * The function `validate` is used to validate a request object that should contain an email and
     * password, using the Joi library.
     * @param req - The `req` parameter is an object that contains the data to be validated. It should have
     * the following properties:
     * @returns the result of validating the request object against the defined schema using the Joi
     * library.
     */
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    }).unknown(true);

    return schema.validate(req);
}

module.exports = router;
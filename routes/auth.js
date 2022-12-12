const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

function validate(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(3).max(255).required()
    })

    return schema.validate(user)
}

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ message: "Email or password is not correct!" })
    const vaildPassword = await bcrypt.compare(req.body.password, user.password);
    if (!vaildPassword) return res.status(400).send({ message: "Email or password is not correct!" });
    const jsonToken = user.genrateAuthToken();

    res.send({ 'x-auth-token': jsonToken, status: "ok", message: 'Signed In Successfully. Redirecting...' })
})

module.exports = router;
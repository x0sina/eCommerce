const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send({ message: "Email Already Registerd!" })
    let userPh = await User.findOne({ phoneNumber: req.body.phoneNumber });
    if (userPh) return res.status(400).send({ message: "Phone Number Already Registerd!" })

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt)
    user = new User(_.pick(req.body, ['name', 'email', 'phoneNumber', 'password',]));
    user.password = hashed;
    console.log(user);

    user.save()
    const token = user.genrateAuthToken();
    const userData = _.pick(user, ['_id', 'name', 'email'])
    res.send({ userData, 'x-auth-token': token })
})

module.exports = router;
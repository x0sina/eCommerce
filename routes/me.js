const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
    return res.send({ message: 'Token is Ok your signed in.' })
})

module.exports = router;
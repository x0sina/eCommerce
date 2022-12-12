const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send({ message: 'Access denid. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.vidly_jwtPrivateKey);
        req.user = decoded;
        next();
    }
    catch {
        res.status(400).send('Invaild Token');
    }
}
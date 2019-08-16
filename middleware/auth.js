const jwt = require('jsonwebtoken'),
    config = require('config')

// Verify valid token from user on protected routes

module.exports = (req, res, next) => {
    // Get token from header by calling key to the token object
    const token = req.header('x-auth-token')

    if (!token) {
        return res.status(401).json({
            msg: 'No token, authorization denied'
        })
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded.user
        next()
    } catch (error) {
        res.status(401).json({
            msg: 'Token Invalid'
        })
    }
}
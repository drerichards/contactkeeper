const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    {
        check,
        validationResult
    } = require('express-validator'),
    User = require('../models/User')

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password of 6 or more characters is required').isLength({
        min: 6
    })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {
        name,
        email,
        password
    } = req.body

    try {
        let user = await User.findOne({
            email
        })
        if (user) {
            return res.status(400).json({
                msg: 'User already exists'
            })
        }

        // else if new user, create
        user = new User({
            name,
            email,
            password
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save()
        console.log('saved')
        res.status(200).send(name + ' Saved')

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router
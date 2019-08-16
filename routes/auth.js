const express = require('express'),
    router = express.Router()

router.get('/', (req, res) => {
    res.send('Get a user')
})

router.post('/', (req, res) => {
    res.send('Login a user')
})

module.exports = router
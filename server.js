const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.json({
    msg: 'Hello'
}))

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

app.listen(PORT, () => console.log(`Server: ${PORT}`))
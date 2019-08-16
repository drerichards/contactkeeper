const mongooose = require('mongoose'),
    config = require('config'),
    db = config.get('mongoURI')

const connectDB = async () => {
    try {
        await mongooose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('MongoDB Connected')
    } catch (error) {
        console.error(error)
        process.exit(1)
        // Uncaught Fatal Exception: There was an uncaught exception, and it was not handled by a domain or an uncaughtException event handler.
    }
}

module.exports = connectDB
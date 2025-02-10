const mongoose = require('mongoose')

const connectDB = () => {
    try {
        const connect = mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log("MongoDB Connected")
    } catch (error) {
        console.log("Connection Error")
        process.exit(1)
    }
}

module.exports = connectDB;
const mongoose = require('mongoose');

const mongoUri = "mongodb://localhost:27017/deepblue";

const connectToMongo = () => {
    mongoose.connect(mongoUri)
}

module.exports = connectToMongo;
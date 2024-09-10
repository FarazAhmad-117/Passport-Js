const mongoose = require('mongoose');


const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URI)
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDb;




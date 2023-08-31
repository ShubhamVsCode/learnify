import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || ""

if (!MONGODB_URI) {
    console.log('Please define the MONGODB_URI environment variable inside .env')
}

export default async function connectDb() {
    mongoose.connect(MONGODB_URI);
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
        console.log('>> Connected to MongoDB');
    });
}
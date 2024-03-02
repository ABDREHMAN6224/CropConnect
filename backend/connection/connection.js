import { process } from 'ipaddr.js';
import mongoose from 'mongoose';

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        });
        console.log('Connected to the database');
    } catch (error) {
        console.log('Error connecting to the database: ', error);
    }
};

export default connection;
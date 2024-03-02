import mongoose from 'mongoose';
import Marketplace from '../model/marketplace.js';
const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to the database');

    Marketplace.create({
    name: "sdf",
    description: "sdf",
    // seller: "req.user._id",
    price: +"0",
    image: "req.body.image"
}).then(a => console.log({a}));
    } catch (error) {
        console.log('Error connecting to the database: ', error);
    }
};

export default connection;
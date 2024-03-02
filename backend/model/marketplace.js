import mongoose from 'mongoose';

const marketplaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        default: "active"
    },
    // seller: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Marketplace = mongoose.model('Marketplace', marketplaceSchema);

Marketplace.create({
    name: "sdf",
    description: "sdf",
    // seller: "req.user._id",
    price: +"0",
    image: "req.body.image"
}).then(a => console.log({a}));
// rs
export default Marketplace;

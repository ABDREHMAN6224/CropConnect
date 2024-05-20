import mongoose from 'mongoose';

const marketplaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    images:[
        {
            type: String,
            required: true
        }
    ],
    status: {
        type: String,
        required: true,
        default: "active"
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    buyers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 5
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// virtuals average rating
marketplaceSchema.virtual('averageRating').get(function () {
    if(this.reviews?.length === 0 || !this.reviews){
        return 0;
    }
    const sum = this?.reviews?.reduce((acc,review)=>acc+review.rating,0);
    return sum/this.reviews?.length;
});

marketplaceSchema.virtual('numReviews').get(function () {
    return this.reviews?.length;
});

marketplaceSchema.virtual('sales').get(function () {
    return this.buyers?.length;
});

const Marketplace = mongoose.model('Marketplace', marketplaceSchema);

// rs
export default Marketplace;

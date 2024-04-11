import mongoose from "mongoose";

const ReviewSchema=new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
    
},{timestamps:true});

const Review=mongoose.model("Review",ReviewSchema);

export default Review;
import mongoose from "mongoose";

const resourcesSchema = new mongoose.Schema(
  {
    resources:[
      {
        type: String,
        required: true,
        minlength:1,
        
      }
    ],
    description: {
      type: String,
      required: true,
      trim: true
    },
  },
  {
    timestamps: true,
  }
);

const Resource = mongoose.model("Resource", resourcesSchema);

export default Resource;

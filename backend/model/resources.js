import mongoose from "mongoose";

const resourcesSchema = new mongoose.Schema(
  {
    resourceUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Resource = mongoose.model("Resource", resourcesSchema);

export default Resource;

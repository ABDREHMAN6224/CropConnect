import Resource from "../model/resources.js";
import ApiFeatures from "../utils/ApiFeature.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

export const createResource = catchAsync(async (req, res, next) => {
  const { resourceUrl, description } = req.body;
  const resource = new Resource({ resourceUrl, description });
  const createdResource = await resource.save();
  res.status(201).json(createdResource);
});

export const getResources = catchAsync(async (req, res, next) => {
  const query = Resource.find();
  const resources = await query;
  res.json(resources);
});

export const getResource = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(Resource.findById(req.params.id), req.query);
  const resource = await feature.query;
  if (resource) {
    res.json(resource);
  } else {
    next(new AppError("Resource not found", 404));
  }
});

export const updateResource = catchAsync(async (req, res, next) => {
  const resource = await Resource.findById(req.params.id);
  if (resource) {
    resource.resourceUrl = req.body.resourceUrl || resource.resourceUrl;
    resource.description = req.body.description || resource.description;
    const updatedResource = await resource.save();
    res.json(updatedResource);
  } else {
    next(new AppError("Resource not found", 404));
  }
});

export const deleteResource = catchAsync(async (req, res, next) => {
  const resource = await Resource.findById(req.params.id);
  if (resource) {
    await resource.remove();
    res.json({ message: "Resource removed" });
  } else {
    next(new AppError("Resource not found", 404));
  }
});

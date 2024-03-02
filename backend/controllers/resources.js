import ExpressAsyncHandler from "express-async-handler";
import Resource from "../model/resources.js";
import ApiFeatures from "../utils/ApiFeature.js";

export const createResource = ExpressAsyncHandler(async (req, res) => {
  console.log("asdfasdf", req.body);
  const { resourceUrl, description } = req.body;
  const resource = new Resource({ resourceUrl, description });
  const createdResource = await resource.save();
  res.status(201).json(createdResource);
});

export const getResources = ExpressAsyncHandler(async (req, res) => {
  const query = Resource.find();
  const resources = await query;
  res.json(resources);
});

export const getResource = ExpressAsyncHandler(async (req, res) => {
  const feature = new ApiFeatures(Resource.findById(req.params.id), req.query);
  const resource = await feature.query;
  if (resource) {
    res.json(resource);
  } else {
    res.status(404);
    return res.json({ message: "Resource not found" });
  }
});

export const updateResource = ExpressAsyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);
  if (resource) {
    resource.resourceUrl = req.body.resourceUrl || resource.resourceUrl;
    resource.description = req.body.description || resource.description;
    const updatedResource = await resource.save();
    res.json(updatedResource);
  } else {
    res.status(404);
    return res.json({ message: "Resource not found" });
  }
});

export const deleteResource = ExpressAsyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);
  if (resource) {
    await resource.remove();
    res.json({ message: "Resource removed" });
  } else {
    res.status(404);
    return res.json({ message: "Resource not found" });
  }
});

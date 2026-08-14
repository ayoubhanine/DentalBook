import Service from "../models/service.model.js";

export const createService = async (serviceData) => {
  const { name } = serviceData;

  const existingService = await Service.findOne({
    name: { $regex: `^${name}$`, $options: "i" },
  });

  if (existingService) {
    throw new Error("A service with this name already exists");
  }

  const service = await Service.create(serviceData);

  return service;
};

export const getAllServices = async () => {
  const services = await Service.find().sort({ createdAt: -1 });

  return services;
};

export const getServiceById = async (serviceId) => {
  const service = await Service.findById(serviceId);

  if (!service) {
    throw new Error("Service not found");
  }

  return service;
};

export const updateService = async (serviceId, serviceData) => {
  const service = await Service.findById(serviceId);

  if (!service) {
    throw new Error("Service not found");
  }

  if (serviceData.name) {
    const existingService = await Service.findOne({
      name: { $regex: `^${serviceData.name}$`, $options: "i" },
      _id: { $ne: serviceId },
    });

    if (existingService) {
      throw new Error("A service with this name already exists");
    }
  }

  const updatedService = await Service.findByIdAndUpdate(
    serviceId,
    serviceData,
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedService;
};

export const deleteService = async (serviceId) => {
  const service = await Service.findById(serviceId);

  if (!service) {
    throw new Error("Service not found");
  }

  await Service.findByIdAndDelete(serviceId);

  return service;
};
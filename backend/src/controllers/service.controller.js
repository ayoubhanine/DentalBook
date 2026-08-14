import {
  createService,
  deleteService,
  getAllServices,
  getServiceById,
  updateService,
} from "../services/service.service.js";

export const createServiceController = async (req, res) => {
  try {
    const service = await createService(req.body);

    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: {
        service,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllServicesController = async (req, res) => {
  try {
    const services = await getAllServices();

    return res.status(200).json({
      success: true,
      message: "Services retrieved successfully",
      data: {
        services,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getServiceByIdController = async (req, res) => {
  try {
    const service = await getServiceById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Service retrieved successfully",
      data: {
        service,
      },
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateServiceController = async (req, res) => {
  try {
    const service = await updateService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: {
        service,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteServiceController = async (req, res) => {
  try {
    await deleteService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
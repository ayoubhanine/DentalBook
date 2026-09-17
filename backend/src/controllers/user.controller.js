import {
  getAllPatients,
  getPatientById,
  deletePatient,
  getCurrentUser,
  updateCurrentUser,
} from "../services/user.service.js"

export const getPatients = async (req, res) => {
  try {
    const patients = await getAllPatients();

    return res.status(200).json({
      success: true,
      message: "Patients retrieved successfully",
      data: {
        patients,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPatient = async (req, res) => {
  try {
    const patient = await getPatientById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Patient retrieved successfully",
      data: {
        patient,
      },
    });
  } catch (error) {
    const statusCode =
      error.message === "Patient not found" ? 404 : 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

export const removePatient = async (req, res) => {
  try {
    await deletePatient(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Patient deleted successfully",
    });
  } catch (error) {
    const statusCode =
      error.message === "Patient not found" ? 404 : 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await getCurrentUser(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateMe = async (req, res) => {
  try {
    const user = await updateCurrentUser(req.user.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

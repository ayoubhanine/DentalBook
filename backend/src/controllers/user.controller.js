import {
  getAllPatients,
  getPatientById,
  deletePatient,
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

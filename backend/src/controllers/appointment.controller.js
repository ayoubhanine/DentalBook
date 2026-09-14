import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointmentById,
  getAppointmentsByUser,
  updateAppointment,
} from "../services/appointment.service.js";

export const createAppointmentController = async (req, res) => {
  try {
    const appointmentData = {
      ...req.body,
      userId: req.user.id,
    };

    const appointment = await createAppointment(appointmentData);

    return res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      data: {
        appointment,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllAppointmentsController = async (req, res) => {
  try {
    const appointments = await getAllAppointments();

    return res.status(200).json({
      success: true,
      message: "Appointments retrieved successfully",
      data: {
        appointments,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAppointmentByIdController = async (req, res) => {
  try {
    const appointment = await getAppointmentById(
        req.params.id,
        req.user);

    return res.status(200).json({
      success: true,
      message: "Appointment retrieved successfully",
      data: {
        appointment,
      },
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyAppointmentsController = async (req, res) => {
  try {
    const appointments = await getAppointmentsByUser(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Your appointments retrieved successfully",
      data: {
        appointments,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAppointmentController = async (req, res) => {
  try {
    const appointment = await updateAppointment(
      req.params.id,
      req.body,
      req.user
    );

    return res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      data: {
        appointment,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAppointmentController = async (req, res) => {
  try {
    await deleteAppointment(
        req.params.id,
        req.user
    );

    return res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
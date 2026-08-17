import {
  createSchedule,
  deleteSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
} from "../services/schedule.service.js";

export const createScheduleController = async (req, res) => {
  try {
    const schedule = await createSchedule(req.body);

    return res.status(201).json({
      success: true,
      message: "Schedule created successfully",
      data: {
        schedule,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllSchedulesController = async (req, res) => {
  try {
    const schedules = await getAllSchedules();

    return res.status(200).json({
      success: true,
      message: "Schedules retrieved successfully",
      data: {
        schedules,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getScheduleByIdController = async (req, res) => {
  try {
    const schedule = await getScheduleById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Schedule retrieved successfully",
      data: {
        schedule,
      },
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateScheduleController = async (req, res) => {
  try {
    const schedule = await updateSchedule(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Schedule updated successfully",
      data: {
        schedule,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteScheduleController = async (req, res) => {
  try {
    await deleteSchedule(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Schedule deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
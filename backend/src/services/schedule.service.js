import Schedule from "../models/schedule.model.js";

export const createSchedule = async (scheduleData) => {
  const { day } = scheduleData;

  const existingSchedule = await Schedule.findOne({ day });

  if (existingSchedule) {
    throw new Error("A schedule already exists for this day");
  }

  const schedule = await Schedule.create(scheduleData);

  return schedule;
};

export const getAllSchedules = async () => {
  const schedules = await Schedule.find().sort({ day: 1 });

  return schedules;
};

export const getScheduleById = async (scheduleId) => {
  const schedule = await Schedule.findById(scheduleId);

  if (!schedule) {
    throw new Error("Schedule not found");
  }

  return schedule;
};

export const updateSchedule = async (scheduleId, scheduleData) => {
  const schedule = await Schedule.findById(scheduleId);

  if (!schedule) {
    throw new Error("Schedule not found");
  }

  // Valeurs finales après modification
  const startTime = scheduleData.startTime ?? schedule.startTime;
  const endTime = scheduleData.endTime ?? schedule.endTime;

  // Vérifier que startTime < endTime
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  if (startTotalMinutes >= endTotalMinutes) {
    throw new Error("End time must be after start time");
  }

  // Vérifier qu'un autre schedule n'utilise pas déjà le même jour
  if (scheduleData.day && scheduleData.day !== schedule.day) {
    const existingSchedule = await Schedule.findOne({
      day: scheduleData.day,
      _id: { $ne: scheduleId },
    });

    if (existingSchedule) {
      throw new Error("A schedule already exists for this day");
    }
  }

  const updatedSchedule = await Schedule.findByIdAndUpdate(
    scheduleId,
    scheduleData,
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedSchedule;
};

export const deleteSchedule = async (scheduleId) => {
  const schedule = await Schedule.findById(scheduleId);

  if (!schedule) {
    throw new Error("Schedule not found");
  }

  await Schedule.findByIdAndDelete(scheduleId);

  return schedule;
};
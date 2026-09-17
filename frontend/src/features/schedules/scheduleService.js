import api from "../../api/axios";

const getSchedules = async () => {
  const response = await api.get("/schedules");
  return response.data;
};

const getScheduleById = async (id) => {
  const response = await api.get(`/schedules/${id}`);
  return response.data;
};

const createSchedule = async (scheduleData) => {
  const response = await api.post("/schedules", scheduleData);
  return response.data;
};

const updateSchedule = async (id, scheduleData) => {
  const response = await api.patch(
    `/schedules/${id}`,
    scheduleData
  );
  return response.data;
};

const deleteSchedule = async (id) => {
  const response = await api.delete(`/schedules/${id}`);
  return response.data;
};

const scheduleService = {
  getSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};

export default scheduleService;
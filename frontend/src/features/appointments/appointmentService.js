import api from "../../api/axios";

const getAppointments = async () => {
  const response = await api.get("/appointments");
  return response.data;
};

const getAppointmentById = async (id) => {
  const response = await api.get(`/appointments/${id}`);
  return response.data;
};

const updateAppointment = async (id, appointmentData) => {
  const response = await api.patch(
    `/appointments/${id}`,
    appointmentData
  );

  return response.data;
};

const deleteAppointment = async (id) => {
  const response = await api.delete(`/appointments/${id}`);
  return response.data;
};

const appointmentService = {
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};

export default appointmentService;
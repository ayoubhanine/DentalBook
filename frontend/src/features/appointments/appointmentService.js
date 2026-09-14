import api from "../../api/axios";

const getAppointments = async () => {
  const response = await api.get("/appointments");
  return response.data;
};

const appointmentService = {
  getAppointments,
};

export default appointmentService;
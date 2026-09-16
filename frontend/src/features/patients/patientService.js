import api from "../../api/axios";

export const getPatients = async () => {
  const response = await api.get("/users/patients");

  return response.data;
};

export const getPatientById = async (id) => {
  const response = await api.get(`/users/patients/${id}`);

  return response.data;
};


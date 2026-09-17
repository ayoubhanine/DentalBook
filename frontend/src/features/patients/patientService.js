import api from "../../api/axios";

export const getPatients = async () => {
  const response = await api.get("/users/patients");

  return response.data;
};

export const getPatientById = async (id) => {
  const response = await api.get(`/users/patients/${id}`);

  return response.data;
};
export const getMe = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

export const updateMe = async (userData) => {
  const response = await api.patch("/users/me", userData);
  return response.data;
};

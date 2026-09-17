import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser?.token) {
      config.headers.Authorization = `Bearer ${storedUser.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
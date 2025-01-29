import axios from "axios";

const token = localStorage.getItem("authToken");

const api = axios.create({
  baseURL: "https://death-star.onrender.com",
});

if (token) {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
}

export default api;
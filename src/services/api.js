import axios from "axios";
import { useError } from "../components/ErrorProvider";

const api = axios.create({
  baseURL: "https://death-star.onrender.com",
});

export const setAxiosLoadingInterceptor = (setLoading, showError) => {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      setLoading(true);
      return config;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error) => {
      setLoading(false);

      if (error.response) {
        if (error.response.status === 401) {
          localStorage.removeItem("authToken");
          window.location.href = "/login";
        } else {
          showError(`Erro: ${error.response.status} - ${error.response.data.message || "Erro desconhecido"}`);
        }
      } else {
        showError("Erro ao conectar com o servidor.");
      }

      return Promise.reject(error);
    }
  );
};

export default api;
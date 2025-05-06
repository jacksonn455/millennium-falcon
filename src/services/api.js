import axios from "axios";
import { refreshAccessToken } from "../utils/auth"; // ✅ AJUSTADO AQUI

const api = axios.create({
  baseURL: "https://death-star.onrender.com",
});

const initialToken = localStorage.getItem("authToken");
if (initialToken) {
  api.defaults.headers.common["Authorization"] = `Bearer ${initialToken}`;
}

export const setAxiosLoadingInterceptor = (setLoading, showError, navigate) => {
  api.interceptors.request.use(
    (config) => {
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
    async (error) => {
      setLoading(false);

      const originalRequest = error.config;

      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        const newToken = await refreshAccessToken();

        if (newToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return api(originalRequest);
        }

        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      } else if (error.response) {
        showError(
          `⚠️ Erro (${error.response.status}): ${
            error.response.data?.message ||
            "Por favor, tente novamente mais tarde."
          }`
        );
      } else {
        showError(
          "❌ Não foi possível conectar ao servidor. Verifique sua conexão de internet."
        );
      }

      return Promise.reject(error);
    }
  );
};

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("❌ Erro ao verificar expiração do token:", error);
    return true;
  }
};

export default api;

import axios from "axios";
import { refreshAccessToken } from "../utils/auth";

const api = axios.create({
  baseURL: "https://death-star.onrender.com",
});

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

export const setAxiosLoadingInterceptor = (setLoading, showError, navigate) => {
  api.interceptors.request.use(
    async (config) => {
      // Não adicionar token para rotas de autenticação
      const isAuthRoute = config.url?.includes('/auth/');
      
      if (isAuthRoute) {
        setLoading(true);
        return config;
      }

      const token = localStorage.getItem("authToken");

      if (!token || isTokenExpired(token)) {
        console.warn("⛔ Token ausente ou expirado. Tentando refresh...");
        
        // Tentar refresh antes de redirecionar
        const newToken = await refreshAccessToken();
        if (newToken) {
          config.headers["Authorization"] = `Bearer ${newToken}`;
          setLoading(true);
          return config;
        }
        
        // Se refresh falhou, redirecionar para login
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
        return Promise.reject(new Error("Token ausente ou expirado"));
      }

      config.headers["Authorization"] = `Bearer ${token}`;
      setLoading(true);
      return config;
    },
    (error) => {
      console.error("❌ Erro no interceptor de request:", error);
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
      console.error("❌ Erro na resposta:", error.config?.url, error.message);
      setLoading(false);
      const originalRequest = error.config;

      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        console.log("🔄 Token expirado, tentando refresh...");
        
        const newToken = await refreshAccessToken();

        if (newToken) {
          console.log("✅ Token renovado, repetindo requisição...");
          localStorage.setItem("authToken", newToken);
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return api(originalRequest);
        }

        // Se refresh falhou, redirecionar para login
        console.log("❌ Refresh falhou, redirecionando para login...");
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      } else if (error.response) {
        const errorMessage = error.response.data?.message || 
                           error.response.data?.error || 
                           "Por favor, tente novamente mais tarde.";
        
        showError(`⚠️ Erro (${error.response.status}): ${errorMessage}`);
      } else {
        showError(
          "❌ Não foi possível conectar ao servidor. Verifique sua conexão de internet."
        );
      }

      return Promise.reject(error);
    }
  );
};

export default api;

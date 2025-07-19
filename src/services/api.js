import axios from "axios";
import { refreshAccessToken } from "../utils/auth";

const api = axios.create({
  baseURL: "https://death-star.onrender.com",
  timeout: 10000,
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
  // Flag para evitar múltiplas tentativas de refresh
  let isRefreshing = false;
  let failedQueue = [];

  const processQueue = (error, token = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
    failedQueue = [];
  };

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
        
        // Se já está tentando refresh, adicionar à fila
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            config.headers["Authorization"] = `Bearer ${token}`;
            setLoading(true);
            return config;
          }).catch(err => {
            return Promise.reject(err);
          });
        }

        isRefreshing = true;
        
        try {
          const newToken = await refreshAccessToken();
          if (newToken) {
            config.headers["Authorization"] = `Bearer ${newToken}`;
            processQueue(null, newToken);
            setLoading(true);
            return config;
          } else {
            processQueue(new Error("Refresh falhou"));
            localStorage.removeItem("authToken");
            localStorage.removeItem("refreshToken");
            navigate("/login");
            return Promise.reject(new Error("Token ausente ou expirado"));
          }
        } catch (error) {
          processQueue(error);
          localStorage.removeItem("authToken");
          localStorage.removeItem("refreshToken");
          navigate("/login");
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
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

      // Retry para erros de rede (sem resposta do servidor)
      if (!error.response && !originalRequest._retry && originalRequest.url && !originalRequest.url.includes('/auth/')) {
        originalRequest._retry = true;
        console.log("🔄 Tentando novamente devido a erro de rede...");
        
        // Aguardar 1 segundo antes de tentar novamente
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return api(originalRequest);
      }

      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url?.includes('/auth/')
      ) {
        originalRequest._retry = true;
        console.log("🔄 Token expirado, tentando refresh...");
        
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return api(originalRequest);
          }).catch(err => {
            return Promise.reject(err);
          });
        }

        isRefreshing = true;
        
        try {
          const newToken = await refreshAccessToken();
          if (newToken) {
            console.log("✅ Token renovado, repetindo requisição...");
            localStorage.setItem("authToken", newToken);
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            processQueue(null, newToken);
            return api(originalRequest);
          } else {
            processQueue(new Error("Refresh falhou"));
            console.log("❌ Refresh falhou, redirecionando para login...");
            localStorage.removeItem("authToken");
            localStorage.removeItem("refreshToken");
            navigate("/login");
            return Promise.reject(error);
          }
        } catch (refreshError) {
          processQueue(refreshError);
          console.log("❌ Erro no refresh, redirecionando para login...");
          localStorage.removeItem("authToken");
          localStorage.removeItem("refreshToken");
          navigate("/login");
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
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

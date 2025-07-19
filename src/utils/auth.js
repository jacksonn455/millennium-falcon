import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";

let refreshTimeout = null;
let isRefreshing = false;

const clearTokens = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
};

const scheduleTokenRefresh = (accessToken, refreshToken) => {
  if (refreshTimeout) clearTimeout(refreshTimeout);

  try {
    const refreshDecoded = jwtDecode(refreshToken);
    const currentTime = Date.now() / 1000;
    const refreshExpiresIn = refreshDecoded.exp - currentTime;

    const refreshBuffer = 300; // 5 minutos antes de expirar

    if (refreshExpiresIn > refreshBuffer) {
      const refreshTime = (refreshExpiresIn - refreshBuffer) * 1000;
      refreshTimeout = setTimeout(() => {
        if (!isRefreshing) {
          refreshAccessToken();
        }
      }, refreshTime);
    } else {
      if (!isRefreshing) {
        refreshAccessToken();
      }
    }
  } catch (error) {
    console.error("❌ Erro ao decodificar refresh token:", error);
    clearTokens();
  }
};

export const refreshAccessToken = async () => {
  if (isRefreshing) {
    console.log("🔄 Refresh já em andamento, aguardando...");
    return null;
  }

  isRefreshing = true;
  const refreshToken = localStorage.getItem("refreshToken");
  
  if (!refreshToken) {
    clearTokens();
    isRefreshing = false;
    return null;
  }

  try {
    console.log("🔄 Iniciando refresh do token...");
    const response = await api.post("/auth/refresh-token", { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    if (accessToken) {
      localStorage.setItem("authToken", accessToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      console.log("✅ Token renovado com sucesso");
    }
    
    if (newRefreshToken) {
      localStorage.setItem("refreshToken", newRefreshToken);
    }

    // Agendar próximo refresh
    scheduleTokenRefresh(accessToken, newRefreshToken || refreshToken);
    isRefreshing = false;
    return accessToken;
  } catch (error) {
    console.error("❌ Erro ao renovar token:", error.response?.data || error.message);
    
    // Se o refresh token expirou ou é inválido, limpar tokens
    if (error.response?.status === 401) {
      clearTokens();
    }
    isRefreshing = false;
    return null;
  }
};

export const initializeAuth = () => {
  const accessToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  
  if (accessToken && refreshToken) {
    try {
      // Verificar se o access token ainda é válido
      const decoded = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;
      
      if (decoded.exp > currentTime) {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        scheduleTokenRefresh(accessToken, refreshToken);
      } else {
        if (!isRefreshing) {
          refreshAccessToken();
        }
      }
    } catch (error) {
      console.error("❌ Erro ao decodificar token:", error);
      clearTokens();
    }
  }
};

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      clearTokens();
      return <Navigate to="/login" replace />;
    } else {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        scheduleTokenRefresh(token, refreshToken);
      }
    }
  } catch (error) {
    console.error("❌ Token inválido:", error);
    clearTokens();
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;

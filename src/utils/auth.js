import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";

let refreshTimeout = null;

const clearTokens = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
};

const scheduleTokenRefresh = (accessToken, refreshToken) => {
  if (refreshTimeout) clearTimeout(refreshTimeout);

  try {
    const accessDecoded = jwtDecode(accessToken);
    const refreshDecoded = jwtDecode(refreshToken);

    const currentTime = Date.now() / 1000;
    const accessExpiresIn = accessDecoded.exp - currentTime;
    const refreshExpiresIn = refreshDecoded.exp - currentTime;

    const accessBuffer = 60;
    const refreshBuffer = 100;

    if (accessExpiresIn > accessBuffer) {
      const refreshTime = (accessExpiresIn - accessBuffer) * 1000;
      refreshTimeout = setTimeout(refreshAccessToken, refreshTime);
    } else {
      refreshAccessToken();
    }

    console.log(`⏳ Access token expira em ${Math.floor(accessExpiresIn)}s`);
    console.log(`⏳ Refresh token expira em ${Math.floor(refreshExpiresIn)}s`);
  } catch (error) {
    console.error("❌ Erro ao decodificar token:", error);
    clearTokens();
  }
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    clearTokens();
    return null;
  }

  try {
    const decoded = jwtDecode(refreshToken);
    const currentTime = Date.now() / 1000;
    const refreshExpiresIn = decoded.exp - currentTime;
    const refreshBuffer = 100;

    const payload = { refreshToken };
    if (refreshExpiresIn > refreshBuffer) {
      payload.skipRefreshRenewal = true;
    }

    const response = await api.post("/auth/refresh-token", payload);
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    if (accessToken) {
      localStorage.setItem("authToken", accessToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
    if (newRefreshToken && refreshExpiresIn <= refreshBuffer) {
      localStorage.setItem("refreshToken", newRefreshToken);
    }

    scheduleTokenRefresh(accessToken, refreshToken);
    return accessToken;
  } catch (error) {
    console.error("❌ Erro ao renovar token:", error);
    clearTokens();
    return null;
  }
};

export const initializeAuth = () => {
  const accessToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (accessToken && refreshToken) {
    scheduleTokenRefresh(accessToken, refreshToken);
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
      return <Navigate to="/login" replace />;
    } else {
      const refreshToken = localStorage.getItem("refreshToken");
      scheduleTokenRefresh(token, refreshToken);
    }
  } catch (error) {
    console.error("❌ Token inválido:", error);
    clearTokens();
    return <Navigate to="/login" replace />;
  }

  return element;
};

initializeAuth();

export default ProtectedRoute;

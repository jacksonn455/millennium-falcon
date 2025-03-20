import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const API_URL = "https://death-star.onrender.com/auth/refresh-token";
let refreshPromise = null;
let refreshTimeout = null;

const getNewAccessToken = async () => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const storedRefreshToken = localStorage.getItem("refreshToken");
      if (!storedRefreshToken)
        throw new Error("Nenhum refreshToken encontrado.");

      const response = await axios.post(
        API_URL,
        { refreshToken: storedRefreshToken },
        { headers: { "Content-Type": "application/json" } }
      );

      const { accessToken, refreshToken: newRefreshToken } = response.data;
      if (!accessToken) throw new Error("Nenhum accessToken recebido.");

      localStorage.setItem("authToken", accessToken);
      if (newRefreshToken) {
        localStorage.setItem("refreshToken", newRefreshToken);
      }

      if (newRefreshToken) scheduleTokenRefresh(accessToken);
      return accessToken;
    } catch (error) {
      console.error(
        "❌ Erro ao renovar token:",
        error.response?.data || error.message
      );
      clearTokens();
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

const clearTokens = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
};

const scheduleTokenRefresh = (token) => {
  if (refreshTimeout) clearTimeout(refreshTimeout);

  try {
    const decodedToken = jwtDecode(token);

    const currentTime = Date.now() / 1000;
    const expiresIn = decodedToken.exp - currentTime;

    if (expiresIn > 300) {
      const refreshTime = expiresIn - 300;
      refreshTimeout = setTimeout(getNewAccessToken, refreshTime * 1000);
    } else {
      getNewAccessToken();
    }
  } catch (error) {
    console.error(
      "❌ Erro ao decodificar token para agendar renovação:",
      error
    );
  }
};

const ProtectedRoute = ({ element }) => {
  let token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/millennium-falcon/login" replace />;
  }

  try {
    let decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      return <Navigate to="/millennium-falcon/login" replace />;
    } else {
      scheduleTokenRefresh(token);
    }
  } catch (error) {
    console.error("❌ Token inválido:", error);
    clearTokens();
    return <Navigate to="/millennium-falcon/login" replace />;
  }

  return element;
};

const initializeAuth = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    scheduleTokenRefresh(token);
  } else {
  }
};

initializeAuth();

export default ProtectedRoute;

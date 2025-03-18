import axios from "axios";

const api = axios.create({
  baseURL: "https://death-star.onrender.com",
});

const initialToken = localStorage.getItem("authToken");
if (initialToken) {
  api.defaults.headers.common["Authorization"] = `Bearer ${initialToken}`;
} else {
}

let isRefreshing = false;
let refreshPromise = null;

const refreshAccessToken = async () => {
  if (isRefreshing) return refreshPromise;

  isRefreshing = true;

  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    isRefreshing = false;
    return null;
  }

  refreshPromise = api
    .post("/auth/refresh", { refreshToken })
    .then((response) => {
      if (response.status === 200) {
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem("authToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        return accessToken;
      }
      return null;
    })
    .catch((error) => {
      console.error("Erro ao renovar token:", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
      }
      return null;
    })
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });

  return refreshPromise;
};

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry = payload.exp * 1000;
    return expiry < Date.now();
  } catch (error) {
    return true;
  }
};

export const setAxiosLoadingInterceptor = (setLoading, showError, navigate) => {
  api.interceptors.request.use(
    async (config) => {
      const authToken = localStorage.getItem("authToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (authToken && isTokenExpired(authToken)) {
        if (refreshToken && !isTokenExpired(refreshToken)) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            config.headers["Authorization"] = `Bearer ${newToken}`;
          } else {
            localStorage.removeItem("authToken");
            localStorage.removeItem("refreshToken");
            navigate("/login");
            return Promise.reject(new Error("Token expirado"));
          }
        } else {
          localStorage.removeItem("authToken");
          localStorage.removeItem("refreshToken");
          navigate("/login");
          return Promise.reject(new Error("Refresh token expirado"));
        }
      }

      if (authToken) {
        config.headers["Authorization"] = `Bearer ${authToken}`;
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
    async (error) => {
      setLoading(false);

      if (error.response && error.response.status === 401) {
        const originalRequest = error.config;

        const refreshToken = localStorage.getItem("refreshToken");
        const isRefreshTokenValid = !isTokenExpired(refreshToken);

        if (isRefreshTokenValid && !originalRequest._retry) {
          originalRequest._retry = true;

          const newToken = await refreshAccessToken();
          if (newToken) {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return api(originalRequest);
          }
        }
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      } else if (error.response) {
        showError(
          `Ocorreu um erro (${error.response.status}): ${
            error.response.data.message ||
            "Por favor, tente novamente mais tarde."
          }`
        );
      } else {
        showError(
          "Não foi possível conectar ao servidor. Verifique sua conexão de internet e tente novamente."
        );
      }

      return Promise.reject(error);
    }
  );
};

export default api;
export { refreshAccessToken, isTokenExpired };

import axios from "axios";

const api = axios.create({
  baseURL: "https://death-star.onrender.com",
});

const initialToken = localStorage.getItem("authToken");
if (initialToken) {
  api.defaults.headers.common["Authorization"] = `Bearer ${initialToken}`;
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
    .post("/auth/refresh-token", { refreshToken })
    .then((response) => {
      if (response.status === 200) {
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        if (!accessToken || !newRefreshToken) {
          console.warn("⚠️ Tokens ausentes na resposta da API.");
          isRefreshing = false;
          return null;
        }

        localStorage.setItem("authToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        return accessToken;
      }
      return null;
    })
    .catch((error) => {
      console.error("❌ Erro ao renovar token:", error.response?.data || error);

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
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

export const setAxiosLoadingInterceptor = (setLoading, showError, navigate) => {
  api.interceptors.request.use(
    async (config) => {
      const authToken = localStorage.getItem("authToken");

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

        if (
          refreshToken &&
          !isTokenExpired(refreshToken) &&
          !originalRequest._retry
        ) {
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

export default api;
export { refreshAccessToken, isTokenExpired };

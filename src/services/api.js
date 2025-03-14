import axios from "axios";

const api = axios.create({
  baseURL: "https://death-star.onrender.com",
});

const initialToken = localStorage.getItem("authToken");
if (initialToken) {
  api.defaults.headers.common["Authorization"] = `Bearer ${initialToken}`;
}

let isRequesting = false;
let refreshPromise = null;

const refreshAccessToken = async () => {
  if (refreshPromise) return refreshPromise;

  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  refreshPromise = api
    .post("/auth/refresh", { refreshToken })
    .then((response) => {
      if (response.status === 200) {
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem("authToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        return accessToken;
      }
      return null;
    })
    .catch((error) => {
      console.error("Erro ao renovar token:", error);
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      return null;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};

export const setAxiosLoadingInterceptor = (setLoading, showError, navigate) => {
  api.interceptors.request.use(
    (config) => {

      isRequesting = true;
      const token = localStorage.getItem("authToken");

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      setLoading(true);
      return config;
    },
    (error) => {
      setLoading(false);
      isRequesting = false;
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      setLoading(false);
      isRequesting = false;
      return response;
    },
    async (error) => {
      setLoading(false);
      isRequesting = false;

      if (error.response) {
        if (error.response.status === 401) {
          const newToken = await refreshAccessToken();

          if (newToken) {
            error.config.headers["Authorization"] = `Bearer ${newToken}`;
            return api.request(error.config);
          } else {
            navigate("/login");
          }
        } else {
          showError(
            `Ocorreu um erro (${error.response.status}): ${
              error.response.data.message ||
              "Por favor, tente novamente mais tarde."
            }`
          );
        }
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

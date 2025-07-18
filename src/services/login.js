import api from "./api";

export const login = async ({ email, password }, navigate) => {
  try {
    const response = await api.post("/auth/login", { email, password });

    if (!response.data.accessToken || !response.data.refreshToken) {
      console.error("❌ Tokens não encontrados na resposta");
      alert("Erro inesperado. Por favor, tente novamente.");
      return null;
    }

    const { accessToken, refreshToken } = response.data;

    localStorage.setItem("authToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    navigate("/millennium-falcon/");

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("❌ Erro ao tentar fazer login:", error);
    console.error("❌ Detalhes do erro:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config
    });
    
    if (error.response?.data?.message) {
      alert(error.response.data.message);
    } else {
      alert("Erro ao tentar fazer login. Verifique sua conexão e tente novamente.");
    }
    return null;
  }
};

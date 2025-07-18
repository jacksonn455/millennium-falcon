import api from "./api";

export const logout = async (navigate) => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      console.log("🔄 Fazendo logout no servidor...");
      await api.post("/auth/logout", { refreshToken });
      console.log("✅ Logout realizado com sucesso no servidor");
    } else {
      console.log("⚠️ Refresh token não encontrado para logout");
    }
  } catch (error) {
    console.error("❌ Erro ao fazer logout no servidor:", error.response?.data || error.message);
    // Continuar com o logout local mesmo se o servidor falhar
  } finally {
    // Sempre limpar tokens locais
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    console.log("✅ Tokens removidos do localStorage");
    navigate("/login");
  }
};

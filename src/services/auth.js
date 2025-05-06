import api from "./api";

export const logout = async (navigate) => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      await api.post("/auth/logout", { refreshToken });
    }
  } catch (error) {
    console.error("❌ Erro ao fazer logout:", error);
  } finally {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  }
};

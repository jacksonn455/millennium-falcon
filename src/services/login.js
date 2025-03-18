import api from "./api";

export const login = async ({ email, password }, navigate) => {
  try {
    const response = await fetch("https://death-star.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      const { accessToken, refreshToken } = data;
      localStorage.setItem("authToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      navigate("/millennium-falcon/");
      return { accessToken, refreshToken };
    } else {
      alert(data.message || "Credenciais inválidas");
      return null;
    }
  } catch (error) {
    console.error("Erro ao tentar fazer login:", error);
    alert("Erro ao tentar fazer login.");
    return null;
  }
};

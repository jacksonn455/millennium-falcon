export const login = async ({ email, password }, navigate) => {
  try {
    const response = await fetch("https://death-star.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message || "Credenciais inválidas");
      return null;
    }

    const { accessToken, refreshToken } = await response.json();

    if (!accessToken || !refreshToken) {
      alert("Erro inesperado. Por favor, tente novamente.");
      return null;
    }

    localStorage.setItem("authToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    navigate("/millennium-falcon/");

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("❌ Erro ao tentar fazer login:", error);
    alert(
      "Erro ao tentar fazer login. Verifique sua conexão e tente novamente."
    );
    return null;
  }
};

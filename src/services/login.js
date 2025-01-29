export const login = async ({ email, password }) => {
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const token = data.token;
        localStorage.setItem("authToken", token);
        return token;
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
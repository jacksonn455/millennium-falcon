import api from "./api";

async function getPacientes() {
  try {
    const response = await api.get("/pacientes");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error);
    return [];
  }
}

export { getPacientes };

import axios from "axios";

const pacientesAPI = axios.create({
  baseURL: "http://localhost:8000/pacientes",
});

async function getPacientes() {
  try {
    const response = await pacientesAPI.get("/");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error);
    return [];
  }
}

export { getPacientes };

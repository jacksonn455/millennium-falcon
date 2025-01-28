import axios from "axios";

const agendamentosAPI = axios.create({
  baseURL: "https://death-star.onrender.com/agenda",
});

async function getAgendamentos() {
  try {
    const response = await agendamentosAPI.get("/");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    return [];
  }
}

async function createAgendamento(data) {
  try {
    const response = await agendamentosAPI.post("/", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    return null;
  }
}

export { getAgendamentos, createAgendamento };

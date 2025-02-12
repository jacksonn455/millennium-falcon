import api from "./api";

async function getAgendamentos() {
  try {
    const response = await api.get(`/agenda?week=true`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    return [];
  }
}

async function createAgendamento(data) {
  try {
    const response = await api.post("/agenda", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    return null;
  }
}

export { getAgendamentos, createAgendamento };
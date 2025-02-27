import api from "./api";

async function getAgendamentos(week = 0) {
  try {
    const response = await api.get(`/agenda?week=${week}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    return { data: [], hasNext: false, hasPrev: false };
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
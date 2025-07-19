import api from "./api";

async function getAgendamentos(pageNumber) {
  try {
    const pageParam = pageNumber ? `?pageNumber=${pageNumber}` : "";
    const response = await api.get(`/agenda${pageParam}`);
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

async function updateAgendamento(id, data) {
  try {
    const response = await api.put(`/agenda/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar agendamento:", error);
    return null;
  }
}

export { getAgendamentos, createAgendamento, updateAgendamento };
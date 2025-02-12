import api from "./api";
import moment from "moment"; 

async function getAgendamentos() {
  try {
    const today = moment().format("YYYY-MM-DD");
    const response = await api.get(`/agenda?date=${today}`);
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
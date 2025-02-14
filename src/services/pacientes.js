import api from "./api";

async function getPacientes(nome = "") {
  try {
    const response = await api.get("/pacientes", { params: { nome } });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error);
    return [];
  }
}


async function getPacienteById(id) {
  try {
    const response = await api.get(`/pacientes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar paciente por ID:", error);
    return null;
  }
}

async function createPaciente(paciente) {
  try {
    const response = await api.post("/pacientes", paciente);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar paciente:", error);
    return null;
  }
}

async function updatePaciente(id, paciente) {
  try {
    const response = await api.put(`/pacientes/${id}`, paciente);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar paciente:", error);
    return null;
  }
}

async function deletePaciente(id) {
  try {
    await api.delete(`/pacientes/${id}`);
    return true;
  } catch (error) {
    console.error("Erro ao excluir paciente:", error);
    return false;
  }
}

export { getPacientes, getPacienteById, createPaciente, updatePaciente, deletePaciente };

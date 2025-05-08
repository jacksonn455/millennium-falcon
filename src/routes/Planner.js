import React, { useState, useEffect } from "react";
import ModalAgendamento from "../components/Modal";
import api from "../services/api";
import { getAgendamentos } from "../services/planner";
import Container from "../components/Container";
import { Title, SectionTitle, AppointmentTitle } from "../components/Title";
import {
  Button,
  ButtonGroup,
  ButtonGroupPage,
  ButtonPage,
} from "../components/Button";
import { Label } from "../components/Label";
import { AnamneseInput } from "../components/Input";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { useLoading } from "../components/LoadingProvider";
import { useError } from "../components/ErrorProvider";
import {
  AppContainer,
  AppointmentList,
  AppointmentCard,
} from "../components/Div";
import Loader from "../components/Loader";

function Planner() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [paciente, setPaciente] = useState("");
  const [contact, setContact] = useState("");
  const [notes, setNotes] = useState("");
  const [responsible, setResponsible] = useState("");
  const [status, setStatus] = useState("Pendente");
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, setLoading } = useLoading();
  const { showError } = useError();
  const [currentWeek, setCurrentWeek] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments(currentWeek);
  }, [currentWeek]);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      searchAppointments(searchTerm);
    } else {
      setFilteredAppointments(appointments);
    }
  }, [searchTerm, appointments]);

  let controller = null;

  const fetchAppointments = async (pageNumber = 1) => {
    setLoading(true);

    if (controller) {
      controller.abort();
    }
    controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await getAgendamentos(pageNumber, { signal });

      if (response && response.data && response.pagination) {
        setAppointments(response.data);
        setFilteredAppointments(response.data);
        setTotalPages(response.pagination.totalPages || 1);
        setCurrentPage(response.pagination.currentPage || 1);
      } else {
        console.warn("Resposta da API não contém os dados esperados.");
      }
    } catch (error) {
      if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
        console.warn("Requisição cancelada para evitar duplicação.");
      } else {
        console.error("Erro ao buscar agendamentos:", error);
        showError(
          error.response?.data?.message || "Erro ao buscar agendamentos."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchDate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/agenda?date=${date}`);
      console.log("Resposta da API:", response.data);
      setAppointments(response.data.data || []);
      setIsModalOpen(true);
    } catch (err) {
      setError("Erro ao buscar agendamentos");
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchAppointments(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetchAppointments(currentPage - 1);
    }
  };

  const searchAppointments = async (term) => {
    try {
      const response = await api.get(`/agenda?paciente=${term}`);
      setFilteredAppointments(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      showError(
        error.response?.data?.message || "Erro ao buscar agendamentos."
      );
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAppointment = {
      date,
      time,
      paciente,
      service,
      contact,
      notes,
      responsible,
      status,
    };

    try {
      let response;

      if (editingId) {
        response = await api.put(`/agenda/${editingId}`, newAppointment);
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === editingId ? response.data.data : appointment
          )
        );
        setFilteredAppointments((prevFilteredAppointments) =>
          prevFilteredAppointments.map((appointment) =>
            appointment._id === editingId ? response.data.data : appointment
          )
        );
      } else {
        response = await api.post("/agenda", newAppointment);
        setAppointments((prevAppointments) => [
          ...prevAppointments,
          response.data.data,
        ]);
        setFilteredAppointments((prevFilteredAppointments) => [
          ...prevFilteredAppointments,
          response.data.data,
        ]);
      }

      fetchAppointments(currentPage);
      resetForm();
    } catch (error) {
      console.error("Erro ao criar/editar agendamento:", error);
      const errorMessage =
        error.response?.data?.error || "Erro ao criar o agendamento.";
      showError(errorMessage);
    }
  };

  const resetForm = () => {
    setDate("");
    setTime("");
    setPaciente("");
    setService("");
    setContact("");
    setNotes("");
    setResponsible("");
    setStatus("Pendente");
  };

  const handleDelete = (id) => {
    setAppointmentToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/agenda/${appointmentToDelete}`);

      setAppointments(
        appointments.filter(
          (appointment) => appointment._id !== appointmentToDelete
        )
      );
      setFilteredAppointments(
        filteredAppointments.filter(
          (appointment) => appointment._id !== appointmentToDelete
        )
      );

      fetchAppointments(currentPage);
    } catch (error) {
      console.error("Erro ao excluir agendamento:", error);
      showError(
        error.response?.data?.message || "Erro ao excluir agendamento."
      );
    }
    setDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
  };

  const handleEdit = (appointment) => {
    setDate(appointment.date);
    setTime(appointment.time);
    setService(appointment.service);
    setPaciente(appointment.paciente);
    setContact(appointment.contact);
    setNotes(appointment.notes);
    setResponsible(appointment.responsible);
    setStatus(appointment.status);
    setEditingId(appointment._id);
  };

  return (
    <AppContainer>
      <Container>
        <Title>{editingId ? "Editar Consulta" : "Agendar Consulta"}</Title>

        <SectionTitle>Detalhes do Agendamento</SectionTitle>
        <form onSubmit={handleSubmit}>
          <div>
            <Label>Data:</Label>
            <AnamneseInput
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Hora:</Label>
            <AnamneseInput
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Nome do Paciente:</Label>
            <AnamneseInput
              type="text"
              value={paciente}
              onChange={(e) => setPaciente(e.target.value)}
              placeholder="Digite o nome do paciente"
              required
            />
          </div>

          <div>
            <Label>Telefone ou Contato do Paciente:</Label>
            <AnamneseInput
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Digite o telefone ou contato"
            />
          </div>

          <div>
            <Label>Tipo de Serviço:</Label>
            <AnamneseInput
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="Digite o tipo de serviço"
              required
            />
          </div>

          <div>
            <Label>Observações ou Notas:</Label>
            <AnamneseInput
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Observações sobre o paciente ou procedimento"
            />
          </div>

          <div>
            <Label>Profissional Responsável:</Label>
            <AnamneseInput
              type="text"
              value={responsible}
              onChange={(e) => setResponsible(e.target.value)}
              placeholder="Nome do profissional responsável"
            />
          </div>

          <ButtonGroup>
            <Button type="submit">
              {editingId ? "Salvar Alterações" : "Agendar"}
            </Button>
            {editingId && (
              <Button
                onClick={() => {
                  setEditingId(null);
                  resetForm();
                }}
              >
                Cancelar
              </Button>
            )}
          </ButtonGroup>
        </form>

        <SectionTitle>Buscar Paciente</SectionTitle>
        <AnamneseInput
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Buscar paciente por nome"
        />

        <div>
          <SectionTitle>Buscar por Data:</SectionTitle>
          <AnamneseInput
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button
            onClick={handleSearchDate}
            disabled={!date || loading}
            style={{ marginTop: "20px" }}
          >
            {loading ? "Buscando..." : "Buscar"}
          </Button>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <ModalAgendamento
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            agendamentos={appointments}
          />
        </div>

        <SectionTitle>Agendamentos da Semana</SectionTitle>
        <AppointmentList>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) =>
              appointment && appointment.paciente ? (
                <AppointmentCard key={appointment._id}>
                  <AppointmentTitle>
                    Consulta de {appointment.paciente}
                  </AppointmentTitle>
                  <p>
                    <strong>Data:</strong> {appointment.date}
                  </p>
                  <p>
                    <strong>Hora:</strong> {appointment.time}
                  </p>
                  <p>
                    <strong>Tipo de Serviço:</strong> {appointment.service}
                  </p>
                  <p>
                    <strong>Telefone/Contato:</strong> {appointment.contact}
                  </p>
                  <p>
                    <strong>Observações:</strong> {appointment.notes}
                  </p>
                  <p>
                    <strong>Profissional Responsável:</strong>{" "}
                    {appointment.responsible}
                  </p>
                  <ButtonGroup>
                    <Button onClick={() => handleEdit(appointment)}>
                      Editar
                    </Button>
                    <Button onClick={() => handleDelete(appointment._id)}>
                      Excluir
                    </Button>
                  </ButtonGroup>
                </AppointmentCard>
              ) : null
            )
          ) : (
            <p>Nenhum agendamento encontrado nesta semana.</p>
          )}
        </AppointmentList>

        <ButtonGroupPage>
          <ButtonPage onClick={handlePreviousPage} disabled={currentPage === 1}>
            Anterior
          </ButtonPage>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <ButtonPage
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Próxima
          </ButtonPage>
        </ButtonGroupPage>
      </Container>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      {loading && <Loader />}
    </AppContainer>
  );
}

export default Planner;

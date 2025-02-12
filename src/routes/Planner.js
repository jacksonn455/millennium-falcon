import React, { useState, useEffect } from "react";
import api from "../services/api";
import { getAgendamentos } from "../services/planner";
import Container from "../components/Container";
import { Title, SectionTitle, AppointmentTitle } from "../components/Title";
import { Button, ButtonGroup } from "../components/Button";
import { Label } from "../components/Label";
import { AnamneseInput } from "../components/Input";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import {
  AppContainer,
  AppointmentList,
  AppointmentCard,
} from "../components/Div";

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

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      searchAppointments(searchTerm);
    } else {
      setFilteredAppointments(appointments);
    }
  }, [searchTerm]);

  const fetchAppointments = async () => {
    try {
      const appointmentsData = await getAgendamentos();
      setAppointments(appointmentsData);
      setFilteredAppointments(appointmentsData);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  };

  const searchAppointments = async (term) => {
    try {
      const response = await api.get(`/agenda?paciente=${term}`);
      setFilteredAppointments(response.data);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
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
      if (editingId) {
        const response = await api.put(`/agenda/${editingId}`, newAppointment);
        setAppointments(
          appointments.map((appointment) =>
            appointment._id === editingId ? response.data : appointment
          )
        );
        setFilteredAppointments(
          filteredAppointments.map((appointment) =>
            appointment._id === editingId ? response.data : appointment
          )
        );
        setEditingId(null);
      } else {
        const response = await api.post("/agenda", newAppointment);
        setAppointments([...appointments, response.data]);
        setFilteredAppointments([...filteredAppointments, response.data]);
      }

      resetForm();
    } catch (error) {
      console.error("Erro ao criar/editar agendamento:", error);
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
      setAppointments(appointments.filter((appointment) => appointment._id !== appointmentToDelete));
      setFilteredAppointments(filteredAppointments.filter((appointment) => appointment._id !== appointmentToDelete));
    } catch (error) {
      console.error("Erro ao excluir agendamento:", error);
      alert("Erro ao excluir agendamento.");
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

        <SectionTitle>Consultas Agendadas</SectionTitle>
        <AppointmentList>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
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
                  <Button onClick={() => handleEdit(appointment)}>Editar</Button>
                  <Button onClick={() => handleDelete(appointment._id)}>
                    Excluir
                  </Button>
                </ButtonGroup>
              </AppointmentCard>
            ))
          ) : (
            <p>Nenhum agendamento encontrado no dia de hoje.</p>
          )}
        </AppointmentList>
      </Container>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </AppContainer>
  );
}

export default Planner;
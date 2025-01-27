import React, { useState } from "react";
import axios from "axios"; // Importar axios para fazer a requisição HTTP
import Container from "../components/Container";
import { Title, SectionTitle, AppointmentTitle } from "../components/Title";
import { Button, ButtonGroup } from "../components/Button";
import { Label } from "../components/Label";
import { AnamneseInput } from "../components/Input";
import { AppContainer, AppointmentList, AppointmentCard } from "../components/Div";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAppointment = { date, time, paciente, service, contact, notes, responsible, status };

    try {
      const response = await axios.post("http://localhost:8000/agenda", newAppointment);
      setAppointments([...appointments, response.data]);

      setDate("");
      setTime("");
      setPaciente("");
      setService("");
      setContact("");
      setNotes("");
      setResponsible("");
      setStatus("Pendente");
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
    }
  };

  return (
    <AppContainer>
      <Container>
        <Title>Agendar Consulta</Title>

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
            <Button type="submit">Agendar</Button>
          </ButtonGroup>
        </form>

        <SectionTitle>Consultas Agendadas</SectionTitle>
        <AppointmentList>
          {appointments.map((appointment, index) => (
            <AppointmentCard key={index}>
              <AppointmentTitle>Consulta de {appointment.paciente}</AppointmentTitle>
              <p><strong>Data:</strong> {appointment.date}</p>
              <p><strong>Hora:</strong> {appointment.time}</p>
              <p><strong>Tipo de Serviço:</strong> {appointment.service}</p>
              <p><strong>Telefone/Contato:</strong> {appointment.contact}</p>
              <p><strong>Observações:</strong> {appointment.notes}</p>
              <p><strong>Profissional Responsável:</strong> {appointment.responsible}</p>
              <p><strong>Status:</strong> {appointment.status}</p>
            </AppointmentCard>
          ))}
        </AppointmentList>
      </Container>
    </AppContainer>
  );
}

export default Planner;
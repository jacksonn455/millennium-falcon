import React, { useState } from "react";
import styled from "styled-components";
import Container from "../components/Container";
import { Title, SectionTitle } from "../components/Title";
import { Button, ButtonGroup } from "../components/Button";
import { Label } from "../components/Label";
import { AnamneseInput } from "../components/Input";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

function Planner() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [paciente, setPaciente] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Agendamento realizado:", { date, time, service });
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
            <Label>Tipo de Serviço:</Label>
            <AnamneseInput
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="Digite o tipo de serviço"
              required
            />
          </div>

          <ButtonGroup>
            <Button type="submit">Agendar</Button>
          </ButtonGroup>
        </form>
      </Container>
    </AppContainer>
  );
}

export default Planner;
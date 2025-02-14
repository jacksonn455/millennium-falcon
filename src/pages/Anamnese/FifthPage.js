import React, { useRef, useState } from "react";
import {
  SignatureCanvasWrapper,
  SignatureArea,
} from "../../components/SignatureCanvasWrapper";
import Container from "../../components/Container";
import { Title, SectionTitle } from "../../components/Title";
import { Button, ButtonGroup } from "../../components/Button";
import { InputData, InputRow } from "../../components/Input";
import { Paragraph } from "../../components/Paragraph";

const FifthPage = ({ prevPage, submitForm, setFormData, formData }) => {
  const signatureRef1 = useRef(null);
  const signatureRef2 = useRef(null);

  const [treatment, setTreatment] = useState("");
  const [sessions, setSessions] = useState("");
  const [sessionValue, setSessionValue] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [preScheduling, setPreScheduling] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const clearSignature1 = () => signatureRef1.current.clear();
  const clearSignature2 = () => signatureRef2.current.clear();

  const handleSaveData = () => {
    const updatedFormData = {
      ...formData,
      treatment: treatment,
      sessions: sessions,
      sessionValue: sessionValue,
      totalValue: totalValue,
      preScheduling: preScheduling,
      scheduleTime: scheduleTime,
      contractSignatures: {
        clientSignature: signatureRef1.current.toDataURL(), // Convertendo a assinatura para um formato que pode ser enviado
        providerSignature: signatureRef2.current.toDataURL(),
      },
    };
    setFormData(updatedFormData);
    submitForm(); // Enviar os dados do formulário
  };

  return (
    <Container>
      <Title>Tratamento Sugerido</Title>

      <InputRow>
        <InputData
          type="text"
          placeholder="Tratamento"
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
        />
        <InputData
          type="text"
          placeholder="Nº de Sessões"
          value={sessions}
          onChange={(e) => setSessions(e.target.value)}
        />
      </InputRow>

      <InputRow>
        <InputData
          type="text"
          placeholder="Valor por Sessão (R$)"
          value={sessionValue}
          onChange={(e) => setSessionValue(e.target.value)}
        />
        <InputData
          type="text"
          placeholder="Valor Total (R$)"
          value={totalValue}
          onChange={(e) => setTotalValue(e.target.value)}
        />
      </InputRow>

      <InputRow>
        <InputData
          type="text"
          placeholder="Pré-agendamento"
          value={preScheduling}
          onChange={(e) => setPreScheduling(e.target.value)}
        />
        <InputData
          type="text"
          placeholder="Horário"
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
        />
      </InputRow>

      <SectionTitle>Contrato de Serviços Estéticos</SectionTitle>

      {/* Parágrafos de contrato aqui */}

      <SignatureArea>
        <SignatureCanvasWrapper
          refCanvas={signatureRef1}
          onClear={clearSignature1}
          label="Assinatura da CONTRATANTE"
        />
        <SignatureCanvasWrapper
          refCanvas={signatureRef2}
          onClear={clearSignature2}
          label="Assinatura da CONTRATADA"
        />
      </SignatureArea>

      <ButtonGroup>
        <Button onClick={prevPage}>Voltar</Button>
        <Button onClick={handleSaveData}>Finalizar</Button>
      </ButtonGroup>
    </Container>
  );
};

export default FifthPage;

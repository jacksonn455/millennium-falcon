import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  max-width: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  position: relative; /* Garantir que o botão de fechar esteja posicionado dentro do modal */
`;

const CloseButton = styled.button`
  background: #f44336;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 14px;
  transition: background 0.3s;

  &:hover {
    background: #d32f2f;
  }
`;

const ContentWrapper = styled.div`
  max-height: 400px; /* Define a altura máxima para o conteúdo */
  overflow-y: auto; /* Habilita rolagem vertical se necessário */
  padding-right: 10px; /* Espaço para a barra de rolagem */
`;

const AgendamentoItem = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fafafa;

  p {
    margin: 5px 0;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ModalAgendamento = ({ isOpen, onClose, agendamentos = [] }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>Fechar</CloseButton>
        <h2>Agendamentos</h2>
        <ContentWrapper>
          {agendamentos.length > 0 ? (
            agendamentos.map((agendamento) => (
              <AgendamentoItem key={agendamento._id}>
                <p>
                  <strong>Paciente:</strong> {agendamento.paciente}
                </p>
                <p>
                  <strong>Serviço:</strong> {agendamento.service}
                </p>
                <p>
                  <strong>Data:</strong> {agendamento.date}
                </p>
                <p>
                  <strong>Hora:</strong> {agendamento.time}
                </p>
              </AgendamentoItem>
            ))
          ) : (
            <p>Nenhum agendamento encontrado.</p>
          )}
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalAgendamento;

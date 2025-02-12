import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  text-align: center;
  position: relative;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  color: #a8235e;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px 24px;
  background: ${(props) => (props.danger ? "#a8235e" : "#ccc")};
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.danger ? "#8b1e4d" : "#aaa")};
  }
`;

const ConfirmDeleteModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <Modal>
        <Title>Confirmar Exclusão</Title>
        <p>Tem certeza que deseja excluir?</p>
        <ButtonGroup>
          <Button danger onClick={onConfirm}>Confirmar</Button>
          <Button onClick={onCancel}>Cancelar</Button>
        </ButtonGroup>
      </Modal>
    </Overlay>
  );
};

export default ConfirmDeleteModal;
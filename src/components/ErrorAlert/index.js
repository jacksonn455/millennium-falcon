import React from "react";
import styled from "styled-components";
import { useError } from "../ErrorProvider";

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
  background: #fce4ec;
  color: #c2185b;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  text-align: center;
  position: relative;
  border: 2px solid #c2185b;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  color: #c2185b;
  cursor: pointer;
`;

const Message = styled.p`
  font-size: 16px;
  margin-top: 10px;
`;

const ErrorAlert = () => {
  const { error, showError } = useError();

  if (!error) return null;

  const handleClose = () => {
    showError(null);
  };

  return (
    <Overlay>
      <Modal>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <h2>Erro</h2>
        <Message>{error}</Message>
      </Modal>
    </Overlay>
  );
};

export default ErrorAlert;
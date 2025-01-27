import React from "react";
import styled from "styled-components";
import SignatureCanvas from "react-signature-canvas";

const Wrapper = styled.div`
  text-align: center;
  flex: 1;
  margin: 0 10px;
`;

const SignatureLine = styled.div`
  width: 100%;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
`;

const ClearButton = styled.button`
  padding: 10px 20px;
  background: linear-gradient(45deg, #c7628f, #d883a3);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover {
    background: linear-gradient(45deg, #b0507e, #c7628f);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const SignatureArea = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const SignatureBox = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid #ddd;
  background: #f9f9f9;
  margin-top: 10px;
`;

const SignatureCanvasWrapper = ({ refCanvas, onClear, label }) => (
  <Wrapper>
    <div>{label}</div>
    <SignatureLine />
    <SignatureCanvas
      ref={refCanvas}
      penColor="black"
      canvasProps={{
        width: 300,
        height: 100,
        className: "signature-canvas",
      }}
    />
    <ClearButton onClick={onClear}>Limpar</ClearButton>
  </Wrapper>
);

const Signatures = ({ refCanvas, onClear, label }) => (
    <Wrapper>
      <div>{label}</div>
      <SignatureLine />
      <SignatureCanvas
        ref={refCanvas}
        penColor="black"
        canvasProps={{
          width: 100,
          height: 100,
          className: "signature-canvas",
        }}
      />
      <ClearButton onClick={onClear}>Limpar</ClearButton>
    </Wrapper>
  );

export { SignatureCanvasWrapper, Signatures, SignatureArea, SignatureBox };

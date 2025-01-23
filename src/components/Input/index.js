import styled from "styled-components";

const Input = styled.input`
  border: 1px solid #fff;
  background: transparent;
  border: 1px solid #fff;
  padding: 20px 140px;
  border-radius: 50px;
  width: 210px;
  color: #fff;
  font-size: 16px;
  margin-bottom: 10px;

  &::placeholder {
    color: #fff;
    font-size: 16px;
  }
`;

const AnamneseInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #c7628f;
`;

const InputData = styled.input`
  width: 100%;
  padding: 5px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 14px;
  outline: none;
  margin-bottom: 10px;
  border-radius: 4px;
  color: #c7628f;
`;

const InputRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  color: #c7628f;
`;

const FooterInput = styled.input`
  border: none;
  border-bottom: 1px solid #ddd;
  text-align: center;
  padding: 5px;
  width: 150px;
  color: #c7628f;
`;

export { Input, AnamneseInput, InputData, InputRow, FooterInput };
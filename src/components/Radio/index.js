import styled from "styled-components";

const RadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 5px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #c7628f;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const RadioInput = styled.input`
  margin-right: 5px;
  accent-color: #c7628f;
`;

export { RadioGroup, RadioLabel, RadioInput };
import styled from "styled-components";

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const Checkbox = styled.input`
  margin-right: 10px;
  @media (max-width: 768px) {
    margin-right: 8px;
  }
`;

export { CheckboxGroup, CheckboxContainer, Checkbox };
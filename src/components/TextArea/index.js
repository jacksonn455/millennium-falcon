import styled from "styled-components";

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
  color: #c7628f;
  margin-top: 10px;

  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
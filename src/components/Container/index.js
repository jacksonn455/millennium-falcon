import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  color: #c7628f;

  @media (max-width: 768px) {
    padding: 10px;
    max-width: 100%;
  }
`;

export default Container;

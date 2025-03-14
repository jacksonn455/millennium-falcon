import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
  color: #333;
  text-align: center;
  padding: 20px;
  margin-top: -120px;
`;

const Title = styled.h1`
  font-size: 6rem;
  font-weight: bold;
  color: #a8235e;
  margin: 0;
  padding-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: #666;
  margin-top: 0;
  padding-bottom: 30px;
`;

const Button = styled(Link)`
  margin-top: 0;
  padding: 12px 20px;
  background: linear-gradient(45deg, #c7628f, #d883a3);
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #b0507e, #c7628f);
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export default function NotFound() {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Subtitle>Página não encontrada</Subtitle>
      <Button to="/">Voltar para o início</Button>
    </NotFoundContainer>
  );
}

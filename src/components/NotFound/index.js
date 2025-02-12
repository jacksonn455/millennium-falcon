import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #8b1e4d, #ffffff);
  color: #ffffff;
  text-align: center;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 8rem;
  font-weight: bold;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 5rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  margin-top: 10px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Text = styled.p`
  margin-top: 15px;
  max-width: 500px;
  font-size: 1.2rem;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 90%;
  }
`;

const Button = styled(Link)`
  margin-top: 30px;
  padding: 12px 25px;
  background-color: #ffffff;
  color: #8b1e4d;
  text-decoration: none;
  border-radius: 50px;
  font-size: 1.3rem;
  font-weight: bold;
  transition: background 0.3s, transform 0.2s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #a5295c;
    color: #ffffff;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 10px 20px;
  }
`;

export default function NotFound() {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Subtitle>Página não encontrada</Subtitle>
      <Text>Ops! A página que você está procurando não existe. Verifique o endereço ou volte para a página inicial.</Text>
      <Button to="/">Voltar para o início</Button>
    </NotFoundContainer>
  );
}

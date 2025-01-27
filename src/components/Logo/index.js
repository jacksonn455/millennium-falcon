import logo from "../../assets/images/logo.png";
import styled from "styled-components";
import "@fontsource/pacifico"; 
import "@fontsource/playwrite-in";
import { Link } from "react-router-dom";

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  color: #a8235e;

  &:hover {
    color: #ff0073;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LogoImg = styled.img`
  height: 110px;
  width: 110px;

  @media (max-width: 768px) {
    height: 80px; /* Ajusta o tamanho da imagem para dispositivos menores */
    width: 80px;
  }
`;

const TextContainer = styled(Link)`
  display: flex;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 10px;
  }
`;

const Name = styled.p`
  font-size: 34px;
  font-family: "Pacifico", serif;
  margin: 0;
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 28px; /* Ajusta o tamanho da fonte em telas menores */
  }
`;

const LastName = styled.p`
  font-size: 31px;
  font-family: "Playwrite IN", serif;
  margin: 0;
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 26px; /* Ajusta o tamanho da fonte em telas menores */
  }
`;

function Logo() {
  return (
    <LogoContainer>
      <LogoImg src={logo} alt="logo" />
      <TextContainer to="/">
        <Name>Nágila</Name>
        <LastName>Zortéa</LastName>
      </TextContainer>
    </LogoContainer>
  );
}

export default Logo;
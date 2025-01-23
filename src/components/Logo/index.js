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
`;

const LogoImg = styled.img`
  height: 110px;
  width: 110px;
`;

const TextContainer = styled(Link)`
  display: flex;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
`;

const Name = styled.p`
  font-size: 34px;
  font-family: "Pacifico", serif;
  margin: 0;
  text-decoration: none;
`;

const LastName = styled.p`
  font-size: 31px;
  font-family: "Playwrite IN", serif;
  margin: 0;
  text-decoration: none;
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
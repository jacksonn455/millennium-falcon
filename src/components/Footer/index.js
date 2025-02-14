import styled from "styled-components";

const FooterContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-image: linear-gradient(90deg, rgb(244, 71, 149) 35%, #faaccc 165%);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  width: 100%;
  box-sizing: border-box;
  position: relative;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const FooterField = styled.div`
  text-align: center;
  width: 100%;
  color: #fff;

  @media (min-width: 768px) {
    width: auto;
  }
`;

const FooterText = styled.p`
  font-size: 14px;
  color: #fff;
  margin: 5px 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterField>
        <FooterText>&copy; 2025 Nágila Zortéa</FooterText>
        <FooterText>Todos os direitos reservados.</FooterText>
      </FooterField>
    </FooterContainer>
  );
};

export default Footer;
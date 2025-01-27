import styled from "styled-components";

const Section = styled.div`
  margin-bottom: 20px;
`;

const TermsContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f9f9f9;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const Term = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Footer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const FooterField = styled.div`
  text-align: center;
  width: 100%;
  @media (min-width: 768px) {
    width: auto;
  }
`;

const ProdutoList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  gap: 10px;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 15px;
  }
`;

const MessageCard = styled.div`
  background-color: #fff;
  padding: 20px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 15px;
  }
`;

const NewUsers = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const CardContainer = styled.div`
  background-color: #fff;
  padding: 25px 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  max-width: 600px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 20px;
    margin-left: 15px;
  }
`;

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const ProductList = styled.div`
  margin-top: 20px;
`;

const ProductCard = styled.div`
  background-color: #f9f9f9;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const AppointmentList = styled.div`
  margin-top: 20px;
`;

const AppointmentCard = styled.div`
  background-color: #f9f9f9;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

export {
  Section,
  TermsContainer,
  Term,
  Footer,
  FooterField,
  ProdutoList,
  MessageCard,
  NewUsers,
  CardContainer,
  AppContainer,
  ProductList,
  ProductCard,
  AppointmentList,
  AppointmentCard
};
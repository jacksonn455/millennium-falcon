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
`;

const FooterField = styled.div`
  text-align: center;
`;

const ProdutoList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  gap: 10px;
  padding: 0 20px;
  margin-left: 40px;
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
`;

const NewUsers = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
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

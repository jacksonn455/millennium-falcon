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

export { Section, TermsContainer, Term, Footer, FooterField };
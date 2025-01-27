import styled from "styled-components";

export const Title = styled.h2`
  width: 100%;
  padding: 30px 0;
  background-color: #fff;
  color: ${(props) => props.color || "#a8235e"};
  font-size: ${(props) => props.size || "36px"};
  text-align: ${(props) => props.align || "center"};
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${(props) => props.size || "28px"};
    padding: 20px 0;
  }

  @media (max-width: 480px) {
    font-size: ${(props) => props.size || "24px"};
    padding: 15px 0;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  color: #a8235e;
  margin-top: 20px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-top: 15px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    margin-top: 10px;
  }
`;

export const ProductName = styled.h3`
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const AppointmentTitle = styled.h3`
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;
import styled from "styled-components";

export const Title = styled.h2`
  width: 100%;
  padding: 30px 0;
  background-color: #fff;
  color: ${(props) => props.color || "#a8235e"};
  font-size: ${(props) => props.size || "36px"};
  text-align: ${(props) => props.align || "center"};
  margin: 0;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  color: #a8235e;
  margin-top: 20px;
  font-weight: bold;
`;

export const ProductName = styled.h3`
  margin: 0;
`;

export const AppointmentTitle = styled.h3`
  margin: 0;
`;

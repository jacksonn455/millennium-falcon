import styled from "styled-components";

const Paragraph = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 10px;
  text-align: justify;
  color: #a8235e;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ProdutoTitulo = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;

  @media (max-width: 768px) {
    font-size: 16px;
  }

    @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ProdutoDescricao = styled.p`
  font-size: 16px;
  margin: 5px 0;
  color: ${(props) => props.cor || "#333"};

  @media (max-width: 768px) {
    font-size: 14px;
  color: ${(props) => props.cor || "#000"};

  @media (max-width: 480px) {
    font-size: 12px;
    color: ${(props) => props.cor || "#000"};
  }
`;

export { Paragraph, ProdutoTitulo, ProdutoDescricao };
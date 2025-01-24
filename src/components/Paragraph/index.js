import styled from "styled-components";

const Paragraph = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 10px;
  text-align: justify;
  color: #a8235e;
`;

const ProdutoTitulo = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
`;

const ProdutoDescricao = styled.p`
  font-size: 16px;
  margin: 5px 0;
  color: ${(props) => props.cor || "#333"};
`;

export { Paragraph, ProdutoTitulo, ProdutoDescricao };

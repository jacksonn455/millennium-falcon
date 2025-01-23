import styled from "styled-components";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); // Mudança de 8 para 4 colunas
  gap: 1px;
  background: #c7628f;
`;

const TableCell = styled.div`
  background: #fff;
  border: 1px solid #c7628f;
  text-align: center;
  padding: 10px;
`;

export { TableContainer, Table, TableCell };
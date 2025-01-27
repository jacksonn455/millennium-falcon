import styled from "styled-components";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: #c7628f;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const TableCell = styled.div`
  background: #fff;
  border: 1px solid #c7628f;
  text-align: center;
  padding: 10px;
`;

export { TableContainer, Table, TableCell };
import styled from "styled-components";

const UsersActiveContainer = styled.section`
  background-color: #ebecee;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;

  @media (max-width: 768px) {
    padding-top: 20px;
    padding-bottom: 20px;
  }
`;

export { UsersActiveContainer };

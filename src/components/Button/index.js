import styled from "styled-components";

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  flex-wrap: wrap;
  gap: 15px;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  background: linear-gradient(45deg, #c7628f, #d883a3);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  width: auto;

  &:hover {
    background: linear-gradient(45deg, #b0507e, #c7628f);
    transform: scale(1.05);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
    width: 100%;
  }
`;

const ButtonHome = styled.button`
  background-color: #a8235e;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  font-weight: 900;
  cursor: pointer;
  margin-top: 20px;
  width: 150px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #8b1e4d;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 20px;
    font-size: 14px;
  }
`;

const ButtonEstatistica = styled.button`
  background-color: #a8235e;
  color: #FFF;
  padding: 10px 0px;
  font-size: 16px;
  border: none;
  font-weight: 900;
  display: block;
  text-align: center;
  width: 150px;
  transition: background-color 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: #8b1e4d;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 20px;
    font-size: 14px;
  }
`;

export { ButtonGroup, Button, ButtonHome, ButtonEstatistica };
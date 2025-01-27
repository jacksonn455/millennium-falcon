import styled from "styled-components";
import { Title } from "../Title";
import { ButtonHome } from "../Button";

const Card = styled.div`
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 10px auto 0 auto;
  padding: 25px 20px;
  width: 100%;
  max-width: 600px;
  @media (max-width: 768px) {
    max-width: 90%;
    padding: 15px 10px;
  }
`;

const BirthdayList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
  margin: 20px 0;
  width: 100%;
  margin-left: 0;
  @media (max-width: 768px) {
    margin-left: 0;
    justify-content: center;
  }
`;

const BirthdayItem = styled.div`
  display: flex;
  align-items: center;
  width: 48%;
  margin-bottom: 10px;
  font-size: 16px;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    margin-bottom: 15px;
  }
`;

const ProfileImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-right: 15px;
  @media (max-width: 768px) {
    width: 75px;
    height: 75px;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

const BirthdayDate = styled.span`
  font-size: 14px;
  color: #555;
`;

function BirthdayCard({ title, birthdays }) {
  return (
    <Card>
      <Title fontSize="16px" color="#A8235E" alignment="center">
        {title}
      </Title>
      <BirthdayList>
        {birthdays.map((birthday, index) => (
          <BirthdayItem key={index}>
            <ProfileImage src={birthday.src} alt={birthday.nome} />
            <InfoContainer>
              <Name>Nome: {birthday.nome}</Name>
              <BirthdayDate>Idade: {birthday.age} anos</BirthdayDate>
              <BirthdayDate>Nascimento: {birthday.birthday}</BirthdayDate>
            </InfoContainer>
          </BirthdayItem>
        ))}
      </BirthdayList>
      <ButtonHome>Veja mais</ButtonHome>
    </Card>
  );
}

export default BirthdayCard;
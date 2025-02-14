import { useState } from "react";
import styled from "styled-components";
import { Title } from "../Title";

export const birthdays = [
  {
    nome: "João Silva",
    birthday: "15/02/1990",
    age: 35,
    src: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    nome: "Maria Oliveira",
    birthday: "17/02/1985",
    age: 40,
    src: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    nome: "Carlos Souza",
    birthday: "19/02/1992",
    age: 33,
    src: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    nome: "Ana Costa",
    birthday: "20/02/1995",
    age: 30,
    src: "https://randomuser.me/api/portraits/women/2.jpg",
  },
];

const CarouselContainer = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
`;

const CarouselWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
`;

const CarouselItem = styled.div`
  display: flex;
  justify-content: center;
  min-width: 100%;
  padding: 10px;
`;

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

const NoProdutosMessage = styled.div`
  background-color: #fff3f3;
  color: #8b1e4d;
  border: 1px solid #8b1e4d;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  font-size: 18px;
  margin-bottom: 15px;
  margin-top: 20px;
`;

const PaginationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

function BirthdayCard() {
  const [currentPageAniversariantes, setCurrentPageAniversariantes] = useState(0);
  const itemsPerPage = 2;

  const totalPagesAniversariantes = Math.ceil(birthdays.length / itemsPerPage);

  const goToNextPageAniversariantes = () => {
    if (currentPageAniversariantes < totalPagesAniversariantes - 1) {
      setCurrentPageAniversariantes(currentPageAniversariantes + 1);
    }
  };

  const goToPreviousPageAniversariantes = () => {
    if (currentPageAniversariantes > 0) {
      setCurrentPageAniversariantes(currentPageAniversariantes - 1);
    }
  };

  const currentItemsAniversariantes = birthdays.slice(
    currentPageAniversariantes * itemsPerPage,
    (currentPageAniversariantes + 1) * itemsPerPage
  );

  return (
    <div>
      {birthdays.length > 0 ? (
        <>
          <Card>
            <Title fontSize="16px" color="#A8235E" alignment="center">
              Aniversariantes da Semana
            </Title>
            <CarouselContainer>
              <CarouselWrapper
                style={{
                  transform: `translateX(-${currentPageAniversariantes * 100}%)`,
                }}
              >
                {Array.from({ length: totalPagesAniversariantes }).map((_, pageIndex) => (
                  <CarouselItem key={pageIndex}>
                    <BirthdayList>
                      {birthdays
                        .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                        .map((birthday, index) => (
                          <BirthdayItem key={index}>
                            <ProfileImage
                              src={birthday.src}
                              alt={birthday.nome}
                            />
                            <InfoContainer>
                              <Name>{birthday.nome}</Name>
                              <BirthdayDate>Idade: {birthday.age} anos</BirthdayDate>
                              <BirthdayDate>Data de Nascimento: {birthday.birthday}</BirthdayDate>
                            </InfoContainer>
                          </BirthdayItem>
                        ))}
                    </BirthdayList>
                  </CarouselItem>
                ))}
              </CarouselWrapper>
            </CarouselContainer>
          </Card>

          {/* Botões de navegação com mais espaçamento */}
          <PaginationButtons>
            <button
              onClick={goToPreviousPageAniversariantes}
              disabled={currentPageAniversariantes === 0}
            >
              Anterior
            </button>
            <button
              onClick={goToNextPageAniversariantes}
              disabled={currentPageAniversariantes === totalPagesAniversariantes - 1}
            >
              Próximo
            </button>
          </PaginationButtons>
        </>
      ) : (
        <NoProdutosMessage>
          <p>Nenhum aniversariante nesta semana.</p>
        </NoProdutosMessage>
      )}
    </div>
  );
}

export default BirthdayCard;
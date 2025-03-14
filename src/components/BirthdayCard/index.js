import { useState, useEffect } from "react";
import styled from "styled-components";
import { SectionTitle } from "../Title";
import api from "../../services/api";
import { UsersActiveContainer } from "../Section";

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
  @media (max-width: 768px) {
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
  const [birthdays, setBirthdays] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;

  useEffect(() => {
    async function fetchBirthdays() {
      try {
        const response = await api.get("/pacientes?aniversariantesSemana=true");
        setBirthdays(
          response.data.map(({ nome, idade, dataNascimento }) => ({
            nome,
            idade,
            dataNascimento: new Date(dataNascimento).toLocaleDateString(
              "pt-BR"
            ),
          }))
        );
      } catch (error) {
        setBirthdays([]);
        console.error("Erro ao buscar aniversariantes:", error);
      }
    }
    fetchBirthdays();
  }, []);

  const totalPages = Math.ceil(birthdays.length / itemsPerPage);

  return (
    <div>
      <UsersActiveContainer>
      <SectionTitle>Aniversariantes da Semana</SectionTitle>
      {birthdays.length > 0 ? (
        <>
          <Card>
            <CarouselContainer>
              <CarouselWrapper
                style={{ transform: `translateX(-${currentPage * 100}%)` }}
              >
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                  <CarouselItem key={pageIndex}>
                    <BirthdayList>
                      {birthdays
                        .slice(
                          pageIndex * itemsPerPage,
                          (pageIndex + 1) * itemsPerPage
                        )
                        .map((birthday, index) => (
                          <BirthdayItem key={index}>
                            <InfoContainer>
                              <Name>{birthday.nome}</Name>
                              <BirthdayDate>
                                Idade: {birthday.idade} anos
                              </BirthdayDate>
                              <BirthdayDate>
                                Data de Nascimento: {birthday.dataNascimento}
                              </BirthdayDate>
                            </InfoContainer>
                          </BirthdayItem>
                        ))}
                    </BirthdayList>
                  </CarouselItem>
                ))}
              </CarouselWrapper>
            </CarouselContainer>
          </Card>
          <PaginationButtons>
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
            >
              Anterior
            </button>
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages - 1, currentPage + 1))
              }
              disabled={currentPage === totalPages - 1}
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
      </UsersActiveContainer>
    </div>
  );
}

export default BirthdayCard;

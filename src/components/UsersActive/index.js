import { useEffect, useState } from "react";
import { CardRecomenda, getProximosProdutosVencimento } from "../Card";
import BirthdayCard from "../BirthdayCard";
import { birthdays } from "../BirthdayCard/dataBirthday";
import img from "../../assets/images/estatistica.png";
import { ProdutoTitulo, ProdutoDescricao } from "../Paragraph";
import { ProdutoList, MessageCard, NewUsers, CardContainer } from "../Div";
import { UsersActiveContainer } from "../Section";
import styled from "styled-components";
import { ButtonHome } from "../Button";
import dayjs from "dayjs";
import api from "../../services/api";

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
    width: 60px;
    height: 60px;
  }
`;

const CarouselContainer = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: center;
  margin-bottom: 20px;
`;

const CarouselItem = styled.div`
  min-width: 33.33%;
  transition: transform 0.5s ease;
`;

const SectionTitle = styled.h2`
  color: #8b1e4d;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
`;

const AtendimentoCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  text-align: center;

  p {
    color: #333;
    font-size: 16px;
    margin: 5px 0;
  }

  p strong {
    color: #8b1e4d;
  }
`;

const NoAtendimentosMessage = styled.div`
  background-color: #fff3f3;
  color: #8b1e4d;
  border: 1px solid #8b1e4d;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  font-size: 18px;
`;

function UsersActive() {
  const [proximosAtendimentos, setProximosAtendimentos] = useState([]);
  const proximosProdutos = getProximosProdutosVencimento();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    async function fetchAtendimentos() {
      try {
        const dataAtual = dayjs().format("YYYY-MM-DD");
        const response = await api.get(`/agenda?date=${dataAtual}`);
        setProximosAtendimentos(response.data);
      } catch (error) {
        console.error("Erro ao buscar atendimentos", error);
      }
    }
    fetchAtendimentos();
  }, []);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(proximosAtendimentos.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentItems = proximosAtendimentos.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <UsersActiveContainer>
      <SectionTitle>Próximos atendimentos agendados</SectionTitle>

      {proximosAtendimentos.length > 0 ? (
        <>
          <CarouselContainer>
            {currentItems.map((atendimento, index) => {
              const atendimentoDate = dayjs(`${atendimento.date} ${atendimento.time}`).format("DD/MM/YYYY HH:mm");
              return (
                <CarouselItem key={index}>
                  <AtendimentoCard>
                    <img
                      src={require("../../assets/images/user.png")}
                      alt={atendimento.paciente}
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "50%",
                        marginBottom: "10px",
                      }}
                    />
                    <p><strong>{atendimento.paciente}</strong></p>
                    <p><strong>Serviço:</strong> {atendimento.service}</p>
                    <p><strong>Responsável:</strong> {atendimento.responsible}</p>
                    <p><strong>Anotações:</strong> {atendimento.notes}</p>
                    <p><strong>Horário:</strong> {atendimentoDate}</p>
                  </AtendimentoCard>
                </CarouselItem>
              );
            })}
          </CarouselContainer>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={goToPreviousPage} disabled={currentPage === 0}>
              Anterior
            </button>
            <button onClick={goToNextPage} disabled={currentPage === totalPages - 1}>
              Próximo
            </button>
          </div>
        </>
      ) : (
        <NoAtendimentosMessage>
          <p>Nenhum atendimento agendado para hoje.</p>
        </NoAtendimentosMessage>
      )}

      {/* Renderização dos produtos próximos ao vencimento */}
      {proximosProdutos.length > 0 ? (
        <CardContainer>
          <SectionTitle>Produtos Próximos ao Vencimento</SectionTitle>
          <ProdutoList>
            {proximosProdutos.map((produto) => (
              <div
                key={produto.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <ProfileImage src={produto.src} alt={produto.nome} />
                <div>
                  <ProdutoTitulo>{produto.nome}</ProdutoTitulo>
                  <ProdutoDescricao cor={produto.cor}>
                    {produto.diasRestantes < 0 ? (
                      <span>
                        {Math.abs(produto.diasRestantes)} dias vencido
                      </span>
                    ) : (
                      <span>{produto.diasRestantes} dias restantes</span>
                    )}
                  </ProdutoDescricao>
                  {produto.cor === "#D32F2F" && (
                    <ProdutoDescricao cor={produto.cor}>
                      <strong>Este produto já venceu!</strong>
                    </ProdutoDescricao>
                  )}
                  {produto.cor === "#FFB300" && (
                    <ProdutoDescricao cor={produto.cor}>
                      <strong>Este produto está prestes a vencer!</strong>
                    </ProdutoDescricao>
                  )}
                </div>
              </div>
            ))}
          </ProdutoList>
          <ButtonHome>Veja Mais</ButtonHome>
        </CardContainer>
      ) : (
        <MessageCard>
          <p>Nenhum produto próximo ao vencimento.</p>
        </MessageCard>
      )}

      <BirthdayCard title="Aniversariantes do Mês" birthdays={birthdays} />
      <CardRecomenda
        titulo="Resumo Estatístico"
        subtitulo="Você tem 127 pacientes cadastrados"
        descricao="Último cadastro realizado em 20/01/2025."
        img={img}
      />
    </UsersActiveContainer>
  );
}

export default UsersActive;
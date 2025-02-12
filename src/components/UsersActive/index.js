import { useEffect, useState } from "react";
import { CardRecomenda } from "../Card";
import BirthdayCard from "../BirthdayCard";
import { birthdays } from "../BirthdayCard/dataBirthday";
import img from "../../assets/images/estatistica.png";
import { ProdutoTitulo, ProdutoDescricao } from "../Paragraph";
import { ProdutoList, CardContainer } from "../Div";
import { UsersActiveContainer } from "../Section";
import styled from "styled-components";
import dayjs from "dayjs";
import api from "../../services/api";

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

function UsersActive() {
  const [proximosAtendimentos, setProximosAtendimentos] = useState([]);
  const [proximosProdutos, setProximosProdutos] = useState([]);
  const [currentPageAtendimentos, setCurrentPageAtendimentos] = useState(0);
  const [currentPageProdutos, setCurrentPageProdutos] = useState(0);

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

    async function fetchProdutos() {
      try {
        const response = await api.get("/produtos?validity=soon");
        setProximosProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos próximos ao vencimento", error);
      }
    }

    fetchProdutos();
    fetchAtendimentos();
  }, []);

  const itemsPerPageAtendimentos = 3;
  const totalPagesAtendimentos = Math.ceil(
    proximosAtendimentos.length / itemsPerPageAtendimentos
  );
  const itemsPerPageProdutos = 3;
  const totalPagesProdutos = Math.ceil(
    proximosProdutos.length / itemsPerPageProdutos
  );

  const goToNextPageAtendimentos = () => {
    if (currentPageAtendimentos < totalPagesAtendimentos - 1) {
      setCurrentPageAtendimentos(currentPageAtendimentos + 1);
    }
  };

  const goToPreviousPageAtendimentos = () => {
    if (currentPageAtendimentos > 0) {
      setCurrentPageAtendimentos(currentPageAtendimentos - 1);
    }
  };

  const goToNextPageProdutos = () => {
    if (currentPageProdutos < totalPagesProdutos - 1) {
      setCurrentPageProdutos(currentPageProdutos + 1);
    }
  };

  const goToPreviousPageProdutos = () => {
    if (currentPageProdutos > 0) {
      setCurrentPageProdutos(currentPageProdutos - 1);
    }
  };

  const currentItemsAtendimentos = proximosAtendimentos.slice(
    currentPageAtendimentos * itemsPerPageAtendimentos,
    (currentPageAtendimentos + 1) * itemsPerPageAtendimentos
  );

  const currentItemsProdutos = proximosProdutos.slice(
    currentPageProdutos * itemsPerPageProdutos,
    (currentPageProdutos + 1) * itemsPerPageProdutos
  );

  return (
    <UsersActiveContainer>
      {/* Parte dos atendimentos, como estava antes */}
      <SectionTitle>
        Próximos atendimentos agendados do dia de hoje!
      </SectionTitle>
      {proximosAtendimentos.length > 0 ? (
        <>
          <CarouselContainer>
            {currentItemsAtendimentos.map((atendimento, index) => {
              const atendimentoDate = dayjs(
                `${atendimento.date} ${atendimento.time}`
              ).format("DD/MM/YYYY HH:mm");
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
                    <p>
                      <strong>{atendimento.paciente}</strong>
                    </p>
                    <p>
                      <strong>Serviço:</strong> {atendimento.service}
                    </p>
                    <p>
                      <strong>Responsável:</strong> {atendimento.responsible}
                    </p>
                    <p>
                      <strong>Anotações:</strong> {atendimento.notes}
                    </p>
                    <p>
                      <strong>Horário:</strong> {atendimentoDate}
                    </p>
                  </AtendimentoCard>
                </CarouselItem>
              );
            })}
          </CarouselContainer>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={goToPreviousPageAtendimentos}
              disabled={currentPageAtendimentos === 0}
            >
              Anterior
            </button>
            <button
              onClick={goToNextPageAtendimentos}
              disabled={currentPageAtendimentos === totalPagesAtendimentos - 1}
            >
              Próximo
            </button>
          </div>
        </>
      ) : (
        <NoProdutosMessage>
          <p>Nenhum atendimento agendado para hoje.</p>
        </NoProdutosMessage>
      )}

      <SectionTitle>Produtos Próximos ao Vencimento (6 meses )</SectionTitle>
      {proximosProdutos.length > 0 ? (
        <CardContainer>
          <CarouselContainer>
            {currentItemsProdutos.map((produto, index) => (
              <CarouselItem key={index}>
                <div style={{ textAlign: "center", margin: "0 10px" }}>
                  <ProfileImage src={produto.image} alt={produto.name} />
                  <ProdutoTitulo>{produto.name}</ProdutoTitulo>
                  <ProdutoDescricao>
                    <strong>Categoria:</strong> {produto.category}
                  </ProdutoDescricao>
                  <ProdutoDescricao>
                    <strong>Preço:</strong> R${produto.price}
                  </ProdutoDescricao>
                  <ProdutoDescricao>
                    <strong>Validade:</strong>{" "}
                    {dayjs(produto.validity).format("DD/MM/YYYY")}
                  </ProdutoDescricao>
                </div>
              </CarouselItem>
            ))}
          </CarouselContainer>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={goToPreviousPageProdutos}
              disabled={currentPageProdutos === 0}
            >
              Anterior
            </button>
            <button
              onClick={goToNextPageProdutos}
              disabled={currentPageProdutos === totalPagesProdutos - 1}
            >
              Próximo
            </button>
          </div>
        </CardContainer>
      ) : (
        <NoProdutosMessage>
          <p>Nenhum produto próximo ao vencimento.</p>
        </NoProdutosMessage>
      )}

      {/* Outros componentes */}
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

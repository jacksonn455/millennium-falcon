import { useEffect, useState } from "react";
import BirthdayCard from "../BirthdayCard";
import { birthdays } from "../BirthdayCard/dataBirthday";
import { ProdutoTitulo, ProdutoDescricao } from "../Paragraph";
import { CardContainer } from "../Div";
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

const NavigationButton = styled.button`
  background: linear-gradient(45deg, #a8235e, #c7628f);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 0 10px;

  &:hover {
    background: linear-gradient(45deg, #8b1e4d, #a8235e);
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
    margin: 0 5px;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  gap: 10px;
`;

const AtendimentoCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 350px;
  height: 450px;
  overflow: hidden;

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin-bottom: 10px;
    object-fit: cover;
  }

  p {
    color: #333;
    font-size: 16px;
    margin: 5px 0;
    word-wrap: break-word;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
  }

  .notes {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
  }

  .footer {
    margin-top: auto;
  }
`;

function UsersActive() {
  const [proximosAtendimentos, setProximosAtendimentos] = useState([]);
  const [proximosProdutos, setProximosProdutos] = useState([]);
  const [currentPageAtendimentos, setCurrentPageAtendimentos] = useState(0);
  const [currentPageProdutos, setCurrentPageProdutos] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchAtendimentos() {
      try {
        const response = await api.get(`/agenda?nextAppointments=true`);
        setProximosAtendimentos(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar atendimentos", error);
      }
    }

    async function fetchProdutos() {
      if (isLoading) return;
  
      setIsLoading(true);
      try {
        const response = await api.get("/produtos?validity=soon");
        
        const produtosValidos = response.data.filter((produto) => {
          const validadeProduto = dayjs(produto.validity);
          const hoje = dayjs();
          const seisMesesDepois = hoje.add(6, 'months');
          
          return validadeProduto.isBefore(seisMesesDepois) && validadeProduto.isAfter(hoje);
        });
  
        setProximosProdutos(produtosValidos);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAtendimentos();
    fetchProdutos();
  }, []);

  const itemsPerPage = 3;
  const totalPagesAtendimentos = Math.ceil(
    proximosAtendimentos.length / itemsPerPage
  );
  const totalPagesProdutos = Math.ceil(proximosProdutos.length / itemsPerPage);

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
    currentPageAtendimentos * itemsPerPage,
    (currentPageAtendimentos + 1) * itemsPerPage
  );
  const currentItemsProdutos = proximosProdutos.slice(
    currentPageProdutos * itemsPerPage,
    (currentPageProdutos + 1) * itemsPerPage
  );

  return (
    <UsersActiveContainer>
      <SectionTitle>Seus próximos atendimentos agendados para hoje</SectionTitle>
      {proximosAtendimentos.length > 0 ? (
        <>
          <CarouselContainer>
            {currentItemsAtendimentos.map((atendimento, index) => (
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
                  <div className="content">
                    <p className="notes">
                      <strong>Anotações:</strong> {atendimento.notes}
                    </p>
                  </div>
                  <p className="footer">
                    <strong>Horário:</strong>{" "}
                    {dayjs(`${atendimento.date} ${atendimento.time}`).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  </p>
                </AtendimentoCard>
              </CarouselItem>
            ))}
          </CarouselContainer>
          {totalPagesAtendimentos > 1 && (
            <NavigationContainer>
              <NavigationButton
                onClick={goToPreviousPageAtendimentos}
                disabled={currentPageAtendimentos === 0}
              >
                ← Anterior
              </NavigationButton>
              <NavigationButton
                onClick={goToNextPageAtendimentos}
                disabled={
                  currentPageAtendimentos === totalPagesAtendimentos - 1
                }
              >
                Próximo →
              </NavigationButton>
            </NavigationContainer>
          )}
        </>
      ) : (
        <NoProdutosMessage>
          <p>Nenhum atendimento agendado para hoje.</p>
        </NoProdutosMessage>
      )}

      <SectionTitle>Produtos com validade próxima (6 meses)</SectionTitle>
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
          <NavigationContainer>
            <NavigationButton
              onClick={goToPreviousPageProdutos}
              disabled={currentPageProdutos === 0}
            >
              ← Anterior
            </NavigationButton>
            <NavigationButton
              onClick={goToNextPageProdutos}
              disabled={currentPageProdutos === totalPagesProdutos - 1}
            >
              Próximo →
            </NavigationButton>
          </NavigationContainer>
        </CardContainer>
      ) : (
        <NoProdutosMessage>
          <p>Nenhum produto próximo ao vencimento.</p>
        </NoProdutosMessage>
      )}
      <BirthdayCard title="Aniversariantes da Semana" birthdays={birthdays} />
    </UsersActiveContainer>
  );
}

export default UsersActive;

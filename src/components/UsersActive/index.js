import { pacientes } from "./dataUsersActive";
import styled from "styled-components";
import { Title } from "../Title";
import { CardRecomenda, getProximosProdutosVencimento } from "../Card";
import BirthdayCard from "../BirthdayCard";
import { birthdays } from "../BirthdayCard/dataBirthday";
import img from "../../assets/images/estatistica.png";

const UsersActiveContainer = styled.section`
  background-color: #ebecee;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
`;

const NewUsers = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const CardContainer = styled.div`
  background-color: #fff;
  padding: 25px 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  max-width: 600px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Botao = styled.button`
  background-color: #a8235e;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  font-weight: 900;
  cursor: pointer;
  margin-top: 20px;
  width: 150px;
  &:hover {
    background-color: #8b1e4d;
  }
`;

const ProdutoTitulo = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
`;

const ProdutoDescricao = styled.p`
  font-size: 16px;
  margin: 5px 0;
  color: ${(props) => props.cor || "#333"};
`;

const ProdutoList = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 20px;
`;

const MessageCard = styled.div`
  background-color: #fff;
  padding: 20px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
`;

function UsersActive() {
  const proximosProdutos = getProximosProdutosVencimento();

  return (
    <UsersActiveContainer>
      <Title color="#a8235e" size="36px" align="center">
        Próximos atendimentos agendados
      </Title>
      <NewUsers>
        {pacientes.map((paciente, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <img
              src={paciente.src}
              alt={paciente.nome}
              style={{ width: "200px", height: "200px", borderRadius: "50%" }}
            />
            <p>
              <strong>{paciente.nome}</strong>
            </p>
            <p>{paciente.dataHora}</p>
          </div>
        ))}
      </NewUsers>

      {proximosProdutos.length > 0 ? (
        <CardContainer>
          <Title color="#a8235e" size="24px" align="center">
            Produtos Próximos ao Vencimento
          </Title>
          <ProdutoList>
            {proximosProdutos.map((produto) => (
              <div key={produto.id} style={{ width: "100%", marginBottom: "10px" }}>
                <ProdutoTitulo>{produto.nome}</ProdutoTitulo>
                <ProdutoDescricao cor={produto.cor}>
                  Vencimento: {produto.vencimento}
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
            ))}
          </ProdutoList>
          <Botao>Veja Mais</Botao>
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
import { pacientes } from "./dataUsersActive";
import { Title } from "../Title";
import { CardRecomenda, getProximosProdutosVencimento } from "../Card";
import BirthdayCard from "../BirthdayCard";
import { birthdays } from "../BirthdayCard/dataBirthday";
import img from "../../assets/images/estatistica.png";
import { ProdutoTitulo, ProdutoDescricao } from "../Paragraph";
import { ProdutoList, MessageCard, NewUsers, CardContainer } from "../Div";
import { UsersActiveContainer } from "../Section";
import styled from "styled-components";
import { ButtonHome } from "../Button";

const ProfileImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-right: 15px;
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
import { pacientes } from "./dataUsersActive";
import styled from "styled-components";
import { Title } from "../Title";
import CardRecomenda from "../Card";
import BirthdayCard from "../BirthdayCard";
import { birthdays } from "../BirthdayCard/dataBirthday";
import img from "../../assets/images/estatistica.png";

const UsersActiveContainer = styled.section`
  background-color: #ebecee;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
`;

const NewUsers = styled.div`
  margin-top: 30px;
  display: flex;
  width: 100%;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 10px;
  gap: 20px;
`;

function UsersActive() {
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
      <CardRecomenda
        titulo="Resumo Estatístico"
        subtitulo="Você tem 127 pacientes cadastrados"
        descricao="Último cadastro realizado em 20/01/2025."
        img={img}
      />
      <BirthdayCard
        title="Aniversariantes do Mês"
        birthdays={birthdays}
      />
    </UsersActiveContainer>
  );
}

export default UsersActive;

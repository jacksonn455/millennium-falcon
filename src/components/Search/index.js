import { Input } from "../Input";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPacientes } from "../../services/pacientes";

const SearchContainer = styled.section`
  background-image: linear-gradient(90deg, rgb(244, 71, 149) 35%, #faaccc 165%);
  color: #fff;
  text-align: center;
  padding: 85px 0;
  height: 280px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 50px 0;
    height: auto;
  }
`;

const Title = styled.h1`
  color: #fff;
  font-size: 40px;
  text-align: center;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Result = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  width: 100%;
  max-width: 400px;
  margin: 10px auto;
  border: 1px solid transparent;
  transition: border 0.3s ease-in-out;

  p {
    width: 200px;
  }
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-left: 10px;
    border-radius: 50%; /* Borda arredondada */
  }

  &:hover {
    border: 1px solid white;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;

    img {
      width: 80px;
      height: 80px;
    }

    p {
      width: 100%;
    }
  }
`;

function Search() {
  const [inputValue, setInputValue] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPacientes = async () => {
      if (inputValue.length >= 3) {
        try {
          const pacientesAPI = await getPacientes(inputValue);
          setPacientes(pacientesAPI || []);
        } catch (error) {
          console.error("Erro ao buscar pacientes:", error);
          setPacientes([]);
        }
      } else {
        setPacientes([]);
      }
    };

    const timeoutId = setTimeout(fetchPacientes, 500);

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const handlePacienteClick = (id) => {
    if (!id) {
      console.error("ID do paciente está indefinido.");
      return;
    }
    console.log("Redirecionando para:", `/pacientes/${id}`);
    navigate(`/pacientes/${id}`);
  };

  return (
    <SearchContainer>
      <Title>Já sabe por onde começar?</Title>
      <SubTitle>Encontre seu paciente em nossa plataforma</SubTitle>
      <Input
        placeholder="Busque o paciente pelo nome"
        value={inputValue}
        onChange={(evento) => setInputValue(evento.target.value)}
      />

      {pacientes.length > 0 ? (
        pacientes.map((paciente) => (
          <Result
            key={paciente._id || paciente.nome}
            onClick={() => handlePacienteClick(paciente._id)}
          >
            <p>{paciente.nome}</p>
            {paciente.image && (
              <img src={paciente.image} alt={paciente.nome} />
            )}
          </Result>
        ))
      ) : (
        inputValue.length >= 3 && <p>Nenhum paciente encontrado.</p>
      )}
    </SearchContainer>
  );
}

export default Search;
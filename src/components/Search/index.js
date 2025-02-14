import { Input } from "../Input";
import styled from "styled-components";
import { useEffect, useState } from "react";
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
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  width: 100%;
  max-width: 400px;
  margin: 10px auto;

  p {
    width: 200px;
  }
  img {
    width: 100px;
  }

  &:hover {
    border: 1px solid white;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;

    img {
      width: 80px;
    }

    p {
      width: 100%;
    }
  }
`;

function Search() {
  const [inputValue, setInputValue] = useState("");
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      if (inputValue.length >= 3) {
        const pacientesAPI = await getPacientes(inputValue);
        setPacientes(pacientesAPI);
      } else {
        setPacientes([]);
      }
    };

    const timeoutId = setTimeout(fetchPacientes, 500);

    return () => clearTimeout(timeoutId);

  }, [inputValue]);

  return (
    <SearchContainer>
      <Title>Já sabe por onde começar?</Title>
      <SubTitle>Encontre seu paciente em nossa plataforma</SubTitle>
      <Input
        placeholder="Busque o paciente pelo nome"
        value={inputValue}
        onChange={(evento) => setInputValue(evento.target.value)}
      />

      {pacientes.map((paciente) => (
        <Result key={paciente.id || paciente.nome}>
          <p>{paciente.nome}</p>
          {paciente.src && (
            <img
              src={paciente.src}
              alt={paciente.alt || "Imagem do paciente"}
            />
          )}
        </Result>
      ))}
    </SearchContainer>
  );
}

export default Search;
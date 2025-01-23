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
`;

const Title = styled.h1`
  color: #fff;
  font-size: 40px;
  text-align: center;
  width: 100%;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 40px;
`;

const Result = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;

  p {
    width: 200px;
  }
  img {
    width: 100px;
  }

  &:hover {
    border: 1px solid white;
  }
`;

function Search() {
  const [inputValue, setInputValue] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      const pacientesAPI = await getPacientes();
      setPacientes(pacientesAPI);
    };
    fetchPacientes();
  }, []);

  return (
    <SearchContainer>
      <Title>Já sabe por onde começar?</Title>
      <SubTitle>Encontre seu paciente em nossa plataforma</SubTitle>
      <Input
        placeholder="Busque o paciente pelo nome"
        onBlur={(evento) => {
          const textoDigitado = evento.target.value.trim();
          if (textoDigitado === "") {
            setInputValue([]);
          } else {
            const resultadoPesquisa = pacientes.filter((paciente) =>
              paciente.nome.toLowerCase().includes(textoDigitado.toLowerCase())
            );
            setInputValue(resultadoPesquisa);
          }
        }}
      />

      {inputValue.map((paciente) => (
        <Result key={paciente.id || paciente.nome}>
          {" "}
          {}
          <p>{paciente.nome}</p>
          <img src={paciente.src} alt={paciente.alt} />
        </Result>
      ))}
    </SearchContainer>
  );
}

export default Search;

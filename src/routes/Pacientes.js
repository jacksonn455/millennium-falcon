import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Container from "../components/Container";
import { Title, SectionTitle } from "../components/Title";
import { Button, ButtonGroup } from "../components/Button";
import { Label } from "../components/Label";
import { AnamneseInput } from "../components/Input";
import { AppContainer } from "../components/Div";
import Loader from "../components/Loader";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const InputLabel = styled(Label)`
  display: block;
  margin-bottom: 0.5rem;
`;

const SectionContainer = styled.div`
  margin-top: 2rem;
`;

const ContractContainer = styled.div`
  margin-bottom: 1rem;
`;

export default function Pacientes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);

  useEffect(() => {
    api
      .get(`/pacientes/${id}`)
      .then((response) => setPaciente(response.data))
      .catch((error) => console.error("Erro ao buscar paciente", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaciente((prev) => ({ ...prev, [name]: value }));
  };

  const handleContratoChange = (index, field, value) => {
    setPaciente((prev) => {
      const novosContratos = [...prev.contratoAssinaturas];
      novosContratos[index][field] = value;
      return { ...prev, contratoAssinaturas: novosContratos };
    });
  };

  const handleSave = () => {
    api
      .put(`/pacientes/${id}`, paciente)
      .then(() => alert("Paciente atualizado com sucesso!"))
      .catch((error) => console.error("Erro ao atualizar paciente", error));
  };

  const handleDelete = () => {
    api
      .delete(`/pacientes/${id}`)
      .then(() => {
        alert("Paciente excluído com sucesso!");
        navigate("/pacientes");
      })
      .catch((error) => console.error("Erro ao excluir paciente", error));
  };

  if (!paciente) return;

  return (
    <AppContainer>
      <Container>
        <Title>{paciente.nome}</Title>

        <SectionContainer>
          <SectionTitle>Detalhes do Paciente</SectionTitle>
          <InputGroup>
            <InputLabel>Nome</InputLabel>
            <AnamneseInput
              type="text"
              name="nome"
              value={paciente.nome}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Idade</InputLabel>
            <AnamneseInput
              type="number"
              name="idade"
              value={paciente.idade}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Data de Nascimento</InputLabel>
            <AnamneseInput
              type="date"
              name="dataNascimento"
              value={paciente.dataNascimento.split("T")[0]}
              onChange={handleChange}
              required
            />
          </InputGroup>
        </SectionContainer>

        <SectionContainer>
          <SectionTitle>Assinaturas</SectionTitle>
          {paciente.contratoAssinaturas.map((contrato, index) => (
            <ContractContainer key={contrato._id}>
              <InputGroup>
                <InputLabel>Assinatura do Contratante</InputLabel>
                <AnamneseInput
                  type="text"
                  value={contrato.contratanteAssinatura}
                  onChange={(e) =>
                    handleContratoChange(
                      index,
                      "contratanteAssinatura",
                      e.target.value
                    )
                  }
                  placeholder="Assinatura do contratante"
                />
              </InputGroup>

              <InputGroup>
                <InputLabel>Assinatura da Contratada</InputLabel>
                <AnamneseInput
                  type="text"
                  value={contrato.contratadaAssinatura}
                  onChange={(e) =>
                    handleContratoChange(
                      index,
                      "contratadaAssinatura",
                      e.target.value
                    )
                  }
                  placeholder="Assinatura da contratada"
                />
              </InputGroup>

              <InputGroup>
                <InputLabel>Data</InputLabel>
                <AnamneseInput
                  type="date"
                  value={contrato.data ? contrato.data.split("T")[0] : ""}
                  onChange={(e) =>
                    handleContratoChange(index, "data", e.target.value)
                  }
                />
              </InputGroup>
            </ContractContainer>
          ))}
        </SectionContainer>

        <ButtonGroup>
          <Button onClick={handleSave}>Salvar</Button>
          <Button danger onClick={handleDelete}>
            Excluir
          </Button>
        </ButtonGroup>
      </Container>
    </AppContainer>
  );
}

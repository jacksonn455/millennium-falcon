import React, { useState, useEffect, useRef } from "react";
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
import SignatureCanvas from "react-signature-canvas";

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

const SignatureContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  width: 95%;
  height: 200px;
   margin-bottom: 15px;
`;

export default function Pacientes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const signaturePad = useRef(null);

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

  const handleSaveSignature = () => {
    const signature = signaturePad.current.toDataURL();
    setPaciente((prev) => ({
      ...prev,
      assinatura: signature,
    }));
  };

  const handleClearSignature = () => {
    signaturePad.current.clear();
  };

  const handleImageChange = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPaciente({
            ...paciente,
            image: reader.result,
          });
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  if (!paciente) return <Loader />;

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

          <InputGroup>
            <InputLabel>Imagem</InputLabel>
            <div>
              {/* Exibe a imagem atual */}
              <img
                src={paciente.image || "URL_DA_IMAGEM_PADRAO"}
                alt="Imagem do paciente"
                style={{ width: "150px", height: "auto" }}
              />
              <br />
              {/* Botão para alterar a imagem */}
              <Button type="button" onClick={handleImageChange}>
                Alterar Imagem
              </Button>
            </div>
          </InputGroup>

          {/* Informações de saúde */}
          <SectionTitle>Informações de Saúde</SectionTitle>
          <InputGroup>
            <InputLabel>Funcionamento Intestinal</InputLabel>
            <AnamneseInput
              type="text"
              name="funcionamentoIntestinal"
              value={paciente.funcionamentoIntestinal || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Gestante</InputLabel>
            <AnamneseInput
              type="text"
              name="gestante"
              value={paciente.gestante || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Contraceptivo</InputLabel>
            <AnamneseInput
              type="text"
              name="contraceptivo"
              value={paciente.contraceptivo || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Ciclo Menstrual</InputLabel>
            <AnamneseInput
              type="text"
              name="cicloMenstrual"
              value={paciente.cicloMenstrual || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Última Gestação</InputLabel>
            <AnamneseInput
              type="text"
              name="ultimaGestacao"
              value={paciente.ultimaGestacao || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Qualidade do Sono</InputLabel>
            <AnamneseInput
              type="text"
              name="qualidadeSono"
              value={paciente.qualidadeSono || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Ansiedade</InputLabel>
            <AnamneseInput
              type="text"
              name="ansiedade"
              value={paciente.ansiedade || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Nervosismo</InputLabel>
            <AnamneseInput
              type="text"
              name="nervosismo"
              value={paciente.nervosismo || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Exercício</InputLabel>
            <AnamneseInput
              type="text"
              name="exercicio"
              value={paciente.exercicio || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <ButtonGroup>
            <Button onClick={handleSave}>Salvar</Button>
            <Button onClick={handleDelete}>Excluir</Button>
          </ButtonGroup>
        </SectionContainer>
      </Container>
    </AppContainer>
  );
}

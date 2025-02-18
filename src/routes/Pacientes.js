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

          {/* Endereço */}
          <SectionTitle>Endereço</SectionTitle>
          <InputGroup>
            <InputLabel>Rua</InputLabel>
            <AnamneseInput
              type="text"
              name="endereco.rua"
              value={paciente.endereco?.rua || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Número</InputLabel>
            <AnamneseInput
              type="text"
              name="endereco.numero"
              value={paciente.endereco?.numero || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Cidade</InputLabel>
            <AnamneseInput
              type="text"
              name="endereco.cidade"
              value={paciente.endereco?.cidade || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Estado</InputLabel>
            <AnamneseInput
              type="text"
              name="endereco.estado"
              value={paciente.endereco?.estado || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>CEP</InputLabel>
            <AnamneseInput
              type="text"
              name="endereco.cep"
              value={paciente.endereco?.cep || ""}
              onChange={handleChange}
            />
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

          <InputGroup>
            <InputLabel>Tabagista</InputLabel>
            <AnamneseInput
              type="checkbox"
              name="tabagista"
              checked={paciente.tabagista}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Alcool</InputLabel>
            <AnamneseInput
              type="checkbox"
              name="alcool"
              checked={paciente.alcool}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Covid</InputLabel>
            <AnamneseInput
              type="checkbox"
              name="covid"
              checked={paciente.covid}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Sequelas</InputLabel>
            <AnamneseInput
              type="text"
              name="sequelas"
              value={paciente.sequelas}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Alergias</InputLabel>
            <AnamneseInput
              type="text"
              name="alergias"
              value={paciente.alergias}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Suplementação</InputLabel>
            <AnamneseInput
              type="text"
              name="suplementacao"
              value={paciente.suplementacao}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Suplementação Descrição</InputLabel>
            <AnamneseInput
              type="text"
              name="suplementacaoDescricao"
              value={paciente.suplementacaoDescricao}
              onChange={handleChange}
            />
          </InputGroup>

          {/* Alimentação */}
          <SectionTitle>Alimentação</SectionTitle>
          <InputGroup>
            <InputLabel>Refeições</InputLabel>
            <AnamneseInput
              type="text"
              name="refeicoes"
              value={paciente.refeicoes}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Carne</InputLabel>
            <AnamneseInput
              type="text"
              name="carne"
              value={paciente.carne}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Lanches</InputLabel>
            <AnamneseInput
              type="text"
              name="lanches"
              value={paciente.lanches}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Refrigerante</InputLabel>
            <AnamneseInput
              type="text"
              name="refrigerante"
              value={paciente.refrigerante}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Frutas</InputLabel>
            <AnamneseInput
              type="text"
              name="frutas"
              value={paciente.frutas}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Leite</InputLabel>
            <AnamneseInput
              type="text"
              name="leite"
              value={paciente.leite}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Madrugada</InputLabel>
            <AnamneseInput
              type="text"
              name="madrugada"
              value={paciente.madrugada}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Último Horário</InputLabel>
            <AnamneseInput
              type="text"
              name="ultimoHorario"
              value={paciente.ultimoHorario}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Horário que Dorme</InputLabel>
            <AnamneseInput
              type="text"
              name="horarioDorme"
              value={paciente.horarioDorme}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Intolerância</InputLabel>
            <AnamneseInput
              type="text"
              name="intolerancia"
              value={paciente.intolerancia}
              onChange={handleChange}
            />
          </InputGroup>

          {/* Cuidados com a Pele */}
          <SectionTitle>Cuidados com a Pele</SectionTitle>
          <InputGroup>
            <InputLabel>Melasma</InputLabel>
            <AnamneseInput
              type="text"
              name="melasma"
              value={paciente.melasma}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Manchas</InputLabel>
            <AnamneseInput
              type="text"
              name="manchas"
              value={paciente.manchas.join(", ")}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Linha</InputLabel>
            <AnamneseInput
              type="text"
              name="linhas"
              value={paciente.linhas.join(", ")}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Acne</InputLabel>
            <AnamneseInput
              type="text"
              name="acne"
              value={paciente.acne}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Grau</InputLabel>
            <AnamneseInput
              type="text"
              name="grau"
              value={paciente.grau}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Região da Acne</InputLabel>
            <AnamneseInput
              type="text"
              name="regiaoAcne"
              value={paciente.regiaoAcne.join(", ")}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Cicatriz</InputLabel>
            <AnamneseInput
              type="text"
              name="cicatriz"
              value={paciente.cicatriz}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Tipo de Cicatriz</InputLabel>
            <AnamneseInput
              type="text"
              name="tipoCicatriz"
              value={paciente.tipoCicatriz.join(", ")}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Olheiras</InputLabel>
            <AnamneseInput
              type="text"
              name="olheiras"
              value={paciente.olheiras}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Tipo de Olheiras</InputLabel>
            <AnamneseInput
              type="text"
              name="tipoOlheiras"
              value={paciente.tipoOlheiras.join(", ")}
              onChange={handleChange}
            />
          </InputGroup>

          {/* Tratamento */}
          <SectionTitle>Tratamento</SectionTitle>
          <InputGroup>
            <InputLabel>Diagnóstico</InputLabel>
            <AnamneseInput
              type="text"
              name="tratamento.diagnostico"
              value={paciente.tratamento?.diagnostico || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Descrição do Tratamento</InputLabel>
            <AnamneseInput
              type="text"
              name="tratamento.descricao"
              value={paciente.tratamento?.descricao || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Conduta</InputLabel>
            <AnamneseInput
              type="text"
              name="tratamento.conduta"
              value={paciente.tratamento?.conduta || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Valor</InputLabel>
            <AnamneseInput
              type="text"
              name="tratamento.valor"
              value={paciente.tratamento?.valor || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Data</InputLabel>
            <AnamneseInput
              type="date"
              name="tratamento.data"
              value={paciente.tratamento?.data || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <SectionContainer>
            <SectionTitle>Assinatura do Tratamento</SectionTitle>
            <InputGroup>
              <InputLabel>Assinatura</InputLabel>
              <SignatureContainer>
                <SignatureCanvas
                  ref={signaturePad}
                  backgroundColor="white"
                  penColor="black"
                  canvasProps={{
                    width: 400,
                    height: 150,
                    className: "signature-canvas",
                  }}
                />
              </SignatureContainer>
              <Button onClick={handleSaveSignature}>Salvar Assinatura</Button>
              <Button onClick={handleClearSignature}>Limpar Assinatura</Button>
            </InputGroup>

            {/* Exibindo a assinatura salva, caso exista */}
            {paciente?.assinatura && (
              <InputGroup>
                <InputLabel>Assinatura Salva</InputLabel>
                <img
                  src={paciente.assinatura}
                  alt="Assinatura do Tratamento"
                  style={{ width: "200px", height: "auto" }}
                />
              </InputGroup>
            )}
          </SectionContainer>

          {/* Histórico de tratamentos */}
          <SectionTitle>Histórico de Tratamentos</SectionTitle>
          <InputGroup>
            <InputLabel>Tratamentos Anteriores</InputLabel>
            <AnamneseInput
              type="text"
              name="tratamentosAnteriores"
              value={paciente.tratamentosAnteriores}
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

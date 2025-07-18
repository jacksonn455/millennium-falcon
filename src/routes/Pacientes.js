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
  font-weight: bold;
  color: #333;
`;

const SectionContainer = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const SignatureContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  width: 95%;
  height: 200px;
  margin-bottom: 15px;
`;

const ArrayDisplay = styled.div`
  background-color: #e8f4fd;
  padding: 0.5rem;
  border-radius: 4px;
  margin: 0.5rem 0;
`;

const ArrayItem = styled.span`
  background-color: #007bff;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  display: inline-block;
`;

const SignatureImage = styled.img`
  max-width: 200px;
  max-height: 100px;
  border: 1px solid #ccc;
  margin: 0.5rem 0;
`;

export default function Pacientes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const signaturePad = useRef(null);

  useEffect(() => {
    api
      .get(`/pacientes/${id}`)
      .then((response) => {
        console.log("Dados do paciente recebidos:", response.data);
        setPaciente(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar paciente", error);
        alert("Erro ao carregar dados do paciente");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaciente((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    api
      .put(`/pacientes/${id}`, paciente)
      .then(() => alert("Paciente atualizado com sucesso!"))
      .catch((error) => {
        console.error("Erro ao atualizar paciente", error);
        alert("Erro ao atualizar paciente");
      });
  };

  const handleDelete = () => {
    console.log("Iniciando exclusão do paciente:", id);
    api
      .delete(`/pacientes/${id}`)
      .then((response) => {
        console.log("Resposta da exclusão:", response);
        console.log("Paciente excluído com sucesso");
        alert("Paciente excluído com sucesso!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Erro ao excluir paciente", error);
        alert("Erro ao excluir paciente");
      });
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

  const renderArrayField = (array, fieldName) => {
    if (!array || array.length === 0) return "Nenhum";
    return (
      <ArrayDisplay>
        {Array.isArray(array) ? (
          array.map((item, index) => (
            <ArrayItem key={index}>{item}</ArrayItem>
          ))
        ) : (
          <span>{array}</span>
        )}
      </ArrayDisplay>
    );
  };

  const renderSignature = (signature, label) => {
    if (!signature) return <span>Não assinado</span>;
    return (
      <div>
        <div>{label}</div>
        <SignatureImage src={signature} alt={label} />
      </div>
    );
  };

  if (!paciente) return <Loader />;

  return (
    <AppContainer>
      <Container>
        <Title>{paciente.nome}</Title>

        {/* === PÁGINA 1: DADOS BÁSICOS === */}
        <SectionContainer>
          <SectionTitle>DADOS BÁSICOS</SectionTitle>

          <InputGroup>
            <InputLabel>Nome</InputLabel>
            <AnamneseInput
              type="text"
              name="nome"
              value={paciente.nome || ""}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Idade</InputLabel>
            <AnamneseInput
              type="number"
              name="idade"
              value={paciente.idade || ""}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Profissão</InputLabel>
            <AnamneseInput
              type="text"
              name="profissao"
              value={paciente.profissao || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Data de Nascimento</InputLabel>
            <AnamneseInput
              type="date"
              name="dataNascimento"
              value={paciente.dataNascimento ? paciente.dataNascimento.split("T")[0] : ""}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>CPF</InputLabel>
            <AnamneseInput
              type="text"
              name="cpf"
              value={paciente.cpf || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>RG</InputLabel>
            <AnamneseInput
              type="text"
              name="rg"
              value={paciente.rg || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Contato</InputLabel>
            <AnamneseInput
              type="text"
              name="contato"
              value={paciente.contato || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Email</InputLabel>
            <AnamneseInput
              type="email"
              name="email"
              value={paciente.email || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Endereço</InputLabel>
            <AnamneseInput
              type="text"
              name="endereco"
              value={paciente.endereco || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Escolaridade</InputLabel>
            <AnamneseInput
              type="text"
              name="escolaridade"
              value={paciente.escolaridade || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Estado Civil</InputLabel>
            <AnamneseInput
              type="text"
              name="estadoCivil"
              value={paciente.estadoCivil || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Imagem</InputLabel>
            <div>
              {paciente.image && (
                <img
                  src={paciente.image}
                  alt="Imagem do paciente"
                  style={{ width: "150px", height: "auto", marginBottom: "10px" }}
                />
              )}
              <Button type="button" onClick={handleImageChange}>
                Alterar Imagem
              </Button>
            </div>
          </InputGroup>
        </SectionContainer>

        {/* === PÁGINA 2: PRIMEIRA CONSULTA === */}
        <SectionContainer>
          <SectionTitle>PRIMEIRA CONSULTA</SectionTitle>

          <InputGroup>
            <InputLabel>Queixa</InputLabel>
            <AnamneseInput
              type="text"
              name="queixa"
              value={paciente.queixa || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Soube do Trabalho</InputLabel>
            <AnamneseInput
              type="text"
              name="soubeDoTrabalho"
              value={paciente.soubeDoTrabalho || ""}
              onChange={handleChange}
            />
          </InputGroup>
        </SectionContainer>

        {/* === PÁGINA 3: HISTÓRICO DA QUEIXA === */}
        <SectionContainer>
          <SectionTitle>HISTÓRICO DA QUEIXA</SectionTitle>

          <InputGroup>
            <InputLabel>Início da Queixa</InputLabel>
            <AnamneseInput
              type="text"
              name="inicioQueixa"
              value={paciente.inicioQueixa || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Intensificação da Queixa</InputLabel>
            <AnamneseInput
              type="text"
              name="intensificacaoQueixa"
              value={paciente.intensificacaoQueixa || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Tratamentos Anteriores</InputLabel>
            <AnamneseInput
              type="text"
              name="tratamentosAnteriores"
              value={paciente.tratamentosAnteriores || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Uso de Produtos</InputLabel>
            <AnamneseInput
              type="text"
              name="usoProdutos"
              value={paciente.usoProdutos || ""}
              onChange={handleChange}
            />
          </InputGroup>
        </SectionContainer>

        {/* === PÁGINA 4: HISTÓRICO DE PATOLOGIAS === */}
        <SectionContainer>
          <SectionTitle>HISTÓRICO DE PATOLOGIAS</SectionTitle>

          <InputGroup>
            <InputLabel>Patologias</InputLabel>
            {renderArrayField(paciente.patologias, "patologias")}
          </InputGroup>
        </SectionContainer>

        {/* === PÁGINA 5: CONHECENDO MAIS SOBRE VOCÊ === */}
        <SectionContainer>
          <SectionTitle>CONHECENDO MAIS SOBRE VOCÊ</SectionTitle>

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
        </SectionContainer>

        {/* === PÁGINA 6: HÁBITOS E ALIMENTAÇÃO === */}
        <SectionContainer>
          <SectionTitle>HÁBITOS E ALIMENTAÇÃO</SectionTitle>

          <InputGroup>
            <InputLabel>Tabagista</InputLabel>
            <AnamneseInput
              type="text"
              name="tabagista"
              value={paciente.tabagista || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Álcool</InputLabel>
            <AnamneseInput
              type="text"
              name="alcool"
              value={paciente.alcool || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>COVID</InputLabel>
            <AnamneseInput
              type="text"
              name="covid"
              value={paciente.covid || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Sequelas</InputLabel>
            <AnamneseInput
              type="text"
              name="sequelas"
              value={paciente.sequelas || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Alergias</InputLabel>
            <AnamneseInput
              type="text"
              name="alergias"
              value={paciente.alergias || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Suplementação</InputLabel>
            <AnamneseInput
              type="text"
              name="suplementacao"
              value={paciente.suplementacao || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Descrição da Suplementação</InputLabel>
            <AnamneseInput
              type="text"
              name="suplementacaoDescricao"
              value={paciente.suplementacaoDescricao || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Refeições</InputLabel>
            <AnamneseInput
              type="text"
              name="refeicoes"
              value={paciente.refeicoes || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Carne</InputLabel>
            <AnamneseInput
              type="text"
              name="carne"
              value={paciente.carne || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Lanches</InputLabel>
            <AnamneseInput
              type="text"
              name="lanches"
              value={paciente.lanches || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Refrigerante</InputLabel>
            <AnamneseInput
              type="text"
              name="refrigerante"
              value={paciente.refrigerante || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Frutas</InputLabel>
            <AnamneseInput
              type="text"
              name="frutas"
              value={paciente.frutas || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Leite</InputLabel>
            <AnamneseInput
              type="text"
              name="leite"
              value={paciente.leite || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Madrugada</InputLabel>
            <AnamneseInput
              type="text"
              name="madrugada"
              value={paciente.madrugada || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Último Horário</InputLabel>
            <AnamneseInput
              type="text"
              name="ultimoHorario"
              value={paciente.ultimoHorario || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Horário que Dorme</InputLabel>
            <AnamneseInput
              type="text"
              name="horarioDorme"
              value={paciente.horarioDorme || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Intolerância</InputLabel>
            <AnamneseInput
              type="text"
              name="intolerancia"
              value={paciente.intolerancia || ""}
              onChange={handleChange}
            />
          </InputGroup>
        </SectionContainer>

        {/* === PÁGINA 7: CONDIÇÕES DA PELE === */}
        <SectionContainer>
          <SectionTitle>CONDIÇÕES DA PELE</SectionTitle>

          <InputGroup>
            <InputLabel>Melasma</InputLabel>
            <AnamneseInput
              type="text"
              name="melasma"
              value={paciente.melasma || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Manchas</InputLabel>
            {renderArrayField(paciente.manchas, "manchas")}
          </InputGroup>

          <InputGroup>
            <InputLabel>Linhas</InputLabel>
            {renderArrayField(paciente.linhas, "linhas")}
          </InputGroup>

          <InputGroup>
            <InputLabel>Acne</InputLabel>
            <AnamneseInput
              type="text"
              name="acne"
              value={paciente.acne || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Grau</InputLabel>
            <AnamneseInput
              type="text"
              name="grau"
              value={paciente.grau || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Região Acne</InputLabel>
            {renderArrayField(paciente.regiaoAcne, "regiaoAcne")}
          </InputGroup>

          <InputGroup>
            <InputLabel>Cicatriz</InputLabel>
            <AnamneseInput
              type="text"
              name="cicatriz"
              value={paciente.cicatriz || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Tipo Cicatriz</InputLabel>
            {renderArrayField(paciente.tipoCicatriz, "tipoCicatriz")}
          </InputGroup>

          <InputGroup>
            <InputLabel>Olheiras</InputLabel>
            <AnamneseInput
              type="text"
              name="olheiras"
              value={paciente.olheiras || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Tipo Olheiras</InputLabel>
            {renderArrayField(paciente.tipoOlheiras, "tipoOlheiras")}
          </InputGroup>
        </SectionContainer>

        {/* === PÁGINA 8: TRATAMENTO === */}
        <SectionContainer>
          <SectionTitle>TRATAMENTO</SectionTitle>

          {paciente.tratamento && (
            <>
              <InputGroup>
                <InputLabel>Diagnóstico</InputLabel>
                <AnamneseInput
                  type="text"
                  name="diagnostico"
                  value={paciente.tratamento.diagnostico || ""}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <InputLabel>Descrição</InputLabel>
                <AnamneseInput
                  type="text"
                  name="descricao"
                  value={paciente.tratamento.descricao || ""}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <InputLabel>Conduta</InputLabel>
                <AnamneseInput
                  type="text"
                  name="conduta"
                  value={paciente.tratamento.conduta || ""}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <InputLabel>Valor</InputLabel>
                <AnamneseInput
                  type="text"
                  name="valor"
                  value={paciente.tratamento.valor || ""}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <InputLabel>Data</InputLabel>
                <AnamneseInput
                  type="text"
                  name="data"
                  value={paciente.tratamento.data || ""}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <InputLabel>Assinatura</InputLabel>
                {renderSignature(paciente.tratamento.assinatura, "Assinatura do Tratamento")}
              </InputGroup>

              <InputGroup>
                <InputLabel>Termo 1</InputLabel>
                <span>{paciente.tratamento.termosAceitos?.termo1 ? "Aceito" : "Não aceito"}</span>
              </InputGroup>

              <InputGroup>
                <InputLabel>Termo 2</InputLabel>
                <span>{paciente.tratamento.termosAceitos?.termo2 ? "Aceito" : "Não aceito"}</span>
              </InputGroup>
            </>
          )}
        </SectionContainer>

        {/* === PÁGINA 9: TRATAMENTO SUGERIDO === */}
        <SectionContainer>
          <SectionTitle>TRATAMENTO SUGERIDO</SectionTitle>

          {paciente.tratamentoSugerido && (
            <>
              <InputGroup>
                <InputLabel>Tratamento</InputLabel>
                <AnamneseInput
                  type="text"
                  name="tratamento"
                  value={paciente.tratamentoSugerido.tratamento || ""}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <InputLabel>Número de Sessão</InputLabel>
                <AnamneseInput
                  type="number"
                  name="numeroSessao"
                  value={paciente.tratamentoSugerido.numeroSessao || ""}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <InputLabel>Valor da Sessão</InputLabel>
                <AnamneseInput
                  type="number"
                  name="valorSessao"
                  value={paciente.tratamentoSugerido.valorSessao || ""}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <InputLabel>Valor Total</InputLabel>
                <AnamneseInput
                  type="number"
                  name="valorTotal"
                  value={paciente.tratamentoSugerido.valorTotal || ""}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <InputLabel>Pré-agendamento</InputLabel>
                <AnamneseInput
                  type="text"
                  name="preAgendamento"
                  value={paciente.tratamentoSugerido.preAgendamento || ""}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <InputLabel>Horário</InputLabel>
                <AnamneseInput
                  type="text"
                  name="horario"
                  value={paciente.tratamentoSugerido.horario || ""}
                  onChange={handleChange}
                />
              </InputGroup>
            </>
          )}
        </SectionContainer>

        {/* === PÁGINA 10: CONTRATO E ASSINATURAS === */}
        <SectionContainer>
          <SectionTitle>CONTRATO E ASSINATURAS</SectionTitle>

          {paciente.contratoAssinaturas && paciente.contratoAssinaturas.length > 0 && (
            <div>
              <InputLabel>Número de assinaturas: {paciente.contratoAssinaturas.length}</InputLabel>
              {paciente.contratoAssinaturas.map((assinatura, index) => (
                <div key={index} style={{ marginBottom: "1rem", padding: "1rem", border: "1px solid #ddd" }}>
                  <InputLabel>Assinatura {index + 1}:</InputLabel>
                  <div>Contratante: {renderSignature(assinatura.contratanteAssinatura, "Assinatura Contratante")}</div>
                  <div>Contratada: {renderSignature(assinatura.contratadaAssinatura, "Assinatura Contratada")}</div>
                  <div>Data: {assinatura.data ? new Date(assinatura.data).toLocaleDateString() : "N/A"}</div>
                </div>
              ))}
            </div>
          )}
        </SectionContainer>

        {/* === PÁGINA 11: CONTRATO DE SERVIÇOS ESTÉTICOS === */}
        <SectionContainer>
          <SectionTitle>CONTRATO DE SERVIÇOS ESTÉTICOS</SectionTitle>

          {paciente.contractSignatures && (
            <>
              <InputGroup>
                <InputLabel>Assinatura do Cliente</InputLabel>
                {renderSignature(paciente.contractSignatures.clientSignature, "Assinatura do Cliente")}
              </InputGroup>

              <InputGroup>
                <InputLabel>Assinatura do Provedor</InputLabel>
                {renderSignature(paciente.contractSignatures.providerSignature, "Assinatura do Provedor")}
              </InputGroup>
            </>
          )}
        </SectionContainer>

        {/* === CAMPOS ADICIONAIS === */}
        <SectionContainer>
          <SectionTitle>CAMPOS ADICIONAIS</SectionTitle>

          <InputGroup>
            <InputLabel>Observações</InputLabel>
            <AnamneseInput
              type="text"
              name="observacoes"
              value={paciente.observacoes || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Histórico Familiar</InputLabel>
            <AnamneseInput
              type="text"
              name="historicoFamiliar"
              value={paciente.historicoFamiliar || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Medicamentos em Uso</InputLabel>
            {renderArrayField(paciente.medicamentosEmUso, "medicamentosEmUso")}
          </InputGroup>

          <InputGroup>
            <InputLabel>Cirurgias Anteriores</InputLabel>
            {renderArrayField(paciente.cirurgiasAnteriores, "cirurgiasAnteriores")}
          </InputGroup>

          <InputGroup>
            <InputLabel>Exames Recentes</InputLabel>
            {renderArrayField(paciente.examesRecentes, "examesRecentes")}
          </InputGroup>
        </SectionContainer>

        {/* === CAMPOS DE CONTATO === */}
        <SectionContainer>
          <SectionTitle>CAMPOS DE CONTATO</SectionTitle>

          <InputGroup>
            <InputLabel>Telefone Residencial</InputLabel>
            <AnamneseInput
              type="text"
              name="telefoneResidencial"
              value={paciente.telefoneResidencial || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Telefone Comercial</InputLabel>
            <AnamneseInput
              type="text"
              name="telefoneComercial"
              value={paciente.telefoneComercial || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Telefone Celular</InputLabel>
            <AnamneseInput
              type="text"
              name="telefoneCelular"
              value={paciente.telefoneCelular || ""}
              onChange={handleChange}
            />
          </InputGroup>
        </SectionContainer>

        {/* === CAMPOS DE ENDEREÇO === */}
        <SectionContainer>
          <SectionTitle>CAMPOS DE ENDEREÇO</SectionTitle>

          <InputGroup>
            <InputLabel>CEP</InputLabel>
            <AnamneseInput
              type="text"
              name="cep"
              value={paciente.cep || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Cidade</InputLabel>
            <AnamneseInput
              type="text"
              name="cidade"
              value={paciente.cidade || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Estado</InputLabel>
            <AnamneseInput
              type="text"
              name="estado"
              value={paciente.estado || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Bairro</InputLabel>
            <AnamneseInput
              type="text"
              name="bairro"
              value={paciente.bairro || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Número</InputLabel>
            <AnamneseInput
              type="text"
              name="numero"
              value={paciente.numero || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Complemento</InputLabel>
            <AnamneseInput
              type="text"
              name="complemento"
              value={paciente.complemento || ""}
              onChange={handleChange}
            />
          </InputGroup>
        </SectionContainer>

        {/* === CAMPOS DE RESPONSÁVEL === */}
        <SectionContainer>
          <SectionTitle>CAMPOS DE RESPONSÁVEL</SectionTitle>

          <InputGroup>
            <InputLabel>Nome do Responsável</InputLabel>
            <AnamneseInput
              type="text"
              name="responsavelNome"
              value={paciente.responsavelNome || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>CPF do Responsável</InputLabel>
            <AnamneseInput
              type="text"
              name="responsavelCpf"
              value={paciente.responsavelCpf || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Contato do Responsável</InputLabel>
            <AnamneseInput
              type="text"
              name="responsavelContato"
              value={paciente.responsavelContato || ""}
              onChange={handleChange}
            />
          </InputGroup>
        </SectionContainer>

        {/* === CAMPOS DE EMERGÊNCIA === */}
        <SectionContainer>
          <SectionTitle>CAMPOS DE EMERGÊNCIA</SectionTitle>

          <InputGroup>
            <InputLabel>Contato de Emergência</InputLabel>
            <AnamneseInput
              type="text"
              name="contatoEmergencia"
              value={paciente.contatoEmergencia || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Telefone de Emergência</InputLabel>
            <AnamneseInput
              type="text"
              name="telefoneEmergencia"
              value={paciente.telefoneEmergencia || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Parentesco de Emergência</InputLabel>
            <AnamneseInput
              type="text"
              name="parentescoEmergencia"
              value={paciente.parentescoEmergencia || ""}
              onChange={handleChange}
            />
          </InputGroup>
        </SectionContainer>

        {/* === CAMPOS DE PLANO DE SAÚDE === */}
        <SectionContainer>
          <SectionTitle>CAMPOS DE PLANO DE SAÚDE</SectionTitle>

          <InputGroup>
            <InputLabel>Plano de Saúde</InputLabel>
            <AnamneseInput
              type="text"
              name="planoDeSaude"
              value={paciente.planoDeSaude || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Número do Plano</InputLabel>
            <AnamneseInput
              type="text"
              name="numeroPlano"
              value={paciente.numeroPlano || ""}
              onChange={handleChange}
            />
          </InputGroup>
        </SectionContainer>

        {/* === CAMPOS DE TRABALHO === */}
        <SectionContainer>
          <SectionTitle>CAMPOS DE TRABALHO</SectionTitle>

          <InputGroup>
            <InputLabel>Empresa</InputLabel>
            <AnamneseInput
              type="text"
              name="empresa"
              value={paciente.empresa || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Cargo</InputLabel>
            <AnamneseInput
              type="text"
              name="cargo"
              value={paciente.cargo || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Tempo de Trabalho</InputLabel>
            <AnamneseInput
              type="text"
              name="tempoTrabalho"
              value={paciente.tempoTrabalho || ""}
              onChange={handleChange}
            />
          </InputGroup>
        </SectionContainer>

        {/* === CAMPOS DE HÁBITOS ESPECÍFICOS === */}
        <SectionContainer>
          <SectionTitle>CAMPOS DE HÁBITOS ESPECÍFICOS</SectionTitle>

          <InputGroup>
            <InputLabel>Uso de Protetor Solar</InputLabel>
            <AnamneseInput
              type="text"
              name="usoProtetorSolar"
              value={paciente.usoProtetorSolar || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Frequência do Protetor</InputLabel>
            <AnamneseInput
              type="text"
              name="frequenciaProtetor"
              value={paciente.frequenciaProtetor || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Tipo de Protetor</InputLabel>
            <AnamneseInput
              type="text"
              name="tipoProtetor"
              value={paciente.tipoProtetor || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Exposição Solar</InputLabel>
            <AnamneseInput
              type="text"
              name="exposicaoSolar"
              value={paciente.exposicaoSolar || ""}
              onChange={handleChange}
            />
          </InputGroup>
        </SectionContainer>

        {/* === CAMPOS DE PELE ESPECÍFICOS === */}
        <SectionContainer>
          <SectionTitle>CAMPOS DE PELE ESPECÍFICOS</SectionTitle>

          <InputGroup>
            <InputLabel>Tipo de Pele</InputLabel>
            <AnamneseInput
              type="text"
              name="tipoPele"
              value={paciente.tipoPele || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Sensibilidade da Pele</InputLabel>
            <AnamneseInput
              type="text"
              name="sensibilidadePele"
              value={paciente.sensibilidadePele || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Reações Anteriores</InputLabel>
            {renderArrayField(paciente.reacoesAnteriores, "reacoesAnteriores")}
          </InputGroup>
        </SectionContainer>

        {/* === CAMPOS DE TRATAMENTO ESPECÍFICOS === */}
        <SectionContainer>
          <SectionTitle>CAMPOS DE TRATAMENTO ESPECÍFICOS</SectionTitle>

          <InputGroup>
            <InputLabel>Expectativas do Tratamento</InputLabel>
            <AnamneseInput
              type="text"
              name="expectativasTratamento"
              value={paciente.expectativasTratamento || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Disponibilidade de Horários</InputLabel>
            {renderArrayField(paciente.disponibilidadeHorarios, "disponibilidadeHorarios")}
          </InputGroup>

          <InputGroup>
            <InputLabel>Preferência de Tratamento</InputLabel>
            <AnamneseInput
              type="text"
              name="preferenciaTratamento"
              value={paciente.preferenciaTratamento || ""}
              onChange={handleChange}
            />
          </InputGroup>
        </SectionContainer>

        {/* === CAMPOS DE PAGAMENTO === */}
        <SectionContainer>
          <SectionTitle>CAMPOS DE PAGAMENTO</SectionTitle>

          <InputGroup>
            <InputLabel>Forma de Pagamento</InputLabel>
            <AnamneseInput
              type="text"
              name="formaPagamento"
              value={paciente.formaPagamento || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Parcelamento</InputLabel>
            <AnamneseInput
              type="text"
              name="parcelamento"
              value={paciente.parcelamento || ""}
              onChange={handleChange}
            />
          </InputGroup>
        </SectionContainer>

        {/* === CAMPOS DE ACOMPANHAMENTO === */}
        <SectionContainer>
          <SectionTitle>CAMPOS DE ACOMPANHAMENTO</SectionTitle>

          <InputGroup>
            <InputLabel>Acompanhante</InputLabel>
            <AnamneseInput
              type="text"
              name="acompanhante"
              value={paciente.acompanhante || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Observações Especiais</InputLabel>
            <AnamneseInput
              type="text"
              name="observacoesEspeciais"
              value={paciente.observacoesEspeciais || ""}
              onChange={handleChange}
            />
          </InputGroup>
        </SectionContainer>

        <ButtonGroup>
          <Button onClick={handleSave}>Salvar Alterações</Button>
          <Button onClick={() => {
            console.log("Botão excluir clicado");
            setShowDeleteModal(true);
          }} style={{ backgroundColor: "#dc3545" }}>
            Excluir Paciente
          </Button>
        </ButtonGroup>

        {showDeleteModal && (
          <ConfirmDeleteModal
            isOpen={showDeleteModal}
            onConfirm={() => {
              console.log("Confirmando exclusão do paciente");
              handleDelete();
              setShowDeleteModal(false);
            }}
            onCancel={() => {
              console.log("Cancelando exclusão do paciente");
              setShowDeleteModal(false);
            }}
          />
        )}
      </Container>
    </AppContainer>
  );
}

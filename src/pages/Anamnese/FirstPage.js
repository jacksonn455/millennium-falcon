import React, { useState } from "react";
import Container from "../../components/Container";
import { Title, SectionTitle } from "../../components/Title";
import { Button, ButtonGroup } from "../../components/Button";
import { TextArea } from "../../components/TextArea";
import { Label } from "../../components/Label";
import { AnamneseInput } from "../../components/Input";
import { RadioGroup, RadioLabel } from "../../components/Radio";
import {
  CheckboxGroup,
  CheckboxContainer,
  Checkbox,
} from "../../components/CheckBox";
import { FormGroup } from "../../components/Form";

const FirstPage = ({ nextPage, setFormData, formData }) => {
  const [localFormData, setLocalFormData] = useState({
    nome: "",
    idade: "",
    profissao: "",
    dataNascimento: "",
    cpf: "",
    rg: "",
    contato: "",
    endereco: "",
    escolaridade: "",
    estadoCivil: "",
    image: null,
    queixa: "",
    soubeDoTrabalho: "",
    inicioQueixa: "",
    intensificacaoQueixa: "",
    tratamentosAnteriores: "",
    patologias: [],
    funcionamentoIntestinal: "",
    gestante: "",
    contraceptivo: "",
    cicloMenstrual: "",
    ultimaGestacao: "",
    qualidadeSono: "",
    ansiedade: "",
    nervosismo: "",
    exercicio: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(formData.image || null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      patologias: checked
        ? [...(prevData.patologias || []), name]
        : (prevData.patologias || []).filter((patologia) => patologia !== name),
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  return (
    <Container>
      <Title>Anamnese Facial</Title>

      <SectionTitle>Informações Pessoais</SectionTitle>
      <FormGroup>
        <Label>Nome:</Label>
        <AnamneseInput
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleInputChange}
          placeholder="Digite o nome"
        />
      </FormGroup>
      <FormGroup>
        <Label>Idade:</Label>
        <AnamneseInput
          type="number"
          name="idade"
          value={formData.idade}
          onChange={handleInputChange}
          placeholder="Digite a idade"
        />
      </FormGroup>
      <FormGroup>
        <Label>Profissão:</Label>
        <AnamneseInput
          type="text"
          name="profissao"
          value={formData.profissao}
          onChange={handleInputChange}
          placeholder="Digite a profissão"
        />
      </FormGroup>
      <FormGroup>
        <Label>Data de Nascimento:</Label>
        <AnamneseInput
          type="date"
          name="dataNascimento"
          value={formData.dataNascimento}
          onChange={handleInputChange}
          placeholder="dd/mm/aaaa"
        />
      </FormGroup>
      <FormGroup>
        <Label>CPF:</Label>
        <AnamneseInput
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleInputChange}
          placeholder="Digite o CPF"
        />
      </FormGroup>
      <FormGroup>
        <Label>RG:</Label>
        <AnamneseInput
          type="text"
          name="rg"
          value={formData.rg}
          onChange={handleInputChange}
          placeholder="Digite o RG"
        />
      </FormGroup>
      <FormGroup>
        <Label>Contato:</Label>
        <AnamneseInput
          type="text"
          name="contato"
          value={formData.contato}
          onChange={handleInputChange}
          placeholder="Digite o número de contato"
        />
      </FormGroup>
      <FormGroup>
        <Label>Endereço:</Label>
        <AnamneseInput
          type="text"
          name="endereco"
          value={formData.endereco}
          onChange={handleInputChange}
          placeholder="Digite o endereço"
        />
      </FormGroup>
      <FormGroup>
        <Label>Escolaridade:</Label>
        <AnamneseInput
          type="text"
          name="escolaridade"
          value={formData.escolaridade}
          onChange={handleInputChange}
          placeholder="Digite a escolaridade"
        />
      </FormGroup>
      <FormGroup>
        <Label>Estado Civil:</Label>
        <AnamneseInput
          type="text"
          name="estadoCivil"
          value={formData.estadoCivil}
          onChange={handleInputChange}
          placeholder="Digite o estado civil"
        />
      </FormGroup>
       <FormGroup>
        <Label>Fotos da Paciente:</Label>
        <AnamneseInput type="file" name="image" onChange={handleFileChange} />
      </FormGroup>

      {imagePreview && (
        <div style={{ marginTop: "10px" }}>
          <img
            src={imagePreview}
            alt="Prévia da Foto"
            style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "10px" }}
          />
        </div>
      )}

      <SectionTitle>Primeira Consulta</SectionTitle>
      <FormGroup>
        <Label>Qual é sua queixa atual?</Label>
        <TextArea
          name="queixa"
          rows="3"
          value={formData.queixa}
          onChange={handleInputChange}
          placeholder="Descreva sua queixa"
        />
      </FormGroup>
      <FormGroup>
        <Label>Como soube do meu trabalho?</Label>
        <TextArea
          name="soubeDoTrabalho"
          rows="3"
          value={formData.soubeDoTrabalho}
          onChange={handleInputChange}
          placeholder="Explique"
        />
      </FormGroup>

      <SectionTitle>Histórico da Queixa</SectionTitle>
      <FormGroup>
        <Label>Início da queixa:</Label>
        <AnamneseInput
          type="text"
          name="inicioQueixa"
          value={formData.inicioQueixa}
          onChange={handleInputChange}
          placeholder="Informe quando começou"
        />
      </FormGroup>
      <FormGroup>
        <Label>Quando se intensificou:</Label>
        <AnamneseInput
          type="text"
          name="intensificacaoQueixa"
          value={formData.intensificacaoQueixa}
          onChange={handleInputChange}
          placeholder="Descreva o momento"
        />
      </FormGroup>
      <FormGroup>
        <Label>Tratamentos anteriores:</Label>
        <TextArea
          name="tratamentosAnteriores"
          rows="3"
          value={formData.tratamentosAnteriores}
          onChange={handleInputChange}
          placeholder="Liste os tratamentos realizados"
        />
      </FormGroup>
      <FormGroup>
        <Label>Uso de produtos:</Label>
        <TextArea rows="3" placeholder="Descreva os produtos usados"></TextArea>
      </FormGroup>

      <SectionTitle>Histórico de Patologias</SectionTitle>
      <CheckboxGroup>
        {[
          "Diabetes Tipo 1",
          "Diabetes Tipo 2",
          "Pressão arterial normal",
          "Hipotenso",
          "Hipertenso",
          "Controlado com medicação",
          "Hipertireoidismo",
          "Hipotireoidismo",
          "Trombose",
          "Epilepsia",
          "Insuficiência renal",
          "Ovários policísticos",
          "Colesterol alterado",
          "Triglicerídeos alterados",
          "Esteatose hepática",
          "Histórico de queloide",
          "Histórico de câncer",
          "Metástase",
        ].map((patologia) => (
          <CheckboxContainer key={patologia}>
            <Checkbox
              type="checkbox"
              name={patologia}
              checked={(localFormData.patologias || []).includes(patologia)}
              onChange={handleCheckboxChange}
            />
            {patologia}
          </CheckboxContainer>
        ))}
      </CheckboxGroup>

      <SectionTitle>Conhecendo Mais Sobre Você</SectionTitle>
      <FormGroup>
        <Label>Funcionamento intestinal:</Label>
        <RadioGroup>
          {["Todos os dias", "4 vezes na semana", "Menos de 4 vezes"].map(
            (option) => (
              <RadioLabel key={option}>
                <input
                  type="radio"
                  name="funcionamentoIntestinal"
                  value={option}
                  checked={formData.funcionamentoIntestinal === option}
                  onChange={handleRadioChange}
                />
                {option}
              </RadioLabel>
            )
          )}
        </RadioGroup>
      </FormGroup>

      <FormGroup>
        <Label>É gestante?</Label>
        <RadioGroup>
          {["Sim", "Não", "Lactante"].map((option) => (
            <RadioLabel key={option}>
              <input
                type="radio"
                name="gestante"
                value={option}
                checked={formData.gestante === option}
                onChange={handleRadioChange}
              />
              {option}
            </RadioLabel>
          ))}
        </RadioGroup>
      </FormGroup>

      <FormGroup>
        <Label>Método contraceptivo:</Label>
        <RadioGroup>
          {["DIU", "Pílula"].map((option) => (
            <RadioLabel key={option}>
              <input
                type="radio"
                name="contraceptivo"
                value={option}
                checked={formData.contraceptivo === option}
                onChange={handleRadioChange}
              />
              {option}
            </RadioLabel>
          ))}
        </RadioGroup>
      </FormGroup>

      <FormGroup>
        <Label>Menopausa / Ciclo menstrual:</Label>
        <RadioGroup>
          {["28 dias", "26 dias"].map((option) => (
            <RadioLabel key={option}>
              <input
                type="radio"
                name="cicloMenstrual"
                value={option}
                checked={formData.cicloMenstrual === option}
                onChange={handleRadioChange}
              />
              {option}
            </RadioLabel>
          ))}
        </RadioGroup>
      </FormGroup>

      <FormGroup>
        <Label>Última gestação a quanto tempo:</Label>
        <AnamneseInput
          type="text"
          name="ultimaGestacao"
          value={formData.ultimaGestacao}
          onChange={handleInputChange}
          placeholder="Digite o tempo"
        />
      </FormGroup>

      <FormGroup>
        <Label>Qualidade do sono:</Label>
        <RadioGroup>
          {["8H", "6H", "Irregular"].map((option) => (
            <RadioLabel key={option}>
              <input
                type="radio"
                name="qualidadeSono"
                value={option}
                checked={formData.qualidadeSono === option}
                onChange={handleRadioChange}
              />
              {option}
            </RadioLabel>
          ))}
        </RadioGroup>
      </FormGroup>

      <FormGroup>
        <Label>Ansiedade:</Label>
        <RadioGroup>
          {["Muito", "Moderado", "Nada"].map((option) => (
            <RadioLabel key={option}>
              <input
                type="radio"
                name="ansiedade"
                value={option}
                checked={formData.ansiedade === option}
                onChange={handleRadioChange}
              />
              {option}
            </RadioLabel>
          ))}
        </RadioGroup>
      </FormGroup>

      <FormGroup>
        <Label>Nervosismo:</Label>
        <RadioGroup>
          {["Muito", "Moderado", "Nada"].map((option) => (
            <RadioLabel key={option}>
              <input
                type="radio"
                name="nervosismo"
                value={option}
                checked={formData.nervosismo === option}
                onChange={handleRadioChange}
              />
              {option}
            </RadioLabel>
          ))}
        </RadioGroup>
      </FormGroup>

      <FormGroup>
        <Label>Exercício físico:</Label>
        <RadioGroup>
          {["Não realiza", "1X na semana", "3X na semana"].map((option) => (
            <RadioLabel key={option}>
              <input
                type="radio"
                name="exercicio"
                value={option}
                checked={formData.exercicio === option}
                onChange={handleRadioChange}
              />
              {option}
            </RadioLabel>
          ))}
        </RadioGroup>
      </FormGroup>

      <ButtonGroup>
        <Button onClick={nextPage}>Próximo</Button>
      </ButtonGroup>
    </Container>
  );
};

export default FirstPage;

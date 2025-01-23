import React from "react";
import Container from "../../components/Container";
import { Title, SectionTitle } from "../../components/Title";
import { Button, ButtonGroup } from "../../components/Button";
import { TextArea } from "../../components/TextArea";
import { Label } from "../../components/Label";
import { AnamneseInput } from "../../components/Input";
import { RadioGroup, RadioLabel, RadioInput } from "../../components/Radio";
import { FormGroup } from "../../components/Form";

const SecondPage = ({ nextPage, prevPage }) => {
  return (
    <Container>
      <Title>Anamnese Facial - Parte 2</Title>

      <SectionTitle>Conhecendo mais sobre você</SectionTitle>
      <FormGroup>
        <Label>Tabagista:</Label>
        <RadioGroup>
          <RadioLabel>
            <RadioInput type="radio" name="tabagista" /> Sim
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="tabagista" /> Não
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="tabagista" /> Passivo
          </RadioLabel>
        </RadioGroup>
      </FormGroup>
      <FormGroup>
        <Label>Ingesta de álcool:</Label>
        <RadioGroup>
          <RadioLabel>
            <RadioInput type="radio" name="alcool" /> Todos os dias
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="alcool" /> 3x na semana
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="alcool" /> Não
          </RadioLabel>
        </RadioGroup>
      </FormGroup>
      <FormGroup>
        <Label>Histórico de COVID-19:</Label>
        <RadioGroup>
          <RadioLabel>
            <RadioInput type="radio" name="covid" /> Não
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="covid" /> Sim
          </RadioLabel>
        </RadioGroup>
      </FormGroup>
      <FormGroup>
        <Label>Sequelas:</Label>
        <TextArea placeholder="Descreva suas sequelas..."></TextArea>
      </FormGroup>
      <FormGroup>
        <Label>Alergias:</Label>
        <TextArea placeholder="Descreva suas alergias..."></TextArea>
      </FormGroup>
      <FormGroup>
        <Label>Faz algum tipo de suplementação?</Label>
        <RadioGroup>
          <RadioLabel>
            <RadioInput type="radio" name="suplementacao" /> Sim
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="suplementacao" /> Não
          </RadioLabel>
        </RadioGroup>
        <TextArea placeholder="Descreva se sim..."></TextArea>
      </FormGroup>

      <SectionTitle>Alimentação</SectionTitle>
      <FormGroup>
        <Label>Quantas refeições faz por dia:</Label>
        <RadioGroup>
          <RadioLabel>
            <RadioInput type="radio" name="refeicoes" /> 3x ao dia
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="refeicoes" /> 5x ao dia
          </RadioLabel>
        </RadioGroup>
      </FormGroup>

      <FormGroup>
        <Label>Ingestão de carne na semana:</Label>
        <RadioGroup>
          <RadioLabel>
            <RadioInput type="radio" name="carne" /> 1x na semana
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="carne" /> 3x na semana
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="carne" /> Todos os dias
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="carne" /> Não ingere
          </RadioLabel>
        </RadioGroup>
      </FormGroup>

      <FormGroup>
        <Label>Ingestão de lanches prontos:</Label>
        <RadioGroup>
          <RadioLabel>
            <RadioInput type="radio" name="lanches" /> Todos os dias
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="lanches" /> 3x na semana
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="lanches" /> 1x na semana
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="lanches" /> Não ingere
          </RadioLabel>
        </RadioGroup>
      </FormGroup>

      <FormGroup>
        <Label>Ingestão de refrigerante:</Label>
        <RadioGroup>
          <RadioLabel>
            <RadioInput type="radio" name="refrigerante" /> Todos os dias
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="refrigerante" /> 3x na semana
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="refrigerante" /> 1x na semana
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="refrigerante" /> Não ingere
          </RadioLabel>
        </RadioGroup>
      </FormGroup>

      <FormGroup>
        <Label>Ingestão de frutas:</Label>
        <RadioGroup>
          <RadioLabel>
            <RadioInput type="radio" name="frutas" /> Todos os dias
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="frutas" /> 3x na semana
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="frutas" /> 1x na semana
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="frutas" /> Não ingere
          </RadioLabel>
        </RadioGroup>
      </FormGroup>

      <FormGroup>
        <Label>Ingestão de leite:</Label>
        <RadioGroup>
          <RadioLabel>
            <RadioInput type="radio" name="leite" /> Todos os dias
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="leite" /> Duas vezes ao dia
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="leite" /> Intolerante ao leite
          </RadioLabel>
        </RadioGroup>
      </FormGroup>

      <FormGroup>
        <Label>Costuma comer de madrugada?</Label>
        <RadioGroup>
          <RadioLabel>
            <RadioInput type="radio" name="madrugada" /> Sim
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="madrugada" /> Não
          </RadioLabel>
        </RadioGroup>
      </FormGroup>

      <FormGroup>
        <Label>Último horário da sua alimentação:</Label>
        <AnamneseInput type="text" name="ultimoHorario" placeholder="Ex: 22:00" />
      </FormGroup>

      <FormGroup>
        <Label>Horário que você dorme:</Label>
        <AnamneseInput type="text" name="horarioDorme" placeholder="Ex: 23:30" />
      </FormGroup>

      <FormGroup>
        <Label>Intolerante a algum tipo de alimento?</Label>
        <TextArea placeholder="Descreva aqui..." name="intolerancia"></TextArea>
      </FormGroup>

      <SectionTitle>Melasma</SectionTitle>
      <FormGroup>
        <Label>Tipos:</Label>
        <RadioGroup>
          <RadioLabel>
            <RadioInput type="radio" name="melasma" /> Superficial
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="melasma" /> Misto
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="melasma" /> Profundo
          </RadioLabel>
        </RadioGroup>
      </FormGroup>

      <SectionTitle>Manchas</SectionTitle>
      <FormGroup>
        <Label>Tipos:</Label>
        <RadioGroup>
          <RadioLabel>
            <RadioInput type="checkbox" name="manchas" /> Solares
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="checkbox" name="manchas" /> Hormonais
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="checkbox" name="manchas" /> Pós-inflamatórias
          </RadioLabel>
        </RadioGroup>
      </FormGroup>

      <SectionTitle>Linhas de expressão</SectionTitle>
      <FormGroup>
        <Label>Localidades:</Label>
        <RadioGroup>
          <RadioLabel>
            <RadioInput type="checkbox" name="linhas" /> Testa
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="checkbox" name="linhas" /> Ao redor dos olhos
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="checkbox" name="linhas" /> Boca
          </RadioLabel>
        </RadioGroup>
      </FormGroup>

      <SectionTitle>Acne</SectionTitle>
      <FormGroup>
        <Label>Apresenta Acne?</Label>
        <RadioGroup>
          <RadioLabel>
            <RadioInput type="radio" name="acne" /> Apresenta
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="acne" /> Não apresenta
          </RadioLabel>
        </RadioGroup>
      </FormGroup>
      <FormGroup>
        <Label>Grau:</Label>
        <RadioGroup>
          <RadioLabel>
            <RadioInput type="radio" name="grau" /> Grau I
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="grau" /> Grau II
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="grau" /> Grau III
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="grau" /> Grau IV
          </RadioLabel>
        </RadioGroup>
      </FormGroup>
      <FormGroup>
        <Label>Região:</Label>
        <RadioGroup>
          <RadioLabel>
            <RadioInput type="checkbox" name="regiao" /> Testa
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="checkbox" name="regiao" /> Nariz
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="checkbox" name="regiao" /> Bochecha
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="checkbox" name="regiao" /> Queixo
          </RadioLabel>
        </RadioGroup>
      </FormGroup>

      <SectionTitle>Cicatrizes de Acne</SectionTitle>
      <FormGroup>
        <Label>Apresenta Cicatrizes?</Label>
        <RadioGroup>
          <RadioLabel>
            <RadioInput type="radio" name="cicatriz" /> Apresenta
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="cicatriz" /> Não apresenta
          </RadioLabel>
        </RadioGroup>
      </FormGroup>
      <FormGroup>
        <Label>Tipos:</Label>
        <RadioGroup>
          <RadioLabel>
            <RadioInput type="checkbox" name="tipoCicatriz" /> Boxcar
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="checkbox" name="tipoCicatriz" /> Ice Pick
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="checkbox" name="tipoCicatriz" /> Hiperpigmentada
          </RadioLabel>
        </RadioGroup>
      </FormGroup>

      <SectionTitle>Olheiras</SectionTitle>
      <FormGroup>
        <Label>Apresenta Olheiras?</Label>
        <RadioGroup>
          <RadioLabel>
            <RadioInput type="radio" name="olheiras" /> Apresenta
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" name="olheiras" /> Não apresenta
          </RadioLabel>
        </RadioGroup>
      </FormGroup>
      <FormGroup>
        <Label>Tipos:</Label>
        <RadioGroup>
          <RadioLabel>
            <RadioInput type="checkbox" name="tipoOlheiras" /> Estrutural
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="checkbox" name="tipoOlheiras" /> Hiperpigmentada
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="checkbox" name="tipoOlheiras" /> Vascular
          </RadioLabel>
        </RadioGroup>
      </FormGroup>

      <ButtonGroup>
        <Button onClick={prevPage}>Voltar</Button>
        <Button onClick={nextPage}>Próximo</Button>
      </ButtonGroup>
    </Container>
  );
};

export default SecondPage;

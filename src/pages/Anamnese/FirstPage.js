import React from "react";
import Container from "../../components/Container";
import { Title, SectionTitle } from "../../components/Title";
import { Button, ButtonGroup } from "../../components/Button";
import { TextArea } from "../../components/TextArea";
import { Label } from "../../components/Label";
import { AnamneseInput } from "../../components/Input";
import { RadioGroup, RadioLabel } from "../../components/Radio";
import { CheckboxGroup, CheckboxContainer, Checkbox } from "../../components/CheckBox";
import { FormGroup } from "../../components/Form";

const FirstPage = ({ nextPage }) => {
  return (
    <Container>
      <Title>Anamnese Facial</Title>

      <SectionTitle>Informações Pessoais</SectionTitle>
      <FormGroup>
        <Label>Nome:</Label>
        <AnamneseInput type="text" placeholder="Digite o nome" />
      </FormGroup>
      <FormGroup>
        <Label>Idade:</Label>
        <AnamneseInput type="number" placeholder="Digite a idade" />
      </FormGroup>
      <FormGroup>
        <Label>Profissão:</Label>
        <AnamneseInput type="text" placeholder="Digite a profissão" />
      </FormGroup>
      <FormGroup>
        <Label>Data de Nascimento:</Label>
        <AnamneseInput type="date" placeholder="dd/mm/aaaa" />
      </FormGroup>
      <FormGroup>
        <Label>CPF:</Label>
        <AnamneseInput type="text" placeholder="Digite o CPF" />
      </FormGroup>
      <FormGroup>
        <Label>RG:</Label>
        <AnamneseInput type="text" placeholder="Digite o RG" />
      </FormGroup>
      <FormGroup>
        <Label>Contato:</Label>
        <AnamneseInput type="text" placeholder="Digite o número de contato" />
      </FormGroup>
      <FormGroup>
        <Label>Endereço:</Label>
        <AnamneseInput type="text" placeholder="Digite o endereço" />
      </FormGroup>
      <FormGroup>
        <Label>Escolaridade:</Label>
        <AnamneseInput type="text" placeholder="Digite a escolaridade" />
      </FormGroup>
      <FormGroup>
        <Label>Estado Civil:</Label>
        <AnamneseInput type="text" placeholder="Digite o estado civil" />
      </FormGroup>
      <FormGroup>
        <Label>Fotos da Paciente:</Label>
        <AnamneseInput type="file" />
      </FormGroup>

      <SectionTitle>Primeira Consulta</SectionTitle>
      <FormGroup>
        <Label>Qual é sua queixa atual?</Label>
        <TextArea rows="3" placeholder="Descreva sua queixa"></TextArea>
      </FormGroup>
      <FormGroup>
        <Label>Como soube do meu trabalho?</Label>
        <TextArea rows="3" placeholder="Explique"></TextArea>
      </FormGroup>

      <SectionTitle>Histórico da Queixa</SectionTitle>
      <FormGroup>
        <Label>Início da queixa:</Label>
        <AnamneseInput type="text" placeholder="Informe quando começou" />
      </FormGroup>
      <FormGroup>
        <Label>Quando se intensificou:</Label>
        <AnamneseInput type="text" placeholder="Descreva o momento" />
      </FormGroup>
      <FormGroup>
        <Label>Tratamentos anteriores:</Label>
        <TextArea
          rows="3"
          placeholder="Liste os tratamentos realizados"
        ></TextArea>
      </FormGroup>
      <FormGroup>
        <Label>Uso de produtos:</Label>
        <TextArea rows="3" placeholder="Descreva os produtos usados"></TextArea>
      </FormGroup>

      <SectionTitle>Histórico de Patologias</SectionTitle>
      <CheckboxGroup>
        <CheckboxContainer>
          <Checkbox type="checkbox" /> Diabetes Tipo 1
        </CheckboxContainer>
        <CheckboxContainer>
          <Checkbox type="checkbox" /> Diabetes Tipo 2
        </CheckboxContainer>
        <CheckboxContainer>
          <Checkbox type="checkbox" /> Pressão arterial normal
        </CheckboxContainer>
        <CheckboxContainer>
          <Checkbox type="checkbox" /> Hipotenso
        </CheckboxContainer>
        <CheckboxContainer>
          <Checkbox type="checkbox" /> Hipertenso
        </CheckboxContainer>
        <CheckboxContainer>
          <Checkbox type="checkbox" /> Controlado com medicação
        </CheckboxContainer>
        <CheckboxContainer>
          <Checkbox type="checkbox" /> Hipertireoidismo
        </CheckboxContainer>
        <CheckboxContainer>
          <Checkbox type="checkbox" /> Hipotireoidismo
        </CheckboxContainer>
        <CheckboxContainer>
          <Checkbox type="checkbox" /> Trombose
        </CheckboxContainer>
        <CheckboxContainer>
          <Checkbox type="checkbox" /> Epilepsia
        </CheckboxContainer>
        <CheckboxContainer>
          <Checkbox type="checkbox" /> Insuficiência renal
        </CheckboxContainer>
        <CheckboxContainer>
          <Checkbox type="checkbox" /> Ovários policísticos
        </CheckboxContainer>
        <CheckboxContainer>
          <Checkbox type="checkbox" /> Colesterol alterado
        </CheckboxContainer>
        <CheckboxContainer>
          <Checkbox type="checkbox" /> Triglicerídeos alterados
        </CheckboxContainer>
        <CheckboxContainer>
          <Checkbox type="checkbox" /> Esteatose hepática
        </CheckboxContainer>
        <CheckboxContainer>
          <Checkbox type="checkbox" /> Histórico de queloide
        </CheckboxContainer>
        <CheckboxContainer>
          <Checkbox type="checkbox" /> Histórico de câncer
        </CheckboxContainer>
        <CheckboxContainer>
          <Checkbox type="checkbox" /> Metástase
        </CheckboxContainer>
      </CheckboxGroup>

      <SectionTitle>Conhecendo Mais Sobre Você</SectionTitle>
      <FormGroup>
        <Label>Funcionamento intestinal:</Label>
        <RadioGroup>
          <RadioLabel>
            <input type="radio" name="intestinal" /> Todos os dias
          </RadioLabel>
          <RadioLabel>
            <input type="radio" name="intestinal" /> 4 vezes na semana
          </RadioLabel>
          <RadioLabel>
            <input type="radio" name="intestinal" /> Menos de 4 vezes
          </RadioLabel>
        </RadioGroup>
      </FormGroup>
      <FormGroup>
        <Label>É gestante?</Label>
        <RadioGroup>
          <RadioLabel>
            <input type="radio" name="gestante" /> Sim
          </RadioLabel>
          <RadioLabel>
            <input type="radio" name="gestante" /> Não
          </RadioLabel>
          <RadioLabel>
            <input type="radio" name="gestante" /> Lactante
          </RadioLabel>
        </RadioGroup>
      </FormGroup>
      <FormGroup>
        <Label>Método contraceptivo:</Label>
        <RadioGroup>
          <RadioLabel>
            <input type="radio" name="contraceptivo" /> DIU
          </RadioLabel>
          <RadioLabel>
            <input type="radio" name="contraceptivo" /> Pílula
          </RadioLabel>
        </RadioGroup>
      </FormGroup>
      <FormGroup>
        <Label>Menopausa / Ciclo menstrual:</Label>
        <RadioGroup>
          <RadioLabel>
            <input type="radio" name="ciclo" /> 28 dias
          </RadioLabel>
          <RadioLabel>
            <input type="radio" name="ciclo" /> 26 dias
          </RadioLabel>
        </RadioGroup>
      </FormGroup>
      <FormGroup>
        <Label>Última gestação a quanto tempo:</Label>
        <AnamneseInput type="text" placeholder="Digite o tempo" />
      </FormGroup>
      <FormGroup>
        <Label>Qualidade do sono:</Label>
        <RadioGroup>
          <RadioLabel>
            <input type="radio" name="sono" /> 8H
          </RadioLabel>
          <RadioLabel>
            <input type="radio" name="sono" /> 6H
          </RadioLabel>
          <RadioLabel>
            <input type="radio" name="sono" /> Irregular
          </RadioLabel>
        </RadioGroup>
      </FormGroup>
      <FormGroup>
        <Label>Ansiedade:</Label>
        <RadioGroup>
          <RadioLabel>
            <input type="radio" name="ansiedade" /> Muito
          </RadioLabel>
          <RadioLabel>
            <input type="radio" name="ansiedade" /> Moderado
          </RadioLabel>
          <RadioLabel>
            <input type="radio" name="ansiedade" /> Nada
          </RadioLabel>
        </RadioGroup>
      </FormGroup>
      <FormGroup>
        <Label>Nervosismo:</Label>
        <RadioGroup>
          <RadioLabel>
            <input type="radio" name="nervosismo" /> Muito
          </RadioLabel>
          <RadioLabel>
            <input type="radio" name="nervosismo" /> Moderado
          </RadioLabel>
          <RadioLabel>
            <input type="radio" name="nervosismo" /> Nada
          </RadioLabel>
        </RadioGroup>
      </FormGroup>
      <FormGroup>
        <Label>Exercício físico:</Label>
        <RadioGroup>
          <RadioLabel>
            <input type="radio" name="exercicio" /> Não realiza
          </RadioLabel>
          <RadioLabel>
            <input type="radio" name="exercicio" /> 1X na semana
          </RadioLabel>
          <RadioLabel>
            <input type="radio" name="exercicio" /> 3X na semana
          </RadioLabel>
        </RadioGroup>
      </FormGroup>

      <ButtonGroup>
        <Button onClick={nextPage}>Próximo</Button>
      </ButtonGroup>
    </Container>
  );
};

export default FirstPage;

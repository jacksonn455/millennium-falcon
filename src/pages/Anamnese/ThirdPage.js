import React, { useRef } from "react";
import { SignatureCanvasWrapper } from "../../components/SignatureCanvasWrapper";
import Container from "../../components/Container";
import { Title } from "../../components/Title";
import { Button, ButtonGroup } from "../../components/Button";
import { TextArea } from "../../components/TextArea";
import { Label } from "../../components/Label";
import { Checkbox } from "../../components/CheckBox";
import { AnamneseInput } from "../../components/Input";
import {
  Section,
  TermsContainer,
  Term,
  Footer,
  FooterField,
} from "../../components/Div";
import { FooterInput } from "../../components/Input";

const ThirdPage = ({ nextPage, prevPage }) => {
  const signatureRef = useRef(null);

  const clearSignature = () => {
    signatureRef.current.clear();
  };

  return (
    <Container>
      <Title>Tratamento</Title>

      <Section>
        <Label>Diagnóstico:</Label>
        <AnamneseInput type="text" placeholder="Digite o diagnóstico" />
      </Section>

      <Section>
        <Label>Descrição:</Label>
        <TextArea rows="4" placeholder="Descreva o tratamento"></TextArea>
      </Section>

      <Section>
        <Label>Conduta:</Label>
        <TextArea rows="4" placeholder="Descreva a conduta"></TextArea>
      </Section>

      <Section>
        <Label>Valor do Tratamento:</Label>
        <AnamneseInput type="text" placeholder="Digite o valor do tratamento" />
      </Section>

      <TermsContainer>
        <Term>
          <Checkbox type="checkbox" />
          <span>
            Eu estou ciente e de acordo que não omiti nenhuma informação citada
            acima, declarando que todas as informações são reais e por conta e
            risco meu.
          </span>
        </Term>
        <Term>
          <Checkbox type="checkbox" />
          <span>
            Eu autorizo e declaro concedido o uso da minha imagem, antes,
            durante e depois, por tempo indeterminado para finalidades de redes
            sociais.
          </span>
        </Term>
      </TermsContainer>

      <Footer>
        <FooterField>
          <Label>Data:</Label>
          <FooterInput type="text" placeholder="dd / mm / aaaa" />
        </FooterField>
        <FooterField>
          <SignatureCanvasWrapper
            refCanvas={signatureRef}
            onClear={clearSignature}
            label="Assinatura"
          />
        </FooterField>
      </Footer>

      <ButtonGroup>
        <Button onClick={prevPage}>Voltar</Button>
        <Button onClick={nextPage}>Próximo</Button>
      </ButtonGroup>
    </Container>
  );
};

export default ThirdPage;

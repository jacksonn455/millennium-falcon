import React, { useRef, useState } from "react";
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

const ThirdPage = ({ nextPage, prevPage, setFormData, formData }) => {
  const signatureRef = useRef(null);
  const [diagnostico, setDiagnostico] = useState(formData.diagnostico || "");
  const [descricao, setDescricao] = useState(formData.descricao || "");
  const [conduta, setConduta] = useState(formData.conduta || "");
  const [valor, setValor] = useState(formData.valor || "");
  const [termo1, setTermo1] = useState(formData.termo1 || false);
  const [termo2, setTermo2] = useState(formData.termo2 || false);
  const [data, setData] = useState(formData.data || "");

  const clearSignature = () => {
    signatureRef.current.clear();
  };

  const formatDate = (input) => {
    const match = input.match(/(\d{2})[\/\-]?(\d{2})[\/\-]?(\d{4})/);
    return match ? `${match[3]}-${match[2]}-${match[1]}` : input;
  };

  const handleNext = () => {
    setFormData({
      ...formData,
      diagnostico,
      descricao,
      conduta,
      valor,
      termo1,
      termo2,
      data: formatDate(data),
      assinatura: signatureRef.current.toDataURL(),
    });
    nextPage();
  };

  return (
    <Container>
      <Title>Tratamento</Title>

      <Section>
        <Label>Diagnóstico:</Label>
        <AnamneseInput
          type="text"
          placeholder="Digite o diagnóstico"
          value={diagnostico}
          onChange={(e) => setDiagnostico(e.target.value)}
        />
      </Section>

      <Section>
        <Label>Descrição:</Label>
        <TextArea
          rows="4"
          placeholder="Descreva o tratamento"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </Section>

      <Section>
        <Label>Conduta:</Label>
        <TextArea
          rows="4"
          placeholder="Descreva a conduta"
          value={conduta}
          onChange={(e) => setConduta(e.target.value)}
        />
      </Section>

      <Section>
        <Label>Valor do Tratamento:</Label>
        <AnamneseInput
          type="text"
          placeholder="Digite o valor do tratamento"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </Section>

      <TermsContainer>
        <Term>
          <Checkbox
            type="checkbox"
            checked={termo1}
            onChange={(e) => setTermo1(e.target.checked)}
          />
          <span>
            Eu estou ciente e de acordo que não omiti nenhuma informação citada
            acima, declarando que todas as informações são reais e por conta e
            risco meu.
          </span>
        </Term>
        <Term>
          <Checkbox
            type="checkbox"
            checked={termo2}
            onChange={(e) => setTermo2(e.target.checked)}
          />
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
          <FooterInput
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
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
        <Button onClick={handleNext}>Próximo</Button>
      </ButtonGroup>
    </Container>
  );
};

export default ThirdPage;
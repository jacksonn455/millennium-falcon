import React, { useRef } from "react";
import { SignatureCanvasWrapper, SignatureArea } from "../../components/SignatureCanvasWrapper";
import Container from "../../components/Container";
import { Title, SectionTitle } from "../../components/Title";
import { Button, ButtonGroup } from "../../components/Button";
import { InputData, InputRow } from "../../components/Input";
import { Paragraph } from "../../components/Paragraph";

const FifthPage = ({ prevPage }) => {
  const signatureRef1 = useRef(null);
  const signatureRef2 = useRef(null);

  const clearSignature1 = () => {
    signatureRef1.current.clear();
  };

  const clearSignature2 = () => {
    signatureRef2.current.clear();
  };

  return (
    <Container>
      <Title>Tratamento Sugerido</Title>

      <InputRow>
        <InputData type="text" placeholder="Tratamento" />
        <InputData type="text" placeholder="Nº de Sessões" />
      </InputRow>

      <InputRow>
        <InputData type="text" placeholder="Valor por Sessão (R$)" />
        <InputData type="text" placeholder="Valor Total (R$)" />
      </InputRow>

      <InputRow>
        <InputData type="text" placeholder="Pré-agendamento" />
        <InputData type="text" placeholder="Horário" />
      </InputRow>

      <SectionTitle>Contrato de Serviços Estéticos</SectionTitle>

      <Paragraph>
        1) Neste ato, a parte acima identificada contrata o tratamento sugerido
        pelo serviço da Esteticista e Cosmetóloga.
      </Paragraph>
      <Paragraph>
        2) O tratamento sugerido será condicionado ao prévio pagamento e poderá
        ser realizado diretamente pela responsável.
      </Paragraph>
      <Paragraph>
        3) O tratamento sugerido não impede a realização de outros
        complementares ou a ele relacionados, por mútuo consentimento das
        partes, dispensando a formalização de um novo contrato.
      </Paragraph>
      <Paragraph>
        4) A data/horário de cada sessão poderá ser reagendada até o limite de
        duas vezes mediante solicitação com antecedência mínima de 24 horas.
      </Paragraph>
      <Paragraph>
        5) Caso o cliente atrase ou falte, o valor pago não será restituído, a
        título de multa contratual.
      </Paragraph>
      <Paragraph>
        6) O cliente concede o direito de registrar imagens, vídeos ou dados
        relacionados ao tratamento.
      </Paragraph>
      <Paragraph>
        7) O cliente declara estar ciente que todo tratamento possui riscos.
      </Paragraph>
      <Paragraph>
        8) O cliente declara que não possui doenças ou quadros clínicos que
        prejudiquem o tratamento.
      </Paragraph>
      <Paragraph>
        9) Todas as sessões serão realizadas em conformidade com as regras do
        instrumento.
      </Paragraph>
      <Paragraph>
        10) Em cumprimento à Lei 13.709/2018, o cliente autoriza o uso de dados
        para os fins previstos no contrato.
      </Paragraph>
      <Paragraph>
        11) As partes elegem o foro da comarca de Erechim/RS para dirimir
        eventuais litígios.
      </Paragraph>

      <SignatureArea>
        <SignatureCanvasWrapper
                   refCanvas={signatureRef1}
                   onClear={clearSignature1}
                   label="Assinatura da CONTRATANTE"                  
                 />
        <SignatureCanvasWrapper
                   refCanvas={signatureRef2}
                   onClear={clearSignature2}
                   label="Assinatura da CONTRATADA"
                 />
      </SignatureArea>
      <ButtonGroup>
        <Button onClick={prevPage}>Voltar</Button>
      </ButtonGroup>
    </Container>
  );
};

export default FifthPage;

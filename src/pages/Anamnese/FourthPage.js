import React, { useRef, useState } from "react";
import { Signatures } from "../../components/SignatureCanvasWrapper";
import Container from "../../components/Container";
import { Title } from "../../components/Title";
import { Button, ButtonGroup } from "../../components/Button";
import { Label } from "../../components/Label";
import { InputData } from "../../components/Input";
import { Table, TableCell, TableContainer } from "../../components/Table";

const FourthPage = ({ nextPage, prevPage, setFormData, formData }) => {
  const signatureRefs = useRef(
    Array.from({ length: 12 }, () => React.createRef())
  );
  const [signatures, setSignatures] = useState(Array(12).fill(''));
  const [dates, setDates] = useState(Array(12).fill(''));

  const clearSignature = (index) => {
    if (signatureRefs.current[index]?.current) {
      signatureRefs.current[index].current.clear();
    }
  };

  const handleSignatureChange = (index, signature) => {
    setSignatures(prev => {
      const newSignatures = [...prev];
      newSignatures[index] = signature;
      return newSignatures;
    });
  };

  const handleDateChange = (index, date) => {
    setDates(prev => {
      const newDates = [...prev];
      newDates[index] = date;
      return newDates;
    });
  };

  const handleSave = () => {
    const contratoAssinaturas = signatures.map((signature, index) => ({
      contratanteAssinatura: signature,
      contratadaAssinatura: signature,
      data: dates[index],
    }));

    // Atualize o formData com as assinaturas e datas
    setFormData({
      ...formData,
      contratoAssinaturas,
    });

    // Chame a próxima página
    nextPage();
  };

  return (
    <Container>
      <Title>Assinaturas</Title>
      <TableContainer>
        <Table>
          {Array.from({ length: 4 }).map((_, i) => (
            <TableCell key={`cell-1-${i}`}>
              <Label>Data</Label>
              <InputData
                type="text"
                placeholder="_ / _ / __"
                value={dates[i]}
                onChange={(e) => handleDateChange(i, e.target.value)}
              />
              <Signatures
                refCanvas={signatureRefs.current[i]}
                onClear={() => clearSignature(i)}
                onChange={(signature) => handleSignatureChange(i, signature)}
                label="Assinatura"
              />
            </TableCell>
          ))}
        </Table>

        <Table>
          {Array.from({ length: 4 }).map((_, i) => (
            <TableCell key={`cell-2-${i}`}>
              <Label>Data</Label>
              <InputData
                type="text"
                placeholder="_ / _ / __"
                value={dates[4 + i]}
                onChange={(e) => handleDateChange(4 + i, e.target.value)}
              />
              <Signatures
                refCanvas={signatureRefs.current[4 + i]}
                onClear={() => clearSignature(4 + i)}
                onChange={(signature) => handleSignatureChange(4 + i, signature)}
                label="Assinatura"
              />
            </TableCell>
          ))}
        </Table>

        <Table>
          {Array.from({ length: 4 }).map((_, i) => (
            <TableCell key={`cell-3-${i}`}>
              <Label>Data</Label>
              <InputData
                type="text"
                placeholder="_ / _ / __"
                value={dates[8 + i]}
                onChange={(e) => handleDateChange(8 + i, e.target.value)}
              />
              <Signatures
                refCanvas={signatureRefs.current[8 + i]}
                onClear={() => clearSignature(8 + i)}
                onChange={(signature) => handleSignatureChange(8 + i, signature)}
                label="Assinatura"
              />
            </TableCell>
          ))}
        </Table>
      </TableContainer>

      <ButtonGroup>
        <Button onClick={prevPage}>Voltar</Button>
        <Button onClick={handleSave}>Próximo</Button>
      </ButtonGroup>
    </Container>
  );
};

export default FourthPage;
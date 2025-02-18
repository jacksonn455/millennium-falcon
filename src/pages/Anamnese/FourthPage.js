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
    const formattedDate = formatDate(date);
    setDates(prev => {
      const newDates = [...prev];
      newDates[index] = formattedDate;
      return newDates;
    });
  };

  const formatDate = (date) => {
    const parts = date.replace(/[^0-9]/g, "").match(/(\d{2})(\d{2})(\d{4})/);
    return parts ? `${parts[3]}-${parts[2]}-${parts[1]}` : "";
  };

  const handleSave = () => {
    const contratoAssinaturas = signatures.map((signature, index) => ({
      contratanteAssinatura: signature,
      contratadaAssinatura: signature,
      data: dates[index],
    }));

    setFormData({
      ...formData,
      contratoAssinaturas,
    });

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
                type="date"
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
                type="date"
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
                type="date"
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
import React, { useRef } from "react";
import { Signatures } from "../../components/SignatureCanvasWrapper";
import Container from "../../components/Container";
import { Title } from "../../components/Title";
import { Button, ButtonGroup } from "../../components/Button";
import { Label } from "../../components/Label";
import { InputData } from "../../components/Input";
import { Table, TableCell, TableContainer } from "../../components/Table";

const FourthPage = ({ nextPage, prevPage }) => {
  const signatureRefs = useRef(
    Array.from({ length: 12 }, () => React.createRef())
  );

  const clearSignature = (index) => {
    if (signatureRefs.current[index]?.current) {
      signatureRefs.current[index].current.clear();
    }
  };

  return (
    <Container>
      <Title>Assinaturas</Title>
      <TableContainer>
        <Table>
          {Array.from({ length: 4 }).map((_, i) => (
            <TableCell key={`cell-1-${i}`}>
              <Label>Data</Label>
              <InputData type="text" placeholder="_ / _ / __" />
              <Signatures
                refCanvas={signatureRefs.current[i]}
                onClear={() => clearSignature(i)}
                label="Assinatura"
              />
            </TableCell>
          ))}
        </Table>

        <Table>
          {Array.from({ length: 4 }).map((_, i) => (
            <TableCell key={`cell-2-${i}`}>
              <Label>Data</Label>
              <InputData type="text" placeholder="_ / _ / __" />
              <Signatures
                refCanvas={signatureRefs.current[4 + i]}
                onClear={() => clearSignature(4 + i)}
                label="Assinatura"
              />
            </TableCell>
          ))}
        </Table>

        <Table>
          {Array.from({ length: 4 }).map((_, i) => (
            <TableCell key={`cell-3-${i}`}>
              <Label>Data</Label>
              <InputData type="text" placeholder="_ / _ / __" />
              <Signatures
                refCanvas={signatureRefs.current[8 + i]}
                onClear={() => clearSignature(8 + i)}
                label="Assinatura"
              />
            </TableCell>
          ))}
        </Table>
      </TableContainer>
      <ButtonGroup>
        <Button onClick={prevPage}>Voltar</Button>
        <Button onClick={nextPage}>Próximo</Button>
      </ButtonGroup>
    </Container>
  );
};

export default FourthPage;

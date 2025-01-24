import styled from "styled-components";
import { Title } from "../Title";
import protetorSolar from "../../assets/images/protetor-solar.jpg";
import EspumaFacial from "../../assets/images/espuma-facial.jpg";
import { ButtonEstatistica } from "../Button";

const Card = styled.div`
  align-items: center;
    background-color: #FFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    display: flex;
    margin: 20px auto 0 auto;
    max-width: 600px;
    padding: 25px 20px;
    justify-content: space-around;
    width: 100%;  
`

const Descricao = styled.p`
  max-width: 300px;
  margin-top: 10px;
`;

const Subtitulo = styled.h4`
  color: #a8235e;
  font-size: 18px;
  font-weight: bold;
  margin: 15px 0;
`;

const ImgProduto = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 15px;
`;

const CardVencido = styled(Card)`
  background-color: ${(props) => props.cor || "#FFF"};
`;

const TituloVencido = styled.h3`
  color: ${(props) => props.cor || "#000"};
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
  text-align: center; /* Adiciona centralização ao título */
`;

function CardRecomenda({ titulo, subtitulo, descricao, img }) {
  return (
    <Card>
      <div>
        <Title tamanhoFonte="16px" cor="#EB9B00" alinhamento="left">
          {titulo}
        </Title>
        <Subtitulo>{subtitulo}</Subtitulo>
        <Descricao>{descricao}</Descricao>
      </div>
      <div>
        <ImgProduto src={img} alt={titulo} />
        <ButtonEstatistica>Saiba mais</ButtonEstatistica>
      </div>
    </Card>
  );
}

function CardProdutoVencido({ nome, vencimento, img, cor }) {
  return (
    <CardVencido cor={cor}>
      <div>
        <TituloVencido cor={cor}>{nome}</TituloVencido>
        <p>Vencimento: {vencimento}</p>
      </div>
      <div>
        <ImgProduto src={img} alt="Produtos" />
      </div>
    </CardVencido>
  );
}

function getProximosProdutosVencimento() {
  const produtosVencimento = [
    { id: 1, nome: "Protetor Solar", vencimento: "2025-01-01", src: protetorSolar },
    { id: 2, nome: "Espuma Facial", vencimento: "2025-02-05", src: EspumaFacial },
  ];

  const dataAtual = new Date();

  const proximosProdutos = produtosVencimento
    .map((produto) => {
      const dataVencimento = new Date(produto.vencimento);
      let cor = "";
      let diasRestantes = 0;

      const diffTime = dataVencimento - dataAtual;
      diasRestantes = Math.round(diffTime / (1000 * 3600 * 24));

      if (diasRestantes < 0) {
        cor = "#D32F2F";
      } else if (diasRestantes <= 30) {
        cor = "#FFB300";
      }

      return { ...produto, cor, diasRestantes };
    })
    .filter((produto) => produto.cor);

  return proximosProdutos;
}

export { CardRecomenda, getProximosProdutosVencimento, CardProdutoVencido };

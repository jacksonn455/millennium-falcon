import styled from "styled-components"
import { Title } from "../Title"

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

const Botao = styled.button`
    background-color: #A8235E;
    color: #FFF;
    padding: 10px 0px;
    font-size: 16px;
    border: none;
    font-weight: 900;
    display: block;
    text-align: center;
    width: 150px;
    &:hover {
        cursor: pointer;
    }
`

const Descricao = styled.p`
    max-width: 300px;
`

const Subtitulo = styled.h4`
    color: #A8235E;
    font-size: 18px;
    font-weight: bold;
    margin: 15px 0;
`

const ImgLivro = styled.img`
    width: 150px;
`

const CardVencido = styled(Card)`
    background-color: ${(props) => props.cor || "#FFF"};
`;

const TituloVencido = styled.h3`
    color: ${(props) => props.cor || "#000"};
    font-size: 20px;
    font-weight: bold;
    margin: 10px 0;
`;

const ImgProduto = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
`;

function CardRecomenda({ titulo, subtitulo, descricao, img }) {
    return (
        <Card>
            <div>
                <Title tamanhoFonte="16px" cor="#EB9B00" alinhamento="left">{titulo}</Title>
                <Subtitulo>{subtitulo}</Subtitulo>
                <Descricao>{descricao}</Descricao>
            </div>
            <div>
                <ImgLivro src={img} />
                <Botao>Saiba mais</Botao>
            </div>
        </Card>  
    )
}

function CardProdutoVencido({ nome, vencimento, img, cor }) {
    return (
        <CardVencido cor={cor}>
            <div>
                <TituloVencido cor={cor}>{nome}</TituloVencido>
                <p>Vencimento: {vencimento}</p>
            </div>
            <div>
                {img && <ImgProduto src={img} alt={nome} />}
            </div>
        </CardVencido>
    );
} 

function getProximosProdutosVencimento() {
    const produtosVencimento = [
        { id: 1, nome: "Produto A", vencimento: "2025-01-01", img: "imgA.jpg" },
        { id: 2, nome: "Produto B", vencimento: "2025-02-05", img: "imgB.jpg" },
        { id: 3, nome: "Produto C", vencimento: "2025-03-10", img: "imgC.jpg" },
    ];

    const dataAtual = new Date();

    const proximosProdutos = produtosVencimento.map((produto) => {
        const dataVencimento = new Date(produto.vencimento);
        let cor = "";

        const diffTime = dataVencimento - dataAtual;
        const diffDays = diffTime / (1000 * 3600 * 24);

        if (diffDays < 0) {
            cor = "#D32F2F";
        } else if (diffDays <= 30) {
            cor = "#FFB300";
        }

        return { ...produto, cor };
    }).filter((produto) => produto.cor);

    return proximosProdutos;
}

export { CardRecomenda, getProximosProdutosVencimento, CardProdutoVencido };
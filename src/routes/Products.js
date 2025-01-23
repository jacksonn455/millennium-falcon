import React, { useState } from "react";
import styled from "styled-components";
import Container from "../components/Container";
import { Title, SectionTitle } from "../components/Title";
import { Button, ButtonGroup } from "../components/Button";
import { Label } from "../components/Label";
import { AnamneseInput } from "../components/Input";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const ProductList = styled.div`
  margin-top: 20px;
`;

const ProductCard = styled.div`
  background-color: #f9f9f9;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProductName = styled.h3`
  margin: 0;
`;

function Product() {
  // Estado para o formulário de cadastro
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [validity, setValidity] = useState("");
  
  // Estado para lista de produtos cadastrados
  const [productList, setProductList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Cria um novo produto e adiciona na lista
    const newProduct = {
      id: productList.length + 1,
      name: productName,
      category,
      quantity,
      validity,
    };
    setProductList([...productList, newProduct]);
    // Limpa os campos do formulário
    setProductName("");
    setCategory("");
    setQuantity("");
    setValidity("");
  };

  return (
    <AppContainer>
      <Container>
        <Title>Cadastro e Consulta de Produtos</Title>

        <SectionTitle>Cadastro de Produto</SectionTitle>
        <form onSubmit={handleSubmit}>
          <div>
            <Label>Nome do Produto:</Label>
            <AnamneseInput
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Nome do produto"
              required
            />
          </div>

          <div>
            <Label>Categoria:</Label>
            <AnamneseInput
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Categoria do produto"
              required
            />
          </div>

          <div>
            <Label>Quantidade:</Label>
            <AnamneseInput
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantidade em estoque"
              required
            />
          </div>

          <div>
            <Label>Validade:</Label>
            <AnamneseInput
              type="date"
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
              required
            />
          </div>

          <ButtonGroup>
            <Button type="submit">Cadastrar Produto</Button>
          </ButtonGroup>
        </form>

        <SectionTitle>Consulta de Produtos</SectionTitle>
        <ProductList>
          {productList.map((product) => (
            <ProductCard key={product.id}>
              <ProductName>{product.name}</ProductName>
              <p><strong>Categoria:</strong> {product.category}</p>
              <p><strong>Quantidade:</strong> {product.quantity}</p>
              <p><strong>Validade:</strong> {product.validity}</p>
            </ProductCard>
          ))}
        </ProductList>
      </Container>
    </AppContainer>
  );
}

export default Product;

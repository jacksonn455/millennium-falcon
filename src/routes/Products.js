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
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [validity, setValidity] = useState("");
  const [price, setPrice] = useState("");
  const [supplier, setSupplier] = useState("");
  const [composition, setComposition] = useState("");
  const [image, setImage] = useState(null);

  const [productList, setProductList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: productList.length + 1,
      name: productName,
      category,
      quantity,
      validity,
      price,
      supplier,
      composition,
      image,
    };
    setProductList([...productList, newProduct]);
    setProductName("");
    setCategory("");
    setQuantity("");
    setValidity("");
    setPrice("");
    setSupplier("");
    setComposition("");
    setImage(null);
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

          <div>
            <Label>Preço:</Label>
            <AnamneseInput
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Preço do produto (R$)"
              required
            />
          </div>

          <div>
            <Label>Fornecedor:</Label>
            <AnamneseInput
              type="text"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              placeholder="Fornecedor do produto"
              required
            />
          </div>

          <div>
            <Label>Composição:</Label>
            <AnamneseInput
              type="text"
              value={composition}
              onChange={(e) => setComposition(e.target.value)}
              placeholder="Composição do produto"
            />
          </div>

          <div>
            <Label>Imagem do Produto:</Label>
            <AnamneseInput
              type="file"
              onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
              accept="image/*"
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
              <p><strong>Preço:</strong> R$ {product.price}</p>
              <p><strong>Fornecedor:</strong> {product.supplier}</p>
              <p><strong>Composição:</strong> {product.composition}</p>
              {product.image && (
                <div>
                  <img src={product.image} alt={product.name} width="100" height="100" />
                </div>
              )}
            </ProductCard>
          ))}
        </ProductList>
      </Container>
    </AppContainer>
  );
}

export default Product;
import React, { useState, useEffect } from "react";
import { useLoading } from "../components/LoadingProvider";
import { fetchProducts, createProduct, deleteProduct, updateProduct } from "../services/products";
import Container from "../components/Container";
import { Title, SectionTitle, ProductName } from "../components/Title";
import { Button, ButtonGroup } from "../components/Button";
import { Label } from "../components/Label";
import { AnamneseInput } from "../components/Input";
import { AppContainer, ProductList, ProductCard } from "../components/Div";
import Loader from "../components/Loader";

function ProductRoutes() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [validity, setValidity] = useState("");
  const [price, setPrice] = useState("");
  const [supplier, setSupplier] = useState("");
  const [composition, setComposition] = useState("");
  const [image, setImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [productList, setProductList] = useState([]);

  const { loading, setLoading } = useLoading();

  useEffect(() => {
    fetchProductsList();
  }, []);

  const fetchProductsList = async () => {
    try {
      setLoading(true);
      const products = await fetchProducts();
      setProductList(products);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      name: productName,
      category,
      quantity,
      validity,
      price,
      supplier,
      composition,
      image,
    };
    try {
      setLoading(true);
      await createProduct(newProduct);
      fetchProductsList();
      setProductName("");
      setCategory("");
      setQuantity("");
      setValidity("");
      setPrice("");
      setSupplier("");
      setComposition("");
      setImage(null);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao cadastrar produto", error);
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      setLoading(true);
      await deleteProduct(productId);
      fetchProductsList();
      setLoading(false);
    } catch (error) {
      console.error("Erro ao excluir produto", error);
      setLoading(false);
    }
  };

  const handleEdit = async (productId, updatedProduct) => {
    try {
      setLoading(true);
      await updateProduct(productId, updatedProduct);
      fetchProductsList();
      setLoading(false);
    } catch (error) {
      console.error("Erro ao atualizar produto", error);
      setLoading(false);
    }
  };

  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppContainer>
      <Container>
        <Title>Cadastro e Consulta de Produtos</Title>

        <SectionTitle>Cadastro de Produto</SectionTitle>
        <form onSubmit={handleSubmit}>
          <Label>Nome do Produto:</Label>
          <AnamneseInput type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />

          <Label>Categoria:</Label>
          <AnamneseInput type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />

          <Label>Quantidade:</Label>
          <AnamneseInput type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />

          <Label>Validade:</Label>
          <AnamneseInput type="date" value={validity} onChange={(e) => setValidity(e.target.value)} required />

          <Label>Preço:</Label>
          <AnamneseInput type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />

          <Label>Fornecedor:</Label>
          <AnamneseInput type="text" value={supplier} onChange={(e) => setSupplier(e.target.value)} required />

          <Label>Composição:</Label>
          <AnamneseInput type="text" value={composition} onChange={(e) => setComposition(e.target.value)} />

          <Label>Imagem do Produto:</Label>
          <AnamneseInput type="file" onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} accept="image/*" />

          <ButtonGroup>
            <Button type="submit">Cadastrar Produto</Button>
          </ButtonGroup>
        </form>

        <SectionTitle>Buscar Produtos</SectionTitle>
        <AnamneseInput type="text" placeholder="Digite o nome do produto" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

        <SectionTitle>Consulta de Produtos</SectionTitle>
        <ProductList>
          {filteredProducts.map((product) => (
            <ProductCard key={product._id}>
              <ProductName>{product.name}</ProductName>
              <p><strong>Categoria:</strong> {product.category}</p>
              <p><strong>Quantidade:</strong> {product.quantity}</p>
              <p><strong>Validade:</strong> {product.validity}</p>
              <p><strong>Preço:</strong> R$ {product.price}</p>
              <p><strong>Fornecedor:</strong> {product.supplier}</p>
              <p><strong>Composição:</strong> {product.composition}</p>
              {product.image && <img src={product.image} alt={product.name} width="100" height="100" />}
              <ButtonGroup>
                <Button onClick={() => handleEdit(product._id, product)}>Editar</Button>
                <Button onClick={() => handleDelete(product._id)}>Excluir</Button>
              </ButtonGroup>
            </ProductCard>
          ))}
        </ProductList>

        <Loader />
      </Container>
    </AppContainer>
  );
}

export default ProductRoutes;
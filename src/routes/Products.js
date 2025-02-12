import React, { useState, useEffect } from "react";
import { useLoading } from "../components/LoadingProvider";
import {
  fetchProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../services/products";
import Container from "../components/Container";
import { Title, SectionTitle, ProductName } from "../components/Title";
import { Button, ButtonGroup } from "../components/Button";
import { Label } from "../components/Label";
import { AnamneseInput } from "../components/Input";
import { AppContainer, ProductList, ProductCard } from "../components/Div";
import Loader from "../components/Loader";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

function ProductRoutes() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    quantity: "",
    validity: "",
    price: "",
    supplier: "",
    composition: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [productList, setProductList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);

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

    if (
      !product.name ||
      !product.category ||
      !product.quantity ||
      !product.validity ||
      !product.price ||
      !product.supplier ||
      !product.composition
    ) {
      alert("Todos os campos devem ser preenchidos.");
      return;
    }

    if (product.quantity <= 0) {
      alert("A quantidade deve ser maior que 0.");
      return;
    }

    if (product.price <= 0) {
      alert("O preço deve ser maior que 0.");
      return;
    }

    if (product.validity && new Date(product.validity) < new Date()) {
      alert("A validade não pode ser no passado.");
      return;
    }

    if (!product.image) {
      alert("A imagem do produto é obrigatória.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();

      Object.keys(product).forEach((key) => {
        if (key === "image" && product.image) {
          formData.append(key, product.image);
        } else if (key !== "image") {
          formData.append(key, product[key]);
        }
      });

      if (editingProductId) {
        await updateProduct(editingProductId, formData);
      } else {
        await createProduct(formData);
      }

      resetForm();
      fetchProductsList();
      setLoading(false);
    } catch (error) {
      console.error("Erro ao salvar produto", error);
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    const { _id, __v, ...filteredProduct } = product;
    setEditingProductId(_id);
    setProduct(filteredProduct);
    setImagePreview(product.image);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteProduct(productToDelete);
      fetchProductsList();
      closeDeleteModal();
      setLoading(false);
    } catch (error) {
      console.error("Erro ao excluir produto", error);
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        alert("A imagem deve ser nos formatos JPG, JPEG ou PNG.");
        return;
      }
      if (file.size > 5000000) {
        alert("A imagem não pode ser maior que 5MB.");
        return;
      }
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setProduct({ ...product, image: file });
    }
  };

  const resetForm = () => {
    setProduct({
      name: "",
      category: "",
      quantity: "",
      validity: "",
      price: "",
      supplier: "",
      composition: "",
      image: null,
    });
    setImagePreview(null);
    setEditingProductId(null);
  };

  const openDeleteModal = (productId) => {
    setProductToDelete(productId);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  const filteredProducts = productList.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppContainer>
      <Container>
        <Title>Cadastro e Consulta de Produtos</Title>
        <SectionTitle>
          {editingProductId ? "Editar Produto" : "Cadastrar Produto"}
        </SectionTitle>
        <form onSubmit={handleSubmit}>
          {Object.keys(product).map(
            (key) =>
              key !== "image" && (
                <div key={key}>
                  <Label>
                    {key === "validity"
                      ? "Validade:"
                      : key === "name"
                      ? "Nome do Produto:"
                      : key === "category"
                      ? "Categoria:"
                      : key === "quantity"
                      ? "Quantidade:"
                      : key === "price"
                      ? "Preço:"
                      : key === "supplier"
                      ? "Fornecedor:"
                      : key === "composition"
                      ? "Composição:"
                      : key.charAt(0).toUpperCase() + key.slice(1) + ":"}
                  </Label>
                  <AnamneseInput
                    type={
                      key === "quantity" || key === "price"
                        ? "number"
                        : key === "validity"
                        ? "date"
                        : "text"
                    }
                    value={product[key]}
                    onChange={(e) =>
                      setProduct({ ...product, [key]: e.target.value })
                    }
                    required
                  />
                </div>
              )
          )}
          <Label>Imagem do Produto:</Label>
          <AnamneseInput
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" width="100" height="100" />
          )}
          <ButtonGroup>
            <Button type="submit">
              {editingProductId ? "Atualizar" : "Cadastrar"}
            </Button>
            {editingProductId && <Button onClick={resetForm}>Cancelar</Button>}
          </ButtonGroup>
        </form>
        <SectionTitle>Buscar Produtos</SectionTitle>
        <AnamneseInput
          type="text"
          placeholder="Digite o nome do produto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SectionTitle>Consulta de Produtos</SectionTitle>
        <ProductList>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <ProductCard key={p._id}>
                <ProductName>{p.name}</ProductName>
                <div>
                  {p.image && (
                    <img src={p.image} alt={p.name} width="100" height="100" />
                  )}
                </div>
                <p>
                  <strong>Categoria:</strong> {p.category}
                </p>
                <p>
                  <strong>Quantidade:</strong> {p.quantity}
                </p>
                <p>
                  <strong>Preço:</strong> R${p.price}
                </p>
                <p>
                  <strong>Fornecedor:</strong> {p.supplier}
                </p>
                <p>
                  <strong>Composição:</strong> {p.composition}
                </p>
                <p>
                  <strong>Validade:</strong> {p.validity}
                </p>
                <ButtonGroup>
                  <Button onClick={() => handleEdit(p)}>Editar</Button>
                  <Button onClick={() => openDeleteModal(p._id)}>
                    Excluir
                  </Button>
                </ButtonGroup>
              </ProductCard>
            ))
          ) : (
            <p>Nenhum produto encontrado.</p>
          )}
        </ProductList>
        <ConfirmDeleteModal
          isOpen={isModalOpen}
          onCancel={closeDeleteModal}
          onConfirm={handleDelete}
        />
        <Loader />
      </Container>
    </AppContainer>
  );
}

export default ProductRoutes;

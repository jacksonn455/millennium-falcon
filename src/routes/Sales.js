import React, { useState, useEffect } from "react";
import { useLoading } from "../components/LoadingProvider";
import {
  fetchSales,
  createSale,
  deleteSale,
  updateSale,
  getSalesSummary,
} from "../services/sales";
import { fetchProducts } from "../services/products";
import Container from "../components/Container";
import { Title, SectionTitle } from "../components/Title";
import { Button, ButtonGroup } from "../components/Button";
import { Label } from "../components/Label";
import { AnamneseInput } from "../components/Input";
import { AppContainer, ProductList, ProductCard } from "../components/Div";
import Loader from "../components/Loader";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

function Sales() {
  const [sale, setSale] = useState({
    items: [],
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    paymentMethod: "",
    notes: "",
  });
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [salesList, setSalesList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState(null);
  const [editingSaleId, setEditingSaleId] = useState(null);
  const [summary, setSummary] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    paymentMethod: "",
    startDate: "",
    endDate: "",
  });

  const { loading, setLoading } = useLoading();

  useEffect(() => {
    fetchSalesList();
    fetchProductsList();
    fetchSummary();
  }, []);

  const fetchSalesList = async () => {
    try {
      setLoading(true);
      const sales = await fetchSales(filters);
      setSalesList(sales);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar vendas", error);
      setLoading(false);
    }
  };

  const fetchProductsList = async () => {
    try {
      const productsData = await fetchProducts();
      setProducts(productsData);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
    }
  };

  const fetchSummary = async () => {
    try {
      const summaryData = await getSalesSummary();
      setSummary(summaryData);
    } catch (error) {
      console.error("Erro ao buscar resumo", error);
    }
  };

  const handleAddItem = () => {
    if (!selectedProduct || itemQuantity <= 0) {
      alert("Selecione um produto e uma quantidade válida.");
      return;
    }

    const product = products.find(p => p._id === selectedProduct);
    if (!product) {
      alert("Produto não encontrado.");
      return;
    }

    if (product.quantity < itemQuantity) {
      alert(`Estoque insuficiente. Disponível: ${product.quantity}`);
      return;
    }

    const newItem = {
      productId: selectedProduct,
      productName: product.name,
      quantity: parseInt(itemQuantity),
      unitPrice: product.price,
      totalPrice: product.price * parseInt(itemQuantity),
    };

    setSale({
      ...sale,
      items: [...sale.items, newItem],
    });

    setSelectedProduct("");
    setItemQuantity(1);
  };

  const handleRemoveItem = (index) => {
    const newItems = sale.items.filter((_, i) => i !== index);
    setSale({ ...sale, items: newItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (sale.items.length === 0) {
      alert("Adicione pelo menos um item à venda.");
      return;
    }

    if (!sale.paymentMethod) {
      alert("Selecione um método de pagamento.");
      return;
    }

    try {
      setLoading(true);
      const totalAmount = sale.items.reduce((sum, item) => sum + item.totalPrice, 0);
      const saleData = {
        ...sale,
        totalAmount,
        status: "concluida",
      };

      if (editingSaleId) {
        await updateSale(editingSaleId, saleData);
      } else {
        await createSale(saleData);
      }

      resetForm();
      fetchSalesList();
      fetchSummary();
      setLoading(false);
    } catch (error) {
      console.error("Erro ao salvar venda", error);
      alert(error.response?.data?.error || "Erro ao salvar venda");
      setLoading(false);
    }
  };

  const handleEdit = (saleData) => {
    const { _id, __v, createdAt, updatedAt, soldBy, ...filteredSale } = saleData;
    setEditingSaleId(_id);
    setSale(filteredSale);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteSale(saleToDelete);
      fetchSalesList();
      fetchSummary();
      closeDeleteModal();
      setLoading(false);
    } catch (error) {
      console.error("Erro ao excluir venda", error);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSale({
      items: [],
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      paymentMethod: "",
      notes: "",
    });
    setEditingSaleId(null);
  };

  const openDeleteModal = (saleId) => {
    setSaleToDelete(saleId);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSaleToDelete(null);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    fetchSalesList();
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      paymentMethod: "",
      startDate: "",
      endDate: "",
    });
    fetchSalesList();
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const filteredSales = salesList.filter((sale) =>
    sale.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppContainer>
      <Container>
        <Title>Gestão de Vendas</Title>

        {/* Resumo */}
        <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
          <h3>Resumo do Mês - {new Date().toLocaleDateString('pt-BR')}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
            <div>
              <strong>Vendas Hoje:</strong> {summary?.today?.sales || 0}
            </div>
            <div>
              <strong>Receita Hoje:</strong> {formatCurrency(summary?.today?.revenue || 0)}
            </div>
            <div>
              <strong>Vendas do Mês:</strong> {summary?.month?.sales || 0}
            </div>
            <div>
              <strong>Receita do Mês:</strong> {formatCurrency(summary?.month?.revenue || 0)}
            </div>
          </div>
        </div>

        <SectionTitle>
          {editingSaleId ? "Editar Venda" : "Nova Venda"}
        </SectionTitle>

        <form onSubmit={handleSubmit}>
          {/* Seleção de Produtos */}
          <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
            <h4>Adicionar Produtos</h4>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr auto", gap: "10px", alignItems: "end" }}>
              <div>
                <Label>Produto:</Label>
                <AnamneseInput
                  as="select"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value="">Selecione um produto</option>
                  {products
                    .filter(p => p.quantity > 0)
                    .map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.name} - R$ {product.price} (Estoque: {product.quantity})
                      </option>
                    ))}
                </AnamneseInput>
              </div>
              <div>
                <Label>Quantidade:</Label>
                <AnamneseInput
                  type="number"
                  min="1"
                  value={itemQuantity}
                  onChange={(e) => setItemQuantity(e.target.value)}
                />
              </div>
              <div>
                <Label>Preço Unit.:</Label>
                <AnamneseInput
                  type="text"
                  value={selectedProduct ? products.find(p => p._id === selectedProduct)?.price || "" : ""}
                  readOnly
                />
              </div>
              <Button type="button" onClick={handleAddItem}>
                Adicionar
              </Button>
            </div>
          </div>

          {/* Lista de Itens */}
          {sale.items.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h4>Itens da Venda</h4>
              <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px" }}>
                {sale.items.map((item, index) => (
                  <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: "1px solid #eee" }}>
                    <span>{item.productName}</span>
                    <span>{item.quantity} x {formatCurrency(item.unitPrice)} = {formatCurrency(item.totalPrice)}</span>
                    <Button type="button" onClick={() => handleRemoveItem(index)} style={{ backgroundColor: "#dc3545" }}>
                      Remover
                    </Button>
                  </div>
                ))}
                <div style={{ marginTop: "10px", paddingTop: "10px", borderTop: "2px solid #ddd", fontWeight: "bold" }}>
                  Total: {formatCurrency(sale.items.reduce((sum, item) => sum + item.totalPrice, 0))}
                </div>
              </div>
            </div>
          )}

          {/* Informações do Cliente */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px", marginBottom: "20px" }}>
            <div>
              <Label>Nome do Cliente:</Label>
              <AnamneseInput
                type="text"
                value={sale.customerName}
                onChange={(e) => setSale({ ...sale, customerName: e.target.value })}
              />
            </div>
            <div>
              <Label>Email do Cliente:</Label>
              <AnamneseInput
                type="email"
                value={sale.customerEmail}
                onChange={(e) => setSale({ ...sale, customerEmail: e.target.value })}
              />
            </div>
            <div>
              <Label>Telefone do Cliente:</Label>
              <AnamneseInput
                type="text"
                value={sale.customerPhone}
                onChange={(e) => setSale({ ...sale, customerPhone: e.target.value })}
              />
            </div>
            <div>
              <Label>Método de Pagamento:</Label>
              <AnamneseInput
                as="select"
                value={sale.paymentMethod}
                onChange={(e) => setSale({ ...sale, paymentMethod: e.target.value })}
                required
              >
                <option value="">Selecione</option>
                <option value="dinheiro">Dinheiro</option>
                <option value="cartao_credito">Cartão de Crédito</option>
                <option value="cartao_debito">Cartão de Débito</option>
                <option value="pix">PIX</option>
                <option value="transferencia">Transferência</option>
              </AnamneseInput>
            </div>
          </div>

          <div>
            <Label>Observações:</Label>
            <AnamneseInput
              as="textarea"
              rows="3"
              value={sale.notes}
              onChange={(e) => setSale({ ...sale, notes: e.target.value })}
            />
          </div>

          <ButtonGroup>
            <Button type="submit">
              {editingSaleId ? "Atualizar Venda" : "Criar Venda"}
            </Button>
            {editingSaleId && (
              <Button type="button" onClick={resetForm}>
                Cancelar Edição
              </Button>
            )}
          </ButtonGroup>
        </form>

        {/* Filtros */}
        <div style={{ marginTop: "30px", marginBottom: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
          <h4>Filtros</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginBottom: "15px" }}>
            <div>
              <Label>Status:</Label>
              <AnamneseInput
                as="select"
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="">Todos</option>
                <option value="concluida">Concluída</option>
                <option value="cancelada">Cancelada</option>
                <option value="pendente">Pendente</option>
              </AnamneseInput>
            </div>
            <div>
              <Label>Método de Pagamento:</Label>
              <AnamneseInput
                as="select"
                value={filters.paymentMethod}
                onChange={(e) => handleFilterChange("paymentMethod", e.target.value)}
              >
                <option value="">Todos</option>
                <option value="dinheiro">Dinheiro</option>
                <option value="cartao_credito">Cartão de Crédito</option>
                <option value="cartao_debito">Cartão de Débito</option>
                <option value="pix">PIX</option>
                <option value="transferencia">Transferência</option>
              </AnamneseInput>
            </div>
            <div>
              <Label>Data Inicial:</Label>
              <AnamneseInput
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange("startDate", e.target.value)}
              />
            </div>
            <div>
              <Label>Data Final:</Label>
              <AnamneseInput
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange("endDate", e.target.value)}
              />
            </div>
          </div>
          <ButtonGroup>
            <Button type="button" onClick={applyFilters}>
              Aplicar Filtros
            </Button>
            <Button type="button" onClick={clearFilters}>
              Limpar Filtros
            </Button>
          </ButtonGroup>
        </div>

        {/* Busca */}
        <div style={{ marginBottom: "20px" }}>
          <Label>Buscar por Cliente ou ID:</Label>
          <AnamneseInput
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Digite o nome do cliente ou ID da venda..."
          />
        </div>

        {/* Lista de Vendas */}
        <ProductList>
          {filteredSales.map((sale) => (
            <ProductCard key={sale._id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h4>Venda #{sale._id.slice(-6)}</h4>
                  <p><strong>Cliente:</strong> {sale.customerName || "Não informado"}</p>
                  <p><strong>Data:</strong> {formatDate(sale.createdAt)}</p>
                  <p><strong>Total:</strong> {formatCurrency(sale.totalAmount)}</p>
                  <p><strong>Status:</strong> 
                    <span style={{ 
                      color: sale.status === "concluida" ? "green" : 
                             sale.status === "cancelada" ? "red" : "orange",
                      fontWeight: "bold"
                    }}>
                      {sale.status}
                    </span>
                  </p>
                  <p><strong>Pagamento:</strong> {sale.paymentMethod}</p>
                  <p><strong>Itens:</strong> {sale.items.length}</p>
                </div>
                <div>
                  <ButtonGroup>
                    <Button onClick={() => handleEdit(sale)}>
                      Editar
                    </Button>
                    <Button onClick={() => openDeleteModal(sale._id)} style={{ backgroundColor: "#dc3545" }}>
                      Excluir
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </ProductCard>
          ))}
        </ProductList>

        <ConfirmDeleteModal
          isOpen={isModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDelete}
          title="Confirmar Exclusão"
          message="Tem certeza que deseja excluir esta venda? Esta ação não pode ser desfeita."
        />
      </Container>
    </AppContainer>
  );
}

export default Sales; 
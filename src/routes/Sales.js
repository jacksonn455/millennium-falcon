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
import { fetchServices } from "../services/services";
import Container from "../components/Container";
import { Title, SectionTitle } from "../components/Title";
import { Button, ButtonGroup } from "../components/Button";
import { Label } from "../components/Label";
import { AnamneseInput } from "../components/Input";
import Loader from "../components/Loader";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import styled from "styled-components";

// Componentes estilizados específicos para a página de vendas
const SalesContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
`;

const SalesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const FormSection = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const ListSection = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SummaryCard = styled.div`
  background: linear-gradient(135deg, #a8235e 0%, #c7628f 100%);
  color: white;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 15px;
`;

const SummaryItem = styled.div`
  text-align: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
`;

const SummaryValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const SummaryLabel = styled.div`
  font-size: 14px;
  opacity: 0.9;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  background: #fff;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #a8235e;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const ItemTypeToggle = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const ToggleButton = styled.button`
  flex: 1;
  padding: 12px;
  border: 2px solid #e1e5e9;
  background: ${props => props.active ? '#a8235e' : '#fff'};
  color: ${props => props.active ? '#fff' : '#333'};
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #a8235e;
    background: ${props => props.active ? '#a8235e' : '#f8f9fa'};
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  background: #fff;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #a8235e;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const ItemsList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  padding: 10px;
  background: #f8f9fa;
`;

const ItemCard = styled.div`
  background: #fff;
  border: 2px solid ${props => props.selected ? '#a8235e' : '#e1e5e9'};
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #a8235e;
    transform: translateY(-1px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ItemName = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`;

const ItemDetails = styled.div`
  font-size: 14px;
  color: #666;
`;

const SelectedItemsContainer = styled.div`
  margin-bottom: 20px;
`;

const SelectedItemCard = styled.div`
  background: ${props => props.itemType === 'product' ? '#e3f2fd' : '#e8f5e8'};
  border: 2px solid ${props => props.itemType === 'product' ? '#2196f3' : '#4caf50'};
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemTypeBadge = styled.span`
  background: ${props => props.itemType === 'product' ? '#2196f3' : '#4caf50'};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  margin-right: 10px;
`;

const ItemPrice = styled.div`
  font-weight: 600;
  color: #333;
  margin-top: 5px;
`;

const RemoveButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #c82333;
  }
`;

const TotalCard = styled.div`
  background: linear-gradient(135deg, #a8235e, #c7628f);
  color: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  margin-top: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TotalValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const TotalLabel = styled.div`
  font-size: 14px;
  opacity: 0.9;
`;

const FiltersContainer = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const FiltersRow = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const SalesList = styled.div`
  max-height: 600px;
  overflow-y: auto;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #a8235e;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #8b1e4d;
  }
`;

const SaleCard = styled.div`
  background: #fff;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border-color: #a8235e;
  }

  @media (max-width: 768px) {
    padding: 15px;
    margin-bottom: 10px;
  }
`;

const SaleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const SaleInfo = styled.div`
  flex: 1;
`;

const SaleTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const CustomerName = styled.h3`
  margin: 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
`;

const SaleDate = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
`;

const StatusBadge = styled.span`
  background: ${props => {
    switch (props.status) {
      case 'concluida': return '#28a745';
      case 'cancelada': return '#dc3545';
      case 'pendente': return '#ffc107';
      default: return '#6c757d';
    }
  }};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`;

const SaleItems = styled.div`
  margin-bottom: 15px;
`;

const SaleItem = styled.div`
  background: ${props => props.itemType === 'product' ? '#e3f2fd' : '#e8f5e8'};
  border: 1px solid ${props => props.itemType === 'product' ? '#2196f3' : '#4caf50'};
  border-radius: 6px;
  padding: 8px 12px;
  margin-bottom: 5px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ItemTypeIndicator = styled.span`
  background: ${props => props.itemType === 'product' ? '#2196f3' : '#4caf50'};
  color: white;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
`;

const SaleDetails = styled.div`
  color: #666;
  font-size: 14px;
  line-height: 1.5;
`;

const SaleActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 80px;
`;

const ActionButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;

  &.edit {
    background: #007bff;
    &:hover {
      background: #0056b3;
    }
  }

  &.delete {
    background: #dc3545;
    &:hover {
      background: #c82333;
    }
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 11px;
  }
`;

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
  const [services, setServices] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemType, setSelectedItemType] = useState("product");
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
    fetchServicesList();
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

  const fetchServicesList = async () => {
    try {
      const servicesData = await fetchServices();
      setServices(servicesData);
    } catch (error) {
      console.error("Erro ao buscar serviços", error);
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
    if (!selectedItem || itemQuantity <= 0) {
      alert("Selecione um item e uma quantidade válida.");
      return;
    }

    let item;
    if (selectedItemType === "product") {
      item = products.find(p => p._id === selectedItem);
      if (!item) {
        alert("Produto não encontrado.");
        return;
      }
      if (item.quantity < itemQuantity) {
        alert(`Estoque insuficiente. Disponível: ${item.quantity}`);
        return;
      }
    } else {
      item = services.find(s => s._id === selectedItem);
      if (!item) {
        alert("Serviço não encontrado.");
        return;
      }
    }

    const newItem = {
      itemId: item._id,
      itemType: selectedItemType,
      itemName: item.name,
      quantity: itemQuantity,
      unitPrice: item.price,
      totalPrice: itemQuantity * item.price,
      category: item.category || null,
      duration: item.duration || null,
    };

    setSale(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));

    setSelectedItem("");
    setItemQuantity(1);
  };

  const handleRemoveItem = (index) => {
    setSale(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
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
        soldBy: localStorage.getItem("userId") || "64f7b8c9e4b0c8c8c8c8c8c8" // ID do usuário logado
      };

      if (editingSaleId) {
        await updateSale(editingSaleId, saleData);
      } else {
        await createSale(saleData);
      }

      resetForm();
      fetchSalesList();
      fetchProductsList(); // Atualiza a lista de produtos para refletir o novo estoque
      fetchSummary();
      alert(editingSaleId ? "Venda atualizada com sucesso!" : "Venda criada com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar venda", error);
      alert(`Erro ao salvar venda: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (saleData) => {
    setSale({
      items: saleData.items || [],
      customerName: saleData.customerName || "",
      customerEmail: saleData.customerEmail || "",
      customerPhone: saleData.customerPhone || "",
      paymentMethod: saleData.paymentMethod || "",
      notes: saleData.notes || "",
    });
    setEditingSaleId(saleData._id);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteSale(saleToDelete);
      await fetchSalesList();
      await fetchProductsList(); // Atualiza produtos após exclusão (restaura estoque)
      await fetchSummary();
      closeDeleteModal();
      alert("Venda excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir venda", error);
      alert(`Erro ao excluir venda: ${error.response?.data?.error || error.message}`);
    } finally {
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
    setSelectedItem("");
    setSelectedItemType("product");
    setItemQuantity(1);
    setEditingSaleId(null);
  };

  const openDeleteModal = (saleId) => {
    setSaleToDelete(saleId);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSaleToDelete(null);
    setIsModalOpen(false);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    fetchSalesList();
    fetchProductsList(); // Atualiza produtos quando filtros são aplicados
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      paymentMethod: "",
      startDate: "",
      endDate: "",
    });
    fetchProductsList(); // Atualiza produtos quando filtros são limpos
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

  const getAvailableItems = () => {
    if (selectedItemType === "product") {
      return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.quantity > 0
      );
    } else {
      return services.filter(service => 
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        service.isActive
      );
    }
  };

  const getItemTypeLabel = (type) => {
    return type === "product" ? "Produto" : "Serviço";
  };

  if (loading) return <Loader />;

  return (
    <Container>
      <Title>Vendas</Title>

      {/* Resumo */}
      {summary && (
        <SummaryCard>
          <SectionTitle style={{ color: 'white', marginBottom: '10px' }}>Resumo de Vendas</SectionTitle>
          <SummaryGrid>
            <SummaryItem>
              <SummaryValue>{summary.today?.sales || 0}</SummaryValue>
              <SummaryLabel>Vendas Hoje</SummaryLabel>
            </SummaryItem>
            <SummaryItem>
              <SummaryValue>{formatCurrency(summary.today?.revenue || 0)}</SummaryValue>
              <SummaryLabel>Receita Hoje</SummaryLabel>
            </SummaryItem>
            <SummaryItem>
              <SummaryValue>{summary.month?.sales || 0}</SummaryValue>
              <SummaryLabel>Vendas do Mês</SummaryLabel>
            </SummaryItem>
            <SummaryItem>
              <SummaryValue>{formatCurrency(summary.month?.revenue || 0)}</SummaryValue>
              <SummaryLabel>Receita do Mês</SummaryLabel>
            </SummaryItem>
          </SummaryGrid>
        </SummaryCard>
      )}

      <SalesContainer>
        <SalesGrid>
          {/* Formulário de Venda */}
          <FormSection>
            <SectionTitle>{editingSaleId ? "Editar Venda" : "Nova Venda"}</SectionTitle>
            
            <form onSubmit={handleSubmit}>
              {/* Seleção de Tipo de Item */}
              <FormGroup>
                <Label>Tipo de Item</Label>
                <ItemTypeToggle>
                  <ToggleButton
                    type="button"
                    active={selectedItemType === "product"}
                    onClick={() => {
                      setSelectedItemType("product");
                      setSelectedItem("");
                    }}
                  >
                    📦 Produtos
                  </ToggleButton>
                  <ToggleButton
                    type="button"
                    active={selectedItemType === "service"}
                    onClick={() => {
                      setSelectedItemType("service");
                      setSelectedItem("");
                    }}
                  >
                    🏥 Serviços
                  </ToggleButton>
                </ItemTypeToggle>
              </FormGroup>

              {/* Busca de Itens */}
              <FormGroup>
                <Label>Buscar {selectedItemType === "product" ? "Produto" : "Serviço"}</Label>
                <SearchContainer>
                  <SearchInput
                    type="text"
                    placeholder={`Buscar ${selectedItemType === "product" ? "produto" : "serviço"}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </SearchContainer>

                <ItemsList>
                  {getAvailableItems().map(item => (
                    <ItemCard
                      key={item._id}
                      selected={selectedItem === item._id}
                      onClick={() => setSelectedItem(item._id)}
                    >
                      <ItemName>{item.name}</ItemName>
                      <ItemDetails>
                        {selectedItemType === "product" ? (
                          <>
                            Estoque: {item.quantity} | Preço: {formatCurrency(item.price)}
                          </>
                        ) : (
                          <>
                            {item.category} | {item.duration} | Preço: {formatCurrency(item.price)}
                          </>
                        )}
                      </ItemDetails>
                    </ItemCard>
                  ))}
                </ItemsList>
              </FormGroup>

              {/* Quantidade */}
              <FormGroup>
                <Label>Quantidade</Label>
                <AnamneseInput
                  type="number"
                  min="1"
                  value={itemQuantity}
                  onChange={(e) => setItemQuantity(parseInt(e.target.value) || 1)}
                  style={{ width: "120px" }}
                />
              </FormGroup>

              <Button type="button" onClick={handleAddItem} style={{ marginBottom: "20px" }}>
                ➕ Adicionar Item
              </Button>

              {/* Itens Selecionados */}
              {sale.items.length > 0 && (
                <SelectedItemsContainer>
                  <Label>Itens da Venda</Label>
                  {sale.items.map((item, index) => (
                    <SelectedItemCard key={index} itemType={item.itemType}>
                      <ItemInfo>
                        <ItemTypeBadge itemType={item.itemType}>
                          {getItemTypeLabel(item.itemType)}
                        </ItemTypeBadge>
                        <strong>{item.itemName}</strong>
                        <ItemPrice>
                          Qtd: {item.quantity} x {formatCurrency(item.unitPrice)} = {formatCurrency(item.totalPrice)}
                        </ItemPrice>
                      </ItemInfo>
                      <RemoveButton onClick={() => handleRemoveItem(index)}>
                        ❌ Remover
                      </RemoveButton>
                    </SelectedItemCard>
                  ))}
                  
                  <TotalCard>
                    <TotalValue>
                      {formatCurrency(sale.items.reduce((sum, item) => sum + item.totalPrice, 0))}
                    </TotalValue>
                    <TotalLabel>Total da Venda</TotalLabel>
                  </TotalCard>
                </SelectedItemsContainer>
              )}

              {/* Dados do Cliente */}
              <FormGroup>
                <Label>Nome do Cliente</Label>
                <AnamneseInput
                  type="text"
                  value={sale.customerName}
                  onChange={(e) => setSale(prev => ({ ...prev, customerName: e.target.value }))}
                />
              </FormGroup>

              <FormGroup>
                <Label>Email do Cliente</Label>
                <AnamneseInput
                  type="email"
                  value={sale.customerEmail}
                  onChange={(e) => setSale(prev => ({ ...prev, customerEmail: e.target.value }))}
                />
              </FormGroup>

              <FormGroup>
                <Label>Telefone do Cliente</Label>
                <AnamneseInput
                  type="text"
                  value={sale.customerPhone}
                  onChange={(e) => setSale(prev => ({ ...prev, customerPhone: e.target.value }))}
                />
              </FormGroup>

              <FormGroup>
                <Label>Método de Pagamento</Label>
                <StyledSelect 
                  value={sale.paymentMethod} 
                  onChange={(e) => setSale(prev => ({ ...prev, paymentMethod: e.target.value }))}
                >
                  <option value="">Selecione...</option>
                  <option value="dinheiro">Dinheiro</option>
                  <option value="cartao_credito">Cartão de Crédito</option>
                  <option value="cartao_debito">Cartão de Débito</option>
                  <option value="pix">PIX</option>
                  <option value="transferencia">Transferência</option>
                </StyledSelect>
              </FormGroup>

              <FormGroup>
                <Label>Observações</Label>
                <textarea
                  value={sale.notes}
                  onChange={(e) => setSale(prev => ({ ...prev, notes: e.target.value }))}
                  style={{ 
                    width: "100%", 
                    padding: "12px", 
                    minHeight: "80px",
                    border: "2px solid #e1e5e9",
                    borderRadius: "8px",
                    fontSize: "16px",
                    resize: "vertical"
                  }}
                  placeholder="Observações sobre a venda..."
                />
              </FormGroup>

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
          </FormSection>

          {/* Lista de Vendas */}
          <ListSection>
            <SectionTitle>Vendas Realizadas</SectionTitle>
            
            {/* Filtros */}
            <FiltersContainer>
              <Label>Filtros</Label>
              <FiltersRow>
                <StyledSelect 
                  value={filters.status} 
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="">Todos os Status</option>
                  <option value="concluida">Concluída</option>
                  <option value="cancelada">Cancelada</option>
                  <option value="pendente">Pendente</option>
                </StyledSelect>

                <StyledSelect 
                  value={filters.paymentMethod} 
                  onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
                >
                  <option value="">Todos os Pagamentos</option>
                  <option value="dinheiro">Dinheiro</option>
                  <option value="cartao_credito">Cartão de Crédito</option>
                  <option value="cartao_debito">Cartão de Débito</option>
                  <option value="pix">PIX</option>
                  <option value="transferencia">Transferência</option>
                </StyledSelect>

                <input 
                  type="date" 
                  value={filters.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  style={{ padding: "10px", border: "2px solid #e1e5e9", borderRadius: "8px" }}
                />

                <input 
                  type="date" 
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  style={{ padding: "10px", border: "2px solid #e1e5e9", borderRadius: "8px" }}
                />

                <Button onClick={applyFilters}>Aplicar Filtros</Button>
                <Button onClick={clearFilters}>Limpar Filtros</Button>
              </FiltersRow>
            </FiltersContainer>

            {/* Lista */}
            <SalesList>
              {salesList.map(sale => (
                <SaleCard key={sale._id}>
                  <SaleHeader>
                    <SaleInfo>
                      <SaleTitle>
                        <CustomerName>{sale.customerName || "Cliente não informado"}</CustomerName>
                        <StatusBadge status={sale.status}>
                          {sale.status}
                        </StatusBadge>
                      </SaleTitle>

                      <SaleDate>
                        <strong>Data:</strong> {formatDate(sale.createdAt)}
                      </SaleDate>

                      <SaleItems>
                        <strong>Itens:</strong>
                        {sale.items.map((item, index) => (
                          <SaleItem key={index} itemType={item.itemType}>
                            <ItemTypeIndicator itemType={item.itemType}>
                              {getItemTypeLabel(item.itemType)}
                            </ItemTypeIndicator>
                            {item.itemName} - Qtd: {item.quantity} x {formatCurrency(item.unitPrice)}
                          </SaleItem>
                        ))}
                      </SaleItems>

                      <SaleDetails>
                        <div><strong>Total:</strong> {formatCurrency(sale.totalAmount)}</div>
                        <div><strong>Pagamento:</strong> {sale.paymentMethod}</div>
                        {sale.notes && (
                          <div><strong>Observações:</strong> {sale.notes}</div>
                        )}
                      </SaleDetails>
                    </SaleInfo>

                    <SaleActions>
                      <ActionButton 
                        className="edit"
                        onClick={() => handleEdit(sale)}
                      >
                        ✏️ Editar
                      </ActionButton>
                      <ActionButton 
                        className="delete"
                        onClick={() => openDeleteModal(sale._id)}
                      >
                        🗑️ Excluir
                      </ActionButton>
                    </SaleActions>
                  </SaleHeader>
                </SaleCard>
              ))}
            </SalesList>
          </ListSection>
        </SalesGrid>
      </SalesContainer>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir esta venda?"
      />
    </Container>
  );
}

export default Sales; 
import React, { useState, useEffect } from "react";
import { useLoading } from "../components/LoadingProvider";
import {
  fetchServices,
  createService,
  deleteService,
  updateService,
  getServicesByCategory,
  initializeServices,
} from "../services/services";
import Container from "../components/Container";
import { Title, SectionTitle } from "../components/Title";
import { Button, ButtonGroup } from "../components/Button";
import { Label } from "../components/Label";
import { AnamneseInput } from "../components/Input";
import Loader from "../components/Loader";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import styled from "styled-components";

// Componentes estilizados específicos para a página de serviços
const ServicesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 20px;

  @media (max-width: 1024px) {
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

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  background: #fff;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #a8235e;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
    min-height: 80px;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const StyledCheckbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #a8235e;
`;

const CheckboxLabel = styled.label`
  font-weight: 500;
  color: #333;
  cursor: pointer;
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

const SearchInput = styled.input`
  flex: 1;
  padding: 10px 15px;
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
    width: 100%;
    padding: 8px 12px;
    font-size: 14px;
  }
`;

const ServicesList = styled.div`
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

const ServiceCard = styled.div`
  background: #fff;
  border: 2px solid ${props => props.isActive ? '#e1e5e9' : '#ffcdd2'};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  opacity: ${props => props.isActive ? 1 : 0.7};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.isActive ? '#a8235e' : '#ffcdd2'};
  }

  @media (max-width: 768px) {
    padding: 15px;
    margin-bottom: 10px;
  }
`;

const ServiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const ServiceInfo = styled.div`
  flex: 1;
`;

const ServiceTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const CategoryBadge = styled.span`
  background: ${props => props.color};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`;

const ServiceName = styled.h3`
  margin: 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
`;

const StatusBadge = styled.span`
  background: #dc3545;
  color: white;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
`;

const ServiceDetails = styled.div`
  color: #666;
  font-size: 14px;
  line-height: 1.5;
`;

const ServiceActions = styled.div`
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

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #dee2e6;
`;

const InitializeButton = styled.button`
  background: linear-gradient(45deg, #17a2b8, #20c997);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  width: 100%;

  &:hover {
    background: linear-gradient(45deg, #138496, #1ea085);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 14px;
  }
`;

function Services() {
  const [services, setServices] = useState([]);
  const [service, setService] = useState({
    name: "",
    category: "",
    duration: "",
    price: "",
    description: "",
    isActive: true,
  });
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { loading, setLoading } = useLoading();

  useEffect(() => {
    fetchServicesList();
  }, []);

  const fetchServicesList = async () => {
    try {
      setLoading(true);
      const servicesData = await fetchServices();
      setServices(servicesData);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar serviços", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!service.name || !service.category || !service.duration || !service.price) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setLoading(true);
      
      if (editingServiceId) {
        await updateService(editingServiceId, service);
        alert("Serviço atualizado com sucesso!");
      } else {
        await createService(service);
        alert("Serviço criado com sucesso!");
      }

      resetForm();
      fetchServicesList();
    } catch (error) {
      console.error("Erro ao salvar serviço", error);
      alert(`Erro ao salvar serviço: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (serviceData) => {
    setService({
      name: serviceData.name || "",
      category: serviceData.category || "",
      duration: serviceData.duration || "",
      price: serviceData.price || "",
      description: serviceData.description || "",
      isActive: serviceData.isActive !== undefined ? serviceData.isActive : true,
    });
    setEditingServiceId(serviceData._id);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteService(serviceToDelete);
      fetchServicesList();
      closeDeleteModal();
      alert("Serviço excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir serviço", error);
      alert(`Erro ao excluir serviço: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setService({
      name: "",
      category: "",
      duration: "",
      price: "",
      description: "",
      isActive: true,
    });
    setEditingServiceId(null);
  };

  const openDeleteModal = (serviceId) => {
    setServiceToDelete(serviceId);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setServiceToDelete(null);
    setIsModalOpen(false);
  };

  const handleInitializeServices = async () => {
    try {
      setLoading(true);
      await initializeServices();
      fetchServicesList();
      alert("Serviços inicializados com sucesso!");
    } catch (initError) {
      console.error("Erro ao inicializar serviços", initError);
      alert(`Erro ao inicializar serviços: ${initError.response?.data?.error || initError.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getCategoryLabel = (category) => {
    const labels = {
      facial: "Facial",
      corporal: "Corporal",
      pos_operatorio: "Pós-operatório"
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category) => {
    const colors = {
      facial: "#007bff",
      corporal: "#28a745",
      pos_operatorio: "#ffc107"
    };
    return colors[category] || "#6c757d";
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <Loader />;

  return (
    <Container>
      <Title>Gerenciar Serviços</Title>

      <ServicesContainer>
        <ServicesGrid>
          {/* Formulário de Serviço */}
          <FormSection>
            <SectionTitle>{editingServiceId ? "Editar Serviço" : "Novo Serviço"}</SectionTitle>
            
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Nome do Serviço</Label>
                <AnamneseInput
                  type="text"
                  value={service.name}
                  onChange={(e) => setService(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Limpeza de pele"
                />
              </FormGroup>

              <FormGroup>
                <Label>Categoria</Label>
                <StyledSelect 
                  value={service.category} 
                  onChange={(e) => setService(prev => ({ ...prev, category: e.target.value }))}
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="facial">Facial</option>
                  <option value="corporal">Corporal</option>
                  <option value="pos_operatorio">Pós-operatório</option>
                </StyledSelect>
              </FormGroup>

              <FormGroup>
                <Label>Duração</Label>
                <AnamneseInput
                  type="text"
                  value={service.duration}
                  onChange={(e) => setService(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="Ex: 1h 30min"
                />
              </FormGroup>

              <FormGroup>
                <Label>Preço (R$)</Label>
                <AnamneseInput
                  type="number"
                  step="0.01"
                  min="0"
                  value={service.price}
                  onChange={(e) => setService(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  placeholder="0.00"
                />
              </FormGroup>

              <FormGroup>
                <Label>Descrição (opcional)</Label>
                <StyledTextarea
                  value={service.description}
                  onChange={(e) => setService(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição detalhada do serviço..."
                />
              </FormGroup>

              <CheckboxContainer>
                <StyledCheckbox
                  type="checkbox"
                  checked={service.isActive}
                  onChange={(e) => setService(prev => ({ ...prev, isActive: e.target.checked }))}
                />
                <CheckboxLabel>Serviço Ativo</CheckboxLabel>
              </CheckboxContainer>

              <ButtonGroup>
                <Button type="submit">
                  {editingServiceId ? "Atualizar Serviço" : "Criar Serviço"}
                </Button>
                {editingServiceId && (
                  <Button type="button" onClick={resetForm}>
                    Cancelar Edição
                  </Button>
                )}
              </ButtonGroup>
            </form>

            <InitializeButton onClick={handleInitializeServices}>
              🔧 Inicializar Serviços Padrão
            </InitializeButton>
          </FormSection>

          {/* Lista de Serviços */}
          <ListSection>
            <SectionTitle>Serviços Cadastrados</SectionTitle>
            
            {/* Filtros */}
            <FiltersContainer>
              <Label>Filtros</Label>
              <FiltersRow>
                <SearchInput 
                  type="text" 
                  placeholder="Buscar serviço..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <StyledSelect 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Todas as Categorias</option>
                  <option value="facial">Facial</option>
                  <option value="corporal">Corporal</option>
                  <option value="pos_operatorio">Pós-operatório</option>
                </StyledSelect>
              </FiltersRow>
            </FiltersContainer>

            {/* Lista */}
            <ServicesList>
              {filteredServices.map(service => (
                <ServiceCard key={service._id} isActive={service.isActive}>
                  <ServiceHeader>
                    <ServiceInfo>
                      <ServiceTitle>
                        <CategoryBadge color={getCategoryColor(service.category)}>
                          {getCategoryLabel(service.category)}
                        </CategoryBadge>
                        <ServiceName>{service.name}</ServiceName>
                        {!service.isActive && (
                          <StatusBadge>Inativo</StatusBadge>
                        )}
                      </ServiceTitle>

                      <ServiceDetails>
                        <div><strong>Duração:</strong> {service.duration}</div>
                        <div><strong>Preço:</strong> {formatCurrency(service.price)}</div>
                        {service.description && (
                          <div><strong>Descrição:</strong> {service.description}</div>
                        )}
                      </ServiceDetails>
                    </ServiceInfo>

                    <ServiceActions>
                      <ActionButton 
                        className="edit"
                        onClick={() => handleEdit(service)}
                      >
                        Editar
                      </ActionButton>
                      <ActionButton 
                        className="delete"
                        onClick={() => openDeleteModal(service._id)}
                      >
                        Excluir
                      </ActionButton>
                    </ServiceActions>
                  </ServiceHeader>
                </ServiceCard>
              ))}
            </ServicesList>

            {filteredServices.length === 0 && (
              <EmptyState>
                <h3>Nenhum serviço encontrado</h3>
                <p>Use os filtros acima ou crie um novo serviço</p>
              </EmptyState>
            )}
          </ListSection>
        </ServicesGrid>
      </ServicesContainer>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir este serviço?"
      />
    </Container>
  );
}

export default Services; 
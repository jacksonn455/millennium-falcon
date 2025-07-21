import api from "./api";

export const fetchServices = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.category) params.append('category', filters.category);
    if (filters.isActive !== undefined) params.append('isActive', filters.isActive);

    const response = await api.get(`/vendas/services?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createService = async (serviceData) => {
  try {
    const response = await api.post("/vendas/services", serviceData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getServiceById = async (id) => {
  try {
    const response = await api.get(`/vendas/services/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateService = async (id, serviceData) => {
  try {
    const response = await api.put(`/vendas/services/${id}`, serviceData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteService = async (id) => {
  try {
    await api.delete(`/vendas/services/${id}`);
  } catch (error) {
    throw error;
  }
};

export const getServicesByCategory = async (category) => {
  try {
    const response = await api.get(`/vendas/services/category/${category}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const initializeServices = async () => {
  try {
    const response = await api.post("/vendas/services/initialize");
    return response.data;
  } catch (error) {
    throw error;
  }
}; 
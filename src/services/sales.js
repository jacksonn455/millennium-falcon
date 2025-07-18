import api from "./api";

export const fetchSales = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status', filters.status);
    if (filters.paymentMethod) params.append('paymentMethod', filters.paymentMethod);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.soldBy) params.append('soldBy', filters.soldBy);

    const response = await api.get(`/vendas?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createSale = async (saleData) => {
  try {
    const response = await api.post("/vendas", saleData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSaleById = async (id) => {
  try {
    const response = await api.get(`/vendas/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSale = async (id, saleData) => {
  try {
    const response = await api.put(`/vendas/${id}`, saleData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSale = async (id) => {
  try {
    await api.delete(`/vendas/${id}`);
  } catch (error) {
    throw error;
  }
};

export const getMonthlyReport = async (year, month) => {
  try {
    const response = await api.get(`/vendas/report?year=${year}&month=${month}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSalesSummary = async () => {
  try {
    const response = await api.get("/vendas/summary");
    return response.data;
  } catch (error) {
    throw error;
  }
}; 
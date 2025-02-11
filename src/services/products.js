import api from "../services/api";

export const fetchProducts = async () => {
  try {
    const response = await api.get("/produtos");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (product) => {
  try {
    const response = await api.post("/produtos", product);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, product) => {
  try {
    const response = await api.put(`/produtos/${id}`, product);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await api.delete(`/produtos/${id}`);
  } catch (error) {
    throw error;
  }
};
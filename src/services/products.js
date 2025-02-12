import api from "../services/api";

export const fetchProducts = async () => {
  try {
    const response = await api.get("/produtos");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (productData) => {
  const response = await api.post("/produtos", productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/produtos/${id}`, productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  try {
    await api.delete(`/produtos/${id}`);
  } catch (error) {
    throw error;
  }
};
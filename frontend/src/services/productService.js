import api from "./api";

// Get Products (Search + Filter + Sort + Pagination)
export const getProducts = async (params = {}) => {
  const { data } = await api.get("/products", {
    params,
  });

  return data;
};

// Get Single Product
export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data.product;
};

// Create Product
export const createProduct = async (productData) => {
  const { data } = await api.post(
    "/products",
    productData
  );

  return data;
};

// Update Product
export const updateProduct = async (
  id,
  productData
) => {
  const { data } = await api.put(
    `/products/${id}`,
    productData
  );

  return data;
};

// Delete Product
export const deleteProduct = async (id) => {
  const { data } = await api.delete(
    `/products/${id}`
  );

  return data;
};
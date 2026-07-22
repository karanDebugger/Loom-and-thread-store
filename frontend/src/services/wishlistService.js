import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/wishlist",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getWishlist = async () => {
  const { data } = await API.get("/");
  return data;
};

export const addToWishlist = async (productId) => {
  const { data } = await API.post("/", {
    productId,
  });

  return data;
};

export const removeFromWishlist = async (productId) => {
  const { data } = await API.delete(`/${productId}`);
  return data;
}; 
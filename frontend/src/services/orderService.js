import api from "./api";

// ===============================
// Create Order
// ===============================
export const createOrder = async (orderData) => {
  const { data } = await api.post("/orders", orderData);
  return data;
};

// ===============================
// Get Logged-in User Orders
// ===============================
export const getMyOrders = async () => {
  const { data } = await api.get("/orders/my-orders");
  return data;
};

// ===============================
// Get Single Order
// ===============================
export const getOrderById = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};

// ===============================
// Cancel Order
// ===============================
export const cancelOrder = async (id) => {
  const { data } = await api.put(`/orders/${id}/cancel`);
  return data;
};

// ===============================
// Admin - Get All Orders
// ===============================
export const getAllOrders = async () => {
  const { data } = await api.get("/orders");
  return data;
};

// ===============================
// Admin - Update Order Status
// ===============================
export const updateOrderStatus = async (
  id,
  orderStatus
) => {
  const { data } = await api.put(`/orders/${id}`, {
    orderStatus,
  });

  return data;
};

// ===============================
// Admin - Delete Order
// ===============================
export const deleteOrder = async (id) => {
  const { data } = await api.delete(`/orders/${id}`);
  return data;
};
import { useState } from "react";
import {
  updateOrderStatus,
  deleteOrder,
} from "../../services/orderService";

function AdminOrderRow({ order, onStatusUpdated }) {
  const [status, setStatus] = useState(order.orderStatus);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const statuses = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await updateOrderStatus(order._id, status);

      alert("Order updated successfully.");

      onStatusUpdated();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to update order."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Delete this order permanently?"
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);

      await deleteOrder(order._id);

      alert("Order deleted successfully.");

      onStatusUpdated();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete order."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <tr className="border-b border-zinc-800 hover:bg-zinc-900">

      <td className="p-4">
        {order._id.slice(-8)}
      </td>

      <td className="p-4">
        {order.user?.name}
      </td>

      <td className="p-4">
        {order.user?.email}
      </td>

      <td className="p-4">
        ₹{order.totalPrice}
      </td>

      <td className="p-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-zinc-900 border border-zinc-700 rounded px-3 py-2"
        >
          {statuses.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>
      </td>

      <td className="p-4">
        {new Date(order.createdAt).toLocaleDateString()}
      </td>

      <td className="p-4">
        <div className="flex gap-2">

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 rounded-lg"
          >
            {loading ? "Updating..." : "Update"}
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-4 py-2 rounded-lg"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>

        </div>
      </td>

    </tr>
  );
}

export default AdminOrderRow;
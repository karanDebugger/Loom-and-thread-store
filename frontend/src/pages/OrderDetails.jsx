import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getOrderById,
  cancelOrder,
} from "../services/orderService";

import OrderTimeline from "../components/orders/OrderTimeline";
import OrderItem from "../components/orders/OrderItem";
import ShippingCard from "../components/orders/ShippingCard";
import PaymentCard from "../components/orders/PaymentCard";
import OrderSummaryCard from "../components/orders/OrderSummaryCard";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  const fetchOrder = async () => {
    try {
      setLoading(true);

      const data = await getOrderById(id);

      setOrder(data.order);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleCancelOrder = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    try {
      setCancelling(true);

      await cancelOrder(order._id);

      await fetchOrder();

      alert("Order cancelled successfully.");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to cancel order."
      );
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold">
          Loading...
        </h1>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">
          Order Not Found
        </h1>

        <p className="text-zinc-400">
          The requested order could not be found.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-10">

        <div>
          <h1 className="text-4xl font-bold">
            Order Details
          </h1>

          <p className="text-zinc-500 mt-2 break-all">
            #{order._id}
          </p>
        </div>

        <div className="flex items-center gap-4">

          <span
            className={`px-5 py-2 rounded-full font-semibold ${
              order.orderStatus === "Delivered"
                ? "bg-green-600"
                : order.orderStatus === "Shipped"
                ? "bg-purple-600"
                : order.orderStatus === "Processing"
                ? "bg-blue-600"
                : order.orderStatus === "Cancelled"
                ? "bg-red-600"
                : "bg-yellow-600"
            }`}
          >
            {order.orderStatus}
          </span>

          {(order.orderStatus === "Pending" ||
            order.orderStatus === "Processing") && (
            <button
              onClick={handleCancelOrder}
              disabled={cancelling}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-5 py-2 rounded-lg font-semibold transition"
            >
              {cancelling
                ? "Cancelling..."
                : "Cancel Order"}
            </button>
          )}

        </div>

      </div>

      <OrderTimeline status={order.orderStatus} />

      <div className="h-8" />

      <div className="grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-8">

          <ShippingCard address={order.shippingAddress} />

          <PaymentCard order={order} />

          <div>

            <h2 className="text-2xl font-bold mb-6">
              Ordered Items
            </h2>

            <div className="space-y-4">

              {order.orderItems.map((item) => (
                <OrderItem
                  key={item.product}
                  item={item}
                />
              ))}

            </div>

          </div>

        </div>

        <div>

          <OrderSummaryCard
            order={order}
          />

        </div>

      </div>

    </div>
  );
}

export default OrderDetails;
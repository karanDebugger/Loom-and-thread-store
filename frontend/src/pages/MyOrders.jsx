import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import OrderCard from "../components/orders/OrderCard";
import { getMyOrders } from "../services/orderService";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();

        setOrders(data.orders || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-10">
          My Orders
        </h1>

        <p className="text-zinc-400">
          Loading orders...
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold mb-6">
          My Orders
        </h1>

        <p className="text-zinc-400 mb-8">
          You haven't placed any orders yet.
        </p>

        <Link
          to="/shop"
          className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-zinc-200 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">
        My Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
          />
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
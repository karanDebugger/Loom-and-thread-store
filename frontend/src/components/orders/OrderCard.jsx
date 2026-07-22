import { Link } from "react-router-dom";

function OrderCard({ order }) {
  const badgeColors = {
    Pending: "bg-yellow-600",
    Processing: "bg-blue-600",
    Shipped: "bg-purple-600",
    Delivered: "bg-green-600",
    Cancelled: "bg-red-600",
  };

  return (
    <div className="bg-[#111] rounded-2xl p-6 border border-zinc-800 hover:border-zinc-700 transition">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <p className="text-sm text-zinc-400">
            Order ID
          </p>

          <p className="font-semibold break-all">
            {order._id}
          </p>

          <p className="text-zinc-500 text-sm mt-2">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="text-center">
          <p className="text-sm text-zinc-400">
            Total
          </p>

          <p className="text-xl font-bold">
            ₹{order.totalPrice}
          </p>
        </div>

        <div className="text-center">
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              badgeColors[order.orderStatus] ||
              "bg-zinc-700"
            }`}
          >
            {order.orderStatus}
          </span>
        </div>

        <div>
          <Link
            to={`/orders/${order._id}`}
            className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:bg-zinc-200 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
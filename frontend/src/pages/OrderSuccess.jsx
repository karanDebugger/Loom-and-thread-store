import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function OrderSuccess() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-zinc-900 rounded-2xl p-10 text-center border border-zinc-800 shadow-xl">

        <CheckCircle
          size={90}
          className="mx-auto text-green-500 mb-6"
        />

        <h1 className="text-4xl font-bold mb-4">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-400 mb-8">
          Thank you for shopping with <span className="font-semibold text-white">Loom & Thread</span>.
          Your order has been received and is being processed.
        </p>

        <div className="bg-black rounded-xl p-5 mb-8 border border-zinc-800">
          <h2 className="text-lg font-semibold mb-2">
            Estimated Delivery
          </h2>

          <p className="text-green-400">
            3 – 7 Business Days
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">

          <Link
            to="/shop"
            className="flex-1 bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Continue Shopping
          </Link>

          <Link
            to="/profile"
            className="flex-1 border border-white py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition"
          >
            My Orders
          </Link>

        </div>

      </div>
    </div>
  );
}

export default OrderSuccess;
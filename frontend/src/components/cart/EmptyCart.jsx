import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="text-center py-24">
      <ShoppingBag
        size={70}
        className="mx-auto text-zinc-500"
      />

      <h2 className="text-4xl font-bold mt-6">
        Your Cart is Empty
      </h2>

      <p className="text-zinc-400 mt-3">
        Looks like you haven't added anything yet.
      </p>

      <Link
        to="/shop"
        className="inline-block mt-8 bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-zinc-200 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default EmptyCart; 
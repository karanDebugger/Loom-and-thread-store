import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

function CartSummary() {
  const { totalItems, totalPrice } = useCart();

  const shipping = totalPrice >= 2000 ? 0 : 99;
  const gst = Math.round(totalPrice * 0.18);
  const grandTotal = totalPrice + shipping + gst;

  return (
    <div className="bg-[#111] rounded-2xl p-6 sticky top-24 h-fit">

      <h2 className="text-2xl font-bold mb-8">
        Order Summary
      </h2>

      <div className="space-y-5">

        <div className="flex justify-between">
          <span>Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{totalPrice}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>

          {shipping === 0 ? (
            <span className="text-green-500">
              FREE
            </span>
          ) : (
            <span>₹{shipping}</span>
          )}
        </div>

        <div className="flex justify-between">
          <span>GST (18%)</span>
          <span>₹{gst}</span>
        </div>

        <hr className="border-zinc-700" />

        <div className="flex justify-between text-2xl font-bold">
          <span>Total</span>
          <span>₹{grandTotal}</span>
        </div>

      </div>

      {shipping !== 0 && (
        <div className="mt-6 bg-yellow-900/30 border border-yellow-600 rounded-xl p-4">
          Add products worth{" "}
          <strong>
            ₹{2000 - totalPrice}
          </strong>{" "}
          more to unlock{" "}
          <span className="text-green-400">
            FREE Shipping
          </span>
        </div>
      )}

      <Link
        to="/checkout"
        className="block w-full mt-8 bg-white text-black py-4 rounded-xl font-semibold text-center hover:bg-zinc-200 transition"
      >
        Proceed To Checkout
      </Link>

      <Link
        to="/shop"
        className="block mt-4 text-center border border-zinc-700 py-4 rounded-xl hover:bg-zinc-900 transition"
      >
        Continue Shopping
      </Link>

    </div>
  );
}

export default CartSummary;
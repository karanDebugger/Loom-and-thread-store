function OrderSummary({
  totalItems,
  totalPrice,
  shipping,
  gst,
  grandTotal,
  onContinue,
  loading,
}) {
  return (
    <div className="bg-[#111] rounded-2xl p-6 h-fit sticky top-24">
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

      <button
        onClick={onContinue}
        disabled={loading}
        className={`w-full mt-8 py-4 rounded-xl font-semibold transition ${
          loading
            ? "bg-zinc-500 text-white cursor-not-allowed"
            : "bg-white text-black hover:bg-zinc-200"
        }`}
      >
        {loading ? "Placing Order..." : "Continue"}
      </button>
    </div>
  );
}

export default OrderSummary;
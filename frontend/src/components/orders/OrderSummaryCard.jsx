function OrderSummaryCard({ order }) {
  return (
    <div className="bg-[#111] rounded-2xl p-6 border border-zinc-800">
      <h2 className="text-2xl font-bold mb-6">
        Order Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{order.subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>₹{order.shippingPrice}</span>
        </div>

        <div className="flex justify-between">
          <span>GST</span>
          <span>₹{order.taxPrice}</span>
        </div>

        <hr className="border-zinc-700" />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>₹{order.totalPrice}</span>
        </div>
      </div>
    </div>
  );
}

export default OrderSummaryCard;
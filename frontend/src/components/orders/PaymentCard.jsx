function PaymentCard({ order }) {
  return (
    <div className="bg-[#111] rounded-2xl p-6 border border-zinc-800">
      <h2 className="text-2xl font-bold mb-6">
        Payment
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-zinc-500">
            Method
          </p>

          <p className="font-semibold">
            {order.paymentMethod}
          </p>
        </div>

        <div>
          <p className="text-zinc-500">
            Payment Status
          </p>

          <span
            className={`px-3 py-1 rounded-full text-sm ${
              order.isPaid
                ? "bg-green-600"
                : "bg-yellow-600"
            }`}
          >
            {order.isPaid ? "Paid" : "Pending"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PaymentCard;
function OrderItem({ item }) {
  return (
    <div className="flex items-center gap-4 bg-[#111] rounded-xl p-4 border border-zinc-800">
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-20 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-lg">
          {item.title}
        </h3>

        <p className="text-zinc-400">
          Quantity: {item.quantity}
        </p>
      </div>

      <div className="text-right">
        <p className="font-bold text-lg">
          ₹{item.price}
        </p>

        <p className="text-zinc-500 text-sm">
          ₹{item.price * item.quantity}
        </p>
      </div>
    </div>
  );
}

export default OrderItem;
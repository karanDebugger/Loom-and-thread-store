import { Trash2 } from "lucide-react";
import { useCart } from "../../hooks/useCart";

function CartItem({ item }) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <div className="flex gap-6 border-b border-zinc-800 py-6">

      <img
        src={
          item.images?.[0] ||
          "https://via.placeholder.com/150"
        }
        alt={item.title}
        className="w-36 h-44 object-cover rounded-xl"
      />

      <div className="flex-1">

        <h2 className="text-2xl font-semibold">
          {item.title}
        </h2>

        <p className="text-zinc-400 mt-2">
          ₹{item.price}
        </p>

        <div className="flex items-center gap-4 mt-6">

          <button
            onClick={() => decreaseQuantity(item._id)}
            className="bg-zinc-800 w-10 h-10 rounded-lg"
          >
            -
          </button>

          <span className="text-xl">
            {item.quantity}
          </span>

          <button
            onClick={() => increaseQuantity(item._id)}
            className="bg-zinc-800 w-10 h-10 rounded-lg"
          >
            +
          </button>

        </div>

      </div>

      <button
        onClick={() => removeFromCart(item._id)}
        className="text-red-500 hover:text-red-400"
      >
        <Trash2 size={24} />
      </button>

    </div>
  );
}

export default CartItem; 
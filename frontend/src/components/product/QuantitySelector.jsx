import { useState } from "react";

function QuantitySelector({ quantity, setQuantity }) {
  return (
    <div className="flex items-center gap-4 mt-8">

      <button
        onClick={() =>
          quantity > 1 && setQuantity(quantity - 1)
        }
        className="w-10 h-10 bg-zinc-800 rounded-lg"
      >
        -
      </button>

      <span className="text-2xl font-semibold">
        {quantity}
      </span>

      <button
        onClick={() =>
          setQuantity(quantity + 1)
        }
        className="w-10 h-10 bg-zinc-800 rounded-lg"
      >
        +
      </button>

    </div>
  );
}

export default QuantitySelector; 
import { useCart } from "../../hooks/useCart";

function CheckoutItems() {
  const { cartItems } = useCart();

  return (
    <div className="bg-[#111] rounded-2xl p-8 mt-8">

      <h2 className="text-3xl font-semibold mb-8">
        Review Your Order
      </h2>

      <div className="space-y-6">

        {cartItems.map((item) => (

          <div
            key={item._id}
            className="flex gap-5 border-b border-zinc-800 pb-6"
          >

            {/* Product Image */}
            <img
              src={item.images?.[0]}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-xl"
            />

            {/* Product Details */}
            <div className="flex-1">

              <h3 className="text-xl font-semibold">
                {item.name}
              </h3>

              <p className="text-zinc-400 mt-2">
                ₹{item.price}
              </p>

              <p className="mt-2">
                Quantity :
                <span className="ml-2 font-semibold">
                  {item.quantity}
                </span>
              </p>

            </div>

            {/* Item Total */}
            <div className="text-right">

              <p className="text-zinc-400">
                Total
              </p>

              <p className="text-2xl font-bold mt-2">
                ₹{item.price * item.quantity}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default CheckoutItems;
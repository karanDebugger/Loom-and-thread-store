import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";

import { useCart } from "../hooks/useCart";

function Cart() {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      <h1 className="text-5xl font-bold mb-12">
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">

        <div className="lg:col-span-2">

          {cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={item}
            />
          ))}

        </div>

        <CartSummary />

      </div>

    </div>
  );
}

export default Cart; 
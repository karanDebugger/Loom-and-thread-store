import { ShoppingBag } from "lucide-react";
import { useCart } from "../../hooks/useCart";

function ProductActions({ product, quantity }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert("Product added to cart");
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-white text-black py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition"
    >
      <ShoppingBag size={20} />
      Add To Cart
    </button>
  );
}

export default ProductActions; 
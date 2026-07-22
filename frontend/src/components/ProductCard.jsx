import { Heart, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useWishlist } from "../hooks/useWishlist";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const { wishlist, addItem, removeItem } = useWishlist();

  const isWishlisted = wishlist.some(
    (item) => item._id?.toString() === product._id?.toString()
  );

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (isWishlisted) {
        await removeItem(product._id);
      } else {
        await addItem(product._id);
      }
    } catch (err) {
      console.error(err);

alert(
  err.response?.data?.message ||
  err.message ||
  "Wishlist Error"
);
    }
  };

  const goToProduct = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      onClick={goToProduct}
      className="group bg-[#111] rounded-3xl overflow-hidden border border-zinc-800 hover:border-white duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={
            product.images?.[0] ||
            "https://via.placeholder.com/600x800"
          }
          alt={product.title}
          className="h-96 w-full object-cover group-hover:scale-110 duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-6">

        <div className="flex justify-between items-start">

          <div>
            <h3 className="text-white font-semibold text-xl">
              {product.title}
            </h3>

            <p className="text-gray-400 mt-2">
              ₹{product.price}
            </p>
          </div>

          <button
            type="button"
            onClick={handleWishlist}
            className="p-2"
          >
            <Heart
              size={24}
              fill={isWishlisted ? "red" : "none"}
              stroke={isWishlisted ? "red" : "white"}
              className="transition duration-300 hover:scale-110"
            />
          </button>

        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();

            alert("Cart integration next module 😄");
          }}
          className="mt-6 w-full bg-white text-black rounded-xl py-3 flex items-center justify-center gap-2 font-semibold hover:bg-gray-200 duration-300"
        >
          <ShoppingBag size={18} />
          Add to Cart
        </button>

      </div>
    </div>
  );
}

export default ProductCard; 
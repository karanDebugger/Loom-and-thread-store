import { useEffect, useState } from "react";

import { getProducts } from "../services/productService";
import ProductCard from "./ProductCard";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        // Supports both old and new productService responses
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-white mb-3">
          New Arrivals
        </h2>

        <p className="text-gray-400 mb-14">
          Curated pieces crafted for modern fashion.
        </p>

        {loading ? (
          <p className="text-white">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-white">No products found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
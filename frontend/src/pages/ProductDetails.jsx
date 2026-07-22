import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductById } from "../services/productService";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import QuantitySelector from "../components/product/QuantitySelector";
import ProductActions from "../components/product/ProductActions";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="text-center py-20 text-3xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-16">
        <ProductGallery images={product.images} />

        <div>
          <ProductInfo product={product} />

          <div className="mt-8">
            <QuantitySelector
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>

          <div className="mt-8">
            <ProductActions
              product={product}
              quantity={quantity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;  
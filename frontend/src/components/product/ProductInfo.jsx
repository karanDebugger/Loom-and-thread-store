import { useState } from "react";

import QuantitySelector from "./QuantitySelector";
import ProductActions from "./ProductActions";

function ProductInfo({ product }) {

  const [quantity, setQuantity] = useState(1);

  return (
    <div>

      <h1 className="text-5xl font-bold">
        {product.title}
      </h1>

      <p className="text-3xl mt-4">
        ₹{product.price}
      </p>

      <div className="mt-6 space-y-2 text-gray-400">

        <p>
          <b>Brand:</b> {product.brand}
        </p>

        <p>
          <b>Category:</b> {product.category}
        </p>

        <p>
          <b>Stock:</b> {product.stock}
        </p>

      </div>

      <p className="mt-8 text-gray-300">
        {product.description}
      </p>

      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
      />

      <ProductActions
        product={product}
        quantity={quantity}
      />

    </div>
  );
}

export default ProductInfo; 
import ProductCard from "../ProductCard";

function ProductGrid({ products }) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}

    </div>
  );
}

export default ProductGrid;
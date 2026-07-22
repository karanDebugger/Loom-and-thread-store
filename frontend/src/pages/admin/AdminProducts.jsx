import { useEffect, useMemo, useState } from "react";

import { getProducts } from "../../services/productService";

import AdminProductRow from "../../components/products/AdminProductRow";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data.products || data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const keyword = search.toLowerCase();

      return (
        product.name.toLowerCase().includes(keyword) ||
        product.brand?.toLowerCase().includes(keyword) ||
        product.category?.toLowerCase().includes(keyword)
      );
    });
  }, [products, search]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-bold">
          Loading Products...
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-6">

      <div className="flex flex-col lg:flex-row justify-between gap-6 mb-10">

        <div>

          <h1 className="text-4xl font-bold">
            Admin Products
          </h1>

          <p className="text-zinc-400 mt-2">
            Total Products : {filteredProducts.length}
          </p>

        </div>

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 w-72"
          />

          <button
            className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg"
          >
            + Add Product
          </button>

        </div>

      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-800">

        <table className="w-full">

          <thead className="bg-zinc-900">

            <tr>

              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Brand</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Created</th>
              <th className="p-4 text-left">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredProducts.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-10 text-zinc-400"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <AdminProductRow
                  key={product._id}
                  product={product}
                />
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminProducts;
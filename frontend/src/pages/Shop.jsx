import { useEffect, useState } from "react";

import FilterSidebar from "../components/shop/FilterSidebar";
import SortDropdown from "../components/shop/SortDropdown";
import ProductGrid from "../components/shop/ProductGrid";
import SearchBar from "../components/shop/SearchBar";
import Pagination from "../components/shop/Pagination";

import { getProducts } from "../services/productService";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    brand: "",
    maxPrice: "",
    sort: "latest",
    page: 1,
    limit: 8,
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts(filters);

      setProducts(data.products);
      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-10">

        <div>
          <h1 className="text-5xl font-bold">
            Shop
          </h1>

          <p className="text-zinc-400 mt-2">
            Explore our premium fashion collection.
          </p>
        </div>

        <SortDropdown
          value={filters.sort}
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              sort: value,
              page: 1,
            }))
          }
        />

      </div>

      {/* Search */}
      <SearchBar
        value={filters.search}
        onChange={(value) =>
          setFilters((prev) => ({
            ...prev,
            search: value,
            page: 1,
          }))
        }
      />

      {/* Product Count */}
      {pagination && (
        <div className="mb-8">
          <p className="text-zinc-400">
            Showing{" "}
            <span className="text-white font-semibold">
              {products.length}
            </span>{" "}
            of{" "}
            <span className="text-white font-semibold">
              {pagination.totalProducts}
            </span>{" "}
            products
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-10">

        {/* Sidebar */}
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
        />

        {/* Products */}
        <div className="lg:col-span-3">

          {loading ? (

            <h2 className="text-2xl">
              Loading Products...
            </h2>

          ) : products.length === 0 ? (

            <div className="bg-[#111] rounded-2xl p-12 text-center">

              <h2 className="text-3xl font-bold mb-4">
                No Products Found
              </h2>

              <p className="text-zinc-400 mb-8">
                Try changing your search or filters.
              </p>

              <button
                onClick={() =>
                  setFilters({
                    search: "",
                    category: "",
                    brand: "",
                    maxPrice: "",
                    sort: "latest",
                    page: 1,
                    limit: 8,
                  })
                }
                className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-zinc-200 transition"
              >
                Clear Filters
              </button>

            </div>

          ) : (

            <>
              <ProductGrid
                products={products}
              />

              <Pagination
                pagination={pagination}
                onPageChange={(page) =>
                  setFilters((prev) => ({
                    ...prev,
                    page,
                  }))
                }
              />
            </>

          )}

        </div>

      </div>

    </div>
  );
}

export default Shop;
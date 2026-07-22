function FilterSidebar({
  filters,
  setFilters,
}) {

  return (

    <aside className="bg-[#111] rounded-2xl p-6 h-fit">

      <h2 className="text-2xl font-bold mb-6">
        Filters
      </h2>

      <div className="mb-6">

        <h3 className="font-semibold mb-3">
          Category
        </h3>

        <select
          className="w-full p-3 rounded-xl bg-black border border-zinc-700"
          value={filters.category}
          onChange={(e)=>
            setFilters(prev=>({
              ...prev,
              category:e.target.value,
              page:1,
            }))
          }
        >

          <option value="">
            All
          </option>

          <option value="Men">
            Men
          </option>

          <option value="Women">
            Women
          </option>

          <option value="Accessories">
            Accessories
          </option>

        </select>

      </div>

      <div className="mb-6">

        <h3 className="font-semibold mb-3">
          Brand
        </h3>

        <input
          type="text"
          placeholder="Nike..."
          value={filters.brand || ""}
          onChange={(e)=>
            setFilters(prev=>({
              ...prev,
              brand:e.target.value,
              page:1,
            }))
          }
          className="w-full p-3 rounded-xl bg-black border border-zinc-700"
        />

      </div>

      <div>

        <h3 className="font-semibold mb-3">
          Max Price
        </h3>

        <input
          type="range"
          min="500"
          max="10000"
          step="500"
          value={filters.maxPrice || 10000}
          onChange={(e)=>
            setFilters(prev=>({
              ...prev,
              maxPrice:e.target.value,
              page:1,
            }))
          }
          className="w-full"
        />

        <p className="mt-2">
          ₹ {filters.maxPrice || 10000}
        </p>

      </div>

      <button
        className="mt-8 w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl"
        onClick={()=>
          setFilters({
            search:"",
            category:"",
            brand:"",
            maxPrice:"",
            sort:"latest",
            page:1,
            limit:8,
          })
        }
      >
        Clear Filters
      </button>

    </aside>

  );

}

export default FilterSidebar;
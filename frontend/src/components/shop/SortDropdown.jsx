function SortDropdown({
  value,
  onChange,
}) {

  return (

    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="bg-[#111] border border-zinc-700 rounded-xl px-4 py-3"
    >

      <option value="latest">
        Newest
      </option>

      <option value="priceAsc">
        Price: Low to High
      </option>

      <option value="priceDesc">
        Price: High to Low
      </option>

      <option value="nameAsc">
        Name A-Z
      </option>

    </select>

  );

}

export default SortDropdown;
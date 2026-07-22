import { Search } from "lucide-react";

function SearchBar({ value, onChange }) {
  return (
    <div className="relative mb-8">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
      />

      <input
        type="text"
        placeholder="Search by product, brand or category..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          bg-[#111]
          border
          border-zinc-700
          rounded-xl
          py-3
          pl-12
          pr-4
          outline-none
          focus:border-white
        "
      />
    </div>
  );
}

export default SearchBar;
function AdminProductRow({ product }) {
  return (
    <tr className="border-b border-zinc-800 hover:bg-zinc-900">

      <td className="p-4">
        <img
          src={product.images?.[0] || "https://placehold.co/80x80?text=No+Image"}
          alt={product.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
      </td>

      <td className="p-4 font-medium">
        {product.name}
      </td>

      <td className="p-4">
        {product.category}
      </td>

      <td className="p-4">
        {product.brand}
      </td>

      <td className="p-4">
        ₹{product.price}
      </td>

      <td className="p-4">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            product.countInStock > 0
              ? "bg-green-700"
              : "bg-red-700"
          }`}
        >
          {product.countInStock}
        </span>
      </td>

      <td className="p-4">
        {new Date(product.createdAt).toLocaleDateString()}
      </td>

      <td className="p-4">

        <div className="flex gap-2">

          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Edit
          </button>

          <button
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
          >
            Delete
          </button>

        </div>

      </td>

    </tr>
  );
}

export default AdminProductRow;
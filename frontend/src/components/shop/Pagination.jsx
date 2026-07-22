function Pagination({ pagination, onPageChange }) {
  if (!pagination) return null;

  const { currentPage, totalPages } = pagination;

  const pages = [];

  // First Page
  if (currentPage > 3) {
    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }
  }

  // Current window
  for (
    let i = Math.max(1, currentPage - 2);
    i <= Math.min(totalPages, currentPage + 2);
    i++
  ) {
    pages.push(i);
  }

  // Last Page
  if (currentPage < totalPages - 2) {
    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages);
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 mt-12">

      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 rounded-lg bg-[#111] disabled:opacity-40"
      >
        Previous
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-lg ${
              page === currentPage
                ? "bg-white text-black"
                : "bg-[#111]"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 rounded-lg bg-[#111] disabled:opacity-40"
      >
        Next
      </button>

    </div>
  );
}

export default Pagination;
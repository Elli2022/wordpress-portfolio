"use client";

type HomePaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function HomePagination({
  page,
  totalPages,
  onPageChange,
}: HomePaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="home-pagination-2023" role="navigation" aria-label="Project pages">
      <button
        type="button"
        className="home-pagination-btn"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        {"<"}
      </button>
      <span className="home-pagination-page">{page}</span>
      <button
        type="button"
        className="home-pagination-btn"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        {">"}
      </button>
    </div>
  );
}

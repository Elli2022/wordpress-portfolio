//src/app/components/PaginationControls.tsx
"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  startCursor: string;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  endCursor: string;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  startCursor,
  hasNextPage,
  hasPrevPage,
  endCursor,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!searchParams) {
    return null;
  }

  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "6", 10);

  const handlePrevPage = () => {
    if (hasPrevPage && page > 1) {
      const prevPageUrl = `/?page=${
        page - 1
      }&per_page=${perPage}&before=${encodeURIComponent(startCursor)}`;
      router.push(prevPageUrl);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      const nextPageUrl = `/?page=${
        page + 1
      }&per_page=${perPage}&after=${encodeURIComponent(endCursor)}`;
      router.push(nextPageUrl);
    }
  };

  return (
    <div className="pagination-shell">
      <button
        className="pagination-button"
        disabled={!hasPrevPage}
        onClick={handlePrevPage}
        aria-label="Go to previous page"
      >
        Previous
      </button>

      <div className="pagination-page">Page {page}</div>

      <button
        className="pagination-button"
        disabled={!hasNextPage}
        onClick={handleNextPage}
        aria-label="Go to next page"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;

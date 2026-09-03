"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type TablePagination = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  itemLabel: string;
};

/**
 * Builds the array of page numbers/ellipsis markers to render.
 * Always shows first page, last page, and a window around the current page.
 * Example output for currentPage=1, totalPages=90: [1, 2, 3, "ellipsis", 90]
 * Example output for currentPage=45, totalPages=90: [1, "ellipsis", 44, 45, 46, "ellipsis", 90]
 */
function getPageRange(
  currentPage: number,
  totalPages: number,
): (number | "ellipsis")[] {
  const SIBLING_COUNT = 1; // pages shown on each side of the current page
  const totalNumbersToShow = SIBLING_COUNT * 2 + 5; // first + last + current + 2 siblings + 2 ellipsis slots

  // If there aren't enough pages to bother truncating, just show them all
  if (totalPages <= totalNumbersToShow) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - SIBLING_COUNT, 1);
  const rightSiblingIndex = Math.min(currentPage + SIBLING_COUNT, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  const pages: (number | "ellipsis")[] = [1];

  if (showLeftEllipsis) {
    pages.push("ellipsis");
  } else {
    // No gap yet, so fill in page 2 explicitly
    for (let i = 2; i < leftSiblingIndex; i++) pages.push(i);
  }

  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    if (i !== 1 && i !== totalPages) pages.push(i);
  }

  if (showRightEllipsis) {
    pages.push("ellipsis");
  } else {
    for (let i = rightSiblingIndex + 1; i < totalPages; i++) pages.push(i);
  }

  pages.push(totalPages);

  return pages;
}

const TablePagination = ({
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
  itemLabel,
}: TablePagination) => {
  const pageRange = getPageRange(currentPage, totalPages);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Showing page {currentPage} of {totalPages} · {totalCount} {itemLabel} in
        total
      </p>

      <Pagination className="mx-0 w-fit">
        <PaginationContent>
          {/* Prev */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                goToPage(currentPage - 1);
              }}
              aria-disabled={currentPage === 1}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {/* Page numbers + ellipses */}
          {pageRange.map((page, index) =>
            page === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault();
                goToPage(currentPage + 1);
              }}
              aria-disabled={currentPage === totalPages}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default TablePagination;

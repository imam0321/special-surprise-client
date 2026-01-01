"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  limit?: number;
}

export default function TablePagination({
  currentPage,
  totalPages,
  limit,
}: TablePaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

 const currentLimit =
  limit ??
  Number(searchParams.get("limit") ?? 10);

  const navigateToPage = (page: number) => {
    const safePage = Math.max(1, Math.min(page, totalPages));
    if (safePage === currentPage) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", safePage.toString());
    params.set("limit", currentLimit.toString());

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={currentPage === 1 || isPending}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Pages */}
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
          let pageNumber: number;

          if (totalPages <= 5) pageNumber = index + 1;
          else if (currentPage <= 3) pageNumber = index + 1;
          else if (currentPage >= totalPages - 2)
            pageNumber = totalPages - 4 + index;
          else pageNumber = currentPage - 2 + index;

          return (
            <Button
              key={pageNumber}
              size="sm"
              className="w-10"
              variant={pageNumber === currentPage ? "default" : "outline"}
              disabled={isPending}
              onClick={() => navigateToPage(pageNumber)}
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>

      {/* Next */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={currentPage === totalPages || isPending}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

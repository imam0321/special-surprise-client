"use client";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { useMemo } from "react";

interface ManagementPageLoadingProps {
  columns: number;
  hasActionButton?: boolean;
  filterCount?: number;
  filterWidths?: string[];
}

export function ManagementPageLoading({
  columns,
  hasActionButton = false,
  filterCount = 0,
  filterWidths = [],
}: ManagementPageLoadingProps) {
  const filterElements = useMemo(() => {
    if (filterCount === 0) return null;

    return (
      <div className="flex items-center gap-3">
        {Array.from({ length: filterCount }).map((_, index) => (
          <div
            key={index}
            className={`h-10 ${
              filterWidths[index] || "w-40"
            } bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md shadow-sm`}
          />
        ))}
      </div>
    );
  }, [filterCount, filterWidths]);

  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md shadow-sm" />
          <div className="h-4 w-96 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md shadow-sm" />
        </div>
        {hasActionButton && (
          <div className="h-10 w-32 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20animate-pulse rounded-md shadow-sm" />
        )}
      </div>

      {/* Filters Skeleton */}
      {filterElements}

      {/* Table Skeleton */}
      <TableSkeleton columns={columns} rows={6} />
    </div>
  );
}
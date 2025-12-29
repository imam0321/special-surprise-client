"use client";

import { Edit, Eye, Trash } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface ManagementTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  getRowKey: (row: T) => string;
  emptyMessage?: string;
}

export default function ManagementTable<T>({
  data = [],
  columns = [],
  onView,
  onEdit,
  onDelete,
  getRowKey,
  emptyMessage = "No records found.",
}: ManagementTableProps<T>) {
  const hasActions = onView || onEdit || onDelete;

  return (
    <div className="rounded-lg bg-background p-4 shadow-sm border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index} className={column.className}>
                {column.header}
              </TableHead>
            ))}
            {hasActions && (
              <TableHead className="text-center">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (hasActions ? 1 : 0)}
                className="text-center py-8 text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={getRowKey(item)}>
                {columns.map((col, idx) => (
                  <TableCell key={idx} className={col.className}>
                    {typeof col.accessor === "function"
                      ? col.accessor(item)
                      : String(item[col.accessor])}
                  </TableCell>
                ))}

                {hasActions && (
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      {onView && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onView(item)}
                        >
                          <Eye size={16} />
                        </Button>
                      )}

                      {onEdit && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onEdit(item)}
                        >
                          <Edit size={16} />
                        </Button>
                      )}

                      {onDelete && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => onDelete(item)}
                        >
                          <Trash size={16} />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

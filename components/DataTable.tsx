"use client";
import { useState } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender, ColumnDef, SortingState } from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export interface DataTableProps<T extends object> {
  caption: string;
  columns: ColumnDef<T, unknown>[];
  data: T[];
  isLoading: boolean;
  renderActions?: (row: T) => React.ReactNode;
}

export default function DataTable<T extends object>({ columns, data, isLoading, renderActions, caption }: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: false,
    pageCount: Math.ceil(data.length / pageSize)
  });
  const pagedRows = table.getRowModel().rows.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="px-4 py-2 text-left cursor-pointer select-none" onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() ? (header.column.getIsSorted() === "asc" ? " ˆ" : " ˇ") : null}
                </th>
              ))}
              {renderActions && <th>Actions</th>}
            </tr>
          ))}
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: pageSize }).map((_, i) => (
                <tr key={i}>
                  {columns.map((_, j) => (
                    <td key={j}><Skeleton className="h-6 w-24" /></td>
                  ))}
                  {renderActions && <td><Skeleton className="h-6 w-16" /></td>}
                </tr>
              ))
            : pagedRows.length === 0
            ? <tr><td colSpan={columns.length + (renderActions ? 1 : 0)} className="text-center py-8 text-gray-400">No data</td></tr>
            : pagedRows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-2">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                  {renderActions && <td>{renderActions(row.original)}</td>}
                </tr>
              ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <Button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} aria-label="Previous page">Prev</Button>
        <span>Page {page + 1}</span>
        <Button onClick={() => setPage(p => p + 1)} disabled={(page + 1) * pageSize >= data.length} aria-label="Next page">Next</Button>
      </div>
    </div>
  );
}

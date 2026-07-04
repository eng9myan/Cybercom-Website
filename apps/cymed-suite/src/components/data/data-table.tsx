"use client";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchPlaceholder?: string;
  searchKey?: keyof TData & string;
  toolbar?: React.ReactNode;
  pageSize?: number;
  emptyState?: React.ReactNode;
  onExport?: () => void;
  className?: string;
  compact?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchPlaceholder = "Search…",
  searchKey,
  toolbar,
  pageSize = 10,
  emptyState,
  onExport,
  className,
  compact = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize } },
  });

  return (
    <div className={cn("surface-card overflow-hidden", className)}>
      <div className="flex flex-wrap items-center gap-2 border-b border-border/60 p-3">
        <div className="relative min-w-[240px] flex-1">
          <Search className="pointer-events-none absolute start-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="ps-8"
          />
        </div>
        {toolbar}
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-3.5 w-3.5" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <SlidersHorizontal className="h-3.5 w-3.5" /> View
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={onExport}
          >
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader className="bg-surface-raised/40">
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id} className="hover:bg-transparent">
              {hg.headers.map((header) => (
                <TableHead key={header.id} className={compact ? "h-9" : ""}>
                  {header.isPlaceholder ? null : (
                    <button
                      className={cn(
                        "inline-flex items-center gap-1",
                        header.column.getCanSort() && "cursor-pointer hover:text-foreground"
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() ? (
                        <ArrowUpDown className="h-3 w-3 opacity-60" />
                      ) : null}
                    </button>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className={compact ? "text-xs" : ""}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={compact ? "p-2" : ""}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                {emptyState ?? "No results."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between border-t border-border/60 p-3 text-xs text-muted-foreground">
        <div>
          Showing{" "}
          <span className="font-medium text-foreground">
            {table.getRowModel().rows.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">
            {table.getFilteredRowModel().rows.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="iconSm"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <ChevronLeft className="h-4 w-4 rtl-flip" />
          </Button>
          <span className="px-2">
            Page {table.getState().pagination.pageIndex + 1} / {table.getPageCount() || 1}
          </span>
          <Button
            variant="outline"
            size="iconSm"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            <ChevronRight className="h-4 w-4 rtl-flip" />
          </Button>
        </div>
      </div>
    </div>
  );
}

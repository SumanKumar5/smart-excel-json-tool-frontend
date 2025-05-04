import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "../../utils/cn";

interface DataTableProps {
  data: Record<string, unknown>[];
  className?: string;
}

const DataTable: React.FC<DataTableProps> = ({ data, className }) => {
  const columnHelper = createColumnHelper<Record<string, unknown>>();

  // Dynamically create columns from the first row of data
  const columns = React.useMemo(() => {
    if (data.length === 0) return [];

    return Object.keys(data[0]).map((key) =>
      columnHelper.accessor(key, {
        header: () => key.charAt(0).toUpperCase() + key.slice(1),
        cell: (info) => {
          const value = info.getValue();
          if (value === null || value === undefined) return "-";
          if (typeof value === "object") return JSON.stringify(value);
          return String(value);
        },
      }),
    );
  }, [data, columnHelper]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (data.length === 0) return null;

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-left p-3 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-300"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-3 text-sm text-slate-700 dark:text-slate-300"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      {data.length > 10 && (
        <div className="text-center py-3 text-sm text-slate-500 dark:text-slate-400">
          Showing first 10 rows of {data.length} total rows
        </div>
      )}
    </div>
  );
};

export default DataTable;

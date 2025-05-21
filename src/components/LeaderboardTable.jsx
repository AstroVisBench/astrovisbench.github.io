// src/components/LeaderboardTable.jsx
import { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';

export default function LeaderboardTable({ data, sorting, setSorting }) {
  // 1) Memoize column definitions
  const columns = useMemo(() => [
    { header: 'Model', accessorKey: 'Model', enableSorting: true },
    { header: 'NoErr(P) %', accessorKey: 'Processing No Error %', enableSorting: true },
    { header: 'VIscore', accessorKey: 'VIscore', enableSorting: true },
    { header: 'NoErr(V) %', accessorKey: 'Visualization No Error %', enableSorting: true },
    { header: 'NoE %', accessorKey: 'NoE %', enableSorting: true },
    { header: 'VisFail %', accessorKey: 'VisFail %', enableSorting: true },
    { header: 'MiE %', accessorKey: 'MiE %', enableSorting: true },
    { header: 'MaE %', accessorKey: 'MaE %', enableSorting: true },
  ], []);

  const header_highlight_map = {
    'Model': "name",
    'Processing No Error %': "processing_imp",
    'VIscore': "processing_imp",
    'Visualization No Error %': "visualization_imp",
    'NoE %': "visualization_imp",
    'VisFail %': "deemp",
    'MiE %': "deemp",
    'MaE %': "deemp",
  }

  // 2) Memoize the data you pass in
  const memoData = useMemo(() => data, [data]);

  // 3) Create the table instance
  const table = useReactTable({
    data: memoData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel:    getCoreRowModel(),
    getSortedRowModel:  getSortedRowModel(),
  });

  return (
    <table className="min-w-full border-collapse text-xs">
      <thead>
        {table.getHeaderGroups().map(hg => (
          <tr key={hg.id}>
            {hg.headers.map(header => {
              const baseclasses = "cursor-pointer px-4 py-2 text-left"
              var hclasses = "";
              if (header_highlight_map[header.column.id] == "processing_imp") {
                hclasses = "bg-cyan-50";
              } else if (header_highlight_map[header.column.id] == "visualization_imp") {
                hclasses = "bg-purple-50";
              } else if (header_highlight_map[header.column.id] == "deemp") {
                hclasses = "text-zinc-400";
              }
              return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={`${baseclasses} ${hclasses}`}
                onClick={header.column.getToggleSortingHandler()}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
                {{
                asc:  ' ↑',
                desc: ' ↓'
                }[header.column.getIsSorted()] ?? ' -'}
              </th>
            )}
          )}
          </tr>
        ))
        }
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id} className="border-t">
            {row.getVisibleCells().map(cell => {
              const baseclasses = "px-4 py-2"
              var hclasses = "";
              if (header_highlight_map[cell.column.id] == "processing_imp") {
                hclasses = "bg-cyan-50";
              } else if (header_highlight_map[cell.column.id] == "visualization_imp") {
                hclasses = "bg-purple-50";
              } else if (header_highlight_map[cell.column.id] == "deemp") {
                hclasses = "text-zinc-400";
              }
              return (
              <td key={cell.id} className={`${baseclasses} ${hclasses}`}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            )}
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
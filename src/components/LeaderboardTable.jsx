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
    { header: 'P Crash %', accessorKey: 'Processing Crash %', enableSorting: true },
    { header: 'VIscore', accessorKey: 'VIscore', enableSorting: true },
    { header: 'V Crash %', accessorKey: 'Visualization Crash %', enableSorting: true },
    { header: 'VisFail', accessorKey: 'VisFail %', enableSorting: true },
    { header: 'NoE %', accessorKey: 'NoE %', enableSorting: true },
    { header: 'MiE %', accessorKey: 'MiE %', enableSorting: true },
    { header: 'MaE %', accessorKey: 'MaE %', enableSorting: true },
  ], []);

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
            {hg.headers.map(header => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className="cursor-pointer px-4 py-2 text-left"
                onClick={header.column.getToggleSortingHandler()}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
                {{
                asc:  ' ↑',
                desc: ' ↓'
                }[header.column.getIsSorted()] ?? ' -'}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id} className="border-t">
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="px-4 py-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
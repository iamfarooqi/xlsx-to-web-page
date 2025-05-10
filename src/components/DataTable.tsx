'use client';

import { useState, useEffect } from 'react';

interface DataTableProps {
  data: any[][];
  onClear: () => void;
}

export default function DataTable({ data, onClear }: DataTableProps) {
  const headers = data[0];
  const empIdIndex = headers.findIndex(
    (h: string) => h.toLowerCase() === 'employeeid'
  );

  const [rows, setRows] = useState<any[][]>([]);

  const isSpecialChar = (str: string) => /[^a-zA-Z0-9]/.test(str);

  // Separate and reorder rows
  useEffect(() => {
    const records = data.slice(1);
    const withSpecial = records.filter(
      (row) => empIdIndex >= 0 && isSpecialChar(String(row[empIdIndex]))
    );
    const withoutSpecial = records.filter(
      (row) => empIdIndex >= 0 && !isSpecialChar(String(row[empIdIndex]))
    );
    setRows([...withSpecial, ...withoutSpecial]);
  }, [data, empIdIndex]);

  const handleDelete = (index: number) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={onClear}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Delete All
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr>
              {headers.map((cell, i) => (
                <th key={i} className="border px-2 py-1 ">
                  {cell}
                </th>
              ))}
              <th className="border px-2 py-1 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => {
              const hasSpecialChar =
                empIdIndex >= 0 && isSpecialChar(String(row[empIdIndex]));

              return (
                <tr
                  key={rowIndex}
                  className={hasSpecialChar ? 'bg-red-800' : ''}
                >
                  {row.map((cell, i) => (
                    <td key={i} className="border px-2 py-1">
                      {cell}
                    </td>
                  ))}
                  <td className="border px-2 py-1 text-center">
                    <button
                      onClick={() => handleDelete(rowIndex)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

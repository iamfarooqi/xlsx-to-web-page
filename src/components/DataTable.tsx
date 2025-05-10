interface DataTableProps {
  data: any[][];
}

export default function DataTable({ data }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead>
          <tr>
            {data[0].map((cell, i) => (
              <th key={i} className="border px-2 py-1 bg-gray-100">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, i) => (
                <td key={i} className="border px-2 py-1">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

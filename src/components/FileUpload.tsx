'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import DataTable from './DataTable';

export default function FileUpload() {
  const [data, setData] = useState<any[][]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target?.result;

      if (file.name.endsWith('.csv')) {
        const parsed = Papa.parse(binaryStr as string, { header: false });
        setData(parsed.data as any[][]);
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        setData(sheetData as any[][]);
      }
    };

    if (file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
  };

  const clearData = () => setData([]);

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept=".csv, .xlsx, .xls"
        onChange={handleFileUpload}
        className="block border p-2"
      />
      {data.length > 0 && <DataTable data={data} onClear={clearData} />}
    </div>
  );
}

import React from 'react';
import { LuckyExcel } from '../main.js';
import { Sheet } from "@fortune-sheet/core";
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css"

export const Page: React.FC = () => {
  const [sheets, setSheets] = React.useState<Sheet[]>([{ name: "Sheet1" }]);
  const [key, setKey] = React.useState<number>(0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
      }}
    >
      <header>
        Import XLSX: <input type="file" onChange={async (e) => {
          const xls = await e.target.files[0].arrayBuffer()
          const lsh = await LuckyExcel.transformExcelToLucky(xls)
          setSheets(lsh.sheets)
          setKey(k => k + 1)
        }}/>
      </header>
      <Workbook key={key} data={sheets} style={{ flex: '1' }} />
    </div>
  );
};

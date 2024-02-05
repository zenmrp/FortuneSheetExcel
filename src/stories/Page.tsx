import React from 'react';
import { transformExcelToFortune } from '../main.js';
import { Sheet } from "@fortune-sheet/core";
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css"

export const Page: React.FC = () => {
  const [sheets, setSheets] = React.useState<Sheet[]>([{ name: "Sheet1" }]);
  const [key, setKey] = React.useState<number>(0);
  const sheetRef = React.useRef(0);

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
          const lsh = await transformExcelToFortune(xls)
          console.log('Loading', JSON.parse(JSON.stringify(lsh))) // Log the static as-read result
          setSheets(lsh.sheets)
          setKey(k => k + 1)
          console.log('Loaded', lsh, 'into', sheetRef) // Log the dynamic object that will be changed by the engine
        }}/>
      </header>
      <Workbook key={key} ref={sheetRef} data={sheets} style={{ flex: '1' }} />
    </div>
  );
};

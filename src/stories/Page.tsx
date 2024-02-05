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
      <Workbook key={key} ref={sheetRef} data={sheets} style={{ flex: '1' }} onChange={() => {
        // XXX: Unfortunately FortuneSheet does not (yet) apply the format when we initialize it with values
        //      so we have to force it to do it for every cell that has a non-string format to apply that.
        //      (It also doesn't export its formatting library so we'd have to copy-paste it if we wanted
        //       to generate the 'm' pre-cached text values ourselves.)
        //      https://github.com/ruilisi/fortune-sheet/issues/504 (remove this handler when that gets fixed)
        // This handler is run when the sheets themselves change, *not* any piece of data inside them.
        for (const sheet of sheetRef.current.getAllSheets()) {
          if (!sheet.data) continue;
          for (let r = 0; r < sheet.data.length; r++)
            for (let c = 0; c < sheet.data[r].length; c++)
                if (typeof sheet.data[r][c]?.ct === 'object' && sheet.data[r][c].ct.t !== 's')
                  sheetRef.current.setCellFormat(r, c, 'ct', sheet.data[r][c].ct, { id: sheet.id });
        }
      }} />
    </div>
  );
};

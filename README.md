# FortuneSheetExcel

FortuneSheetExcel is an Excel import library for [FortuneSheet](https://github.com/ruilisi/fortune-sheet/). It only supports .xlsx format files (not .xls).

It is a FortuneSheet port of [Luckyexcel](https://github.com/dream-num/Luckyexcel).

## Features

Supports the following spreadsheet features:

- Cell style
- Cell border
- Cell format, such as number format, date, percentage, etc.
- Formula

## Usage

```js
import { transformExcelToFortune } from 'FortuneSheetExcel';

// e.g. got a file input change event
const xls = await e.target.files[0].arrayBuffer()
const fsh = await transformExcelToFortune(xls)
setData(fsh.sheets) // use this as the Workbook data
```

Interactively in a node repl:

```js
f = await (await import("node:fs/promises")).readFile('/home/val/Downloads/Silkscreen.xlsx')
console.log((await (await import("FortuneSheetExcel")).LuckyExcel.transformExcelToLucky(f)).toJsonString())
// in dev: console.log((await (await import("./dist/main.js")).LuckyExcel.transformExcelToLucky(f)).toJsonString())
```

## Authors and acknowledgment

- [@wbfsa](https://github.com/wbfsa)
- [@wpxp123456](https://github.com/wpxp123456)
- [@Dushusir](https://github.com/Dushusir)
- [@xxxDeveloper](https://github.com/xxxDeveloper)
- [@mengshukeji](https://github.com/mengshukeji)

## License

[MIT](http://opensource.org/licenses/MIT)

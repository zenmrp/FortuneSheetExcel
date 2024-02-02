import { LuckyFile } from "./ToLuckySheet/LuckyFile.js";
import { HandleZip } from "./HandleZip.js";

import { IuploadfileList } from "./ICommon.js";

export class LuckyExcel {
  static transformExcelToLucky(excelFile: File): Promise<LuckyFile> {
    const handleZip = new HandleZip(excelFile);
    return new Promise((resolve, reject) =>
      handleZip.unzipFile((files: IuploadfileList) => {
        const luckyFile = new LuckyFile(files, excelFile.name);
        luckyFile.Parse();
        resolve(luckyFile);
      }, reject)
    );
  }
}

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

  static transformExcelToLuckyByUrl(
    url: string,
    name: string,
  ): Promise<LuckyFile> {
    const handleZip = new HandleZip();
    return new Promise((resolve, reject) =>
      handleZip.unzipFileByUrl(url, (files: IuploadfileList) => {
        const luckyFile = new LuckyFile(files, name);
        luckyFile.Parse();
        resolve(luckyFile);
      }, reject)
    );
  }
}

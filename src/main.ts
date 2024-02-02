import { LuckyFile } from "./ToLuckySheet/LuckyFile.js";
import { HandleZip } from "./HandleZip.js";

export class LuckyExcel {
  static async transformExcelToLucky(excelFile: File): Promise<LuckyFile> {
    const files = await new HandleZip(excelFile).unzipFile();
    const luckyFile = new LuckyFile(files, excelFile.name);
    luckyFile.Parse();
    return luckyFile;
  }
}

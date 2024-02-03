import { LuckyFile } from "./ToLuckySheet/LuckyFile.js";
import type { LuckyFileBase } from "./ToLuckySheet/LuckyBase.ts";
import { HandleZip } from "./HandleZip.js";

export const transformExcelToFortune = async (
  excelFile: File,
): Promise<LuckyFileBase> => {
  const files = await new HandleZip(excelFile).unzipFile();
  const luckyFile = new LuckyFile(files, excelFile.name);
  luckyFile.Parse();
  return luckyFile.serialize();
};

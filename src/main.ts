import { LuckyFile } from "./ToLuckySheet/LuckyFile.js";
import {HandleZip} from './HandleZip.js';

import {IuploadfileList} from "./ICommon.js";

export class LuckyExcel{
    static transformExcelToLucky(excelFile: File,
        callback?: (files: IuploadfileList, fs?: string) => void,
        errorHandler?: (err: Error) => void) {
        let handleZip:HandleZip = new HandleZip(excelFile);
        
        handleZip.unzipFile(function (files: IuploadfileList) {
            let luckyFile = new LuckyFile(files, excelFile.name);
            let luckysheetfile = luckyFile.Parse();
            let exportJson = JSON.parse(luckysheetfile);
            if (callback != undefined) {
                callback(exportJson, luckysheetfile);
            }
        },
        function(err:Error){
            if (errorHandler) {
                errorHandler(err);
              } else {
                console.error(err);
              }
        });
    }

    static transformExcelToLuckyByUrl(
        url: string,
        name: string,
        callBack?: (files: IuploadfileList, fs?: string) => void,
        errorHandler?: (err: Error) => void) {
        let handleZip:HandleZip = new HandleZip();
        handleZip.unzipFileByUrl(url, function(files:IuploadfileList){
            let luckyFile = new LuckyFile(files, name);
            let luckysheetfile = luckyFile.Parse();
            let exportJson = JSON.parse(luckysheetfile);
            if(callBack != undefined){
                callBack(exportJson, luckysheetfile);
            }
        },
        function(err:Error){
            if (errorHandler) {
                errorHandler(err);
              } else {
                console.error(err);
              }
        });
    }
}

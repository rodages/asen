"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const exceljs_1 = __importDefault(require("exceljs"));
const listOfCIKs = ["CIK0000320193", "320187", "350403"];
const date = getDateDDMMYYYY();
async function runTheApp() {
    const workbook = new exceljs_1.default.Workbook();
    const worksheet = workbook.addWorksheet("My Sheet");
    //replace header name as you want, but do not rename the key, as thats how data is mapped. you can also adjust the width if you want
    worksheet.columns = [
        { header: "Date", key: "date", width: 10 },
        { header: "Name", key: "name", width: 32 },
        { header: "CIK", key: "cik", width: 15 },
        { header: "End", key: "end", width: 15 },
        { header: "Val", key: "val", width: 15 },
        { header: "Accn", key: "accn", width: 15 },
        { header: "Fy", key: "fy", width: 15 },
        { header: "Fp", key: "fp", width: 15 },
        { header: "Form", key: "form", width: 15 },
        { header: "Filled", key: "filled", width: 15 },
        { header: "Frame", key: "frame", width: 15 },
    ];
    listOfCIKs.forEach((address) => {
        const CIK = getCik(address);
        const URL = `https://data.sec.gov/api/xbrl/companyconcept/${CIK}/us-gaap/AccountsPayableCurrent.json`;
        console.log(URL);
        (async function writeResponseData() {
            const res = await axios_1.default.get(URL).then((d) => {
                const data = d.data;
                const arr = data.units["USD"];
                // console.log(arr);
                arr.forEach((entry) => {
                    console.log("this runs");
                    // console.log(entry);
                    // const worksheetEntry = {
                    //   date: date,
                    //   name: data.entityName,
                    //   cik: CIK,
                    //   end: entry.end,
                    //   val: entry.val,
                    //   accn: entry.accn,
                    //   fy: entry.fy,
                    //   fp: entry.fp,
                    //   form: entry.form,
                    //   filled: entry.filed,
                    //   frame: entry?.frame ?? null,
                    // };
                    worksheet.addRow({
                        date: date,
                        name: data.entityName,
                        cik: CIK,
                        end: entry.end,
                        val: entry.val,
                        accn: entry.accn,
                        fy: entry.fy,
                        fp: entry.fp,
                        form: entry.form,
                        filled: entry.filed,
                        frame: entry?.frame ?? null,
                        //
                    });
                    // console.log(worksheetEntry);
                });
                const dataString = JSON.stringify(d.data);
                fs_1.default.writeFile(`./json/${d.data.entityName}-data.json`, dataString, (e) => {
                    console.log(e);
                });
            });
        })();
    });
    setTimeout(async () => {
        await workbook.xlsx.writeFile(`${date}.xlsx`);
    }, 1 * 1000);
}
runTheApp();
function getCik(address) {
    if (address.length == 13) {
        return address;
    }
    else if (address.length < 13) {
        const cikPrefix = `CIK`;
        const zeroPadding = "0".repeat(13 - cikPrefix.length - address.length);
        return `${cikPrefix}${zeroPadding}${address}`;
    }
    else {
        console.log("CIK that was provided was too long");
        //defaults to apple
        return "CIK0000320193";
    }
}
function getDateDDMMYYYY() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dateFormatted = `${year}-${month}-${day}`;
    return dateFormatted;
}
